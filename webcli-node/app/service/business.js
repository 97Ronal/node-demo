'use strict';
const Service = require('egg').Service;
const uuidv1 = require('uuid/v1');
const BUSINESS_TABLE_NAME = 'biz_unit_info';
// 指定表字段
const COLUMNS = [ 'unit_id', 'user_id', 'unit_name', 'contact_name' ];

class BusinessService extends Service {
  // 分页查询
  async list({ pageSize = 10, pageNum = 1 }) {
    pageNum = pageNum < 1 ? 1 : pageNum;
    const options = {
      where: {
        deleted: 'N',
      },
      columns: COLUMNS,
      orders: [[ 'created_time', 'desc' ]],
      limit: pageSize,
      offset: (pageNum - 1) * pSize,
    };
    // total pCount
    const all = await this.app.mysql.query('select count(*) from biz_unit_info where deleted="N"');
    const len = all[0]['count(*)'];
    const pageCount = Math.ceil(len / pageSize);
    const list = await this.app.mysql.select(BUSINESS_TABLE_NAME, options);
    return { total: len, pageCount, pageSize, pageNum, list };
  }
  // 获取指定id信息
  async get({ id }) {
    // where 过滤条件
    const options = {
      where: {
        deleted: 'N',
        unit_id: id,
      },
      columns: COLUMNS,
    };
    const res = await this.app.mysql.select(BUSINESS_TABLE_NAME, options);
    return res[0] || null;
  }
  // 创建信息
  async add({
    user_id,
    unit_name,
    unit_address,
    contact_name,
    contact_mobile,
    contact_card_num,
    district_id,
    district_name,
  }) {
    return this.app.mysql.insert(BUSINESS_TABLE_NAME, {
      user_id,
      unit_name,
      unit_address,
      contact_name,
      contact_mobile,
      contact_card_num,
      district_id,
      district_name,
      unit_id: uuidv1(),
      created_time: new Date(),
    });
  }
  // 修改指定id信息
  async put(data, { id }) {
    const options = {
      where: {
        unit_id: id,
      },
      columns: [ 'unit_name' ],
    };
    // 过滤空值
    for (const key in data) {
      if (data[key]) {
        options.columns.push(key);
      }
    }
    data.modified_time = new Date();
    return this.app.mysql.update(BUSINESS_TABLE_NAME, data, options);
  }
  // 虚假删除指定id信息
  async delete({ id }) {
    const options = {
      where: {
        unit_id: id,
      },
    };
    const data = {
      modified_time: new Date(),
      deleted: 'Y',
    };
    return this.app.mysql.update(BUSINESS_TABLE_NAME, data, options);
  }
}

module.exports = BusinessService;
