const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);

const PostSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    text: {
      type: String,
      required: true,
      unique: true,
    },
    tags: {
      type: Array,
      default: [],
    },
    commentary: {
      type: Array,
      default: [],
    },
    viewsCount: {
      type: Number,
      default: 1587,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    imageUrl: String,
  },
  {
    timestamps: true,
  }
);

PostSchema.plugin(AutoIncrement, {
  inc_field: "ticket",
  id: "ticketNums",
  start_seq: 500,
});

module.exports = mongoose.model("Post", PostSchema);
