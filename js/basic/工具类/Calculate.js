/**
 * 除法
 */
function accDiv(arg1, arg2) {
    var t1 = 0, t2 = 0, r1, r2;
    try {
        t1 = arg1.toString().split(".")[1].length
    } catch (e) {
    }
    try {
        t2 = arg2.toString().split(".")[1].length
    } catch (e) {
    }
    with (Math) {
        r1 = Number(arg1.toString().replace(".", ""))
        r2 = Number(arg2.toString().replace(".", ""))
        return (r1 / r2) * pow(10, t2 - t1);
    }
}

/**
 * 乘法
 */
function accMul(arg1, arg2) {
    var m = 0, s1 = arg1.toString(), s2 = arg2.toString();
    try {
        m += s1.split(".")[1].length
    } catch (e) {
    }
    try {
        m += s2.split(".")[1].length
    } catch (e) {
    }
    return Number(s1.replace(".", "")) * Number(s2.replace(".", "")) / Math.pow(10, m)
}

/**
 * 加法
 */
function accAdd(arg1, arg2) {
    var r1, r2, m;
    try {
        r1 = arg1.toString().split(".")[1].length
    } catch (e) {
        r1 = 0
    }
    try {
        r2 = arg2.toString().split(".")[1].length
    } catch (e) {
        r2 = 0
    }
    m = Math.pow(10, Math.max(r1, r2))
    return (arg1 * m + arg2 * m) / m
}

/**
 * 减法
 */
function accSub(arg1, arg2) {
    var r1, r2, m, n;
    try {
        r1 = arg1.toString().split(".")[1].length
    } catch (e) {
        r1 = 0
    }
    try {
        r2 = arg2.toString().split(".")[1].length
    } catch (e) {
        r2 = 0
    }
    m = Math.pow(10, Math.max(r1, r2));
    //动态控制精度长度
    n = (r1 >= r2) ? r1 : r2;
    return ((arg1 * m - arg2 * m) / m).toFixed(n);
}

/**
 * 给Number类型增加一个div方法
 */
Number.prototype.div = function (arg) {
    return accDiv(this, arg);
}

/**
 * 给Number类型增加一个mul方法
 */
Number.prototype.mul = function (arg) {
    return accMul(arg, this);
}

/**
 * 给Number类型增加一个add方法
 */
Number.prototype.add = function (arg) {
    return accAdd(arg, this);
}

/**
 * 给Number类型增加一个sub方法
 */
Number.prototype.sub = function (arg) {
    return accSub(arg, this);
}

// 计算：7*0.8 ，则改成 (7).mul(8)

/**
 * 求和
 */
function sum(arr) {
    var sum = 0;
    for (var i = 0; i < arr.length; i++) {
        sum += arr[i]
    }
    return sum;
}

/**
 * 每个元素平方,不修改原数组,返回新数组
 */
function square(arr) {
    return arr.map(function (val) {
        return val * val;
    })
}

/**
 * 按10进制去处理字符串,碰到非数字字符,会将后面的全部无视
 * parse2Int('12'); parse2Int('12px'); parse2Int('0x12')
 * 12; 12; 0
 */
function parse2Int(num) {
    return parseInt(num, 10);
}

/**
 * 数值,类型相等
 */
function identity(val1, val2) {
    return val1 === val2;
}

/**
 * argsAsArray(function (greeting, name, punctuation) {return greeting + ', ' + name + (punctuation || '!');}, ['Hello', 'Ellie', '!'])
 * Hello, Ellie!
 */
function argsAsArray(fn, arr) {
    return fn.apply(null, arr)
}

/**
 * speak(function () {return this.greeting + ', ' + this.name + '!!!';}, {greeting: 'Hello', name: 'Rebecca'})
 * Hello, Rebecca!!!
 */
function speak(fn, obj) {
    return fn.call(obj);
}
