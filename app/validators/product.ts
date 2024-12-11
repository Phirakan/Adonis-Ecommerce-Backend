// import 'Adonis/Core/Validator'  
// import { schema, rules } from 'Adonis/Core/Validator'




// export const productValidator = schema.create({
//   name: schema.string({ trim: true }, [rules.required()]),
//   description: schema.string.optional(),
//   price: schema.number([rules.required(), rules.range(0.01, 10000)]),
//   stockQuantity: schema.number([rules.required(), rules.range(1, 1000)]),
//   categoryId: schema.number([rules.required(), rules.exists({ table: 'categories', column: 'id' })]),
//   imageUrl: schema.string.optional(),
//   isActive: schema.boolean.optional(),
// })
