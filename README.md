# pdfview

在移动端 h5 能够直接通过使用 <pdf-view> 标签来展示 pdf 阅读器功能的组件

## API

| 属性             | 类型    | 默认值 | 必填 | 说明                                                                       |
| ---------------- | ------- | ------ | ---- | -------------------------------------------------------------------------- |
| source              | string｜ArrayBuffer  | ''     | 是   | pdf资源，支持http协议或ArrayBuffer 类型数据                                           |
| width            | number  |        | 否   | 组件宽度，默认100%                                                       |
| height           | number  |        | 否   | 组件高度，默认100%                                                         |
| scale           | number  | 1 | 否   | 当前展示倍数，默认1倍                                                     |
| max-zoom           | number  | 2 | 否   | 双击缩放倍数，范围1+                                                     |
| zoomDisabled           | boolean  | false | 否   | 是否关闭双击缩放                                                      |
| canvasIdPrefix           | string  |  | 否   | canvas id 前缀                                                      |

## on事件

**readfinish --- 首次阅读到底部触发**

| 字段名        | 类型    | 说明           |
| ------------- | ------- | -------------- |
| finishReading | boolean | 是否已完成阅读 |

**error ---- pdf组件 错误事件**

| 字段名  | 类型   | 说明                  |
| ------- | ------ | --------------------- |
| code    | number | 错误码，加载失败时为1 |
| message | string | 错误提示              |

**函数方法**

| 方法名  | 入参   | 传参取值 | 说明                  |
| ------- | ------ | ------ |--------------------- |
| disabledZoom    | Boolean |  默认为false | 关闭双击缩放功能 |

**示例**

该 h5 组件是 webComponent 标准的组件，所以在使用时需要在工程中配置编译时忽略编译，如 vue 环境中，可在 beforeCreate 中忽略 pdf-preview 的编译：

```js
const App = {
  beforeCreate() {
    Vue.config.ignoredElements.push('pdf-view')
  },
  onShow (options) {
  }
}
```

由于 pdf 组件在弱网环境下，加载较慢。为了更好的体验，可以使用加载状态的占位符和渲染条件判断，来控制 pdf 组件的显示

``` js
// template
<pdf-view v-if="componentLoaded" :source="source" height="400"></pdf-view>
<loader v-if="!componentLoaded" ></loader>


// js
created() {
      // 具体参数参考 https://webpack.js.org/api/module-methods/#magic-comments
    import(
    /* webpackChunkName: "pdfview" */
    /* webpackPrefetch: true */
    "pdfview/dist/pdf.js").then(module => {
        this.componentLoaded = true
    });
},
```



**兼容性：**

| 系统  | 版本   | 说明                  |
| ------- | ------ | --------------------- |
| ios    | 11.1+ | - |
| andriod | 8.1+ | -  |
| chrome | 78+ | -  |
| safari  | 11.1+ | - |

**依赖**
| 插件名  | 版本   | 说明                  |
| ------- | ------ | --------------------- |
| pdfjs-dist | 2.5.207 | - |