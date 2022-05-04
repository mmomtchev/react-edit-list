"use strict";(self.webpackChunkreact_edit_list=self.webpackChunkreact_edit_list||[]).push([[601],{9601:(n,s,a)=>{a.r(s),a.d(s,{default:()=>t});const t='<span class="token keyword">import</span> <span class="token operator">*</span> <span class="token keyword">as</span> React <span class="token keyword">from</span> <span class="token string">"react"</span><span class="token punctuation">;</span>\n<span class="token keyword">import</span> ReactEditList<span class="token punctuation">,</span> <span class="token operator">*</span> <span class="token keyword">as</span> <span class="token constant">REL</span> <span class="token keyword">from</span> <span class="token string">"react-edit-list"</span><span class="token punctuation">;</span>\n\n<span class="token keyword">import</span> <span class="token string">"bootstrap/dist/js/bootstrap.bundle"</span><span class="token punctuation">;</span>\n<span class="token keyword">import</span> <span class="token string">"bootstrap/dist/css/bootstrap.min.css"</span><span class="token punctuation">;</span>\n<span class="token keyword">import</span> <span class="token string">"../example.css"</span><span class="token punctuation">;</span>\n\n<span class="token keyword">import</span> <span class="token punctuation">{</span> DayPicker <span class="token keyword">as</span> ReactDayPicker <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">"react-day-picker"</span><span class="token punctuation">;</span>\n<span class="token keyword">import</span> <span class="token punctuation">{</span> format<span class="token punctuation">,</span> isValid <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">"date-fns"</span><span class="token punctuation">;</span>\n<span class="token keyword">import</span> <span class="token string">"react-day-picker/dist/style.css"</span><span class="token punctuation">;</span>\n\n<span class="token keyword">const</span> data <span class="token operator">=</span> <span class="token punctuation">[</span>\n  <span class="token punctuation">{</span> name<span class="token operator">:</span> <span class="token string">"Ronald"</span><span class="token punctuation">,</span> birthdate<span class="token operator">:</span> <span class="token keyword">new</span> <span class="token class-name">Date</span><span class="token punctuation">(</span><span class="token string">"1980-01-30"</span><span class="token punctuation">)</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>\n  <span class="token punctuation">{</span> name<span class="token operator">:</span> <span class="token string">"Archibald"</span><span class="token punctuation">,</span> birthdate<span class="token operator">:</span> <span class="token keyword">new</span> <span class="token class-name">Date</span><span class="token punctuation">(</span><span class="token string">"1982-02-28"</span><span class="token punctuation">)</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>\n<span class="token punctuation">]</span><span class="token punctuation">;</span>\n<span class="token keyword">const</span> schema<span class="token operator">:</span> <span class="token constant">REL</span><span class="token punctuation">.</span>Schema <span class="token operator">=</span> <span class="token punctuation">[</span>\n  <span class="token punctuation">{</span> name<span class="token operator">:</span> <span class="token string">"name"</span><span class="token punctuation">,</span> type<span class="token operator">:</span> <span class="token string">"string"</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>\n  <span class="token punctuation">{</span> name<span class="token operator">:</span> <span class="token string">"birthdate"</span><span class="token punctuation">,</span> type<span class="token operator">:</span> <span class="token string">"custom"</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>\n<span class="token punctuation">]</span><span class="token punctuation">;</span>\n\n<span class="token comment">// Loading can be asynchronous</span>\n<span class="token keyword">const</span> <span class="token function-variable function">getData</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token builtin">Promise</span><span class="token punctuation">.</span><span class="token function">resolve</span><span class="token punctuation">(</span>data<span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token keyword">function</span> <span class="token function">Dates</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n  <span class="token keyword">const</span> <span class="token function-variable function">validate</span> <span class="token operator">=</span> <span class="token punctuation">(</span>item<span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token function">isValid</span><span class="token punctuation">(</span>item<span class="token punctuation">.</span>birthdate<span class="token punctuation">)</span><span class="token punctuation">;</span>\n  <span class="token keyword">const</span> <span class="token function-variable function">display</span> <span class="token operator">=</span> <span class="token punctuation">(</span>value<span class="token punctuation">)</span> <span class="token operator">=></span>\n    <span class="token function">isValid</span><span class="token punctuation">(</span>value<span class="token punctuation">)</span> <span class="token operator">?</span> <span class="token function">format</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">Date</span><span class="token punctuation">(</span>value<span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token string">"PP"</span><span class="token punctuation">)</span> <span class="token operator">:</span> <span class="token string">""</span><span class="token punctuation">;</span>\n\n  <span class="token keyword">return</span> <span class="token punctuation">(</span>\n    <span class="token operator">&lt;</span>ReactEditList\n      schema<span class="token operator">=</span><span class="token punctuation">{</span>schema<span class="token punctuation">}</span>\n      onLoad<span class="token operator">=</span><span class="token punctuation">{</span>getData<span class="token punctuation">}</span>\n      onInsert<span class="token operator">=</span><span class="token punctuation">{</span>validate<span class="token punctuation">}</span>\n      onUpdate<span class="token operator">=</span><span class="token punctuation">{</span>validate<span class="token punctuation">}</span>\n      format<span class="token operator">=</span><span class="token punctuation">{</span><span class="token punctuation">{</span>\n        <span class="token function-variable function">birthdate</span><span class="token operator">:</span> <span class="token keyword">function</span> <span class="token function">BirthDateRenderer</span><span class="token punctuation">(</span>props<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n          <span class="token keyword">return</span> <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span><span class="token class-name">React.Fragment</span></span><span class="token punctuation">></span></span><span class="token punctuation">{</span><span class="token function">display</span><span class="token punctuation">(</span>props<span class="token punctuation">.</span>value<span class="token punctuation">)</span><span class="token punctuation">}</span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span><span class="token class-name">React.Fragment</span></span><span class="token punctuation">></span></span><span class="token punctuation">;</span>\n        <span class="token punctuation">}</span><span class="token punctuation">,</span>\n      <span class="token punctuation">}</span><span class="token punctuation">}</span>\n      edit<span class="token operator">=</span><span class="token punctuation">{</span><span class="token punctuation">{</span>\n        <span class="token comment">// You have to provide a custom editor that is a React component</span>\n        <span class="token comment">// react-edit-list will pass you the current value in `props.value`</span>\n        <span class="token comment">// In order to modify it, you will have to call `props.onChange()`</span>\n        <span class="token function-variable function">birthdate</span><span class="token operator">:</span> <span class="token keyword">function</span> <span class="token function">BirthDateEditor</span><span class="token punctuation">(</span>props<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n          <span class="token keyword">const</span> dropdown <span class="token operator">=</span> React<span class="token punctuation">.</span><span class="token generic-function"><span class="token function">useRef</span><span class="token generic class-name"><span class="token operator">&lt;</span>HTMLDivElement<span class="token operator">></span></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n          <span class="token keyword">return</span> <span class="token punctuation">(</span>\n            <span class="token comment">// This is a simple Bootstrap 5 dropdown with manual control</span>\n            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">className</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>w-100<span class="token punctuation">"</span></span><span class="token punctuation">></span></span><span class="token plain-text">\n              </span><span class="token punctuation">{</span><span class="token comment">/* This is the always visible part */</span><span class="token punctuation">}</span><span class="token plain-text">\n              </span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>input</span>\n                <span class="token attr-name">value</span><span class="token script language-javascript"><span class="token script-punctuation punctuation">=</span><span class="token punctuation">{</span><span class="token function">display</span><span class="token punctuation">(</span>props<span class="token punctuation">.</span>value<span class="token punctuation">)</span><span class="token punctuation">}</span></span>\n                <span class="token attr-name">readOnly</span>\n                <span class="token attr-name">onFocus</span><span class="token script language-javascript"><span class="token script-punctuation punctuation">=</span><span class="token punctuation">{</span>React<span class="token punctuation">.</span><span class="token function">useCallback</span><span class="token punctuation">(</span>\n                  <span class="token comment">// On focus, show the dropdown</span>\n                  <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> dropdown<span class="token punctuation">.</span>current<span class="token punctuation">.</span>classList<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span><span class="token string">"show"</span><span class="token punctuation">)</span><span class="token punctuation">,</span>\n                  <span class="token punctuation">[</span>dropdown<span class="token punctuation">]</span>\n                <span class="token punctuation">)</span><span class="token punctuation">}</span></span>\n                <span class="token attr-name">className</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>user-select-none w-100<span class="token punctuation">"</span></span>\n              <span class="token punctuation">/></span></span><span class="token plain-text">\n              </span><span class="token punctuation">{</span><span class="token comment">/* This is the dropdown part */</span><span class="token punctuation">}</span><span class="token plain-text">\n              </span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">className</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>dropdown-menu<span class="token punctuation">"</span></span> <span class="token attr-name">ref</span><span class="token script language-javascript"><span class="token script-punctuation punctuation">=</span><span class="token punctuation">{</span>dropdown<span class="token punctuation">}</span></span><span class="token punctuation">></span></span><span class="token plain-text">\n                </span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span><span class="token class-name">ReactDayPicker</span></span>\n                  <span class="token attr-name">mode</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>single<span class="token punctuation">"</span></span>\n                  <span class="token attr-name">selected</span><span class="token script language-javascript"><span class="token script-punctuation punctuation">=</span><span class="token punctuation">{</span>props<span class="token punctuation">.</span>value <span class="token keyword">as</span> Date<span class="token punctuation">}</span></span>\n                  <span class="token attr-name">defaultMonth</span><span class="token script language-javascript"><span class="token script-punctuation punctuation">=</span><span class="token punctuation">{</span>props<span class="token punctuation">.</span>value <span class="token keyword">as</span> Date<span class="token punctuation">}</span></span>\n                  <span class="token attr-name">onSelect</span><span class="token script language-javascript"><span class="token script-punctuation punctuation">=</span><span class="token punctuation">{</span>React<span class="token punctuation">.</span><span class="token function">useCallback</span><span class="token punctuation">(</span>\n                    <span class="token punctuation">(</span>value<span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>\n                      <span class="token comment">// Here we send the new date to react-edit-list</span>\n                      props<span class="token punctuation">.</span><span class="token function">onChange</span><span class="token punctuation">(</span>value<span class="token punctuation">)</span><span class="token punctuation">;</span>\n                      <span class="token comment">// And then we close the dropdown</span>\n                      dropdown<span class="token punctuation">.</span>current<span class="token punctuation">.</span>classList<span class="token punctuation">.</span><span class="token function">remove</span><span class="token punctuation">(</span><span class="token string">"show"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n                    <span class="token punctuation">}</span><span class="token punctuation">,</span>\n                    <span class="token punctuation">[</span>props<span class="token punctuation">]</span>\n                  <span class="token punctuation">)</span><span class="token punctuation">}</span></span>\n                <span class="token punctuation">/></span></span><span class="token plain-text">\n              </span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span><span class="token plain-text">\n            </span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>\n          <span class="token punctuation">)</span><span class="token punctuation">;</span>\n        <span class="token punctuation">}</span><span class="token punctuation">,</span>\n      <span class="token punctuation">}</span><span class="token punctuation">}</span>\n      className<span class="token operator">=</span><span class="token string">"table table-light table-fixed align-middle"</span>\n      headClassName<span class="token operator">=</span><span class="token string">"table-dark"</span>\n      inputClassName<span class="token operator">=</span><span class="token string">"w-100"</span>\n      thClassName<span class="token operator">=</span><span class="token punctuation">{</span><span class="token punctuation">{</span>\n        product<span class="token operator">:</span> <span class="token string">"col-4"</span><span class="token punctuation">,</span>\n        type<span class="token operator">:</span> <span class="token string">"col-3"</span><span class="token punctuation">,</span>\n        price<span class="token operator">:</span> <span class="token string">"col-2"</span><span class="token punctuation">,</span>\n        stock<span class="token operator">:</span> <span class="token string">"col-2"</span><span class="token punctuation">,</span>\n        buttons<span class="token operator">:</span> <span class="token string">"col-1"</span><span class="token punctuation">,</span>\n      <span class="token punctuation">}</span><span class="token punctuation">}</span>\n      btnValidateClassName<span class="token operator">=</span><span class="token string">"btn btn-success p-0 m-0"</span>\n      btnDeleteClassName<span class="token operator">=</span><span class="token string">"btn btn-danger py-0 px-1 m-0 mx-1"</span>\n      btnCancelClassName<span class="token operator">=</span><span class="token string">"btn btn-secondary py-0 px-1 m-0 mx-1"</span>\n    <span class="token operator">/</span><span class="token operator">></span>\n  <span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n'}}]);