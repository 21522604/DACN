const Role = require('../models/role')
const Order_State = require('../models/order_state')

module.exports = {

    createRecordsDefault: async () => {
        try {
            roleAdmin = await Role.findOne({ where: { role_id: 1 } })
            if (roleAdmin == null) await Role.create({ role_id: 1, role_name: 'admin' })

            roleCustomer = await Role.findOne({ where: { role_id: 2 } })
            if (roleCustomer == null) await Role.create({ role_id: 2, role_name: 'customer' })

            state1 = await Order_State.findOne({ where: { state_id: 1 } })
            if (state1 == null) await Order_State.create({ state_id: 1, state_name: 'Chờ Xác Nhận' })

            state2 = await Order_State.findOne({ where: { state_id: 2 } })
            if (state2 == null) await Order_State.create({ state_id: 2, state_name: 'Đã Xác Nhận' })

            state3 = await Order_State.findOne({ where: { state_id: 3 } })
            if (state3 == null) await Order_State.create({ state_id: 3, state_name: 'Đang Vận Chuyển' })

            state4 = await Order_State.findOne({ where: { state_id: 4 } })
            if (state4 == null) await Order_State.create({ state_id: 4, state_name: 'Đã Giao' })

            state5 = await Order_State.findOne({ where: { state_id: 5 } })
            if (state5 == null) await Order_State.create({ state_id: 5, state_name: 'Đã Hủy' })

            state6 = await Order_State.findOne({ where: { state_id: 6 } })
            if (state6 == null) await Order_State.create({ state_id: 6, state_name: 'Hủy Bởi Shop' })
        } catch (err) {
            console.log(err)
        }
    }
}
