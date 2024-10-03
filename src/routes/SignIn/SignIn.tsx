import type { FormEvent } from "react";
import { Amplify } from "aws-amplify";
import { signIn, getCurrentUser } from "aws-amplify/auth";
import outputs from "../../../amplify_outputs.json";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

Amplify.configure(outputs);

interface SignInFormElements extends HTMLFormControlsCollection {
  email: HTMLInputElement;
  password: HTMLInputElement;
}

interface SignInForm extends HTMLFormElement {
  readonly elements: SignInFormElements;
}

export default function SignIn() {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const nav = useNavigate();

  useEffect(() => {
    const checkIfAuthenticated = async () => {
      try {
        const user = await getCurrentUser();
        if (user) {
          nav("/pickFavorite");
        }
      } catch (err) {
        // Do nothing, user is not authenticated
      }
    };
    checkIfAuthenticated();
  }, [nav]);

  async function handleSubmit(event: FormEvent<SignInForm>) {
    event.preventDefault();
    const form = event.currentTarget;

    const username = form.elements.email.value;
    const password = form.elements.password.value;

    if (!username || !password) {
      setError("Veuillez remplir tous les champs.");
      return;
    }

    try {
      setLoading(true);
      setError(null);
      await signIn({
        username,
        password,
      });

      console.log("Connexion réussie");
      nav("../pickFavorite");
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message || "Erreur de connexion");
      } else {
        setError("Erreur de connexion");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f4f5f7] px-4 sm:px-6 lg:px-8">
      <div className="p-8 max-w-xs sm:max-w-md lg:max-w-lg relative bg-white rounded-lg shadow-lg">
        <h2 className="text-3xl font-extrabold text-black-900 mb-6 text-center">
          Connexion
        </h2>

        {error && <div className="text-red-500 text-center mb-4">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="email"
              className="block text-base font-medium text-black-900 text-left"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              className="mt-1 block w-full p-3 text-sm text-black-900 border border-gray-300 rounded-lg shadow-sm focus:ring-purple-500 focus:border-purple-500"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-base font-medium text-black-900 text-left"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              required
              className="mt-1 block w-full p-3 text-sm text-black-900 border border-gray-300 rounded-lg shadow-sm focus:ring-purple-500 focus:border-purple-500"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 px-4 bg-[#07090c] text-white text-lg font-semibold rounded-lg hover:bg-black focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        <p className="mt-4 text-sm text-gray-600 text-center">
          Don't have an account?{" "}
          <a href="/signup" className="text-black-900 font-medium">
            Sign up here
          </a>
        </p>
      </div>
    </div>
  );
}
