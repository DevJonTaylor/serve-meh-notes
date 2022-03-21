function _(){}function j(e){return e()}function F(){return Object.create(null)}function g(e){e.forEach(j)}function P(e){return typeof e=="function"}function q(e,t){return e!=e?t==t:e!==t||e&&typeof e=="object"||typeof e=="function"}function H(e){return Object.keys(e).length===0}function B(e,...t){if(e==null)return _;const n=e.subscribe(...t);return n.unsubscribe?()=>n.unsubscribe():n}function oe(e,t,n){e.$$.on_destroy.push(B(t,n))}function ue(e){return e==null?"":e}function m(e,t){e.appendChild(t)}function I(e,t,n){e.insertBefore(t,n||null)}function O(e){e.parentNode.removeChild(e)}function ae(e,t){for(let n=0;n<e.length;n+=1)e[n]&&e[n].d(t)}function E(e){return document.createElement(e)}function M(e){return document.createTextNode(e)}function N(){return M(" ")}function ce(){return M("")}function _e(e,t,n,l){return e.addEventListener(t,n,l),()=>e.removeEventListener(t,n,l)}function fe(e){return function(t){return t.preventDefault(),e.call(this,t)}}function z(e,t,n){n==null?e.removeAttribute(t):e.getAttribute(t)!==n&&e.setAttribute(t,n)}function K(e){return Array.from(e.childNodes)}function de(e,t){t=""+t,e.wholeText!==t&&(e.data=t)}function ve(e,t){e.value=t==null?"":t}function h(e,t,n,l){n===null?e.style.removeProperty(t):e.style.setProperty(t,n,l?"important":"")}function ye(e,t,n){e.classList[n?"add":"remove"](t)}let b;function w(e){b=e}function J(){if(!b)throw new Error("Function called outside component initialization");return b}function ge(e){J().$$.on_mount.push(e)}function he(e){J().$$.on_destroy.push(e)}const x=[],R=[],C=[],T=[],Q=Promise.resolve();let L=!1;function U(){L||(L=!0,Q.then(G))}function D(e){C.push(e)}const $=new Set;let k=0;function G(){const e=b;do{for(;k<x.length;){const t=x[k];k++,w(t),V(t.$$)}for(w(null),x.length=0,k=0;R.length;)R.pop()();for(let t=0;t<C.length;t+=1){const n=C[t];$.has(n)||($.add(n),n())}C.length=0}while(x.length);for(;T.length;)T.pop()();L=!1,$.clear(),w(e)}function V(e){if(e.fragment!==null){e.update(),g(e.before_update);const t=e.dirty;e.dirty=[-1],e.fragment&&e.fragment.p(e.ctx,t),e.after_update.forEach(D)}}const A=new Set;let d;function pe(){d={r:0,c:[],p:d}}function me(){d.r||g(d.c),d=d.p}function X(e,t){e&&e.i&&(A.delete(e),e.i(t))}function be(e,t,n,l){if(e&&e.o){if(A.has(e))return;A.add(e),d.c.push(()=>{A.delete(e),l&&(n&&e.d(1),l())}),e.o(t)}}function we(e){e&&e.c()}function Y(e,t,n,l){const{fragment:i,on_mount:a,on_destroy:u,after_update:s}=e.$$;i&&i.m(t,n),l||D(()=>{const o=a.map(j).filter(P);u?u.push(...o):g(o),e.$$.on_mount=[]}),s.forEach(D)}function Z(e,t){const n=e.$$;n.fragment!==null&&(g(n.on_destroy),n.fragment&&n.fragment.d(t),n.on_destroy=n.fragment=null,n.ctx=[])}function ee(e,t){e.$$.dirty[0]===-1&&(x.push(e),U(),e.$$.dirty.fill(0)),e.$$.dirty[t/31|0]|=1<<t%31}function te(e,t,n,l,i,a,u,s=[-1]){const o=b;w(e);const r=e.$$={fragment:null,ctx:null,props:a,update:_,not_equal:i,bound:F(),on_mount:[],on_destroy:[],on_disconnect:[],before_update:[],after_update:[],context:new Map(t.context||(o?o.$$.context:[])),callbacks:F(),dirty:s,skip_bound:!1,root:t.target||o.$$.root};u&&u(r.root);let v=!1;if(r.ctx=n?n(e,t.props||{},(c,S,...f)=>{const y=f.length?f[0]:S;return r.ctx&&i(r.ctx[c],r.ctx[c]=y)&&(!r.skip_bound&&r.bound[c]&&r.bound[c](y),v&&ee(e,c)),S}):[],r.update(),v=!0,g(r.before_update),r.fragment=l?l(r.ctx):!1,t.target){if(t.hydrate){const c=K(t.target);r.fragment&&r.fragment.l(c),c.forEach(O)}else r.fragment&&r.fragment.c();t.intro&&X(e.$$.fragment),Y(e,t.target,t.anchor,t.customElement),G()}w(o)}class ne{$destroy(){Z(this,1),this.$destroy=_}$on(t,n){const l=this.$$.callbacks[t]||(this.$$.callbacks[t]=[]);return l.push(n),()=>{const i=l.indexOf(n);i!==-1&&l.splice(i,1)}}$set(t){this.$$set&&!H(t)&&(this.$$.skip_bound=!0,this.$$set(t),this.$$.skip_bound=!1)}}const p=[];function se(e,t){return{subscribe:le(e,t).subscribe}}function le(e,t=_){let n;const l=new Set;function i(s){if(q(e,s)&&(e=s,n)){const o=!p.length;for(const r of l)r[1](),p.push(r,e);if(o){for(let r=0;r<p.length;r+=2)p[r][0](p[r+1]);p.length=0}}}function a(s){i(s(e))}function u(s,o=_){const r=[s,o];return l.add(r),l.size===1&&(n=t(i)||_),s(e),()=>{l.delete(r),l.size===0&&(n(),n=null)}}return{set:i,update:a,subscribe:u}}function xe(e,t,n){const l=!Array.isArray(e),i=l?[e]:e,a=t.length<2;return se(n,u=>{let s=!1;const o=[];let r=0,v=_;const c=()=>{if(r)return;v();const f=t(l?o[0]:o,u);a?u(f):v=P(f)?f:_},S=i.map((f,y)=>B(f,W=>{o[y]=W,r&=~(1<<y),s&&c()},()=>{r|=1<<y}));return s=!0,c(),function(){g(S),v()}})}function re(e){let t,n,l,i,a,u;return{c(){t=E("span"),n=E("div"),l=N(),i=E("div"),a=N(),u=E("div"),z(n,"class","svelte-evhfle"),z(i,"class","svelte-evhfle"),z(u,"class","svelte-evhfle"),h(t,"--size",e[3]+e[1]),h(t,"--color",e[0]),h(t,"--duration",e[2]),z(t,"class","svelte-evhfle")},m(s,o){I(s,t,o),m(t,n),m(t,l),m(t,i),m(t,a),m(t,u)},p(s,[o]){o&10&&h(t,"--size",s[3]+s[1]),o&1&&h(t,"--color",s[0]),o&4&&h(t,"--duration",s[2])},i:_,o:_,d(s){s&&O(t)}}}function ie(e,t,n){let{color:l="#FF3E00"}=t,{unit:i="px"}=t,{duration:a="1.5s"}=t,{size:u="60"}=t;return e.$$set=s=>{"color"in s&&n(0,l=s.color),"unit"in s&&n(1,i=s.unit),"duration"in s&&n(2,a=s.duration),"size"in s&&n(3,u=s.size)},[l,i,a,u]}class Se extends ne{constructor(t){super();te(this,t,ie,re,q,{color:0,unit:1,duration:2,size:3})}}export{be as A,Z as B,pe as C,me as D,Se as E,ge as F,ne as S,N as a,z as b,I as c,xe as d,E as e,m as f,_ as g,O as h,te as i,oe as j,ve as k,_e as l,M as m,ue as n,he as o,fe as p,de as q,g as r,q as s,ye as t,ce as u,ae as v,le as w,we as x,Y as y,X as z};