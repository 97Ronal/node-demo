# base-project
- 基于eggjs的node服务

## QuickStart

### api
- test: http://test-uc.urban-computing.cn:3010
- prod: https://sqsat.sqga.gov.cn/sq-epidemic-business-backend

### Development

- run dev
```bash
$ npm i
$ npm run dev
$ open http://localhost:7001/
```

- debugger
```bash
$ npm run debug
$ open `chrome-devtools://devtools/bundled/inspector.html?experiments=true&v8only=true&ws=127.0.0.1:9999/__ws_proxy__`
```

### 上线流程

- 合并 `test` 到 `master` 分支，打 `tag`
- `npm run deploy`
- 压缩 `sq-business-epidemic-backend` 发送给郭涛
- 郭涛复制文件到生产文件夹下 `npm run stop && npm start`
- 删除 `sq-business-epidemic-backend`

### npm scripts

- Use `npm run lint` to check code style.
- Use `npm test` to run unit test.
- Use `npm run autod` to auto detect dependencies upgrade, see [autod](https://www.npmjs.com/package/autod) for more detail.

### 工程目录
- app 
    - controller 控制器 由路由调用
    - middleware 中间件
    - service 针对数据库的操作服务 由控制器调用
    - sql 数据库初始化sql
    - router.js api路由
- config 数据库等配置信息
- test 单元测试