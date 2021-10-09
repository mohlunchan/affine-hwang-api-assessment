import { body } from 'express-validator'
import { getCustomersFromDatabase } from './model'

const nameValidator = body('name').trim().escape().not().isEmpty()
const addressValidator = body('address').trim().escape().not().isEmpty()
const emailValidator = body('email').isEmail().normalizeEmail()

export const createNewCustomerValidator = [
    nameValidator,
    emailValidator.custom(async value => {
        const customers = await getCustomersFromDatabase()
        const customer = customers.find(item => item.email === value)
        if (customer) return Promise.reject(`${value} already exist`);
        return Promise.resolve(true)
    }),
    addressValidator,
]

export const updateCustomerValidator = [
    nameValidator,
    addressValidator,
]