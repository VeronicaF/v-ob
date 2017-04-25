import {isObj} from '../util/util';
import {Dep} from '../Dep/Dep';
import {observe} from '../../index';
export class Observer {
    constructor(data) {
        this.walk(data)
    }

    walk(data) {
        Object.keys(data).forEach(key => {
            this.defineReactive(data, key, data[key]);
        })
    }

    defineReactive(obj, key, val) {
        if (isObj(val)) {
            new Observer(val);
        }
        let dep = new Dep();
        Object.defineProperty(obj, key, {
            configurable: true,
            enumerable: true,
            get: function reactiveGetter() {
                if (Dep.target) {
                    dep.append()
                }
                return val;
            }
        });
        Object.defineProperty(obj, key, {
            configurable: true,
            enumerable: true,
            set: function reactiveSetter(newVal) {
                if (newVal !== val) {
                    if (isObj(newVal)) {
                        observe(newVal);
                    }
                    val = newVal;
                    dep.notify();
                }
            }
        })
    }
}