import express from 'express'
import { body, validationResult } from 'express-validator';

interface Customer {
  id: string,
  name: string,
  email: string,
  address: string,
}

const router = express.Router();
const customers: Customer[] = [];

/* Get customers details. */
router.get('/:userId(\d+)', (req, res) => {
  const customer = customers.find(item => item.id === req.params.userId)
  if (!customer) return res.status(404)
  return res.json(customer)
});

/* Update customers details. */
router.put('/:userId(\d+)', (req, res) => {
  res.send('respond with a resource');
});

/* Delete customers */
router.delete('/:userId(\d+)', (req, res) => {
  const customer = customers.find(item => item.id === req.params.userId)
  if (!customer) return res.status(400)
  return
});

/* Add a new customer */
router.post('/',
  body('name').isEmpty(),
  body('email').isEmail(),
  body('address').isEmpty(),
  (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
  }
);

/* Get customers listing. */
router.get('/', (req, res) => {
  return res.json(customers)
});


export default router
