const express = require('express');
const router = express.Router();
const Role = require('../db/model/roleModel');
const { setToken } = require('../utils/token');
const { getCounter } = require('../utils/counter');

/**
 * @api {post} /role/add 角色添加
 * @apiName 角色添加
 * @apiGroup Role
 *
 * @apiParam {String} roleName 角色名
 * @apiParam {String} roleDesc 角色描述
 */
router.post('/add', (req, res) => {
    let { roleName, roleDesc } = req.body
    if (!roleName || !roleDesc) return res.send({code: 500, msg: '缺少参数'})
    Role.find({ roleName })
    .then((data) => {
        if (data.length === 0) {
            return getCounter('role')
        } else {
            res.send({ code: 500, msg: '角色名已存在' })
        }
    })
    .then((data) => {
      const roleId = data
      return Role.insertMany({ roleName, roleDesc, roleId })
    })
    .then(() => {
        res.send({ code: 200, msg: '创建成功' })
    })
    .catch((e) => {
        res.send({ code: 500, msg: '创建失败' })
    })
  })

  /**
 * @api {post} /role/update 角色修改
 * @apiName 角色修改
 * @apiGroup Role
 *
 * @apiParam {String} roleId id
 * @apiParam {String} roleName 名称
 * @apiParam {String} roleDesc 描述
 */
router.post('/update', (req, res) => {
    const { roleId, roleDesc, roleName } = req.body
    if (roleId === 24) return res.send({ code: 500, msg: '修改失败，超级管理员禁止修改' })
    Role.update({ roleId }, { roleDesc, roleName })
      .then(() => {
        res.send({ code: 200, msg: '修改成功' })
      })
      .catch(() => {
        res.send({ code: 500, msg: '修改失败' })
      })
  })
  
/**
 * @api {post} /role/setPermits 角色权限分配
 * @apiName 角色权限分配
 * @apiGroup Role
 *
 * @apiParam {String} roleId id
 * @apiParam {String} authIds 权限id集合
 */
router.post('/setPermits', (req, res) => {
  const { roleId, authIds } = req.body
  if (roleId === 24) return res.send({ code: 500, msg: '配置失败，超级管理员禁止修改' })
  Role.updateOne({ roleId }, { authIds })
    .then((data) => {
      console.log(data)
      res.send({ code: 200, msg: '配置成功' })
    })
    .catch(() => {
      res.send({ code: 500, msg: '配置失败' })
    })
})

/**
 * @api {post} /role/del 角色删除
 * @apiName 角色删除
 * @apiGroup Role
 *
 * @apiParam {Number} _id id
 */
router.post('/del', (req, res) => {
    const { _id } = req.body
    if (_id === '5f8bf75d49d57c0008b707e4') return res.send({ code: 500, msg: '配置失败，超级管理员禁止删除' })
    Role.remove({ _id })
      .then((data) => {
        res.send({ code: 200, msg: '删除成功' })
      })
      .catch(() => {
        res.send({ code: 500, msg: '删除失败' })
      })
  })

/**
 * @api {post} /role/page 角色列表
 * @apiName 角色列表
 * @apiGroup Role
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
    let query = { $or: [{ roleName: { $regex: reg } }] }
    Role.countDocuments(query, (err, count) => {
      if (err) {
        res.send({ code: 500, msg: '角色列表获取失败' })
        return
      }
      Role.find(query)
        .skip(pageSize * (pageNo - 1))
        .limit(pageSize)
        .then((data) => {
          res.send({
            code: 200,
            data: data,
            total: count,
            pageNo: pageNo,
            pageSize: pageSize,
            msg: '角色列表获取成功',
          })
        })
        .catch(() => {
          res.send({ code: 500, msg: '角色列表获取失败' })
        })
    })
  })

module.exports = router