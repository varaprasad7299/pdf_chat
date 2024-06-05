import fs from 'fs'
import { resolve } from 'path';



// fs.writeFile("./files/file.txt","hello world",(err)=>{
//     if(err){
//         console.log(err)
//     }
// })
    



// fs.unlink("./files/file.txt", (err) => {
//     if (err) {
//         console.error(err);
//         return;
//     }
//     console.log('File deleted successfully');
// });
async function fileData(fileName) {
    return new Promise((resolve, reject) => {
        fs.readFile(fileName, 'utf8', (err, data) => {
            if (err) {
                reject(err); // Reject the promise if there's an error
            }
            
            resolve(data); // Resolve the promise with the file content
        });
    });
}
export async function removeNewlines(input) {
    let text = input;
    return new Promise((resolve,reject)=>{
        // Replace all newline characters with an empty string
        const result =  text.replace(/\n/g,' ');
        resolve(result)
    })
    
    
}

export function sliceStringByCharacters(str, chunkSize) {
    const result = [];
    return new Promise((resolve,reject)=>{
        for (let i = 0; i < str.length; i += chunkSize) {
            result.push(str.slice(i, i + chunkSize));
        }
        resolve(result)
    })
}





export async function dataChunks(file){
    const data1 = await fileData(file)
    //console.log(data1)
    const data2 = await removeNewlines(data1)
    //console.log(data2)
    const data3 = await sliceStringByCharacters(data2,300)
    //console.log(data3)
    return data3
}



