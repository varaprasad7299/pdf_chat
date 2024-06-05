import {config} from 'dotenv'
config()
import { HfInference } from '@huggingface/inference'

const hf = new HfInference(process.env.HF_TOKEN)


export async function textClassification(question,answers){
const result = await hf.sentenceSimilarity({
    model: 'sentence-transformers/all-MiniLM-L6-v2',
    inputs: {
        source_sentence:question,
        sentences:answers
      }
  })
  return result 
 
}



