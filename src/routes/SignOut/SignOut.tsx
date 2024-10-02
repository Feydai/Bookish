import { Amplify } from "aws-amplify";

import { signOut } from "aws-amplify/auth";
import outputs from "../../../amplify_outputs.json";
import { useNavigate } from "react-router-dom";

Amplify.configure(outputs);

export default function App() {
  const nav = useNavigate();

  async function handleSignOut() {
    await signOut();
    nav("/")
  }
  return (
    <button type="button" onClick={handleSignOut}>
      Sign out
    </button>
  );
}
