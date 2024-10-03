import { defineFunction } from "@aws-amplify/backend";

export const MODEL_ID = 'amazon.titan-text-lite-v1'

export const getAISuggestions = defineFunction({
  entry: './handler.ts',
  name: 'getAISuggestions',
  environment: {
    MODEL_ID: MODEL_ID
  }
})