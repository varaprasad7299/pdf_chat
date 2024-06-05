import {config} from 'dotenv'
config()
import { HfInference } from '@huggingface/inference'

const hf = new HfInference(process.env.HF_TOKEN)

const result = await hf.textGeneration({
    model: 'gpt2',
    inputs: 'Operating System is a'
  })

console.log(result)