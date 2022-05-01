"use strict";(self.webpackChunkreact_edit_list=self.webpackChunkreact_edit_list||[]).push([[93],{838:(e,t,a)=>{a.d(t,{Z:()=>s});var n=a(645),l=a.n(n)()((function(e){return e[1]}));l.push([e.id,".table-fixed {\n    table-layout: fixed;\n}\n\n.left-menu {\n    width: 10rem;\n}\n\n.no-wrap div {\n    display: flex;\n    flex-direction: row;\n}\n",""]);const s=l},931:(e,t,a)=>{var n=a(379),l=a.n(n),s=a(838);l()(s.Z,{insert:"head",singleton:!1}),s.Z.locals},93:(e,t,a)=>{a.r(t),a.d(t,{default:()=>i});var n=a(294),l=a(958);a(39),a(931);const s=[{id:1,product:"Desk",type:"1",price:100,stock:20},{id:2,product:"Printer",type:"1",price:500,stock:10},{id:3,product:"Paper",type:"2",price:5,stock:2e3},{id:4,product:"Chair",type:"1",price:50,stock:50},{id:5,product:"Computer",type:"1",price:1e3,stock:20},{id:6,product:"Rent",type:null,price:2e3,stock:void 0}],o=[{name:"id",type:"id"},{name:"product",type:"string"},{name:"type",type:[{value:null,name:""},{value:"1",name:"capex"},{value:"2",name:"consumable"}]},{name:"price",type:"number"},{name:"stock",type:"number"}],r=()=>Promise.resolve(s);function i(){return n.createElement(l.ZP,{schema:o,onLoad:r,onUpdate:e=>{if(e.price>2e3)return alert("Price is limited to 2000€"),!1;console.log("UPDATE",e)},onDelete:e=>{if(!confirm("Are you sure you want to delete it?"))return!1;console.log("DELETE",e)},onInsert:e=>void 0===e.product||void 0===e.price?(alert("Product and price are mandatory"),!1):(console.log("INSERT",e),Promise.resolve({...e,id:Math.round(1e6*Math.random())})),format:{price:e=>n.createElement(n.Fragment,null,void 0!==e.value?`${e.value} €`:void 0)},onChange:e=>{console.log("DATA",e)},headers:{price:n.createElement("span",null,"price (€)")},editProps:{price:{min:0,max:2e3,step:5}},className:"table table-light table-fixed align-middle",headClassName:"table-dark",inputClassName:"w-100",thClassName:{product:"col-3",type:"col-2",price:"col-1",stock:"col-1",buttons:"col-3"},btnValidateElement:n.createElement("button",{className:"btn btn-primary"},"YES!"),btnCancelElement:n.createElement("button",{className:"ms-2 btn btn-secondary"},"NEVER"),btnDeleteElement:n.createElement("button",{className:"btn btn-danger"},"REMOVE"),tdClassName:{buttons:"no-wrap"}})}},958:(e,t,a)=>{a.d(t,{ZP:()=>u});var n=a(294);function l(e){return null!==e.value&&void 0!==e.value?n.createElement(n.Fragment,null,e.value.toString()):n.createElement(n.Fragment,null)}function s(e){return n.createElement(n.Fragment,null,e.value)}function o(e){const t=e.opts.find((t=>t.value==e.value));return n.createElement(n.Fragment,null,t?t.name:"")}function r(e){const t=n.useCallback((t=>e.onChange(""!=t.target.value?+t.target.value:void 0)),[e]);return n.createElement("input",{className:e.className,...e.editProps,value:e.value,type:"number",onChange:t})}function i(e){const t=n.useCallback((t=>e.onChange(""!=t.target.value?t.target.value:void 0)),[e]);return n.createElement("input",{className:e.className,...e.editProps,value:e.value,type:"text",onChange:t})}function m(e){var t;const a=n.useCallback((t=>e.onChange(""!=t.target.value?t.target.value:void 0)),[e]);return n.createElement("select",{...e.editProps,className:e.className,value:null!==(t=e.value)&&void 0!==t?t:"",onChange:a},e.opts.map(((e,t)=>n.createElement("option",{key:t,value:e.value},e.name))))}function c(e){const[t,a]=n.useState(null),c=n.useCallback((()=>e.onDelete&&e.onDelete()),[e]),u=e.disableDelete||void 0===e.onDelete||null!==t?null:e.btnDeleteElement?n.createElement("div",{onClick:c,className:e.btnDeleteClassName},e.btnDeleteElement):n.createElement("button",{className:e.btnDeleteClassName,onClick:c},"x"),d=n.useCallback((()=>{null!==t&&e.onChange(t).then((e=>{!1!==e&&a(null)}))}),[e,t,a]),p=null!==t?e.btnValidateElement?n.createElement("div",{onClick:d,className:e.btnValidateClassName},e.btnValidateElement):n.createElement("button",{className:e.btnValidateClassName,onClick:d},"✓"):null,v=n.useCallback((()=>a(null)),[a]),C=null!==t?e.btnCancelElement?n.createElement("div",{onClick:v,className:e.btnCancelClassName},e.btnCancelElement):n.createElement("button",{className:e.btnCancelClassName,onClick:v},"x"):null,b=n.useCallback((e=>{13==e.keyCode&&d(),27==e.keyCode&&v()}),[d,v]),N=void 0===e.item&&null===t?n.createElement(n.Fragment,null," "):void 0,E=t=>{var a,n;return null!==(n=null===(a=e.tdClassName)||void 0===a?void 0:a[t])&&void 0!==n?n:"string"==typeof e.tdClassName?e.tdClassName:void 0};return n.createElement("tr",{className:e.trClassName,onKeyDown:null!==t?b:void 0},e.schema.map(((c,u)=>{var d,p,v,C,b,N,f,h,y;let g,k;if("string"===c.type)g=(null===(d=e.format)||void 0===d?void 0:d[c.name])||s,k=(null===(p=e.edit)||void 0===p?void 0:p[c.name])||i;else if("number"===c.type)g=(null===(v=e.format)||void 0===v?void 0:v[c.name])||l,k=(null===(C=e.edit)||void 0===C?void 0:C[c.name])||r;else{if("object"!=typeof c.type)return null;g=(null===(b=e.format)||void 0===b?void 0:b[c.name])||o,k=(null===(N=e.edit)||void 0===N?void 0:N[c.name])||m}if(null!==t){const l=null===(f=e.editProps)||void 0===f?void 0:f[c.name],s=e=>{t[c.name]=e,a({...t})},o=n.createElement(k,{value:null!==(h=null==t?void 0:t[c.name])&&void 0!==h?h:"",opts:c.type,className:e.inputClassName,editProps:l,onChange:s});return n.createElement("td",{className:E(c.name),key:u},o)}return n.createElement("td",{className:E(c.name),onClick:e.disableUpdate?void 0:()=>a({...e.item}),key:u},g({value:null===(y=null==e?void 0:e.item)||void 0===y?void 0:y[c.name],opts:c.type}))})),n.createElement("td",{className:E("buttons")},p,C,u,N))}const u=function(e){var t;const[a,l]=n.useState([]);n.useEffect((()=>{const t=e.onLoad();t instanceof Promise?t.then((e=>l(e))):l(t)}),[e,l]);const s={schema:e.schema,format:e.format,btnValidateClassName:e.btnValidateClassName,btnDeleteClassName:e.btnDeleteClassName,btnValidateElement:e.btnValidateElement,btnDeleteElement:e.btnDeleteElement,btnCancelClassName:e.btnCancelClassName,btnCancelElement:e.btnCancelElement,inputClassName:e.inputClassName,trClassName:e.trClassName,tdClassName:e.tdClassName,edit:e.edit,editProps:e.editProps};return n.createElement("table",{className:e.className},null!==e.headers?n.createElement("thead",{className:e.headClassName},n.createElement("tr",{className:e.trClassName},e.schema.map(((t,a)=>{var l,s;if("id"===t.type)return null;const o=(null===(l=e.thClassName)||void 0===l?void 0:l[t.name])||e.thClassName;return(null===(s=e.headers)||void 0===s?void 0:s[t.name])?n.createElement("th",{className:o,key:a},e.headers[t.name]):n.createElement("th",{className:o,key:a},t.name)})),n.createElement("th",{className:(null===(t=e.thClassName)||void 0===t?void 0:t.buttons)||e.thClassName}))):null,n.createElement("tbody",{className:e.bodyClassName},a.map(((t,o)=>n.createElement(c,{key:o,item:t,...s,onChange:async n=>{if(e.onUpdate){const a=await e.onUpdate(n,t);if(!1===a)return!1;"object"==typeof a&&(n=a)}const s=[...a];if(s[s.findIndex((e=>e===t))]=n,e.onChange&&!1===await e.onChange(s))return!1;l([...s])},onDelete:async()=>{if(e.onDelete&&!1===await e.onDelete(t))return;const n=a.findIndex((e=>e===t)),s=[...a];if(s.splice(n,1),e.onChange&&!1===await e.onChange(s))return!1;l([...s])}}))),n.createElement(c,{item:e.defaultValues,...s,onChange:async t=>{if(e.onInsert){const a=await e.onInsert(t);if(!1===a)return!1;"object"==typeof a&&(t=a)}if(e.onChange){const n=[...a];if(n.push(t),!1===await e.onChange(n))return!1}a.push(t),l([...a])}})))}}}]);