/**
 * Created with JetBrains WebStorm.
 * User: mrj
 * Date: 12-8-11
 * Time: 下午7:45
 * To change this template use File | Settings | File Templates.
 */
function upload(){
    var droperea = document.getElementById("dropBox");
    var list=document.getElementById("list");
    var txterea=document.getElementById("txterea");
    droperea.addEventListener("dragenter", function(e){
        e.preventDefault();
        droperea.style.backgroundColor = "grey";
    }, false);
    droperea.addEventListener("dragleave", function(e){
        e.preventDefault();
        droperea.style.backgroundColor = "white";
    }, false);
    droperea.addEventListener('dragover', function(e) {
        e.stopPropagation();
        e.preventDefault();
        droperea.style.backgroundColor = "#a9a9a9";
    },false);
    droperea.addEventListener('drop', function(e) {
        e.stopPropagation();
        e.preventDefault();
        droperea.style.backgroundColor = "white";
        var fileList  = e.dataTransfer.files,//获取拖拽文件
            fileType = fileList[0].type,
            fileName = fileList[0].name,
            fileSize = fileList[0].size,
            div = document.createElement('div');
//        var    reader = new FileReader();
//        reader.readAsDataURL(fileList[0]);//这里只取拖拽的第一个，实际中你可以遍历处理file列表
//        reader.onload = function(e) {
            div.src=this.result;
            var formData = new FormData();
            var xhr = new XMLHttpRequest();
            var url = "/upload?fileName=" + fileName+'&fileSize='+fileSize;
            console.log(fileList[0]);
            formData.append("uploadFile", fileList[0]);
            xhr.open('POST', url, true);
            xhr.onload = function(e) {};
            // Listen to the upload progress.
            var progressBar = document.querySelector('progress');
            xhr.upload.onprogress = function(e) {
                if (e.lengthComputable) {
                    var percentComplete = parseInt((e.loaded / e.total) * 100);
                    console.log("Upload: " + percentComplete + "% complete");
                    div.innerHTML="name  :  "+fileName+'      ' + percentComplete + "%";
                }
            };
            xhr.send(formData);  // multipart/form-data
//            xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");//直接发送文件对象的时候使用
//            xhr.setRequestHeader("X-File-Name", encodeURIComponent(fileName));
//            xhr.setRequestHeader("Content-Type", "application/octet-stream");
//            xhr.send(fileList[0]);
//            xhr.abort();//表示取消文件上传
            list.appendChild(div);
            txterea.style.display="none";
//        };
    },false);
    droperea.addEventListener('dragend', function(e) {
    },false);


}