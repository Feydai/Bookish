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
    <div className="min-h-screen flex items-center justify-center bg-purple-100 px-4">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-4xl font-extrabold mb-6 text-purple-900 text-center">
          Connexion
        </h2>

        {error && <div className="text-red-500 text-center mb-4">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="email"
              className="block text-base font-medium text-purple-900"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              className="mt-1 block w-full p-3 text-sm text-purple-900 border border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-base font-medium text-purple-900"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              required
              className="mt-1 block w-full p-3 text-sm text-purple-900 border border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 px-4 bg-purple-600 text-white text-lg font-semibold rounded-lg hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        <p className="mt-4 text-sm text-gray-600 text-center">
          Don't have an account?{" "}
          <a href="/signup" className="text-purple-600 font-medium">
            Sign up here
          </a>
        </p>
      </div>
    </div>
  );
}
