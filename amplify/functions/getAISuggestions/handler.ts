import { Schema } from "../../data/resource";
import { BedrockRuntimeClient, InvokeModelCommand, InvokeModelCommandInput } from "@aws-sdk/client-bedrock-runtime";

const bedrockClient = new BedrockRuntimeClient()

export const handler: Schema["getAISuggestions"]["functionHandler"] = async () => {
    const input = {
        modelId: 'amazon.titan-text-lite-v1',
        contentType: "application/json",
        accept: "application/json",
        body: JSON.stringify({
          inputText: "Tu es un expert de livre. Conseille moi trois titres de livres de fiction différents pour le mois actuel. Présente les moi sous forme d'un object javascript. N'ajoute aucun texte",
          textGenerationConfig: {
            maxTokenCount:4096, 
            stopSequences:[],
            temperature:0,
            topP:1
            }
        }),
      };
    
      const result = await bedrockClient.send(new InvokeModelCommand(input))
      const output = JSON.parse(Buffer.from(result.body).toString()).results[0].outputText
     return output  
}