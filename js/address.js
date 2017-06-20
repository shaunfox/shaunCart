new Vue({
    el: '.container',
    data: {
        addressList: [],
        limitNum: 3,
        curIndex: 0,
        shippingMethod:1,
        delFlag: false,
        curAddress:"",

    },

    mounted: function() {
        this.$nextTick(function() {
            this.getAddressList();
        })
    },
    computed: {
        filterAddressList: function() {
            return this.addressList.slice(0, this.limitNum);
        }
    },

    methods: {
        getAddressList: function() {
            var _this = this;
            axios.get("data/address.json").then(function(response) {
                var res = response.data;
                if (res.status === '1') {
                    _this.addressList = res.result;
                }
            })
        },

        loadMore: function() {
            if(this.limitNum===3){
            this.limitNum = this.addressList.length;
            }else{
                this.limitNum=3;
            }

            // this.limitNum = this.addressList.length;
        },

        setDefault: function(addressId) {
            this.addressList.forEach(function(address, index) {
                if (address.addressId === addressId) {
                    address.isDefault = true;
                } else {
                    address.isDefault = false;
                }
            });
        },


        delConfirm:function(item){
            this.delFlag=true;
            this.curAddress=item;
        },

        delProduct:function(){
            var index= this.addressList.indexOf(this.curAddress);
            this.addressList.splice(index,1);
            this.delFlag=false;
        }

    },
})
