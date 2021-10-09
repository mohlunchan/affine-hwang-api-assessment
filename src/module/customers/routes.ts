import express, { Request, Response } from 'express'
import { validationResult } from 'express-validator'
import { createNewCustomerValidator, updateCustomerValidator } from './validators'
import { getCustomersFromDatabase, createCustomerToDatabase, updateCustomer, getCustomer, deleteCustomer } from './model'

const router = express.Router()

/* Get customers details. */
router.get('/:uuid', async (req: Request, res: Response) => {
    const customer = await getCustomer(req.params.uuid);

    if (!customer) return res.sendStatus(404)

    return res.json(customer)
})

/* Update customers details. */
router.put('/:uuid', [...updateCustomerValidator], async (req: Request, res: Response) => {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    try {
        const { name, address } = req.body
        const { uuid } = req.params;

        await updateCustomer({
            uuid,
            name, address
        })

        res.sendStatus(200)
    } catch (error) {
        res.status(400).json({ error })

    }
})

/* Delete customers */
router.delete('/:uuid', async (req: Request, res: Response) => {
    try {
        await deleteCustomer(req.params.uuid)

        res.sendStatus(200)
    } catch (error) {
        res.status(400).json({ error })
    }
})

/* Add a new customer */
router.post('/',
    [...createNewCustomerValidator],
    async (req: Request, res: Response) => {
        const errors = validationResult(req)

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }

        const { name, email, address } = req.body

        const uuid = await createCustomerToDatabase({
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
router.get('/', async (req: Request, res: Response) => {
    const customers = await getCustomersFromDatabase();
    return res.json(customers)
})


export default router