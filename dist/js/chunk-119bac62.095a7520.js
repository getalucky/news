(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-119bac62"],{"0c03":function(t,n,e){"use strict";e.r(n);var a=function(){var t=this,n=t.$createElement,e=t._self._c||n;return e("div",{staticClass:"w"},[e("titleBar",{attrs:{titleName:"我的收藏"}}),e("ul",[e("li",[e("newslist",{attrs:{userCollect:t.userCollect}})],1)])],1)},s=[],o=e("43b3"),i=e("dc4d"),c={data:function(){return{userCollect:[]}},components:{titleBar:o["a"],newslist:i["a"]},mounted:function(){var t=this,n=JSON.parse(localStorage.getItem("userInfo"));this.$axios({url:"/user_star",headers:{Authorization:n.token}}).then((function(n){t.userCollect=n.data.data}))}},r=c,u=(e("169f"),e("2877")),l=Object(u["a"])(r,a,s,!1,null,"b3b89394",null);n["default"]=l.exports},"169f":function(t,n,e){"use strict";var a=e("ae1b"),s=e.n(a);s.a},2141:function(t,n,e){},"43b3":function(t,n,e){"use strict";var a=function(){var t=this,n=t.$createElement,e=t._self._c||n;return e("div",{staticClass:"personal"},[e("i",{staticClass:"iconfont iconjiantou2",on:{click:function(n){return t.$router.back()}}}),e("h1",[t._v(t._s(t.titleName))]),t.show?e("i",{staticClass:"iconfont iconshouye",on:{click:function(n){return t.$router.replace("/")}}}):e("i",{staticClass:"iconfont iconshouye notShow"})])},s=[],o={props:["titleName","show"]},i=o,c=(e("766a"),e("2877")),r=Object(c["a"])(i,a,s,!1,null,"5e805094",null);n["a"]=r.exports},"766a":function(t,n,e){"use strict";var a=e("2141"),s=e.n(a);s.a},ae1b:function(t,n,e){}}]);