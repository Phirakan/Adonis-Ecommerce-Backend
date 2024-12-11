import ProductReview from '#models/product_review'
import Product from '#models/product'
import User from '#models/user'
import { HttpContext } from '@adonisjs/core/http'

export default class ProductReviewController {
  
  // 1. Get all reviews for a specific product
  public async index({ params, response }: HttpContext) {
    try {
      const reviews = await ProductReview.query()
        .where('product_id', params.productId)
        .preload('product')  // Preload related product
        .preload('user')  // Preload related user
      return response.json({
        success: true,
        reviews
      })
    } catch (error) {
      return response.status(500).json({
        success: false,
        message: 'Failed to fetch reviews',
        error: error.message
      })
    }
  }

  // 2. Create a new review for a product
  public async store({ request, response }: HttpContext) {
    try {
      const { productId, userId, rating, reviewText } = request.only([
        'productId', 'userId', 'rating', 'reviewText'
      ])
      
      const review = await ProductReview.create({
        productId,
        userId,
        rating,
        reviewText
      })

      return response.status(201).json({
        success: true,
        message: 'Review created successfully',
        review
      })
    } catch (error) {
      return response.status(400).json({
        success: false,
        message: 'Failed to create review',
        error: error.message
      })
    }
  }

  // 3. Get a single review by ID
  public async show({ params, response }: HttpContext) {
    try {
      const review = await ProductReview.findOrFail(params.id)
      await review.load('product')  // Preload product
      await review.load('user')  // Preload user
      return response.json({
        success: true,
        review
      })
    } catch (error) {
      return response.status(404).json({
        success: false,
        message: 'Review not found',
        error: error.message
      })
    }
  }

  // 4. Update an existing review
  public async update({ params, request, response }: HttpContext) {
    try {
      const review = await ProductReview.findOrFail(params.id)
      
      const { rating, reviewText } = request.only(['rating', 'reviewText'])
      
      review.rating = rating
      review.reviewText = reviewText

      await review.save()

      return response.json({
        success: true,
        message: 'Review updated successfully',
        review
      })
    } catch (error) {
      return response.status(400).json({
        success: false,
        message: 'Failed to update review',
        error: error.message
      })
    }
  }

  // 5. Delete a review
  public async destroy({ params, response }: HttpContext) {
    try {
      const review = await ProductReview.findOrFail(params.id)
      await review.delete()

      return response.json({
        success: true,
        message: 'Review deleted successfully'
      })
    } catch (error) {
      return response.status(400).json({
        success: false,
        message: 'Failed to delete review',
        error: error.message
      })
    }
  }
}
