import { Schema, model, Model, Document } from "mongoose";

export interface INotes extends Document {
  content: string;
  group: string | null;
  title: string;
  owner: string;
}

const NotesSchema = new Schema<INotes>({
  content: {
    type: String,
    default: "",
  },
  group: {
    type: String,
    default: "",
  },
  title: {
    type: String,
    default: "",
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: "notes",
  },
});

export default model<INotes>("notes", NotesSchema);
