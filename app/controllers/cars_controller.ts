import type { HttpContext } from '@adonisjs/core/http'
import app from '@adonisjs/core/services/app'
import Car from '#models/car'

export default class CarsController {

  // GET /Cars
  public async index() {
    const cars = await Car.query()
      .orderBy('id', 'desc')  
    return cars
  }

  // POST /create
  public async create({ request, response }: HttpContext) {
    try {
      const image = request.file('image', {
        extnames: ['jpg', 'jpeg', 'png'], 
        size: '2mb', 
      })
  
      if (!image) {
        return response.status(400).json({ message: 'Image file is required' })
      }
  
     
      const imageName = `${new Date().getTime()}.${image.extname}`
      await image.move(app.publicPath('uploads'), { name: imageName })
  
      
      const data = request.only(['brand', 'model', 'year', 'price'])
      const car = await Car.create({ ...data, image_url: `/uploads/${imageName}` })
  
      return response.status(201).json({ message: 'Car created successfully', data: car })
    } catch (error) {
      console.error('Error creating car:', error)
      return response.status(500).json({ message: 'Failed to create car', error: error.message })
    }
  }
  // DELETE /delete/:id
  public async delete({ params, response }: HttpContext) {
    try {
      // Find data by id
      const car = await Car.findOrFail(params.id)

      // Delete data
      await car.delete()

      return response.status(200).json({
        message: 'Car deleted successfully',
        data: car,
      })
    } catch (error) {
      console.error('Error deleting car:', error)
      return response.status(500).json({
        message: 'Failed to delete car',
        error: error.message,
      })
    }
  }

  // PUT /update/:id
  public async update({ params, request, response }: HttpContext) {
    try {
      const car = await Car.findOrFail(params.id);
      const data = {
        Brand: request.input('brand'),
        Model: request.input('model'),
        Year: request.input('year'),
        Price: request.input('price')
      };
  
      const image = request.file('image', {
        extnames: ['jpg', 'jpeg', 'png'],
        size: '2mb',
      });
  
      if (image) {
        const imageName = `${new Date().getTime()}.${image.extname}`;
        await image.move(app.publicPath('uploads'), { name: imageName });
        car.image_url = `/uploads/${imageName}`;
      }
  
      car.merge(data);
      await car.save();
  
      return response.status(200).json({
        message: 'Car updated successfully',
        data: car,
      });
    } catch (error) {
      return response.status(500).json({
        message: 'Failed to update car',
        error: error.message,
      });
    }
  }
  
  
//   // PUT /Cars/:id/status
//   public async updateStatus({ params, request, response }: HttpContext) {
//   try {
//     const car = await Car.findOrFail(params.id); // ค้นหารถจาก ID

//     // รับค่า status จาก request
//     const { status } = request.only(['status']);

//     // ตรวจสอบให้แน่ใจว่า status ที่รับมาถูกต้อง
//     const validStatuses = ['available', 'sold', 'reserved', 'paid']; // สถานะที่รองรับ

//     if (!validStatuses.includes(status)) {
//       return response.status(400).json({ message: 'Invalid status' });
//     }

//     car.status = status; // อัปเดตสถานะของรถ
//     await car.save(); // บันทึกข้อมูล

//     return response.status(200).json({
//       message: 'Car status updated successfully',
//       data: car,
//     });

//   } catch (error) {
//     console.error('Error updating car status:', error);
//     return response.status(500).json({
//       message: 'Failed to update car status',
//       error: error.message,
//     });
//   }
// }



  
}
