import { HttpContext } from '@adonisjs/core/http'
import Category from '#models/category'

export default class CategoryController {

  // 1. Get all categories
  public async index({ response }: HttpContext) {
    try {
      const categories = await Category.all() // Fetch all categories
      return response.json({
        success: true,
        categories
      })
    } catch (error) {
      return response.status(500).json({
        success: false,
        message: 'Failed to fetch categories',
        error: error.message
      })
    }
  }

  // 2. Get a single category by ID
  public async show({ params, response }: HttpContext) {
    try {
      const category = await Category.findOrFail(params.id)
      await category.load('products') // Preload related products if needed
      return response.json({
        success: true,
        category
      })
    } catch (error) {
      return response.status(404).json({
        success: false,
        message: 'Category not found',
        error: error.message
      })
    }
  }

  // 3. Create a new category
  public async store({ request, response }: HttpContext) {
    try {
      const data = request.only(['categoryName', 'description', 'parentCategoryId']) // Only get necessary data

      const category = await Category.create({
        categoryName: data.categoryName,
        description: data.description,
        parentCategoryId: data.parentCategoryId
      })

      return response.status(201).json({
        success: true,
        message: 'Category created successfully',
        category
      })
    } catch (error) {
      return response.status(400).json({
        success: false,
        message: 'Failed to create category',
        error: error.message
      })
    }
  }

  // 4. Update an existing category
  public async update({ params, request, response }: HttpContext) {
    try {
      const category = await Category.findOrFail(params.id)

      const data = request.only(['categoryName', 'description', 'parentCategoryId'])

      category.categoryName = data.categoryName
      category.description = data.description
      category.parentCategoryId = data.parentCategoryId

      await category.save()

      return response.json({
        success: true,
        message: 'Category updated successfully',
        category
      })
    } catch (error) {
      return response.status(400).json({
        success: false,
        message: 'Failed to update category',
        error: error.message
      })
    }
  }

  // 5. Delete a category
  public async destroy({ params, response }: HttpContext) {
    try {
      const category = await Category.findOrFail(params.id)
      await category.delete()

      return response.json({
        success: true,
        message: 'Category deleted successfully'
      })
    } catch (error) {
      return response.status(400).json({
        success: false,
        message: 'Failed to delete category',
        error: error.message
      })
    }
  }
}
