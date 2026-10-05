import "dotenv/config";

export interface ChatbotConfig {
  model: string;
  apiKey: string;
  temperature: number;
  systemPrompt: string;
}

export const config: ChatbotConfig = {
  model: "gemini-2.5-flash",

  apiKey: process.env.GOOGLE_AI_API_KEY || "",

  // 응답의 창의성 (0.0 ~ 1.0)
  // 낮을수록 일관된 응답, 높을수록 다양한 응답
  temperature: 0.6,
  // 시스템 프롬프트: AI의 역할과 행동 방식 정의
  systemPrompt: `사용자의 질문에 명확하고 간결하게 답변해주세요.
다른 나라 언어를 사용하지 않고 한국어로 대화합니다.
친구와 이야기하는 것처럼 편안하고 가벼운 문체로 답변해주세요.`,
};
