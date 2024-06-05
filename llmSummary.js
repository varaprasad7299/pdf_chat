import {config} from 'dotenv'
config()
import { HfInference } from '@huggingface/inference'


const hf = new HfInference(process.env.HF_TOKEN)

export  async function textSummary(text){
const result = await hf.summarization({
    model: 'facebook/bart-large-cnn',
    inputs:text,
    parameters: {
      max_length: 300
    }
  })
  return result

}