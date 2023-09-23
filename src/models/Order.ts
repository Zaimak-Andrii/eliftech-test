import mongoose, { Schema, Types } from 'mongoose';

const orderSchema = new Schema(
  {
    name: {
      type: String,
      require: true,
    },
    email: {
      type: String,
      require: true,
    },
    phone: { type: Number, require: true },
    address: {
      type: String,
      require: true,
    },
    coupon: String,
    products: [
      {
        product: {
          type: Types.ObjectId,
          ref: 'Product',
          required: true,
        },
        count: {
          type: Number,
          required: true,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Order = mongoose.models.Order || mongoose.model('Order', orderSchema);

export default Order;
