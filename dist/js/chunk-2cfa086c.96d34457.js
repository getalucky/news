(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2cfa086c"],{1201:function(t,e,n){"use strict";var o=n("352b"),a=n.n(o);a.a},2141:function(t,e,n){},"352b":function(t,e,n){},"43b3":function(t,e,n){"use strict";var o=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"personal"},[n("i",{staticClass:"iconfont iconjiantou2",on:{click:function(e){return t.$router.back()}}}),n("h1",[t._v(t._s(t.titleName))]),t.show?n("i",{staticClass:"iconfont iconshouye",on:{click:function(e){return t.$router.replace("/")}}}):n("i",{staticClass:"iconfont iconshouye notShow"})])},a=[],i={props:["titleName","show"]},r=i,s=(n("766a"),n("2877")),l=Object(s["a"])(r,o,a,!1,null,"5e805094",null);e["a"]=l.exports},"766a":function(t,e,n){"use strict";var o=n("2141"),a=n.n(o);a.a},"99b5":function(t,e,n){"use strict";n.r(e);var o=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"w"},[n("titleBar",{attrs:{titleName:"我的关注"}}),n("ul",t._l(t.followUser,(function(e,o){return n("li",{key:o,staticClass:"myfollow"},[n("div",[n("span",[n("img",{attrs:{src:t.$axios.defaults.baseURL+e.head_img,alt:""}})]),n("div",[n("p",[t._v(t._s(e.nickname))]),n("p",[t._v(t._s(t.moment(e.create_date).format("YYYY-MM-DD")))])])]),n("span",{on:{click:function(n){return t.unfollow(e.id,o)}}},[t._v("取消关注")])])})),0)],1)},a=[],i=(n("a434"),n("43b3")),r=n("c1df"),s=n.n(r),l={data:function(){return{followUser:[],moment:s.a}},mounted:function(){var t=this,e=JSON.parse(localStorage.getItem("userInfo"));this.$axios({url:"/user_follows",headers:{Authorization:e.token}}).then((function(e){t.followUser=e.data.data}))},components:{titleBar:i["a"]},methods:{unfollow:function(t,e){var n=this,o=JSON.parse(localStorage.getItem("userInfo"));this.$axios({url:"/user_unfollow/"+t,headers:{Authorization:o.token}}).then((function(t){n.followUser.splice(e,1)}))}}},c=l,u=(n("1201"),n("2877")),f=Object(u["a"])(c,o,a,!1,null,"22079e16",null);e["default"]=f.exports},a434:function(t,e,n){"use strict";var o=n("23e7"),a=n("23cb"),i=n("a691"),r=n("50c4"),s=n("7b0b"),l=n("65f0"),c=n("8418"),u=n("1dde"),f=n("ae40"),h=u("splice"),d=f("splice",{ACCESSORS:!0,0:0,1:2}),p=Math.max,m=Math.min,w=9007199254740991,v="Maximum allowed length exceeded";o({target:"Array",proto:!0,forced:!h||!d},{splice:function(t,e){var n,o,u,f,h,d,_=s(this),b=r(_.length),g=a(t,b),k=arguments.length;if(0===k?n=o=0:1===k?(n=0,o=b-g):(n=k-2,o=m(p(i(e),0),b-g)),b+n-o>w)throw TypeError(v);for(u=l(_,o),f=0;f<o;f++)h=g+f,h in _&&c(u,f,_[h]);if(u.length=o,n<o){for(f=g;f<b-o;f++)h=f+o,d=f+n,h in _?_[d]=_[h]:delete _[d];for(f=b;f>b-o+n;f--)delete _[f-1]}else if(n>o)for(f=b-o;f>g;f--)h=f+o-1,d=f+n-1,h in _?_[d]=_[h]:delete _[d];for(f=0;f<n;f++)_[f+g]=arguments[f+2];return _.length=b-o+n,u}})}}]);