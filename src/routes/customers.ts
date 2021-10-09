import express, { Request, Response } from 'express'
import { v4 as uuidv4 } from 'uuid'
import { body, validationResult, param } from 'express-validator'

interface Customer {
  uuid: string,
  name: string,
  email: string,
  address: string,
}

const router = express.Router()
const customers: Customer[] = []

const nameValidator = body('name').trim().escape().not().isEmpty()
const addressValidator = body('address').trim().escape().not().isEmpty()
const emailValidator = body('email').isEmail().normalizeEmail()

const createNewCustomerValidator = [
  nameValidator,
  emailValidator.custom(value => {
    const customer = customers.find(item => item.email === value)
    if (customer) throw new Error(`${value} already exist`)
    return true
  }),
  addressValidator,
]

const updateCustomerValidator = [
  nameValidator,
  addressValidator,
]

/* Get customers details. */
router.get('/:userId(\d+)', (req, res) => {
  const customer = customers.find(item => item.uuid === req.params.userId)
  if (!customer) return res.status(404)
  return res.json(customer)
})

/* Update customers details. */
router.put('/:userId(\d+)', [...updateCustomerValidator], (req: Request, res: Response) => {
  res.send(200)
})

/* Delete customers */
router.delete('/:userId(\d+)', (req, res) => {
  const customer = customers.find(item => item.uuid === req.params.userId)
  if (!customer) return res.status(400)
  return
})

/* Add a new customer */
router.post('/',
  [...createNewCustomerValidator],
  (req: Request, res: Response) => {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }

    const { name, email, address } = req.body
    const uuid = uuidv4()

    customers.push({
      uuid,
      name,
      email,
      address,
    })

    return res.status(201).json({
      uuid,
    })
  }
)

/* Get customers listing. */
router.get('/', (req, res) => {
  return res.json(customers)
})


export default router
