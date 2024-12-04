<template>
  <div class="hello">
    <!-- <h1>{{ msg }}</h1> -->
    <button @click="add">+</button>
    <button @click="remove">-</button>
    <button @click="clear">清理pdf 内容</button>
    <input type="number" @input="changeNum" v-model="number" />
    <div>自定义组件模式</div>
    <div v-if="!componentLoaded">加载中...</div>
    <pdf-view
      id="pdfView"
      v-else
      :source="src"
      :scale="scale"
      :max-zoom="3"
      @readFinish="readFinish"
      @numUpdate="updateNum"
      @progress="progress"
      @ready="ready"
    ></pdf-view>
    <div>js调用模式</div>
    <div id="pdf-dom"></div>
    <button @click="setZoomScale">控制缩放</button>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
const src = ref("./1.pdf").value;
let scale = ref(1).value;
let zoomEnable = ref(true).value;
let componentLoaded = ref(false);
let number = ref(1).value
let pdfViewLib = null
onMounted(() => {
  import(
    /* webpackChunkName: "pdfview" */
    /* webpackPrefetch: true */
    "pdfview"
    // "../../../../dist/index.js"
  ).then(() => {
    module.PdfViewRegistry('pdf-view')
    componentLoaded.value = true;
    // 模块调用模式
    pdfViewLib = new module.PdfViewLib('#pdf-com', {
        source: this.source,
        maxZoom: 5,
        height: 200,
      })

      pdfViewLib.on('ready', (data) => {
        console.log("pdf lib 已完成初始化", e);
      })
      pdfViewLib.on('progress', (data) => {
        console.log("pdf lib 加载进度", e);
      })
      pdfViewLib.on('readFinish', (data) => {
        console.log('readFinish', data)
      })
      pdfViewLib.on('error', (data) => {
        console.log('error', data)
      })
  });
});
function add() {
  scale.value += 0.2;
  pdfViewLib.setScale(scale.value)
}

function remove() {
  scale.value -= 0.2;
  pdfViewLib.setScale(scale.value)
}

function clear() {
  let pdfView = document.getElementById("pdfView");
  pdfView.clearPdf();
}

function setZoomScale() {
  let pdfView = document.getElementById("pdfView");
  const enbale = !zoomEnable.value;
  zoomEnable.value = enbale;
  pdfView.disabledZoom(enbale);
  pdfViewLib.disabledZoom(enbale)
}

function readFinish(e) {
  console.log("readFinish", e);
}

function changeNum() {
  let pdfView = document.getElementById("pdfView");
  const num = number.value;
  pdfView.goto(num);
  pdfViewLib.goto(num)
  console.log("跳转的页码：", num);
}
function ready(e) {
  console.log("pdf 已完成初始化", e);
}
function progress(e) {
  console.log("pdf 加载进度", e);
}
function updateNum(e) {
  console.log("当前页码信息", e);
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.hello {
  height: 50vh;
  overflow: auto;
}
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
