import db from "../db"
import OrderModel from "./orders.shcema"


type orderDetailsType = {

    
    userId:string,
    orderItems: 
      {
        name: string,
        qty: number,
        image: string,
        price: number,
      }[],
    
    shippingAddress: {
      name: string,
      address: string,
      city: string,
      postalCode: string,
      country: string,
    },
    paymentMethod: string,
    paymentResult: { id: String, status: String, email_address: String },
    itemsPrice: number,
    shippingPrice:number,
    taxPrice: number,
    totalPrice: number,
    isPaid: boolean,
    isDelivered: boolean,
    paidAt:  Date ,
    deliveredAt: Date ,
  

}





class OrderServices {

    static  createOrder = async (orderDetails:orderDetailsType) => {
        const order = await new OrderModel(orderDetails)
        const result = await order.save()
        return result
  }
  

  static getorderById = async (_id: string) => {
    const order = await OrderModel.findById({ _id: _id })
        if ( await order) {
            return order
        }
    }
}


export default OrderServices