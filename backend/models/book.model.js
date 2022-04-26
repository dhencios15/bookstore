import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";
import slugify from "slugify";

const bookSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      minlength: [3, "A book title must have at least 3 characters"],
    },
    slug: String,
    description: String,
    price: {
      type: Number,
      required: true,
    },
    stock: {
      type: Number,
      required: true,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

bookSchema.plugin(mongoosePaginate);

bookSchema.index({ slug: 1 });

bookSchema.pre("save", function (next) {
  this.slug = slugify(this.title, { lower: true });
  next();
});

const Book = mongoose.model("Book", bookSchema);

export default Book;
