(()=>{var st=Object.defineProperty;var I=(t,e)=>{for(var o in e)st(t,o,{get:e[o],enumerable:!0})};var at={SORT_CHANGED:"sortable::sortChanged",SORT_RESET:"sortable::sortReset",FILTER_CHANGED:"filterable::filterChanged",FILTER_LIST_UPDATED:"filterable::filterListUpdated",FILTER_REQUESTED:"filterable::filterRequested",FILTERS_COLUMN_SELECTED:"filterable::filtersColumnSelected",APPLIED_CHANGE:"updatable::filterChanged"},T=at;var M={};I(M,{deduplicateObjectsBy:()=>ut,deduplicatePrimitives:()=>dt});var{keys:lt,values:ct}=Object;function dt(t,{excludeEmpty:e}={}){let o={};return t.forEach(r=>{e&&!r||(o[r]=!0)}),lt(o)}function ut(t,e,{excludeEmpty:o}={}){let r={};return t.forEach(n=>{o&&!n[e]||(r[n[e]]=n)}),ct(r)}var y={};I(y,{META:()=>O,getNodeMeta:()=>L,setNodeMeta:()=>U});var{assign:xt}=Object,O=new WeakMap;function L(t,e){if(O.has(t))return O.get(t)[e]}function U(t,e,o){let r={};O.has(t)&&(r=O.get(t)),O.set(t,{...r,[e]:o})}var w={};I(w,{off:()=>P,on:()=>K,trigger:()=>ft});function K(t,e,o){return t instanceof Array&&t.forEach(r=>K(r,e,o)),t.addEventListener(e,o)}function P(t,e,o){return t instanceof Array&&t.forEach(r=>P(r,e,o)),t.removeEventListener(e,o)}function ft(t,e){t instanceof Array&&t.forEach(o=>P(o,evt,listener)),t.dispatchEvent(e)}var[a,u]=[(t,e=document)=>e.querySelector(t),(t,e=document)=>[...e.querySelectorAll(t)||[]]],c=t=>t instanceof Array?t.map(e=>c(e)):t.cloneNode(!0),p=t=>{let e=document.createElement("template");return e.innerHTML=t,e.content.firstElementChild},{deduplicateObjectsBy:At,deduplicatePrimitives:X}=M,{getNodeMeta:F,setNodeMeta:v}=y,{on:f,off:Ot,trigger:d}=w;function B(t){let e=u("tbody tr",t.target),o=a("tfoot tr td:last-child",t.target);o.innerHTML=e.length}var $=class extends CustomEvent{constructor(e,o){super(T.APPLIED_CHANGE,{detail:{type:e,data:o}})}};function H(t){let{target:e}=t,o=F(e,"filters"),r=F(e,"originalRows"),n=u("thead th",e),i=r.filter(s=>{for(let m of o){let E=n.findIndex(x=>a(".sortable-header-text",x).innerText===m.column);if(E>-1&&!(s.children[E].innerText===m.value))return!1}return!0});if(console.log("IS SEARCH",{isSearch:o.some(s=>s.column==="search")}),o.some(s=>s.column==="search")){let s=o.find(m=>m.column==="search").value;i=i.filter(m=>[...m.children].some(E=>(console.log({tdInner:E.innerHTML,value:s}),E.innerHTML.toLowerCase().includes(s.toLowerCase()))))}let l=p("<tbody></tbody>");l.append(...i),a("tbody",e).replaceWith(l),v(e,"visibleRows",i),d(e,new $)}var pt={ADD:"filter_added",REMOVE:"filter_removed",REPLACE:"filter_replaced"},R=pt;var h=class extends CustomEvent{constructor(e,o){super(T.FILTER_LIST_UPDATED,{detail:{filter:e,update:o}})}};function k(t){let{detail:e,target:o}=t,{filter:r,update:n}=e,i=L(o,"filters"),l=i.findIndex(m=>m.column===r),s=l>-1;switch(n.type){case R.REPLACE:s?i[l].value=n.value:i.push({column:r,value:n.value});break;case R.ADD:if(s)return d(o,new h(r,{type:R.REPLACE,value:n.value}));i.push({column:r,value:n.value});break;case R.REMOVE:if(!s)return;i.splice(l,1);break}U(o,"filters",i)}var mt={BUTTON_SORT_ASC:p('<button data-sorting-order="asc">\u2193</button>'),BUTTON_SORT_DESC:p('<button data-sorting-order="desc">\u2191</button>'),BUTTON_SORT_UNSORTED:p('<button data-sorting-order="none">\u2195</button>'),SORTABLE_HEADER:p(`<th>
  <div class="sortable-header">
    <div class="sortable-header sortable-header-text"></div>
    <div class="sortable-header sortable-header-actions"></div>
  </div></th>`),SEARCH_FORM:p(`
  <form>
  <fieldset><legend>Search</legend>
    <input type="search" />
    <button type="submit">Search</button>
  </fieldset>
  <fielset hidden>
    <datalist></datalist>
  </fieldset>
  </form>`),FILTERS_FORM:p(`
  <form>
  <fieldset id="applied-filters">
  <legend>Applied filters</legend>
    <ol>
      <li>No filters</li>
    </ol>
  </fieldset>
  <fieldset>
  <legend>Filter</legend>
  <dl>
    <dt>Filter by</dt>
    <dd>
      <div class="stack stack-horz">
        <select id="filter-by-columns">
          <option value="">Column</option>          
        </select>
        <select id="filter-by-col-values">
          <option value="">Value</option>          
        </select>
      </div>
    </dd>
  </dl>
  <div class="stack stack-horz">
    <button type="button" id="filters-add-filter">Add filter</button>
  </div>
  </fieldset>
  </form>`),FILTERS_FORM_ENTRY:p(`
    <li><div class="stack stack-horz">
      <div class="filters filters-controls"><button type="button">\u2A09</button></div>
      <div class="filters filters-column"></div>
      <div class="filters filters-value"></div>
    </div></li>
  `)},S=mt;var g=class extends CustomEvent{constructor(){super(T.FILTER_REQUESTED)}};var N=class extends CustomEvent{get column(){return this.detail.column}constructor(e){super(T.FILTERS_COLUMN_SELECTED,{detail:{column:e}})}};function V(t,e){let o=c(S.FILTERS_FORM_ENTRY);return a(".filters-column",o).innerHTML=e.column,a(".filters-value",o).innerHTML=e.value,f(a("button",o),"click",r=>{d(t,new h(e.column,{type:R.REMOVE})),d(t,new g)}),o}function q(t,e,o){let r=c(e),n=[];return o.forEach(i=>{n.push(V(t,i))}),n.length&&(r.innerHTML="",r.append(...n)),r}function C(t){let{FILTERS_FORM:e}=S,o=F(t,"filters"),r=c(e),n="",i="",l=a("#filter-by-columns",r),s=a("#filter-by-col-values",r);f(l,"change",_=>{n=_.target.value,d(t,new N(n))}),f(s,"change",_=>{i=_.target.value}),f(a("#filters-add-filter",r),"click",()=>{n!==""&&i!==""&&d(t,new h(n,{type:R.ADD,value:i})),d(t,new g)});let m=a("#applied-filters ol",r),E=q(t,m,o);m.replaceWith(E);let x=u("th",t).map(_=>{let A=a(".sortable-header-text",_).innerText;return p(`<option value="${A}">${A}</option>`)});l.append(...x),t.parentNode.insertBefore(r,t)}function G(t){let{target:e}=t;a("#applied-filters").parentNode.remove(),C(e)}function z(t){let{target:e}=t,o=a("#filter-by-col-values"),r=t.column,n=u("thead th",e).findIndex(i=>a(".sortable-header-text",i).innerText===r);if(n>-1){let i=X(u("tbody tr",e).map(l=>u("td",l)[n].innerText),{excludeEmpty:!0});o.innerHTML='<option value="">Value</option>',o.append(...i.map(l=>p(`<option value="${l}">${l}</option>`)))}}function W(t){let e=c(S.SEARCH_FORM),{REPLACE:o}=R,r={};for(let s of u("tbody td",t))r[s.innerHTML]=!0;let n=Object.keys(r).map(s=>p(`<option value="${s}"></option>"`)),i=a("datalist",e),l=L(t,"id");i.setAttribute("id",l),a("input",e).setAttribute("list",l),a("datalist",e).append(...n),f(e,"submit",s=>{s.preventDefault(),s.stopPropagation(),d(t,new h("search",{type:o,value:a("input",e).value})),d(t,new g)}),t.parentNode.insertBefore(e,t)}var b=class extends CustomEvent{get changedHeader(){return this.detail.header}constructor(e){super(T.SORT_CHANGED,{detail:{header:e}})}};function Y(t,e){let o=t.closest("table"),{SORTABLE_HEADER:r,BUTTON_SORT_UNSORTED:n}=S,i=c(r),l=c(n);f(l,"click",()=>d(o,new b(i))),l.dataset.col=e,a(".sortable-header-text",i).innerText=t.innerText,a(".sortable-header-actions",i).append(l),t.replaceWith(i)}function j(t){u("th",t).forEach(Y)}function Z(t){let{target:e}=t,o=u("th [data-sorting-order]",e),r=[];for(let n of o)n.dataset.sortingOrder!=="none"&&r.push(n);r.forEach(n=>{let i=n.closest("th"),l=$clone(S.BUTTON_SORT_UNSORTED);f(l,"click",()=>{d(e,new SortChanged(i))}),n.replaceWith(l)})}function Et(t,e){let[o,r]=[t.replace(/([^A-Za-z0-9]{1,})/,"\xFF"),e.replace(/([^A-Za-z0-9]{1,})/,"\xFF")];return o?r?o>r?1:o===r?0:-1:-1:1}function Tt(t,e){let[o,r]=[t.replace(/([^A-Za-z0-9]{1,})/,"\xFF"),e.replace(/([^A-Za-z0-9]{1,})/,"\xFF")];return o?r?o>r?-1:o===r?0:1:-1:1}function St(t,e){}var Rt={asc:Et,desc:Tt,none:St},tt=Rt;function Q(t){let{header:e}=t.detail,o=e.closest("table"),r=a("button",e),{col:n,sortingOrder:i}=r.dataset,l=a("tbody",o),s=c(l),m=A=>D=>D.children[A].innerHTML,E=c(L(o,"visibleRows")),x=E.sort(function(A,D){let[ot,rt]=[A,D].map(it=>m(n)(it)),nt=tt[i];return nt(ot,rt)}),_=c(x);s.innerHTML="",s.append(...i==="none"?E:_),l.replaceWith(s)}var ht={SORTING_ORDER:{nodes:["BUTTON_SORT_UNSORTED","BUTTON_SORT_ASC","BUTTON_SORT_DESC"],propValues:["none","asc","desc"]}},et=ht;function J(t){let{header:e}=t.detail,o=a("button",e),{col:r,sortingOrder:n}=o.dataset,{propValues:i,nodes:l}=et.SORTING_ORDER,m=(i.indexOf(n)+1)%i.length,E=c(S[l[m]]);E.dataset.col=r,f(E,"click",()=>{d(e.closest("table"),new b(e))}),o.replaceWith(E)}f(document,"DOMContentLoaded",()=>{u("table").forEach(gt)});function gt(t){let e=u("tbody tr",t);_t(t,e),Lt(t),j(t),W(t),C(t)}function _t(t,e){v(t,"filters",[]),v(t,"originalRows",c(e)),v(t,"visibleRows",c(e)),v(t,"id",`table-${Math.random().toString(36).substring(7)}`)}function Lt(t){let{SORT_CHANGED:e,SORT_RESET:o,FILTER_REQUESTED:r,APPLIED_CHANGE:n,FILTER_LIST_UPDATED:i,FILTERS_COLUMN_SELECTED:l}=T,s=f.bind(f,t);s(e,J),s(o,Z),s(e,Q),s(r,H),s(i,k),s(i,G),s(l,z),s(n,B)}})();
