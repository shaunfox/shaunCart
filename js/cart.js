/**
 * Created by jacksoft on 16/10/22.
 */
window.vm = new Vue({
    el: "#app",
    data: {
        productList: [],
        totalMoney: 0, 
        totalWeight: 0,
        checkAllFlag: false,
        delFlag: false,
        curProduct:"",
    },
    mounted: function() {
        this.$nextTick(function() {
            vm.cartView();
        });
    },
    filters: {
        formatMoney: function(value, quentity) {
            if (!quentity) quentity = 1;
            return "¥ " + (value * quentity).toFixed(2);
        },

        formatWeight: function(value, quentity) {
            if (!quentity) quentity = 1;
            return ((value * quentity)/1000).toFixed(2) + "kg";
        },
    },
    methods: {
        cartView: function() {
            var _this = this;
            this.$http.get("data/cart.json").then(function(res) {

                _this.productList = res.body.result.productList;
            })
        },

        changeMoney: function(item, val) {
            if (val > 0) {
                item.productQuentity++;
            } else {
                item.productQuentity--;
                if (item.productQuentity < 0) {
                    item.productQuentity = 0;
                }
            }
            this.calcTotalPrice();
            this.calcTotalWeight();
        },

        selectProduct: function(item) {
            if (typeof item.checked == 'undefined') {
                Vue.set(item, "checked", true);
            } else {
                item.checked = !item.checked;
            }
            this.calcTotalPrice();
            this.calcTotalWeight();
        },

        checkAll: function(flag) {
            this.checkAllFlag = flag;
            var _this = this;
            this.productList.forEach(function(item, index) {
                if (typeof item.checked == 'undefined') {
                    _this.$set(item, "checked", _this.checkAllFlag);
                } else {
                    item.checked = _this.checkAllFlag;
                }
            });
            this.calcTotalPrice();
            this.calcTotalWeight();
        },

        calcTotalPrice: function() {
            var _this = this;
            this.totalMoney = 0;
            this.productList.forEach(function(item, index) {
                if (item.checked) {
                    _this.totalMoney += item.productPrice * item.productQuentity;
                }
            });
        },

        calcTotalWeight: function() {
            var _this = this;
            this.totalWeight = 0;
            this.productList.forEach(function(item, index) {
                if (item.checked) {
                    _this.totalWeight += item.productWeight * item.productQuentity;
                }
            });
        },

        delConfirm:function(item){
            this.delFlag=true;
            this.curProduct=item; 
        },

        delProduct:function(){
            var index= this.productList.indexOf(this.curProduct);
            this.productList.splice(index,1);
            this.delFlag=false;
            this.calcTotalPrice();
            this.calcTotalWeight();

        }
    },
});

Vue.filter("moneyChange", function(value) {
    return "$ " + value.toFixed(2);
})
