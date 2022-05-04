"use strict";(self.webpackChunkreact_edit_list=self.webpackChunkreact_edit_list||[]).push([[619],{4838:(e,t,l)=>{l.d(t,{Z:()=>o});var n=l(3645),a=l.n(n)()((function(e){return e[1]}));a.push([e.id,".table-fixed {\n    table-layout: fixed;\n}\n\n.btn-width {\n    width: 3rem;\n    text-align: end;\n}\n\n.table-rounded td {\n    border-bottom-width: 0;\n}\n\n.table-rounded td:first-child {\n    border-radius: 10px 0 0 10px;\n}\n\n.table-rounded td:last-child {\n    border-radius: 0 10px 10px 0;\n}\n",""]);const o=a},1931:(e,t,l)=>{var n=l(3379),a=l.n(n),o=l(4838);a()(o.Z,{insert:"head",singleton:!1}),o.Z.locals},6619:(e,t,l)=>{l.r(t),l.d(t,{default:()=>i});var n=l(7294),a=l(9958);l(4039),l(1931);const o=[{id:1,product:"Desk",type:"1",price:100,stock:20},{id:2,product:"Printer",type:"1",price:500,stock:10},{id:3,product:"Paper",type:"2",price:5,stock:2e3},{id:4,product:"Chair",type:"1",price:50,stock:50},{id:5,product:"Computer",type:"1",price:1e3,stock:20},{id:6,product:"Rent",type:void 0,price:2e3,stock:void 0}],s=[{name:"id",type:"id"},{name:"product",type:"string"},{name:"type",type:[{value:void 0,name:""},{value:"1",name:"capex"},{value:"2",name:"consumable"}]},{name:"price",type:"number"},{name:"stock",type:"number"}];function i(){return n.createElement("div",null,n.createElement("p",null,"This grid uses custom elements. It replaces the table elements with divs placed on Bootstrap's grid. It is a ",n.createElement("strong",null,"responsive")," design that will automatically switch to two lines per row when you reduce the width of your screen below 992px."),n.createElement(a.ZP,{schema:s,onLoad:()=>o,onUpdate:e=>{console.log("UPDATE",e)},onDelete:e=>{if(!confirm("Are you sure you want to delete it?"))return!1;console.log("DELETE",e)},onInsert:e=>{console.log("INSERT",e)},onChange:e=>{console.log("DATA",e)},className:"container-fluid gx-0",headClassName:"bg-dark text-light",bodyClassName:"bg-light",inputClassName:"w-100",thClassName:{product:"col-lg-4 col-8 p-1",type:"col-lg-3 col-4 p-1",price:"col-lg-2 col-5 p-1",stock:"col-lg-2 col-5 p-1",buttons:"col-lg-1 col-2 p-1"},tdClassName:{product:"col-lg-4 col-8 p-1",type:"col-lg-3 col-4 p-1",price:"col-lg-2 col-5 p-1",stock:"col-lg-2 col-5 p-1",buttons:"col-lg-1 col-2 p-1"},trClassName:"gx-0 row border",tableElement:"div",tbodyElement:"div",theadElement:"div",trElement:"div",tdElement:"div",thElement:"div",btnValidateClassName:"btn border p-0 m-0",btnDeleteClassName:"btn border px-1 m-0 mx-1",btnCancelClassName:"btn border px-1 m-0 mx-1"}))}},9958:(e,t,l)=>{l.d(t,{ZP:()=>c});var n=l(7294);function a(e){return null!==e.value&&void 0!==e.value?n.createElement(n.Fragment,null,e.value.toString()):n.createElement(n.Fragment,null)}function o(e){return n.createElement(n.Fragment,null,e.value)}function s(e){const t=e.opts.find((t=>t.value==e.value));return n.createElement(n.Fragment,null,t?t.name:"")}function i(e){var t;const l=n.useCallback((t=>e.onChange(""!=t.target.value?+t.target.value:void 0)),[e]);return n.createElement("input",{className:e.className,...e.editProps,value:null!==(t=e.value)&&void 0!==t?t:"",type:"number",onChange:l})}function r(e){var t;const l=n.useCallback((t=>e.onChange(""!=t.target.value?t.target.value:void 0)),[e]);return n.createElement("input",{className:e.className,...e.editProps,value:null!==(t=e.value)&&void 0!==t?t:"",type:"text",onChange:l})}function d(e){var t;const l=n.useCallback((t=>e.onChange(""!=t.target.value?t.target.value:void 0)),[e]);return n.createElement("select",{...e.editProps,className:e.className,value:null!==(t=e.value)&&void 0!==t?t:"",onChange:l},e.opts.map(((e,t)=>n.createElement("option",{key:t,value:e.value},e.name))))}function m(e){var t,l,m;const[c,u]=n.useState(null),p=n.useCallback((()=>e.onDelete&&e.onDelete()),[e]),v=e.disableDelete||void 0===e.onDelete||null!==c?null:e.btnDeleteElement?n.createElement("div",{onClick:p,className:e.btnDeleteClassName},e.btnDeleteElement):n.createElement("button",{className:e.btnDeleteClassName,onClick:p},"x"),b=n.useCallback((()=>{null!==c&&e.onChange(c).then((e=>{!1!==e&&u(null)}))}),[e,c,u]),C=null!==c?e.btnValidateElement?n.createElement("div",{onClick:b,className:e.btnValidateClassName},e.btnValidateElement):n.createElement("button",{className:e.btnValidateClassName,onClick:b},"✓"):null,E=n.useCallback((()=>u(null)),[u]),h=null!==c?e.btnCancelElement?n.createElement("div",{onClick:E,className:e.btnCancelClassName},e.btnCancelElement):n.createElement("button",{className:e.btnCancelClassName,onClick:E},"x"):null,f=n.useCallback((e=>{"Enter"==e.key&&(b(),e.stopPropagation()),"Escape"==e.key&&(E(),e.stopPropagation())}),[b,E]),N=void 0===e.item&&null===c?null!==(t=e.filler)&&void 0!==t?t:n.createElement(n.Fragment,null," "):void 0,g=t=>{var l,n;return null!==(n=null===(l=e.tdClassName)||void 0===l?void 0:l[t])&&void 0!==n?n:"string"==typeof e.tdClassName?e.tdClassName:void 0};return n.createElement(null!==(l=e.trElement)&&void 0!==l?l:"tr",{className:e.trClassName,dataid:e.dataid},...e.schema.map(((t,l)=>{var m,p,v,b,C,E,h,y,k,w,D,x,P,V;let I,F;if("custom"===t.type)I=null===(m=e.format)||void 0===m?void 0:m[t.name],F=null===(p=e.edit)||void 0===p?void 0:p[t.name];else if("string"===t.type)I=(null===(v=e.format)||void 0===v?void 0:v[t.name])||o,F=(null===(b=e.edit)||void 0===b?void 0:b[t.name])||r;else if("number"===t.type)I=(null===(C=e.format)||void 0===C?void 0:C[t.name])||a,F=(null===(E=e.edit)||void 0===E?void 0:E[t.name])||i;else{if("object"!=typeof t.type)return null;I=(null===(h=e.format)||void 0===h?void 0:h[t.name])||s,F=(null===(y=e.edit)||void 0===y?void 0:y[t.name])||d}if(null!==c){const a=null===(k=e.editProps)||void 0===k?void 0:k[t.name],o=e=>{c[t.name]=e,u({...c})};if(!F)throw new Error(`Field ${t.name}:${t.type} has no editor defined`);void 0===(null==c?void 0:c[t.name])&&(c[t.name]=null===(w=e.defaultValues)||void 0===w?void 0:w[t.name]);const s=n.createElement(F,{value:null!==(D=c[t.name])&&void 0!==D?D:"",opts:t.type,className:e.inputClassName,editProps:a,onChange:o});return n.createElement(null!==(x=e.tdElement)&&void 0!==x?x:"td",{className:g(t.name),key:l,onKeyDown:null!==c?f:void 0},s)}if(!I)throw new Error(`Field ${t.name}:${t.type} has no formatter defined`);return n.createElement(null!==(P=e.tdElement)&&void 0!==P?P:"td",{className:g(t.name),onClick:e.disableUpdate?void 0:()=>u({...e.item}),key:l},void 0!==e.item?I({value:null===(V=null==e?void 0:e.item)||void 0===V?void 0:V[t.name],opts:t.type}):N)})),n.createElement(null!==(m=e.tdElement)&&void 0!==m?m:"td",{className:g("buttons")},n.createElement("div",{style:{display:"flex",flexDirection:"row"}},C,h,v)))}const c=n.forwardRef((function(e,t){var l,a,o,s,i,r;if(!e.schema)throw new Error("schema prop is missing");if(!e.onLoad)throw new Error("onLoad callback is missing");const[d,c]=n.useState([]),u=n.useCallback((()=>{const t=e.onLoad();t instanceof Promise?t.then((e=>c(e))):c(t)}),[e,c]);n.useEffect(u,[u]);const p=n.useCallback((e=>{e.altKey&&"R"==e.key&&(u(),e.stopPropagation())}),[u]);let v=e.trClassName;e.rowClassName&&(v=(v?v+" ":"")+e.rowClassName);let b=e.trClassName;e.insertClassName&&(b=(b?b+" ":"")+e.insertClassName);const C={schema:e.schema,format:e.format,btnValidateClassName:e.btnValidateClassName,btnDeleteClassName:e.btnDeleteClassName,btnValidateElement:e.btnValidateElement,btnDeleteElement:e.btnDeleteElement,btnCancelClassName:e.btnCancelClassName,btnCancelElement:e.btnCancelElement,inputClassName:e.inputClassName,tdClassName:e.tdClassName,trElement:e.trElement,tdElement:e.tdElement,edit:e.edit,editProps:e.editProps,disableDelete:e.disableDelete,disableUpdate:e.disableUpdate};return n.createElement(null!==(l=e.tableElement)&&void 0!==l?l:"table",{className:e.className,ref:t,onKeyDown:p},[null!==e.headers?n.createElement(null!==(a=e.theadElement)&&void 0!==a?a:"thead",{key:"thead",className:e.headClassName},n.createElement(null!==(o=e.trElement)&&void 0!==o?o:"tr",{className:e.trClassName},...e.schema.map(((t,l)=>{var a,o,s,i;if("id"===t.type)return null;const r=(null===(a=e.thClassName)||void 0===a?void 0:a[t.name])||e.thClassName;return(null===(o=e.headers)||void 0===o?void 0:o[t.name])?n.createElement(null!==(s=e.thElement)&&void 0!==s?s:"th",{key:l,className:r},e.headers[t.name]):n.createElement(null!==(i=e.thElement)&&void 0!==i?i:"th",{key:l,className:r},t.name)})),n.createElement(null!==(s=e.thElement)&&void 0!==s?s:"th",{key:"buttons",className:(null===(i=e.thClassName)||void 0===i?void 0:i.buttons)||e.thClassName}))):null,n.createElement(null!==(r=e.tbodyElement)&&void 0!==r?r:"tbody",{key:"tbody",className:e.bodyClassName},...d.map(((t,l)=>n.createElement(m,{key:l,item:t,dataid:l,...C,trClassName:v,onChange:async l=>{if(e.onUpdate){const n=await e.onUpdate(l,t);if(!1===n)return!1;"object"==typeof n&&(l=n)}const n=[...d];if(n[n.findIndex((e=>e===t))]=l,e.onChange){const t=await e.onChange(n);if(!1===t)return!1;if(!0===t)return u()}c([...n])},onDelete:async()=>{if(e.onDelete&&!1===await e.onDelete(t))return;const l=d.findIndex((e=>e===t)),n=[...d];if(n.splice(l,1),e.onChange){const t=await e.onChange(n);if(!1===t)return!1;if(!0===t)return u()}c([...n])}}))),e.disableInsert?null:n.createElement(m,{dataid:d.length,...C,defaultValues:e.defaultValues,filler:e.filler,trClassName:b,onChange:async t=>{if(e.onInsert){const l=await e.onInsert(t);if(!1===l)return!1;"object"==typeof l&&(t=l)}if(e.onChange){const l=[...d];l.push(t);const n=await e.onChange(l);if(!1===n)return!1;if(!0===n)return u()}d.push(t),c([...d])}}))])}))}}]);