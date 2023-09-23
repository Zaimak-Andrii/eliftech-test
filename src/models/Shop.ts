import mongoose, { Schema } from 'mongoose';

const shopSchema = new Schema(
  {
    name: String,
  },
  {
    timestamps: true,
  }
);

const Shop = mongoose.models.Shop || mongoose.model('Shop', shopSchema);

export default Shop;
