/**
 * 日志存储
 * @author yyshino
 */
const log4js = require('log4js');

// 设置标识
const levels = {
    'trace': log4js.levels.TRACE,
    'debug': log4js.levels.DEBUG,
    'info': log4js.levels.INFO,
    'warn': log4js.levels.WARN,
    'error': log4js.levels.ERROR,
    'fatal': log4js.levels.FATAL
}

// 配置 输出文件
log4js.configure({
    // Appender 将日志事件序列化为某种形式的输出。他们可以写入文件、发送电子邮件、通过网络发送数据。所有的 appender 都有一个type决定使用哪个 appender。
    appenders: {
        console: { type: 'console' },
        // 将信息发送到 文件中
        info: {
            type: 'file',
            filename: "logs/all-the-logs.log"
        },
        error: {
            type: 'dateFile',
            filename: "logs/log",
            pattern: 'yyy-MM-dd.log',
            alwaysIncludePattern: true // 设置文件名称为 fielname + pattern
        },
    },
    // 类别是日志事件组。当您从 log4js ( )获取Logger时，会定义日志事件的类别。具有相同类别log4js.getLogger('somecategory')的日志事件将转到相同的附加程序。
    categories: {
        default: { appenders: ['console'], level: 'debug' },
        info: {
            appenders: ['info', 'console'],
            level: 'info'
        },
        error: {
            appenders: ['error', 'console'],
            level: 'error'
        }
    }
})

/**
 * 日志输出 error
 * @param {string} content
 */
exports.error = (content) => {
    let logger = log4js.getLogger('error');
    logger.level = levels.error;
    logger.error(content);
}

/**
 * 日志输出 info
 * @param {string} content
 */
exports.info = (content) => {
    let logger = log4js.getLogger('info');
    logger.level = levels.info;
    logger.info(content);
}


/**
 * 日志输出 debug
 * @param {string} content
 */
exports.debug = (content) => {
    let logger = log4js.getLogger();
    logger.level = levels.debug;
    logger.debug(content);
}
