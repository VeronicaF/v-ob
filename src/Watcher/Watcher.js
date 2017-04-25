import {pushTarget} from '../Dep/Dep';
export class Watcher {
    constructor(obj,exp, cb) {
        this.exp = exp;
        this.cb = cb;
        this.deps = [];
        pushTarget(this);
        obj[exp];
    }
    addDep(dep){
        this.deps.push(dep);
        dep.addSub(this)
    }
}
