'use strict';

import Base from './base.js';
export default class extends Base {
    /**
     * index action
     * @return {Promise} []
     */
    async indexAction() {
        //auto render template file index_index.html
        this.assign('menu', "测试");
        return this.display();
    }

    async apiAction() {
        let para = this.post();
        let GithubService = think.service("api");
        let instance = new GithubService();

        // console.log(para);
        let result = await  instance.exeProc(this.get("func"), para);

        // console.log(result);
        return this.json(result);
    }

    async loadprocAction() {
        //think.cache("proclist", null);
        let GithubService = think.service("api");
        let instance = new GithubService();
        let result = await  instance.loadProc();
        return this.success("加载完成：" + new Date().toLocaleString() + "，已缓存。");
    }
}