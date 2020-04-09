const CustomerModel = require('../modules/customer')

class customerController {
    /**
     * 创建顾客
     * @param ctx
     * @returns {Promise.<void>}
     */
    static async create(ctx) {
        // 接收客服端
        let req = ctx.request.body;
        if (req.phone
            && req.password
        ) {
            try {
                // 创建顾客模型
                const ret = await CustomerModel.createCustomer(req);
                // 把刚刚新建的顾客ID查询顾客详情，且返回新创建的顾客信息
                const data = await CustomerModel.getCustomerDetail(ret.id);
                ctx.response.status = 200;
                ctx.body = {
                    code: 200,
                    msg: '创建顾客成功',
                    data
                }

            } catch (err) {
                ctx.response.status = 412;
                ctx.body = {
                    code: 412,
                    msg: '创建顾客失败',
                    data: err
                }
            }
        } else {
            ctx.response.status = 416;
            ctx.body = {
                code: 416,
                msg: '参数不齐全',
            }
        }

    }

    /**
     * 获取顾客详情
     * @param ctx
     * @returns {Promise.<void>}
     */
    static async detail(ctx) {
        let phone = ctx.params.phone;

        if (phone) {
            try {
                // 查询顾客详情模型
                let data = await CustomerModel.getCustomerDetail(phone);
                ctx.response.status = 200;
                ctx.body = {
                    code: 200,
                    msg: '查询成功',
                    data
                }

            } catch (err) {
                ctx.response.status = 412;
                ctx.body = {
                    code: 412,
                    msg: '查询失败',
                    data: err
                }
            }
        } else {
            ctx.response.status = 416;
            ctx.body = {
                code: 416,
                msg: '顾客ID必须传'
            }
        }
    }
        /**
     * 获取所有顾客
     * @param ctx
     * @returns {Promise.<void>}
     */
    static async allcustomer(ctx) {
        try{
            // 获取数据库全部顾客信息
            let data = await CustomerModel.getAllCustomer();
            ctx.response.status = 200;
            ctx.body = {
                code: 200,
                msg: '查询成功',
                data
            }
        }catch (err) {
            ctx.response.status = 412;
                ctx.body = {
                    code: 412,
                    msg: '查询失败',
                    data
                }
        }
    }

        /**
     * 删除顾客
     * @param ctx
     * @returns {Promise.<void>}
     */
     static async delete(ctx) {
        let req = ctx.request.body;
        if(req.id) {
            try {
                //删除某个顾客
                let data = await CustomerModel.deleteCustomer(req.id);
                ctx.response.status = 200;
                ctx.body = {
                    code: 200,
                    msg: '删除成功',
                    data
                }
            }catch (err) {
                ctx.response.status = 412;
                ctx.body = {
                    code: 412,
                    msg: '删除失败',
                    data: err
                }
            }
        }else {
            ctx.response.status = 416;
            ctx.body = {
                code: 416,
                msg: '顾客ID必须传'
            }
        }
     }
}

module.exports = customerController