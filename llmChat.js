import {config} from 'dotenv'
config()
import { HfInference } from '@huggingface/inference'
import { textClassification } from './textClassification.js'
import { textSummary } from './llmSummary.js'
import { dataChunks } from './readyData.js'
import { questionAnswering } from './questionAnswering.js'


const hf = new HfInference(process.env.HF_TOKEN)


let question =  'how many days it took for the project?'

export async function getAnswer(question,answers){
   // let answers = await dataChunks('data.txt')

    const ans = await textClassification(question,answers)
    const ans2 = await ans.map((value,index)=>{
       return {
            value,
            index
        }
    })
    const ans3 = await ans2.sort((a,b)=> a.value-b.value)
    const ansSize = ans3.length
    //console.log(ans3)
    
     
     
    const relatedData = answers[ans3[ansSize-1].index]+" "+answers[ans3[ansSize-2].index]+" "+answers[ans3[ansSize-3].index]
    //console.log(relatedData)
    let finalContext = await textSummary(relatedData)
    
    // console.log(finalContext)

    return finalContext
}

