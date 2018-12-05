/*****                         
 * component      
 * 依賴vue.js      
 * datepicker 依賴 bootstrap-datetimepicker.min.js                     
 *****/
Vue.component('title-word', {
  props: ['data'],
  template: `
    <div :class="['row',data.className]">
        <label class="col-md-12 control-label" v-if="data.title">{{data.title}}</label>
    </div>
    `,
})
Vue.component('input-text', {
  props: ['data'],
  template: `
    <div :class="['row',data.className]">
      <div class="col-md-12">
        <div :class="['form-group ',{'has-error':data.errorMsg}]">
            <label class="control-label textLabel">{{data.title}}</label>
            <input type="text" class="form-control"
                    v-model="data.value"
                    :placeholder = "data.placeholder"
                    @input='$emit("valchange",$event.target.value)'
            >
            <span class="help-block">{{data.errorMsg}}</span>
        </div>
      </div>
    </div>
    `
})

Vue.component('input-text-inline-sign', {
  props: ['data'],
  template: `
    <div class="row" :style="'width:'+data.width">
        <div class="col-xs-12 flex flexStatr">
            <div class="flex row flexWrap">
                <div :class="['col-xs-12 flex flexWrap quliaty',{inputHasVal:data.value}]">
                    <label class="control-label wordnowrap mainColor" v-if="data.title">{{data.title}}</label>
                    <div class="bottomBorderSolid flexGrow" style="margin-right:10px">
                        <span v-if="data.sign && data.position=='before'" class="blod">{{data.sign}}</span>
                        <input type="text" 
                                :class="['noBorder','form-control',{'input-hasSign':data.sign}]" 
                                v-model="data.value" 
                                :maxlength = "data.maxlength"
                                :placeholder = "data.placeholder"
                                @input='$emit("valchange",$event.target.value)'>
                        <span v-if="data.sign && data.position=='after'" class="blod">{{data.sign}}</span>
                    </div>
                </div>
                <div class="errorMsg col-xs-12 flexShrink">{{data.errorMsg}}</div>
            </div>
        </div>
    </div>
    `
})
Vue.component('input-text-inline', {
  props: ['data'],
  template: `
    <div :class="['row',data.className]" :style="'width:'+data.width">
        <div :class="['col-md-6',{inputHasVal:v.value}]" v-for="(v,k) in data.data">
          <div :class="['form-group ',{'has-error':v.errorMsg}]">
              <label class="control-label radiosLabel">{{v.title}}</label>
              <input type="text" 
                :class="['form-control',{'input-hasSign':v.sign}]" 
                v-model="v.value" 
                :maxlength = "v.maxlength"
                :placeholder = "v.placeholder"
                @input='$emit("valchange",$event.target.value)'>
              <span class="help-block">{{v.errorMsg}}</span>
          </div>
        </div>
    </div>
    `
})
Vue.component('input-text-hasbtn', {
  props: ['data'],
  template: `
    <div class="row" :style="'width:'+data.width">
        <div class="col-md-12">
            <label class="control-label">{{data.title}}</label>
            <div :class="['flex',{inlineBlock:data.inline},{inputHasVal:data.value}]">
                <div class="inlineBlock flexGrow p-r-20">
                    <input type="text" class="inputBBS form-control" v-model="data.value" @input='$emit("valchange",$event.target.value)'>
                </div>
                <div class="inlineBlock">
                    <button class="btn btn-blue" @click='$emit("btnclick",$event.target)'>{{data.btnContent}}</button>
                </div>
            </div>
        </div>
        <div class="col-md-12 errorMsg">{{data.errorMsg}}</div>
    </div>
    `
})
Vue.component('input-text-lang', {
  props: ['data'],
  template: `
        <div :class="['row',data.className]">
            <div class="col-md-6">
              <div :class="['form-group ',{'has-error':data.data[0].errorMsg}]">
                  <label class="control-label">{{data.data[0].title}}</label>
                  <input type="text" class="form-control"
                          v-model="data.data[0].value"
                          @input='$emit("valchange",data.data[0])'
                  >
                  <span class="help-block">{{data.data[0].errorMsg}}</span>
              </div>
            </div>
            <div class="col-md-6">
              <div :class="['form-group ',{'has-error':data.data[1].errorMsg}]">
                  <label class="control-label">{{data.data[1].title}}</label>
                  <input type="text" class="form-control"
                        v-model="data.data[1].value" 
                        @input='$emit("valchange",$event.target.value)'
                  >
                  <span class="help-block">{{data.data[1].errorMsg}}</span>
              </div>
            </div>
        </div>
    `
})

Vue.component('input-radio-confirm', {
  props: ['data'],
  template: `
        <div class="row" :style="'width:'+data.width">
            <label class="col-md-12 control-label m-b-20" v-if="data.title">{{data.title}}</label>
            <div class="col-md-12">
                <label class="radio-inline">
                    <div :class="['icon-checkBox',{ischeck:data.value==value1}]"></div>
                    <input type="radio" :value="value1" v-model="data.value" style="display:none"> {{content1}}
                </label>
                <label class="radio-inline">
                <div :class="['icon-checkBox',{ischeck:data.value==value2}]"></div>
                    <input type="radio" :value="value2" v-model="data.value" style="display:none"> {{content2}}
                </label>
            </div>
            <div class="col-md-12 errorMsg">{{data.errorMsg}}</div>
        </div>
    `,
  data() {
    return {
      content1: "YES",
      content2: "NO",
      value1: 1,
      value2: 0
    }
  },
  mounted() {
    this.data.content1 ? this.content1 = this.data.content1 : ''
    this.data.content2 ? this.content2 = this.data.content2 : ''
    this.data.value1 ? this.value1 = this.data.value1 : ''
    this.data.value2 ? this.value2 = this.data.value2 : ''
  }
})
Vue.component('radio-checkstyle', {
  props: ['data', 'vmodel'],
  template: `
        <div class="checkbox flex  ">
            <label>
                <div :class="['icon-checkBox',{ischeck:data.value==vmodel}]"></div>
                <input type="radio" 
                        :value = "data.value"
                        style="display:none" 
                        v-model="vmodel" 
                        @change="$emit('confirmchange',data.value)"
                        > {{data.title}}
            </label>
        </div>
    `
})
Vue.component('input-radio', {
  props: ['data'],
  template: `
    <div :class="['row']">
        <label class="col-md-12 control-label">{{data.title}}</label>
        <div class="col-xs-12 flex flexBetween flexWrap">
            <label class="col-xs-12  col-md-3 radio-inline stopRow p-t-5 "  v-for="(v,k) in data.data" style="margin:0">
                <input type="radio" class="m-r-20" :value="v.value" v-model="data.value" 
                :checked="{true:data.value==v.value}"
                @change="$emit('checkedChange',v.value)"
                > <span :class="['m-l-20',{'text-tip ':data.value==v.value}]">{{v.title}}</span>
            </label>
        </div>
        <div class="col-md-12 errorMsg">{{data.errorMsg}}</div>
    </div>
    `
})
Vue.component('input-radio-group', {
  props: ['data'],
  template: `
    <div :class="['row','radioDiv',data.className]" :style="'width:'+data.width">
        <label class="col-md-12 control-label" v-if="data.title">{{data.title}}</label>
        <label class="col-md-12 control-label" v-if="data.subtitle">{{data.subtitle}}</label>
        <div :class="['col-md-9 col-xs-12 p-t-20',{hide:(k==1&&data.data[0].value=='Numeric')}]" v-for="(v,k) in data.data">
            <input-radio
            :data = "data.data[k]"
            @checkedChange="handleCheckedChange($event)"
            ></input-radio>
        </div>
        <div class="col-md-12 errorMsg">{{data.errorMsg}}</div>
    </div>
    `,
    mounted() {
      this.data.data[0].value == 'Numeric' ? this.data.data[1].required = false :this.data.data[1].required = true 
    },
    methods:{
      handleCheckedChange(val) {
        val == 'Numeric' ? this.data.data[1].required = false :this.data.data[1].required = true 
      }
    }
})
Vue.component('input-radio-withtext', {
  props: ['data'],
  template: `
        <div :class="['row form-group ',{'has-error':data.errorMsg},data.className]">
            <label class="control-label m-b-20 col-xs-12 " v-if="data.title">{{data.title}}</label>
            <div :class="['col-xs-12 flexWrap ',{flex:data.inline}]">
                <div v-for="(v,k) in data.data" :key="k" :class="['form-group m-r-70',{'has-error':v.errorMsg}]">
                    <label :class="['radio-inline paddingright p-l-40',
                          {inputHasVal:v.value||data.checkedVal == v.checkedVal},
                          {'text-main':data.checkedVal == v.checkedVal}
                        ]" 
                        style="vertical-align: baseline;">
                        <input type="radio" v-model="data.checkedVal"
                        :value="v.checkedVal"
                        @change='$emit("valchange",v.checkedVal)'
                        class="form-control"
                        >{{v.title}}
                    </label>
                    <label v-if="v.hastext && data.checkedVal == v.checkedVal" style="vertical-align: baseline;">
                        <input :type="v.inputtype" onclick="(this.select())" 
                          :maxlength="v.maxlength"
                          :readonly="data.checkedVal!=v.checkedVal" 
                          class="form-control"
                          v-model="v.value">
                    </label>
                    <div class="help-block">{{v.errorMsg}}</div>
                </div>
            </div>
            <div class="help-block">{{data.errorMsg}}</div>
        </div>
    `
})

Vue.component('upload-image', {
  props: ['data'],
  template: `
        <div :class="['row','flex','flexWrap','flexEnd',data.className]" :style="'width:'+data.width">
            <label class="col-md-12 control-label">{{data.title}}</label>
            <div class="col-md-6">
                <input type="text" class="inputBBS form-control" v-model="data.url">
            </div>
            <div class="col-md-2">
                <div class="upload_container">
                    Upload Image
                    <input type="file" class="noBorder upload_input"  @change='$emit("getimgdata",$event.target)'>
                </div>
            </div>
            <div class="col-md-3">
                max size 35 x 35 pixel
            </div>
            <div class="col-md-12 errorMsg">{{data.errorMsg}}</div>
        </div>
    `
})
Vue.component('select-normal', {
  props: ['data'],
  template: `
    <div class="row" :style="'width:'+data.width">
        <div class="col-xs-12">
            <select class="form-control inputBBS" v-model='data.value' >
                <option value="0" disabled>{{data.title}}</option>
                <option v-for="(v,k) in data.data" :value="v.value" :key="k">
                {{ v.text }}
                </option>
            </select>
        </div>
    </div> 
    `
})
Vue.component('button-choose-type', {
  props: ['data', 'type', 'baseurl','col'],
  template: `
        <div :class="['col-xs-12 text-center col-md-'+col]">
            <button :disabled="data.disabled" :class="['card',{active:data.value==type}]" @click="$emit('choosetype',data.value)">
                <div class="card-img">
                    <img :src="baseurl+'/img/'+data.imgUrl+'.png'" alt="icon">
                </div>
                <div class="card-title">
                    {{data.title}}
                </div>
                <div class="card-description">
                    {{data.description}}
                </div>
            </button>
        </div>
    `,
  mounted() {
    if(!this.col){
      this.col=3
    }
  }
})

Vue.component('checkbox-default', {
  props: ['data'],
  template: `
            <label class="p-t-20">
                <div :class="['icon-checkBox',{ischeck:data.value}]"></div>
                <input type="checkbox" 
                        style="display:none" 
                        v-model="data.value" 
                        @change="$emit('confirmchange',data.value)"
                        > {{data.title}}
            </label>
    `
})
Vue.component('checkbox-titlestyle', {
  props: ['data'],
  template: `
        <div class="checkbox flex p-b-10">
            <label class="f16 text-lightBlack m-t-10">
                <div :class="['icon-checkBox',{ischeck:data.checked}]"></div>
                <input type="checkbox" 
                        :disabled = "data.disabled"
                        v-model = "data.checked"
                        style="display:none" 
                        @change="$emit('checkboxchange',data.checked)"
                        > {{data.title}}
            </label>
        </div>
    `
})
Vue.component('checkbox-confirm', {
  props: ['data', 'checked'],
  template: `
    <div class="checkbox flex">
        <label>		                
            <div :class="['icon-checkBox allcheck',{ischeck:checked}]"></div>
            <input type="checkbox" 
                    style="display:none" 
                    v-model="checked" 
                    @change="$emit('confirmchange',checked)"
                    > All Time
        </label>
    </div>
    `
})
Vue.component('checkbox-subgroup', {
  props: ['data'],
  template: `
        <div>
            <div class="flex flexWrap">
                <checkbox-default
                v-bind:data="data.checkall"
                @confirmchange = "checkall"
                ></checkbox-default>  
                <checkbox-default
                v-for="(v,k) in data.value"
                v-bind:data="v"
                @confirmchange = "checksign"
                ></checkbox-default>
            </div>
        </div>
    `,
  mounted() {
    if (this.data.checkall == undefined) {
      this.data.checkall = {}
    }
    if (this.data.checkall.title == undefined)
      this.data.checkall.title = "checkAll"
    if (this.data.checkall.value == undefined)
      this.data.checkall.value = false
  },
  methods: {
    checkall() {
      var flag = this.data.checkall.value
      this.data.value.map((x) => { x.value = flag })
      this.$emit("subcheckall", this.data.checkall)
    },
    checksign() {
      var flag = 0;
      this.data.value.map((x) => { x.value == false ? flag++ : '' })
      if (flag > 0) {
        this.data.checkall.value = false
      } else {
        this.data.checkall.value = true
      }
    }
  }
})
Vue.component('cascader', {
  props: ['data'],
  template: `
    <div class="row cascader">
        <label class="col-xs-12" class="cascaderLabel">
            {{data.title}}
        </label>
        <div  @click.stop="showList" :class="['col-sm-12 subtitle border resultBox m-t-10',{active:show},{hasItems:showMerchant.length>0}]">
            <span v-if="showMerchant.length==0">{{data.subtitle}}</span>
            <button type="button" class="btn btn-primary btn-sm resultItem" v-for="(v,k) in showMerchant">
              {{v.store_name}}<i class="fa fa-close" @click="removeResultItem(v)"></i>
            </button>
            <i class="icon downtriangle" v-show="!show"></i>
            <i class="icon close_blue" v-show="show" @click.stop="closeList"></i>
        </div>
        <div v-show="show" class="col-sm-12 no-mp cascaderProp">
            <div class="row listcontainer border no-mp">
                <div calss="col-xs-12">
                    <div class="row">
                        <div class="col-xs-12 col-md-6">
                            <div class="form-group  has-feedback searchBox">
                                <span class="glyphicon glyphicon-search form-control-feedback"></span>
                                <input type="text" class="form-control" v-model="searchKw" placeholder="Search Merchant ..." @input="searchInput">
                            </div>
                        </div>
                    </div>
                    <ul class="searchResult">
                        <li v-for="(v,k) in searchResult" :key="k" @click="positionMerchant(v,searchKey[v][3])" :class="[searchKey[v][3]==1?'checked':'']">{{v}}</li>
                        <li v-if="searchResult.length ==0 && searchKw.length!==0">no merchant</li>
                    </ul>
                </div>
                <ul class="col-sm-4 cascader-left">
                    <li>
                        <div class="p-t-20 title">
                            <span class="lilabel">Categary</span>
                        </div>
                    </li>
                    <li >
                        <div class="p-t-20 title">
                            <div :class="['icon-checkBox',{ischeck:lv1.status===1},{notallcheck:lv1.status===2}]"  @click="checkall(lv1)"></div>
                            <span :class="['lilabel',{ischeck:lv1.status===1},{notallcheck:lv1.status===2}]">Select All</span>
                        </div>
                    </li>
                    <li v-for="(v,k) in lv1.data" :key="k" style="padding-right:30px" :class="{isSelect:k==selectLv1}">
                        <div class="p-t-20 title">
                            <div :class="['icon-checkBox',{ischeck:v.status===1},{notallcheck:v.status===2}]"  @click="checksign(k,lv1,'lv1')"></div>
                            <span :class="['lilabel',{ischeck:v.status===1},{notallcheck:v.status===2}]"  @click="showlv2(k)">{{k}}</span>
                        </div>
                        <i class="icon rightarrow" @click="showlv2(k)"></i>
                    </li>
                </ul>
                <ul class="col-sm-3 cascader-middle" v-if="Object.keys(lv2).length!==0 && lv2.data[0]==undefined " >
                    <li>
                        <div class="p-t-20 title">
                            <span class="lilabel">Sub Categary</span>
                        </div>
                    </li>
                    <li>
                        <div class="p-t-20 title" @click=checkall(lv2)>
                            <div :class="['icon-checkBox',{ischeck:lv2.status===1},{notallcheck:lv2.status===2}]"></div>
                            <span :class="['lilabel',{ischeck:lv2.status===1},{notallcheck:lv2.status===2}]">Select All</span>
                        </div>
                    </li>
                    <li v-for="(v,k) in lv2.data" :key="k">
                        <div class="p-t-20 title"  @click="checksign(k,lv2,'lv2')" v-if="k!==0">
                            <div :class="['icon-checkBox',{ischeck:v.status==1},{notallcheck:v.status==2}]"></div>
                            <span :class="['lilabel',{ischeck:v.status==1},{notallcheck:v.status==2}]">{{k}}</span>
                        </div>
                        <i class="icon rightarrow" @click="showlv3(k)"></i>
                    </li>
                </ul>
                <ul class="col-sm-8 cascader-right" v-if="Object.keys(lv3).length!==0">
                    <li>
                        <div class="p-t-20 title">
                            <span class="lilabel">Merchant</span>
                        </div>
                    </li>
                    <li class="col-xs-12">
                        <div class="p-t-20 title" @click=checkall(lv3)>
                            <div :class="['icon-checkBox',{ischeck:lv3.status==1},{notallcheck:lv3.status==2}]"></div>
                            <span :class="['lilabel',{ischeck:lv3.status==1},{notallcheck:lv3.status==2}]">Select All</span>
                        </div>
                    </li>
                    <li v-for="(v,k) in lv3.data" :key="k" class="col-sm-6">
                        <label class="p-t-20 title">
                            <div :class="['icon-checkBox',{ischeck:v.status}]"></div>
                            <input type="checkbox" 
                                    v-model = "v.status"
                                    style="display:none" 
                                    @change = "checksign(k)"
                                    > 
                            <span :class="['lilabel',{ischeck:v.status}]">{{v.store_name}}</span>
                        </label>
                    </li>
                </ul>
            </div>
        </div>
    `,
  data() {
    return {
      show: false,
      lv1: {},
      lv2: {},
      lv3: {},
      searchKey: {},
      searchKw: '',
      searchResult: [],
      selectLv1: '',
      showMerchant: []
    }
  },
  mounted() {
    var _this = this
    _this.lv1 = _this.data.data;
    _this.changeAllStatus()
    $(document).on('mouseup',_this.outSide);
  },
  beforeDestroy(){
    $(document).unbind('mouseup',_this.outSide)
  },
  methods: {
    outSide(e) {
      var _con = $('.cascaderProp'); // 设置目标区域
      if(!_con.is(e.target) && _con.has(e.target).length === 0){ // Mark 1
         this.show = false
       }
    },
    handleShowMerchant() {

    },
    changeAllStatus() {
      var _this = this
      _this.showMerchant = [];
      var flag = 0;
      var all = 0, notall = 0, none = 0;
      var len = Object.keys(_this.lv1.data).length
      $.each(_this.lv1.data, function (k, v) {
        var flag1 = 0;
        var _all = 0, _notall = 0, _none = 0;
        var _len = Object.keys(v.data).length
        $.each(v.data, function (key, val) {
          var flag2 = 0;
          var length = val.data.length, count = 0;
          $.each(val.data, function (_key, _val) {
            _this.searchKey[_val.store_name] = [k, key, _key,_val.status]
            if (_val.status) {
              count++
              _this.showMerchant.push(_val)
            }
          })
          if (count == length) {
            _all++;
            flag2 = 1
          } else if (count == 0) {
            _none++
            flag2 = 0
          } else {
            _notall++
            flag2 = 2
          }
          val.status = flag2
        })
        if (_all == _len) {
          all++;
          flag1 = 1
        } else if (_none == _len) {
          none++
          flag1 = 0
        } else {
          notall++
          flag1 = 2
        }
        _this.lv1.data[k].status = flag1
      })
      all == len ? flag = 1 : none == len ? flag = 0 : flag = 2
      _this.lv1.status = flag
    },
    showList() {
      if(!this.show){
        this.show = true
      }
    },
    closeList() {
      this.show = false
    },
    checkall(obj) {
      if (obj.status == 0 || obj.status == 2) {
        obj.status = 1
        _changeall(obj, 1)
      } else {
        obj.status = 0;
        _changeall(obj, 0)
      }
      function _changeall(obj, status) {
        if (obj.data) {
          $.each(obj.data, function (k, v) {
            if (v.status != undefined) {
              v.status = status
            }
            if (v.data != undefined) {
              _changeall(v.data, status)
            }
          })
        } else {
          $.each(obj, function (k, v) {
            if (v.status != undefined) {
              v.status = status
            }
            if (v.data != undefined) {
              _changeall(v.data, status)
            }
          })
        }
      }
      this.changeAllStatus()
    },
    showlv2(k) {
      console.log(this.lv2)
      this.lv2 = this.lv1.data[k]
      this.selectLv1 = k
      if (this.lv2.data[0] !== undefined) {
        this.lv3 = this.lv2.data[0]
      } else {
        this.lv3 = {}
      }
    },
    showlv3(k) {
      this.lv3 = this.lv2.data[k]
    },
    checksign(k, data, key) {
      console.log(1)
      if (data) {
        this.checkall(data.data[k])
        if (key == "lv1") {
          this.showlv2(k)
        }
        if (key == "lv2") {
          this.showlv3(k)
        }
      }
      this.changeAllStatus()
    },
    searchInput() {
      var _this = this
      _this.searchResult = [];
      if (_this.searchKw.length == 0) return
      var reg = new RegExp(_this.searchKw, 'i')
      $.each(_this.searchKey, function (k, v) {
        if (reg.test(k)) {
          console.log(k)
          _this.searchResult.push(k)
        }
      })
    },
    positionMerchant(v,status) {
      var key = this.searchKey[v]
      this.showlv2(key[0])
      this.showlv3(key[1])
      
      this.lv3.data[key[2]].status = status==1?0:1;
      this.changeAllStatus();
      this.searchKw = '';
      this.searchResult = []
    },
    removeResultItem(v) {
      v.status = 0
      this.changeAllStatus()
    }
  }
})

Vue.component('checkbox-group', {
  props: ['data'],
  template: `
        <div>
            <div class="flex flexWrap">
                <input-text
                v-bind:data="data"
                ></input-text>
                <checkbox-subgroup
                v-for="(v,k) in data"
                v-bind:data="v"
                ></checkbox-subgroup>
            </div>
        </div>
    `
})



Vue.component('datetimepicker', {
  props: ['data', 'dataList', 'index'],
  template: `
        <div class="form-group  row" :style="'width:'+data.width">
            <label class="col-md-12 control-label">{{data.title}}</label>
            <div :id="data.id" class="input-group date form_datetime col-md-12" data-date-format="dd MM yyyy" :data-link-field="data.id+'_input'">
                <span class="input-group-addon"><span class="glyphicon glyphicon-calendar"></span></span>    
                <input class="form-control" size="16" type="text" v-model="data.value" readonly :placeholder="data.content">
                <span class="input-group-addon"><span class="closeIcon"><span class="glyphicon glyphicon-remove"></span></span></span>
            </div>
            <input type="hidden" :id="data.id+'_input'" value="" /><br/>
            <div class="col-md-12 errorMsg">{{data.errorMsg}}</div>
        </div>
    `,
  mounted() {
    var endDateId = null, startDateId = null;
    var _this = this
    if (this.index != undefined) {
      this.index == 0 ? endDateId = this.dataList[1].id : startDateId = this.dataList[0].id
    }
    fn_datetimepicker({
      id: this.data.id,
      setStartId: endDateId,
      setEndId: startDateId,
      result(re) {
        _this.data.value = re
      },
    })
  },
  beforeDestroy() {
    $('#' + this.data.id).datetimepicker('remove');
  }
})
Vue.component('datetimepicker-group', {
  props: ['data'],
  template: `
        <div :class="['flex','flexWrap','row',data.className]" :style="'width:'+data.width">
            <div class="col-md-5" v-for="(v,k) in data.data" :key="k" v-if="!data.alltime">
                <datetimepicker
                :data="v"
                :dataList ="data.data"
                :index = "k"
                ></datetimepicker>
            </div>
            <div class="flex col-md-2">
                <checkbox-confirm
                :data="data.checkBoxContent"
                :checked = 'data.alltime'
                @confirmchange = "$emit('confirmchange',$event)"
                ></checkbox-confirm>
            </div>
        </div>
    `
})

Vue.component('textarea-text-lang', {
  props: ['data'],
  template: `
        <div :class="['row',data.className]" :style="'width:'+data.width">
            <div class="col-md-12">
                <div class="row">
                    <label class="col-md-12 control-label p-b-20">{{data.data[0].title}}</label>
                    <div class="col-md-12">
                        <textarea type="text" class="form-control" rows="5"
                            v-model="data.data[0].value" 
                            @input='$emit("valchange",$event.target.value)'>
                        </textarea>
                    </div>
                    <div class="col-md-12 errorMsg">{{data.data[0].errorMsg}}</div>
                    <div class="col-md-12" style="padding-top:20px;">
                        <button class="btn btn-blue"
                            @click="$emit('langbuttonclick',data.buttonValue)"
                        >
                        {{data.buttonValue?data.buttonContext1:data.buttonContext2}}
                        </button>
                    </div>
                    
                </div>
                <div class="row p-t-20" v-show="!data.buttonValue">
                    <label class="col-md-12 control-label p-b-20">{{data.data[1].title}}</label>
                    <div class="col-md-12">
                        <textarea type="text" class="form-control" rows="5"
                            v-model="data.data[1].value" 
                            @input='$emit("valchange",$event.target.value)'>
                        </textarea>
                    </div>
                    <div class="col-md-12 errorMsg">{{data.data[1].errorMsg}}</div>
                </div>
            </div>
        </div>
    `
})
Vue.component('daterangepicker', {
  props: ['data'],
  template: `
    <div :class="['row',data.className]">
        <label class="col-md-12 p-b-10">{{data.title}}</label>
        <div :class="['form-group col-md-6 ',{'has-error':data.data[0].errorMsg}]">
          <div class="input-group">
            <div class="input-group-addon">
                <i class="fa fa-calendar"></i>
            </div>
            <input type="text" class="form-control pull-right" :id="id" :disabled='data.alltime'>
          </div>
          <span class="help-block">{{data.data[0].errorMsg}}</span>
        </div>
        <div class="col-md-6">
            <checkbox-confirm
            :data="data.checkBoxContent"
            :checked = 'data.alltime'
            @confirmchange = "handleAlltimeChange($event)"
            ></checkbox-confirm>
        </div>
      </div>
    `,
  data() {
    return {
      start: '',
      end: '',
      id: 'reservation'+Math.floor(Math.random()*10000)
    }
  },
  mounted() {
    var _this = this
    $('#'+_this.id).daterangepicker({
      autoApply: true,
      "locale": {
        format: 'YYYY-MM-DD',
        separator: ' ~ ',
      }
    }, function (start, end, label) {
      _this.data.data[0].value = start.format('YYYY-MM-DD')
      _this.data.data[1].value = end.format('YYYY-MM-DD')
      _this.data.data[0].errorMsg = ''
    })
  },
  methods: {
    handleAlltimeChange($e) {
      var _this = this
      this.data.alltime = $e;
      _this.data.data[0].errorMsg = ''
      if($e){
        this.start = _this.data.data[0].value
        _this.data.data[0].value = ''
        this.end = _this.data.data[1].value
        _this.data.data[1].value = ''
        $('#'+_this.id).val('Infinity')
      }else {
        _this.data.data[0].value = this.start 
        _this.data.data[1].value = this.end 
        $('#'+_this.id).daterangepicker('setStartDate',_this.start)
        $('#'+_this.id).daterangepicker('setEndDate',_this.end)
      }
    }
  }
})

/**
 * 插件function
 */

var today = moment().format("YYYY-MM-DD")

/**
 * component('datetimepicker')
 * @param {id:element id,result:callback fn} obj 
 */
function fn_datetimepicker(obj) {
  var id = obj.id;
  var setStartId = obj.setStartId
  var setEndId = obj.setEndId
  var result = obj.result;
  if (obj.remove) {
    $('#' + id).datetimepicker('remove');
  }
  $('#' + id).datetimepicker({
    language: 'zh-CN',
    format: 'yyyy-mm-dd',
    weekStart: 0,    //一周从那一天开始，默认值为:0,范围：0-6
    todayBtn: 1,    //默认值：false，为true时，底部显示today，不选中，为linked时当天日期被选中
    autoclose: 1,    //选择一个日期后是否立即关闭此选择框
    todayHighlight: 1,  //高亮当前日期
    startView: 2,     // 日期时间选择器打开之后首先显示的视图，默认值为：2，0:hour,1:day,2:mouth,3:year,4:decade
    forceParse: 0,    //强制解析文本框的值
    minView: "month",
    showMeridian: 1,
    // startDate:today,
    initialDate: today,
  });
  $('#' + id).datetimepicker().on('hide', function (ev) {
    var date = $(this).find("input").val()
    if (result) {
      result(date);
    }
    if (setStartId) {
      $('#' + setStartId).datetimepicker('setStartDate', date);
    }
    if (setEndId) {

      $('#' + setEndId).datetimepicker('setEndDate', date);
    }
  });
}

/**
 * component('datetimepicker')
 * @param {startDateId,endDateId,fn_getStartDate, fn_setStartDate,fn_getEndDateId,fn_setEndDateId} obj 
 */
function fn_datetimepickerGroup(obj) {
  fn_datetimepicker({
    id: obj.startDateId,
    setStartId: obj.endDateId,
    result: obj.fn_getStartDate,
    remove: obj.remove || false
  })
  fn_datetimepicker({
    id: obj.endDateId,
    setEndId: obj.startDateId,
    result: obj.fn_getEndDateId,
    remove: obj.remove || false
  })
}
/**
 * component('upload-image')
 * @param {data:input file vaue, callback:fn} obj 
 */
function fn_uploadImage(obj) {
  var localUrl = obj.data.value;
  var file = obj.data.files;
  var prvid = obj.prvid || '';
  var callback = obj.callback;
  var srcData = null;//接收图片的数据
  var show = prvid ? true : false;
  if (show) {
    var prvbox = document.getElementById(prvid);
    prvbox.innerHTML = "";
  }

  /* file：file控件 
  * prvid: 图片预览容器 
  */
  var tip = "except png!"; // 设定提示信息 
  var filters = {
    "jpeg": "/9j/4",
    "gif": "R0lGOD",
    "png": "iVBORw"
  }

  if (window.FileReader) { // html5方案 
    var fr = new FileReader();
    fr.readAsDataURL(file[0]);
    fr.onload = function (e) {
      var src = e.target.result;
      if (!validateImg(src)) {
        alert(tip)
      } else {
        srcData = src;
        var data = {
          value: srcData,
          localUrl: localUrl
        };
        imgSize(srcData, function (w, h) {
          data.width = w,
            data.height = h
          callback(data)
        });
        show ? showPrvImg(src) : '';
      }
    }
  } else { // 降级处理  不支持h5的写法
    if (!/\.png|\.jpeg|\.jpg|.gif/i.test(file.value)) {
      alert(tip);
    } else {
      srcData = file.value;
      var data = {
        value: srcData,
        localUrl: localUrl
      };
      imgSize(srcData, function (w, h) {
        data.width = w,
          data.height = h
        callback(data)
      });
      show ? showPrvImg(file.value) : '';
    }
  }

  function validateImg(data) {
    var pos = data.indexOf(",") + 1;
    for (var e in filters) {
      if (data.indexOf(filters[e]) === pos) {
        return e;
      }
    }
    return null;
  }

  function imgSize(data, result) {
    var image = new Image();
    image.onload = function () {
      var width = image.width;
      var height = image.height;
      result(width, height)
    };
    image.src = data;
  }

  function showPrvImg(src) {
    var img = document.createElement("img");
    img.src = src;
    prvbox.appendChild(img);
  }
}