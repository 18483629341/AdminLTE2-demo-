var isRequiredValid = null;
var isNotreqValid = null;
var postflag = false;
var postData = {};
var url = null;
var allowlogin = null;
var canNext = false;
var merchant_data = parameters.merchant_data;
var merchant_id = '';
var selectFlag = false;
var saveTime = 0;


window.onload = function() {
    //$(".sidebar-menu").find('li:eq(4)').addClass('active');
    update();
    hideMsg();
    resetFun();
    $("#saveBtn").on('click', function() {
        save();
    })

}

function getFile(el) {

    console.log(el, el.value);
    $("#inputFileValue").val(el.value);
}

function update() {
    if (merchant_data != undefined && merchant_data.length != 0) {
        $(".form-control[name='name']").val(merchant_data.merchant_name);
        merchant_id = merchant_data.merchant_id;
        $(".content-header>h1").html('Update Merchant');

        /*allowLogin=merchant_data.allowLogin;
        if(allowLogin=='true'){
        console.log(1);
            $(".login-control").removeAttr("disabled");
            $(".login-control").attr('data-required',"required");
            $(".form-control[name='loginName']").val(merchant_data.instruappearance: none;
   
   
            $(".form-control[name='password']").val(merchant_data.instructions_c);
            $(".form-control[name='repassword']").val(merchant_data.repassword);
        }else{
            $(".login-control").removeAttr('data-required');
            $(".login-controisNotreqValid=true;l").attr("disabled",'disabled');
        }
        $(".form-control[name='name']").val(merchant_data.merchant_name);
        $(".form-control[name='address1']").val(merchant_data.merchant_address1);
        $(".form-control[name='address2']").val(merchant_data.merchant_address2);
           如果 merchant_data 所有的属性值都已经返回, 在显示其部分  !!!!!!!!!!!!!
        $(".form-control[name='email']").val(merchant_data.conditions);
        $(".form-control[name='imgUrl']").val(merchant_data.conditions_c);
        $(".form-control[name='telephone']").val(merchant_data.imgUrl);
        
        */
        // $("#earnLink").attr("href",parameters.steptwo+'?merchant_id='+merchant_id);

    }
}

function hideMsg() {
    $(".form-control[name]").on('focus', function() {
        if ($(this).siblings('.prompt') != "undefined") {
            $(this).siblings('.prompt').removeClass("errMsg");
        }
        if ($(this).parent().siblings('.prompt') != "undefined") {
            $(this).parent().siblings('.prompt').removeClass("errMsg");
        }
    })
}

function back() {
    window.history.go(-1);
}

function save() {
    validFun();
    postFun();
}

function checkFun(el) {
    console.log(el.value);
    if (el.value == 'true') {
        console.log(1);
        //$(".login-control").removeAttr("disabled");
        // $(".login-control").attr('data-required',"required");
        allowlogin = true;
        $(".radioError").removeClass("errMsg");
    } else {
        // $(".login-control").attr('data-required',"required");
        //$(".login-control").removeAttr('data-required');
        // $(".login-control").attr("disabled",'disabled');
        // $(".login-control").val('');
        allowlogin = false
        $(".radioError").removeClass("errMsg");
    }
}
var mobileReg = /^[1][3-8](\d{9}|\d\*{5}\d{3})$|^([6|9])\d{7}$|^[0][9]\d{8}$$|^[6]([8|6])\d{5}$/;
var emailReg = /^\s*\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+\s*$/;

function validFun() {
    var $requiredElements = $(".form-control[data-required]");
    var $notreqElements = $(".form-control[data-type]").not(".form-control[data-required]");
    isRequiredValid = true;
    isNotreqValid = true;
    console.log(allowlogin);
    for (let i = 0; i < $requiredElements.length; i++) {

        var el = $requiredElements[i];
        console.log(el);
        if (el.attributes["data-type"].nodeValue == 'str' && el.value.trim() == "") {
            el.parentNode.lastElementChild.setAttribute("class", "prompt errMsg");
            isRequiredValid = false;

        }
        if (el.attributes["data-type"].nodeValue == 'telephone') {
            if (el.value.trim() == "") {
                el.parentNode.lastElementChild.setAttribute("class", "prompt errMsg");
                isRequiredValid = false;
            }
            //    }else if(!mobileReg.test(el.value.trim())){
            //        el.parentNode.lastElementChild.setAttribute("class", "prompt errMsg");
            //        el.parentNode.lastElementChild.textContent="please input valid telephone";
            //        return false;
            //    }
        }
        if (el.attributes["data-type"].nodeValue == 'email') {
            if (el.value.trim() == "") {
                el.parentNode.lastElementChild.setAttribute("class", "prompt errMsg");
                isRequiredValid = false;

            } else if (!emailReg.test(el.value.trim())) {
                el.parentNode.lastElementChild.setAttribute("class", "prompt errMsg");
                el.parentNode.lastElementChild.textContent = "please input valid email_address";
                isRequiredValid = false;

            }
        }
        if (allowlogin === null) {
            console.log(null);
            $(".radioError").addClass("errMsg");
            isRequiredValid = false;

        }
        if (el.attributes["data-type"].nodeValue == 'loginName' && el.value.trim() == "") {
            el.parentNode.lastElementChild.setAttribute("class", "prompt errMsg");
            isRequiredValid = false;

        }
        if (el.attributes["data-type"].nodeValue == 'password' && el.value.trim() == '') {
            el.parentNode.parentNode.lastElementChild.setAttribute("class", "prompt errMsg");
            isRequiredValid = false;

        }
        if (el.attributes["data-type"].nodeValue == 'repassword') {
            if (el.value.trim() == '') {
                el.parentNode.parentNode.lastElementChild.setAttribute("class", "prompt errMsg");
                isRequiredValid = false;
            }
            // else if(el.value.trim()!=$('#password').val()){
            //     el.parentNode.parentNode.lastElementChild.setAttribute("class", "prompt errMsg");
            //     el.parentNode.parentNode.lastElementChild.textContent="Please keep consistent with password before!";
            //     isRequiredValid = false;
            // }
        }
    }

    for (let i = 0; i < $notreqElements.length; i++) {
        var el = $notreqElements[i];

        if (el.attributes["data-type"].nodeValue == 'telephone') {
            console.log(el);
            isNotreqValid = true;
            //                if(el.value.trim() != ""&&!mobileReg.test(el.value.trim())){
            //                    el.parentNode.lastElementChild.setAttribute("class", "prompt errMsg");
            //                    el.parentNode.lastElementChild.textContent="please input valid telephone";
            //                   isNotreqValid=false;
            //                    return false;
            //                }   
        }
        if (el.attributes["data-type"].nodeValue == 'email') {
            console.log(el);
            if (el.value.trim() != "" && !emailReg.test(el.value.trim())) {
                el.parentNode.lastElementChild.setAttribute("class", "prompt errMsg");
                el.parentNode.lastElementChild.textContent = "please input valid email_address";
                isNotreqValid = false;

            }
        }

    }

    console.log(isRequiredValid, isNotreqValid);

}

function resetFun() {
    $(".reset").click(function() {
        $(this).parent(".input-group-btn").siblings('.form-control').val('');
    })
}

function postFun() {
    if (isRequiredValid && isNotreqValid) {
        var $inputs = $(".form-control[name]");

        $.each($inputs, function(i, $el) {
                var key = $el.name;
                console.log($el.name, $el.value.trim());
                postData[key] = $el.value.trim();
            })
            //category
        postData.allowlogin = allowlogin;
        postData.imgUrl = $("input[name='imgUrl']").val() || null;
        if (merchant_id != '') {
            postdata.merchant_id = merchant_id;
        }
        console.log(postData);

        if (!postflag) {
            postflag = true;
            $(".overlay").show();
            $.post(parameters.createMerchantUrl, //需要php配置
                postData,
                function(res) {
                    $(".overlay").hide();
                    if (res.status == "success") {
                        saveTime++;
                        //                        merchant_id = re.merchant.id;
                        $(".box-title").html(postData.name);
                        //alert_success(res.msg)
                        message({
                            msg: res.msg,
                            type: 'success'
                        });

                        if (!!res.redirect_url) {
                            window.location.href = res.redirect_url
                        }

                    } else {
                        if (!!res.node && !!res.errmsg) {
                            $(".form-control[name='" + res.node + "']").siblings(".prompt").addClass("errMsg");
                            $(".form-control[name='" + res.node + "']").siblings(".prompt").html(res.errmsg);
                        } else {
                            //alert_error(res.errmsg)
                            message({
                                msg: res.errmsg,
                                type: 'error'
                            });
                            //                    		window.location.reload()
                        }
                    }
                    //redirect
                    postflag = false;
                }, 'json')

        }
    }
}