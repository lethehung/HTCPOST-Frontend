<template>
  <a-spin :spinning="spinning" tip="Loading">
  <page-header-wrapper content="Tạo mới vận đơn">
    <div slot="extra">
      <a-input v-model="form.bill_id" placeholder="Mã vận đơn"></a-input>
    </div>
    <a-card class="card" title="Thông tin người gửi" :bordered="false">
      <a-form-model class="form">
        <a-row class="form-row" :gutter="16">
          <a-col :lg="6" :md="12" :sm="24">
            <a-form-model-item label="Họ tên, địa chỉ người gửi">
              <a-textarea v-model="form.address_send" :auto-size="{ minRows: 5, maxRows: 6 }" placeholder="Nhập vào thông tin người gửi" />
            </a-form-model-item>
          </a-col>
          <a-col :xl="{span: 7, offset: 1}" :lg="{span: 8}" :md="{span: 12}" :sm="24">
            <a-form-model-item label="Số điện thoại người gửi">
              <a-input
                v-model="form.phone_send"
                addonBefore="+84"
                placeholder="Nhập số điện thoại"
              />
            </a-form-model-item>
          </a-col>
          <a-col :xl="{span: 9, offset: 1}" :lg="{span: 10}" :md="{span: 24}" :sm="24">
            <a-col :span="12">
              <a-form-model-item
                label="Chọn tỉnh thành phố">
                <a-select
                        v-model="form.city_send"
                        show-search
                        option-filter-prop="children"
                        :filter-option="filterOption"
                        @change="handleChange($event, 'send' )"
                >
                  <a-select-option v-for="item in form_address.list_province" :key="item.id" :value="item.id">
                    {{ item.name }}
                  </a-select-option>
                </a-select>
              </a-form-model-item>
            </a-col>
            <a-col :span="12" v-if="form.city_send">
              <a-form-model-item label="Chọn quận, huyện">
                <a-select
                        show-search
                        v-model="form.district_send"
                        placeholder="Chọn quận huyện"
                        option-filter-prop="children"
                        :filter-option="filterOption"
                >
                  <a-select-option v-for="item in form_address.list_district_send" :key="item.id" :value="item.id">
                    {{ item.name }}
                  </a-select-option>
                </a-select>
              </a-form-model-item>
            </a-col>
            <a-col :span="12" v-else>
              <a-form-model-item label="Chọn quận, huyện">
                <a-select
                        disabled=""
                        show-search
                        placeholder="Chọn quận, huyện"
                        option-filter-prop="children"
                        :filter-option="filterOption"
                >
                </a-select>
              </a-form-model-item>
            </a-col>
          </a-col>
        </a-row>
        <a-row class="form-row" :gutter="16">
          <a-col :lg="6" :md="12" :sm="24">
            <a-form-model-item label="Ngày gửi">
              <a-date-picker v-model="form.time_send" format="HH:mm:ss DD-MM-YYYY" showTime style="width: 100%"/>
            </a-form-model-item>
          </a-col>
          <a-col :xl="{span: 7, offset: 1}" :lg="{span: 8}" :md="{span: 12}" :sm="24">
            <a-form-model-item label="Nhân viên nhận hàng">
              <a-select placeholder="Chọn nhân viên nhận hàng" v-model="form.user_send">
                <a-select-option value="王同学">王同学</a-select-option>
                <a-select-option value="李同学">李同学</a-select-option>
                <a-select-option value="黄同学">黄同学</a-select-option>
              </a-select>
            </a-form-model-item>
          </a-col>
          <a-col :xl="{span: 7, offset: 1}" :lg="{span: 8}" :md="{span: 12}" :sm="24">
            <a-form-model-item label="Chữ ký người gửi">
              <a-input v-model="form.signature_send" placeholder=""/>
            </a-form-model-item>
          </a-col>
        </a-row>
      </a-form-model>
    </a-card>
    <a-card class="card" title="Thông tin người nhận" :bordered="false">
      <a-form-model class="form">
        <a-row class="form-row" :gutter="16">
          <a-col :lg="6" :md="12" :sm="24">
            <a-form-model-item label="Họ tên, địa chỉ người nhận">
              <a-textarea v-model="form.address_receive" :auto-size="{ minRows: 5, maxRows: 6 }" placeholder="Nhập vào thông tin người gửi" />
            </a-form-model-item>
          </a-col>
          <a-col :xl="{span: 7, offset: 1}" :lg="{span: 8}" :md="{span: 12}" :sm="24">
            <a-form-model-item label="Số điện thoại người nhận">
              <a-input
                v-model="form.phone_receive"
                addonBefore="+84"
                placeholder="Nhập số điện thoại"
              />
            </a-form-model-item>
          </a-col>
          <a-col :xl="{span: 9, offset: 1}" :lg="{span: 10}" :md="{span: 24}" :sm="24">
            <a-col :span="12">
              <a-form-model-item
                label="Chọn tỉnh thành phố">
                <a-select
                        v-model="form.city_receive"
                        show-search
                        placeholder="Chọn tỉnh thành phố"
                        option-filter-prop="children"
                        :filter-option="filterOption"
                        @change="handleChange($event, 'receive')"

                >
                  <a-select-option v-for="item in form_address.list_province" :key="item.id" :value="item.id">
                    {{ item.name }}
                  </a-select-option>
                </a-select>
              </a-form-model-item>
            </a-col>
            <a-col :span="12">
              <a-form-model-item label="Chọn quận, huyện">
                <a-select
                        v-if="form.city_receive"
                        show-search
                        v-model="form.district_receive"
                        placeholder="Chọn quận, huyện"
                        option-filter-prop="children"
                        :filter-option="filterOption"
                >
                  <a-select-option v-for="item in form_address.list_district_receive" :key="item.email" :value="item.id">
                    {{ item.name }}
                  </a-select-option>
                </a-select>
                <a-select
                        v-else
                        disabled=""
                        show-search
                        placeholder="Chọn quận, huyện"
                        option-filter-prop="children"
                        :filter-option="filterOption"
                >
                </a-select>
              </a-form-model-item>
            </a-col>
          </a-col>
        </a-row>
        <a-row class="form-row" :gutter="16">
          <a-col :lg="6" :md="12" :sm="24">
            <a-form-model-item label="Ngày nhận">
              <a-date-picker v-model="form.time_receive" showTime style="width: 100%"/>
            </a-form-model-item>
          </a-col>
          <a-col :xl="{span: 7, offset: 1}" :lg="{span: 8}" :md="{span: 12}" :sm="24">
            <a-form-model-item label="Nhân viên giao hàng">
              <a-select
              >
              </a-select>
            </a-form-model-item>
          </a-col>
          <a-col :xl="{span: 7, offset: 1}" :lg="{span: 8}" :md="{span: 12}" :sm="24">
            <a-form-model-item label="Chữ ký người nhận" >
              <a-input placeholder="" v-model="form.signature_receive"/>
            </a-form-model-item>
          </a-col>
        </a-row>
      </a-form-model>
    </a-card>

    <!-- table -->
    <a-card title="Thông tin hàng hóa và dịch vụ" >
      <a-form-model class="form">
        <a-switch un-checked-children="COD" v-model="form.status_cod"/>
        <a-row class="form-row" :gutter="16">
          <a-col :lg="6" :md="12" :sm="24">
            <a-form-model-item label="Dịch vụ">
              <a-radio-group v-model="form.type">
                <a-radio value="0">
                  CPN
                </a-radio>
                <a-radio value="1">
                  Hỏa tốc
                </a-radio>
                <a-radio value="2">
                  Thường
                </a-radio>
                <a-radio value="3">
                  Tiết kiệm
                </a-radio>
              </a-radio-group>
            </a-form-model-item>
            <a-form-model-item label="Khai giá">
              <a-input-number :min="0" v-model="form.price_product"></a-input-number>
            </a-form-model-item>
          </a-col>
          <a-col :xl="{span: 8, offset: 1}" :lg="{span: 8}" :md="{span: 12}" :sm="24">
            <a-form-model-item label="Số kiện" :label-col="{ span: 8 }" :wrapper-col="{ span: 14 }">
              <a-input-number v-model="form.package" :default-value="1" step="1" :min="0"/>
            </a-form-model-item>
            <a-form-model-item :label-col="{ span: 8 }" :wrapper-col="{ span: 14 }" label="Khối lượng thực(kg)">
              <a-input-number v-model="form.weight_real" :default-value="0" step="1" :min="0"/>
            </a-form-model-item >
            <a-form-model-item :label-col="{ span: 8 }" :wrapper-col="{ span: 14 }" label="Khối lượng quy đổi(kg)">
              <a-input-number v-model="form.weight_convert" :default-value="0" step="1" :min="0"/>
            </a-form-model-item>
          </a-col>
          <a-col :xl="{span: 8, offset: 1}" :lg="{span: 10}" :md="{span: 24}" :sm="24" v-if="form.status_cod">
            <a-form-model-item :label-col="{ span: 8 }" :wrapper-col="{ span: 14 }" label="Số tiền cần thu hộ">
              <a-input-number v-model="form.cod" :default-value="0" step="1" :min="0"/>
            </a-form-model-item>
            <a-form-model-item :label-col="{ span: 8 }" :wrapper-col="{ span: 14 }" label="Nội dung">
              <a-textarea v-model="form.content_cod" :auto-size="{ minRows: 5, maxRows: 6 }" placeholder="Nhập nội dung" />
            </a-form-model-item>
          </a-col>
        </a-row>
      </a-form-model>
    </a-card>
    <a-card class="card" title="Thanh toán" :bordered="true" style="margin-top: 30px">
      <div slot="extra">Nếu thất bại:
        <a-switch v-model="form.status_failed" un-checked-children="Hủy" checked-children="Chuyển hoàn"></a-switch>
      </div>
      <a-form-model class="form">
        <a-row class="form-row" :gutter="16">
          <a-col :lg="6" :md="12" :sm="24">
            <a-form-model-item label="Cước chính" :label-col="{ span: 10 }" :wrapper-col="{ span: 14 }">
              <a-input-number v-model="form.fees" :default-value="1" step="1" :min="0"/>
            </a-form-model-item>
            <a-form-model-item :label-col="{ span: 10 }" :wrapper-col="{ span: 14 }" label="Cước dịch vụ đặc biệt">
              <a-input-number :default-value="0" v-model="form.fees_special" step="1" :min="0"/>
            </a-form-model-item >
            <a-form-model-item :label-col="{ span: 10 }" :wrapper-col="{ span: 14 }" label="Cước COD" v-if="form.status_cod">
              <a-input-number v-model="form.fees_cod" :default-value="0" step="1" :min="0"/>
            </a-form-model-item>
            <a-form-model-item :label-col="{ span: 10 }" :wrapper-col="{ span: 14 }" label="Cước giá hàng hóa" v-if="form.price_product > 0">
              <a-input-number v-model="form.fees_product" :disabled="true" :default-value="0" step="1" :min="0"/>
            </a-form-model-item>
          </a-col>
          <a-col :lg="6" :md="12" :sm="24">
            <a-form-model-item label="Tổng cộng" :label-col="{ span: 10 }" :wrapper-col="{ span: 14 }">
              <a-input-number v-model="fees_total" step="1" :min="0" :disabled="true"/>
            </a-form-model-item>
            <a-form-model-item :label-col="{ span: 10 }" :wrapper-col="{ span: 14 }" label="Đã thu của người gửi">
              <a-input-number v-model="form.fees_send" :default-value="0" step="1" :min="0"/>
            </a-form-model-item >
            <a-form-model-item :label-col="{ span: 10 }" :wrapper-col="{ span: 14 }" label="Còn lại">
              <a-input-number v-model="fees_remain" step="1" :min="0" :disabled="true"/>
            </a-form-model-item>
          </a-col>
          <a-col :xl="{span: 9, offset: 1}" :lg="{span: 10}" :md="{span: 24}" :sm="24">
            <a-form-model-item
              label="Hình thức thanh toán">
              <a-radio-group v-model="form.state">
                <a-radio value="0">
                  TT ngay
                </a-radio>
                <a-radio value="1">
                  Nợ tạm thời
                </a-radio>
                <a-radio value="2">
                  NN thanh toán
                </a-radio>
                <a-radio value="3">
                  Thanh toán sau
                </a-radio>
              </a-radio-group>
            </a-form-model-item>
            <a-form-model-item label="Khách hàng" v-if="form.state === '3'">
              <a-select placeholder="Lựa chọn khách hàng">
                <a-select-option value="王同学">王同学</a-select-option>
                <a-select-option value="李同学">李同学</a-select-option>
                <a-select-option value="黄同学">黄同学</a-select-option>
              </a-select>
            </a-form-model-item>
          </a-col>
        </a-row>
      </a-form-model>
      <a-form-model-item
        :wrapperCol="{ span: 24 }"
        style="text-align: center; margin-top: 50px"
      >
        <a-button @click="submit()" type="primary">Lưu vận đơn</a-button>
        <a-button style="margin-left: 8px">Làm mới</a-button>
      </a-form-model-item>
    </a-card>
    <footer-tool-bar :is-mobile="isMobile" :collapsed="sideCollapsed">
      <a-button type="primary" @click="submit()" :loading="loading">Lưu vận đơn</a-button>
    </footer-tool-bar>
  </page-header-wrapper>
  </a-spin>
</template>

<script>
    import FooterToolBar from '@/components/FooterToolbar'
    import moment from 'moment'
    import { getWardAndDistrict } from '@/api/asset'
    import { createBillNormal } from '@/api/bill'
    import { baseMixin } from '@/store/app-mixin'
    export default {
        name: 'CreateBill',
        mixins: [baseMixin],
        components: {
            FooterToolBar
        },
        data () {
            return {
                spinning: false,
                loading: false,
                form_address: {
                    list_province: [],
                    list_district_send: [],
                    list_district_receive: [],
                    province_send: '',
                    province_receive: '',
                    district_send: '',
                    district_receive: ''
                },
                form: {
                    bill_id: '',
                    address_send: '',
                    phone_send: '',
                    city_send: '',
                    time_send: moment(),
                    district_send: '',
                    address_receive: '',
                    time_receive: '',
                    type: '2',
                    package: 1,
                    price_product: 0,
                    status_cod: false,
                    fees: 0,
                    fees_special: 0,
                    fees_cod: 0,
                    fees_product: 0,
                    fees_send: 0,
                    user_send: '',
                    state: '0',
                    user_receive: '',
                    user_create: '',
                    weight_real: '',
                    weight_convert: '',
                    phone_receive: '',
                    city_receive: '',
                    district_receive: '',
                    signature_receive: '',
                    signature_send: '',
                    address: 0
                },
                memberLoading: false,
                errors: []
            }
        },
        computed: {
            fees_total: function () {
                var total = this.form.fees + this.form.fees_special + this.form.fees_product
                if (this.form.status_cod) {
                    total += this.form.fees_cod
                }
                return total
            },
            fees_remain: function () {
                return this.fees_total - this.form.fees_send
            }
        },
        watch: {
            'form_address.province_send': function (val) {
                this.form_address.district_send = null
            },
          'form_address.province_receive': function (val) {
            if (!val) {
              this.form_address.district_receive = null
            }
          },
            'form.cod': function () {
                if (this.form.status_cod) {
                if (this.form.cod === 0) {
                    this.form.fees_cod = 0
                }
                if (this.form.cod > 0) {
                    var total = this.form.cod * 1.3 / 100
                    if (total <= 13000) {
                        this.form.fees_cod = 13000
                    } else {
                        this.form.fees_cod = total
                    }
                }
                } else {
                    this.form.fees_cod = 0
                }
            },
            'form.price_product': function () {
                if (this.form.price_product === 0) {
                    this.form.fees_product = 0
                }
                if (this.form.price_product > 0) {
                    var total = this.form.price_product * 1.3 / 100
                    if (total <= 13000) {
                        this.form.fees_product = 13000
                    } else {
                        this.form.fees_product = total
                    }
                }
            }
        },
        methods: {
          submit () {
            var that = this
            that.form.time_send = that.form.time_send.clone()
            if (that.form.time_receive) {
              that.form.time_receive = this.form.time_receive.clone().format('YYYY-MM-DD HH:mm:ss')
            }
            createBillNormal()
          },
          handleChange (e, type) {
            getWardAndDistrict({ province_id: e }).then(data => {
              if (type === 'send') {
                  this.form_address.list_district_send = data.data.district
              }
              if (type === 'receive') {
                this.form_address.list_district_receive = data.data.district
              }
            })
          },
          filterOption (input, option) {
            return (
                    option.componentOptions.children[0].text.toLowerCase().indexOf(input.toLowerCase()) >= 0
            )
          },
            handleSubmit (e) {
                e.preventDefault()
            },
            newMember () {
                const length = this.data.length
                this.data.push({
                    key: length === 0 ? '1' : (parseInt(this.data[length - 1].key) + 1).toString(),
                    name: '',
                    workId: '',
                    department: '',
                    editable: true,
                    isNew: true
                })
            }
        },
     async created () {
       await this.$store.dispatch('GetListProvince')
       this.form_address.list_province = this.$store.getters.listProvince
      }
    }
</script>

<style lang="less" scoped>
    .card{
        margin-bottom: 24px;
    }
    .popover-wrapper {
        /deep/ .antd-pro-pages-forms-style-errorPopover .ant-popover-inner-content {
            min-width: 256px;
            max-height: 290px;
            padding: 0;
            overflow: auto;
        }
    }
    .antd-pro-pages-forms-style-errorIcon {
        user-select: none;
        margin-right: 24px;
        color: #f5222d;
        cursor: pointer;
        i {
            margin-right: 4px;
        }
    }
    .antd-pro-pages-forms-style-errorListItem {
        padding: 8px 16px;
        list-style: none;
        border-bottom: 1px solid #e8e8e8;
        cursor: pointer;
        transition: all .3s;

        &:hover {
            background: #e6f7ff;
        }
        .antd-pro-pages-forms-style-errorIcon {
            float: left;
            margin-top: 4px;
            margin-right: 12px;
            padding-bottom: 22px;
            color: #f5222d;
        }
        .antd-pro-pages-forms-style-errorField {
            margin-top: 2px;
            color: rgba(0,0,0,.45);
            font-size: 12px;
        }
    }
</style>
