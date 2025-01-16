<template>
  <div class="hello">
    <!-- <h1>{{ msg }}</h1> -->
    <div>
      <button @click="add">+</button>
      <button @click="remove">-</button>
    </div>
    <div>
      <button @click="clear">清理pdf 内容</button>
    </div>
    <div>跳转第<input type="number" @input="changeNum" v-model="number" />页</div>
    <div><button @click="setZoomScale">控制缩放</button></div>
    <h2>自定义组件模式</h2>
    <div v-if="!componentLoaded">加载中...</div>
    <pdf-view
      ref="pdfView"
      v-else
      :source="data.src"
      :scale="scale"
      :hide-back-top="!backTopEnable"
      :hide-page-num="!pageNumberEnable"
      :max-zoom="3"
      :height="300"
      @readFinish="readFinish"
      @numUpdate="updateNum"
      @progress="progress"
      @ready="ready"
    ></pdf-view>
    <h2>js调用模式</h2>
    <div id="pdf-dom"></div>
  </div>
</template>

<script setup>
import { ref, onMounted, reactive } from "vue";
import "pdfview/dist-esm/index.css";
let data = reactive({
  src: "./1.pdf"
});
let pdfViewLib = null
let scale = ref(2);
let number = ref(1);
let zoomEnable = ref(true);
let componentLoaded = ref(false);
let pageNumberEnable = ref(true);
let backTopEnable = ref(true);

const pdfView = ref(null);

onMounted(() => {
  import("pdfview").then((module) => {
    module.PdfViewRegistry("pdf-view");
    componentLoaded.value = true;
    // 模块调用模式
    pdfViewLib = new module.PdfViewLib("#pdf-dom", {
      source: data.src,
      maxZoom: 5,
      height: 300,
      hideBackTop: !backTopEnable.value,
      hidePageNum: !pageNumberEnable.value
    });

    pdfViewLib.on("ready", (e) => {
      console.log("pdf lib 已完成初始化", e);
    });
    pdfViewLib.on("progress", (e) => {
      console.log("pdf lib 加载进度", e);
    });
    pdfViewLib.on("readFinish", (e) => {
      console.log("readFinish", e);
    });
    pdfViewLib.on("error", (e) => {
      console.log("error", e);
    });
  });
});
function add() {
  scale.value = scale.value +  0.2;
  pdfView.value.setAttribute('scale', scale.value);
  // pdfView.value.setScale(scale.value);
  pdfViewLib.setScale(scale.value);
}

function remove() {
  scale.value = scale.value - 0.2;
  pdfView.value.setAttribute('scale', scale.value);
  // pdfView.value.setScale(scale.value);
  pdfViewLib.setScale(scale.value);
}

function clear() {
  pdfView.value.clearPdf();
  pdfViewLib.clearPdf();
}

function setZoomScale() {
  zoomEnable.value = !zoomEnable.value;
  pdfView.value.setZoom(zoomEnable.value);
  pdfViewLib.setZoom(zoomEnable.value);
}

function readFinish(e) {
  console.log("readFinish", e);
}

function changeNum() {
  pdfView.value.goto(number.value);
  pdfViewLib.goto(number.value);
  console.log("跳转的页码：", number.value);
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
  height: 100vh;
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
