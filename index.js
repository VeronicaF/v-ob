import {isObj} from './src/util/util';
import {Observer} from './src/Observer/Observer';
import {Watcher} from './src/Watcher/Watcher';
export function observe(data) {
    if (!isObj(data)) {
        return
    }
    new Observer(data);
}

let obj = {
    a: 'a',
    le1: {
        b: 'b'
    }
};
observe(obj);
console.log(obj);
new Watcher(obj, 'a', function () {
    alert('aaaaa');
});
new Watcher(obj, 'a', function () {
    alert('bbbbb');
});
obj.a = '12345';
console.log(obj);
