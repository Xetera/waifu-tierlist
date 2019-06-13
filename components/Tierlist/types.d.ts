import { Character } from "../../shared/types";

export type TierName = "S" | "A" | "B" | "C" | "D" | "F" | "Unranked";

export interface Tier {
  readonly draggable?: boolean;
  readonly total: number;
  readonly name: TierName;
  readonly characters?: Character[];
  readonly className?: string;
  readonly update: (rank: string, chars: Character[]) => void;
}

