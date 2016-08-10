'use strict';
var mysql = require('mysql');
export default class extends think.service.base {
    /**
     * init
     * @return {}         []
     */
    init(...args) {
        super.init(...args);
    }

    async loadProc() {
        think.cache("proclist", null);
        let procList = await this.model("proc", think.config("db1")).field("*").where({
            db: think.config("db").adapter.mysql.database,
            type: "PROCEDURE"
        }).select();
        let procMap = new Map();
        for (var value of procList) {
            let paraList = "";
            for (var value1 of value.param_list.toString().split(",")) {
                paraList += value1.split(" ")[0].replace(/`/g, "") + " ";
            }
            procMap.set(value.name, paraList.trim() == "" ? "" : paraList.trim().split(" "));
            // procMap.set(value.name,paraList.trim().toLowerCase().split(" "));
        }

        think.cache("proclist", procMap);
        return procMap;
    }

    async exeProc(func, inputPara) {
        let apiResult = {};
        apiResult.Code = 0;
        apiResult.Data = null;
        apiResult.Msg = "";

        let procList = await think.cache("userList", () => {
            return this.loadProc();
        });
        console.log("存储过程数量：" + procList.size)
        let getProcPara = procList.get(func);
        if (getProcPara == undefined) {
            //找不到存储过程
            apiResult.Code = -1;
            apiResult.Data = "找不到存储过程";
            return apiResult;
        }
        var procPlaceholder = "";
        let newinput = [];
        for (var i in getProcPara) {
            procPlaceholder += "? ";
            if (inputPara[getProcPara[i]] != undefined) {
                newinput[i] = inputPara[getProcPara[i]];
            }
        }
        procPlaceholder = procPlaceholder.trim().replace(/ /g, ",");

        if (newinput.length != getProcPara.length) {
            //异常，缺少参数
            apiResult.Code = -1;
            apiResult.Data = "缺少参数,请以post方式提交json格式数据。";
            return apiResult;
        }
        else {
            let queryResult = await this.dbQuery(func, procPlaceholder, newinput);

            apiResult.Msg = "OK";
            if (queryResult[0].InfoCode) {
                apiResult.Code = queryResult[0].InfoCode;
            }
            if (queryResult[0].InfoMsg) {
                apiResult.Msg = queryResult[0].InfoMsg;
            }
            if (apiResult.Code == 0 && !(queryResult[0].InfoMsg)) {
                apiResult.Data = queryResult;
            }
        }
        console.log(apiResult);
        return apiResult;
    }

    dbQuery(func, procPlaceholder, inputPara) {
        return new Promise(function (resolve, reject) {
            let connection = mysql.createConnection(think.config("db").adapter.mysql);
            connection.connect();
            connection.query("call " + func + "(" + procPlaceholder + ")", inputPara, function (err, results) {
                if (err) {
                    console.log("Mysql:" + err.errno + "," + err.code);
                    reject(err);
                }

                if (results[0] == undefined) {
                    results = [{}];
                }
                else {
                    results = results[results.length - 2];
                }
                console.log(results);
                resolve(results);
            });
            connection.end();

        });
    }
}