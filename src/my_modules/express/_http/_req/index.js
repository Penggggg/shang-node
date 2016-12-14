"use strict";
/**
 * 设置req.path: string 、req.params: Object 、req.paramsLen: number
 */
exports.setReqPathParams = (req, res) => {
    return (middlewares) => {
        let reqUrl = req.url;
        req.params = {};
        req.path = reqUrl;
        req.paramsLen = 0;
        for (let path in middlewares) {
            // req.url 请求路由是否匹配
            if (reqUrl.indexOf(path) === 0) {
                // 查看req.url参数个数是否存在匹配
                let reqParams = reqUrl.slice(path.length).split('/');
                reqParams.shift();
                let reqParamsLength = reqParams.length;
                let target = middlewares[path][reqParamsLength];
                if (target !== undefined) {
                    // 完全匹配 
                    req.path = path;
                    target.Params.forEach((key, index) => {
                        req.params[key] = reqParams[index];
                    });
                    req.paramsLen = reqParamsLength;
                }
                else {
                    // 参数个数不匹配，则尽可能设置参数，超出的参数将被忽略
                    console.log(`${req.url} 请求参数不匹配`);
                    let max = 0;
                    for (let _num in middlewares[path]) {
                        if (Number(_num) > max && Number(_num) < reqParamsLength) {
                            max = Number(_num);
                        }
                    }
                    let _target = middlewares[path][max];
                    req.path = path;
                    _target.Params.forEach((key, index) => {
                        req.params[key] = reqParams[index];
                    });
                    req.paramsLen = max;
                }
            }
        }
    };
};
exports.setReqQuery = (req, res) => {
    return (middlewares) => {
    };
};
