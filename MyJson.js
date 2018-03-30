var log = function () {
    console.log.apply(this, arguments)
}

var i = 0

var indexStr

var str = '{"a":[1,2],"b":{"d":[1,2,3],"f":{"p":[1,2,3]}}'

maxIndex = str.length - 1

var parseFalse = function () {
    return parseKeyWord('false', 5)
}

var parseTrue = function () {
    return parseKeyWord('true', 4)
}

var parseNull = function () {
    return parseKeyWord('null', 4)
}

var next = function (n = 1) {
    let newI = i + n
    if (newI <= str.length - 1) {
        i += n
    } else {
        log('越界', i, n)
    }
    indexStr = str[i]
}

var parseKeyWord = function (keyWord, n) {
    let keyWordDict = {
        'null': null,
        'false': false,
        'true': true,
    }
    let content = str.substr(i, n)
    if (content === keyWord) {
        next(n)
        return keyWordDict[keyWord]
    } else {
        throw new Error('意外的错误:' + i)
    }
}

var parseString = function () {
    let result = ''
    next() // 扫描到 "
    while (str[i] !== '"') {
        result += str[i]
        next() // 去往下一个字符串的字符
    }
    next()
    return result //此时扫描到字符串末尾的 "
}

var parseArray = function () {
    let result = []
    next()
    while (str[i] !== ']') {
        let ele = parseValue()
        result.push(ele)
        if (str[i] === ',') {
            next()
        }
    }
    next()
    return result
}

var parseObject = function () {
    next()
    let result = {}
    let key, value
    while (str[i] !== '}') {
        key = parseString()

        if (str[i] !== ':') {
            throw new Error('意外的语法,第' + i + "个字符")
        }

        next() // 此时到达匹配值处
        value = parseValue()
        result[key] = value
        if (str[i] === ',') {
            next() // 跳过,
        }
    }
    if (i + 1 < str.length - 1) {
        next()
    }
    return result //此时扫描到 }
}

var parseNumber = function () {
    let result = 0
    let numberStr = ''
    let endList = [',', ']', '}']
    while (!endList.includes(str[i])) {
        numberStr += str[i]
        next()
    }
    result = parseFloat(numberStr)
    return result
}

var parseValue = function () {
    if (str[i] === '"') {
        return parseString()
    } else if (str[i] === '[') {
        return parseArray()
    } else if (str[i] === '{') {
        return parseObject()
    } else if (str[i] === 't') {
        return parseTrue()
    } else if (str[i] === 'f') {
        return parseFalse()
    } else if (str[i] === 'n') {
        return parseNull()
    } else {
        return parseNumber()
    }
}

var parse = function () {
    var ttt=parseValue()
    log(ttt)
    log(ttt['b'])
}

parse()