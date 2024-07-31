import OpenAI from "openai";

const openai = new OpenAI();

async function main(){
    const completion = await openai.chat.completions.create({
        messages:[{
            role:"system",
            content:"You are helpful assistance"
        }]
    })

    console.log(completion.choices[0])
}

main()