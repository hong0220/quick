function fizzBuzz(num) {
    if ((num === undefined) || (typeof num !== "number")) {
        return false;
    } else if ((num % 3 == 0) && (num % 5 == 0)) {
        return "fizzbuzz";
    } else if (num % 3 == 0) {
        return "fizz";
    } else if (num % 5 == 0) {
        return "buzz";
    }
    return num;
}

function createModule(str1, str2) {
    return {
        greeting: str1,
        name: str2,
        sayIt: function () {
            return this.greeting + ', ' + this.name;
        }
    };
}

/**
 * 返回二进制中的某一位
 */
function valueAtBit(num, bit) {
    // num转换为2进制数格式的字符串
    var s = num.toString(2);
    return s[s.length - bit];
}

function and(a, b) {
    return a && b;
}

/**
 *
 */
function functionFunction(str) {
    var f = function (s) {
        return str + ", " + s;
    }
    return f;
}