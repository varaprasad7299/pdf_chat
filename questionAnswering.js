import {config} from 'dotenv'
config()
import { HfInference } from '@huggingface/inference'


const hf = new HfInference(process.env.HF_TOKEN)

export  async function questionAnswering(question,context){
   const result = await hf.questionAnswering({
        model: 'deepset/roberta-base-squad2',
        inputs: {
          question: question,
          context: context
        }
      })
  return result

}

