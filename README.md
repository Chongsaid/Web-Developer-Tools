# 前端工具库

它是轻型的前端工具库，内置了事件绑定，可以更有效的实现事件委托。当然，亦包含了大多数常用工具。此工具旨在让你使用原生 JavaScript 仍然可以游刃有余地进行开发。

## 事件绑定处理

在 Web 前端界面中，事件绑定分为两种，一种是直接的事件绑定，另外一种则是使用冒泡机制的事件委托处理

### 事件委托

```JavaScript
EVENT.addEventsHandler(EVENT.eventCommission(), [document.querySelector(".header-button"), ["button"],
  "click", function(){
    console.log('log -> click!');
  }
]);
```

EVENT 指的是主类，addEventsHandler 静态方法具备普通事件绑定和事件委托处理的指定函数。
注意：它的 this 域和处理器传入参数我忘记了，因为这个是很久前的工具库，只是今天开源。。
你可以提交修改

参数如下：

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

## 还有很多方法没有写上，后续慢慢完善...同时工具库亦会逐步完善

开源地址：https://github.com/Chongsaid/Web-Developer-Tools
导入 tools.js 即可进行使用，其中有很多实用方法供你使用
