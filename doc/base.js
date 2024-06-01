let obj = { name: 'wcy', age: 18 }
let result = JSON.stringify(obj, replace, 2)//第二个参数是一个函数，用来处理json对象的每个key和value 第三个参数是缩进字符
function replace(key, value) {
  console.log('key:', key, 'value:', value);
  return value
}
console.log(result);
