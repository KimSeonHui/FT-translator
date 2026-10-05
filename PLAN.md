# FT 번역기 챗봇 개발 계획

## 컨셉

"F와 T 사이의 통역사" - 서로 다른 소통 방식을 가진 F(감정형)와 T(사고형) 사이의 대화를 번역/해석/코칭해주는 챗봇

### 주요 기능 3가지

1. **번역 모드**: 내가 한 말을 상대방(F 또는 T) 언어로 변환
2. **해석 모드**: 상대방이 한 말의 의도를 내 언어로 해석
3. **코칭 모드**: 특정 상황에서 어떻게 말하면 좋을지 제안

---

## 개발 로드맵

### Phase 1: 기본 FT 번역기 (현재 챗봇 확장)

기존 `src/chatbot.ts` 구조를 활용하여 FT 번역기로 변환

- 모드 선택 시스템 추가 (번역/해석/코칭)
- F→T, T→F 방향 선택
- 각 모드별 시스템 프롬프트 설계

```
src/
├── index.ts              # CLI 인터페이스 (모드 선택 추가)
├── chatbot.ts            # 기존 유지
├── ft-translator.ts      # FT 번역기 핵심 로직 (NEW)
├── prompts/
│   ├── translate.ts      # 번역 모드 프롬프트
│   ├── interpret.ts      # 해석 모드 프롬프트
│   └── coach.ts          # 코칭 모드 프롬프트
└── config.ts             # 설정
```

### Phase 2: RAG 추가 (예시 기반 번역 품질 향상)

F/T 대화 패턴, 밈, 예시 상황 데이터를 활용한 RAG 시스템

- 벡터 DB에 F/T 대화 예시 저장 (Chroma 또는 FAISS)
- 사용자 입력과 유사한 예시를 검색하여 컨텍스트로 제공
- 더 자연스럽고 밈 감성 있는 번역 가능

```
data/
├── ft-examples.json      # F/T 대화 예시 데이터
└── ft-memes.json         # 밈/유머 예시

src/
├── rag/
│   ├── vectorStore.ts    # 벡터 스토어 설정
│   ├── embeddings.ts     # 임베딩 처리
│   └── retriever.ts      # 검색 로직
```

### Phase 3: Next.js 웹 UI

CLI 버전 완성 후 웹 인터페이스 추가

- 채팅 UI (스트리밍 응답)
- 모드/방향 선택 UI
- 대화 히스토리 저장
- (선택) 공유 기능

```
web/
├── app/
│   ├── page.tsx          # 메인 페이지
│   ├── api/
│   │   └── chat/route.ts # API 라우트
│   └── components/
│       ├── ChatWindow.tsx
│       ├── ModeSelector.tsx
│       └── MessageBubble.tsx
```

---

## Phase 1 상세 구현

### 1. 모드 시스템 설계

```typescript
type TranslatorMode = "translate" | "interpret" | "coach";
type Direction = "F_to_T" | "T_to_F";

interface TranslatorConfig {
  mode: TranslatorMode;
  direction: Direction;
  userType: "F" | "T"; // 사용자 본인의 유형
}
```

### 2. 프롬프트 설계 예시 (번역 모드)

```typescript
// F→T 번역: 감정적 표현을 논리적으로 변환
const F_TO_T_TRANSLATE = `
당신은 MBTI F(감정형)의 말을 T(사고형)가 이해하기 쉽게 번역하는 통역사입니다.

F의 특징: 감정 중심, 공감 요청, 관계 중시
T의 특징: 논리 중심, 해결책 선호, 사실 중시

번역 규칙:
- 감정적 호소 → 구체적 상황 설명
- "너무 속상해" → "이런 상황이 발생했고, 이런 점이 문제야"
- 공감 요청의 의도를 명시적으로 전달
`;
```

### 3. CLI 명령어 확장

```
/mode translate  - 번역 모드
/mode interpret  - 해석 모드
/mode coach      - 코칭 모드
/direction f2t   - F→T 방향
/direction t2f   - T→F 방향
/mytype f        - 나는 F유형
/mytype t        - 나는 T유형
```

---

## 체크리스트

- [ ] Phase 1: 모드 시스템 및 ft-translator.ts 구현
- [ ] Phase 1: 번역/해석/코칭 모드별 프롬프트 설계
- [ ] Phase 1: CLI 명령어 확장 (/mode, /direction, /mytype)
- [ ] Phase 2: FT 대화 예시 데이터 수집/작성
- [ ] Phase 2: RAG 시스템 구현 (벡터 스토어 + 검색)
- [ ] Phase 3: Next.js 웹 UI 구현

---

## 차별화 포인트

1. **밈 감성**: 딱딱한 번역이 아닌, FT 밈에서 보던 그 느낌
2. **양방향**: F→T, T→F 모두 지원
3. **3가지 모드**: 상황에 맞는 다양한 도움
4. **학습 여정 문서화**: 각 Phase별 브랜치로 발전 과정 기록
