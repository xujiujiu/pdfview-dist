import { useEffect, useState } from 'react';
import './App.css';
import "pdfview/dist/index.css";

const src = './1.pdf';


function App() {
  let [componentLoaded, setComponentLoaded] = useState(false)
  let [pdfViewLib, setPdfViewLib] = useState(null)

  useEffect(() => {
    if (!pdfViewLib) {
      import(
        /* webpackChunkName: "pdfview" */
        /* webpackPrefetch: true */
        "pdfview").then((module) => {
          console.log(module)
          module.PdfViewRegistry('pdf-view')
          // 模块调用模式
          setPdfViewLib(new module.PdfViewLib('#pdf-com', {
            source: src,
            maxZoom: 5,
            height: 300,
          }))
          setComponentLoaded(true)
        });
    }

  }, [pdfViewLib])

  return (
    <div className="App">
      <h2>自定义组件模式</h2>
      {!componentLoaded && <div>加载中...</div>}
      {componentLoaded && <pdf-view source={src} height="300"></pdf-view>}
      <h2>js调用模式</h2>
      <div id="pdf-com"></div>
    </div >
  );
}

export default App;
