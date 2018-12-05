var isValid = null;
var postflag = false;
var postData = {};
var url = null;
var allTime = false;
var canNext = false;
var campaign_data = parameters.campaign_data;
var campaign_id = '';
var isImgValid = false;
var canUpload = false;
var imgData = null;
var imgSrc = null;
var saveTime = 0;
window.onload = function() {
    //$(".sidebar-menu").find('li:eq(2)').addClass('active');
    update();
    $('#reservation').daterangepicker({
        "locale": {
            format: 'YYYY-MM-DD'
        }
    })

    $('#reservation').on('apply.daterangepicker', function() {
        allTime = false;
        $("#allTime").removeAttr('checked');
    })
    hideMsg();

}



function update() {
    if (campaign_data != undefined && campaign_data.length != 0) {
        $(".box-title").html(campaign_data.campaign_name);
        $(".form-control[name='name']").val(campaign_data.campaign_name);
        campaign_id = campaign_data.campaign_id;
        $(".form-control[name='description']").val(campaign_data.campaign_description);
        /*allTime=campaign_data.allTime;
        if(allTime){
            $("#reservation").val("");
            $("#reservation").attr("disabled","disabled");
        }else{
            $("#reservation").removeAttr("disabled");
        }   
        $(".form-control[name='reservation']").val(campaign_data.reservation);
           如果 campaign_data 所有的属性值都已经返回, 在显示其部分  !!!!!!!!!!!!!
        $(".form-control[name='conditions']").val(campaign_data.conditions);
        $(".form-control[name='conditions_c']").val(campaign_data.conditions_c);
        $(".form-control[name='imgUrl']").val(campaign_data.imgUrl);
        $(".form-control[name='instructions']").val(campaign_data.instructions);
        $(".form-control[name='instructions_c']").val(campaign_data.instructions_c);
        */
        $("#earnLink").attr("href", parameters.steptwo + '?campaign_id=' + campaign_id);
        $("#threeLink").attr("href", parameters.stepthree + '?campaign_id=' + campaign_id);
    }
}

function next() {
    canNext = true;
    save();
}

function hideMsg() {
    $(".form-control[name]").on('focus', function() {
        $(".prompt").removeClass("errMsg");
    })
}

function save() {
    validFun();
    postFun();
}

function checkedFun() {
    console.log(1);
    allTime = !allTime;
    if (allTime == true) {
        $("#reservation").val("");
        $("#reservation").attr("disabled", "disabled");
        $(".prompt").removeClass("errMsg");
    } else {
        $("#reservation").removeAttr("disabled");
    }
}

function validFun() {
    var $requiredElements = $(".form-control[data-required]");
    isValid = true;
    for (let i = 0; i < $requiredElements.length; i++) {

        var el = $requiredElements[i];
        if (el.attributes["data-type"].nodeValue == 'str' && el.value.trim() == "") {
            el.parentNode.lastElementChild.setAttribute("class", "prompt errMsg");
            isValid = false;
        }
        if ((el.attributes["data-type"].nodeValue == 'period' && el.value.trim() == "") && !allTime) {
            el.parentNode.parentNode.lastElementChild.setAttribute("class", "prompt errMsg");
            isValid = false;
        }
        if (el.attributes["data-type"].nodeValue == "uploadImg" && el.url.indexOf("http") !== -1) {
            el.parentNode.lastElementChild.setAttribute("class", "prompt errMsg");
            isValid = false;
        }
    }


}



function postFun() {

    if (isValid) {
        var $inputs = $(".form-control[name]");

        $.each($inputs, function(i, $el) {
            var key = $el.name;
            console.log($el.name, $el.value.trim());
            postData[key] = $el.value.trim();
        })
        postData['allTime'] = allTime;
        if (campaign_id != '') {
            postData.campaign_id = campaign_id;
        }
        console.log(postData);
        if (!postflag) {
            postflag = true;
            $.post(parameters.createcampaignUrl, //需要php配置
                postData,
                function(res) {
                    if (res.status == "success") {
                        saveTime++;
                        console.log(res);
                        //alert_success(res.message);
                        $(".box-title").html(postData.name);
                        message({
                            msg: res.message,
                            type: 'success'
                        });
                        campaign_id = res.campaign_id;
                        if (canNext) {
                            window.location.href = parameters.steptwo + '?campaign_id=' + campaign_id + '&type=' + res.type; //页面跳转至下一步
                        } else {
                            //$(".content-header>h1").html('Update Campaign');
                        }
                    } else {
                        //alert_error(res.message) 
                        message({
                            msg: res.message,
                            type: 'error'
                        });
                    }
                    postflag = false;
                }, 'json');
        }
    }
}