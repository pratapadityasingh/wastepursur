(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[565],{8937:function(e,t,r){Promise.resolve().then(r.bind(r,8606))},6463:function(e,t,r){"use strict";var o=r(1169);r.o(o,"useParams")&&r.d(t,{useParams:function(){return o.useParams}}),r.o(o,"usePathname")&&r.d(t,{usePathname:function(){return o.usePathname}}),r.o(o,"useRouter")&&r.d(t,{useRouter:function(){return o.useRouter}})},8606:function(e,t,r){"use strict";r.r(t);var o=r(7437);r(2265);var n=r(7713),s=r(6463);t.default=()=>(console.log((0,s.useRouter)(),"<<<<<<<<<<<<<<<<slug"),(0,o.jsx)("div",{children:(0,o.jsx)(n.Z,{productId:""})}))},7713:function(e,t,r){"use strict";var o=r(7437),n=r(8472),s=r(6463),a=r(2265);t.Z=e=>{let[t,r]=(0,a.useState)([]),[u,c]=(0,a.useState)([]),[l,i]=(0,a.useState)(!1),{pId:d}=(0,s.useParams)();console.log(d,"dfjddknvkfv");let f=e=>{try{let[t,r]=e.split(".");if(!t||!r)throw Error("Invalid JWT token format: missing header or payload");let o=atob(r);return JSON.parse(o)}catch(e){return console.error("Error decoding JWT token:",e.message),null}},m=async e=>{let t=f(localStorage.getItem("jwt")||"");try{var r;let e=await n.Z.get("".concat("https://wastepursur.onrender.com","/api/cart/getcart/").concat(t.userId));c(null===(r=e.data)||void 0===r?void 0:r.items)}catch(e){return console.error("Error fetching product by ID:",e),null}};return(0,a.useEffect)(()=>{(async()=>{d&&d.length>0?r((await Promise.all(d.map(e=>m(e)))).filter(e=>null!==e)):r([])})()},[d]),(0,a.useEffect)(()=>{var e;(null===(e=window)||void 0===e?void 0:e.location.href.includes("success"))&&i(!0)},[]),(0,a.useEffect)(()=>{let e=f(localStorage.getItem("jwt")||"");d&&(null==e?void 0:e.userId)&&console.log("jgyftdrsreaeawe")},[d]),(0,o.jsx)("div",{className:"container mx-auto py-8 pt-[100px]"})}}},function(e){e.O(0,[472,971,23,744],function(){return e(e.s=8937)}),_N_E=e.O()}]);