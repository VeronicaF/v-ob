export class Dep{
    constructor(){
        this.subs = [];
    }
    addSub(){
        this.subs.push(Dep.target);
    }
    append(){
        Dep.target.addDep(this);
    }

    notify(){
        this.subs.forEach(sub => sub.cb());
    }
}


Dep.target = null;
export function pushTarget(watch){
    Dep.target = watch;
}