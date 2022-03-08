const express = require('express')
const router = express.Router()
const Food = require('../db/model/foodModel')
const FoodType = require('../db/model/foodTypeModel')
const { getCounter } = require('../utils/counter');
const { formatDateTime } = require('../utils/time');

/**
 * @api {post} /foodType/add 商品分类添加
 * @apiName 商品分类添加
 * @apiGroup FoodType
 *
 * @apiParam {String} name 名称
 */
router.post('/add', (req, res) => {
  let { name } = req.body
    if (!name) return res.send({code: 500, msg: '缺少参数'})
    FoodType.find({ name })
    .then((data) => {
        if (data.length === 0) {
            return getCounter('foodType')
        } else {
            res.send({ code: 500, msg: '商品分类已存在' })
        }
    })
    .then((id) => {
        const createTime = new Date()
        return FoodType.insertMany({ name, createTime, typeid: id })
    })
    .then(() => {
        res.send({ code: 200, msg: '创建成功' })
    })
    .catch(() => {
        res.send({ code: 500, msg: '创建失败' })
    })
})

/**
 * @api {post} /foodType/del 删除
 * @apiName 删除
 * @apiGroup FoodType
 *
 * @apiParam {Number} typeid 分类id
 */
router.post('/del', (req, res) => {
  const { typeid } = req.body

  Food.find({ typeid })
    .then(data => {
      if (data.length) {
        res.send({ code: 500, msg: '删除失败，该分类正在被使用' })
      } else {
        return FoodType.remove({ typeid })
      }
    })
    .then(() => {
      res.send({ code: 200, msg: '删除成功' })
    })
    .catch(() => {
      res.send({ code: 500, msg: '删除失败' })
    })
})

/**
 * @api {post} /foodType/update 商品分类修改
 * @apiName 商品分类修改
 * @apiGroup FoodType
 *
 * @apiParam {String} typeid 分类id
 * @apiParam {String} name 名称
 */
router.post('/update', (req, res) => {
  const { typeid, name } = req.body
  FoodType.find({ name })
    .then((data) => {
        if (data.length === 0) {
            return FoodType.update({ typeid }, { name })
        } else {
            res.send({ code: 500, msg: '名称已存在' })
        }
    })
    .then((e) => {
      console.log('e', e)
      res.send({ code: 200, msg: '修改成功' })
    })
    .catch(() => {
      res.send({ code: 500, msg: '修改失败' })
    })
})

/**
 * @api {post} /foodType/page 商品分类列表
 * @apiName 商品分类列表
 * @apiGroup FoodType
 *
 * @apiParam {Number} pageNo 页数
 * @apiParam {Number} pageSize 条数
 * @apiParam {Number} key 关键字查询
 */
router.post('/page', (req, res) => {
  const pageNo = Number(req.body.pageNo) || 1
  const pageSize = Number(req.body.pageSize) || 10

  const { key } = req.body
  const reg = new RegExp(key)
  let query = {}
  query = { $or: [{ name: { $regex: reg } }, { desc: { $regex: reg } }] }
  FoodType.countDocuments(query, (err, count) => {
    if (err) {
      res.send({ code: 500, msg: '商品分类列表获取失败' })
      return
    }
    FoodType.find(query)
      .skip(pageSize * (pageNo - 1))
      .limit(pageSize)
      .then((data) => {
        const temp = []
        data.map(item => {
          temp.push({
            typeid: item.typeid,
            name: item.name,
            createTime: formatDateTime(new Date(item.createTime))
          })
        })
        res.send({
          code: 200,
          data: temp,
          total: count,
          pageNo: pageNo,
          pageSize: pageSize,
          msg: '商品分类列表获取成功',
        })
      })
      .catch(() => {
        res.send({ code: 500, msg: '商品分类列表获取失败' })
      })
  })
})

module.exports = router
