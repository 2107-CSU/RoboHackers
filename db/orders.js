const { getUserById, getUserByEmail } = require('./users');
const client = require('./client');

const { getOrderProductsByOrder } = require("./order_products")

async function createOrder({userId, total_price, order_status}){
    console.log("Create Order", userId, total_price, order_status)
    try {
        const {rows: [order]} = await client.query(`
            INSERT INTO orders("userId", total_price, order_status)
            VALUES ($1, $2, $3)
            RETURNING *;
        `, [userId, total_price, order_status]);
        if(!order){
            return null;
        }
        return order;
    } catch (error) {
        console.error("Error creating Order", error);
        throw error;
    }
}

async function getAllOrders() {
    try{
        const {rows : orders} = await client.query(`
            SELECT * 
            FROM orders;
        `);
        await Promise.all(orders.map(async (order) => {
            //go get line items
            order.lineItems = await getOrderProductsByOrder(order.id);
            
            const user = await getUserById(order.userId);
            if(user){
                order.creatorEmail = user.email;
            }        
        }));
        if(orders.length == 0)
        {
            return [];
        }
        return orders;
    }catch(error){
        console.error("Error gettting All Orders", error);
        throw error;
    }
}

async function getOrdersByUserEmail(email){
    try{
        const allOrders = await getAllOrders();
        const user = await getUserByEmail(email);

        const userOrders = allOrders.filter((order) => {
            return user.email === order.creatorEmail;
        })

        return userOrders;
    }catch(error){
        console.error("Error getting All Orders by Email");
        throw error;
    }
}

module.exports = {
    createOrder,
    getAllOrders,
    getOrdersByUserEmail
}