import type { FormEvent } from "react";
import { Amplify } from "aws-amplify";
import { signIn } from "aws-amplify/auth";
import outputs from "../../../amplify_outputs.json";
import { useState } from "react";
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
    <div>
      <h2>Connexion</h2>
      {error && <div style={{ color: "red" }}>{error}</div>}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email :</label>
          <input type="email" id="email" name="email" required />
        </div>
        <div>
          <label htmlFor="password">Mot de passe :</label>
          <input type="password" id="password" name="password" required />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? "Connexion en cours..." : "Se connecter"}
        </button>
      </form>
    </div>
  );
}
