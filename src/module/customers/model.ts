import { v4 as uuidv4 } from 'uuid'

interface Customer {
    uuid: string,
    name: string,
    email: string,
    address: string,
}

const CustomersModel: Customer[] = []
const delay = 500

// use timeput to simulate getting data from database
export const getCustomer = (uuid: string) => {
    return new Promise<Customer | undefined>(resolve => {
        setTimeout(() => {
            return resolve(CustomersModel.find(customer => customer.uuid === uuid))
        }, delay)
    })
}

export const getCustomers = () => {
    return new Promise<Customer[]>(resolve => {
        setTimeout(() => {
            return resolve(CustomersModel)
        }, delay)
    })
}

export const createCustomer = (data: Omit<Customer, "uuid">) => {
    return new Promise<string>(resolve => {
        setTimeout(() => {
            const uuid = uuidv4()

            CustomersModel.push({
                ...data,
                uuid,
            })

            return resolve(uuid)
        }, delay)
    })
}

export const updateCustomer = (data: Omit<Customer, "email">) => {
    return new Promise<void>((resolve, reject) => {
        setTimeout(() => {
            const index = CustomersModel.findIndex(customer => customer.uuid === data.uuid)
            if (index === -1) return reject("Invalid Customer")

            CustomersModel[index] = {
                ...CustomersModel[index],
                ...data,
            }

            return resolve()
        }, delay)
    })
}

export const deleteCustomer = (uuid: string) => {
    return new Promise<void>((resolve, reject) => {
        setTimeout(() => {
            const index = CustomersModel.findIndex(customer => customer.uuid === uuid)
            if (index === -1) return reject("Invalid Customer")

            CustomersModel.splice(index, 1);

            return resolve();
        }, delay)
    })
}