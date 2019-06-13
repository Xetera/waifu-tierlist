import { Document, Schema, Model, model } from "mongoose";
import { TierlistState } from "../../shared/types";
import shortid from "shortid";

export interface ISavedList extends Document {
  name: string;
  characters: TierlistState<number[]>;
  animeId: string;
  animeName: string;
  url: string;
}

export const SavedListSchema: Schema = new Schema(
  {
    name: String,
    characters: Object,
    animeId: Number,
    animeName: String,
    url: {
      type: String,
      default: shortid.generate
    }
  },
  {
    timestamps: true
  }
);

export const SavedList: Model<ISavedList> = model<ISavedList>(
  "SavedList",
  SavedListSchema
);
