import { Chatbot } from "./chatbot.js";
import { config } from "./config.js";
import { Mode } from "./type/index.js";
import { coachChat, interpretChat, translateChat } from "./ft-translator.js";
import { prompt, rl } from "./utils/prompt.js";

const printWelcome = (): void => {
  console.log("\n" + "=".repeat(50));
  console.log("🤖 AI 챗봇에 오신 것을 환영합니다!");
  console.log("=".repeat(50));
  console.log(`📦 모델: ${config.model}`);
  console.log(`🌡️  Temperature: ${config.temperature}`);
  console.log("-".repeat(50));
  console.log("💡 명령어:");
  console.log("   /clear - 대화 히스토리 초기화");
  console.log("   /history - 대화 히스토리 보기");
  console.log("   /exit 또는 /quit - 종료");
  console.log("=".repeat(50) + "\n");
};

const main = async (): Promise<void> => {
  printWelcome();

  const chatbot = new Chatbot();

  const mode = await prompt(
    "모드를 선택해주세요. (translate, interpret, coach)",
  );

  if (mode.toLowerCase() === Mode.TRANSLATE) {
    await translateChat(chatbot);
  } else if (mode.toLowerCase() === Mode.INTERPRET) {
    await interpretChat(chatbot);
  } else if (mode.toLowerCase() === Mode.COACH) {
    await coachChat(chatbot);
  }

  while (true) {
    try {
      // 사용자 입력 받기
      const userInput = await prompt("You: ");
      const trimmedInput = userInput.trim();

      // 빈 입력 무시
      if (!trimmedInput) {
        continue;
      }

      // 명령어 처리
      if (trimmedInput.startsWith("/")) {
        const command = trimmedInput.toLowerCase();

        if (command === "/exit" || command === "/quit") {
          console.log("\n👋 안녕히 가세요!\n");
          rl.close();
          process.exit(0);
        }

        if (command === "/clear") {
          chatbot.clearHistory();
          continue;
        }

        if (command === "/history") {
          const history = chatbot.getHistory();
          console.log("\n📜 대화 히스토리:");
          console.log("-".repeat(30));
          history.forEach((msg, idx) => {
            const type = msg._getType();
            const content =
              typeof msg.content === "string"
                ? msg.content.substring(0, 100)
                : "[complex content]";
            console.log(`${idx + 1}. [${type}] ${content}...`);
          });
          console.log("-".repeat(30) + "\n");
          continue;
        }

        console.log(
          "❓ 알 수 없는 명령어입니다. /exit, /clear, /history 사용 가능\n",
        );
        continue;
      }

      process.stdout.write("AI: ");

      // invoke 사용
      // const content = await chatbot.chatSync(trimmedInput);
      // process.stdout.write(content);

      await chatbot.chat(trimmedInput, (token) => {
        // 각 토큰을 실시간으로 출력 (타이핑 효과)
        process.stdout.write(token);
      });

      console.log("\n");
    } catch (error) {
      // 에러 처리
      if (error instanceof Error) {
        if (error.message.includes("ECONNREFUSED")) {
          console.error("\n❌ Ollama 서버에 연결할 수 없습니다.");
          console.error(
            "   'ollama serve' 명령어로 서버를 먼저 실행해주세요.\n",
          );
        } else {
          console.error(`\n❌ 오류 발생: ${error.message}\n`);
        }
      } else {
        console.error("\n❌ 알 수 없는 오류가 발생했습니다.\n");
      }
    }
  }
};

main().catch((error) => {
  console.error("치명적 오류:", error);
  process.exit(1);
});
