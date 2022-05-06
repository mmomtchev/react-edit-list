"use strict";(self.webpackChunkreact_edit_list=self.webpackChunkreact_edit_list||[]).push([[999],{4838:(e,t,a)=>{a.d(t,{Z:()=>s});var n=a(3645),l=a.n(n)()((function(e){return e[1]}));l.push([e.id,".table-fixed {\n    table-layout: fixed;\n}\n\n.btn-width {\n    width: 3rem;\n    text-align: end;\n}\n\n.table-rounded td {\n    border-bottom-width: 0;\n}\n\n.table-rounded td:first-child {\n    border-radius: 10px 0 0 10px;\n}\n\n.table-rounded td:last-child {\n    border-radius: 0 10px 10px 0;\n}\n",""]);const s=l},1931:(e,t,a)=>{var n=a(3379),l=a.n(n),s=a(4838);l()(s.Z,{insert:"head",singleton:!1}),s.Z.locals},9999:(e,t,a)=>{a.r(t),a.d(t,{default:()=>i});var n=a(7294),l=a(9958);a(4039),a(1931);const s=[{id:1,product:"Desk",type:"1",price:100,stock:20},{id:2,product:"Printer",type:"1",price:500,stock:10},{id:3,product:"Paper",type:"2",price:5,stock:2e3},{id:4,product:"Chair",type:"1",price:50,stock:50},{id:5,product:"Computer",type:"1",price:1e3,stock:20}],o=[{name:"id",type:"id"},{name:"product",type:"string"},{name:"type",type:[{value:"1",name:"capex"},{value:"2",name:"consumable"}]},{name:"price",type:"number"},{name:"stock",type:"number"}];function i(){return n.createElement(l.ZP,{schema:o,onLoad:()=>s,onUpdate:e=>{console.log("UPDATE",e)},onDelete:e=>{if(!confirm("Are you sure you want to delete it?"))return!1;console.log("DELETE",e)},onInsert:e=>{console.log("INSERT",e)},className:"table table-light table-fixed align-middle",headClassName:"table-dark",inputClassName:"w-100",thClassName:{product:"col-4",type:"col-3",price:"col-2",stock:"col-2",buttons:"col-1"},btnValidateClassName:"btn btn-success p-0 m-0",btnDeleteClassName:"btn btn-danger py-0 px-1 m-0 mx-1",btnCancelClassName:"btn btn-secondary py-0 px-1 m-0 mx-1"})}},9958:(e,t,a)=>{a.d(t,{ZP:()=>u});var n=a(7294);function l(e){return null!==e.value&&void 0!==e.value?n.createElement(n.Fragment,null,e.value.toString()):n.createElement(n.Fragment,null)}function s(e){return n.createElement(n.Fragment,null,e.value)}function o(e){const t=e.opts.find((t=>t.value==e.value));return n.createElement(n.Fragment,null,t?t.name:"")}function i(e){var t;const a=n.useCallback((t=>e.onChange(""!=t.target.value?+t.target.value:void 0)),[e]);return n.createElement("input",{className:e.className,...e.editProps,value:null!==(t=e.value)&&void 0!==t?t:"",type:"number",onChange:a})}function r(e){var t;const a=n.useCallback((t=>e.onChange(""!=t.target.value?t.target.value:void 0)),[e]);return n.createElement("input",{className:e.className,...e.editProps,value:null!==(t=e.value)&&void 0!==t?t:"",type:"text",onChange:a})}function d(e){var t;const a=n.useCallback((t=>e.onChange(""!=t.target.value?t.target.value:void 0)),[e]);return n.createElement("select",{...e.editProps,className:e.className,value:null!==(t=e.value)&&void 0!==t?t:"",onChange:a},e.opts.map(((e,t)=>n.createElement("option",{key:t,value:e.value},e.name))))}function m(e){var t,a,m;const[u,c]=n.useState(null),v=n.useCallback((()=>e.onDelete&&e.onDelete()),[e]),p=e.disableDelete||void 0===e.onDelete||null!==u?null:e.btnDeleteElement?n.createElement("div",{onClick:v,className:e.btnDeleteClassName},e.btnDeleteElement):n.createElement("button",{className:e.btnDeleteClassName,onClick:v},"x"),b=n.useCallback((()=>{null!==u&&e.onChange(u).then((e=>{!1!==e&&c(null)}))}),[e,u,c]),C=null!==u?e.btnValidateElement?n.createElement("div",{onClick:b,className:e.btnValidateClassName},e.btnValidateElement):n.createElement("button",{className:e.btnValidateClassName,onClick:b},"✓"):null,f=n.useCallback((()=>c(null)),[c]),E=null!==u?e.btnCancelElement?n.createElement("div",{onClick:f,className:e.btnCancelClassName},e.btnCancelElement):n.createElement("button",{className:e.btnCancelClassName,onClick:f},"x"):null,N=n.useCallback((e=>{"Enter"==e.key&&(b(),e.stopPropagation()),"Escape"==e.key&&(f(),e.stopPropagation())}),[b,f]),h=void 0===e.item&&null===u?null!==(t=e.filler)&&void 0!==t?t:n.createElement(n.Fragment,null," "):void 0,y=t=>{var a,n;return null!==(n=null===(a=e.tdClassName)||void 0===a?void 0:a[t])&&void 0!==n?n:"string"==typeof e.tdClassName?e.tdClassName:void 0};return n.createElement(null!==(a=e.trElement)&&void 0!==a?a:"tr",{className:e.trClassName,dataid:e.dataid},...e.schema.map(((t,a)=>{var m,v,p,b,C,f,E,g,k,w,D,x,P,V;let F,I;if("custom"===t.type)F=null===(m=e.format)||void 0===m?void 0:m[t.name],I=null===(v=e.edit)||void 0===v?void 0:v[t.name];else if("string"===t.type)F=(null===(p=e.format)||void 0===p?void 0:p[t.name])||s,I=(null===(b=e.edit)||void 0===b?void 0:b[t.name])||r;else if("number"===t.type)F=(null===(C=e.format)||void 0===C?void 0:C[t.name])||l,I=(null===(f=e.edit)||void 0===f?void 0:f[t.name])||i;else{if("object"!=typeof t.type)return null;F=(null===(E=e.format)||void 0===E?void 0:E[t.name])||o,I=(null===(g=e.edit)||void 0===g?void 0:g[t.name])||d}if(null!==u){const l=null===(k=e.editProps)||void 0===k?void 0:k[t.name],s=e=>{u[t.name]=e,c({...u})};if(!I)throw new Error(`Field ${t.name}:${t.type} has no editor defined`);void 0===(null==u?void 0:u[t.name])&&(u[t.name]=null===(w=e.defaultValues)||void 0===w?void 0:w[t.name]);const o=n.createElement(I,{value:null!==(D=u[t.name])&&void 0!==D?D:"",opts:t.type,className:e.inputClassName,editProps:l,onChange:s});return n.createElement(null!==(x=e.tdElement)&&void 0!==x?x:"td",{className:y(t.name),key:a,onKeyDown:null!==u?N:void 0},o)}if(!F)throw new Error(`Field ${t.name}:${t.type} has no formatter defined`);return n.createElement(null!==(P=e.tdElement)&&void 0!==P?P:"td",{className:y(t.name),onClick:e.disableUpdate?void 0:()=>c({...e.item}),key:a},void 0!==e.item?F({value:null===(V=null==e?void 0:e.item)||void 0===V?void 0:V[t.name],opts:t.type}):h)})),n.createElement(null!==(m=e.tdElement)&&void 0!==m?m:"td",{className:y("buttons")},n.createElement("div",{style:{display:"flex",flexDirection:"row"}},C,E,p)))}const u=n.forwardRef((function(e,t){var a,l,s,o,i,r;if(!e.schema)throw new Error("schema prop is missing");if(!e.onLoad)throw new Error("onLoad callback is missing");const[d,u]=n.useState([]),c=n.useCallback((()=>{const t=e.onLoad();t instanceof Promise?t.then((e=>u(e))):u(t)}),[e,u]);n.useEffect(c,[c]);const v=n.useCallback((e=>{e.altKey&&"R"==e.key&&(c(),e.stopPropagation())}),[c]);let p=e.trClassName;e.rowClassName&&(p=(p?p+" ":"")+e.rowClassName);let b=e.trClassName;e.insertClassName&&(b=(b?b+" ":"")+e.insertClassName);const C={schema:e.schema,format:e.format,btnValidateClassName:e.btnValidateClassName,btnDeleteClassName:e.btnDeleteClassName,btnValidateElement:e.btnValidateElement,btnDeleteElement:e.btnDeleteElement,btnCancelClassName:e.btnCancelClassName,btnCancelElement:e.btnCancelElement,inputClassName:e.inputClassName,tdClassName:e.tdClassName,trElement:e.trElement,tdElement:e.tdElement,edit:e.edit,editProps:e.editProps,disableDelete:e.disableDelete,disableUpdate:e.disableUpdate};return n.createElement(null!==(a=e.tableElement)&&void 0!==a?a:"table",{className:e.className,ref:t,onKeyDown:v},[null!==e.headers?n.createElement(null!==(l=e.theadElement)&&void 0!==l?l:"thead",{key:"thead",className:e.headClassName},n.createElement(null!==(s=e.trElement)&&void 0!==s?s:"tr",{className:e.trClassName},...e.schema.map(((t,a)=>{var l,s,o,i;if("id"===t.type)return null;const r=(null===(l=e.thClassName)||void 0===l?void 0:l[t.name])||e.thClassName;return(null===(s=e.headers)||void 0===s?void 0:s[t.name])?n.createElement(null!==(o=e.thElement)&&void 0!==o?o:"th",{key:a,className:r},e.headers[t.name]):n.createElement(null!==(i=e.thElement)&&void 0!==i?i:"th",{key:a,className:r},t.name)})),n.createElement(null!==(o=e.thElement)&&void 0!==o?o:"th",{key:"buttons",className:(null===(i=e.thClassName)||void 0===i?void 0:i.buttons)||e.thClassName}))):null,n.createElement(null!==(r=e.tbodyElement)&&void 0!==r?r:"tbody",{key:"tbody",className:e.bodyClassName},...d.map(((t,a)=>n.createElement(m,{key:a,item:t,dataid:a,...C,trClassName:p,onChange:async a=>{if(e.onUpdate){const n=await e.onUpdate(a,t);if(!1===n)return!1;"object"==typeof n&&(a=n)}const n=[...d];if(n[n.findIndex((e=>e===t))]=a,e.onChange){const t=await e.onChange(n);if(!1===t)return!1;if(!0===t)return c()}u([...n])},onDelete:async()=>{if(e.onDelete&&!1===await e.onDelete(t))return;const a=d.findIndex((e=>e===t)),n=[...d];if(n.splice(a,1),e.onChange){const t=await e.onChange(n);if(!1===t)return!1;if(!0===t)return c()}u([...n])}}))),e.disableInsert?null:n.createElement(m,{key:"insert",dataid:d.length,...C,defaultValues:e.defaultValues,filler:e.filler,trClassName:b,onChange:async t=>{if(e.onInsert){const a=await e.onInsert(t);if(!1===a)return!1;"object"==typeof a&&(t=a)}if(e.onChange){const a=[...d];a.push(t);const n=await e.onChange(a);if(!1===n)return!1;if(!0===n)return c()}d.push(t),u([...d])}}))])}))}}]);