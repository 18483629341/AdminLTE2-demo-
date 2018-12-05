function message(obj = {}) {
    var msg = obj.msg
    var type = obj.type || 'success'
    var time = obj.time == 0 ? 0 : obj.time ? obj.time : 3000
    var icon = '',
        className = ''
    type == 'info' ? (icon = 'info', className = 'info') :
        type == 'error' ? (icon = 'ban', className = 'danger') :
        type == 'success' ? (icon = 'check', className = 'success') :
        type == 'warning' ? (icon = 'warning', className = 'warning') : '';
    var id = 'alert' + Math.floor(Math.random() * 10000)
    var html = '<div class="alert alert-' + className + ' alert-dismissible" id= "' + id + '" style="position: absolute;z-index:99999;width: calc(100% - 30px)">' +
        '	<button type="button" class="close" data-dismiss="alert" aria-hidden="true">×</button>' +
        '	<i class="icon fa fa-' + icon + '"></i>' +
        msg +
        '</div>'
    $('.content').prepend(html)
    if (time) {
        (function(id) {
            setTimeout(function() {
                $("#" + id).alert("close")
            }, time);
        })(id)
    }
}


function getFile(file) {
    selectImage(file);
    uploadImage();
}
/* uploadImg START*/


const maxWidth = 90;
const maxHeight = 90;
const maxSize = 200;
var fileSize = null;
var checkSizeSet = true;
var checkWHSet = true;
var isImgValid = false;
var imgData = null;
var initData = {
    checkSizeSet: true,
    checkWHSet: true,
    maxWidth: 90,
    maxHeight: 90,
    maxSize: 200,
}

function selectImage(file) {
    /* file：file控件 
     * prvid: 图片预览容器 
     */


    getImgData(file);

    function getImgData(file) {
        fileSize = file.files[0].size / 1024;
        var tip = "png or gif or jpeg  or jpg can upload!"; // 设定提示信息 
        var filters = {
            "jpeg": "/9j/4",
            "gif": "R0lGOD",
            "png": "iVBORw"
        }
        if (window.FileReader) { // html5方案 
            var fr = new FileReader();
            fr.readAsDataURL(file.files[0]);
            fr.onload = function(e) {
                imgData = e.target.result;
                imgSrc = file.value;
                validateImg(imgData, filters);
                if (isImgValid) {
                    checkSize(imgData);
                }
            }
        } else { // 降级处理  不支持h5的写法
            if (!/\.png|\.jpeg|\.jpg|.gif/i.test(file.value)) {
                alert(tip);
            } else {
                isImgValid = true;
                checkSize(imgData);
            }
        }
    }
}

function validateImg(data, filters) {
    for (var e in filters) {
        if (data.indexOf(filters[e]) != "-1") {
            isImgValid = true;
            return e;
        }
    }
    return null;
}

function checkSize(data) {
    var image = new Image();
    image.src = data;
    image.onload = function() {
        console.log(image.width, image.height, fileSize + 'k');
        var width = image.width;
        var height = image.height;
        if (checkWHSet && (width > maxWidth || height > maxHeight)) {
            alert_error('图片太大了，尺寸最好在:' + maxWidth + 'x' + maxHeight + "以下")
        } else if (checkSizeSet && fileSize > maxSize) {
            alert_error('图片太大了，大小最好在:' + maxSize + '以下')
        } else {
            canUpload = true;
        }
    };
}

function uploadImage() {
    if (canUpload) {

        $.ajax({
            type: 'POST',
            url: 'ajax/uploadimage',
            data: {
                image: imgData
            },
            async: false,
            dataType: 'json',
            success: function(data) {
                if (data.success) {
                    alert('上传成功');
                    alert_success('上传成功')
                    var imgUrl = data.src; //此處添加需要拿到相應的 遠程圖片鏈接
                    $("#inputFileValue").val(imgUrl);

                } else {
                    alert_error('上传失败')
                }
            }
        })
    }

}
/* uploadImg end*/