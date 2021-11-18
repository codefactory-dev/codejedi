const { qDifficulties, qTypes } = require("../src/utils/seed"),
  validator = require("validator"),
  mongoose = require("mongoose"),
  Schema = mongoose.Schema;

const submissionSchema = new Schema(
  {
    creatorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    questionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Question",
      required: true,
    },
    dateTime: {
      type: Date,
      required: true,
    },
    submissionCode: {
      type: String,
      required: true,
      enum: {
        values: [
          "Accepted",
          "WrongAnswer",
          "TimeLimit",
          "MemoryLimit",
          "NotTried",
        ],
        message:
          "{VALUE} is not a valid sumission code. Try Accepted, WrongAnswer, TimeLimit, MemoryLimit or NotTried",
      },
    },
    totalCases: {
      type: Number,
      required: true,
    },
    casesPassed: {
      type: Number,
      required: true,
    },
    stdout: {
      type: String,
      default: undefined,
    },
    stderr: {
      type: String,
      default: undefined,
    },
    error: {
      type: String,
      default: undefined,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Submission", submissionSchema);
