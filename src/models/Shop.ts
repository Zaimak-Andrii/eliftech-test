import mongoose, { Schema } from 'mongoose';

const shopSchema = new Schema(
  {
    name: String,
    logoUrl: String,
    addresses: [
      {
        name: String,
        coordinate: {
          lat: Number,
          lng: Number,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Shop = mongoose.models.Shop || mongoose.model('Shop', shopSchema);

export default Shop;
