import { Amplify } from "aws-amplify"

import { signOut } from "aws-amplify/auth"
import outputs from "../../../amplify_outputs.json"

Amplify.configure(outputs)

export default function App() {
  async function handleSignOut() {
    await signOut()
  }

  return (
    <button type="button" onClick={handleSignOut}>
      Sign out
    </button>
  )
}