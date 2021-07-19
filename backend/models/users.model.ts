import { Schema, model, Model, Document } from "mongoose";

interface IUser extends Document {
  name: {
    first: string;
    last: string;
  };
  email: string;
  password: string;

  isEmailAvailable: (a: string) => boolean;
}

interface UsersModel extends Model<IUser> {
  isEmailAvailable: (a: string) => boolean;
}

const UsersSchema: Schema<IUser> = new Schema({
  name: {
    first: {
      type: String,
      required: true,
    },
    last: {
      type: String,
      required: true,
    },
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

UsersSchema.static("isEmailAvailable", function (email: string) {
  const users = this.find({ email });
  return users !== 0;
});

export default model<IUser, UsersModel>("Users", UsersSchema);
