# AI Agent 챗봇

LangChain.js + Ollama를 사용한 CLI 챗봇 프로젝트입니다.
AI 에이전트 개발의 기초 개념을 학습하기 위한 프로젝트입니다.

## 사전 준비

### 1. Ollama 설치

```bash
# macOS (Homebrew)
brew install ollama

# 또는 공식 설치 스크립트 (Linux/macOS)
curl -fsSL https://ollama.ai/install.sh | sh

# Windows
# https://ollama.ai/download 에서 설치 파일 다운로드
```

### 2. Ollama 서버 실행

```bash
ollama serve
```

### 3. 모델 다운로드 (새 터미널에서)

```bash
# 추천: llama3.2 (가볍고 빠름)
ollama pull llama3.2

# 다른 모델 옵션
ollama pull mistral      # 빠르고 가벼움
ollama pull codellama    # 코딩 특화
ollama pull llama3.1     # 더 큰 모델 (성능 좋음)
```

## 프로젝트 설치

```bash
# 의존성 설치
npm install
```

## 실행

```bash
# 챗봇 실행
npm run chat
```

## 사용법

챗봇 실행 후 터미널에서 대화할 수 있습니다.

### 명령어

| 명령어 | 설명 |
|--------|------|
| `/clear` | 대화 히스토리 초기화 |
| `/history` | 현재 대화 히스토리 보기 |
| `/exit` 또는 `/quit` | 종료 |

### 예시

```
You: 안녕하세요!
AI: 안녕하세요! 무엇을 도와드릴까요?

You: TypeScript에 대해 알려줘
AI: TypeScript는 JavaScript의 상위 집합 언어로...

You: /clear
💬 대화 히스토리가 초기화되었습니다.

You: /exit
👋 안녕히 가세요!
```

## 프로젝트 구조

```
ai-agent/
├── package.json          # 프로젝트 설정 및 의존성
├── tsconfig.json         # TypeScript 설정
├── src/
│   ├── index.ts          # 메인 진입점 (CLI 인터페이스)
│   ├── chatbot.ts        # 챗봇 핵심 로직
│   └── config.ts         # 설정 파일
└── README.md
```

## 학습 포인트

각 파일에서 배울 수 있는 핵심 개념:

### `config.ts` - 설정
- **temperature**: 응답의 창의성 조절 (0 = 일관적, 1 = 창의적)
- **systemPrompt**: AI의 역할과 행동 방식 정의

### `chatbot.ts` - 핵심 로직
- **ChatOllama**: Ollama 모델과 통신하는 LangChain 클래스
- **Messages**: HumanMessage, AIMessage, SystemMessage 타입
- **stream()**: 토큰 단위 실시간 스트리밍 응답
- **invoke()**: 전체 응답을 한 번에 받기
- **Memory**: 대화 히스토리로 맥락 유지

### `index.ts` - CLI 인터페이스
- **readline**: Node.js 내장 모듈로 터미널 입력 처리
- **비동기 루프**: async/await로 대화 순환 구현

## 설정 변경

`src/config.ts` 파일에서 설정을 변경할 수 있습니다:

```typescript
export const config = {
  model: "llama3.2",           // 사용할 모델
  baseUrl: "http://localhost:11434",  // Ollama 서버 주소
  temperature: 0.7,            // 창의성 (0.0 ~ 1.0)
  systemPrompt: "...",         // AI 역할 정의
};
```

## 문제 해결

### "ECONNREFUSED" 오류
```
❌ Ollama 서버에 연결할 수 없습니다.
```
→ `ollama serve` 명령어로 Ollama 서버를 먼저 실행하세요.

### 모델을 찾을 수 없는 오류
```bash
# 설치된 모델 확인
ollama list

# 필요한 모델 다운로드
ollama pull llama3.2
```

### 응답이 너무 느린 경우
- 더 작은 모델 사용: `ollama pull mistral`
- `config.ts`에서 model을 변경

## 다음 단계

이 프로젝트를 완료한 후 도전해볼 것들:

1. **RAG (Retrieval-Augmented Generation)**: 문서 검색 + 답변 생성
2. **Tool/Function Calling**: AI가 외부 도구 호출
3. **Agent**: 스스로 계획하고 실행하는 AI
4. **Web UI**: Next.js로 웹 인터페이스 구현
