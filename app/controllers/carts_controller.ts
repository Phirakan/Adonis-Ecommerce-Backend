import Cart from '#models/cart'
import { HttpContext } from '@adonisjs/core/http'

export default class CartController {
  
  // ฟังก์ชันดึงข้อมูลสินค้าทั้งหมดในตะกร้า
  public async index({ auth, response }: HttpContext) {
    try {
      await auth.authenticate()
      const user = auth.user! as { id: number }

      const cartItems = await Cart.query()
        .where('userId', user.id)
        .preload('product')

      return response.json({
        success: true,
        cartItems
      })
    } catch (error) {
      if (error.code === 'E_UNAUTHORIZED_ACCESS') {
        return response.status(401).json({
          success: false,
          message: 'Please login to access your cart',
          error: 'Unauthorized access'
        })
      }

      return response.status(500).json({
        success: false,
        message: 'Failed to fetch cart items',
        error: error.message
      })
    }
  }

  // ฟังก์ชันเพิ่มสินค้าลงในตะกร้า
  public async store({ request, auth, response }: HttpContext) {
    try {
      await auth.authenticate()
      const user = auth.user! as { id: number }

      // รับข้อมูลจาก frontend (productId และ quantity)
      const { productId, quantity } = request.only(['productId', 'quantity'])

      // ตรวจสอบว่าจำนวนสินค้ามากกว่า 0 หรือไม่
      if (quantity <= 0) {
        return response.status(400).json({
          success: false,
          message: 'Quantity must be greater than 0'
        })
      }

      // ตรวจสอบว่าในตะกร้ามีสินค้านี้หรือไม่
      const existingCartItem = await Cart.query()
        .where('userId', user.id)
        .where('productId', productId)
        .first()

      if (existingCartItem) {
        // ถ้ามีสินค้าแล้วให้เพิ่มจำนวนสินค้า
        existingCartItem.quantity += quantity
        await existingCartItem.save()
        
        return response.json({
          success: true,
          message: 'Product quantity updated in cart',
          cartItem: existingCartItem
        })
      }

      // ถ้ายังไม่มีสินค้าในตะกร้า ให้เพิ่มสินค้าลงในตะกร้า
      const cartItem = await Cart.create({
        userId: user.id,
        productId,
        quantity
      })

      return response.status(201).json({
        success: true,
        message: 'Product added to cart',
        cartItem
      })
    } catch (error) {
      if (error.code === 'E_UNAUTHORIZED_ACCESS') {
        return response.status(401).json({
          success: false,
          message: 'Please login to add items to cart',
          error: 'Unauthorized access'
        })
      }

      return response.status(400).json({
        success: false,
        message: 'Failed to add product to cart',
        error: error.message
      })
    }
  }

  // ฟังก์ชันอัปเดตจำนวนสินค้าในตะกร้า
  public async update({ request, params, auth, response }: HttpContext) {
    try {
      await auth.authenticate()
      const user = auth.user! as { id: number }

      // รับข้อมูลจำนวนสินค้าที่ต้องการอัปเดต
      const { quantity } = request.only(['quantity'])

      if (quantity <= 0) {
        return response.status(400).json({
          success: false,
          message: 'Quantity must be greater than 0'
        })
      }

      // ค้นหาสินค้าในตะกร้าของผู้ใช้
      const cartItem = await Cart.query()
        .where('userId', user.id)
        .where('id', params.id)
        .firstOrFail()

      // อัปเดตจำนวนสินค้าในตะกร้า
      cartItem.quantity = quantity
      await cartItem.save()

      return response.json({
        success: true,
        message: 'Product quantity updated in cart',
        cartItem
      })
    } catch (error) {
      if (error.code === 'E_UNAUTHORIZED_ACCESS') {
        return response.status(401).json({
          success: false,
          message: 'Please login to update items in cart',
          error: 'Unauthorized access'
        })
      }

      return response.status(400).json({
        success: false,
        message: 'Failed to update product quantity',
        error: error.message
      })
    }
  }

  // ฟังก์ชันลบสินค้าจากตะกร้า
  public async destroy({ params, auth, response }: HttpContext) {
    try {
      await auth.authenticate()
      const user = auth.user! as { id: number }

      const cartItem = await Cart.query()
        .where('userId', user.id)
        .where('id', params.id)
        .firstOrFail()

      await cartItem.delete()

      return response.json({
        success: true,
        message: 'Product removed from cart'
      })
    } catch (error) {
      if (error.code === 'E_UNAUTHORIZED_ACCESS') {
        return response.status(401).json({
          success: false,
          message: 'Please login to remove items from cart',
          error: 'Unauthorized access'
        })
      }

      return response.status(400).json({
        success: false,
        message: 'Failed to remove product from cart',
        error: error.message
      })
    }
  }
}
