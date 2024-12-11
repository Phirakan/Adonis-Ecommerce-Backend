import Product from '#models/product'
import { HttpContext } from '@adonisjs/core/http'

export default class ProductController {

  // 1. Get all products
  public async index({ response }: HttpContext) {
    try {
      const products = await Product.query().preload('category')  
      return response.json({
        success: true,
        products
      })
    } catch (error) {
      return response.status(500).json({
        success: false,
        message: 'Failed to fetch products',
        error: error.message
      })
    }
  }

  // 2. Get a single product by ID
  public async show({ params, response }: HttpContext) {
    try {
      const product = await Product.findOrFail(params.id)
      await product.load('category')  
      return response.json({
        success: true,
        product
      })
    } catch (error) {
      return response.status(404).json({
        success: false,
        message: 'Product not found',
        error: error.message
      })
    }
  }

  // 3. Create a new product
  public async store({ request, response }: HttpContext) {
    try {
      const data = request.only([
        'name', 'description', 'price', 'stockQuantity', 'categoryId', 'imageUrl', 'isActive'
      ])

      // Custom Validation Logic
      if (!data.name || data.name.length < 3) {
        return response.status(400).json({
          success: false,
          message: 'Product name must be at least 3 characters long'
        })
      }

      if (typeof data.price !== 'number' || data.price <= 0) {
        return response.status(400).json({
          success: false,
          message: 'Price must be a positive number'
        })
      }

      if (typeof data.stockQuantity !== 'number' || data.stockQuantity < 0) {
        return response.status(400).json({
          success: false,
          message: 'Stock quantity must be a positive number'
        })
      }

      const product = await Product.create({
        name: data.name,
        description: data.description,
        price: data.price,
        stockQuantity: data.stockQuantity,
        categoryId: data.categoryId,
        imageUrl: data.imageUrl,
        isActive: data.isActive,
      })

      return response.status(201).json({
        success: true,
        message: 'Product created successfully',
        product
      })
    } catch (error) {
      return response.status(400).json({
        success: false,
        message: 'Failed to create product',
        error: error.message
      })
    }
  }

  // 4. Update an existing product
  public async update({ params, request, response }: HttpContext) {
    try {
      const product = await Product.findOrFail(params.id)

      const data = request.only([
        'name', 'description', 'price', 'stockQuantity', 'categoryId', 'imageUrl', 'isActive'
      ])

      // Custom Validation Logic
      if (!data.name || data.name.length < 3) {
        return response.status(400).json({
          success: false,
          message: 'Product name must be at least 3 characters long'
        })
      }

      if (typeof data.price !== 'number' || data.price <= 0) {
        return response.status(400).json({
          success: false,
          message: 'Price must be a positive number'
        })
      }

      if (typeof data.stockQuantity !== 'number' || data.stockQuantity < 0) {
        return response.status(400).json({
          success: false,
          message: 'Stock quantity must be a positive number'
        })
      }

      product.name = data.name
      product.description = data.description
      product.price = data.price
      product.stockQuantity = data.stockQuantity
      product.categoryId = data.categoryId
      product.imageUrl = data.imageUrl
      product.isActive = data.isActive

      await product.save()

      return response.json({
        success: true,
        message: 'Product updated successfully',
        product
      })
    } catch (error) {
      return response.status(400).json({
        success: false,
        message: 'Failed to update product',
        error: error.message
      })
    }
  }

  // 5. Delete a product
  public async destroy({ params, response }: HttpContext) {
    try {
      const product = await Product.findOrFail(params.id)
      await product.delete()

      return response.json({
        success: true,
        message: 'Product deleted successfully'
      })
    } catch (error) {
      return response.status(400).json({
        success: false,
        message: 'Failed to delete product',
        error: error.message
      })
    }
  }
}
