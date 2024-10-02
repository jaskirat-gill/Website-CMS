import { connectDB } from '@/lib/mongodb';
import Order, { IOrder } from '@/models/Order';
import { faker } from '@faker-js/faker';
import { simpleFaker } from '@faker-js/faker';

export const generateFakeOrders = async (numOrders: number) => {
  await connectDB();

  const orders: IOrder[] = [];
  
  for (let i = 0; i < numOrders; i++) {
    const order: IOrder = {
      customerName: faker.person.fullName(),
      items: [
        {
          productId: simpleFaker.string.uuid(),
          quantity: simpleFaker.number.int(10),
          price: 1
        },
        {
          productId: simpleFaker.string.uuid(),
          quantity: simpleFaker.number.int(10),
          price: 1
        },
      ],
      totalAmount: parseFloat(faker.commerce.price()),
      status: faker.helpers.arrayElement(['pending', 'completed', 'canceled']),
      createdAt: faker.date.recent(),
      updatedAt: faker.date.recent(),
      phone: faker.phone.number(),
      email: faker.internet.email(),
      id: faker.string.alphanumeric(7),
      shippingCost: faker.number.int(100),
      tax: faker.number.int(100),
      subtotal: faker.number.int(100),
      shippingInformation: {
        name: faker.person.fullName(),
        address: faker.location.streetAddress(),
        city: faker.location.city(),
        province: faker.location.state(),
        postalCode: faker.location.zipCode(),
      },
      billingInformation: {
        
      }

    };
    
    orders.push(order);
  }

  await Order.insertMany(orders);
  console.log(`${numOrders} fake orders generated!`);
};

generateFakeOrders(10)
  .then(() => {
    console.log('Done!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('Error generating fake orders:', error);
    process.exit(1);
  });
