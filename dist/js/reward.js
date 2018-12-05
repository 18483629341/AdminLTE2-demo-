/*****                         
 * reward       
 * 依賴vue.js component.js                           
 *****/
/*                         rewards_list                                 */
if ($("#rewards_list")[0])
    var merchant_list = new Vue({
        el: '#rewards_list',
        data() {
            return {
                list: [
                    { type: "coupon", name: "welcome pass", campaign_name: "aaa", create_date: "2018-6-6", issued: "36", redeemed: "14" },
                    { type: "points", name: "campaing", campaign_name: "bbb", create_date: "2018-6-6", issued: "36", redeemed: "14" },
                    { type: "eticket", name: "campaing2", campaign_name: "ccc", create_date: "2018-6-6", issued: "36", redeemed: "14" },
                ]
            }
        },
        methods: {
            view(id) {
                console.log(id)
            },
            modify(id) {
                console.log(id)
            },
            deleteMerchant(id) {
                console.log(id)
            },
        }
    })

/*                         create_reward                                 */
if ($("#create_reward")[0])
    var createReward = new Vue({
        el: '#create_reward',
        data() {
            return {
                errorMsg: "Please fill in this information !",
                baseurl: parameters.baseurl,
                coupon_id: { value: '' },
                loading: false,
                isUpdate: false,
                list: {
                    configure_type: {
                        percentOff: {
                            key: "percentOff",
                            value: "autoGenerate",
                            dataList: "configure",
                            data: {
                                autoGenerate: {
                                    title: 'Auto generate',
                                    value: 'autoGenerate',
                                    show: ['codePatternTitle', 'codePatternLength', 'cappingRulesTitle', 'couponNumber', 'couponTimes', 'selectStoreTitle', 'sotreList'],
                                },
                                autoPrefix: {
                                    title: 'Auto Prefix',
                                    value: 'autoPrefix',
                                    show: ['codePatternTitle', 'codePatternPrefix', 'cappingRulesTitle', 'couponNumber', 'couponTimes', 'selectStoreTitle', 'sotreList'],
                                },
                                upload: {
                                    title: 'Upload Predefined',
                                    value: 'upload',
                                    show: ['codePatternTitle', 'uploadPredefined', 'cappingRulesTitle', 'couponNumber', 'couponTimes', 'selectStoreTitle', 'sotreList'],
                                },
                                nonUnique: {
                                    title: 'Non-unique Code',
                                    value: 'nonUnique',
                                    show: ['codePatternTitle', 'codePromo', 'cappingRulesTitle', 'couponNumber', 'couponTimes', 'selectStoreTitle', 'sotreList'],
                                },
                            }
                        },
                        physicalCoupon: {
                            key: 'physicalCoupon',
                            dataList: "configure",
                            data: {
                                serialNumber: {
                                    title: 'SERIAL NUMBER',
                                    value: 'serialNumber',
                                    checked: false,
                                    disabled: false,
                                    show: []
                                },
                                barcode: {
                                    title: "BAR CODE",
                                    value: "barcode",
                                    checked: false,
                                    disabled: false,
                                    show: []
                                },
                                couponCode: {
                                    title: "COUPON CODE",
                                    value: "couponCode",
                                    className: 'f16',
                                    checked: true,
                                    disabled: true,
                                    show: ["couponCode_Unique", "couponCode_serialString", "couponCode_serialGeneratorPattern", "couponCode_serialNumberPattern"]
                                },
                                quantityToGenerate: {
                                    checked: true,
                                    show: ['quantityToGenerate']
                                },
                                storesList: {
                                    checked: true,
                                    show: ['storesList']
                                }
                            }
                        },
                    },
                    configure: {
                        storesList: {
                            title: "CATEGORY / SUB CATEGORY / STORES SELECT :",
                            subtitle: "click to select store",
                            type: 'cascader',
                            value: '',
                            required: false,
                            needcheck: false,
                            key: parameters.storesList.name,
                            data: parameters.storesList.data, //所有儲存數據
                        }
                    },
                    // testData:{
                    //     value:true
                    // },
                },
                bakData: {
                    date: {
                        start_date: '',
                        end_date: ''
                    }
                },
                storesList: {
                    title: "select store",
                    key: parameters.storesList.name,
                    data: parameters.storesList.data, //所有儲存數據
                }
            }
        },
        mounted() {

        },
        methods: {
            GetQueryString(name) {
                var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
                var r = window.location.search.substr(1).match(reg);
                if (r != null) return unescape(r[2]);
                return null;
            },
            handleChange($e, v, k) {
                this.dataCheck({
                    data: v
                })
            },
            handleGroupValueChange($e, v, k) {
                this.dataCheck({
                    data: $e
                })
            },
            handlechoose(v, key, data) {
                this.list[key].value = v
                var _this = this
                $.each(this.list[key].data, function(_key, _val) {
                    _val.imgUrl = _val.imgUrl.replace(/B$/, '')
                    if (v == _val.value) {
                        _val.imgUrl += "B"
                    }
                })
                if (key == "coupon_type") {
                    switch (v) {
                        case "percentOff":
                            // this.list.setupReward.name.data[0].title = "Coupon Name"
                            // this.list.setupReward.name.data[1].title = "Coupon Name Chinese"
                            this.list.setupReward.offer.sign = "%";
                            this.list.setupReward.offer.position = "after";
                            this.list.setupReward.offer.placeholder = "Put your Percent Off";
                            break;
                        case "amountDiscount":
                            // this.list.setupReward.name.data[0].title = "Coupon Name"
                            // this.list.setupReward.name.data[1].title = "Coupon Name Chinese"
                            this.list.setupReward.offer.sign = "$";
                            this.list.setupReward.offer.position = "before";
                            this.list.setupReward.offer.placeholder = "Put your Amount Discount";
                            break;
                        case "physicalCoupon":
                            // this.list.setupReward.name.data[0].title = "Physical Coupon Campaign Name";
                            // this.list.setupReward.name.data[1].title = "Physical Coupon Campaign Name Chinese"
                            break;
                    }
                }
            },
            handleconfirmalltime($e, v) {
                v.alltime = $e
                if ($e) {
                    this.bakData.date.start_date = v.data[0].value
                    this.bakData.date.end_date = v.data[1].value
                    v.data[0].value = ''
                    v.data[1].value = ''
                    $("#setupRewardStartDate").find("input").attr("disabled", true).val(v.data[0].value)
                    $("#setupRewardEndDate").find("input").attr("disabled", true).val(v.data[1].value)
                } else {
                    v.data[0].value = this.bakData.date.start_date
                    v.data[1].value = this.bakData.date.end_date
                    $("#setupRewardStartDate").find("input").attr("disabled", false)
                    $("#setupRewardEndDate").datetimepicker('setStartDate', today).find("input").attr("disabled", false)
                }

            },
            handlelangbuttonclick($e, v, k) {
                v.buttonValue = !$e
                if (!$e) {
                    v.data[1].value = ''
                }
            },
            handleImgFile($e, v, k) {
                var _this = this
                v.url = $e.value
                fn_uploadImage({
                    data: $e,
                    callback(result) {
                        v.value = result.value
                    }
                })
            },
            handlePhysicalCouponChange($e, k) {
                this.list.configure_type.physicalCoupon.value = k

            },
            handleradioWithtextChange($e) {
                console.log($e)
            },
            handlePhysicalCouponCheckTitle($e, v) {
                if ($e) {
                    this.list.configure_type.physicalCoupon.data[v].show.push(v + '_Unique')
                    var checkedVal = this.list.configure[v + '_Unique'].checkedVal
                    this.handleUniqueChange(checkedVal, v, '_Unique')
                } else {
                    var data = this.list.configure_type.physicalCoupon.data[v].show
                    var len = data.length
                    data.splice(0, len)
                }
            },
            handleUniqueChange($e, v, k) {
                var _this = this;
                if (k.indexOf('Unique') !== -1) {
                    if ($e == "unique") {
                        this.list.configure[v + '_Unique'].data.fixed.errorMsg = ''
                        this.list.configure[v + '_Unique'].data.fixed.value = ''
                        this.list.configure[v + '_Unique'].data.fixed.required = false
                        this.list.configure_type.physicalCoupon.data[v].show.push(v + '_serialString')
                        this.list.configure_type.physicalCoupon.data[v].show.push(v + '_serialGeneratorPattern')
                        if (this.list.configure[v + '_serialGeneratorPattern'].checkedVal == "random") {
                            this.list.configure_type.physicalCoupon.data[v].show.push(v + '_serialNumberPattern')
                        }
                    } else if ($e == "fixed") {
                        _this.list.configure[v + '_Unique'].data.fixed.required = true
                        var str = ['serialString', 'serialGeneratorPattern', 'serialNumberPattern']
                        $.each(str, function(key, val) {
                            $.each(_this.list.configure_type.physicalCoupon.data[v].show, function(_key, _val) {
                                if (_val.indexOf(val) !== -1) {
                                    _this.list.configure_type.physicalCoupon.data[v].show.splice(_key, 1)
                                    return false
                                }
                            })
                        })
                    }
                }
                if (k.indexOf('Generator') !== -1) {
                    if ($e == "sequential") {
                        this.list.configure[v + '_serialGeneratorPattern'].value = ''
                        this.list.configure_type.physicalCoupon.data[v].show.pop()
                    } else if ($e == "random") {
                        this.list.configure_type.physicalCoupon.data[v].show.push(v + '_serialNumberPattern')
                    }
                }
            },
            handellengthchange($e, v, k) {
                var val = this.list.configure[v + '_serialString'].data
                var l1 = val.length.value
                if (!!l1) {
                    val.prefix.maxlength = l1;
                } else {
                    val.prefix.maxlength = 0
                }

                var l2 = val.prefix.value.length
                var l3 = l1 - l2;
                this.list.configure[v + '_serialGeneratorPattern'].data.sequential.maxlength = l3

            },
            dataCheck(obj) {
                var _this = this
                var key = obj.key || '';
                var data = obj.data || '';
                var flag = true
                if (data) {
                    if (data.required) {
                        if (data.value != undefined) {
                            var valid = true;
                            if (typeof(data.value) == "string") {
                                valid = data.value.trim() ? true : false;
                            }
                            if (data.type === "uploadImg") {
                                if (data.url.indexOf("http") !== -1) {
                                    valid = true
                                }
                            }
                            if (!valid) {
                                data.errorMsg = this.errorMsg
                                flag = false
                            } else {
                                data.errorMsg = ''
                                flag = true
                            }
                        }
                        var dateGroupFlag = false
                        if (data.alltime != undefined) {
                            dateGroupFlag = data.alltime
                            if (dateGroupFlag) {
                                flag = true
                            }
                        }
                    }
                    if (data.data) {
                        if (data.needcheck == false) return
                        $.each(data.data, function(k, v) {
                            var result = _this.dataCheck({ data: v })
                            if (!result && flag) {
                                flag = false
                            }
                        })
                    }
                    return flag
                }
            },
            dataCheckAll(obj) {
                var postdata = {}
                var flag = true;
                var _this = this
                $.each(obj, function(key, val) {
                    if (_this.list.setupReward[val].data == undefined) {
                        if (!_this.dataCheck({ data: _this.list.setupReward[val] })) {
                            flag = false
                        }
                    } else {
                        var dateGroupFlag = false;
                        if (_this.list.setupReward[val].alltime != undefined) {
                            dateGroupFlag = _this.list.setupReward[val].alltime
                            if (!dateGroupFlag) {
                                $.each(_this.list.setupReward[val].data, function(k, v) {
                                    if (!_this.dataCheck({ data: v })) {
                                        flag = false
                                    }
                                })
                            }
                        } else {
                            $.each(_this.list.setupReward[val].data, function(k, v) {
                                if (!_this.dataCheck({ data: v })) {
                                    flag = false
                                }
                            })
                        }
                    }
                })
                return flag
            },
            prevStep() {
                if (this.list.step.value > 1) {
                    this.list.step.value = --this.list.step.value;
                    return
                }
                if (this.list.step.value == 1) {
                    location.href = this.baseurl + '/index.php/reward/index'
                    return
                }
            },
            positionStep(index) {
                if (this.list.step.value > index) {
                    this.list.step.value = index
                }
                if (this.list.step.value < index) {
                    var flag = this.dataCheckAll(this.list.coupon_type.data[this.list.coupon_type.value].show)
                    if (flag) {
                        this.list.step.value = index
                    } else {
                        this.list.step.value = 2
                        this.modalProp('Details not filled out', 'error')
                    }
                }
            },

        }

    })