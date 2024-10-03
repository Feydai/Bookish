import { Schema } from "../../data/resource";
import { BedrockRuntimeClient, InvokeModelCommand, InvokeModelCommandInput } from "@aws-sdk/client-bedrock-runtime";
import { MODEL_ID } from "./resource"

const bedrockClient = new BedrockRuntimeClient()

export const handler: Schema["getAISuggestions"]["functionHandler"] = async () => {

//   const input: InvokeModelCommandInput = {
//     modelId: MODEL_ID,
//     contentType: "application/json",
//     accept: "application/json",
//     body: JSON.stringify({
//       inputText: "Tu es un expert de livre. Conseille moi trois titres de livres de fiction différents pour le mois d'octobre. Présente les moi sous forme de JSON.",
//       textGenerationConfig: {
//         maxTokenCount:4096, 
//         stopSequences:[],
//         temperature:0,
//         topP:1
//         }
//     }),
//   };
  

//   const result = await bedrockClient.send(new InvokeModelCommand(input))

//   return JSON.parse(Buffer.from(result.body).toString()).content[0].text ?? ""
    return JSON.stringify({
        "livres": [
          {
            "titre": "Les Luminaires",
            "auteur": "Eleanor Catton",
            "description": "Un roman historique et mystérieux qui se déroule en Nouvelle-Zélande au XIXe siècle. Ce livre explore les thèmes du destin et de l'avidité à travers une enquête captivante."
          },
          {
            "titre": "Le Maître des illusions",
            "auteur": "Donna Tartt",
            "description": "Un thriller psychologique fascinant qui plonge dans la vie d'un groupe d'étudiants en lettres classiques dont la quête du savoir les entraîne dans un monde de crime et de culpabilité."
          },
          {
            "titre": "L'Ombre du vent",
            "auteur": "Carlos Ruiz Zafón",
            "description": "Un roman magique et mystérieux situé dans la Barcelone d'après-guerre, où un jeune garçon découvre un livre oublié qui changera sa vie à jamais."
          }
        ]
      })    
}