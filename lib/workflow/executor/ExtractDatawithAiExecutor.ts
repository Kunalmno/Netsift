import { symmetricDecrypt } from "@/lib/encryption";
import prisma from "@/lib/prisma";
import OpenAI from "openai";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { ExecutionEnvironment } from "../../../types/executor";
import { ExtractDataWithAITask } from "../task/ExtractDataWithAI";

export async function ExtractDataWithAiExecutor(
  environment: ExecutionEnvironment<typeof ExtractDataWithAITask>
): Promise<boolean> {
  try {
    const credentials = environment.getInput("Credentials");
    if (!credentials) {
      environment.log.error("input->credentials not defined");
    }
    const prompt = environment.getInput("Prompt");
    if (!prompt) {
      environment.log.error("input->prompt not defined");
    }
    const content = environment.getInput("content");
    if (!content) {
      environment.log.error("input->content not defined");
    }

    const credential = await prisma.credential.findUnique({
      where: { id: credentials },
    });
    if (!credential) {
      environment.log.error("credential not found");
      return false;
    }

    const plainCredentialvalue = symmetricDecrypt(credential.value);
    if (!plainCredentialvalue) {
      environment.log.error("cannot decrypt credential");
      return false;
    }
    // gemini logic

    const genAI = new GoogleGenerativeAI(plainCredentialvalue);
    const model = genAI.getGenerativeModel({
      model: "gemini-2.0-flash",
      generationConfig: {
        temperature: 0.2, // Lower temperature for more structured output
        responseMimeType: "application/json",
      },
    });
    // this instruction works for now but can be required to update in  future
    const structuredPrompt = `
    [System Instruction]
      You are a web scraping assistant that extracts selectors from HTML.
      RULES:
      1. Return JSON with these properties:
         - userNameSelector: Use #ID if available
         - passwordSelector: Use #ID if available
         - loginSelector: Include input type when available (e.g., "input[type='submit']")
      2. Format EXACTLY like this:
         { "userNameSelector": "#id", "passwordSelector": "#id", "loginSelector": "input[type='submit']" }
      3. For loginSelector:
         - Prefer: input[type='submit'], input[type='button'], button
         - If no type available, use .class
         - Never include both type and class
      4. No backslashes, no newlines, no markdown

      [Examples]
      Good: { "loginSelector": "input[type='submit']" }
      Good: { "loginSelector": "button.btn-primary" }
      Bad:  { "loginSelector": "input.btn[type='submit']" }

      [Content]
      ${content}

      [Extraction Prompt]
      ${prompt}
  `;

    const result = await model.generateContent(structuredPrompt);
    const response = result.response;
    const text = response.text();

    // Clean and validate JSON response

    // Gemini doesn't provide token usage in free tier
    // environment.log.info(`Prompt tokens: ${response.usageMetadata?.promptTokenCount}`);
    // environment.log.info(`Completion tokens: ${response.usageMetadata?.candidatesTokenCount}`);

    //deepseek logic

    /* const deepseek = new OpenAI({
      apiKey: plainCredentialvalue,
      baseURL: "https://api.deepseek.com", // DeepSeek's API endpoint
    });
    const response = await deepseek.chat.completions.create({
      model: "deepseek-chat", // Verify correct model name
      messages: [
        {
          role: "system",
          content:
            "You are a webscrapper helper that extract data from Html or text. You will be given a piece of text or Html content as input and also the prompt with the data you have to extract. The response should always be only the extracted data as a JSON array or object, without any additional words or explanations. Analyze the input carefully and extract data precisely based on the prompt. If no data is found, return an empty JSON array. Work only with the provided content and ensure the output is valid JSON array without any surrounding text.",
        },
        {
          role: "user",
          content: content,
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 1,
    });
    environment.log.info(`Prompt tokens: ${response.usage?.prompt_tokens}`);
    environment.log.info(
      `Completion tokens: ${response.usage?.completion_tokens}`
    );

    const result = response.choices[0].message?.content; */

    // Open Ai Logic

    /* const openai = new OpenAI({
      apiKey: plainCredentialvalue,
    });

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content:
            "l"
        },
        {
          role: "user",
          content: content,
        },
        { role: "user", content: prompt },
      ],
      temperature: 1,
    });

    environment.log.info(`Prompt tokens: ${response.usage?.prompt_tokens}`);
    environment.log.info(
      `Completion tokens: ${response.usage?.completion_tokens}`
    );

    const result = response.choices[0].message?.content;*/

    /* gemini do not produce result token usage 
    if (!result) {
      environment.log.error("empty response from AI");
      return false;
    }


    environment.setOutput("Extracted data", result);*/

    // this works for now, but the login selector require the type of selection not selector will have to look at that but will do later on
    const perfectOutput = text.replace(/```/g, "").trim();

    environment.setOutput("Extracted data", perfectOutput);
    environment.log.info(
      "Gemini don't provide token usage for free plan, Please upgrade to pro to track the token usage."
    );
    return true;
  } catch (error: any) {
    environment.log.error(error.message);
    return false;
  }
}
