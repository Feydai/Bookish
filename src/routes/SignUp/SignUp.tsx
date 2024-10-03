import type { FormEvent } from "react";
import { Amplify } from "aws-amplify";
import { signUp, confirmSignUp, getCurrentUser} from "aws-amplify/auth";
import outputs from "../../../amplify_outputs.json";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

Amplify.configure(outputs);

interface SignUpFormElements extends HTMLFormControlsCollection {
  email: HTMLInputElement;
  password: HTMLInputElement;
  confirmPassword: HTMLInputElement;
  code: HTMLInputElement;
}

interface SignUpForm extends HTMLFormElement {
  readonly elements: SignUpFormElements;
}

export default function App() {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [isSignUpComplete, setIsSignUpComplete] = useState(false);
  const [email, setEmail] = useState("");
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

  async function handleSignUp(event: FormEvent<SignUpForm>) {
    event.preventDefault();
    const form = event.currentTarget;

    const email = form.elements.email.value;
    const password = form.elements.password.value;
    const confirmPassword = form.elements.confirmPassword.value;

    if (!email || !password || !confirmPassword) {
      setError("Veuillez remplir tous les champs.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Les mots de passe ne correspondent pas.");
      return;
    }

    try {
      setLoading(true);
      setError(null);
      setSuccess(false);

      await signUp({
        username: email,
        password,
        options: {
          userAttributes: {
            email,
          },
        },
      });

      setEmail(email);
      setIsSignUpComplete(true);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message || "Erreur d'inscription");
      } else {
        setError("Erreur d'inscription");
      }
    } finally {
      setLoading(false);
    }
  }

  async function handleConfirmSignUp(event: FormEvent<SignUpForm>) {
    event.preventDefault();
    const form = event.currentTarget;
    const code = form.elements.code.value;

    if (!code) {
      setError("Veuillez entrer le code de confirmation.");
      return;
    }

    try {
      setLoading(true);
      setError(null);
      setSuccess(false);

      await confirmSignUp({
        username: email,
        confirmationCode: code,
      });

      setSuccess(true);
      nav("/signIn");
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message || "Erreur lors de la confirmation du code.");
      } else {
        setError("Erreur lors de la confirmation du code.");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-purple-100 px-4">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-4xl font-extrabold mb-6 text-purple-900 text-center">
          Bookish
        </h2>

        {!isSignUpComplete ? (
          <>
            <h3 className="text-2xl font-semibold text-purple-800 mb-4 text-center">
              Create an account
            </h3>
            {error && (
              <div className="text-red-500 mb-4 text-center">{error}</div>
            )}
            <form onSubmit={handleSignUp} className="space-y-6">
              <div>
                <label
                  htmlFor="email"
                  className="block text-base font-medium text-purple-900 text-left"
                >
                  Your email
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
                  className="block text-base font-medium text-purple-900 text-left"
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
              <div>
                <label
                  htmlFor="confirmPassword"
                  className="block text-base font-medium text-purple-900 text-left"
                >
                  Confirm password
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  required
                  className="mt-1 block w-full p-3 text-sm text-purple-900 border border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500"
                />
              </div>
              <div className="text-left">
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    required
                    className="h-4 w-4 border-gray-300 rounded"
                  />
                  <span className="text-gray-600 text-sm">
                    I accept the{" "}
                    <a href="#" className="text-blue-500">
                      Terms and Conditions
                    </a>
                  </span>
                </label>
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 px-4 bg-purple-600 text-white text-lg font-semibold rounded-lg hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
              >
                {loading ? "Signing up..." : "Create an account"}
              </button>
            </form>
            <p className="mt-4 text-sm text-gray-600 text-center">
              Already have an account?{" "}
              <a href="/signIn" className="text-purple-600 font-medium">
                Login here
              </a>
            </p>
          </>
        ) : (
          <>
            <h3 className="text-2xl font-semibold text-purple-800 mb-4 text-center">
              Confirm your registration
            </h3>
            {error && (
              <div className="text-red-500 mb-4 text-center">{error}</div>
            )}
            {success && (
              <div className="text-green-500 mb-4 text-center">
                Successfully confirmed!
              </div>
            )}
            <form onSubmit={handleConfirmSignUp} className="space-y-6">
              <div>
                <label
                  htmlFor="code"
                  className="block text-base font-medium text-purple-900 text-left"
                >
                  Confirmation Code
                </label>
                <input
                  type="text"
                  id="code"
                  name="code"
                  required
                  className="mt-1 block w-full p-3 text-sm text-purple-900 border border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500"
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 px-4 bg-purple-600 text-white text-lg font-semibold rounded-lg hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
              >
                {loading ? "Confirming..." : "Confirm"}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
