import {PDFParse} from "pdf-parse"

export async function parseResume(buffer: Buffer){

    const parser =new PDFParse({
        data:buffer
    })

    try{

        const result=await parser.getText();
        return result.text

    }
    finally{
        await parser.destroy()
    }


}

