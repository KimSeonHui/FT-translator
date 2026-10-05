const enum Mode {
  TRANSLATE = "translate",
  INTERPRET = "interpret",
  COACH = "coach",
}

type Direction = "F_to_T" | "T_to_F";

interface TranslatorConfig {
  mode: Mode;
  direction: Direction;
  userType: "F" | "T"; // 사용자 본인의 유형
}

export { Mode, TranslatorConfig };
