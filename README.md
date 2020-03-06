# 前端工具库

它是轻型的前端工具库，内置了事件绑定，可以更简单地实现事件委托。当然，亦包含了大多数常用工具。此工具旨在让你使用原生 JavaScript 仍然可以游刃有余地进行开发。

## 事件绑定处理

在 Web 前端界面中，事件绑定分为两种，一种是直接的事件绑定，另外一种则是使用冒泡机制的事件委托处理

### 事件委托

```JavaScript
EVENT.addEventsHandler(EVENT.eventCommission(), [document.querySelector(".header-button"), ["button"],
  "click", function( el, event ){
  
    console.log('log -> click!');
    
  }
]);
```

EVENT 指的是主类，addEventsHandler 静态方法具备普通事件绑定和事件委托处理的指定函数。
此方法没有 this 域，它的 this 指向了 undefined。
当触发事件时，传入给处理函数的参数如下：
1. el -> 指的是触发元素本身，此处只指定了 button，所以必定为 button 元素
2. event -> 触发的事件对象，如 MouseEvent

而addEventsHandler()参数如下：

EVENT.eventCommission() 指的是事件委托，在这里仅是标明此处需要实现事件委托，而不是普通的事件绑定。

[] 数组参数如下：
1. 索引第一个参数标识需要进行事件委托的父元素。
2. 第二个参数：需要响应事件的子元素名称：如 button（当然可以是 li 等），可以指定多个子元素。
3. 第三个参数指：需要响应的事件，如 click
4. 第四个参数：处理函数，即事件发生时所调用的方法
  
当然，addEventsHandler 有三个主参数，第三个参数 option 在这里不作说明，普通事件不建议使用此方法进行使用。
如需使用，请参阅源码中的 eventOperating 方法，只需要将 EVENT.eventCommission() 更换成 EVENT.eventOperating() 即可。
它的本质上是调用了 addHandler()
        
### 普通事件

```JavaScript

EVENT.addHandler(document.querySelector("#button"),"click",function( event ){

  console.log('log -> click!');
  // this 指的是被触发事件的元素本身
  console.log( this );
  
});

```

![](https://img2018.cnblogs.com/blog/1140908/202002/1140908-20200229112025326-1601551824.png)


这是推荐使用的普通事件绑定方法，它的 this 域指向了触发事件的元素本身。

参数如下：

  首个参数：需要绑定事件的目标元素
  
  第二个参数：事件类型，如 click
  
  第三个参数：当事件触发时所调用的处理器函数
  
### 以上的事件委托以及普通事件均能调用自己所写的函数名称

不妨试试将处理器函数改为这样（以普通事件为例）：

```JavaScript

function clickBtn( event ){
  console.log('log -> click!');
}

EVENT.addHandler(document.querySelector("#button"),"click",clickBtn);

```

很简单吧！这样可以保证事件处理函数的最大自由度。

## 实用工具库

### 获取父元素

有时候，我们需要根据一个子元素来获取到它的父元素，虽然在只隔一级的情况下，我们仅需要 parentNode 就可以拿到其父元素。
可是，真正的情况下，需要获取的父元素可能与子元素相隔几个甚至超过十个情况，难道我们只能 parentNode * N 了吗？

在这样的情况下，你只需要调用 MTools 工具包中的 getParentNodeByChiled 方法就可以非常简单的得到子元素的父元素
示例：
```JavaScript

// 获取父元素 -> 实际应用中，此父元素是一个自定义的下拉框
let parent = MTools.getParentNodeByChiled(el,'div','down-list');

// 模拟点击父元素以收起下拉框
parent.click();

```
![](https://img2020.cnblogs.com/blog/1140908/202003/1140908-20200303155439278-138988493.png)

我在示例中仅使用了三个参数，实际方法中有四个参数可帮我们获取需要的父元素。
参数列表如下：
1. 子元素 ：HTMLElement 对象，比如通过 document.getElementByID 所获取的
2. 父元素标签名称 ： String，如 "div"
3. 类样式表 ：所需获取的父元素应用的类样式表
4. id ：所需获取的父元素应用的ID

```HTML
<div class="down-list" id="list"></div>
```
类样式表对应父元素的 class，id 对应父元素中的 id

*源码中，只是使用了 递归 查询*




## 还有很多方法没有写上，后续慢慢完善...同时工具库亦会逐步完善

开源地址：https://github.com/Chongsaid/Web-Developer-Tools
导入 tools.js 即可进行使用，其中有很多实用方法供你使用

**更新中**
