import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import {
  HumanMessage,
  AIMessage,
  SystemMessage,
  BaseMessageLike,
  BaseMessage,
} from "@langchain/core/messages";
import { config } from "./config.js";
import translatePrompt from "./prompts/translate.js";
import interpretPrompt from "./prompts/interpret.js";
import coachPrompt from "./prompts/coach.js";
import { Mode, TranslatorConfig } from "./type/index.js";

export class Chatbot {
  private model: ChatGoogleGenerativeAI;
  private messageHistory: BaseMessageLike[] = [];

  constructor() {
    this.model = new ChatGoogleGenerativeAI({
      model: config.model,
      apiKey: config.apiKey,
      temperature: config.temperature,
    });

    this.messageHistory.push(new SystemMessage(config.systemPrompt));
  }

  /**
   * stream 사용
   */
  async chat(
    userInput: string,
    onToken?: (token: string) => void,
  ): Promise<string> {
    this.messageHistory.push(new HumanMessage(userInput));

    const stream = await this.model.stream(this.messageHistory);

    let fullResponse = "";

    for await (const chunk of stream) {
      const token = chunk.content as string;
      fullResponse += token;

      if (onToken) {
        onToken(token);
      }
    }

    const response = new AIMessage(fullResponse);
    this.messageHistory.push(response);

    return fullResponse;
  }

  /**
   * invoke 사용
   */
  async chatSync(userInput: string): Promise<string> {
    this.messageHistory.push(new HumanMessage(userInput));

    // invoke()는 전체 응답을 기다림
    const response = await this.model.invoke(this.messageHistory);
    const content = response.content as string;

    this.messageHistory.push(new AIMessage(content));

    return content;
  }

  /**
   * 대화 히스토리 초기화
   */
  clearHistory(): void {
    this.messageHistory = [new SystemMessage(config.systemPrompt)];
    console.log("💬 대화 히스토리가 초기화되었습니다.\n");
  }

  /**
   * 현재 대화 히스토리 조회
   */
  getHistory(): BaseMessage[] {
    return this.messageHistory as BaseMessage[];
  }

  setTranslatorConfig(translatorConfig: TranslatorConfig): void {
    let prompt = "";

    switch (translatorConfig.mode) {
      case Mode.TRANSLATE:
        prompt = translatePrompt[translatorConfig.direction];
        break;
      case Mode.INTERPRET:
        prompt = interpretPrompt[translatorConfig.direction];
        break;
      case Mode.COACH:
        prompt = coachPrompt[translatorConfig.direction];
        break;
    }

    this.messageHistory = [
      new SystemMessage(`${config.systemPrompt}\n\n${prompt}`),
    ];
  }
}
