import { defineFunction } from "@aws-amplify/backend";


export const getGoogleBook = defineFunction({
  entry: './handler.ts',
  name: 'getGoogleBook',
})