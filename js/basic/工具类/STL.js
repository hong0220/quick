/**
 * 去除重复数据
 */
function arrayNoDupulate(array) {
    var hash = {};
    var result = [];
    for (var i = 0; i < array.length; i++) {
        if (!hash[array[i]]) {
            result.push(array[i]);
            hash[array[i]] = true;
        }
    }
    return result;
}

/**
 * 找出重复数据
 */
function duplicates(arr) {
    var tmp = [];
    var result = [];
    for (i = 0; i < arr.length; i++) {
        // 不存在
        if ((tmp.indexOf(arr[i]) == -1)) {
            tmp.push(arr[i]);
        } else {
            if (result.indexOf(arr[i]) == -1) {
                result.push(arr[i]);
            }
        }
    }
    return result;
}

/**
 * 返回item在数组中的位置
 */
function indexOf(arr, item) {
    for (var i in arr) {
        if (arr[i] == item) {
            return i;
        }
    }
    return -1;
}

/**
 * 返回item在数组中的所有位置
 */
function findAllOccurrences(arr, target) {
    var result = [];
    for (var i = 0; i < arr.length; i++) {
        if (arr[i] == target) result.push(i);
    }
    return result;
}

/**
 * 移除数组中指定的数
 */
function remove(arr, item) {
    var lengh = arr.length;
    var resultArray = new Array();
    for (var i = 0; i < arr.length; i++) {
        if (arr[i] != item)
            resultArray.push(arr[i]);
    }
    return resultArray;
}

/**
 * 移除数组中指定的数,不浪费空间
 */
function removeWithoutCopy(arr, item) {
    for (var i = 0; i < arr.length; i++) {
        if (arr[i] == item) {
            arr.splice(i, 1);
            i--;
        }
    }
    return arr;
}

/**
 * 尾部删除,不修改原数组,返回新数组
 */
function truncate(arr) {
    return arr.slice(0, arr.length - 1);
}

/**
 * 头部删除,不修改原数组,返回新数组
 */
function curtail(arr) {
    // 复制
    var a = arr.slice(0);
    a.shift(0);
    return a;
}

/**
 * 末尾增加,不修改原数组,返回新数组
 */
function append(arr, item) {
    return arr.concat(item);
}

/**
 * 头部增加,不修改原数组,返回新数组
 */
function prepend(arr, item) {
    return [item].concat(arr);
}

/**
 * 指定位置增加元素,不修改原数组,返回新数组
 */
function insert(arr, item, index) {
    return arr.slice(0, index).concat([item], arr.slice(index));
}

/**
 * 合并数组,不修改原数组,返回新数组
 */
function concat(arr1, arr2) {
    return arr1.concat(arr2);
}

/**
 * 统计相同元素个数
 */
function count(arr, item) {
    var count = 0;
    for (var i = 0, len = arr.length; i < len; i++) {
        if (arr[i] === item) {
            count++;
        }
    }
    return count;
}

/**
 * 统计元素现频率
 */
function count(str) {
    var obj = {}, b = [];
    for (var i = 0; i < str.length; i++) {
        if (str != '') {
            b.push(str[i]);
        }
    }
    for (var i = 0; i < b.length; i++) {
        var count = 1;
        for (var j = i + 1; j < b.length;) {
            if (b[i] == b[j]) {
                b.splice(j, 1);
                count++;
            } else {
                j++;
            }
        }
        obj[b[i]] = count;
    }
    return obj;
}

/**
 * 深度克隆
 */
function clone(Obj) {
    var buf;
    if (Obj instanceof Array) {
        // 创建一个空的数组
        buf = [];
        var i = Obj.length;
        while (i--) {
            buf[i] = clone(Obj[i]);
        }
        return buf;
    } else if (Obj instanceof Object) {
        // 创建一个空对象
        buf = {};
        for (var k in Obj) {
            // 为这个对象添加新的属性
            buf[k] = clone(Obj[k]);
        }
        return buf;
    } else {
        return Obj;
    }
}