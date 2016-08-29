###NodeJsApiCore Web API接口

### 一. 简介
NodeJsApiCore是一个简单易用的Web API，可直接调用数据库的存储过程做为接口使用。它是基于开源框架thinkJS(使用 ES6/7 特性开发 Node.js 框架)开发的nodejs项目需要mysql数据库支持，可使用nginx做负载均衡。

### 二. 功能特点

1. 直接调用存储过程做为API，无需重新发布程序。
2. 复杂逻辑的同时可另外用Node.js开发自定义接口。
3. 采用pm2守护进程管理nodejs应用，宕机自动重启

待完善功能，访问权限认证、接口文档自动生成。

###三.使用及安装


####请求地址格式：
```
/api/存储过程名字
如需自定义api请调整路由配置
```

####接口调用示例：

1.获取测试数据列表
请求方法：post、get
请求地址：/api/GetTestList
请求参数：无
返回参数：
```
{
	"Code": 0,
	"Data": [{
		"id": 1,
		"name": "1",
		"addtime": "2016-08-10T13:36:03.000Z"
	},
	{
		"id": 2,
		"name": "fff1",
		"addtime": "2016-08-10T13:36:34.000Z"
	}],
	"Msg": "OK"
}
```
2.添加测试数据
请求方法：post
请求地址：/api/AddTest
请求参数：{"i_name":"fff1"}
返回参数：
```
{
	"Code": 0,
	"Data": null,
	"Msg": "添加成功"
}
```
3.重新加载存储过程参数
请求方法：get
请求地址：/api/loadproc
请求参数：无
返回参数：
```
{
	"errno": 0,
	"errmsg": "",
	"data": "加载完成：2016-08-11 21:56:21，已缓存。"
}
```

####安装依赖

执行之前请确认已有 Node.js 环境，Node.js 版本要大于 4.0

解压安装包，执行 npm install 安装对应的依赖。
```
npm install

```
####导入数据库
导入根目录下的演示数据库文件apicore.sql
####修改数据库配置（src/common/config/db.js）
修改数据库名、帐号密码及host地址
```
export default {
  type: 'mysql',
  log_sql: true,
  log_connect: true,
  adapter: {
    mysql: {
      host: '127.0.0.1',
      port: '3306',
      database: 'apicore',
      user: 'root',
      password: '',
      prefix: '',
      encoding: 'utf8'
    },
    mongo: {

    }
  }
};
```
####编译源文件代码
```javascript
npm run compile
```
####启动服务
```javascript
npm run start
```

####线上部署

在服务器上推荐使用 pm2 来管理 Node.js 服务，来保证系统正常运行。
编辑并保存根目录下的pm2.json
```
{
  "apps": [{
    "name": "apicore",
    "script": "npm start www/production.js",
    "cwd": "E:/apicore",
    "max_memory_restart": "1G",
    "autorestart": true,
    "node_args": [],
    "args": [],
    "env": {

    }
  }]
}
```
>注意：cwd为项目在服务器上的路径

####安装pm2
```javascript
npm install -g pm2
```

####启动pm2管理应用
```javascript
pm2 start pm2.json
```
####常用命令
```javascript
pm2 status +项目名或id
pm2 list
pm2 delete +项目名或id
pm2 delete all
```
####服务器配置进阶
nginx服务器配置，请参考根目录下的nginx.conf，把域名和路径改成自己相应的路径。

作者QQ：`7570599`    
演示网站：
#### oschina与github同步更新：

1.http://git.oschina.net/polsnet/NodeJsApiCore

2.https://github.com/polsnet/NodeJsApiCore

Application created by [ThinkJS](http://www.thinkjs.org)

## Install dependencies

```
npm install
```

## Start server

```
npm start
```

## Deploy with pm2

Use pm2 to deploy app on production enviroment.

```
pm2 startOrReload pm2.json