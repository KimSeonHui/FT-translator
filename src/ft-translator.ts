import { Chatbot } from "./chatbot";
import { Mode, TranslatorConfig } from "./type";
import { prompt } from "./utils/prompt.js";

const translateChat = async (chatbot: Chatbot): Promise<void> => {
  console.log("🔍 번역 모드로 시작합니다!\n");

  const direction = await prompt("방향을 선택해주세요. (f2t, t2f)");
  if (direction.toLowerCase() === "f2t") {
    console.log("🔍 F→T 방향으로 번역합니다!\n");
  } else if (direction.toLowerCase() === "t2f") {
    console.log("🔍 T→F 방향으로 번역합니다!\n");
  } else {
    console.log("❌ 잘못된 방향입니다. f2t 또는 t2f를 선택해주세요.\n");
  }

  const translatorConfig: TranslatorConfig = {
    mode: Mode.TRANSLATE,
    direction: direction === "f2t" ? "F_to_T" : "T_to_F",
    userType: direction === "f2t" ? "F" : "T",
  };

  chatbot.setTranslatorConfig(translatorConfig);
};

const interpretChat = async (chatbot: Chatbot): Promise<void> => {
  console.log("🔍 해석 모드로 시작합니다!\n");

  const direction = await prompt("방향을 선택해주세요. (f2t, t2f)");
  if (direction.toLowerCase() === "f2t") {
    console.log("🔍 F의 말을 T가 이해하기 쉽게 해석 합니다!\n");
  } else if (direction.toLowerCase() === "t2f") {
    console.log("🔍 T의 말을 F가 이해하기 쉽게 해석 합니다!\n");
  } else {
    console.log("❌ 잘못된 방향입니다. f2t 또는 t2f를 선택해주세요.\n");
  }

  const interpretConfig: TranslatorConfig = {
    mode: Mode.INTERPRET,
    direction: direction === "f2t" ? "F_to_T" : "T_to_F",
    userType: direction === "f2t" ? "F" : "T",
  };

  chatbot.setTranslatorConfig(interpretConfig);
};

const coachChat = async (chatbot: Chatbot): Promise<void> => {
  console.log("🔍 코칭 모드로 시작합니다!\n");

  const direction = await prompt("방향을 선택해주세요. (f2t, t2f)");
  if (direction.toLowerCase() === "f2t") {
    console.log("🔍 F의 말을 T에게 어떻게 말하면 좋을지 코칭 합니다!\n");
  } else if (direction.toLowerCase() === "t2f") {
    console.log("🔍 T의 말을 F에게 어떻게 말하면 좋을지 코칭 합니다!\n");
  } else {
    console.log("❌ 잘못된 방향입니다. f2t 또는 t2f를 선택해주세요.\n");
  }

  const coachConfig: TranslatorConfig = {
    mode: Mode.COACH,
    direction: direction === "f2t" ? "F_to_T" : "T_to_F",
    userType: direction === "f2t" ? "F" : "T",
  };

  chatbot.setTranslatorConfig(coachConfig);
};

export { translateChat, interpretChat, coachChat };
