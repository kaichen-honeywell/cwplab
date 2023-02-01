"use strict";(self.webpackChunk_hce_siteoperation=self.webpackChunk_hce_siteoperation||[]).push([[192],{192:function(e,n,t){t.r(n),t.d(n,{default:function(){return w}});var r=t(473),a=t.n(r);let o;!function(e){e[e.TEXT_CHANGE=0]="TEXT_CHANGE",e[e.VALUE_CHANGE=1]="VALUE_CHANGE",e[e.SELECT_CHANGE=2]="SELECT_CHANGE"}(o||(o={}));const i=()=>{if(window.CWP)return window.CWP;throw new Error("CWP context is not initiliazed!")};let c,s;!function(e){e[e.small=0]="small",e[e.medium=1]="medium",e[e.large=2]="large",e[e.xlarge=3]="xlarge"}(c||(c={})),function(e){e[e.info=0]="info",e[e.warning=1]="warning",e[e.error=2]="error"}(s||(s={}));const u="CWP_NAV_BUTTON_SUBJECT";var l=t(62),d=t.n(l),f=t(36),p=t.n(f),v=t(793),m=t.n(v),h=t(892),b=t.n(h),g=t(173),E=t.n(g),y=t(464),C=t.n(y),T=t(540),_={};_.styleTagTransform=C(),_.setAttributes=b(),_.insert=m().bind(null,"head"),_.domAPI=p(),_.insertStyleElement=E(),d()(T.Z,_),T.Z&&T.Z.locals&&T.Z.locals;var w=e=>{const[n,t]=(0,r.useState)("green"),o={observerName:"Panda_NAV_Button_Observer",updateObserver:(e,n)=>{t("black")}};return(0,r.useEffect)((()=>(i().events.subscribe(u,o,!0),()=>{i().events.unsubscribe(u,o,!0)}))),a().createElement("div",{className:"panda-container"},a().createElement("button",{key:"panda_btn",className:"panda-button",onClick:()=>{const e=i();e.ui.renderToastMessage("click a panda button",{triggerId:"panda_btn",source:"Panda",open:!0}),e.ui.renderLoader({size:c.medium,customText:"Panda Eating",showPercentage:!0,percentageValue:"66%",source:"Panda",triggerId:"panda_btn",open:!0}),setTimeout((()=>{e.ui.closeLoader("panda_btn")}),3e3)}},"Panda Button"))}},540:function(e,n,t){var r=t(601),a=t.n(r),o=t(609),i=t.n(o)()(a());i.push([e.id,".panda-container{width:50%;margin:auto}.panda-button.green{background:green;color:#ff0}.panda-button.black{background:#000;color:#fff}",""]),n.Z=i},609:function(e){e.exports=function(e){var n=[];return n.toString=function(){return this.map((function(n){var t="",r=void 0!==n[5];return n[4]&&(t+="@supports (".concat(n[4],") {")),n[2]&&(t+="@media ".concat(n[2]," {")),r&&(t+="@layer".concat(n[5].length>0?" ".concat(n[5]):""," {")),t+=e(n),r&&(t+="}"),n[2]&&(t+="}"),n[4]&&(t+="}"),t})).join("")},n.i=function(e,t,r,a,o){"string"==typeof e&&(e=[[null,e,void 0]]);var i={};if(r)for(var c=0;c<this.length;c++){var s=this[c][0];null!=s&&(i[s]=!0)}for(var u=0;u<e.length;u++){var l=[].concat(e[u]);r&&i[l[0]]||(void 0!==o&&(void 0===l[5]||(l[1]="@layer".concat(l[5].length>0?" ".concat(l[5]):""," {").concat(l[1],"}")),l[5]=o),t&&(l[2]?(l[1]="@media ".concat(l[2]," {").concat(l[1],"}"),l[2]=t):l[2]=t),a&&(l[4]?(l[1]="@supports (".concat(l[4],") {").concat(l[1],"}"),l[4]=a):l[4]="".concat(a)),n.push(l))}},n}},601:function(e){e.exports=function(e){return e[1]}},62:function(e){var n=[];function t(e){for(var t=-1,r=0;r<n.length;r++)if(n[r].identifier===e){t=r;break}return t}function r(e,r){for(var o={},i=[],c=0;c<e.length;c++){var s=e[c],u=r.base?s[0]+r.base:s[0],l=o[u]||0,d="".concat(u," ").concat(l);o[u]=l+1;var f=t(d),p={css:s[1],media:s[2],sourceMap:s[3],supports:s[4],layer:s[5]};if(-1!==f)n[f].references++,n[f].updater(p);else{var v=a(p,r);r.byIndex=c,n.splice(c,0,{identifier:d,updater:v,references:1})}i.push(d)}return i}function a(e,n){var t=n.domAPI(n);return t.update(e),function(n){if(n){if(n.css===e.css&&n.media===e.media&&n.sourceMap===e.sourceMap&&n.supports===e.supports&&n.layer===e.layer)return;t.update(e=n)}else t.remove()}}e.exports=function(e,a){var o=r(e=e||[],a=a||{});return function(e){e=e||[];for(var i=0;i<o.length;i++){var c=t(o[i]);n[c].references--}for(var s=r(e,a),u=0;u<o.length;u++){var l=t(o[u]);0===n[l].references&&(n[l].updater(),n.splice(l,1))}o=s}}},793:function(e){var n={};e.exports=function(e,t){var r=function(e){if(void 0===n[e]){var t=document.querySelector(e);if(window.HTMLIFrameElement&&t instanceof window.HTMLIFrameElement)try{t=t.contentDocument.head}catch(e){t=null}n[e]=t}return n[e]}(e);if(!r)throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");r.appendChild(t)}},173:function(e){e.exports=function(e){var n=document.createElement("style");return e.setAttributes(n,e.attributes),e.insert(n,e.options),n}},892:function(e,n,t){e.exports=function(e){var n=t.nc;n&&e.setAttribute("nonce",n)}},36:function(e){e.exports=function(e){var n=e.insertStyleElement(e);return{update:function(t){!function(e,n,t){var r="";t.supports&&(r+="@supports (".concat(t.supports,") {")),t.media&&(r+="@media ".concat(t.media," {"));var a=void 0!==t.layer;a&&(r+="@layer".concat(t.layer.length>0?" ".concat(t.layer):""," {")),r+=t.css,a&&(r+="}"),t.media&&(r+="}"),t.supports&&(r+="}");var o=t.sourceMap;o&&"undefined"!=typeof btoa&&(r+="\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(o))))," */")),n.styleTagTransform(r,e,n.options)}(n,e,t)},remove:function(){!function(e){if(null===e.parentNode)return!1;e.parentNode.removeChild(e)}(n)}}}},464:function(e){e.exports=function(e,n){if(n.styleSheet)n.styleSheet.cssText=e;else{for(;n.firstChild;)n.removeChild(n.firstChild);n.appendChild(document.createTextNode(e))}}}}]);