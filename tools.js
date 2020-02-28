/* Start 来自MDN：兼容方法为：addEventListener、removeEventListener */
if (!Element.prototype.addEventListener) {
  var oListeners = {};

  function runListeners(oEvent) {
    if (!oEvent) {
      oEvent = window.event;
    }
    for (var iLstId = 0, iElId = 0, oEvtListeners = oListeners[oEvent.type]; iElId < oEvtListeners.aEls.length; iElId++) {
      if (oEvtListeners.aEls[iElId] === this) {
        for (iLstId; iLstId < oEvtListeners.aEvts[iElId].length; iLstId++) {
          oEvtListeners.aEvts[iElId][iLstId].call(this, oEvent);
        }
        break;
      }
    }
  }
  Element.prototype.addEventListener = function(sEventType, fListener /*, useCapture (will be ignored!) */ ) {
    if (oListeners.hasOwnProperty(sEventType)) {
      var oEvtListeners = oListeners[sEventType];
      for (var nElIdx = -1, iElId = 0; iElId < oEvtListeners.aEls.length; iElId++) {
        if (oEvtListeners.aEls[iElId] === this) {
          nElIdx = iElId;
          break;
        }
      }
      if (nElIdx === -1) {
        oEvtListeners.aEls.push(this);
        oEvtListeners.aEvts.push([fListener]);
        this["on" + sEventType] = runListeners;
      } else {
        var aElListeners = oEvtListeners.aEvts[nElIdx];
        if (this["on" + sEventType] !== runListeners) {
          aElListeners.splice(0);
          this["on" + sEventType] = runListeners;
        }
        for (var iLstId = 0; iLstId < aElListeners.length; iLstId++) {
          if (aElListeners[iLstId] === fListener) {
            return;
          }
        }
        aElListeners.push(fListener);
      }
    } else {
      oListeners[sEventType] = {
        aEls: [this],
        aEvts: [
          [fListener]
        ]
      };
      this["on" + sEventType] = runListeners;
    }
  };
  Element.prototype.removeEventListener = function(sEventType, fListener /*, useCapture (will be ignored!) */ ) {
    if (!oListeners.hasOwnProperty(sEventType)) {
      return;
    }
    var oEvtListeners = oListeners[sEventType];
    for (var nElIdx = -1, iElId = 0; iElId < oEvtListeners.aEls.length; iElId++) {
      if (oEvtListeners.aEls[iElId] === this) {
        nElIdx = iElId;
        break;
      }
    }
    if (nElIdx === -1) {
      return;
    }
    for (var iLstId = 0, aElListeners = oEvtListeners.aEvts[nElIdx]; iLstId < aElListeners.length; iLstId++) {
      if (aElListeners[iLstId] === fListener) {
        aElListeners.splice(iLstId, 1);
      }
    }
  };
}
/* END 来自MDN：兼容方法为：addEventListener、removeEventListener */

/* Start 来源网络 用于兼容一些常见但自己不想进行兼容编写代码的代码片段 */

// addClass、removeClass 2019-6-28 引入

function addClass(elem, className) {
  if (!className) return;

  const els = Array.isArray(elem) ? elem : [elem];

  els.forEach((el) => {
    if (el.classList) {
      el.classList.add(className.split(' '));
    } else {
      el.className += ` ${className}`;
    }
  });
}

function removeClass(elem, className) {
  if (!className) return;

  const els = Array.isArray(elem) ? elem : [elem];
  els.forEach((el) => {
    if (el.classList) {
      el.classList.remove(className.split(' '));
    } else {
      el.className = el.className.replace(new RegExp(`(^|\\b)${className.split(' ').join('|')}(\\b|$)`,
        'gi'), ' ');
    }
  });
}

Date.prototype.formatYYYYMMDD = function() {
  var d = new Date(this),
    month = '' + (d.getMonth() + 1),
    day = '' + d.getDate(),
    year = d.getFullYear();

  if (month.length < 2)
    month = '0' + month;
  if (day.length < 2)
    day = '0' + day;

  return [year, month, day].join('-');
}

/* End 来源网络 用于兼容一些常见但自己不想进行兼容编写代码的代码片段 */

/* 兼容 去除前后空格 */
String.prototype.trim = function() {
  return this.replace(/^\s+|\s+$/gm, '');
}
/* 兼容 去除所有空格 */
String.prototype.trimAll = function() {
  //此正则表达式可能不兼容部分浏览器
  return this.replace(/\s/g, "");
}
/* 兼容 只能由字母、数字以及下划线组成 */
String.prototype.checkAccountID = function() {
  try {
    return /^\w+$/.test(this);
  } catch (e) {
    throw "在尝试验证字符是否由 字母、数字以及下划线组成时发生了错误。";
  }
  return false;
}
/* 验明字符串是否为正数 */
String.prototype.isNumber = function() {
  var reg = /^\d+(?=\.{0,1}\d+$|$)/
  return reg.test(this);
}
/* 验证字符串是否为合法的YYYY-MM-DD格式的日期 */
String.prototype.checkYYYYMMDD = function() {
  var reg =
    /^((^((1[8-9]\d{2})|([2-9]\d{3}))([-\/\._])(10|12|0?[13578])([-\/\._])(3[01]|[12][0-9]|0?[1-9])$)|(^((1[8-9]\d{2})|([2-9]\d{3}))([-\/\._])(11|0?[469])([-\/\._])(30|[12][0-9]|0?[1-9])$)|(^((1[8-9]\d{2})|([2-9]\d{3}))([-\/\._])(0?2)([-\/\._])(2[0-8]|1[0-9]|0?[1-9])$)|(^([2468][048]00)([-\/\._])(0?2)([-\/\._])(29)$)|(^([3579][26]00)([-\/\._])(0?2)([-\/\._])(29)$)|(^([1][89][0][48])([-\/\._])(0?2)([-\/\._])(29)$)|(^([2-9][0-9][0][48])([-\/\._])(0?2)([-\/\._])(29)$)|(^([1][89][2468][048])([-\/\._])(0?2)([-\/\._])(29)$)|(^([2-9][0-9][2468][048])([-\/\._])(0?2)([-\/\._])(29)$)|(^([1][89][13579][26])([-\/\._])(0?2)([-\/\._])(29)$)|(^([2-9][0-9][13579][26])([-\/\._])(0?2)([-\/\._])(29)$))$/
  return reg.test(this);
}


/* 兼容性代码 End */

/**
 * 工具类：提供最为基础的便捷方法
 */
class cloudTools {
  constructor() {}
  /**
   * randomWord 产生任意长度随机字母数字组合
   * @param {Object} randomFlag 是否任意长度
   * @param {Object} min 任意长度最小位[固定位数]
   * @param {Object} max 任意长度最大位
   */
  randomWord(randomFlag, min, max) {
    //此方法来自网络
    var str = "",
      range = min,
      arr = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd',
        'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's',
        't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H',
        'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W',
        'X', 'Y', 'Z'
      ];

    // 随机产生
    if (randomFlag) {
      range = Math.round(Math.random() * (max - min)) + min;
    }
    for (var i = 0; i < range; i++) {
      let pos = Math.round(Math.random() * (arr.length - 1));
      str += arr[pos];
    }
    return str;
  }
  /**
   * 判断 a b 对象是否相等,注意:属性相同则为 true
   * 此方法来源于网络,经过修改
   * @param {Object} a
   * @param {Object} b
   * @param {Object} isEqulsString
   */
  isObjectValueEqual(a, b, isEqulsString) {

    //取对象a和b的属性名

    var aProps = Object.getOwnPropertyNames(a);

    var bProps = Object.getOwnPropertyNames(b);

    //判断属性名的length是否一致

    if (aProps.length != bProps.length) {

      return false;

    }

    //循环取出属性名，再判断属性值是否一致

    for (var i = 0; i < aProps.length; i++) {

      var propName = aProps[i];

      if (isEqulsString) {
        if (a[propName].toString() !== b[propName].toString()) {
          return false;
        }
      } else {
        if (a[propName] !== b[propName]) {
          return false;
        }
      }

    }

    return true;

  }

  smoothScrollTop() {
    var currentScroll = document.documentElement.scrollTop || document.body.scrollTop;
    if (currentScroll > 0) {
      window.requestAnimationFrame(MTools.smoothScrollTop);
      window.scrollTo(0, currentScroll - (currentScroll / 5));
    }
  }
  /* 此函数来源网络 */
  rgbToHex(rgb) {
    // rgb(x, y, z)
    var color = rgb.toString().match(/\d+/g); // 把 x,y,z 推送到 color 数组里
    var hex = "#";

    for (var i = 0; i < 3; i++) {
      // 'Number.toString(16)' 是JS默认能实现转换成16进制数的方法.
      // 'color[i]' 是数组，要转换成字符串.
      // 如果结果是一位数，就在前面补零。例如： A变成0A
      hex += ("0" + Number(color[i]).toString(16)).slice(-2);
    }
    return hex;
  }
  
  insertAfter(newNode, curNode) {
    curNode.parentNode.insertBefore(newNode, curNode.nextElementSibling);
  }

  /**
   * @param {Object} config 配置参数
   *  htmlDOM : 需进行动画的目标元素
   *  animationName : 关键帧动画名称
   *  time : 规定动画的名称
   *  repeat : 规定动画结束后是否重复
   */
  addAnimation(config) {
    // config -> htmlDOM,animationName,time,repeat
    var isNull = false;
    if (!config.htmlDOM) isNull = true;
    if (!config.animationName) isNull = true;
    if (isNull) {
      console.error("定义了错误的动画参数 - 参数为空。");
      return;
    }
    if (config.htmlDOM.nodeType !== 1) {
      console.error("所传递的动画参数并非HTML元素。");
      return;
    }
    if (!config.time) {
      config.time = 0.5;
    }
    for (var i = 0; i < config.animationName.length / 4; i++) {
      //去除实体空格等
      config.animationName.replace("&nbsp;", "");
    }
    let linear = "";
    if (true === config.linear) {
      linear = "linear";
    }
    if (true === config.repeat) {
      config.htmlDOM.setAttribute("style", "animation: " + config.animationName.trim().toString() +
        " " + config.time + "s " + linear + " infinite;");
      return;
    }

    config.htmlDOM.setAttribute("style", "animation: " + config.animationName.trim().toString() +
      " " + config.time + "s " + linear + ";");
  }

  /** 
   * 根据子节点获取到指定的父元素
   * @param {Object} childElement 子元素
   * @param {Object} parentElName 父元素标签名
   * @param {Object} className 可选
   * @param {Object} id 可选
   */
  getParentNodeByChiled(childElement, parentElName, className, id) {
    if (childElement.nodeType != 1) {
      return;
    }
    // 获取一次父元素
    let parent = childElement.parentNode;
    // 判断是否是需要的父元素
    if (parent.nodeName.toLocaleLowerCase() == parentElName.toLocaleLowerCase()) {
      // 尝试判断是否等同于需要的属性值
      if (className) {
        if (parent.getAttribute("class") == className) {
          return parent;
        }
      }
      if (id) {
        if (parent.getAttribute("id") == id) {
          return parent;
        }
      }
    }
    if (parent == document) {
      return null;
    }
    // 递归继续查询
    return this.getParentNodeByChiled(parent, parentElName, className, id);
  }

  IEVersion() {
    var userAgent = navigator.userAgent; //取得浏览器的userAgent字符串  
    var isIE = userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1; //判断是否IE<11浏览器  
    var isEdge = userAgent.indexOf("Edge") > -1 && !isIE; //判断是否IE的Edge浏览器  
    var isIE11 = userAgent.indexOf('Trident') > -1 && userAgent.indexOf("rv:11.0") > -1;
    if (isIE) {
      var reIE = new RegExp("MSIE (\\d+\\.\\d+);");
      reIE.test(userAgent);
      var fIEVersion = parseFloat(RegExp["$1"]);
      if (fIEVersion == 7) {
        return 7;
      } else if (fIEVersion == 8) {
        return 8;
      } else if (fIEVersion == 9) {
        return 9;
      } else if (fIEVersion == 10) {
        return 10;
      } else {
        return 6; //IE版本<=7
      }
    } else if (isEdge) {
      return 'edge'; //edge
    } else if (isIE11) {
      return 11; //IE11  
    } else {
      return -1; //不是ie浏览器
    }
  }
}

window.MTools = new cloudTools();

/**
 * 动画方法已单独写成一个类，可通过静态进行调用
 * 如 Animation.add(config);
 */
class Animation {

  constructor() {}

  /**
   * htmlDOM 元素操作对象
   * animationName CSS 动画关键帧(动画)
   * time 规定动画应该进行多长时间
   * repeat 规定动画是否重复
   * @param {Object} config 配置参数
   */
  static add(config) {
    // config -> htmlDOM,animationName,time,repeat
    var isNull = false;
    if (!config.htmlDOM) isNull = true;
    if (!config.animationName) isNull = true;
    if (isNull) {
      console.error("定义了错误的动画参数 - 参数为空。");
      return;
    }
    if (config.htmlDOM.nodeType !== 1) {
      console.error("所传递的动画参数并非HTML元素。");
      return;
    }
    if (!config.time) {
      config.time = 0.5;
    }
    for (var i = 0; i < config.animationName.length / 4; i++) {
      //去除实体空格等
      config.animationName.replace("&nbsp;", "");
    }
    // 后续改为三元运算符
    let linear = "";
    if (true === config.linear) {
      linear = "linear";
    }
    if (true === config.repeat) {
      config.htmlDOM.setAttribute("style", "animation: " + config.animationName.trim().toString() +
        " " + config.time + "s " + linear + " infinite;");
      return;
    }

    config.htmlDOM.setAttribute("style", "animation: " + config.animationName.trim().toString() +
      " " + config.time + "s " + linear + ";");
  }

}

class EVENT {

  constructor() {}

  /**
   * 此方法用于添加监听事件
   * @param {Object} element 目标元素
   * @param {String} type 监听的事件类型：如 click
   * @param {function} handler 当type事件被触发时执行的函数（处理器）
   * @param {Object} options (可选)控制器配置，具体参照W3C标准 OR MDN
   */
  static addHandler(element, type, handler, options) {
    /* 
     * 
     * element : 元素，type：监听的事件类型，如click，handler：当type事件被触发时执行的函数（处理器）
     * */

    /* 后续可能优化的代码片段 */
    try {
      var passiveSupported = false;
      var options = Object.defineProperty({}, "passive", {
        get: function() {
          passiveSupported = true;
        }
      });

      element.addEventListener(type, handler, passiveSupported ? options : false);

      // 以下代码片段已废弃，因为已使用 兼容代码 技术：见 MDNCompatible.js 
      /*else if(element.attachEvent) {
      	element.attachEvent("on" + type, handler);
      } else {
      	element["on" + type] = handler;
      }*/

    } catch (e) {
      console.log("错误代码：" + e);
      throw "事件处理函数遇到了系统错误，此问题我们将进行记录以帮助修复。";
    }
  }

  /**
   * 控制类型：事件委托及普通事件绑定
   * @param {Object} Handler 所调用的控制器类型 \n 
   *     eventCommission : args 选项：父元素，子元素的标签名称，事件类型，处理函数
   *     eventOperating ：args 选项： 元素，事件类型，处理函数
   * @param {Object} args    具体元素及事件函数（根据控制器类型进行选择）
   * @param {Object} options (可选)控制器配置，具体参照W3C标准 OR MDN
   */
  static addEventsHandler(Handler, args, options) {

    /*
     * 假定控制器之前已经进行过绑定，那么取消绑定
     * 此代码块可使用 for 循环进行优化。
     */
    var elements = args[0]; //父元素或是元素

    if (elements === null || elements === undefined || typeof elements !== "object") {
      console.log("错误的调用，因为事件处理器无法寻到目标对象  ---Error");
      return;
    }

    if (MTools.isObjectValueEqual(Handler, this.eventCommission(), true)) {
      var events = args[2]; //事件类型
      var listener = args[3]; //监听处理事件函数
      elements.removeEventListener(events, listener, false);
    } else if (Handler === this.eventOperating) {
      var events = args[1]; //事件名称
      var listener = args[2]; //监听处理事件函数
      elements.removeEventListener(events, listener, false);
    } else {
      throw "事件注册失败，因为调用了错误的控制器。错误控制器为：" + Handler;
    }

    //调用处理器
    if (typeof options === "undefined" || options === null) {
      /**
       * once : 调用后删除事件，这意味着可以解决重复点击或过快点击的事件存储
       *     缺陷：每次点击都需要重新绑定原有的事件
       * passive : Boolean，设置为true时，表示 listener 永远不会调用 preventDefault()。
       * 如果 listener 仍然调用了这个函数，客户端将会忽略它并抛出一个控制台警告。
       */
      options = {
        once: false,
        passive: false
      }
    }
    Handler.addEventHandler(args, options);
  }
  
  /**
   * 事件委托处理函数，用于处理事件委托
   */
  static eventCommission() {
    return {
      addEventHandler: function(args, options) {
        /* 父元素，子元素的标签名称，事件类型，处理函数 */
        if (args.length <= 3) {
          throw "定义了错误的事件委托机制：没有父元素、子元素、事件类型或事件处理函数。" +
            "\n建议参阅文档以更好地进行开发";
        }

        /* 后续可能优化的代码片段 */
        try {

          var passiveSupported = false;
          var options = Object.defineProperty({}, "once", {
            get: function() {
              passiveSupported = true;
            }
          });

          /* 为了明确知道数组的类型，显式地进行转换为变量  */
          var elements = args[0]; //父元素
          var childElement = args[1]; //子元素
          var events = args[2]; //事件名称
          var listener = args[3]; //监听处理事件函数

          elements.addEventListener(events, function(ev) {
            EVENT.eventCommission().handler(ev, childElement, listener);
          }, passiveSupported ? options : false);

        } catch (e) {
          console.log("错误代码：" + e);
          throw "事件委托处理函数遇到了系统错误，此问题我们将进行记录以帮助修复。";
        }
      },
      handler: function(ev, elemName, useHandler) {
        var ev = ev || window.event; //获取当前的事件
        var target = ev.target || ev.srcElement; //获取发生事件的元素
        if (elemName.length >= 2) {
          for (let i = 0; i < elemName.length; i++) {
            if (target.nodeName.toLowerCase() == elemName[i].toLowerCase()) {
              useHandler(target, ev);
              break;
            }
          }
        } else {
          if (target.nodeName.toLowerCase() == elemName[0].toLowerCase()) {
            useHandler(target, ev);
          }
        }
      },
    }
  }
  //事件的处理函数
  static eventOperating() {
    return {
      addEventHandler: function(args, options) {
        /* 元素，事件类型，处理函数 */
        if (args.length <= 2) {
          throw "定义了错误的事件机制：没有DOM元素，事件类型或事件处理函数" +
            "\n建议参阅API文档以更好地进行开发";
        }
        this.addHandler(args[0], args[1], args[2], options);
      },
    }
  }

}
