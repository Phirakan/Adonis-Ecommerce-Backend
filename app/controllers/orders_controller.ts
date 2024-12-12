import { HttpContext } from '@adonisjs/core/http'
import Order from '#models/order'
import OrderItem from '#models/order_item'
import Cart from '#models/cart';


export default class OrderController {
  // Create a new order
  public async store({ request, auth, response }: HttpContext) {
    try {
      await auth.authenticate();
      const user = auth.user! as { id: number };
      const { totalAmount, orderStatus, shippingAddress, billingAddress } = request.only([
        'totalAmount', 'orderStatus', 'shippingAddress', 'billingAddress'
      ]);
  
      const cartItems = await Cart.query().where('userId', user.id).preload('product');
      if (cartItems.length === 0) {
        return response.status(400).json({
          success: false,
          message: 'Cart is empty. Please add items to the cart.'
        });
      }
  
      const order = await Order.create({
        userId: user.id,
        totalAmount,
        orderStatus,
        shippingAddress,
        billingAddress
      });
  
      // Save the order items (cart items)
      for (let item of cartItems) {
        await OrderItem.create({
          orderId: order.id,
          productId: item.productId,
          quantity: item.quantity,
          priceAtTime: item.product.price // Use the price from the associated product
        });
      }
  
      // Clear the user's cart after placing the order
      await Cart.query().where('userId', user.id).delete();
  
      return response.status(201).json({
        success: true,
        message: 'Order placed successfully',
        data: order
      });
    } catch (error) {
      return response.status(500).json({
        success: false,
        message: 'Failed to create order',
        error: error.message
      });
    }
  }

  // Get all orders
  public async index({ response }: HttpContext) {
    try {
      const orders = await Order.query().preload('user').preload('orderItems')
      return response.status(200).json({
        success: true,
        data: orders
      })
    } catch (error) {
      return response.status(500).json({
        success: false,
        message: 'Failed to fetch orders',
        error: error.message
      })
    }
  }

  // Get a single order by ID
  public async show({ params, response }: HttpContext) {
    try {
      const order = await Order.query().where('id', params.id).preload('user').preload('orderItems').firstOrFail()
      return response.status(200).json({
        success: true,
        data: order
      })
    } catch (error) {
      return response.status(404).json({
        success: false,
        message: 'Order not found',
        error: error.message
      })
    }
  }

  // Update an existing order
  public async update({ params, request, response }: HttpContext) {
    const orderData = request.only(['totalAmount', 'orderStatus', 'shippingAddress', 'billingAddress'])
    
    try {
      const order = await Order.findOrFail(params.id)
      order.merge(orderData)
      await order.save()
      
      return response.status(200).json({
        success: true,
        message: 'Order updated successfully',
        data: order
      })
    } catch (error) {
      return response.status(500).json({
        success: false,
        message: 'Failed to update order',
        error: error.message
      })
    }
  }

  // Delete an order
  public async destroy({ params, response }: HttpContext) {
    try {
      const order = await Order.findOrFail(params.id)
      await order.delete()
      
      return response.status(200).json({
        success: true,
        message: 'Order deleted successfully'
      })
    } catch (error) {
      return response.status(500).json({
        success: false,
        message: 'Failed to delete order',
        error: error.message
      })
    }
  }
}
