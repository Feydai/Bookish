import type { FormEvent } from "react";
import { Amplify } from "aws-amplify";
import { signUp, confirmSignUp } from "aws-amplify/auth";
import outputs from "../../../amplify_outputs.json";
import { useState } from "react";

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
    <div>
      {!isSignUpComplete ? (
        <>
          <h2>Inscription</h2>
          {error && <div style={{ color: "red" }}>{error}</div>}
          <form onSubmit={handleSignUp}>
            <div>
              <label htmlFor="email">Email:</label>
              <input type="email" id="email" name="email" required />
            </div>
            <div>
              <label htmlFor="password">Mot de passe:</label>
              <input type="password" id="password" name="password" required />
            </div>
            <div>
              <label htmlFor="confirmPassword">
                Confirmer le mot de passe:
              </label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                required
              />
            </div>
            <button type="submit" disabled={loading}>
              {loading ? "Inscription en cours..." : "S'inscrire"}
            </button>
          </form>
        </>
      ) : (
        <>
          <h2>Confirmer votre inscription</h2>
          {error && <div style={{ color: "red" }}>{error}</div>}
          {success && (
            <div style={{ color: "green" }}>
              Inscription confirmée avec succès !
            </div>
          )}
          <form onSubmit={handleConfirmSignUp}>
            <div>
              <label htmlFor="code">Code de confirmation:</label>
              <input type="text" id="code" name="code" required />
            </div>
            <button type="submit" disabled={loading}>
              {loading ? "Confirmation en cours..." : "Confirmer"}
            </button>
          </form>
        </>
      )}
    </div>
  );
}
