/**
 * @file utils/tools.js
 * @desc {{description}}{{工具}}
 * @createTime 2019年06月03日16:49:06
 */

/**
 * @name toLine
 * @param {String} name 要转换的值
 * @desc {{description}}{{驼峰转换为中划线}}
 * @createTime 2019年05月29日15:24:22
 */
export const toLine = name => {
  return name.replace(/([A-Z])/g, '-$1').toLowerCase()
}

/**
 * @name toHump
 * @param {String} name 要转换的值
 * @desc {{description}}{{中划线转换驼峰}}
 * @createTime 2019年05月29日15:24:56
 */
export const toHump = name => {
  return name.replace(/\-(\w)/g, function(all, letter) {
    return letter.toUpperCase()
  })
}
