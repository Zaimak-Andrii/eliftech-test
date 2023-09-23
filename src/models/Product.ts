import mongoose, { Schema, Types } from 'mongoose';

const productSchema = new Schema(
  {
    name: String,
    imageUrl: String,
    price: Number,
    shop: {
      type: Types.ObjectId,
      ref: 'Shop',
    },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.models.Product || mongoose.model('Product', productSchema);

export default Product;
