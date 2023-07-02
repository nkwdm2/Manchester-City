const express = require("express")
const router = express.Router()

const alipaySdk = require("../db/alipayUtil");
const AlipayFormData = require("alipay-sdk/lib/form").default

const cors = require('cors');
const axios = require('axios');
router.use(express.json());
router.use(cors());
router.use(express.urlencoded({ extended: true }));
const handleDB = require("../db/handleDB")
const db = require("../db/node_orm/index")


router.post('/payment', (req, res) => {
    let orderId = req.body.id;
    let orderPrice = req.body.sc_price;
    let sc_competition = req.body.sc_competition +'      ';
    let sc_team1 = req.body.sc_team1;
    let sc_team2 = req.body.sc_team2;
    console.log(sc_competition);
    console.log(sc_team1);
    console.log(sc_team2);
    console.log(orderId)
    console.log(orderPrice)
    console.log(111)
    let sc_pay = req.body.sc_pay
    console.log(sc_pay);

    // 对接支付宝
    const formData = new AlipayFormData()
    formData.setMethod('get')
    console.log(222);
    formData.addField('returnUrl', 'http://localhost:8888/order');
    console.log(333);
    formData.addField('bizContent', {
        outTradeNo: orderId,
        productCode: 'FAST_INSTANT_TRADE_PAY',
        totalAmount: orderPrice,
        subject: '赛事门票',
        body: sc_competition+'   '  +  sc_team1+'VS'+sc_team2,
    })
    console.log(444);
    const result = alipaySdk.exec(
        'alipay.trade.page.pay',
        {},
        { formData: formData },
    );
    console.log(555);
    result.then((resp) => {
        res.send({
            success: 'true',
            code: 200,
            'result': resp
        })
        
    })



})

router.post('/queryOrder', (req, res) => {
    let out_trade_no = req.body.out_trade_no
    let trade_no = req.body.trade_no
    
    console.log(2121);
    console.log(req.query);
    console.log(req.body);
    console.log(out_trade_no);
    console.log(trade_no);


    // 对接支付宝
    const formData = new AlipayFormData()
    formData.setMethod('get')
    formData.addField('bizContent', {
        out_trade_no,
        trade_no
    })
    const result = alipaySdk.exec(
        'alipay.trade.query',
        {},
        { formData: formData },
    );
    result.then(resData => {
        axios({
            url: resData,
            method: "get"
        }).then(data => {
            console.log(111);
            // console.log(data);
            let r = data.data.alipay_trade_query_response;
            if (r.code === '10000') {
                console.log(r);
                switch (r.trade_status) {
                    case 'WAIT_BUYER_PAY':
                        res.send({
                            success: true,
                            code: 200,
                            msg: '支付宝有交易记录,没付款'
                        })
                        break;
                    case 'TRADE_FINISHED':
                        res.send({
                            success: true,
                            code: 200,
                            msg: '支付成功,不可以退款'
                        })
                        break;
                    case 'TRADE_SUCCESS':
                        res.send({
                            success: true,
                            code: 200,
                            msg: '支付成功'
                        });
                        // // console.log(777);
                        // let orderId = req.body.id;
                        // let sc_pay = req.body.sc_pay
                        // console.log(orderId);
                        // console.log(sc_pay);
                        // let out_trade_no = req.body.out_trade_no
                        (async function () {
                            let results = await handleDB(res, "t_ticketuser", "update", "数据库发生错误", " id=" + out_trade_no, {
                                sc_pay: "已支付"
                            })
                        })()
                        break;
                    case 'TRADE_CLOSED':
                        res.send({
                            success: true,
                            code: 200,
                            msg: '交易关闭'
                        })
                        break;
                }

            } else if (r.code === '40004') {
                console.log(r);
                // res.send("交易不存在")


            }

        }).catch(err => {
            res.send({
                msg: '查询失败',
                err
            })
        })
    })
})


module.exports = router