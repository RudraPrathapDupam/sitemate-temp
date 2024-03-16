import mongoose from 'mongoose';
import Joi from 'joi';
const { Schema } = mongoose;

const issueSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
  },
  { timestamps: true },
);

issueSchema.methods.toJSON = function () {
  return {
    id: this._id,
    title: this.title,
    createdAt: this.createdAt,
    updatedAt: this.updatedAt,
    description: this.description,
  };
};

export const validateIssue = (issue) => {
  const schema = {
    title: Joi.string().min(5).max(300).required(),
    description: Joi.string().min(0).max(5000),
  };
  return Joi.validate(issue, schema);
};

const Issue = mongoose.model('Issue', issueSchema);

export default Issue;
