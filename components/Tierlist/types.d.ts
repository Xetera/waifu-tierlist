import { Character } from "../../shared/types";

export type TierName = "S" | "A" | "B" | "C" | "D" | "F" | "Unranked";

export interface Tier {
  readonly total: number;
  readonly sticky?: boolean;
  readonly name: TierName;
  readonly characters?: Character[];
}
