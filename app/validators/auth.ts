import vine from '@vinejs/vine'

const password = vine.string().minLength(8)

export const registerValidator = vine.compile(
    vine.object({
        fullName: vine.string().maxLength(100),

        email: vine.string().email().normalizeEmail(),

        password: vine.string().minLength(8),

        role: vine.enum(['admin', 'customer']) 

    })
)

export const loginValidator = vine.compile(

    vine.object({
        email: vine.string().email().normalizeEmail(),

        password: vine.string(),
    })
)