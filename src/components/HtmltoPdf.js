// 导出页面为PDF格式
import html2Canvas from 'html2canvas'
import JsPDF from 'jspdf'
export default{
  install (Vue, options) {
    Vue.prototype.getPdf = function () {
      var title =  this.resumeName || "个人简历"
      html2Canvas(document.querySelector('#pdfDom'), {
        allowTaint: true
      }).then(function (canvas) {
        let contentWidth = canvas.width  //需要导出pdf的内容区域的宽度
        let contentHeight = canvas.height //需要导出pdf的内容区域的高度
        //a4纸的尺寸[595.28,841.89]，html页面生成的canvas在pdf中图片的宽高
        let pageHeight = contentWidth / 592.28 * 841.89 //一页pdf显示html页面生成的canvas高度; 
        let leftHeight = contentHeight 
        let position = 0 //页面垂直偏移 距离上边距
        let imgWidth = 595.28 
        let imgHeight = 572.28 / contentWidth * contentHeight  //-100 内容压缩
        let pageData = canvas.toDataURL('image/jpeg', 1.0)
        // 第一个参数是方向，第二个参数是单位，第三个参数是纸张类型
        let PDF = new JsPDF('', 'pt', 'a4')
        if (leftHeight < pageHeight) {
          //arg3-->距离左边距;arg4-->距离上边距;arg5-->宽度;arg6-->高度
          PDF.addImage(pageData, 'JPEG', 0, 0, imgWidth, imgHeight)
        } else {
          while (leftHeight > 0) {
            //arg3-->距离左边距;arg4-->距离上边距;arg5-->宽度;arg6-->高度
            PDF.addImage(pageData, 'JPEG', 0, position, imgWidth, imgHeight)
            leftHeight -= pageHeight
            position -= 841.89
            if (leftHeight > 0) {
              PDF.addPage()
            }
          }
        }
        PDF.save(title + '.pdf')
      }
      )
    }
  }
}
