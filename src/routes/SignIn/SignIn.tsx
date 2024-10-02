import React from 'react';
import { Authenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';

function SignIn() {
  return (
    <Authenticator>
      {({ signOut, user }) => (
        <div>
          <h1>Bienvenue, {user?.username}</h1>
          <button onClick={signOut}>Déconnexion</button>
        </div>
      )}
    </Authenticator>
  );
}

export default SignIn;
