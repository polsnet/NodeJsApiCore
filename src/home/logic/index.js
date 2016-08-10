'use strict';
/**
 * logic
 * @param  {} []
 * @return {}     []
 */
export default class extends think.logic.base {
    * __before() {
        let auth = true;
        console.log("身份认证");
        if (!auth) {
            return this.fail("no permissions"); //没权限时直接返回
        }
    }

    /**
     * index action logic
     * @return {} []
     */
    indexAction() {
        //this.assign('menu',"xxxxxxx");
    }
}