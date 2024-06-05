import express from 'express';
import multer from 'multer';
import cors from 'cors';
import fs from 'fs'
import pdfParser from 'pdf-parse'; 
import {removeNewlines,sliceStringByCharacters} from './readyData.js'
import { getAnswer } from './llmChat.js';

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:true}))

const upload = multer()

// let question =  'why we use bert ?'


app.post('/upload', upload.single('file'), async (req, res) => {
    const file = req.file
    if (!file) {
        return res.status(400).send("No file uploaded.")
    }
    

    const data = await pdfParser(req.file.buffer)  
    //console.log(data) 
    if(data.numpages>100){
        return res.send("the pdf has more than 100 pages")
    }
    
    const data2 = await removeNewlines(data.text)
    const data3 = await sliceStringByCharacters(data2,200)
    const data4 = JSON.stringify(data3)
    fs.writeFile(file.originalname+'.txt',data4,(err)=>{
        if(err)
        console.log(err)
    })
    res.send("File uploaded: " + file.originalname)
})

app.get('/delete', async (req, res) => {
    const reference = req.query.reference
    // Delete the file from the server
    fs.unlink(reference+'.txt', (err) => {
        if (err) {
            console.error(err);
            res.status(500).send('Failed to delete the file.');
            return;
        }
        res.send('File deleted successfully.');
    });

})

app.get('/ask',async (req,res)=>{
    const question = req.query.input;
    const reference = req.query.reference
    const data = fs.readFileSync(reference+'.txt','utf-8')
    const dataChunks = JSON.parse(data)
    if(!dataChunks){
        return res.send("upload the pdf first")
    }
    const ans = await getAnswer(question,dataChunks)
    res.send(ans.summary_text)
})

app.listen(5000, () => {
    console.log("Server is running")
})
