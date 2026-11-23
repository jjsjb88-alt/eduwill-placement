/**
 * @license
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var Gp=()=>{};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var Hp=function(r){let e=[],t=0;for(let n=0;n<r.length;n++){let s=r.charCodeAt(n);s<128?e[t++]=s:s<2048?(e[t++]=s>>6|192,e[t++]=s&63|128):(s&64512)===55296&&n+1<r.length&&(r.charCodeAt(n+1)&64512)===56320?(s=65536+((s&1023)<<10)+(r.charCodeAt(++n)&1023),e[t++]=s>>18|240,e[t++]=s>>12&63|128,e[t++]=s>>6&63|128,e[t++]=s&63|128):(e[t++]=s>>12|224,e[t++]=s>>6&63|128,e[t++]=s&63|128)}return e},by=function(r){let e=[],t=0,n=0;for(;t<r.length;){let s=r[t++];if(s<128)e[n++]=String.fromCharCode(s);else if(s>191&&s<224){let i=r[t++];e[n++]=String.fromCharCode((s&31)<<6|i&63)}else if(s>239&&s<365){let i=r[t++],a=r[t++],u=r[t++],c=((s&7)<<18|(i&63)<<12|(a&63)<<6|u&63)-65536;e[n++]=String.fromCharCode(55296+(c>>10)),e[n++]=String.fromCharCode(56320+(c&1023))}else{let i=r[t++],a=r[t++];e[n++]=String.fromCharCode((s&15)<<12|(i&63)<<6|a&63)}}return e.join("")},qp={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:typeof atob=="function",encodeByteArray(r,e){if(!Array.isArray(r))throw Error("encodeByteArray takes an array as a parameter");this.init_();let t=e?this.byteToCharMapWebSafe_:this.byteToCharMap_,n=[];for(let s=0;s<r.length;s+=3){let i=r[s],a=s+1<r.length,u=a?r[s+1]:0,c=s+2<r.length,l=c?r[s+2]:0,h=i>>2,d=(i&3)<<4|u>>4,C=(u&15)<<2|l>>6,y=l&63;c||(y=64,a||(C=64)),n.push(t[h],t[d],t[C],t[y])}return n.join("")},encodeString(r,e){return this.HAS_NATIVE_SUPPORT&&!e?btoa(r):this.encodeByteArray(Hp(r),e)},decodeString(r,e){return this.HAS_NATIVE_SUPPORT&&!e?atob(r):by(this.decodeStringToByteArray(r,e))},decodeStringToByteArray(r,e){this.init_();let t=e?this.charToByteMapWebSafe_:this.charToByteMap_,n=[];for(let s=0;s<r.length;){let i=t[r.charAt(s++)],u=s<r.length?t[r.charAt(s)]:0;++s;let l=s<r.length?t[r.charAt(s)]:64;++s;let d=s<r.length?t[r.charAt(s)]:64;if(++s,i==null||u==null||l==null||d==null)throw new jc;let C=i<<2|u>>4;if(n.push(C),l!==64){let y=u<<4&240|l>>2;if(n.push(y),d!==64){let D=l<<6&192|d;n.push(D)}}}return n},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let r=0;r<this.ENCODED_VALS.length;r++)this.byteToCharMap_[r]=this.ENCODED_VALS.charAt(r),this.charToByteMap_[this.byteToCharMap_[r]]=r,this.byteToCharMapWebSafe_[r]=this.ENCODED_VALS_WEBSAFE.charAt(r),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[r]]=r,r>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(r)]=r,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(r)]=r)}}},jc=class extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}},vy=function(r){let e=Hp(r);return qp.encodeByteArray(e,!0)},di=function(r){return vy(r).replace(/\./g,"")},ro=function(r){try{return qp.decodeString(r,!0)}catch(e){console.error("base64Decode failed: ",e)}return null};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function jp(){if(typeof self<"u")return self;if(typeof window<"u")return window;if(typeof global<"u")return global;throw new Error("Unable to locate global object.")}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var Ry=()=>jp().__FIREBASE_DEFAULTS__,Sy=()=>{if(typeof process>"u"||typeof process.env>"u")return;let r=process.env.__FIREBASE_DEFAULTS__;if(r)return JSON.parse(r)},Py=()=>{if(typeof document>"u")return;let r;try{r=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch{return}let e=r&&ro(r[1]);return e&&JSON.parse(e)},so=()=>{try{return Gp()||Ry()||Sy()||Py()}catch(r){console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${r}`);return}},Kp=r=>so()?.emulatorHosts?.[r],Jp=r=>{let e=Kp(r);if(!e)return;let t=e.lastIndexOf(":");if(t<=0||t+1===e.length)throw new Error(`Invalid host ${e} with no separate hostname and port!`);let n=parseInt(e.substring(t+1),10);return e[0]==="["?[e.substring(1,t-1),n]:[e.substring(0,t),n]},Jc=()=>so()?.config,zp=r=>so()?.[`_${r}`];/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var Wr=class{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((e,t)=>{this.resolve=e,this.reject=t})}wrapCallback(e){return(t,n)=>{t?this.reject(t):this.resolve(n),typeof e=="function"&&(this.promise.catch(()=>{}),e.length===1?e(t):e(t,n))}}};/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Wp(r,e){if(r.uid)throw new Error('The "uid" field is no longer supported by mockUserToken. Please use "sub" instead for Firebase Auth User ID.');let t={alg:"none",type:"JWT"},n=e||"demo-project",s=r.iat||0,i=r.sub||r.user_id;if(!i)throw new Error("mockUserToken must contain 'sub' or 'user_id' field!");let a={iss:`https://securetoken.google.com/${n}`,aud:n,iat:s,exp:s+3600,auth_time:s,sub:i,user_id:i,firebase:{sign_in_provider:"custom",identities:{}},...r};return[di(JSON.stringify(t)),di(JSON.stringify(a)),""].join(".")}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ke(){return typeof navigator<"u"&&typeof navigator.userAgent=="string"?navigator.userAgent:""}function Qp(){return typeof window<"u"&&!!(window.cordova||window.phonegap||window.PhoneGap)&&/ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(ke())}function Ny(){let r=so()?.forceEnvironment;if(r==="node")return!0;if(r==="browser")return!1;try{return Object.prototype.toString.call(global.process)==="[object process]"}catch{return!1}}function $p(){return typeof navigator<"u"&&navigator.userAgent==="Cloudflare-Workers"}function Yp(){let r=typeof chrome=="object"?chrome.runtime:typeof browser=="object"?browser.runtime:void 0;return typeof r=="object"&&r.id!==void 0}function Xp(){return typeof navigator=="object"&&navigator.product==="ReactNative"}function Zp(){let r=ke();return r.indexOf("MSIE ")>=0||r.indexOf("Trident/")>=0}function eC(){return!Ny()&&!!navigator.userAgent&&navigator.userAgent.includes("Safari")&&!navigator.userAgent.includes("Chrome")}function zc(){try{return typeof indexedDB=="object"}catch{return!1}}function tC(){return new Promise((r,e)=>{try{let t=!0,n="validate-browser-context-for-indexeddb-analytics-module",s=self.indexedDB.open(n);s.onsuccess=()=>{s.result.close(),t||self.indexedDB.deleteDatabase(n),r(!0)},s.onupgradeneeded=()=>{t=!1},s.onerror=()=>{e(s.error?.message||"")}}catch(t){e(t)}})}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var Oy="FirebaseError",Ct=class r extends Error{constructor(e,t,n){super(t),this.code=e,this.customData=n,this.name=Oy,Object.setPrototypeOf(this,r.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,rn.prototype.create)}},rn=class{constructor(e,t,n){this.service=e,this.serviceName=t,this.errors=n}create(e,...t){let n=t[0]||{},s=`${this.service}/${e}`,i=this.errors[e],a=i?xy(i,n):"Error",u=`${this.serviceName}: ${a} (${s}).`;return new Ct(s,u,n)}};function xy(r,e){try{let t=0,n="";for(;t<r.length;){let s=r.indexOf("{$",t);if(s===-1){n+=r.substring(t);break}let i=r.indexOf("}",s+2);if(i===-1){n+=r.substring(t);break}let a=r.substring(s+2,i),u=e[a];n+=r.substring(t,s)+(u!=null?String(u):`<${a}?>`),t=i+1}return n}catch{return r}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function nC(r){for(let e in r)if(Object.prototype.hasOwnProperty.call(r,e))return!1;return!0}function sn(r,e){if(r===e)return!0;let t=Object.keys(r),n=Object.keys(e);for(let s of t){if(!n.includes(s))return!1;let i=r[s],a=e[s];if(Up(i)&&Up(a)){if(!sn(i,a))return!1}else if(i!==a)return!1}for(let s of n)if(!t.includes(s))return!1;return!0}function Up(r){return r!==null&&typeof r=="object"}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Qr(r){let e=[];for(let[t,n]of Object.entries(r))Array.isArray(n)?n.forEach(s=>{e.push(encodeURIComponent(t)+"="+encodeURIComponent(s))}):e.push(encodeURIComponent(t)+"="+encodeURIComponent(n));return e.length?"&"+e.join("&"):""}function $r(r){let e={};return r.replace(/^\?/,"").split("&").forEach(n=>{if(n){let[s,i]=n.split("=");e[decodeURIComponent(s)]=decodeURIComponent(i)}}),e}function Yr(r){let e=r.indexOf("?");if(!e)return"";let t=r.indexOf("#",e);return r.substring(e,t>0?t:void 0)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function rC(r,e){let t=new Kc(r,e);return t.subscribe.bind(t)}var Kc=class{constructor(e,t){this.observers=[],this.unsubscribes=[],this.observerCount=0,this.task=Promise.resolve(),this.finalized=!1,this.onNoObservers=t,this.task.then(()=>{e(this)}).catch(n=>{this.error(n)})}next(e){this.forEachObserver(t=>{t.next(e)})}error(e){this.forEachObserver(t=>{t.error(e)}),this.close(e)}complete(){this.forEachObserver(e=>{e.complete()}),this.close()}subscribe(e,t,n){let s;if(e===void 0&&t===void 0&&n===void 0)throw new Error("Missing Observer.");Fy(e,["next","error","complete"])?s=e:s={next:e,error:t,complete:n},s.next===void 0&&(s.next=qc),s.error===void 0&&(s.error=qc),s.complete===void 0&&(s.complete=qc);let i=this.unsubscribeOne.bind(this,this.observers.length);return this.finalized&&this.task.then(()=>{try{this.finalError?s.error(this.finalError):s.complete()}catch{}}),this.observers.push(s),i}unsubscribeOne(e){this.observers===void 0||this.observers[e]===void 0||(delete this.observers[e],this.observerCount-=1,this.observerCount===0&&this.onNoObservers!==void 0&&this.onNoObservers(this))}forEachObserver(e){if(!this.finalized)for(let t=0;t<this.observers.length;t++)this.sendOne(t,e)}sendOne(e,t){this.task.then(()=>{if(this.observers!==void 0&&this.observers[e]!==void 0)try{t(this.observers[e])}catch(n){typeof console<"u"&&console.error&&console.error(n)}})}close(e){this.finalized||(this.finalized=!0,e!==void 0&&(this.finalError=e),this.task.then(()=>{this.observers=void 0,this.onNoObservers=void 0}))}};function Fy(r,e){if(typeof r!="object"||r===null)return!1;for(let t of e)if(t in r&&typeof r[t]=="function")return!0;return!1}function qc(){}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var RA=14400*1e3;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Oe(r){return r&&r._delegate?r._delegate:r}/**
 * @license
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Xr(r){try{return(r.startsWith("http://")||r.startsWith("https://")?new URL(r).hostname:r).endsWith(".cloudworkstations.dev")}catch{return!1}}async function Wc(r){return(await fetch(r,{credentials:"include"})).ok}/**
 * @license
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var Tt=class{constructor(e,t,n){this.name=e,this.instanceFactory=t,this.type=n,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(e){return this.instantiationMode=e,this}setMultipleInstances(e){return this.multipleInstances=e,this}setServiceProps(e){return this.serviceProps=e,this}setInstanceCreatedCallback(e){return this.onInstanceCreated=e,this}};/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var Xn="[DEFAULT]";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var Qc=class{constructor(e,t){this.name=e,this.container=t,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(e){let t=this.normalizeInstanceIdentifier(e);if(!this.instancesDeferred.has(t)){let n=new Wr;if(this.instancesDeferred.set(t,n),this.isInitialized(t)||this.shouldAutoInitialize())try{let s=this.getOrInitializeService({instanceIdentifier:t});s&&n.resolve(s)}catch{}}return this.instancesDeferred.get(t).promise}getImmediate(e){let t=this.normalizeInstanceIdentifier(e?.identifier),n=e?.optional??!1;if(this.isInitialized(t)||this.shouldAutoInitialize())try{return this.getOrInitializeService({instanceIdentifier:t})}catch(s){if(n)return null;throw s}else{if(n)return null;throw Error(`Service ${this.name} is not available`)}}getComponent(){return this.component}setComponent(e){if(e.name!==this.name)throw Error(`Mismatching Component ${e.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=e,!!this.shouldAutoInitialize()){if(ky(e))try{this.getOrInitializeService({instanceIdentifier:Xn})}catch{}for(let[t,n]of this.instancesDeferred.entries()){let s=this.normalizeInstanceIdentifier(t);try{let i=this.getOrInitializeService({instanceIdentifier:s});n.resolve(i)}catch{}}}}clearInstance(e=Xn){this.instancesDeferred.delete(e),this.instancesOptions.delete(e),this.instances.delete(e)}async delete(){let e=Array.from(this.instances.values());await Promise.all([...e.filter(t=>"INTERNAL"in t).map(t=>t.INTERNAL.delete()),...e.filter(t=>"_delete"in t).map(t=>t._delete())])}isComponentSet(){return this.component!=null}isInitialized(e=Xn){return this.instances.has(e)}getOptions(e=Xn){return this.instancesOptions.get(e)||{}}initialize(e={}){let{options:t={}}=e,n=this.normalizeInstanceIdentifier(e.instanceIdentifier);if(this.isInitialized(n))throw Error(`${this.name}(${n}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);let s=this.getOrInitializeService({instanceIdentifier:n,options:t});for(let[i,a]of this.instancesDeferred.entries()){let u=this.normalizeInstanceIdentifier(i);n===u&&a.resolve(s)}return s}onInit(e,t){let n=this.normalizeInstanceIdentifier(t),s=this.onInitCallbacks.get(n)??new Set;s.add(e),this.onInitCallbacks.set(n,s);let i=this.instances.get(n);return i&&e(i,n),()=>{s.delete(e)}}invokeOnInitCallbacks(e,t){let n=this.onInitCallbacks.get(t);if(n)for(let s of n)try{s(e,t)}catch{}}getOrInitializeService({instanceIdentifier:e,options:t={}}){let n=this.instances.get(e);if(!n&&this.component&&(n=this.component.instanceFactory(this.container,{instanceIdentifier:Ly(e),options:t}),this.instances.set(e,n),this.instancesOptions.set(e,t),this.invokeOnInitCallbacks(n,e),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,e,n)}catch{}return n||null}normalizeInstanceIdentifier(e=Xn){return this.component?this.component.multipleInstances?e:Xn:e}shouldAutoInitialize(){return!!this.component&&this.component.instantiationMode!=="EXPLICIT"}};function Ly(r){return r===Xn?void 0:r}function ky(r){return r.instantiationMode==="EAGER"}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var io=class{constructor(e){this.name=e,this.providers=new Map}addComponent(e){let t=this.getProvider(e.name);if(t.isComponentSet())throw new Error(`Component ${e.name} has already been registered with ${this.name}`);t.setComponent(e)}addOrOverwriteComponent(e){this.getProvider(e.name).isComponentSet()&&this.providers.delete(e.name),this.addComponent(e)}getProvider(e){if(this.providers.has(e))return this.providers.get(e);let t=new Qc(e,this);return this.providers.set(e,t),t}getProviders(){return Array.from(this.providers.values())}};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var Vy=[],ae;(function(r){r[r.DEBUG=0]="DEBUG",r[r.VERBOSE=1]="VERBOSE",r[r.INFO=2]="INFO",r[r.WARN=3]="WARN",r[r.ERROR=4]="ERROR",r[r.SILENT=5]="SILENT"})(ae||(ae={}));var My={debug:ae.DEBUG,verbose:ae.VERBOSE,info:ae.INFO,warn:ae.WARN,error:ae.ERROR,silent:ae.SILENT},Gy=ae.INFO,Uy={[ae.DEBUG]:"log",[ae.VERBOSE]:"log",[ae.INFO]:"info",[ae.WARN]:"warn",[ae.ERROR]:"error"},Hy=(r,e,...t)=>{if(e<r.logLevel)return;let n=new Date().toISOString(),s=Uy[e];if(s)console[s](`[${n}]  ${r.name}:`,...t);else throw new Error(`Attempted to log a message with an invalid logType (value: ${e})`)},Rn=class{constructor(e){this.name=e,this._logLevel=Gy,this._logHandler=Hy,this._userLogHandler=null,Vy.push(this)}get logLevel(){return this._logLevel}set logLevel(e){if(!(e in ae))throw new TypeError(`Invalid value "${e}" assigned to \`logLevel\``);this._logLevel=e}setLogLevel(e){this._logLevel=typeof e=="string"?My[e]:e}get logHandler(){return this._logHandler}set logHandler(e){if(typeof e!="function")throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=e}get userLogHandler(){return this._userLogHandler}set userLogHandler(e){this._userLogHandler=e}debug(...e){this._userLogHandler&&this._userLogHandler(this,ae.DEBUG,...e),this._logHandler(this,ae.DEBUG,...e)}log(...e){this._userLogHandler&&this._userLogHandler(this,ae.VERBOSE,...e),this._logHandler(this,ae.VERBOSE,...e)}info(...e){this._userLogHandler&&this._userLogHandler(this,ae.INFO,...e),this._logHandler(this,ae.INFO,...e)}warn(...e){this._userLogHandler&&this._userLogHandler(this,ae.WARN,...e),this._logHandler(this,ae.WARN,...e)}error(...e){this._userLogHandler&&this._userLogHandler(this,ae.ERROR,...e),this._logHandler(this,ae.ERROR,...e)}};var qy=(r,e)=>e.some(t=>r instanceof t),sC,iC;function jy(){return sC||(sC=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function Ky(){return iC||(iC=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}var aC=new WeakMap,Yc=new WeakMap,oC=new WeakMap,$c=new WeakMap,Zc=new WeakMap;function Jy(r){let e=new Promise((t,n)=>{let s=()=>{r.removeEventListener("success",i),r.removeEventListener("error",a)},i=()=>{t(Ht(r.result)),s()},a=()=>{n(r.error),s()};r.addEventListener("success",i),r.addEventListener("error",a)});return e.then(t=>{t instanceof IDBCursor&&aC.set(t,r)}).catch(()=>{}),Zc.set(e,r),e}function zy(r){if(Yc.has(r))return;let e=new Promise((t,n)=>{let s=()=>{r.removeEventListener("complete",i),r.removeEventListener("error",a),r.removeEventListener("abort",a)},i=()=>{t(),s()},a=()=>{n(r.error||new DOMException("AbortError","AbortError")),s()};r.addEventListener("complete",i),r.addEventListener("error",a),r.addEventListener("abort",a)});Yc.set(r,e)}var Xc={get(r,e,t){if(r instanceof IDBTransaction){if(e==="done")return Yc.get(r);if(e==="objectStoreNames")return r.objectStoreNames||oC.get(r);if(e==="store")return t.objectStoreNames[1]?void 0:t.objectStore(t.objectStoreNames[0])}return Ht(r[e])},set(r,e,t){return r[e]=t,!0},has(r,e){return r instanceof IDBTransaction&&(e==="done"||e==="store")?!0:e in r}};function uC(r){Xc=r(Xc)}function Wy(r){return r===IDBDatabase.prototype.transaction&&!("objectStoreNames"in IDBTransaction.prototype)?function(e,...t){let n=r.call(ao(this),e,...t);return oC.set(n,e.sort?e.sort():[e]),Ht(n)}:Ky().includes(r)?function(...e){return r.apply(ao(this),e),Ht(aC.get(this))}:function(...e){return Ht(r.apply(ao(this),e))}}function Qy(r){return typeof r=="function"?Wy(r):(r instanceof IDBTransaction&&zy(r),qy(r,jy())?new Proxy(r,Xc):r)}function Ht(r){if(r instanceof IDBRequest)return Jy(r);if($c.has(r))return $c.get(r);let e=Qy(r);return e!==r&&($c.set(r,e),Zc.set(e,r)),e}var ao=r=>Zc.get(r);function lC(r,e,{blocked:t,upgrade:n,blocking:s,terminated:i}={}){let a=indexedDB.open(r,e),u=Ht(a);return n&&a.addEventListener("upgradeneeded",c=>{n(Ht(a.result),c.oldVersion,c.newVersion,Ht(a.transaction),c)}),t&&a.addEventListener("blocked",c=>t(c.oldVersion,c.newVersion,c)),u.then(c=>{i&&c.addEventListener("close",()=>i()),s&&c.addEventListener("versionchange",l=>s(l.oldVersion,l.newVersion,l))}).catch(()=>{}),u}var $y=["get","getKey","getAll","getAllKeys","count"],Yy=["put","add","delete","clear"],el=new Map;function cC(r,e){if(!(r instanceof IDBDatabase&&!(e in r)&&typeof e=="string"))return;if(el.get(e))return el.get(e);let t=e.replace(/FromIndex$/,""),n=e!==t,s=Yy.includes(t);if(!(t in(n?IDBIndex:IDBObjectStore).prototype)||!(s||$y.includes(t)))return;let i=async function(a,...u){let c=this.transaction(a,s?"readwrite":"readonly"),l=c.store;return n&&(l=l.index(u.shift())),(await Promise.all([l[t](...u),s&&c.done]))[0]};return el.set(e,i),i}uC(r=>({...r,get:(e,t,n)=>cC(e,t)||r.get(e,t,n),has:(e,t)=>!!cC(e,t)||r.has(e,t)}));/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var nl=class{constructor(e){this.container=e}getPlatformInfoString(){return this.container.getProviders().map(t=>{if(Xy(t)){let n=t.getImmediate();return`${n.library}/${n.version}`}else return null}).filter(t=>t).join(" ")}};function Xy(r){return r.getComponent()?.type==="VERSION"}var rl="@firebase/app",BC="0.16.7";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var qt=new Rn("@firebase/app"),Zy="@firebase/app-compat",ew="@firebase/analytics-compat",tw="@firebase/analytics",nw="@firebase/app-check-compat",rw="@firebase/app-check",sw="@firebase/auth",iw="@firebase/auth-compat",aw="@firebase/crashlytics",ow="@firebase/database",uw="@firebase/data-connect",cw="@firebase/database-compat",lw="@firebase/functions",Bw="@firebase/functions-compat",hw="@firebase/installations",fw="@firebase/installations-compat",dw="@firebase/messaging",pw="@firebase/messaging-compat",Cw="@firebase/performance",gw="@firebase/performance-compat",mw="@firebase/remote-config",Ew="@firebase/remote-config-compat",_w="@firebase/storage",yw="@firebase/storage-compat",ww="@firebase/firestore",Dw="@firebase/ai",Iw="@firebase/firestore-compat",Tw="firebase",Aw="13.4.0";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var sl="[DEFAULT]",bw={[rl]:"fire-core",[Zy]:"fire-core-compat",[tw]:"fire-analytics",[ew]:"fire-analytics-compat",[rw]:"fire-app-check",[nw]:"fire-app-check-compat",[sw]:"fire-auth",[iw]:"fire-auth-compat",[aw]:"fire-cls",[ow]:"fire-rtdb",[uw]:"fire-data-connect",[cw]:"fire-rtdb-compat",[lw]:"fire-fn",[Bw]:"fire-fn-compat",[hw]:"fire-iid",[fw]:"fire-iid-compat",[dw]:"fire-fcm",[pw]:"fire-fcm-compat",[Cw]:"fire-perf",[gw]:"fire-perf-compat",[mw]:"fire-rc",[Ew]:"fire-rc-compat",[_w]:"fire-gcs",[yw]:"fire-gcs-compat",[ww]:"fire-fst",[Iw]:"fire-fst-compat",[Dw]:"fire-vertex","fire-js":"fire-js",[Tw]:"fire-js-all"};/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var uo=new Map,vw=new Map,il=new Map;function hC(r,e){try{r.container.addComponent(e)}catch(t){qt.debug(`Component ${e.name} failed to register with FirebaseApp ${r.name}`,t)}}function Sn(r){let e=r.name;if(il.has(e))return qt.debug(`There were multiple attempts to register component ${e}.`),!1;il.set(e,r);for(let t of uo.values())hC(t,r);for(let t of vw.values())hC(t,r);return!0}function co(r,e){let t=r.container.getProvider("heartbeat").getImmediate({optional:!0});return t&&t.triggerHeartbeat(),r.container.getProvider(e)}function gt(r){return r==null?!1:r.settings!==void 0}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var Rw={"no-app":"No Firebase App '{$appName}' has been created - call initializeApp() first","bad-app-name":"Illegal App name: '{$appName}'","duplicate-app":"Firebase App named '{$appName}' already exists with different {$mismatchedParam}. Existing: '{$oldValue}'. New: '{$newValue}'.","app-deleted":"Firebase App named '{$appName}' already deleted","server-app-deleted":"Firebase Server App has been deleted","no-options":"Need to provide options, when not being deployed to hosting via source.","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function.","idb-open":"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.","idb-get":"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.","idb-set":"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.","idb-delete":"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.","finalization-registry-not-supported":"FirebaseServerApp deleteOnDeref field defined but the JS runtime does not support FinalizationRegistry.","invalid-server-app-environment":"FirebaseServerApp is not for use in browser environments."},an=new rn("app","Firebase",Rw);/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var al=class{constructor(e,t,n){this._isDeleted=!1,this._options={...e},this._config={...t},this._name=t.name,this._automaticDataCollectionEnabled=t.automaticDataCollectionEnabled,this._container=n,this.container.addComponent(new Tt("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(e){this.checkDestroyed(),this._automaticDataCollectionEnabled=e}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(e){this._isDeleted=e}checkDestroyed(){if(this.isDeleted)throw an.create("app-deleted",{appName:this._name})}};/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var Pn=Aw;function ll(r,e={}){let t=r;typeof e!="object"&&(e={name:e});let n={name:sl,automaticDataCollectionEnabled:!0,...e},s=n.name;if(typeof s!="string"||!s)throw an.create("bad-app-name",{appName:String(s)});if(t||(t=Jc()),!t)throw an.create("no-options");let i=uo.get(s);if(i)if(sn(t,i.options)){if(sn(n,i.config))return i;throw an.create("duplicate-app",{appName:s,mismatchedParam:"config",oldValue:JSON.stringify(i.config),newValue:JSON.stringify(n)})}else throw an.create("duplicate-app",{appName:s,mismatchedParam:"options",oldValue:JSON.stringify(i.options),newValue:JSON.stringify(t)});let a=new io(s);for(let c of il.values())a.addComponent(c);let u=new al(t,n,a);return uo.set(s,u),u}function Bl(r=sl){let e=uo.get(r);if(!e&&r===sl&&Jc())return ll();if(!e)throw an.create("no-app",{appName:r});return e}function xt(r,e,t){let n=bw[r]??r;t&&(n+=`-${t}`);let s=n.match(/\s|\//),i=e.match(/\s|\//);if(s||i){let a=[`Unable to register library "${n}" with version "${e}":`];s&&a.push(`library name "${n}" contains illegal characters (whitespace or "/")`),s&&i&&a.push("and"),i&&a.push(`version name "${e}" contains illegal characters (whitespace or "/")`),qt.warn(a.join(" "));return}Sn(new Tt(`${n}-version`,()=>({library:n,version:e}),"VERSION"))}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var Sw="firebase-heartbeat-database",Pw=1,pi="firebase-heartbeat-store",tl=null;function CC(){return tl||(tl=lC(Sw,Pw,{upgrade:(r,e)=>{switch(e){case 0:try{r.createObjectStore(pi)}catch(t){console.warn(t)}}}}).catch(r=>{throw an.create("idb-open",{originalErrorMessage:r.message})})),tl}async function Nw(r){try{let t=(await CC()).transaction(pi),n=await t.objectStore(pi).get(gC(r));return await t.done,n}catch(e){if(e instanceof Ct)qt.warn(e.message);else{let t=an.create("idb-get",{originalErrorMessage:e?.message});qt.warn(t.message)}}}async function fC(r,e){try{let n=(await CC()).transaction(pi,"readwrite");await n.objectStore(pi).put(e,gC(r)),await n.done}catch(t){if(t instanceof Ct)qt.warn(t.message);else{let n=an.create("idb-set",{originalErrorMessage:t?.message});qt.warn(n.message)}}}function gC(r){return`${r.name}!${r.options.appId}`}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var Ow=1024,xw=30,ol=class{constructor(e){this.container=e,this._heartbeatsCache=null;let t=this.container.getProvider("app").getImmediate();this._storage=new ul(t),this._heartbeatsCachePromise=this._storage.read().then(n=>(this._heartbeatsCache=n,n))}async triggerHeartbeat(){try{let t=this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),n=dC();if(this._heartbeatsCache?.heartbeats==null&&(this._heartbeatsCache=await this._heartbeatsCachePromise,this._heartbeatsCache?.heartbeats==null)||this._heartbeatsCache.lastSentHeartbeatDate===n||this._heartbeatsCache.heartbeats.some(s=>s.date===n))return;if(this._heartbeatsCache.heartbeats.push({date:n,agent:t}),this._heartbeatsCache.heartbeats.length>xw){let s=Lw(this._heartbeatsCache.heartbeats);this._heartbeatsCache.heartbeats.splice(s,1)}return this._storage.overwrite(this._heartbeatsCache)}catch(e){qt.warn(e)}}async getHeartbeatsHeader(){try{if(this._heartbeatsCache===null&&await this._heartbeatsCachePromise,this._heartbeatsCache?.heartbeats==null||this._heartbeatsCache.heartbeats.length===0)return"";let e=dC(),{heartbeatsToSend:t,unsentEntries:n}=Fw(this._heartbeatsCache.heartbeats),s=di(JSON.stringify({version:2,heartbeats:t}));return this._heartbeatsCache.lastSentHeartbeatDate=e,n.length>0?(this._heartbeatsCache.heartbeats=n,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),s}catch(e){return qt.warn(e),""}}};function dC(){return new Date().toISOString().substring(0,10)}function Fw(r,e=Ow){let t=[],n=r.slice();for(let s of r){let i=t.find(a=>a.agent===s.agent);if(i){if(i.dates.push(s.date),pC(t)>e){i.dates.pop();break}}else if(t.push({agent:s.agent,dates:[s.date]}),pC(t)>e){t.pop();break}n=n.slice(1)}return{heartbeatsToSend:t,unsentEntries:n}}var ul=class{constructor(e){this.app=e,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return zc()?tC().then(()=>!0).catch(()=>!1):!1}async read(){if(await this._canUseIndexedDBPromise){let t=await Nw(this.app);return t?.heartbeats?t:{heartbeats:[]}}else return{heartbeats:[]}}async overwrite(e){if(await this._canUseIndexedDBPromise){let n=await this.read();return fC(this.app,{lastSentHeartbeatDate:e.lastSentHeartbeatDate??n.lastSentHeartbeatDate,heartbeats:e.heartbeats})}else return}async add(e){if(await this._canUseIndexedDBPromise){let n=await this.read();return fC(this.app,{lastSentHeartbeatDate:e.lastSentHeartbeatDate??n.lastSentHeartbeatDate,heartbeats:[...n.heartbeats,...e.heartbeats]})}else return}};function pC(r){return di(JSON.stringify({version:2,heartbeats:r})).length}function Lw(r){if(r.length===0)return-1;let e=0,t=r[0].date;for(let n=1;n<r.length;n++)r[n].date<t&&(t=r[n].date,e=n);return e}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function kw(r){Sn(new Tt("platform-logger",e=>new nl(e),"PRIVATE")),Sn(new Tt("heartbeat",e=>new ol(e),"PRIVATE")),xt(rl,BC,r),xt(rl,BC,"esm2020"),xt("fire-js","")}/**
 * @license
 * Copyright 2026 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var cl="firebase-js-sdk-policy",Vw=["https://www.googletagmanager.com/gtag/js","https://apis.google.com/js/api.js","https://www.google.com/recaptcha/api.js","https://www.google.com/recaptcha/enterprise.js"],oo,mC=!1;function EC(r){if(!Vw.some(t=>r.startsWith(t)&&(r.length===t.length||r.charAt(t.length)==="?")))throw new TypeError(`Firebase: Refusing to load untrusted script URL: ${r}`);return r}function Mw(){if(oo===void 0){oo=null;let r=typeof window<"u"?window.trustedTypes:void 0;if(r?.createPolicy)try{oo=r.createPolicy(cl,{createScriptURL:EC})}catch{mC=!0}}return oo}function _C(r,e){EC(e);let t=Mw();if(t){r.src=t.createScriptURL(e);return}try{r.src=e}catch(n){throw mC&&qt.error(`Unable to load ${e} because this page requires Trusted Types for scripts but does not allow the "${cl}" Trusted Types policy. To fix this, add "${cl}" to the trusted-types directive of the page's Content-Security-Policy.`),n}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */kw("");var Gw="firebase",Uw="13.4.0";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */xt(Gw,Uw,"app");/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function MC(){return{"dependent-sdk-initialized-before-auth":"Another Firebase SDK was initialized and is trying to use Auth before Auth is initialized. Please be sure to call `initializeAuth` or `getAuth` before starting any other Firebase SDK."}}var GC=MC,UC=new rn("auth","Firebase",MC());/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var mo=new Rn("@firebase/auth");function Bo(r,...e){mo.logLevel<=ae.WARN&&mo.warn(`Auth (${Pn}): ${r}`,...e)}function ho(r,...e){mo.logLevel<=ae.ERROR&&mo.error(`Auth (${Pn}): ${r}`,...e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function At(r,...e){throw Ll(r,...e)}function Ft(r,...e){return Ll(r,...e)}function Mo(r,e,t){let n={...GC(),[e]:t};return new rn("auth","Firebase",n).create(e,{appName:r.name})}function Zn(r){return Mo(r,"operation-not-supported-in-this-environment","Operations that alter the current user are not supported in conjunction with FirebaseServerApp")}function Hw(r,e,t){let n=t;if(!(e instanceof n))throw n.name!==e.constructor.name&&At(r,"argument-error"),Mo(r,"argument-error",`Type of ${e.constructor.name} does not match expected instance.Did you pass a reference from a different Auth SDK?`)}function Ll(r,...e){if(typeof r!="string"){let t=e[0],n=[...e.slice(1)];return n[0]&&(n[0].appName=r.name),r._errorFactory.create(t,...n)}return UC.create(r,...e)}function Y(r,e,...t){if(!r)throw Ll(e,...t)}function jt(r){let e="INTERNAL ASSERTION FAILED: "+r;throw ho(e),new Error(e)}function un(r,e){r||jt(e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function gl(){return typeof self<"u"&&self.location?.href||""}function qw(){return yC()==="http:"||yC()==="https:"}function yC(){return typeof self<"u"&&self.location?.protocol||null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function jw(){return typeof navigator<"u"&&navigator&&"onLine"in navigator&&typeof navigator.onLine=="boolean"&&(qw()||Yp()||"connection"in navigator)?navigator.onLine:!0}function Kw(){if(typeof navigator>"u")return null;let r=navigator;return r.languages&&r.languages[0]||r.language||null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var er=class{constructor(e,t){this.shortDelay=e,this.longDelay=t,un(t>e,"Short delay should be less than long delay!"),this.isMobile=Qp()||Xp()}get(){return jw()?this.isMobile?this.longDelay:this.shortDelay:Math.min(5e3,this.shortDelay)}};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function kl(r,e){un(r.emulator,"Emulator should always be set here");let{url:t}=r.emulator;return e?`${t}${e.startsWith("/")?e.slice(1):e}`:t}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var Eo=class{static initialize(e,t,n){this.fetchImpl=e,t&&(this.headersImpl=t),n&&(this.responseImpl=n)}static fetch(){if(this.fetchImpl)return this.fetchImpl;if(typeof self<"u"&&"fetch"in self)return self.fetch;if(typeof globalThis<"u"&&globalThis.fetch)return globalThis.fetch;if(typeof fetch<"u")return fetch;jt("Could not find fetch implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static headers(){if(this.headersImpl)return this.headersImpl;if(typeof self<"u"&&"Headers"in self)return self.Headers;if(typeof globalThis<"u"&&globalThis.Headers)return globalThis.Headers;if(typeof Headers<"u")return Headers;jt("Could not find Headers implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static response(){if(this.responseImpl)return this.responseImpl;if(typeof self<"u"&&"Response"in self)return self.Response;if(typeof globalThis<"u"&&globalThis.Response)return globalThis.Response;if(typeof Response<"u")return Response;jt("Could not find Response implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var Jw={CREDENTIAL_MISMATCH:"custom-token-mismatch",MISSING_CUSTOM_TOKEN:"internal-error",INVALID_IDENTIFIER:"invalid-email",MISSING_CONTINUE_URI:"internal-error",INVALID_PASSWORD:"wrong-password",MISSING_PASSWORD:"missing-password",INVALID_LOGIN_CREDENTIALS:"invalid-credential",EMAIL_EXISTS:"email-already-in-use",PASSWORD_LOGIN_DISABLED:"operation-not-allowed",INVALID_IDP_RESPONSE:"invalid-credential",INVALID_PENDING_TOKEN:"invalid-credential",FEDERATED_USER_ID_ALREADY_LINKED:"credential-already-in-use",MISSING_REQ_TYPE:"internal-error",EMAIL_NOT_FOUND:"user-not-found",RESET_PASSWORD_EXCEED_LIMIT:"too-many-requests",EXPIRED_OOB_CODE:"expired-action-code",INVALID_OOB_CODE:"invalid-action-code",MISSING_OOB_CODE:"internal-error",CREDENTIAL_TOO_OLD_LOGIN_AGAIN:"requires-recent-login",INVALID_ID_TOKEN:"invalid-user-token",TOKEN_EXPIRED:"user-token-expired",USER_NOT_FOUND:"user-token-expired",TOO_MANY_ATTEMPTS_TRY_LATER:"too-many-requests",PASSWORD_DOES_NOT_MEET_REQUIREMENTS:"password-does-not-meet-requirements",INVALID_CODE:"invalid-verification-code",INVALID_SESSION_INFO:"invalid-verification-id",INVALID_TEMPORARY_PROOF:"invalid-credential",MISSING_SESSION_INFO:"missing-verification-id",SESSION_EXPIRED:"code-expired",MISSING_ANDROID_PACKAGE_NAME:"missing-android-pkg-name",UNAUTHORIZED_DOMAIN:"unauthorized-continue-uri",INVALID_OAUTH_CLIENT_ID:"invalid-oauth-client-id",ADMIN_ONLY_OPERATION:"admin-restricted-operation",INVALID_MFA_PENDING_CREDENTIAL:"invalid-multi-factor-session",MFA_ENROLLMENT_NOT_FOUND:"multi-factor-info-not-found",MISSING_MFA_ENROLLMENT_ID:"missing-multi-factor-info",MISSING_MFA_PENDING_CREDENTIAL:"missing-multi-factor-session",SECOND_FACTOR_EXISTS:"second-factor-already-in-use",SECOND_FACTOR_LIMIT_EXCEEDED:"maximum-second-factor-count-exceeded",BLOCKING_FUNCTION_ERROR_RESPONSE:"internal-error",RECAPTCHA_NOT_ENABLED:"recaptcha-not-enabled",MISSING_RECAPTCHA_TOKEN:"missing-recaptcha-token",INVALID_RECAPTCHA_TOKEN:"invalid-recaptcha-token",INVALID_RECAPTCHA_ACTION:"invalid-recaptcha-action",MISSING_CLIENT_TYPE:"missing-client-type",MISSING_RECAPTCHA_VERSION:"missing-recaptcha-version",INVALID_RECAPTCHA_VERSION:"invalid-recaptcha-version",INVALID_REQ_TYPE:"invalid-req-type"};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var zw=["/v1/accounts:signInWithCustomToken","/v1/accounts:signInWithEmailLink","/v1/accounts:signInWithIdp","/v1/accounts:signInWithPassword","/v1/accounts:signInWithPhoneNumber","/v1/token"],Ww=new er(3e4,6e4);function Ve(r,e){return r.tenantId&&!e.tenantId?{...e,tenantId:r.tenantId}:e}async function Ye(r,e,t,n,s={}){return HC(r,s,async()=>{let i={},a={};n&&(e==="GET"?a=n:i={body:JSON.stringify(n)});let u=Qr({...a,key:r.config.apiKey}).slice(1),c=await r._getAdditionalHeaders();c["Content-Type"]="application/json",r.languageCode&&(c["X-Firebase-Locale"]=r.languageCode);let l={method:e,headers:c,...i};return $p()||(l.referrerPolicy="strict-origin-when-cross-origin"),r.emulatorConfig&&Xr(r.emulatorConfig.host)&&(l.credentials="include"),Eo.fetch()(await qC(r,r.config.apiHost,t,u),l)})}async function HC(r,e,t){r._canInitEmulator=!1;let n={...Jw,...e};try{let s=new ml(r),i=await Promise.race([t(),s.promise]);s.clearNetworkTimeout();let a=await i.json();if("needConfirmation"in a)throw gi(r,"account-exists-with-different-credential",a);if(i.ok&&!("errorMessage"in a))return a;{let u=i.ok?a.errorMessage:a.error.message,[c,l]=u.split(" : ");if(c==="FEDERATED_USER_ID_ALREADY_LINKED")throw gi(r,"credential-already-in-use",a);if(c==="EMAIL_EXISTS")throw gi(r,"email-already-in-use",a);if(c==="USER_DISABLED")throw gi(r,"user-disabled",a);let h=n[c]||c.toLowerCase().replace(/[_\s]+/g,"-");if(l)throw Mo(r,h,l);At(r,h)}}catch(s){if(s instanceof Ct)throw s;At(r,"network-request-failed",{message:String(s)})}}async function ar(r,e,t,n,s={}){let i=await Ye(r,e,t,n,s);return"mfaPendingCredential"in i&&At(r,"multi-factor-auth-required",{_serverResponse:i}),i}async function qC(r,e,t,n){let s=`${e}${t}?${n}`,i=r,a=i.config.emulator?kl(r.config,s):`${r.config.apiScheme}://${s}`;return zw.includes(t)&&(await i._persistenceManagerAvailable,i._getPersistenceType()==="COOKIE")?i._getPersistence()._getFinalTarget(a).toString():a}function Qw(r){switch(r){case"ENFORCE":return"ENFORCE";case"AUDIT":return"AUDIT";case"OFF":return"OFF";default:return"ENFORCEMENT_STATE_UNSPECIFIED"}}var ml=class{clearNetworkTimeout(){clearTimeout(this.timer)}constructor(e){this.auth=e,this.timer=null,this.promise=new Promise((t,n)=>{this.timer=setTimeout(()=>n(Ft(this.auth,"network-request-failed")),Ww.get())})}};function gi(r,e,t){let n={appName:r.name};t.email&&(n.email=t.email),t.phoneNumber&&(n.phoneNumber=t.phoneNumber);let s=Ft(r,e,n);return s.customData._tokenResponse=t,s}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function wC(r){return r!==void 0&&r.enterprise!==void 0}var _o=class{constructor(e){if(this.siteKey="",this.recaptchaEnforcementState=[],e.recaptchaKey===void 0)throw new Error("recaptchaKey undefined");this.siteKey=e.recaptchaKey.split("/")[3],this.recaptchaEnforcementState=e.recaptchaEnforcementState}getProviderEnforcementState(e){if(!this.recaptchaEnforcementState||this.recaptchaEnforcementState.length===0)return null;for(let t of this.recaptchaEnforcementState)if(t.provider&&t.provider===e)return Qw(t.enforcementState);return null}isProviderEnabled(e){return this.getProviderEnforcementState(e)==="ENFORCE"||this.getProviderEnforcementState(e)==="AUDIT"}isAnyProviderEnabled(){return this.isProviderEnabled("EMAIL_PASSWORD_PROVIDER")||this.isProviderEnabled("PHONE_PROVIDER")}};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function jC(r,e){return Ye(r,"GET","/v2/recaptchaConfig",Ve(r,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function $w(r,e){return Ye(r,"POST","/v1/accounts:delete",e)}async function yo(r,e){return Ye(r,"POST","/v1/accounts:lookup",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function mi(r){if(r)try{let e=new Date(Number(r));if(!isNaN(e.getTime()))return e.toUTCString()}catch{}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function KC(r,e=!1){let t=Oe(r),n=await t.getIdToken(e),s=Vl(n);Y(s&&s.exp&&s.auth_time&&s.iat,t.auth,"internal-error");let i=typeof s.firebase=="object"?s.firebase:void 0,a=i?.sign_in_provider;return{claims:s,token:n,authTime:mi(hl(s.auth_time)),issuedAtTime:mi(hl(s.iat)),expirationTime:mi(hl(s.exp)),signInProvider:a||null,signInSecondFactor:i?.sign_in_second_factor||null}}function hl(r){return Number(r)*1e3}function Vl(r){let[e,t,n]=r.split(".");if(e===void 0||t===void 0||n===void 0)return ho("JWT malformed, contained fewer than 3 sections"),null;try{let s=ro(t);return s?JSON.parse(s):(ho("Failed to decode base64 JWT payload"),null)}catch(s){return ho("Caught error parsing JWT payload as JSON",s?.toString()),null}}function DC(r){let e=Vl(r);return Y(e,"internal-error"),Y(typeof e.exp<"u","internal-error"),Y(typeof e.iat<"u","internal-error"),Number(e.exp)-Number(e.iat)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Ii(r,e,t=!1){if(t)return e;try{return await e}catch(n){throw JC(n)&&r.auth.currentUser===r&&await r.auth.signOut(),n}}function JC(r){return r instanceof Ct?r.code==="auth/user-disabled"||r.code==="auth/user-token-expired":!1}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var El=class{constructor(e){this.user=e,this.isRunning=!1,this.timerId=null,this.errorBackoff=3e4}_start(){this.isRunning||(this.isRunning=!0,this.schedule())}_stop(){this.isRunning&&(this.isRunning=!1,this.timerId!==null&&clearTimeout(this.timerId))}getInterval(e){if(e){let t=this.errorBackoff;return this.errorBackoff=Math.min(this.errorBackoff*2,96e4),t}else{this.errorBackoff=3e4;let n=(this.user.stsTokenManager.expirationTime??0)-Date.now()-3e5;return Math.max(0,n)}}schedule(e=!1){if(!this.isRunning)return;let t=this.getInterval(e);this.timerId=setTimeout(async()=>{await this.iteration()},t)}async iteration(){try{await this.user.getIdToken(!0)}catch(e){e?.code==="auth/network-request-failed"&&this.schedule(!0);return}this.schedule()}};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var Ti=class{constructor(e,t){this.createdAt=e,this.lastLoginAt=t,this._initializeTime()}_initializeTime(){this.lastSignInTime=mi(this.lastLoginAt),this.creationTime=mi(this.createdAt)}_copy(e){this.createdAt=e.createdAt,this.lastLoginAt=e.lastLoginAt,this._initializeTime()}toJSON(){return{createdAt:this.createdAt,lastLoginAt:this.lastLoginAt}}};/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function wo(r){let e=r.auth,t=await r.getIdToken(),n=await Ii(r,yo(e,{idToken:t}));Y(n?.users.length,e,"internal-error");let s=n.users[0];r._notifyReloadListener(s);let i=s.providerUserInfo?.length?WC(s.providerUserInfo):[],a=Yw(r.providerData,i),u=r.isAnonymous,c=!(r.email&&s.passwordHash)&&!a?.length,l=u?c:!1,h={uid:s.localId,displayName:s.displayName||null,photoURL:s.photoUrl||null,email:s.email||null,emailVerified:s.emailVerified||!1,phoneNumber:s.phoneNumber||null,tenantId:s.tenantId||null,providerData:a,metadata:new Ti(s.createdAt,s.lastLoginAt),isAnonymous:l};Object.assign(r,h)}async function zC(r){let e=Oe(r);await wo(e),await e.auth._persistUserIfCurrent(e),e.auth._notifyListenersIfCurrent(e)}function Yw(r,e){return[...r.filter(n=>!e.some(s=>s.providerId===n.providerId)),...e]}function WC(r){return r.map(({providerId:e,...t})=>({providerId:e,uid:t.rawId||"",displayName:t.displayName||null,email:t.email||null,phoneNumber:t.phoneNumber||null,photoURL:t.photoUrl||null}))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Xw(r,e){let t=await HC(r,{},async()=>{let n=Qr({grant_type:"refresh_token",refresh_token:e}).slice(1),{tokenApiHost:s,apiKey:i}=r.config,a=await qC(r,s,"/v1/token",`key=${i}`),u=await r._getAdditionalHeaders();u["Content-Type"]="application/x-www-form-urlencoded";let c={method:"POST",headers:u,body:n};return r.emulatorConfig&&Xr(r.emulatorConfig.host)&&(c.credentials="include"),Eo.fetch()(a,c)});return{accessToken:t.access_token,expiresIn:t.expires_in,refreshToken:t.refresh_token}}async function Zw(r,e){return Ye(r,"POST","/v2/accounts:revokeToken",Ve(r,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var Ei=class r{constructor(){this.refreshToken=null,this.accessToken=null,this.expirationTime=null}get isExpired(){return!this.expirationTime||Date.now()>this.expirationTime-3e5}updateFromServerResponse(e){Y(e.idToken,"internal-error"),Y(typeof e.idToken<"u","internal-error"),Y(typeof e.refreshToken<"u","internal-error");let t="expiresIn"in e&&typeof e.expiresIn<"u"?Number(e.expiresIn):DC(e.idToken);this.updateTokensAndExpiration(e.idToken,e.refreshToken,t)}updateFromIdToken(e){Y(e.length!==0,"internal-error");let t=DC(e);this.updateTokensAndExpiration(e,null,t)}async getToken(e,t=!1){return!t&&this.accessToken&&!this.isExpired?this.accessToken:(Y(this.refreshToken,e,"user-token-expired"),this.refreshToken?(await this.refresh(e,this.refreshToken),this.accessToken):null)}clearRefreshToken(){this.refreshToken=null}async refresh(e,t){let{accessToken:n,refreshToken:s,expiresIn:i}=await Xw(e,t);this.updateTokensAndExpiration(n,s,Number(i))}updateTokensAndExpiration(e,t,n){this.refreshToken=t||null,this.accessToken=e||null,this.expirationTime=Date.now()+n*1e3}static fromJSON(e,t){let{refreshToken:n,accessToken:s,expirationTime:i}=t,a=new r;return n&&(Y(typeof n=="string","internal-error",{appName:e}),a.refreshToken=n),s&&(Y(typeof s=="string","internal-error",{appName:e}),a.accessToken=s),i&&(Y(typeof i=="number","internal-error",{appName:e}),a.expirationTime=i),a}toJSON(){return{refreshToken:this.refreshToken,accessToken:this.accessToken,expirationTime:this.expirationTime}}_assign(e){this.accessToken=e.accessToken,this.refreshToken=e.refreshToken,this.expirationTime=e.expirationTime}_clone(){return Object.assign(new r,this.toJSON())}_performRefresh(){return jt("not implemented")}};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Nn(r,e){Y(typeof r=="string"||typeof r>"u","internal-error",{appName:e})}var On=class r{constructor({uid:e,auth:t,stsTokenManager:n,...s}){this.providerId="firebase",this.proactiveRefresh=new El(this),this.reloadUserInfo=null,this.reloadListener=null,this.uid=e,this.auth=t,this.stsTokenManager=n,this.accessToken=n.accessToken,this.displayName=s.displayName||null,this.email=s.email||null,this.emailVerified=s.emailVerified||!1,this.phoneNumber=s.phoneNumber||null,this.photoURL=s.photoURL||null,this.isAnonymous=s.isAnonymous||!1,this.tenantId=s.tenantId||null,this.providerData=s.providerData?[...s.providerData]:[],this.metadata=new Ti(s.createdAt||void 0,s.lastLoginAt||void 0)}async getIdToken(e){let t=await Ii(this,this.stsTokenManager.getToken(this.auth,e));return Y(t,this.auth,"internal-error"),this.accessToken!==t&&(this.accessToken=t,await this.auth._persistUserIfCurrent(this),this.auth._notifyListenersIfCurrent(this)),t}getIdTokenResult(e){return KC(this,e)}reload(){return zC(this)}_assign(e){this!==e&&(Y(this.uid===e.uid,this.auth,"internal-error"),this.displayName=e.displayName,this.photoURL=e.photoURL,this.email=e.email,this.emailVerified=e.emailVerified,this.phoneNumber=e.phoneNumber,this.isAnonymous=e.isAnonymous,this.tenantId=e.tenantId,this.providerData=e.providerData.map(t=>({...t})),this.metadata._copy(e.metadata),this.stsTokenManager._assign(e.stsTokenManager))}_clone(e){let t=new r({...this,auth:e,stsTokenManager:this.stsTokenManager._clone()});return t.metadata._copy(this.metadata),t}_onReload(e){Y(!this.reloadListener,this.auth,"internal-error"),this.reloadListener=e,this.reloadUserInfo&&(this._notifyReloadListener(this.reloadUserInfo),this.reloadUserInfo=null)}_notifyReloadListener(e){this.reloadListener?this.reloadListener(e):this.reloadUserInfo=e}_startProactiveRefresh(){this.proactiveRefresh._start()}_stopProactiveRefresh(){this.proactiveRefresh._stop()}async _updateTokensIfNecessary(e,t=!1){let n=!1;e.idToken&&e.idToken!==this.stsTokenManager.accessToken&&(this.stsTokenManager.updateFromServerResponse(e),n=!0),t&&await wo(this),await this.auth._persistUserIfCurrent(this),n&&this.auth._notifyListenersIfCurrent(this)}async delete(){if(gt(this.auth.app))return Promise.reject(Zn(this.auth));let e=await this.getIdToken();return await Ii(this,$w(this.auth,{idToken:e})),this.stsTokenManager.clearRefreshToken(),this.auth.signOut()}toJSON(){return{uid:this.uid,email:this.email||void 0,emailVerified:this.emailVerified,displayName:this.displayName||void 0,isAnonymous:this.isAnonymous,photoURL:this.photoURL||void 0,phoneNumber:this.phoneNumber||void 0,tenantId:this.tenantId||void 0,providerData:this.providerData.map(e=>({...e})),stsTokenManager:this.stsTokenManager.toJSON(),_redirectEventId:this._redirectEventId,...this.metadata.toJSON(),apiKey:this.auth.config.apiKey,appName:this.auth.name}}get refreshToken(){return this.stsTokenManager.refreshToken||""}static _fromJSON(e,t){let n=t.displayName??void 0,s=t.email??void 0,i=t.phoneNumber??void 0,a=t.photoURL??void 0,u=t.tenantId??void 0,c=t._redirectEventId??void 0,l=t.createdAt??void 0,h=t.lastLoginAt??void 0,{uid:d,emailVerified:C,isAnonymous:y,providerData:D,stsTokenManager:P}=t;Y(d&&P,e,"internal-error");let V=Ei.fromJSON(this.name,P);Y(typeof d=="string",e,"internal-error"),Nn(n,e.name),Nn(s,e.name),Y(typeof C=="boolean",e,"internal-error"),Y(typeof y=="boolean",e,"internal-error"),Nn(i,e.name),Nn(a,e.name),Nn(u,e.name),Nn(c,e.name),Nn(l,e.name),Nn(h,e.name);let q=new r({uid:d,auth:e,email:s,emailVerified:C,displayName:n,isAnonymous:y,photoURL:a,phoneNumber:i,tenantId:u,stsTokenManager:V,createdAt:l,lastLoginAt:h});return D&&Array.isArray(D)&&(q.providerData=D.map(W=>({...W}))),c&&(q._redirectEventId=c),q}static async _fromIdTokenResponse(e,t,n=!1){let s=new Ei;s.updateFromServerResponse(t);let i=new r({uid:t.localId,auth:e,stsTokenManager:s,isAnonymous:n});return await wo(i),i}static async _fromGetAccountInfoResponse(e,t,n){let s=t.users[0];Y(s.localId!==void 0,"internal-error");let i=s.providerUserInfo!==void 0?WC(s.providerUserInfo):[],a=!(s.email&&s.passwordHash)&&!i?.length,u=new Ei;u.updateFromIdToken(n);let c=new r({uid:s.localId,auth:e,stsTokenManager:u,isAnonymous:a}),l={uid:s.localId,displayName:s.displayName||null,photoURL:s.photoUrl||null,email:s.email||null,emailVerified:s.emailVerified||!1,phoneNumber:s.phoneNumber||null,tenantId:s.tenantId||null,providerData:i,metadata:new Ti(s.createdAt,s.lastLoginAt),isAnonymous:!(s.email&&s.passwordHash)&&!i?.length};return Object.assign(c,l),c}};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var IC=new Map;function on(r){un(r instanceof Function,"Expected a class definition");let e=IC.get(r);return e?(un(e instanceof r,"Instance stored in cache mismatched with class"),e):(e=new r,IC.set(r,e),e)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var Do=class{constructor(){this.type="NONE",this.storage={}}async _isAvailable(){return!0}async _set(e,t){this.storage[e]=t}async _get(e){let t=this.storage[e];return t===void 0?null:t}async _remove(e){delete this.storage[e]}_addListener(e,t){}_removeListener(e,t){}};Do.type="NONE";var _l=Do;/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function fo(r,e,t){return`firebase:${r}:${e}:${t}`}var _i=class r{constructor(e,t,n){this.persistence=e,this.auth=t,this.userKey=n;let{config:s,name:i}=this.auth;this.fullUserKey=fo(this.userKey,s.apiKey,i),this.fullPersistenceKey=fo("persistence",s.apiKey,i),this.boundEventHandler=t._onStorageEvent.bind(t);try{this.persistence._addListener(this.fullUserKey,this.boundEventHandler)}catch{}}setCurrentUser(e){return this.persistence._set(this.fullUserKey,e.toJSON())}async getCurrentUser(){let e=await this.persistence._get(this.fullUserKey);if(!e)return null;if(typeof e=="string"){let t=await yo(this.auth,{idToken:e}).catch(()=>{});return t?On._fromGetAccountInfoResponse(this.auth,t,e):null}return On._fromJSON(this.auth,e)}removeCurrentUser(){return this.persistence._remove(this.fullUserKey)}savePersistenceForRedirect(){return this.persistence._set(this.fullPersistenceKey,this.persistence.type)}async setPersistence(e){if(this.persistence===e)return;let t=await this.getCurrentUser();if(await this.removeCurrentUser(),this.persistence=e,t)return this.setCurrentUser(t)}delete(){try{this.persistence._removeListener(this.fullUserKey,this.boundEventHandler)}catch{}}static async create(e,t,n="authUser"){if(!t.length)return new r(on(_l),e,n);let s=fo(n,e.config.apiKey,e.name),i=null,a=null,u=new Set;for(let C of t){let y=null;try{y=await C._get(s)}catch{u.add(C);continue}try{if(y){let D;if(typeof y=="string"){let P=await yo(e,{idToken:y}).catch(()=>{});if(!P)break;D=await On._fromGetAccountInfoResponse(e,P,y)}else D=On._fromJSON(e,y);i=D,a=C;break}}catch{}}let c=(await Promise.all(t.map(async C=>{try{if(await C._isAvailable())return C;C._lastProbeTimedOut&&u.add(C)}catch{return}}))).filter(C=>C),l=c[0]||on(_l),h=null;a&&i&&(a!==l&&(h=i),l=a);let d=c.filter(C=>C._shouldAllowMigration);return!l._shouldAllowMigration||!d.length?new r(l,e,n):(l=d[0],h&&await l._set(s,h.toJSON()),await Promise.all(t.map(async C=>{if(C!==l&&!u.has(C))try{await C._remove(s)}catch{}})),new r(l,e,n))}};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function TC(r){let e=r.toLowerCase();if(e.includes("opera/")||e.includes("opr/")||e.includes("opios/"))return"Opera";if(XC(e))return"IEMobile";if(e.includes("msie")||e.includes("trident/"))return"IE";if(e.includes("edge/"))return"Edge";if(QC(e))return"Firefox";if(e.includes("silk/"))return"Silk";if(eg(e))return"Blackberry";if(tg(e))return"Webos";if($C(e))return"Safari";if((e.includes("chrome/")||YC(e))&&!e.includes("edge/"))return"Chrome";if(ZC(e))return"Android";{let t=/([a-zA-Z\d\.]+)\/[a-zA-Z\d\.]*$/,n=r.match(t);if(n?.length===2)return n[1]}return"Other"}function QC(r=ke()){return/firefox\//i.test(r)}function $C(r=ke()){let e=r.toLowerCase();return e.includes("safari/")&&!e.includes("chrome/")&&!e.includes("crios/")&&!e.includes("android")}function YC(r=ke()){return/crios\//i.test(r)}function XC(r=ke()){return/iemobile/i.test(r)}function ZC(r=ke()){return/android/i.test(r)}function eg(r=ke()){return/blackberry/i.test(r)}function tg(r=ke()){return/webos/i.test(r)}function Ml(r=ke()){return/iphone|ipad|ipod/i.test(r)||/macintosh/i.test(r)&&/mobile/i.test(r)}function eD(r=ke()){return Ml(r)&&!!window.navigator?.standalone}function tD(){return Zp()&&document.documentMode===10}function ng(r=ke()){return Ml(r)||ZC(r)||tg(r)||eg(r)||/windows phone/i.test(r)||XC(r)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function rg(r,e=[]){let t;switch(r){case"Browser":t=TC(ke());break;case"Worker":t=`${TC(ke())}-${r}`;break;default:t=r}let n=e.length?e.join(","):"FirebaseCore-web";return`${t}/JsCore/${Pn}/${n}`}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var yl=class{constructor(e){this.auth=e,this.queue=[]}pushCallback(e,t){let n=i=>new Promise((a,u)=>{try{let c=e(i);a(c)}catch(c){u(c)}});n.onAbort=t,this.queue.push(n);let s=this.queue.length-1;return()=>{this.queue[s]=()=>Promise.resolve()}}async runMiddleware(e){if(this.auth.currentUser===e)return;let t=[];try{for(let n of this.queue)await n(e),n.onAbort&&t.push(n.onAbort)}catch(n){t.reverse();for(let s of t)try{s()}catch{}throw this.auth._errorFactory.create("login-blocked",{originalMessage:n?.message})}}};/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function nD(r,e={}){return Ye(r,"GET","/v2/passwordPolicy",Ve(r,e))}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var rD=6,wl=class{constructor(e){let t=e.customStrengthOptions;this.customStrengthOptions={},this.customStrengthOptions.minPasswordLength=t.minPasswordLength??rD,t.maxPasswordLength&&(this.customStrengthOptions.maxPasswordLength=t.maxPasswordLength),t.containsLowercaseCharacter!==void 0&&(this.customStrengthOptions.containsLowercaseLetter=t.containsLowercaseCharacter),t.containsUppercaseCharacter!==void 0&&(this.customStrengthOptions.containsUppercaseLetter=t.containsUppercaseCharacter),t.containsNumericCharacter!==void 0&&(this.customStrengthOptions.containsNumericCharacter=t.containsNumericCharacter),t.containsNonAlphanumericCharacter!==void 0&&(this.customStrengthOptions.containsNonAlphanumericCharacter=t.containsNonAlphanumericCharacter),this.enforcementState=e.enforcementState,this.enforcementState==="ENFORCEMENT_STATE_UNSPECIFIED"&&(this.enforcementState="OFF"),this.allowedNonAlphanumericCharacters=e.allowedNonAlphanumericCharacters?.join("")??"",this.forceUpgradeOnSignin=e.forceUpgradeOnSignin??!1,this.schemaVersion=e.schemaVersion}validatePassword(e){let t={isValid:!0,passwordPolicy:this};return this.validatePasswordLengthOptions(e,t),this.validatePasswordCharacterOptions(e,t),t.isValid&&(t.isValid=t.meetsMinPasswordLength??!0),t.isValid&&(t.isValid=t.meetsMaxPasswordLength??!0),t.isValid&&(t.isValid=t.containsLowercaseLetter??!0),t.isValid&&(t.isValid=t.containsUppercaseLetter??!0),t.isValid&&(t.isValid=t.containsNumericCharacter??!0),t.isValid&&(t.isValid=t.containsNonAlphanumericCharacter??!0),t}validatePasswordLengthOptions(e,t){let n=this.customStrengthOptions.minPasswordLength,s=this.customStrengthOptions.maxPasswordLength;n&&(t.meetsMinPasswordLength=e.length>=n),s&&(t.meetsMaxPasswordLength=e.length<=s)}validatePasswordCharacterOptions(e,t){this.updatePasswordCharacterOptionsStatuses(t,!1,!1,!1,!1);let n;for(let s=0;s<e.length;s++)n=e.charAt(s),this.updatePasswordCharacterOptionsStatuses(t,n>="a"&&n<="z",n>="A"&&n<="Z",n>="0"&&n<="9",this.allowedNonAlphanumericCharacters.includes(n))}updatePasswordCharacterOptionsStatuses(e,t,n,s,i){this.customStrengthOptions.containsLowercaseLetter&&(e.containsLowercaseLetter||(e.containsLowercaseLetter=t)),this.customStrengthOptions.containsUppercaseLetter&&(e.containsUppercaseLetter||(e.containsUppercaseLetter=n)),this.customStrengthOptions.containsNumericCharacter&&(e.containsNumericCharacter||(e.containsNumericCharacter=s)),this.customStrengthOptions.containsNonAlphanumericCharacter&&(e.containsNonAlphanumericCharacter||(e.containsNonAlphanumericCharacter=i))}};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var Dl=class{constructor(e,t,n,s){this.app=e,this.heartbeatServiceProvider=t,this.appCheckServiceProvider=n,this.config=s,this.currentUser=null,this.emulatorConfig=null,this.operations=Promise.resolve(),this.authStateSubscription=new Io(this),this.idTokenSubscription=new Io(this),this.beforeStateQueue=new yl(this),this.redirectUser=null,this.isProactiveRefreshEnabled=!1,this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION=1,this._canInitEmulator=!0,this._isInitialized=!1,this._deleted=!1,this._initializationPromise=null,this._popupRedirectResolver=null,this._errorFactory=UC,this._agentRecaptchaConfig=null,this._tenantRecaptchaConfigs={},this._projectPasswordPolicy=null,this._tenantPasswordPolicies={},this._resolvePersistenceManagerAvailable=void 0,this.lastNotifiedUid=void 0,this.languageCode=null,this.tenantId=null,this.settings={appVerificationDisabledForTesting:!1},this.frameworks=[],this.name=e.name,this.clientVersion=s.sdkClientVersion,this._persistenceManagerAvailable=new Promise(i=>this._resolvePersistenceManagerAvailable=i)}_initializeWithPersistence(e,t){return t&&(this._popupRedirectResolver=on(t)),this._initializationPromise=this.queue(async()=>{if(!this._deleted){try{this.persistenceManager=await _i.create(this,e)}catch(n){Bo(`Failed to initialize persistence: ${n}`),this.persistenceManager=await _i.create(this,[])}finally{this._resolvePersistenceManagerAvailable?.()}if(!this._deleted){if(this._popupRedirectResolver?._shouldInitProactively)try{await this._popupRedirectResolver._initialize(this)}catch{}try{await this.initializeCurrentUser(t)}catch(n){Bo(`Failed to initialize current user: ${n}`)}this.lastNotifiedUid=this.currentUser?.uid||null,!this._deleted&&(this._isInitialized=!0)}}}),this._initializationPromise}async _onStorageEvent(){if(this._deleted)return;let e=await this.assertedPersistence.getCurrentUser();if(!(!this.currentUser&&!e)){if(this.currentUser&&e&&this.currentUser.uid===e.uid){this._currentUser._assign(e),await this.currentUser.getIdToken();return}await this._updateCurrentUser(e,!0)}}async initializeCurrentUserFromIdToken(e){try{let t=await yo(this,{idToken:e}),n=await On._fromGetAccountInfoResponse(this,t,e);await this.directlySetCurrentUser(n)}catch(t){console.warn("FirebaseServerApp could not login user with provided authIdToken: ",t),await this.directlySetCurrentUser(null)}}async initializeCurrentUser(e){if(gt(this.app)){let i=this.app.settings.authIdToken;return i?new Promise(a=>{setTimeout(()=>this.initializeCurrentUserFromIdToken(i).then(a,a))}):this.directlySetCurrentUser(null)}let t=await this.assertedPersistence.getCurrentUser(),n=t,s=!1;if(e&&this.config.authDomain){await this.getOrInitRedirectPersistenceManager();let i=this.redirectUser?._redirectEventId,a=n?._redirectEventId,u=await this.tryRedirectSignIn(e);(!i||i===a)&&u?.user&&(n=u.user,s=!0)}if(!n)return this.directlySetCurrentUser(null);if(!n._redirectEventId){if(s)try{await this.beforeStateQueue.runMiddleware(n)}catch(i){n=t,this._popupRedirectResolver._overrideRedirectResult(this,()=>Promise.reject(i))}return n?this.reloadAndSetCurrentUserOrClear(n):this.directlySetCurrentUser(null)}return Y(this._popupRedirectResolver,this,"argument-error"),await this.getOrInitRedirectPersistenceManager(),this.redirectUser&&this.redirectUser._redirectEventId===n._redirectEventId?this.directlySetCurrentUser(n):this.reloadAndSetCurrentUserOrClear(n)}async tryRedirectSignIn(e){let t=null;try{t=await this._popupRedirectResolver._completeRedirectFn(this,e,!0)}catch{await this._setRedirectUser(null)}return t}async reloadAndSetCurrentUserOrClear(e){try{await wo(e)}catch(t){if(JC(t))return this.directlySetCurrentUser(null)}return this.directlySetCurrentUser(e)}useDeviceLanguage(){this.languageCode=Kw()}async _delete(){this._deleted=!0}async updateCurrentUser(e){if(gt(this.app))return Promise.reject(Zn(this));let t=e?Oe(e):null;return t&&Y(t.auth.config.apiKey===this.config.apiKey,this,"invalid-user-token"),this._updateCurrentUser(t&&t._clone(this))}async _updateCurrentUser(e,t=!1){if(!this._deleted)return e&&Y(this.tenantId===e.tenantId,this,"tenant-id-mismatch"),t||await this.beforeStateQueue.runMiddleware(e),this.queue(async()=>{await this.directlySetCurrentUser(e),this.notifyAuthListeners()})}async signOut(){return gt(this.app)?Promise.reject(Zn(this)):(await this.beforeStateQueue.runMiddleware(null),(this.redirectPersistenceManager||this._popupRedirectResolver)&&await this._setRedirectUser(null),this._updateCurrentUser(null,!0))}setPersistence(e){return gt(this.app)?Promise.reject(Zn(this)):this.queue(async()=>{await this.assertedPersistence.setPersistence(on(e))})}_getRecaptchaConfig(){return this.tenantId==null?this._agentRecaptchaConfig:this._tenantRecaptchaConfigs[this.tenantId]}async validatePassword(e){this._getPasswordPolicyInternal()||await this._updatePasswordPolicy();let t=this._getPasswordPolicyInternal();return t.schemaVersion!==this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION?Promise.reject(this._errorFactory.create("unsupported-password-policy-schema-version",{})):t.validatePassword(e)}_getPasswordPolicyInternal(){return this.tenantId===null?this._projectPasswordPolicy:this._tenantPasswordPolicies[this.tenantId]}async _updatePasswordPolicy(){let e=await nD(this),t=new wl(e);this.tenantId===null?this._projectPasswordPolicy=t:this._tenantPasswordPolicies[this.tenantId]=t}_getPersistenceType(){return this.assertedPersistence.persistence.type}_getPersistence(){return this.assertedPersistence.persistence}_updateErrorMap(e){this._errorFactory=new rn("auth","Firebase",e())}onAuthStateChanged(e,t,n){return this.registerStateListener(this.authStateSubscription,e,t,n)}beforeAuthStateChanged(e,t){return this.beforeStateQueue.pushCallback(e,t)}onIdTokenChanged(e,t,n){return this.registerStateListener(this.idTokenSubscription,e,t,n)}authStateReady(){return new Promise((e,t)=>{if(this.currentUser)e();else{let n=this.onAuthStateChanged(()=>{n(),e()},t)}})}async revokeAccessToken(e){if(this.currentUser){let t=await this.currentUser.getIdToken(),n={providerId:"apple.com",tokenType:"ACCESS_TOKEN",token:e,idToken:t};this.tenantId!=null&&(n.tenantId=this.tenantId),await Zw(this,n)}}toJSON(){return{apiKey:this.config.apiKey,authDomain:this.config.authDomain,appName:this.name,currentUser:this._currentUser?.toJSON()}}async _setRedirectUser(e,t){let n=await this.getOrInitRedirectPersistenceManager(t);return e===null?n.removeCurrentUser():n.setCurrentUser(e)}async getOrInitRedirectPersistenceManager(e){if(!this.redirectPersistenceManager){let t=e&&on(e)||this._popupRedirectResolver;Y(t,this,"argument-error"),this.redirectPersistenceManager=await _i.create(this,[on(t._redirectPersistence)],"redirectUser"),this.redirectUser=await this.redirectPersistenceManager.getCurrentUser()}return this.redirectPersistenceManager}async _redirectUserForId(e){return this._isInitialized&&await this.queue(async()=>{}),this._currentUser?._redirectEventId===e?this._currentUser:this.redirectUser?._redirectEventId===e?this.redirectUser:null}async _persistUserIfCurrent(e){if(e===this.currentUser)return this.queue(async()=>this.directlySetCurrentUser(e))}_notifyListenersIfCurrent(e){e===this.currentUser&&this.notifyAuthListeners()}_key(){return`${this.config.authDomain}:${this.config.apiKey}:${this.name}`}_startProactiveRefresh(){this.isProactiveRefreshEnabled=!0,this.currentUser&&this._currentUser._startProactiveRefresh()}_stopProactiveRefresh(){this.isProactiveRefreshEnabled=!1,this.currentUser&&this._currentUser._stopProactiveRefresh()}get _currentUser(){return this.currentUser}notifyAuthListeners(){if(!this._isInitialized)return;this.idTokenSubscription.next(this.currentUser);let e=this.currentUser?.uid??null;this.lastNotifiedUid!==e&&(this.lastNotifiedUid=e,this.authStateSubscription.next(this.currentUser))}registerStateListener(e,t,n,s){if(this._deleted)return()=>{};let i=typeof t=="function"?t:t.next.bind(t),a=!1,u=this._isInitialized?Promise.resolve():this._initializationPromise;if(Y(u,this,"internal-error"),u.then(()=>{a||i(this.currentUser)}).catch(c=>{if(!a)if(typeof t!="function"&&t.error)t.error(c);else if(n)n(c);else throw c}),typeof t=="function"){let c=e.addObserver(t,n,s);return()=>{a=!0,c()}}else{let c=e.addObserver(t);return()=>{a=!0,c()}}}async directlySetCurrentUser(e){if(this.currentUser&&this.currentUser!==e&&this._currentUser._stopProactiveRefresh(),e&&this.isProactiveRefreshEnabled&&e._startProactiveRefresh(),this.currentUser=e,this.persistenceManager)try{e?await this.persistenceManager.setCurrentUser(e):await this.persistenceManager.removeCurrentUser()}catch(t){let n=t?.message||String(t),s=Mo(this,"internal-error",`An internal AuthError has occurred: ${n}`);throw s.customData={originalError:t},s}}queue(e){return this.operations=this.operations.then(e,e),this.operations}get assertedPersistence(){return Y(this.persistenceManager,this,"internal-error"),this.persistenceManager}_logFramework(e){!e||this.frameworks.includes(e)||(this.frameworks.push(e),this.frameworks.sort(),this.clientVersion=rg(this.config.clientPlatform,this._getFrameworks()))}_getFrameworks(){return this.frameworks}async _getAdditionalHeaders(){let e={"X-Client-Version":this.clientVersion};this.app.options.appId&&(e["X-Firebase-gmpid"]=this.app.options.appId);let t=await this.heartbeatServiceProvider.getImmediate({optional:!0})?.getHeartbeatsHeader();t&&(e["X-Firebase-Client"]=t);let n=await this._getAppCheckToken();return n&&(e["X-Firebase-AppCheck"]=n),e}async _getAppCheckToken(){if(gt(this.app)&&this.app.settings.appCheckToken)return this.app.settings.appCheckToken;let e=await this.appCheckServiceProvider.getImmediate({optional:!0})?.getToken();return e?.error&&Bo(`Error while retrieving App Check token: ${e.error}`),e?.token}};function ts(r){return Oe(r)}var Io=class{constructor(e){this.auth=e,this.observer=null,this.addObserver=rC(t=>this.observer=t)}get next(){return Y(this.observer,this.auth,"internal-error"),this.observer.next.bind(this.observer)}};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var Go={async loadJS(){throw new Error("Unable to load external scripts")},recaptchaV2Script:"",recaptchaEnterpriseScript:"",gapiScript:""};function sD(r){Go=r}function sg(r){return Go.loadJS(r)}function iD(){return Go.recaptchaEnterpriseScript}function aD(){return Go.gapiScript}function ig(r){return`__${r}${Math.floor(Math.random()*1e6)}`}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var Il=class{constructor(){this.enterprise=new Tl}ready(e){e()}execute(e,t){return Promise.resolve("token")}render(e,t){return""}},Tl=class{ready(e){e()}execute(e,t){return Promise.resolve("token")}render(e,t){return""}};/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var oD="recaptcha-enterprise",yi="NO_RECAPTCHA",AC="onFirebaseAuthREInstanceReady",Ai=class r{constructor(e){this.type=oD,this.auth=ts(e)}async verify(e="verify",t=!1){async function n(i){if(!t){if(i.tenantId==null&&i._agentRecaptchaConfig!=null)return i._agentRecaptchaConfig.siteKey;if(i.tenantId!=null&&i._tenantRecaptchaConfigs[i.tenantId]!==void 0)return i._tenantRecaptchaConfigs[i.tenantId].siteKey}return new Promise(async(a,u)=>{jC(i,{clientType:"CLIENT_TYPE_WEB",version:"RECAPTCHA_ENTERPRISE"}).then(c=>{if(c.recaptchaKey===void 0)u(new Error("recaptcha Enterprise site key undefined"));else{let l=new _o(c);return i.tenantId==null?i._agentRecaptchaConfig=l:i._tenantRecaptchaConfigs[i.tenantId]=l,a(l.siteKey)}}).catch(c=>{u(c)})})}function s(i,a,u){let c=window.grecaptcha;wC(c)?c.enterprise.ready(()=>{c.enterprise.execute(i,{action:e}).then(l=>{a(l)}).catch(()=>{a(yi)})}):u(Error("No reCAPTCHA enterprise script loaded."))}return this.auth.settings.appVerificationDisabledForTesting?new Il().execute("siteKey",{action:"verify"}):new Promise((i,a)=>{n(this.auth).then(async u=>{if(!t&&wC(window.grecaptcha)&&r.scriptInjectionDeferred)await r.scriptInjectionDeferred.promise,s(u,i,a);else{if(typeof window>"u"){a(new Error("RecaptchaVerifier is only supported in browser"));return}let c=iD();c.length!==0&&(c+=u+`&onload=${AC}`),r.scriptInjectionDeferred=new Wr,window[AC]=()=>{r.scriptInjectionDeferred?.resolve()},sg(c).then(()=>r.scriptInjectionDeferred?.promise).then(()=>{s(u,i,a)}).catch(l=>{a(l)})}}).catch(u=>{a(u)})})}};Ai.scriptInjectionDeferred=null;async function Ci(r,e,t,n=!1,s=!1){let i=new Ai(r),a;if(s)a=yi;else try{a=await i.verify(t)}catch{a=await i.verify(t,!0)}let u={...e};if(t==="mfaSmsEnrollment"||t==="mfaSmsSignIn"){if("phoneEnrollmentInfo"in u){let c=u.phoneEnrollmentInfo.phoneNumber,l=u.phoneEnrollmentInfo.recaptchaToken;Object.assign(u,{phoneEnrollmentInfo:{phoneNumber:c,recaptchaToken:l,captchaResponse:a,clientType:"CLIENT_TYPE_WEB",recaptchaVersion:"RECAPTCHA_ENTERPRISE"}})}else if("phoneSignInInfo"in u){let c=u.phoneSignInInfo.recaptchaToken;Object.assign(u,{phoneSignInInfo:{recaptchaToken:c,captchaResponse:a,clientType:"CLIENT_TYPE_WEB",recaptchaVersion:"RECAPTCHA_ENTERPRISE"}})}return u}return n?Object.assign(u,{captchaResp:a}):Object.assign(u,{captchaResponse:a}),Object.assign(u,{clientType:"CLIENT_TYPE_WEB"}),Object.assign(u,{recaptchaVersion:"RECAPTCHA_ENTERPRISE"}),u}async function wi(r,e,t,n,s){if(s==="EMAIL_PASSWORD_PROVIDER")if(r._getRecaptchaConfig()?.isProviderEnabled("EMAIL_PASSWORD_PROVIDER")){let i=await Ci(r,e,t,t==="getOobCode");return n(r,i)}else return n(r,e).catch(async i=>{if(i.code==="auth/missing-recaptcha-token"){console.log(`${t} is protected by reCAPTCHA Enterprise for this project. Automatically triggering the reCAPTCHA flow and restarting the flow.`);let a=await Ci(r,e,t,t==="getOobCode");return n(r,a)}else return Promise.reject(i)});else if(s==="PHONE_PROVIDER")if(r._getRecaptchaConfig()?.isProviderEnabled("PHONE_PROVIDER")){let i=await Ci(r,e,t);return n(r,i).catch(async a=>{if(r._getRecaptchaConfig()?.getProviderEnforcementState("PHONE_PROVIDER")==="AUDIT"&&(a.code==="auth/missing-recaptcha-token"||a.code==="auth/invalid-app-credential")){console.log(`Failed to verify with reCAPTCHA Enterprise. Automatically triggering the reCAPTCHA v2 flow to complete the ${t} flow.`);let u=await Ci(r,e,t,!1,!0);return n(r,u)}return Promise.reject(a)})}else{let i=await Ci(r,e,t,!1,!0);return n(r,i)}else return Promise.reject(s+" provider is not supported.")}async function uD(r){let e=ts(r),t=await jC(e,{clientType:"CLIENT_TYPE_WEB",version:"RECAPTCHA_ENTERPRISE"}),n=new _o(t);e.tenantId==null?e._agentRecaptchaConfig=n:e._tenantRecaptchaConfigs[e.tenantId]=n,n.isAnyProviderEnabled()&&new Ai(e).verify().catch(()=>{})}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Gl(r,e){let t=co(r,"auth");if(t.isInitialized()){let s=t.getImmediate(),i=t.getOptions();if(sn(i,e??{}))return s;At(s,"already-initialized")}return t.initialize({options:e})}function cD(r,e){let t=e?.persistence||[],n=(Array.isArray(t)?t:[t]).map(on);e?.errorMap&&r._updateErrorMap(e.errorMap),r._initializeWithPersistence(n,e?.popupRedirectResolver)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var tr=class{constructor(e,t){this.providerId=e,this.signInMethod=t}toJSON(){return jt("not implemented")}_getIdTokenResponse(e){return jt("not implemented")}_linkToIdToken(e,t){return jt("not implemented")}_getReauthenticationResolver(e){return jt("not implemented")}};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function lD(r,e){return Ye(r,"POST","/v1/accounts:signUp",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function BD(r,e){return ar(r,"POST","/v1/accounts:signInWithPassword",Ve(r,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function hD(r,e){return ar(r,"POST","/v1/accounts:signInWithEmailLink",Ve(r,e))}async function fD(r,e){return ar(r,"POST","/v1/accounts:signInWithEmailLink",Ve(r,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var bi=class r extends tr{constructor(e,t,n,s=null){super("password",n),this._email=e,this._password=t,this._tenantId=s}static _fromEmailAndPassword(e,t){return new r(e,t,"password")}static _fromEmailAndCode(e,t,n=null){return new r(e,t,"emailLink",n)}toJSON(){return{email:this._email,password:this._password,signInMethod:this.signInMethod,tenantId:this._tenantId}}static fromJSON(e){let t=typeof e=="string"?JSON.parse(e):e;if(t?.email&&t?.password){if(t.signInMethod==="password")return this._fromEmailAndPassword(t.email,t.password);if(t.signInMethod==="emailLink")return this._fromEmailAndCode(t.email,t.password,t.tenantId)}return null}async _getIdTokenResponse(e){switch(this.signInMethod){case"password":let t={returnSecureToken:!0,email:this._email,password:this._password,clientType:"CLIENT_TYPE_WEB"};return wi(e,t,"signInWithPassword",BD,"EMAIL_PASSWORD_PROVIDER");case"emailLink":return hD(e,{email:this._email,oobCode:this._password});default:At(e,"internal-error")}}async _linkToIdToken(e,t){switch(this.signInMethod){case"password":let n={idToken:t,returnSecureToken:!0,email:this._email,password:this._password,clientType:"CLIENT_TYPE_WEB"};return wi(e,n,"signUpPassword",lD,"EMAIL_PASSWORD_PROVIDER");case"emailLink":return fD(e,{idToken:t,email:this._email,oobCode:this._password});default:At(e,"internal-error")}}_getReauthenticationResolver(e){return this._getIdTokenResponse(e)}};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Zr(r,e){return ar(r,"POST","/v1/accounts:signInWithIdp",Ve(r,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var dD="http://localhost",nr=class r extends tr{constructor(){super(...arguments),this.pendingToken=null}static _fromParams(e){let t=new r(e.providerId,e.signInMethod);return e.idToken||e.accessToken?(e.idToken&&(t.idToken=e.idToken),e.accessToken&&(t.accessToken=e.accessToken),e.nonce&&!e.pendingToken&&(t.nonce=e.nonce),e.pendingToken&&(t.pendingToken=e.pendingToken)):e.oauthToken&&e.oauthTokenSecret?(t.accessToken=e.oauthToken,t.secret=e.oauthTokenSecret):At("argument-error"),t}toJSON(){return{idToken:this.idToken,accessToken:this.accessToken,secret:this.secret,nonce:this.nonce,pendingToken:this.pendingToken,providerId:this.providerId,signInMethod:this.signInMethod}}static fromJSON(e){let t=typeof e=="string"?JSON.parse(e):e,{providerId:n,signInMethod:s,...i}=t;if(!n||!s)return null;let a=new r(n,s);return a.idToken=i.idToken||void 0,a.accessToken=i.accessToken||void 0,a.secret=i.secret,a.nonce=i.nonce,a.pendingToken=i.pendingToken||null,a}_getIdTokenResponse(e){let t=this.buildRequest();return Zr(e,t)}_linkToIdToken(e,t){let n=this.buildRequest();return n.idToken=t,Zr(e,n)}_getReauthenticationResolver(e){let t=this.buildRequest();return t.autoCreate=!1,Zr(e,t)}buildRequest(){let e={requestUri:dD,returnSecureToken:!0};if(this.pendingToken)e.pendingToken=this.pendingToken;else{let t={};this.idToken&&(t.id_token=this.idToken),this.accessToken&&(t.access_token=this.accessToken),this.secret&&(t.oauth_token_secret=this.secret),t.providerId=this.providerId,this.nonce&&!this.pendingToken&&(t.nonce=this.nonce),e.postBody=Qr(t)}return e}};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function bC(r,e){return Ye(r,"POST","/v1/accounts:sendVerificationCode",Ve(r,e))}async function pD(r,e){return ar(r,"POST","/v1/accounts:signInWithPhoneNumber",Ve(r,e))}async function CD(r,e){let t=await ar(r,"POST","/v1/accounts:signInWithPhoneNumber",Ve(r,e));if(t.temporaryProof)throw gi(r,"account-exists-with-different-credential",t);return t}var gD={USER_NOT_FOUND:"user-not-found"};async function mD(r,e){let t={...e,operation:"REAUTH"};return ar(r,"POST","/v1/accounts:signInWithPhoneNumber",Ve(r,t),gD)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var vi=class r extends tr{constructor(e){super("phone","phone"),this.params=e}static _fromVerification(e,t){return new r({verificationId:e,verificationCode:t})}static _fromTokenResponse(e,t){return new r({phoneNumber:e,temporaryProof:t})}_getIdTokenResponse(e){return pD(e,this._makeVerificationRequest())}_linkToIdToken(e,t){return CD(e,{idToken:t,...this._makeVerificationRequest()})}_getReauthenticationResolver(e){return mD(e,this._makeVerificationRequest())}_makeVerificationRequest(){let{temporaryProof:e,phoneNumber:t,verificationId:n,verificationCode:s}=this.params;return e&&t?{temporaryProof:e,phoneNumber:t}:{sessionInfo:n,code:s}}toJSON(){let e={providerId:this.providerId};return this.params.phoneNumber&&(e.phoneNumber=this.params.phoneNumber),this.params.temporaryProof&&(e.temporaryProof=this.params.temporaryProof),this.params.verificationCode&&(e.verificationCode=this.params.verificationCode),this.params.verificationId&&(e.verificationId=this.params.verificationId),e}static fromJSON(e){typeof e=="string"&&(e=JSON.parse(e));let{verificationId:t,verificationCode:n,phoneNumber:s,temporaryProof:i}=e;return!n&&!t&&!s&&!i?null:new r({verificationId:t,verificationCode:n,phoneNumber:s,temporaryProof:i})}};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ED(r){switch(r){case"recoverEmail":return"RECOVER_EMAIL";case"resetPassword":return"PASSWORD_RESET";case"signIn":return"EMAIL_SIGNIN";case"verifyEmail":return"VERIFY_EMAIL";case"verifyAndChangeEmail":return"VERIFY_AND_CHANGE_EMAIL";case"revertSecondFactorAddition":return"REVERT_SECOND_FACTOR_ADDITION";default:return null}}function _D(r){let e=$r(Yr(r)).link,t=e?$r(Yr(e)).deep_link_id:null,n=$r(Yr(r)).deep_link_id;return(n?$r(Yr(n)).link:null)||n||t||e||r}var To=class r{constructor(e){let t=$r(Yr(e)),n=t.apiKey??null,s=t.oobCode??null,i=ED(t.mode??null);Y(n&&s&&i,"argument-error"),this.apiKey=n,this.operation=i,this.code=s,this.continueUrl=t.continueUrl??null,this.languageCode=t.lang??null,this.tenantId=t.tenantId??null}static parseLink(e){let t=_D(e);try{return new r(t)}catch{return null}}};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var es=class r{constructor(){this.providerId=r.PROVIDER_ID}static credential(e,t){return bi._fromEmailAndPassword(e,t)}static credentialWithLink(e,t){let n=To.parseLink(t);return Y(n,"argument-error"),bi._fromEmailAndCode(e,n.code,n.tenantId)}};es.PROVIDER_ID="password";es.EMAIL_PASSWORD_SIGN_IN_METHOD="password";es.EMAIL_LINK_SIGN_IN_METHOD="emailLink";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var Ri=class{constructor(e){this.providerId=e,this.defaultLanguageCode=null,this.customParameters={}}setDefaultLanguage(e){this.defaultLanguageCode=e}setCustomParameters(e){return this.customParameters=e,this}getCustomParameters(){return this.customParameters}};/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var rr=class extends Ri{constructor(){super(...arguments),this.scopes=[]}addScope(e){return this.scopes.includes(e)||this.scopes.push(e),this}getScopes(){return[...this.scopes]}};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var Si=class r extends rr{constructor(){super("facebook.com")}static credential(e){return nr._fromParams({providerId:r.PROVIDER_ID,signInMethod:r.FACEBOOK_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return r.credentialFromTaggedObject(e)}static credentialFromError(e){return r.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return r.credential(e.oauthAccessToken)}catch{return null}}};Si.FACEBOOK_SIGN_IN_METHOD="facebook.com";Si.PROVIDER_ID="facebook.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var sr=class r extends rr{constructor(){super("google.com"),this.addScope("profile")}static credential(e,t){return nr._fromParams({providerId:r.PROVIDER_ID,signInMethod:r.GOOGLE_SIGN_IN_METHOD,idToken:e,accessToken:t})}static credentialFromResult(e){return r.credentialFromTaggedObject(e)}static credentialFromError(e){return r.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;let{oauthIdToken:t,oauthAccessToken:n}=e;if(!t&&!n)return null;try{return r.credential(t,n)}catch{return null}}};sr.GOOGLE_SIGN_IN_METHOD="google.com";sr.PROVIDER_ID="google.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var Pi=class r extends rr{constructor(){super("github.com")}static credential(e){return nr._fromParams({providerId:r.PROVIDER_ID,signInMethod:r.GITHUB_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return r.credentialFromTaggedObject(e)}static credentialFromError(e){return r.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return r.credential(e.oauthAccessToken)}catch{return null}}};Pi.GITHUB_SIGN_IN_METHOD="github.com";Pi.PROVIDER_ID="github.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var Ni=class r extends rr{constructor(){super("twitter.com")}static credential(e,t){return nr._fromParams({providerId:r.PROVIDER_ID,signInMethod:r.TWITTER_SIGN_IN_METHOD,oauthToken:e,oauthTokenSecret:t})}static credentialFromResult(e){return r.credentialFromTaggedObject(e)}static credentialFromError(e){return r.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;let{oauthAccessToken:t,oauthTokenSecret:n}=e;if(!t||!n)return null;try{return r.credential(t,n)}catch{return null}}};Ni.TWITTER_SIGN_IN_METHOD="twitter.com";Ni.PROVIDER_ID="twitter.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var Oi=class r{constructor(e){this.user=e.user,this.providerId=e.providerId,this._tokenResponse=e._tokenResponse,this.operationType=e.operationType}static async _fromIdTokenResponse(e,t,n,s=!1){let i=await On._fromIdTokenResponse(e,n,s),a=vC(n);return new r({user:i,providerId:a,_tokenResponse:n,operationType:t})}static async _forOperation(e,t,n){await e._updateTokensIfNecessary(n,!0);let s=vC(n);return new r({user:e,providerId:s,_tokenResponse:n,operationType:t})}};function vC(r){return r.providerId?r.providerId:"phoneNumber"in r?"phone":null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var Al=class r extends Ct{constructor(e,t,n,s){super(t.code,t.message),this.operationType=n,this.user=s,Object.setPrototypeOf(this,r.prototype),this.customData={appName:e.name,tenantId:e.tenantId??void 0,_serverResponse:t.customData._serverResponse,operationType:n}}static _fromErrorAndOperation(e,t,n,s){return new r(e,t,n,s)}};function ag(r,e,t,n){return(e==="reauthenticate"?t._getReauthenticationResolver(r):t._getIdTokenResponse(r)).catch(i=>{throw i.code==="auth/multi-factor-auth-required"?Al._fromErrorAndOperation(r,i,e,n):i})}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function yD(r,e,t=!1){let n=await Ii(r,e._linkToIdToken(r.auth,await r.getIdToken()),t);return Oi._forOperation(r,"link",n)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function wD(r,e,t=!1){let{auth:n}=r;if(gt(n.app))return Promise.reject(Zn(n));let s="reauthenticate";try{let i=await Ii(r,ag(n,s,e,r),t);Y(i.idToken,n,"internal-error");let a=Vl(i.idToken);Y(a,n,"internal-error");let{sub:u}=a;return Y(r.uid===u,n,"user-mismatch"),Oi._forOperation(r,s,i)}catch(i){throw i?.code==="auth/user-not-found"&&At(n,"user-mismatch"),i}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function DD(r,e,t=!1){if(gt(r.app))return Promise.reject(Zn(r));let n="signIn",s=await ag(r,n,e),i=await Oi._fromIdTokenResponse(r,n,s);return t||await r._updateCurrentUser(i.user),i}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ul(r){return Oe(r).signOut()}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function RC(r,e){return Ye(r,"POST","/v2/accounts/mfaEnrollment:start",Ve(r,e))}function ID(r,e){return Ye(r,"POST","/v2/accounts/mfaEnrollment:finalize",Ve(r,e))}function TD(r,e){return Ye(r,"POST","/v2/accounts/mfaEnrollment:start",Ve(r,e))}function AD(r,e){return Ye(r,"POST","/v2/accounts/mfaEnrollment:finalize",Ve(r,e))}var Ao="__sak";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var bo=class{constructor(e,t){this.storageRetriever=e,this.type=t}_isAvailable(){try{return this.storage?(this.storage.setItem(Ao,"1"),this.storage.removeItem(Ao),Promise.resolve(!0)):Promise.resolve(!1)}catch{return Promise.resolve(!1)}}_set(e,t){return this.storage.setItem(e,JSON.stringify(t)),Promise.resolve()}_get(e){let t=this.storage.getItem(e);return Promise.resolve(t?JSON.parse(t):null)}_remove(e){return this.storage.removeItem(e),Promise.resolve()}get storage(){return this.storageRetriever()}};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var bD=1e3,vD=10,bl=class extends bo{constructor(){super(()=>window.localStorage,"LOCAL"),this.boundEventHandler=(e,t)=>this.onStorageEvent(e,t),this.listeners={},this.localCache={},this.pollTimer=null,this.fallbackToPolling=ng(),this._shouldAllowMigration=!0}forAllChangedKeys(e){for(let t of Object.keys(this.listeners)){let n=this.storage.getItem(t),s=this.localCache[t];n!==s&&e(t,s,n)}}onStorageEvent(e,t=!1){if(!e.key){this.forAllChangedKeys((a,u,c)=>{this.notifyListeners(a,c)});return}let n=e.key;t?this.detachListener():this.stopPolling();let s=()=>{let a=this.storage.getItem(n);!t&&this.localCache[n]===a||this.notifyListeners(n,a)},i=this.storage.getItem(n);tD()&&i!==e.newValue&&e.newValue!==e.oldValue?setTimeout(s,vD):s()}notifyListeners(e,t){this.localCache[e]=t;let n=this.listeners[e];if(n)for(let s of Array.from(n))s(t&&JSON.parse(t))}startPolling(){this.stopPolling(),this.pollTimer=setInterval(()=>{this.forAllChangedKeys((e,t,n)=>{this.onStorageEvent(new StorageEvent("storage",{key:e,oldValue:t,newValue:n}),!0)})},bD)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}attachListener(){window.addEventListener("storage",this.boundEventHandler)}detachListener(){window.removeEventListener("storage",this.boundEventHandler)}_addListener(e,t){Object.keys(this.listeners).length===0&&(this.fallbackToPolling?this.startPolling():this.attachListener()),this.listeners[e]||(this.listeners[e]=new Set,this.localCache[e]=this.storage.getItem(e)),this.listeners[e].add(t)}_removeListener(e,t){this.listeners[e]&&(this.listeners[e].delete(t),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&(this.detachListener(),this.stopPolling())}async _set(e,t){await super._set(e,t),this.localCache[e]=JSON.stringify(t)}async _get(e){let t=await super._get(e);return this.localCache[e]=JSON.stringify(t),t}async _remove(e){await super._remove(e),delete this.localCache[e]}};bl.type="LOCAL";/**
 * @license
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var RD=1e3;function fl(r){let e=r.replace(/[\\^$.*+?()[\]{}|]/g,"\\$&"),t=RegExp(`${e}=([^;]+)`);return document.cookie.match(t)?.[1]??null}function dl(r){return`${window.location.protocol==="http:"?"__dev_":"__HOST-"}FIREBASE_${r.split(":")[3]}`}var vl=class{constructor(){this.type="COOKIE",this.listenerUnsubscribes=new Map}_getFinalTarget(e){if(typeof window===void 0)return e;let t=new URL(`${window.location.origin}/__cookies__`);return t.searchParams.set("finalTarget",e),t}async _isAvailable(){return typeof isSecureContext=="boolean"&&!isSecureContext||typeof navigator>"u"||typeof document>"u"?!1:navigator.cookieEnabled??!0}async _set(e,t){}async _get(e){if(!this._isAvailable())return null;let t=dl(e);return window.cookieStore?(await window.cookieStore.get(t))?.value:fl(t)}async _remove(e){if(!this._isAvailable()||!await this._get(e))return;let n=dl(e);document.cookie=`${n}=;Max-Age=34560000;Partitioned;Secure;SameSite=Strict;Path=/;Priority=High`,await fetch("/__cookies__",{method:"DELETE"}).catch(()=>{})}_addListener(e,t){if(!this._isAvailable())return;let n=dl(e);if(window.cookieStore){let u=(l=>{let h=l.changed.find(C=>C.name===n);h&&t(h.value),l.deleted.find(C=>C.name===n)&&t(null)}),c=()=>window.cookieStore.removeEventListener("change",u);return this.listenerUnsubscribes.set(t,c),window.cookieStore.addEventListener("change",u)}let s=fl(n),i=setInterval(()=>{let u=fl(n);u!==s&&(t(u),s=u)},RD),a=()=>clearInterval(i);this.listenerUnsubscribes.set(t,a)}_removeListener(e,t){let n=this.listenerUnsubscribes.get(t);n&&(n(),this.listenerUnsubscribes.delete(t))}};vl.type="COOKIE";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var vo=class extends bo{constructor(){super(()=>window.sessionStorage,"SESSION")}_addListener(e,t){}_removeListener(e,t){}};vo.type="SESSION";var Uo=vo;/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function SD(r){return Promise.all(r.map(async e=>{try{return{fulfilled:!0,value:await e}}catch(t){return{fulfilled:!1,reason:t}}}))}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var Ro=class r{constructor(e){this.eventTarget=e,this.handlersMap={},this.boundEventHandler=this.handleEvent.bind(this)}static _getInstance(e){let t=this.receivers.find(s=>s.isListeningto(e));if(t)return t;let n=new r(e);return this.receivers.push(n),n}isListeningto(e){return this.eventTarget===e}async handleEvent(e){let t=e,{eventId:n,eventType:s,data:i}=t.data,a=this.handlersMap[s];if(!a?.size)return;t.ports[0].postMessage({status:"ack",eventId:n,eventType:s});let u=Array.from(a).map(async l=>l(t.origin,i)),c=await SD(u);t.ports[0].postMessage({status:"done",eventId:n,eventType:s,response:c})}_subscribe(e,t){Object.keys(this.handlersMap).length===0&&this.eventTarget.addEventListener("message",this.boundEventHandler),this.handlersMap[e]||(this.handlersMap[e]=new Set),this.handlersMap[e].add(t)}_unsubscribe(e,t){this.handlersMap[e]&&t&&this.handlersMap[e].delete(t),(!t||this.handlersMap[e].size===0)&&delete this.handlersMap[e],Object.keys(this.handlersMap).length===0&&this.eventTarget.removeEventListener("message",this.boundEventHandler)}};Ro.receivers=[];/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Hl(r="",e=10){let t="";for(let n=0;n<e;n++)t+=Math.floor(Math.random()*10);return r+t}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var Rl=class{constructor(e){this.target=e,this.handlers=new Set}removeMessageHandler(e){e.messageChannel&&(e.messageChannel.port1.removeEventListener("message",e.onMessage),e.messageChannel.port1.close()),this.handlers.delete(e)}async _send(e,t,n=50){let s=typeof MessageChannel<"u"?new MessageChannel:null;if(!s)throw new Error("connection_unavailable");let i,a;return new Promise((u,c)=>{let l=Hl("",20);s.port1.start();let h=setTimeout(()=>{c(new Error("unsupported_event"))},n);a={messageChannel:s,onMessage(d){let C=d;if(C.data.eventId===l)switch(C.data.status){case"ack":clearTimeout(h),i=setTimeout(()=>{c(new Error("timeout"))},3e3);break;case"done":clearTimeout(i),u(C.data.response);break;default:clearTimeout(h),clearTimeout(i),c(new Error("invalid_response"));break}}},this.handlers.add(a),s.port1.addEventListener("message",a.onMessage),this.target.postMessage({eventType:e,eventId:l,data:t},[s.port2])}).finally(()=>{a&&this.removeMessageHandler(a)})}};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Kt(){return window}function PD(r){Kt().location.href=r}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function og(){return typeof Kt().WorkerGlobalScope<"u"&&typeof Kt().importScripts=="function"}async function ND(){if(!navigator?.serviceWorker)return null;try{return(await navigator.serviceWorker.ready).active}catch{return null}}function OD(){return navigator?.serviceWorker?.controller||null}function xD(){return og()?self:null}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var ug="firebaseLocalStorageDb",FD=1,So="firebaseLocalStorage",cg="fbase_key",LD=800,kD=3,SC=800,Ho=2500,Di="DB_TIMEOUT",ir=class{constructor(e){this.request=e}toPromise(e=Ho){return new Promise((t,n)=>{let s=!1,i=setTimeout(()=>{if(!s){s=!0;try{this.request.transaction?.abort()}catch{}n(new Error(Di))}},e);this.request.addEventListener("success",()=>{s||(s=!0,clearTimeout(i),t(this.request.result))}),this.request.addEventListener("error",()=>{s||(s=!0,clearTimeout(i),n(this.request.error))})})}};function qo(r,e){return r.transaction([So],e?"readwrite":"readonly").objectStore(So)}function VD(){let r=indexedDB.deleteDatabase(ug);return new ir(r).toPromise()}function lg(){let r=indexedDB.open(ug,FD);return new Promise((e,t)=>{let n=!1,s=setTimeout(()=>{n||(n=!0,t(new Error(Di)))},Ho);r.addEventListener("error",()=>{n||(n=!0,clearTimeout(s),t(r.error))}),r.addEventListener("upgradeneeded",()=>{let i=r.result;try{i.createObjectStore(So,{keyPath:cg})}catch(a){n||(n=!0,clearTimeout(s),t(a))}}),r.addEventListener("success",async()=>{let i=r.result;if(n){i.close();return}if(clearTimeout(s),i.objectStoreNames.contains(So))n=!0,e(i);else{i.close();try{await VD();let a=await lg();n=!0,e(a)}catch(a){n||(n=!0,t(a))}}})})}async function PC(r,e,t,n=Ho){let s=qo(r,!0).put({[cg]:e,value:t});return new ir(s).toPromise(n)}async function MD(r,e){let t=qo(r,!1).get(e),n=await new ir(t).toPromise();return n===void 0?null:n.value}function NC(r,e,t=Ho){let n=qo(r,!0).delete(e);return new ir(n).toPromise(t)}var Sl=class{registerLifecycleListeners(){typeof window<"u"&&typeof window.addEventListener=="function"&&(window.addEventListener("pagehide",this.onPageHide),window.addEventListener("pageshow",this.onPageShow))}unregisterLifecycleListeners(){typeof window<"u"&&typeof window.removeEventListener=="function"&&(window.removeEventListener("pagehide",this.onPageHide),window.removeEventListener("pageshow",this.onPageShow))}constructor(){this.type="LOCAL",this.dbPromise=null,this._shouldAllowMigration=!0,this.listeners={},this.localCache={},this.pollTimer=null,this.isClosing=!1,this.pendingWrites=0,this._lastProbeTimedOut=!1,this.receiver=null,this.sender=null,this.serviceWorkerReceiverAvailable=!1,this.activeServiceWorker=null,this.onPageHide=()=>{this.isClosing=!0,this.stopPolling(),this.dbPromise&&(this.dbPromise.then(e=>e.close()).catch(()=>{}),this.dbPromise=null)},this.onPageShow=()=>{this.isClosing&&(this.isClosing=!1,Object.keys(this.listeners).length>0&&this.startPolling())},this._workerInitializationPromise=this.initializeServiceWorkerMessaging().then(()=>{},()=>{})}async _openDb(){if(this.dbPromise)return this.dbPromise;let e=lg();return this.dbPromise=e,e.catch(()=>{this.dbPromise===e&&(this.dbPromise=null)}),e}async _withRetries(e){let t=0;for(;;){let n,s=null;try{let i=this._openDb();return s=this.dbPromise,n=await i,await e(n)}catch(i){if(n)n.close(),s&&this.dbPromise===s&&(this.dbPromise=null);else if(this.dbPromise&&this.dbPromise===s){let u=this.dbPromise;this.dbPromise=null;try{(await u).close()}catch{}}if(i instanceof Error&&i.message===Di||t++>kD)throw i}}}async initializeServiceWorkerMessaging(){return og()?this.initializeReceiver():this.initializeSender()}async initializeReceiver(){this.receiver=Ro._getInstance(xD()),this.receiver._subscribe("keyChanged",async(e,t)=>({keyProcessed:(await this._poll()).includes(t.key)})),this.receiver._subscribe("ping",async(e,t)=>["keyChanged"])}async initializeSender(){if(this.activeServiceWorker=await ND(),!this.activeServiceWorker)return;this.sender=new Rl(this.activeServiceWorker);let e=await this.sender._send("ping",{},800);e&&e[0]?.fulfilled&&e[0]?.value.includes("keyChanged")&&(this.serviceWorkerReceiverAvailable=!0)}async notifyServiceWorker(e){if(!(!this.sender||!this.activeServiceWorker||OD()!==this.activeServiceWorker))try{await this.sender._send("keyChanged",{key:e},this.serviceWorkerReceiverAvailable?800:50)}catch{}}async _isAvailable(){this._lastProbeTimedOut=!1;try{return indexedDB?(await this._withRetries(async e=>{await PC(e,Ao,"1",SC),await NC(e,Ao,SC)}),!0):!1}catch(e){this._lastProbeTimedOut=e instanceof Error&&e.message===Di}return!1}async _withPendingWrite(e){this.pendingWrites++;try{await e()}finally{this.pendingWrites--}}async _set(e,t){return this._withPendingWrite(async()=>(await this._withRetries(n=>PC(n,e,t)),this.localCache[e]=t,this.notifyServiceWorker(e)))}async _get(e){try{let t=await this._withRetries(n=>MD(n,e));return this.localCache[e]=t,t}catch(t){if(t instanceof Error&&t.message===Di&&this.localCache[e]!=null)return this.localCache[e];throw t}}async _remove(e){return this._withPendingWrite(async()=>(await this._withRetries(t=>NC(t,e)),delete this.localCache[e],this.notifyServiceWorker(e)))}async _poll(){if(this.isClosing)return[];try{let e=await this._withRetries(s=>{let i=qo(s,!1).getAll();return new ir(i).toPromise()});if(this.isClosing)return[];if(!e)return[];if(this.pendingWrites!==0)return[];let t=[],n=new Set;if(e.length!==0)for(let{fbase_key:s,value:i}of e)n.add(s),JSON.stringify(this.localCache[s])!==JSON.stringify(i)&&(this.notifyListeners(s,i),t.push(s));for(let s of Object.keys(this.localCache))this.localCache[s]&&!n.has(s)&&(this.notifyListeners(s,null),t.push(s));return t}catch(e){return this.isClosing||Bo(`Firebase Auth cross-tab polling failed with error: ${e}`),[]}}notifyListeners(e,t){this.localCache[e]=t;let n=this.listeners[e];if(n)for(let s of Array.from(n))s(t)}startPolling(){this.stopPolling(),this.pollTimer=setInterval(async()=>this._poll(),LD)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}_addListener(e,t){Object.keys(this.listeners).length===0&&(this.startPolling(),this.registerLifecycleListeners()),this.listeners[e]||(this.listeners[e]=new Set,e in this.localCache||this._get(e).catch(()=>{})),this.listeners[e].add(t)}_removeListener(e,t){this.listeners[e]&&(this.listeners[e].delete(t),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&(this.stopPolling(),this.unregisterLifecycleListeners())}};Sl.type="LOCAL";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function OC(r,e){return Ye(r,"POST","/v2/accounts/mfaSignIn:start",Ve(r,e))}function GD(r,e){return Ye(r,"POST","/v2/accounts/mfaSignIn:finalize",Ve(r,e))}function UD(r,e){return Ye(r,"POST","/v2/accounts/mfaSignIn:finalize",Ve(r,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var tb=ig("rcb"),nb=new er(3e4,6e4);/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var po="recaptcha";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function HD(r,e,t){if(!r._getRecaptchaConfig())try{await uD(r)}catch{console.log("Failed to initialize reCAPTCHA Enterprise config. Triggering the reCAPTCHA v2 verification.")}try{let n;if(typeof e=="string"?n={phoneNumber:e}:n=e,"session"in n){let s=n.session;if("phoneNumber"in n){Y(s.type==="enroll",r,"internal-error");let i={idToken:s.credential,phoneEnrollmentInfo:{phoneNumber:n.phoneNumber,clientType:"CLIENT_TYPE_WEB"}};return(await wi(r,i,"mfaSmsEnrollment",async(l,h)=>{if(h.phoneEnrollmentInfo.captchaResponse===yi){Y(t?.type===po,l,"argument-error");let d=await pl(l,h,t);return RC(l,d)}return RC(l,h)},"PHONE_PROVIDER").catch(l=>Promise.reject(l))).phoneSessionInfo.sessionInfo}else{Y(s.type==="signin",r,"internal-error");let i=n.multiFactorHint?.uid||n.multiFactorUid;Y(i,r,"missing-multi-factor-info");let a={mfaPendingCredential:s.credential,mfaEnrollmentId:i,phoneSignInInfo:{clientType:"CLIENT_TYPE_WEB"}};return(await wi(r,a,"mfaSmsSignIn",async(h,d)=>{if(d.phoneSignInInfo.captchaResponse===yi){Y(t?.type===po,h,"argument-error");let C=await pl(h,d,t);return OC(h,C)}return OC(h,d)},"PHONE_PROVIDER").catch(h=>Promise.reject(h))).phoneResponseInfo.sessionInfo}}else{let s={phoneNumber:n.phoneNumber,clientType:"CLIENT_TYPE_WEB"};return(await wi(r,s,"sendVerificationCode",async(c,l)=>{if(l.captchaResponse===yi){Y(t?.type===po,c,"argument-error");let h=await pl(c,l,t);return bC(c,h)}return bC(c,l)},"PHONE_PROVIDER").catch(c=>Promise.reject(c))).sessionInfo}}finally{t?._reset()}}async function pl(r,e,t){Y(t.type===po,r,"argument-error");let n=await t.verify();Y(typeof n=="string",r,"argument-error");let s={...e};if("phoneEnrollmentInfo"in s){let i=s.phoneEnrollmentInfo.phoneNumber,a=s.phoneEnrollmentInfo.captchaResponse,u=s.phoneEnrollmentInfo.clientType,c=s.phoneEnrollmentInfo.recaptchaVersion;return Object.assign(s,{phoneEnrollmentInfo:{phoneNumber:i,recaptchaToken:n,captchaResponse:a,clientType:u,recaptchaVersion:c}}),s}else if("phoneSignInInfo"in s){let i=s.phoneSignInInfo.captchaResponse,a=s.phoneSignInInfo.clientType,u=s.phoneSignInInfo.recaptchaVersion;return Object.assign(s,{phoneSignInInfo:{recaptchaToken:n,captchaResponse:i,clientType:a,recaptchaVersion:u}}),s}else return Object.assign(s,{recaptchaToken:n}),s}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var xi=class r{constructor(e){this.providerId=r.PROVIDER_ID,this.auth=ts(e)}verifyPhoneNumber(e,t){return HD(this.auth,e,Oe(t))}static credential(e,t){return vi._fromVerification(e,t)}static credentialFromResult(e){let t=e;return r.credentialFromTaggedObject(t)}static credentialFromError(e){return r.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;let{phoneNumber:t,temporaryProof:n}=e;return t&&n?vi._fromTokenResponse(t,n):null}};xi.PROVIDER_ID="phone";xi.PHONE_SIGN_IN_METHOD="phone";/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Bg(r,e){return e?on(e):(Y(r._popupRedirectResolver,r,"argument-error"),r._popupRedirectResolver)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var Fi=class extends tr{constructor(e){super("custom","custom"),this.params=e}_getIdTokenResponse(e){return Zr(e,this._buildIdpRequest())}_linkToIdToken(e,t){return Zr(e,this._buildIdpRequest(t))}_getReauthenticationResolver(e){return Zr(e,this._buildIdpRequest())}_buildIdpRequest(e){let t={requestUri:this.params.requestUri,sessionId:this.params.sessionId,postBody:this.params.postBody,tenantId:this.params.tenantId,pendingToken:this.params.pendingToken,returnSecureToken:!0,returnIdpCredential:!0};return e&&(t.idToken=e),t}};function qD(r){return DD(r.auth,new Fi(r),r.bypassAuthState)}function jD(r){let{auth:e,user:t}=r;return Y(t,e,"internal-error"),wD(t,new Fi(r),r.bypassAuthState)}async function KD(r){let{auth:e,user:t}=r;return Y(t,e,"internal-error"),yD(t,new Fi(r),r.bypassAuthState)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var Po=class{constructor(e,t,n,s,i=!1){this.auth=e,this.resolver=n,this.user=s,this.bypassAuthState=i,this.pendingPromise=null,this.eventManager=null,this.filter=Array.isArray(t)?t:[t]}execute(){return new Promise(async(e,t)=>{this.pendingPromise={resolve:e,reject:t};try{if(this.eventManager=await this.resolver._initialize(this.auth),!this.pendingPromise||(await this.onExecution(),!this.pendingPromise))return;this.eventManager.registerConsumer(this)}catch(n){this.pendingPromise&&this.reject(n)}})}async onAuthEvent(e){if(!this.pendingPromise)return;let{urlResponse:t,sessionId:n,postBody:s,tenantId:i,error:a,type:u}=e;if(a){this.reject(a);return}let c={auth:this.auth,requestUri:t,sessionId:n,tenantId:i||void 0,postBody:s||void 0,user:this.user,bypassAuthState:this.bypassAuthState};try{this.resolve(await this.getIdpTask(u)(c))}catch(l){this.reject(l)}}onError(e){this.reject(e)}getIdpTask(e){switch(e){case"signInViaPopup":case"signInViaRedirect":return qD;case"linkViaPopup":case"linkViaRedirect":return KD;case"reauthViaPopup":case"reauthViaRedirect":return jD;default:At(this.auth,"internal-error")}}resolve(e){un(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.resolve(e),this.unregisterAndCleanUp()}reject(e){un(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.reject(e),this.unregisterAndCleanUp()}unregisterAndCleanUp(){this.eventManager&&this.eventManager.unregisterConsumer(this),this.pendingPromise=null,this.cleanUp()}};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var JD=new er(2e3,1e4);async function ql(r,e,t){if(gt(r.app))return Promise.reject(Ft(r,"operation-not-supported-in-this-environment"));let n=ts(r);Hw(r,e,Ri);let s=Bg(n,t);return new No(n,"signInViaPopup",e,s).executeNotNull()}var No=class r extends Po{constructor(e,t,n,s,i){super(e,t,s,i),this.provider=n,this.authWindow=null,this.pollId=null,r.currentPopupAction&&r.currentPopupAction.cancel(),r.currentPopupAction=this}async executeNotNull(){let e=await this.execute();return Y(e,this.auth,"internal-error"),e}async onExecution(){un(this.filter.length===1,"Popup operations only handle one event");let e=Hl();this.authWindow=await this.resolver._openPopup(this.auth,this.provider,this.filter[0],e),this.authWindow.associatedEvent=e,this.resolver._originValidation(this.auth).catch(t=>{this.reject(t)}),this.resolver._isIframeWebStorageSupported(this.auth,t=>{t||this.reject(Ft(this.auth,"web-storage-unsupported"))}),this.pollUserCancellation()}get eventId(){return this.authWindow?.associatedEvent||null}cancel(){this.reject(Ft(this.auth,"cancelled-popup-request"))}cleanUp(){this.authWindow&&this.authWindow.close(),this.pollId&&window.clearTimeout(this.pollId),this.authWindow=null,this.pollId=null,r.currentPopupAction=null}pollUserCancellation(){let e=()=>{if(this.authWindow?.window?.closed){this.pollId=window.setTimeout(()=>{this.pollId=null,this.reject(Ft(this.auth,"popup-closed-by-user"))},8e3);return}this.pollId=window.setTimeout(e,JD.get())};e()}};No.currentPopupAction=null;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var zD="pendingRedirect",Co=new Map,Pl=class extends Po{constructor(e,t,n=!1){super(e,["signInViaRedirect","linkViaRedirect","reauthViaRedirect","unknown"],t,void 0,n),this.eventId=null}async execute(){let e=Co.get(this.auth._key());if(!e){try{let n=await WD(this.resolver,this.auth)?await super.execute():null;e=()=>Promise.resolve(n)}catch(t){e=()=>Promise.reject(t)}Co.set(this.auth._key(),e)}return this.bypassAuthState||Co.set(this.auth._key(),()=>Promise.resolve(null)),e()}async onAuthEvent(e){if(e.type==="signInViaRedirect")return super.onAuthEvent(e);if(e.type==="unknown"){this.resolve(null);return}if(e.eventId){let t=await this.auth._redirectUserForId(e.eventId);if(t)return this.user=t,super.onAuthEvent(e);this.resolve(null)}}async onExecution(){}cleanUp(){}};async function WD(r,e){let t=YD(e),n=$D(r);if(!await n._isAvailable())return!1;let s=await n._get(t)==="true";return await n._remove(t),s}function QD(r,e){Co.set(r._key(),e)}function $D(r){return on(r._redirectPersistence)}function YD(r){return fo(zD,r.config.apiKey,r.name)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function XD(r,e,t=!1){if(gt(r.app))return Promise.reject(Zn(r));let n=ts(r),s=Bg(n,e),a=await new Pl(n,s,t).execute();return a&&!t&&(delete a.user._redirectEventId,await n._persistUserIfCurrent(a.user),await n._setRedirectUser(null,e)),a}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var ZD=600*1e3,Nl=class{constructor(e){this.auth=e,this.cachedEventUids=new Set,this.consumers=new Set,this.queuedRedirectEvent=null,this.hasHandledPotentialRedirect=!1,this.lastProcessedEventTime=Date.now()}registerConsumer(e){this.consumers.add(e),this.queuedRedirectEvent&&this.isEventForConsumer(this.queuedRedirectEvent,e)&&(this.sendToConsumer(this.queuedRedirectEvent,e),this.saveEventToCache(this.queuedRedirectEvent),this.queuedRedirectEvent=null)}unregisterConsumer(e){this.consumers.delete(e)}onEvent(e){if(this.hasEventBeenHandled(e))return!1;let t=!1;return this.consumers.forEach(n=>{this.isEventForConsumer(e,n)&&(t=!0,this.sendToConsumer(e,n),this.saveEventToCache(e))}),this.hasHandledPotentialRedirect||!eI(e)||(this.hasHandledPotentialRedirect=!0,t||(this.queuedRedirectEvent=e,t=!0)),t}sendToConsumer(e,t){if(e.error&&!hg(e)){let n=e.error.code?.split("auth/")[1]||"internal-error";t.onError(Ft(this.auth,n))}else t.onAuthEvent(e)}isEventForConsumer(e,t){let n=t.eventId===null||!!e.eventId&&e.eventId===t.eventId;return t.filter.includes(e.type)&&n}hasEventBeenHandled(e){return Date.now()-this.lastProcessedEventTime>=ZD&&this.cachedEventUids.clear(),this.cachedEventUids.has(xC(e))}saveEventToCache(e){this.cachedEventUids.add(xC(e)),this.lastProcessedEventTime=Date.now()}};function xC(r){return[r.type,r.eventId,r.sessionId,r.tenantId].filter(e=>e).join("-")}function hg({type:r,error:e}){return r==="unknown"&&e?.code==="auth/no-auth-event"}function eI(r){switch(r.type){case"signInViaRedirect":case"linkViaRedirect":case"reauthViaRedirect":return!0;case"unknown":return hg(r);default:return!1}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function tI(r,e={}){return Ye(r,"GET","/v1/projects",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var nI=/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/,rI=/^https?/;async function sI(r){if(r.config.emulator)return;let{authorizedDomains:e}=await tI(r);for(let t of e)try{if(iI(t))return}catch{}At(r,"unauthorized-domain")}function iI(r){let e=gl(),{protocol:t,hostname:n}=new URL(e);if(r.startsWith("chrome-extension://")){let a=new URL(r);return a.hostname===""&&n===""?t==="chrome-extension:"&&r.replace("chrome-extension://","")===e.replace("chrome-extension://",""):t==="chrome-extension:"&&a.hostname===n}if(!rI.test(t))return!1;if(nI.test(r))return n===r;let s=r.replace(/\./g,"\\.");return new RegExp("^(.+\\."+s+"|"+s+")$","i").test(n)}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var aI=new er(3e4,6e4);function FC(){let r=Kt().___jsl;if(r?.H){for(let e of Object.keys(r.H))if(r.H[e].r=r.H[e].r||[],r.H[e].L=r.H[e].L||[],r.H[e].r=[...r.H[e].L],r.CP)for(let t=0;t<r.CP.length;t++)r.CP[t]=null}}function oI(r){return new Promise((e,t)=>{function n(){FC(),gapi.load("gapi.iframes",{callback:()=>{e(gapi.iframes.getContext())},ontimeout:()=>{FC(),t(Ft(r,"network-request-failed"))},timeout:aI.get()})}if(Kt().gapi?.iframes?.Iframe)e(gapi.iframes.getContext());else if(Kt().gapi?.load)n();else{let s=ig("iframefcb");return Kt()[s]=()=>{gapi.load?n():t(Ft(r,"network-request-failed"))},sg(`${aD()}?onload=${s}`).catch(i=>t(i))}}).catch(e=>{throw go=null,e})}var go=null;function uI(r){return go=go||oI(r),go}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var cI=new er(5e3,15e3),lI="__/auth/iframe",BI="emulator/auth/iframe",hI={style:{position:"absolute",top:"-100px",width:"1px",height:"1px"},"aria-hidden":"true",tabindex:"-1"},fI=new Map([["identitytoolkit.googleapis.com","p"],["staging-identitytoolkit.sandbox.googleapis.com","s"],["test-identitytoolkit.sandbox.googleapis.com","t"]]);function dI(r){let e=r.config;Y(e.authDomain,r,"auth-domain-config-required");let t=e.emulator?kl(e,BI):`https://${r.config.authDomain}/${lI}`,n={apiKey:e.apiKey,appName:r.name,v:Pn},s=fI.get(r.config.apiHost);s&&(n.eid=s);let i=r._getFrameworks();return i.length&&(n.fw=i.join(",")),`${t}?${Qr(n).slice(1)}`}async function pI(r){let e=await uI(r),t=Kt().gapi;return Y(t,r,"internal-error"),e.open({where:document.body,url:dI(r),messageHandlersFilter:t.iframes.CROSS_ORIGIN_IFRAMES_FILTER,attributes:hI,dontclear:!0},n=>new Promise(async(s,i)=>{await n.restyle({setHideOnLeave:!1});let a=Ft(r,"network-request-failed"),u=Kt().setTimeout(()=>{i(a)},cI.get());function c(){Kt().clearTimeout(u),s(n)}n.ping(c).then(c,()=>{i(a)})}))}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var CI={location:"yes",resizable:"yes",statusbar:"yes",toolbar:"no"},gI=500,mI=600,EI="_blank",_I="http://localhost",Oo=class{constructor(e){this.window=e,this.associatedEvent=null}close(){if(this.window)try{this.window.close()}catch{}}};function yI(r,e,t,n=gI,s=mI){let i=Math.max((window.screen.availHeight-s)/2,0).toString(),a=Math.max((window.screen.availWidth-n)/2,0).toString(),u="",c={...CI,width:n.toString(),height:s.toString(),top:i,left:a},l=ke().toLowerCase();t&&(u=YC(l)?EI:t),QC(l)&&(e=e||_I,c.scrollbars="yes");let h=Object.entries(c).reduce((C,[y,D])=>`${C}${y}=${D},`,"");if(eD(l)&&u!=="_self")return wI(e||"",u),new Oo(null);let d=window.open(e||"",u,h);Y(d,r,"popup-blocked");try{d.focus()}catch{}return new Oo(d)}function wI(r,e){let t=document.createElement("a");t.href=r,t.target=e;let n=document.createEvent("MouseEvent");n.initMouseEvent("click",!0,!0,window,1,0,0,0,0,!1,!1,!1,!1,1,null),t.dispatchEvent(n)}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var DI="__/auth/handler",II="emulator/auth/handler",TI=encodeURIComponent("fac");async function LC(r,e,t,n,s,i){Y(r.config.authDomain,r,"auth-domain-config-required"),Y(r.config.apiKey,r,"invalid-api-key");let a={apiKey:r.config.apiKey,appName:r.name,authType:t,redirectUrl:n,v:Pn,eventId:s};if(e instanceof Ri){e.setDefaultLanguage(r.languageCode),a.providerId=e.providerId||"",nC(e.getCustomParameters())||(a.customParameters=JSON.stringify(e.getCustomParameters()));for(let[h,d]of Object.entries(i||{}))a[h]=d}if(e instanceof rr){let h=e.getScopes().filter(d=>d!=="");h.length>0&&(a.scopes=h.join(","))}r.tenantId&&(a.tid=r.tenantId);let u=a;for(let h of Object.keys(u))u[h]===void 0&&delete u[h];let c=await r._getAppCheckToken(),l=c?`#${TI}=${encodeURIComponent(c)}`:"";return`${AI(r)}?${Qr(u).slice(1)}${l}`}function AI({config:r}){return r.emulator?kl(r,II):`https://${r.authDomain}/${DI}`}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var Cl="webStorageSupport",Ol=class{constructor(){this.eventManagers={},this.iframes={},this.originValidationPromises={},this._redirectPersistence=Uo,this._completeRedirectFn=XD,this._overrideRedirectResult=QD}async _openPopup(e,t,n,s){un(this.eventManagers[e._key()]?.manager,"_initialize() not called before _openPopup()");let i=await LC(e,t,n,gl(),s);return yI(e,i,Hl())}async _openRedirect(e,t,n,s){await this._originValidation(e);let i=await LC(e,t,n,gl(),s);return PD(i),new Promise(()=>{})}_initialize(e){let t=e._key();if(this.eventManagers[t]){let{manager:s,promise:i}=this.eventManagers[t];return s?Promise.resolve(s):(un(i,"If manager is not set, promise should be"),i)}let n=this.initAndGetManager(e);return this.eventManagers[t]={promise:n},n.catch(()=>{delete this.eventManagers[t]}),n}async initAndGetManager(e){let t=await pI(e),n=new Nl(e);return t.register("authEvent",s=>(Y(s?.authEvent,e,"invalid-auth-event"),{status:n.onEvent(s.authEvent)?"ACK":"ERROR"}),gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER),this.eventManagers[e._key()]={manager:n},this.iframes[e._key()]=t,n}_isIframeWebStorageSupported(e,t){this.iframes[e._key()].send(Cl,{type:Cl},s=>{let i=s?.[0]?.[Cl];i!==void 0&&t(!!i),At(e,"internal-error")},gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER)}_originValidation(e){let t=e._key();return this.originValidationPromises[t]||(this.originValidationPromises[t]=sI(e)),this.originValidationPromises[t]}get _shouldInitProactively(){return ng()||$C()||Ml()}},jl=Ol,xo=class{constructor(e){this.factorId=e}_process(e,t,n){switch(t.type){case"enroll":return this._finalizeEnroll(e,t.credential,n);case"signin":return this._finalizeSignIn(e,t.credential);default:return jt("unexpected MultiFactorSessionType")}}},xl=class r extends xo{constructor(e){super("phone"),this.credential=e}static _fromCredential(e){return new r(e)}_finalizeEnroll(e,t,n){return ID(e,{idToken:t,displayName:n,phoneVerificationInfo:this.credential._makeVerificationRequest()})}_finalizeSignIn(e,t){return GD(e,{mfaPendingCredential:t,phoneVerificationInfo:this.credential._makeVerificationRequest()})}},Fo=class{constructor(){}static assertion(e){return xl._fromCredential(e)}};Fo.FACTOR_ID="phone";var Lo=class{static assertionForEnrollment(e,t){return ko._fromSecret(e,t)}static assertionForSignIn(e,t){return ko._fromEnrollmentId(e,t)}static async generateSecret(e){let t=e;Y(typeof t.user?.auth<"u","internal-error");let n=await TD(t.user.auth,{idToken:t.credential,totpEnrollmentInfo:{}});return Vo._fromStartTotpMfaEnrollmentResponse(n,t.user.auth)}};Lo.FACTOR_ID="totp";var ko=class r extends xo{constructor(e,t,n){super("totp"),this.otp=e,this.enrollmentId=t,this.secret=n}static _fromSecret(e,t){return new r(t,void 0,e)}static _fromEnrollmentId(e,t){return new r(t,e)}async _finalizeEnroll(e,t,n){return Y(typeof this.secret<"u",e,"argument-error"),AD(e,{idToken:t,displayName:n,totpVerificationInfo:this.secret._makeTotpVerificationInfo(this.otp)})}async _finalizeSignIn(e,t){Y(this.enrollmentId!==void 0&&this.otp!==void 0,e,"argument-error");let n={verificationCode:this.otp};return UD(e,{mfaPendingCredential:t,mfaEnrollmentId:this.enrollmentId,totpVerificationInfo:n})}},Vo=class r{constructor(e,t,n,s,i,a,u){this.sessionInfo=a,this.auth=u,this.secretKey=e,this.hashingAlgorithm=t,this.codeLength=n,this.codeIntervalSeconds=s,this.enrollmentCompletionDeadline=i}static _fromStartTotpMfaEnrollmentResponse(e,t){return new r(e.totpSessionInfo.sharedSecretKey,e.totpSessionInfo.hashingAlgorithm,e.totpSessionInfo.verificationCodeLength,e.totpSessionInfo.periodSec,new Date(e.totpSessionInfo.finalizeEnrollmentTime).toUTCString(),e.totpSessionInfo.sessionInfo,t)}_makeTotpVerificationInfo(e){return{sessionInfo:this.sessionInfo,verificationCode:e}}generateQrCodeUrl(e,t){let n=!1;return(lo(e)||lo(t))&&(n=!0),n&&(lo(e)&&(e=this.auth.currentUser?.email||"unknownuser"),lo(t)&&(t=this.auth.name)),`otpauth://totp/${t}:${e}?secret=${this.secretKey}&issuer=${t}&algorithm=${this.hashingAlgorithm}&digits=${this.codeLength}`}};function lo(r){return typeof r>"u"||r?.length===0}var kC="@firebase/auth",VC="1.13.11";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var Fl=class{constructor(e){this.auth=e,this.internalListeners=new Map}getUid(){return this.assertAuthConfigured(),this.auth.currentUser?.uid||null}async getToken(e){return this.assertAuthConfigured(),await this.auth._initializationPromise,this.auth.currentUser?{accessToken:await this.auth.currentUser.getIdToken(e)}:null}addAuthTokenListener(e){if(this.assertAuthConfigured(),this.internalListeners.has(e))return;let t=this.auth.onIdTokenChanged(n=>{e(n?.stsTokenManager.accessToken||null)});this.internalListeners.set(e,t),this.updateProactiveRefresh()}removeAuthTokenListener(e){this.assertAuthConfigured();let t=this.internalListeners.get(e);t&&(this.internalListeners.delete(e),t(),this.updateProactiveRefresh())}assertAuthConfigured(){Y(this.auth._initializationPromise,"dependent-sdk-initialized-before-auth")}updateProactiveRefresh(){this.internalListeners.size>0?this.auth._startProactiveRefresh():this.auth._stopProactiveRefresh()}};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function bI(r){switch(r){case"Node":return"node";case"ReactNative":return"rn";case"Worker":return"webworker";case"Cordova":return"cordova";case"WebExtension":return"web-extension";default:return}}function vI(r){Sn(new Tt("auth",(e,{options:t})=>{let n=e.getProvider("app").getImmediate(),s=e.getProvider("heartbeat"),i=e.getProvider("app-check-internal"),{apiKey:a,authDomain:u}=n.options;Y(a&&!a.includes(":"),"invalid-api-key",{appName:n.name});let c={apiKey:a,authDomain:u,clientPlatform:r,apiHost:"identitytoolkit.googleapis.com",tokenApiHost:"securetoken.googleapis.com",apiScheme:"https",sdkClientVersion:rg(r)},l=new Dl(n,s,i,c);return cD(l,t),l},"PUBLIC").setInstantiationMode("EXPLICIT").setInstanceCreatedCallback((e,t,n)=>{e.getProvider("auth-internal").initialize()})),Sn(new Tt("auth-internal",e=>{let t=ts(e.getProvider("auth").getImmediate());return(n=>new Fl(n))(t)},"PRIVATE").setInstantiationMode("EXPLICIT")),xt(kC,VC,bI(r)),xt(kC,VC,"esm2020")}/**
 * @license
 * Copyright 2026 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function RI(){return document.getElementsByTagName("head")?.[0]??document}function SI(r){return new Promise((e,t)=>{let n=document.createElement("script");try{_C(n,r)}catch(s){t(s);return}n.onload=e,n.onerror=s=>{let i=Ft("internal-error");i.customData=s,t(i)},n.type="text/javascript",n.charset="UTF-8",RI().appendChild(n)})}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var PI=300,rb=zp("authIdTokenMaxAge")||PI;sD({loadJS:SI,gapiScript:"https://apis.google.com/js/api.js",recaptchaV2Script:"https://www.google.com/recaptcha/api.js",recaptchaEnterpriseScript:"https://www.google.com/recaptcha/enterprise.js?render="});vI("Browser");var fg=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{},dg={};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var cn,Kl;(function(){var r;/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/function e(A,E){function w(){}w.prototype=E.prototype,A.F=E.prototype,A.prototype=new w,A.prototype.constructor=A,A.D=function(v,T,S){for(var _=Array(arguments.length-2),ot=2;ot<arguments.length;ot++)_[ot-2]=arguments[ot];return E.prototype[T].apply(v,_)}}function t(){this.blockSize=-1}function n(){this.blockSize=-1,this.blockSize=64,this.g=Array(4),this.C=Array(this.blockSize),this.o=this.h=0,this.u()}e(n,t),n.prototype.u=function(){this.g[0]=1732584193,this.g[1]=4023233417,this.g[2]=2562383102,this.g[3]=271733878,this.o=this.h=0};function s(A,E,w){w||(w=0);let v=Array(16);if(typeof E=="string")for(var T=0;T<16;++T)v[T]=E.charCodeAt(w++)|E.charCodeAt(w++)<<8|E.charCodeAt(w++)<<16|E.charCodeAt(w++)<<24;else for(T=0;T<16;++T)v[T]=E[w++]|E[w++]<<8|E[w++]<<16|E[w++]<<24;E=A.g[0],w=A.g[1],T=A.g[2];let S=A.g[3],_;_=E+(S^w&(T^S))+v[0]+3614090360&4294967295,E=w+(_<<7&4294967295|_>>>25),_=S+(T^E&(w^T))+v[1]+3905402710&4294967295,S=E+(_<<12&4294967295|_>>>20),_=T+(w^S&(E^w))+v[2]+606105819&4294967295,T=S+(_<<17&4294967295|_>>>15),_=w+(E^T&(S^E))+v[3]+3250441966&4294967295,w=T+(_<<22&4294967295|_>>>10),_=E+(S^w&(T^S))+v[4]+4118548399&4294967295,E=w+(_<<7&4294967295|_>>>25),_=S+(T^E&(w^T))+v[5]+1200080426&4294967295,S=E+(_<<12&4294967295|_>>>20),_=T+(w^S&(E^w))+v[6]+2821735955&4294967295,T=S+(_<<17&4294967295|_>>>15),_=w+(E^T&(S^E))+v[7]+4249261313&4294967295,w=T+(_<<22&4294967295|_>>>10),_=E+(S^w&(T^S))+v[8]+1770035416&4294967295,E=w+(_<<7&4294967295|_>>>25),_=S+(T^E&(w^T))+v[9]+2336552879&4294967295,S=E+(_<<12&4294967295|_>>>20),_=T+(w^S&(E^w))+v[10]+4294925233&4294967295,T=S+(_<<17&4294967295|_>>>15),_=w+(E^T&(S^E))+v[11]+2304563134&4294967295,w=T+(_<<22&4294967295|_>>>10),_=E+(S^w&(T^S))+v[12]+1804603682&4294967295,E=w+(_<<7&4294967295|_>>>25),_=S+(T^E&(w^T))+v[13]+4254626195&4294967295,S=E+(_<<12&4294967295|_>>>20),_=T+(w^S&(E^w))+v[14]+2792965006&4294967295,T=S+(_<<17&4294967295|_>>>15),_=w+(E^T&(S^E))+v[15]+1236535329&4294967295,w=T+(_<<22&4294967295|_>>>10),_=E+(T^S&(w^T))+v[1]+4129170786&4294967295,E=w+(_<<5&4294967295|_>>>27),_=S+(w^T&(E^w))+v[6]+3225465664&4294967295,S=E+(_<<9&4294967295|_>>>23),_=T+(E^w&(S^E))+v[11]+643717713&4294967295,T=S+(_<<14&4294967295|_>>>18),_=w+(S^E&(T^S))+v[0]+3921069994&4294967295,w=T+(_<<20&4294967295|_>>>12),_=E+(T^S&(w^T))+v[5]+3593408605&4294967295,E=w+(_<<5&4294967295|_>>>27),_=S+(w^T&(E^w))+v[10]+38016083&4294967295,S=E+(_<<9&4294967295|_>>>23),_=T+(E^w&(S^E))+v[15]+3634488961&4294967295,T=S+(_<<14&4294967295|_>>>18),_=w+(S^E&(T^S))+v[4]+3889429448&4294967295,w=T+(_<<20&4294967295|_>>>12),_=E+(T^S&(w^T))+v[9]+568446438&4294967295,E=w+(_<<5&4294967295|_>>>27),_=S+(w^T&(E^w))+v[14]+3275163606&4294967295,S=E+(_<<9&4294967295|_>>>23),_=T+(E^w&(S^E))+v[3]+4107603335&4294967295,T=S+(_<<14&4294967295|_>>>18),_=w+(S^E&(T^S))+v[8]+1163531501&4294967295,w=T+(_<<20&4294967295|_>>>12),_=E+(T^S&(w^T))+v[13]+2850285829&4294967295,E=w+(_<<5&4294967295|_>>>27),_=S+(w^T&(E^w))+v[2]+4243563512&4294967295,S=E+(_<<9&4294967295|_>>>23),_=T+(E^w&(S^E))+v[7]+1735328473&4294967295,T=S+(_<<14&4294967295|_>>>18),_=w+(S^E&(T^S))+v[12]+2368359562&4294967295,w=T+(_<<20&4294967295|_>>>12),_=E+(w^T^S)+v[5]+4294588738&4294967295,E=w+(_<<4&4294967295|_>>>28),_=S+(E^w^T)+v[8]+2272392833&4294967295,S=E+(_<<11&4294967295|_>>>21),_=T+(S^E^w)+v[11]+1839030562&4294967295,T=S+(_<<16&4294967295|_>>>16),_=w+(T^S^E)+v[14]+4259657740&4294967295,w=T+(_<<23&4294967295|_>>>9),_=E+(w^T^S)+v[1]+2763975236&4294967295,E=w+(_<<4&4294967295|_>>>28),_=S+(E^w^T)+v[4]+1272893353&4294967295,S=E+(_<<11&4294967295|_>>>21),_=T+(S^E^w)+v[7]+4139469664&4294967295,T=S+(_<<16&4294967295|_>>>16),_=w+(T^S^E)+v[10]+3200236656&4294967295,w=T+(_<<23&4294967295|_>>>9),_=E+(w^T^S)+v[13]+681279174&4294967295,E=w+(_<<4&4294967295|_>>>28),_=S+(E^w^T)+v[0]+3936430074&4294967295,S=E+(_<<11&4294967295|_>>>21),_=T+(S^E^w)+v[3]+3572445317&4294967295,T=S+(_<<16&4294967295|_>>>16),_=w+(T^S^E)+v[6]+76029189&4294967295,w=T+(_<<23&4294967295|_>>>9),_=E+(w^T^S)+v[9]+3654602809&4294967295,E=w+(_<<4&4294967295|_>>>28),_=S+(E^w^T)+v[12]+3873151461&4294967295,S=E+(_<<11&4294967295|_>>>21),_=T+(S^E^w)+v[15]+530742520&4294967295,T=S+(_<<16&4294967295|_>>>16),_=w+(T^S^E)+v[2]+3299628645&4294967295,w=T+(_<<23&4294967295|_>>>9),_=E+(T^(w|~S))+v[0]+4096336452&4294967295,E=w+(_<<6&4294967295|_>>>26),_=S+(w^(E|~T))+v[7]+1126891415&4294967295,S=E+(_<<10&4294967295|_>>>22),_=T+(E^(S|~w))+v[14]+2878612391&4294967295,T=S+(_<<15&4294967295|_>>>17),_=w+(S^(T|~E))+v[5]+4237533241&4294967295,w=T+(_<<21&4294967295|_>>>11),_=E+(T^(w|~S))+v[12]+1700485571&4294967295,E=w+(_<<6&4294967295|_>>>26),_=S+(w^(E|~T))+v[3]+2399980690&4294967295,S=E+(_<<10&4294967295|_>>>22),_=T+(E^(S|~w))+v[10]+4293915773&4294967295,T=S+(_<<15&4294967295|_>>>17),_=w+(S^(T|~E))+v[1]+2240044497&4294967295,w=T+(_<<21&4294967295|_>>>11),_=E+(T^(w|~S))+v[8]+1873313359&4294967295,E=w+(_<<6&4294967295|_>>>26),_=S+(w^(E|~T))+v[15]+4264355552&4294967295,S=E+(_<<10&4294967295|_>>>22),_=T+(E^(S|~w))+v[6]+2734768916&4294967295,T=S+(_<<15&4294967295|_>>>17),_=w+(S^(T|~E))+v[13]+1309151649&4294967295,w=T+(_<<21&4294967295|_>>>11),_=E+(T^(w|~S))+v[4]+4149444226&4294967295,E=w+(_<<6&4294967295|_>>>26),_=S+(w^(E|~T))+v[11]+3174756917&4294967295,S=E+(_<<10&4294967295|_>>>22),_=T+(E^(S|~w))+v[2]+718787259&4294967295,T=S+(_<<15&4294967295|_>>>17),_=w+(S^(T|~E))+v[9]+3951481745&4294967295,A.g[0]=A.g[0]+E&4294967295,A.g[1]=A.g[1]+(T+(_<<21&4294967295|_>>>11))&4294967295,A.g[2]=A.g[2]+T&4294967295,A.g[3]=A.g[3]+S&4294967295}n.prototype.v=function(A,E){E===void 0&&(E=A.length);let w=E-this.blockSize,v=this.C,T=this.h,S=0;for(;S<E;){if(T==0)for(;S<=w;)s(this,A,S),S+=this.blockSize;if(typeof A=="string"){for(;S<E;)if(v[T++]=A.charCodeAt(S++),T==this.blockSize){s(this,v),T=0;break}}else for(;S<E;)if(v[T++]=A[S++],T==this.blockSize){s(this,v),T=0;break}}this.h=T,this.o+=E},n.prototype.A=function(){var A=Array((this.h<56?this.blockSize:this.blockSize*2)-this.h);A[0]=128;for(var E=1;E<A.length-8;++E)A[E]=0;E=this.o*8;for(var w=A.length-8;w<A.length;++w)A[w]=E&255,E/=256;for(this.v(A),A=Array(16),E=0,w=0;w<4;++w)for(let v=0;v<32;v+=8)A[E++]=this.g[w]>>>v&255;return A};function i(A,E){var w=u;return Object.prototype.hasOwnProperty.call(w,A)?w[A]:w[A]=E(A)}function a(A,E){this.h=E;let w=[],v=!0;for(let T=A.length-1;T>=0;T--){let S=A[T]|0;v&&S==E||(w[T]=S,v=!1)}this.g=w}var u={};function c(A){return-128<=A&&A<128?i(A,function(E){return new a([E|0],E<0?-1:0)}):new a([A|0],A<0?-1:0)}function l(A){if(isNaN(A)||!isFinite(A))return d;if(A<0)return V(l(-A));let E=[],w=1;for(let v=0;A>=w;v++)E[v]=A/w|0,w*=4294967296;return new a(E,0)}function h(A,E){if(A.length==0)throw Error("number format error: empty string");if(E=E||10,E<2||36<E)throw Error("radix out of range: "+E);if(A.charAt(0)=="-")return V(h(A.substring(1),E));if(A.indexOf("-")>=0)throw Error('number format error: interior "-" character');let w=l(Math.pow(E,8)),v=d;for(let S=0;S<A.length;S+=8){var T=Math.min(8,A.length-S);let _=parseInt(A.substring(S,S+T),E);T<8?(T=l(Math.pow(E,T)),v=v.j(T).add(l(_))):(v=v.j(w),v=v.add(l(_)))}return v}var d=c(0),C=c(1),y=c(16777216);r=a.prototype,r.m=function(){if(P(this))return-V(this).m();let A=0,E=1;for(let w=0;w<this.g.length;w++){let v=this.i(w);A+=(v>=0?v:4294967296+v)*E,E*=4294967296}return A},r.toString=function(A){if(A=A||10,A<2||36<A)throw Error("radix out of range: "+A);if(D(this))return"0";if(P(this))return"-"+V(this).toString(A);let E=l(Math.pow(A,6));var w=this;let v="";for(;;){let T=De(w,E).g;w=q(w,T.j(E));let S=((w.g.length>0?w.g[0]:w.h)>>>0).toString(A);if(w=T,D(w))return S+v;for(;S.length<6;)S="0"+S;v=S+v}},r.i=function(A){return A<0?0:A<this.g.length?this.g[A]:this.h};function D(A){if(A.h!=0)return!1;for(let E=0;E<A.g.length;E++)if(A.g[E]!=0)return!1;return!0}function P(A){return A.h==-1}r.l=function(A){return A=q(this,A),P(A)?-1:D(A)?0:1};function V(A){let E=A.g.length,w=[];for(let v=0;v<E;v++)w[v]=~A.g[v];return new a(w,~A.h).add(C)}r.abs=function(){return P(this)?V(this):this},r.add=function(A){let E=Math.max(this.g.length,A.g.length),w=[],v=0;for(let T=0;T<=E;T++){let S=v+(this.i(T)&65535)+(A.i(T)&65535),_=(S>>>16)+(this.i(T)>>>16)+(A.i(T)>>>16);v=_>>>16,S&=65535,_&=65535,w[T]=_<<16|S}return new a(w,w[w.length-1]&-2147483648?-1:0)};function q(A,E){return A.add(V(E))}r.j=function(A){if(D(this)||D(A))return d;if(P(this))return P(A)?V(this).j(V(A)):V(V(this).j(A));if(P(A))return V(this.j(V(A)));if(this.l(y)<0&&A.l(y)<0)return l(this.m()*A.m());let E=this.g.length+A.g.length,w=[];for(var v=0;v<2*E;v++)w[v]=0;for(v=0;v<this.g.length;v++)for(let T=0;T<A.g.length;T++){let S=this.i(v)>>>16,_=this.i(v)&65535,ot=A.i(T)>>>16,Jn=A.i(T)&65535;w[2*v+2*T]+=_*Jn,W(w,2*v+2*T),w[2*v+2*T+1]+=S*Jn,W(w,2*v+2*T+1),w[2*v+2*T+1]+=_*ot,W(w,2*v+2*T+1),w[2*v+2*T+2]+=S*ot,W(w,2*v+2*T+2)}for(A=0;A<E;A++)w[A]=w[2*A+1]<<16|w[2*A];for(A=E;A<2*E;A++)w[A]=0;return new a(w,0)};function W(A,E){for(;(A[E]&65535)!=A[E];)A[E+1]+=A[E]>>>16,A[E]&=65535,E++}function ce(A,E){this.g=A,this.h=E}function De(A,E){if(D(E))throw Error("division by zero");if(D(A))return new ce(d,d);if(P(A))return E=De(V(A),E),new ce(V(E.g),V(E.h));if(P(E))return E=De(A,V(E)),new ce(V(E.g),E.h);if(A.g.length>30){if(P(A)||P(E))throw Error("slowDivide_ only works with positive integers.");for(var w=C,v=E;v.l(A)<=0;)w=Qe(w),v=Qe(v);var T=_e(w,1),S=_e(v,1);for(v=_e(v,2),w=_e(w,2);!D(v);){var _=S.add(v);_.l(A)<=0&&(T=T.add(w),S=_),v=_e(v,1),w=_e(w,1)}return E=q(A,T.j(E)),new ce(T,E)}for(T=d;A.l(E)>=0;){for(w=Math.max(1,Math.floor(A.m()/E.m())),v=Math.ceil(Math.log(w)/Math.LN2),v=v<=48?1:Math.pow(2,v-48),S=l(w),_=S.j(E);P(_)||_.l(A)>0;)w-=v,S=l(w),_=S.j(E);D(S)&&(S=C),T=T.add(S),A=q(A,_)}return new ce(T,A)}r.B=function(A){return De(this,A).h},r.and=function(A){let E=Math.max(this.g.length,A.g.length),w=[];for(let v=0;v<E;v++)w[v]=this.i(v)&A.i(v);return new a(w,this.h&A.h)},r.or=function(A){let E=Math.max(this.g.length,A.g.length),w=[];for(let v=0;v<E;v++)w[v]=this.i(v)|A.i(v);return new a(w,this.h|A.h)},r.xor=function(A){let E=Math.max(this.g.length,A.g.length),w=[];for(let v=0;v<E;v++)w[v]=this.i(v)^A.i(v);return new a(w,this.h^A.h)};function Qe(A){let E=A.g.length+1,w=[];for(let v=0;v<E;v++)w[v]=A.i(v)<<1|A.i(v-1)>>>31;return new a(w,A.h)}function _e(A,E){let w=E>>5;E%=32;let v=A.g.length-w,T=[];for(let S=0;S<v;S++)T[S]=E>0?A.i(S+w)>>>E|A.i(S+w+1)<<32-E:A.i(S+w);return new a(T,A.h)}n.prototype.digest=n.prototype.A,n.prototype.reset=n.prototype.u,n.prototype.update=n.prototype.v,Kl=dg.Md5=n,a.prototype.add=a.prototype.add,a.prototype.multiply=a.prototype.j,a.prototype.modulo=a.prototype.B,a.prototype.compare=a.prototype.l,a.prototype.toNumber=a.prototype.m,a.prototype.toString=a.prototype.toString,a.prototype.getBits=a.prototype.i,a.fromNumber=l,a.fromString=h,cn=dg.Integer=a}).apply(typeof fg<"u"?fg:typeof self<"u"?self:typeof window<"u"?window:{});function Me(r,e,t,n){if(t==="a"&&!n)throw new TypeError("Private accessor was defined without a getter");if(typeof e=="function"?r!==e||!n:!e.has(r))throw new TypeError("Cannot read private member from an object whose class did not declare it");return t==="m"?n:t==="a"?n.call(r):n?n.value:e.get(r)}var jo=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{},ln={};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var Jl,NI,ns,zl,Li,Ko,Wl,Ql,$l;(function(){var r,e=Object.defineProperty;function t(o){o=[typeof globalThis=="object"&&globalThis,o,typeof window=="object"&&window,typeof self=="object"&&self,typeof jo=="object"&&jo];for(var B=0;B<o.length;++B){var f=o[B];if(f&&f.Math==Math)return f}throw Error("Cannot find global object")}var n=t(this);function s(o,B){if(B)e:{var f=n;o=o.split(".");for(var p=0;p<o.length-1;p++){var R=o[p];if(!(R in f))break e;f=f[R]}o=o[o.length-1],p=f[o],B=B(p),B!=p&&B!=null&&e(f,o,{configurable:!0,writable:!0,value:B})}}s("Symbol.dispose",function(o){return o||Symbol("Symbol.dispose")}),s("Array.prototype.values",function(o){return o||function(){return this[Symbol.iterator]()}}),s("Object.entries",function(o){return o||function(B){var f=[],p;for(p in B)Object.prototype.hasOwnProperty.call(B,p)&&f.push([p,B[p]]);return f}});/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/var i=i||{},a=this||self;function u(o){var B=typeof o;return B=="object"&&o!=null||B=="function"}function c(o,B,f){return o.call.apply(o.bind,arguments)}function l(o,B,f){return l=c,l.apply(null,arguments)}function h(o,B){var f=Array.prototype.slice.call(arguments,1);return function(){var p=f.slice();return p.push.apply(p,arguments),o.apply(this,p)}}function d(o,B){function f(){}f.prototype=B.prototype,o.Z=B.prototype,o.prototype=new f,o.prototype.constructor=o,o.Ob=function(p,R,N){for(var H=Array(arguments.length-2),re=2;re<arguments.length;re++)H[re-2]=arguments[re];return B.prototype[R].apply(p,H)}}var C=typeof AsyncContext<"u"&&typeof AsyncContext.Snapshot=="function"?o=>o&&AsyncContext.Snapshot.wrap(o):o=>o;function y(o){let B=o.length;if(B>0){let f=Array(B);for(let p=0;p<B;p++)f[p]=o[p];return f}return[]}function D(o,B){for(let p=1;p<arguments.length;p++){let R=arguments[p];var f=typeof R;if(f=f!="object"?f:R?Array.isArray(R)?"array":f:"null",f=="array"||f=="object"&&typeof R.length=="number"){f=o.length||0;let N=R.length||0;o.length=f+N;for(let H=0;H<N;H++)o[f+H]=R[H]}else o.push(R)}}class P{constructor(B,f){this.i=B,this.j=f,this.h=0,this.g=null}get(){let B;return this.h>0?(this.h--,B=this.g,this.g=B.next,B.next=null):B=this.i(),B}}function V(o){a.setTimeout(()=>{throw o},0)}function q(){var o=A;let B=null;return o.g&&(B=o.g,o.g=o.g.next,o.g||(o.h=null),B.next=null),B}class W{constructor(){this.h=this.g=null}add(B,f){let p=ce.get();p.set(B,f),this.h?this.h.next=p:this.g=p,this.h=p}}var ce=new P(()=>new De,o=>o.reset());class De{constructor(){this.next=this.g=this.h=null}set(B,f){this.h=B,this.g=f,this.next=null}reset(){this.next=this.g=this.h=null}}let Qe,_e=!1,A=new W,E=()=>{let o=Promise.resolve(void 0);Qe=()=>{o.then(w)}};function w(){for(var o;o=q();){try{o.h.call(o.g)}catch(f){V(f)}var B=ce;B.j(o),B.h<100&&(B.h++,o.next=B.g,B.g=o)}_e=!1}function v(){this.u=this.u,this.C=this.C}v.prototype.u=!1,v.prototype.dispose=function(){this.u||(this.u=!0,this.N())},v.prototype[Symbol.dispose]=function(){this.dispose()},v.prototype.N=function(){if(this.C)for(;this.C.length;)this.C.shift()()};function T(o,B){this.type=o,this.g=this.target=B,this.defaultPrevented=!1}T.prototype.h=function(){this.defaultPrevented=!0};var S=(function(){if(!a.addEventListener||!Object.defineProperty)return!1;var o=!1,B=Object.defineProperty({},"passive",{get:function(){o=!0}});try{let f=()=>{};a.addEventListener("test",f,B),a.removeEventListener("test",f,B)}catch{}return o})();function _(o){return/^[\s\xa0]*$/.test(o)}function ot(o,B){T.call(this,o?o.type:""),this.relatedTarget=this.g=this.target=null,this.button=this.screenY=this.screenX=this.clientY=this.clientX=0,this.key="",this.metaKey=this.shiftKey=this.altKey=this.ctrlKey=!1,this.state=null,this.pointerId=0,this.pointerType="",this.i=null,o&&this.init(o,B)}d(ot,T),ot.prototype.init=function(o,B){let f=this.type=o.type,p=o.changedTouches&&o.changedTouches.length?o.changedTouches[0]:null;this.target=o.target||o.srcElement,this.g=B,B=o.relatedTarget,B||(f=="mouseover"?B=o.fromElement:f=="mouseout"&&(B=o.toElement)),this.relatedTarget=B,p?(this.clientX=p.clientX!==void 0?p.clientX:p.pageX,this.clientY=p.clientY!==void 0?p.clientY:p.pageY,this.screenX=p.screenX||0,this.screenY=p.screenY||0):(this.clientX=o.clientX!==void 0?o.clientX:o.pageX,this.clientY=o.clientY!==void 0?o.clientY:o.pageY,this.screenX=o.screenX||0,this.screenY=o.screenY||0),this.button=o.button,this.key=o.key||"",this.ctrlKey=o.ctrlKey,this.altKey=o.altKey,this.shiftKey=o.shiftKey,this.metaKey=o.metaKey,this.pointerId=o.pointerId||0,this.pointerType=o.pointerType,this.state=o.state,this.i=o,o.defaultPrevented&&ot.Z.h.call(this)},ot.prototype.h=function(){ot.Z.h.call(this);let o=this.i;o.preventDefault?o.preventDefault():o.returnValue=!1};var Jn="closure_listenable_"+(Math.random()*1e6|0),Q_=0;function $_(o,B,f,p,R){this.listener=o,this.proxy=null,this.src=B,this.type=f,this.capture=!!p,this.ha=R,this.key=++Q_,this.da=this.fa=!1}function Ua(o){o.da=!0,o.listener=null,o.proxy=null,o.src=null,o.ha=null}function Ha(o,B,f){for(let p in o)B.call(f,o[p],p,o)}function Y_(o,B){for(let f in o)B.call(void 0,o[f],f,o)}function Md(o){let B={};for(let f in o)B[f]=o[f];return B}let Gd="constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");function Ud(o,B){let f,p;for(let R=1;R<arguments.length;R++){p=arguments[R];for(f in p)o[f]=p[f];for(let N=0;N<Gd.length;N++)f=Gd[N],Object.prototype.hasOwnProperty.call(p,f)&&(o[f]=p[f])}}function qa(o){this.src=o,this.g={},this.h=0}qa.prototype.add=function(o,B,f,p,R){let N=o.toString();o=this.g[N],o||(o=this.g[N]=[],this.h++);let H=yc(o,B,p,R);return H>-1?(B=o[H],f||(B.fa=!1)):(B=new $_(B,this.src,N,!!p,R),B.fa=f,o.push(B)),B};function _c(o,B){let f=B.type;if(f in o.g){var p=o.g[f],R=Array.prototype.indexOf.call(p,B,void 0),N;(N=R>=0)&&Array.prototype.splice.call(p,R,1),N&&(Ua(B),o.g[f].length==0&&(delete o.g[f],o.h--))}}function yc(o,B,f,p){for(let R=0;R<o.length;++R){let N=o[R];if(!N.da&&N.listener==B&&N.capture==!!f&&N.ha==p)return R}return-1}var wc="closure_lm_"+(Math.random()*1e6|0),Dc={};function Hd(o,B,f,p,R){if(Array.isArray(B)){for(let N=0;N<B.length;N++)Hd(o,B[N],f,p,R);return null}return f=Kd(f),o&&o[Jn]?o.J(B,f,u(p)?!!p.capture:!1,R):X_(o,B,f,!1,p,R)}function X_(o,B,f,p,R,N){if(!B)throw Error("Invalid event type");let H=u(R)?!!R.capture:!!R,re=Tc(o);if(re||(o[wc]=re=new qa(o)),f=re.add(B,f,p,H,N),f.proxy)return f;if(p=Z_(),f.proxy=p,p.src=o,p.listener=f,o.addEventListener)S||(R=H),R===void 0&&(R=!1),o.addEventListener(B.toString(),p,R);else if(o.attachEvent)o.attachEvent(jd(B.toString()),p);else if(o.addListener&&o.removeListener)o.addListener(p);else throw Error("addEventListener and attachEvent are unavailable.");return f}function Z_(){function o(f){return B.call(o.src,o.listener,f)}let B=ey;return o}function qd(o,B,f,p,R){if(Array.isArray(B))for(var N=0;N<B.length;N++)qd(o,B[N],f,p,R);else p=u(p)?!!p.capture:!!p,f=Kd(f),o&&o[Jn]?(o=o.i,N=String(B).toString(),N in o.g&&(B=o.g[N],f=yc(B,f,p,R),f>-1&&(Ua(B[f]),Array.prototype.splice.call(B,f,1),B.length==0&&(delete o.g[N],o.h--)))):o&&(o=Tc(o))&&(B=o.g[B.toString()],o=-1,B&&(o=yc(B,f,p,R)),(f=o>-1?B[o]:null)&&Ic(f))}function Ic(o){if(typeof o!="number"&&o&&!o.da){var B=o.src;if(B&&B[Jn])_c(B.i,o);else{var f=o.type,p=o.proxy;B.removeEventListener?B.removeEventListener(f,p,o.capture):B.detachEvent?B.detachEvent(jd(f),p):B.addListener&&B.removeListener&&B.removeListener(p),(f=Tc(B))?(_c(f,o),f.h==0&&(f.src=null,B[wc]=null)):Ua(o)}}}function jd(o){return o in Dc?Dc[o]:Dc[o]="on"+o}function ey(o,B){if(o.da)o=!0;else{B=new ot(B,this);let f=o.listener,p=o.ha||o.src;o.fa&&Ic(o),o=f.call(p,B)}return o}function Tc(o){return o=o[wc],o instanceof qa?o:null}var Ac="__closure_events_fn_"+(Math.random()*1e9>>>0);function Kd(o){return typeof o=="function"?o:(o[Ac]||(o[Ac]=function(B){return o.handleEvent(B)}),o[Ac])}function $e(){v.call(this),this.i=new qa(this),this.M=this,this.G=null}d($e,v),$e.prototype[Jn]=!0,$e.prototype.removeEventListener=function(o,B,f,p){qd(this,o,B,f,p)};function rt(o,B){var f,p=o.G;if(p)for(f=[];p;p=p.G)f.push(p);if(o=o.M,p=B.type||B,typeof B=="string")B=new T(B,o);else if(B instanceof T)B.target=B.target||o;else{var R=B;B=new T(p,o),Ud(B,R)}R=!0;let N,H;if(f)for(H=f.length-1;H>=0;H--)N=B.g=f[H],R=ja(N,p,!0,B)&&R;if(N=B.g=o,R=ja(N,p,!0,B)&&R,R=ja(N,p,!1,B)&&R,f)for(H=0;H<f.length;H++)N=B.g=f[H],R=ja(N,p,!1,B)&&R}$e.prototype.N=function(){if($e.Z.N.call(this),this.i){var o=this.i;for(let B in o.g){let f=o.g[B];for(let p=0;p<f.length;p++)Ua(f[p]);delete o.g[B],o.h--}}this.G=null},$e.prototype.J=function(o,B,f,p){return this.i.add(String(o),B,!1,f,p)},$e.prototype.K=function(o,B,f,p){return this.i.add(String(o),B,!0,f,p)};function ja(o,B,f,p){if(B=o.i.g[String(B)],!B)return!0;B=B.concat();let R=!0;for(let N=0;N<B.length;++N){let H=B[N];if(H&&!H.da&&H.capture==f){let re=H.listener,Ne=H.ha||H.src;H.fa&&_c(o.i,H),R=re.call(Ne,p)!==!1&&R}}return R&&!p.defaultPrevented}function ty(o,B){if(typeof o!="function")if(o&&typeof o.handleEvent=="function")o=l(o.handleEvent,o);else throw Error("Invalid listener argument");return Number(B)>2147483647?-1:a.setTimeout(o,B||0)}function Jd(o){o.g=ty(()=>{o.g=null,o.i&&(o.i=!1,Jd(o))},o.l);let B=o.h;o.h=null,o.m.apply(null,B)}class ny extends v{constructor(B,f){super(),this.m=B,this.l=f,this.h=null,this.i=!1,this.g=null}j(B){this.h=arguments,this.g?this.i=!0:Jd(this)}N(){super.N(),this.g&&(a.clearTimeout(this.g),this.g=null,this.i=!1,this.h=null)}}function Xs(o){v.call(this),this.h=o,this.g={}}d(Xs,v);var zd=[];function Wd(o){Ha(o.g,function(B,f){this.g.hasOwnProperty(f)&&Ic(B)},o),o.g={}}Xs.prototype.N=function(){Xs.Z.N.call(this),Wd(this)},Xs.prototype.handleEvent=function(){throw Error("EventHandler.handleEvent not implemented")};var bc=a.JSON.stringify,ry=a.JSON.parse,sy=class{stringify(o){return a.JSON.stringify(o,void 0)}parse(o){return a.JSON.parse(o,void 0)}};function Qd(){}function $d(){}var Zs={OPEN:"a",hb:"b",ERROR:"c",tb:"d"};function vc(){T.call(this,"d")}d(vc,T);function Rc(){T.call(this,"c")}d(Rc,T);var zn={},Yd=null;function Ka(){return Yd=Yd||new $e}zn.Ia="serverreachability";function Xd(o){T.call(this,zn.Ia,o)}d(Xd,T);function ei(o){let B=Ka();rt(B,new Xd(B))}zn.STAT_EVENT="statevent";function Zd(o,B){T.call(this,zn.STAT_EVENT,o),this.stat=B}d(Zd,T);function st(o){let B=Ka();rt(B,new Zd(B,o))}zn.Ja="timingevent";function ep(o,B){T.call(this,zn.Ja,o),this.size=B}d(ep,T);function ti(o,B){if(typeof o!="function")throw Error("Fn must not be null and must be a function");return a.setTimeout(function(){o()},B)}function ni(){this.g=!0}ni.prototype.ua=function(){this.g=!1};function iy(o,B,f,p,R,N){o.info(function(){if(o.g)if(N){var H="",re=N.split("&");for(let de=0;de<re.length;de++){var Ne=re[de].split("=");if(Ne.length>1){let Le=Ne[0];Ne=Ne[1];let Ut=Le.split("_");H=Ut.length>=2&&Ut[1]=="type"?H+(Le+"="+Ne+"&"):H+(Le+"=redacted&")}}}else H=null;else H=N;return"XMLHTTP REQ ("+p+") [attempt "+R+"]: "+B+`
`+f+`
`+H})}function ay(o,B,f,p,R,N,H){o.info(function(){return"XMLHTTP RESP ("+p+") [ attempt "+R+"]: "+B+`
`+f+`
`+N+" "+H})}function Kr(o,B,f,p){o.info(function(){return"XMLHTTP TEXT ("+B+"): "+uy(o,f)+(p?" "+p:"")})}function oy(o,B){o.info(function(){return"TIMEOUT: "+B})}ni.prototype.info=function(){};function uy(o,B){if(!o.g)return B;if(!B)return null;try{let N=JSON.parse(B);if(N){for(o=0;o<N.length;o++)if(Array.isArray(N[o])){var f=N[o];if(!(f.length<2)){var p=f[1];if(Array.isArray(p)&&!(p.length<1)){var R=p[0];if(R!="noop"&&R!="stop"&&R!="close")for(let H=1;H<p.length;H++)p[H]=""}}}}return bc(N)}catch{return B}}var Ja={NO_ERROR:0,cb:1,qb:2,pb:3,kb:4,ob:5,rb:6,Ga:7,TIMEOUT:8,ub:9},tp={ib:"complete",Fb:"success",ERROR:"error",Ga:"abort",xb:"ready",yb:"readystatechange",TIMEOUT:"timeout",sb:"incrementaldata",wb:"progress",lb:"downloadprogress",Nb:"uploadprogress"},np;function Sc(){}d(Sc,Qd),Sc.prototype.g=function(){return new XMLHttpRequest},np=new Sc;function ri(o){return encodeURIComponent(String(o))}function cy(o){var B=1;o=o.split(":");let f=[];for(;B>0&&o.length;)f.push(o.shift()),B--;return o.length&&f.push(o.join(":")),f}function Dn(o,B,f,p){this.j=o,this.i=B,this.l=f,this.S=p||1,this.V=new Xs(this),this.H=45e3,this.J=null,this.o=!1,this.u=this.B=this.A=this.M=this.F=this.T=this.D=null,this.G=[],this.g=null,this.C=0,this.m=this.v=null,this.X=-1,this.K=!1,this.P=0,this.O=null,this.W=this.L=this.U=this.R=!1,this.h=new rp}function rp(){this.i=null,this.g="",this.h=!1}var sp={},Pc={};function Nc(o,B,f){o.M=1,o.A=Wa(Gt(B)),o.u=f,o.R=!0,ip(o,null)}function ip(o,B){o.F=Date.now(),za(o),o.B=Gt(o.A);var f=o.B,p=o.S;Array.isArray(p)||(p=[String(p)]),mp(f.i,"t",p),o.C=0,f=o.j.L,o.h=new rp,o.g=Lp(o.j,f?B:null,!o.u),o.P>0&&(o.O=new ny(l(o.Y,o,o.g),o.P)),B=o.V,f=o.g,p=o.ba;var R="readystatechange";Array.isArray(R)||(R&&(zd[0]=R.toString()),R=zd);for(let N=0;N<R.length;N++){let H=Hd(f,R[N],p||B.handleEvent,!1,B.h||B);if(!H)break;B.g[H.key]=H}B=o.J?Md(o.J):{},o.u?(o.v||(o.v="POST"),B["Content-Type"]="application/x-www-form-urlencoded",o.g.ea(o.B,o.v,o.u,B)):(o.v="GET",o.g.ea(o.B,o.v,null,B)),ei(),iy(o.i,o.v,o.B,o.l,o.S,o.u)}Dn.prototype.ba=function(o){o=o.target;let B=this.O;B&&An(o)==3?B.j():this.Y(o)},Dn.prototype.Y=function(o){try{if(o==this.g)e:{let re=An(this.g),Ne=this.g.ya(),de=this.g.ca();if(!(re<3)&&(re!=3||this.g&&(this.h.h||this.g.la()||Tp(this.g)))){this.K||re!=4||Ne==7||(Ne==8||de<=0?ei(3):ei(2)),Oc(this);var B=this.g.ca();this.X=B;var f=ly(this);if(this.o=B==200,ay(this.i,this.v,this.B,this.l,this.S,re,B),this.o){if(this.U&&!this.L){t:{if(this.g){var p,R=this.g;if((p=R.g?R.g.getResponseHeader("X-HTTP-Initial-Response"):null)&&!_(p)){var N=p;break t}}N=null}if(o=N)Kr(this.i,this.l,o,"Initial handshake response via X-HTTP-Initial-Response"),this.L=!0,xc(this,o);else{this.o=!1,this.m=3,st(12),Wn(this),si(this);break e}}if(this.R){o=!0;let Le;for(;!this.K&&this.C<f.length;)if(Le=By(this,f),Le==Pc){re==4&&(this.m=4,st(14),o=!1),Kr(this.i,this.l,null,"[Incomplete Response]");break}else if(Le==sp){this.m=4,st(15),Kr(this.i,this.l,f,"[Invalid Chunk]"),o=!1;break}else Kr(this.i,this.l,Le,null),xc(this,Le);if(ap(this)&&this.C!=0&&(this.h.g=this.h.g.slice(this.C),this.C=0),re!=4||f.length!=0||this.h.h||(this.m=1,st(16),o=!1),this.o=this.o&&o,!o)Kr(this.i,this.l,f,"[Invalid Chunked Response]"),Wn(this),si(this);else if(f.length>0&&!this.W){this.W=!0;var H=this.j;H.g==this&&H.aa&&!H.P&&(H.j.info("Great, no buffering proxy detected. Bytes received: "+f.length),Uc(H),H.P=!0,st(11))}}else Kr(this.i,this.l,f,null),xc(this,f);re==4&&Wn(this),this.o&&!this.K&&(re==4?Np(this.j,this):(this.o=!1,za(this)))}else Ty(this.g),B==400&&f.indexOf("Unknown SID")>0?(this.m=3,st(12)):(this.m=0,st(13)),Wn(this),si(this)}}}catch{}};function ly(o){if(!ap(o))return o.g.la();let B=Tp(o.g);if(B==="")return"";let f="",p=B.length,R=An(o.g)==4;if(!o.h.i){if(typeof TextDecoder>"u")return Wn(o),si(o),"";o.h.i=new a.TextDecoder}for(let N=0;N<p;N++)o.h.h=!0,f+=o.h.i.decode(B[N],{stream:!(R&&N==p-1)});return B.length=0,o.h.g+=f,o.C=0,o.h.g}function ap(o){return o.g?o.v=="GET"&&o.M!=2&&o.j.Aa:!1}function By(o,B){var f=o.C,p=B.indexOf(`
`,f);return p==-1?Pc:(f=Number(B.substring(f,p)),isNaN(f)?sp:(p+=1,p+f>B.length?Pc:(B=B.slice(p,p+f),o.C=p+f,B)))}Dn.prototype.cancel=function(){this.K=!0,Wn(this)};function za(o){o.T=Date.now()+o.H,op(o,o.H)}function op(o,B){if(o.D!=null)throw Error("WatchDog timer not null");o.D=ti(l(o.aa,o),B)}function Oc(o){o.D&&(a.clearTimeout(o.D),o.D=null)}Dn.prototype.aa=function(){this.D=null;let o=Date.now();o-this.T>=0?(oy(this.i,this.B),this.M!=2&&(ei(),st(17)),Wn(this),this.m=2,si(this)):op(this,this.T-o)};function si(o){o.j.I==0||o.K||Np(o.j,o)}function Wn(o){Oc(o);var B=o.O;B&&typeof B.dispose=="function"&&B.dispose(),o.O=null,Wd(o.V),o.g&&(B=o.g,o.g=null,B.abort(),B.dispose())}function xc(o,B){try{var f=o.j;if(f.I!=0&&(f.g==o||Fc(f.h,o))){if(!o.L&&Fc(f.h,o)&&f.I==3){try{var p=f.Ba.g.parse(B)}catch{p=null}if(Array.isArray(p)&&p.length==3){var R=p;if(R[0]==0){e:if(!f.v){if(f.g)if(f.g.F+3e3<o.F)eo(f),Xa(f);else break e;Gc(f),st(18)}}else f.xa=R[1],0<f.xa-f.K&&R[2]<37500&&f.F&&f.A==0&&!f.C&&(f.C=ti(l(f.Va,f),6e3));lp(f.h)<=1&&f.ta&&(f.ta=void 0)}else $n(f,11)}else if((o.L||f.g==o)&&eo(f),!_(B))for(R=f.Ba.g.parse(B),B=0;B<R.length;B++){let de=R[B],Le=de[0];if(!(Le<=f.K))if(f.K=Le,de=de[1],f.I==2)if(de[0]=="c"){f.M=de[1],f.ba=de[2];let Ut=de[3];Ut!=null&&(f.ka=Ut,f.j.info("VER="+f.ka));let Yn=de[4];Yn!=null&&(f.za=Yn,f.j.info("SVER="+f.za));let bn=de[5];bn!=null&&typeof bn=="number"&&bn>0&&(p=1.5*bn,f.O=p,f.j.info("backChannelRequestTimeoutMs_="+p)),p=f;let vn=o.g;if(vn){let no=vn.g?vn.g.getResponseHeader("X-Client-Wire-Protocol"):null;if(no){var N=p.h;N.g||no.indexOf("spdy")==-1&&no.indexOf("quic")==-1&&no.indexOf("h2")==-1||(N.j=N.l,N.g=new Set,N.h&&(Lc(N,N.h),N.h=null))}if(p.G){let Hc=vn.g?vn.g.getResponseHeader("X-HTTP-Session-Id"):null;Hc&&(p.wa=Hc,me(p.J,p.G,Hc))}}f.I=3,f.l&&f.l.ra(),f.aa&&(f.T=Date.now()-o.F,f.j.info("Handshake RTT: "+f.T+"ms")),p=f;var H=o;if(p.na=Fp(p,p.L?p.ba:null,p.W),H.L){Bp(p.h,H);var re=H,Ne=p.O;Ne&&(re.H=Ne),re.D&&(Oc(re),za(re)),p.g=H}else Sp(p);f.i.length>0&&Za(f)}else de[0]!="stop"&&de[0]!="close"||$n(f,7);else f.I==3&&(de[0]=="stop"||de[0]=="close"?de[0]=="stop"?$n(f,7):Mc(f):de[0]!="noop"&&f.l&&f.l.qa(de),f.A=0)}}ei(4)}catch{}}var hy=class{constructor(o,B){this.g=o,this.map=B}};function up(o){this.l=o||10,a.PerformanceNavigationTiming?(o=a.performance.getEntriesByType("navigation"),o=o.length>0&&(o[0].nextHopProtocol=="hq"||o[0].nextHopProtocol=="h2")):o=!!(a.chrome&&a.chrome.loadTimes&&a.chrome.loadTimes()&&a.chrome.loadTimes().wasFetchedViaSpdy),this.j=o?this.l:1,this.g=null,this.j>1&&(this.g=new Set),this.h=null,this.i=[]}function cp(o){return o.h?!0:o.g?o.g.size>=o.j:!1}function lp(o){return o.h?1:o.g?o.g.size:0}function Fc(o,B){return o.h?o.h==B:o.g?o.g.has(B):!1}function Lc(o,B){o.g?o.g.add(B):o.h=B}function Bp(o,B){o.h&&o.h==B?o.h=null:o.g&&o.g.has(B)&&o.g.delete(B)}up.prototype.cancel=function(){if(this.i=hp(this),this.h)this.h.cancel(),this.h=null;else if(this.g&&this.g.size!==0){for(let o of this.g.values())o.cancel();this.g.clear()}};function hp(o){if(o.h!=null)return o.i.concat(o.h.G);if(o.g!=null&&o.g.size!==0){let B=o.i;for(let f of o.g.values())B=B.concat(f.G);return B}return y(o.i)}var fp=RegExp("^(?:([^:/?#.]+):)?(?://(?:([^\\\\/?#]*)@)?([^\\\\/?#]*?)(?::([0-9]+))?(?=[\\\\/?#]|$))?([^?#]+)?(?:\\?([^#]*))?(?:#([\\s\\S]*))?$");function fy(o,B){if(o){o=o.split("&");for(let f=0;f<o.length;f++){let p=o[f].indexOf("="),R,N=null;p>=0?(R=o[f].substring(0,p),N=o[f].substring(p+1)):R=o[f],B(R,N?decodeURIComponent(N.replace(/\+/g," ")):"")}}}function In(o){this.g=this.o=this.j="",this.u=null,this.m=this.h="",this.l=!1;let B;o instanceof In?(this.l=o.l,ii(this,o.j),this.o=o.o,this.g=o.g,ai(this,o.u),this.h=o.h,kc(this,Ep(o.i)),this.m=o.m):o&&(B=String(o).match(fp))?(this.l=!1,ii(this,B[1]||"",!0),this.o=oi(B[2]||""),this.g=oi(B[3]||"",!0),ai(this,B[4]),this.h=oi(B[5]||"",!0),kc(this,B[6]||"",!0),this.m=oi(B[7]||"")):(this.l=!1,this.i=new ci(null,this.l))}In.prototype.toString=function(){let o=[];var B=this.j;B&&o.push(ui(B,dp,!0),":");var f=this.g;return(f||B=="file")&&(o.push("//"),(B=this.o)&&o.push(ui(B,dp,!0),"@"),o.push(ri(f).replace(/%25([0-9a-fA-F]{2})/g,"%$1")),f=this.u,f!=null&&o.push(":",String(f))),(f=this.h)&&(this.g&&f.charAt(0)!="/"&&o.push("/"),o.push(ui(f,f.charAt(0)=="/"?Cy:py,!0))),(f=this.i.toString())&&o.push("?",f),(f=this.m)&&o.push("#",ui(f,my)),o.join("")},In.prototype.resolve=function(o){let B=Gt(this),f=!!o.j;f?ii(B,o.j):f=!!o.o,f?B.o=o.o:f=!!o.g,f?B.g=o.g:f=o.u!=null;var p=o.h;if(f)ai(B,o.u);else if(f=!!o.h){if(p.charAt(0)!="/")if(this.g&&!this.h)p="/"+p;else{var R=B.h.lastIndexOf("/");R!=-1&&(p=B.h.slice(0,R+1)+p)}if(R=p,R==".."||R==".")p="";else if(R.indexOf("./")!=-1||R.indexOf("/.")!=-1){p=R.lastIndexOf("/",0)==0,R=R.split("/");let N=[];for(let H=0;H<R.length;){let re=R[H++];re=="."?p&&H==R.length&&N.push(""):re==".."?((N.length>1||N.length==1&&N[0]!="")&&N.pop(),p&&H==R.length&&N.push("")):(N.push(re),p=!0)}p=N.join("/")}else p=R}return f?B.h=p:f=o.i.toString()!=="",f?kc(B,Ep(o.i)):f=!!o.m,f&&(B.m=o.m),B};function Gt(o){return new In(o)}function ii(o,B,f){o.j=f?oi(B,!0):B,o.j&&(o.j=o.j.replace(/:$/,""))}function ai(o,B){if(B){if(B=Number(B),isNaN(B)||B<0)throw Error("Bad port number "+B);o.u=B}else o.u=null}function kc(o,B,f){B instanceof ci?(o.i=B,Ey(o.i,o.l)):(f||(B=ui(B,gy)),o.i=new ci(B,o.l))}function me(o,B,f){o.i.set(B,f)}function Wa(o){return me(o,"zx",Math.floor(Math.random()*2147483648).toString(36)+Math.abs(Math.floor(Math.random()*2147483648)^Date.now()).toString(36)),o}function oi(o,B){return o?B?decodeURI(o.replace(/%25/g,"%2525")):decodeURIComponent(o):""}function ui(o,B,f){return typeof o=="string"?(o=encodeURI(o).replace(B,dy),f&&(o=o.replace(/%25([0-9a-fA-F]{2})/g,"%$1")),o):null}function dy(o){return o=o.charCodeAt(0),"%"+(o>>4&15).toString(16)+(o&15).toString(16)}var dp=/[#\/\?@]/g,py=/[#\?:]/g,Cy=/[#\?]/g,gy=/[#\?@]/g,my=/#/g;function ci(o,B){this.h=this.g=null,this.i=o||null,this.j=!!B}function Qn(o){o.g||(o.g=new Map,o.h=0,o.i&&fy(o.i,function(B,f){o.add(decodeURIComponent(B.replace(/\+/g," ")),f)}))}r=ci.prototype,r.add=function(o,B){Qn(this),this.i=null,o=Jr(this,o);let f=this.g.get(o);return f||this.g.set(o,f=[]),f.push(B),this.h+=1,this};function pp(o,B){Qn(o),B=Jr(o,B),o.g.has(B)&&(o.i=null,o.h-=o.g.get(B).length,o.g.delete(B))}function Cp(o,B){return Qn(o),B=Jr(o,B),o.g.has(B)}r.forEach=function(o,B){Qn(this),this.g.forEach(function(f,p){f.forEach(function(R){o.call(B,R,p,this)},this)},this)};function gp(o,B){Qn(o);let f=[];if(typeof B=="string")Cp(o,B)&&(f=f.concat(o.g.get(Jr(o,B))));else for(o=Array.from(o.g.values()),B=0;B<o.length;B++)f=f.concat(o[B]);return f}r.set=function(o,B){return Qn(this),this.i=null,o=Jr(this,o),Cp(this,o)&&(this.h-=this.g.get(o).length),this.g.set(o,[B]),this.h+=1,this},r.get=function(o,B){return o?(o=gp(this,o),o.length>0?String(o[0]):B):B};function mp(o,B,f){pp(o,B),f.length>0&&(o.i=null,o.g.set(Jr(o,B),y(f)),o.h+=f.length)}r.toString=function(){if(this.i)return this.i;if(!this.g)return"";let o=[],B=Array.from(this.g.keys());for(let p=0;p<B.length;p++){var f=B[p];let R=ri(f);f=gp(this,f);for(let N=0;N<f.length;N++){let H=R;f[N]!==""&&(H+="="+ri(f[N])),o.push(H)}}return this.i=o.join("&")};function Ep(o){let B=new ci;return B.i=o.i,o.g&&(B.g=new Map(o.g),B.h=o.h),B}function Jr(o,B){return B=String(B),o.j&&(B=B.toLowerCase()),B}function Ey(o,B){B&&!o.j&&(Qn(o),o.i=null,o.g.forEach(function(f,p){let R=p.toLowerCase();p!=R&&(pp(this,p),mp(this,R,f))},o)),o.j=B}function _y(o,B){let f=new ni;if(a.Image){let p=new Image;p.onload=h(Tn,f,"TestLoadImage: loaded",!0,B,p),p.onerror=h(Tn,f,"TestLoadImage: error",!1,B,p),p.onabort=h(Tn,f,"TestLoadImage: abort",!1,B,p),p.ontimeout=h(Tn,f,"TestLoadImage: timeout",!1,B,p),a.setTimeout(function(){p.ontimeout&&p.ontimeout()},1e4),p.src=o}else B(!1)}function yy(o,B){let f=new ni,p=new AbortController,R=setTimeout(()=>{p.abort(),Tn(f,"TestPingServer: timeout",!1,B)},1e4);fetch(o,{signal:p.signal}).then(N=>{clearTimeout(R),N.ok?Tn(f,"TestPingServer: ok",!0,B):Tn(f,"TestPingServer: server error",!1,B)}).catch(()=>{clearTimeout(R),Tn(f,"TestPingServer: error",!1,B)})}function Tn(o,B,f,p,R){try{R&&(R.onload=null,R.onerror=null,R.onabort=null,R.ontimeout=null),p(f)}catch{}}function wy(){this.g=new sy}function Qa(o){this.i=o.Sb||null,this.h=o.ab||!1}d(Qa,Qd),Qa.prototype.g=function(){return new $a(this.i,this.h)};function $a(o,B){$e.call(this),this.H=o,this.o=B,this.m=void 0,this.status=this.readyState=0,this.responseType=this.responseText=this.response=this.statusText="",this.onreadystatechange=null,this.A=new Headers,this.h=null,this.F="GET",this.D="",this.g=!1,this.B=this.j=this.l=null,this.v=new AbortController}d($a,$e),r=$a.prototype,r.open=function(o,B){if(this.readyState!=0)throw this.abort(),Error("Error reopening a connection");this.F=o,this.D=B,this.readyState=1,Bi(this)},r.send=function(o){if(this.readyState!=1)throw this.abort(),Error("need to call open() first. ");if(this.v.signal.aborted)throw this.abort(),Error("Request was aborted.");this.g=!0;let B={headers:this.A,method:this.F,credentials:this.m,cache:void 0,signal:this.v.signal};o&&(B.body=o),(this.H||a).fetch(new Request(this.D,B)).then(this.Pa.bind(this),this.ga.bind(this))},r.abort=function(){this.response=this.responseText="",this.A=new Headers,this.status=0,this.v.abort(),this.j&&this.j.cancel("Request was aborted.").catch(()=>{}),this.readyState>=1&&this.g&&this.readyState!=4&&(this.g=!1,li(this)),this.readyState=0},r.Pa=function(o){if(this.g&&(this.l=o,this.h||(this.status=this.l.status,this.statusText=this.l.statusText,this.h=o.headers,this.readyState=2,Bi(this)),this.g&&(this.readyState=3,Bi(this),this.g)))if(this.responseType==="arraybuffer")o.arrayBuffer().then(this.Na.bind(this),this.ga.bind(this));else if(typeof a.ReadableStream<"u"&&"body"in o){if(this.j=o.body.getReader(),this.o){if(this.responseType)throw Error('responseType must be empty for "streamBinaryChunks" mode responses.');this.response=[]}else this.response=this.responseText="",this.B=new TextDecoder;_p(this)}else o.text().then(this.Oa.bind(this),this.ga.bind(this))};function _p(o){o.j.read().then(o.Ma.bind(o)).catch(o.ga.bind(o))}r.Ma=function(o){if(this.g){if(this.o&&o.value)this.response.push(o.value);else if(!this.o){var B=o.value?o.value:new Uint8Array(0);(B=this.B.decode(B,{stream:!o.done}))&&(this.response=this.responseText+=B)}o.done?li(this):Bi(this),this.readyState==3&&_p(this)}},r.Oa=function(o){this.g&&(this.response=this.responseText=o,li(this))},r.Na=function(o){this.g&&(this.response=o,li(this))},r.ga=function(){this.g&&li(this)};function li(o){o.readyState=4,o.l=null,o.j=null,o.B=null,Bi(o)}r.setRequestHeader=function(o,B){this.A.append(o,B)},r.getResponseHeader=function(o){return this.h&&this.h.get(o.toLowerCase())||""},r.getAllResponseHeaders=function(){if(!this.h)return"";let o=[],B=this.h.entries();for(var f=B.next();!f.done;)f=f.value,o.push(f[0]+": "+f[1]),f=B.next();return o.join(`\r
`)};function Bi(o){o.onreadystatechange&&o.onreadystatechange.call(o)}Object.defineProperty($a.prototype,"withCredentials",{get:function(){return this.m==="include"},set:function(o){this.m=o?"include":"same-origin"}});function yp(o){let B="";return Ha(o,function(f,p){B+=p,B+=":",B+=f,B+=`\r
`}),B}function Vc(o,B,f){e:{for(p in f){var p=!1;break e}p=!0}p||(f=yp(f),typeof o=="string"?f!=null&&ri(f):me(o,B,f))}function Ie(o){$e.call(this),this.headers=new Map,this.L=o||null,this.h=!1,this.g=null,this.D="",this.o=0,this.l="",this.j=this.B=this.v=this.A=!1,this.m=null,this.F="",this.H=!1}d(Ie,$e);var Dy=/^https?$/i,Iy=["POST","PUT"];r=Ie.prototype,r.Fa=function(o){this.H=o},r.ea=function(o,B,f,p){if(this.g)throw Error("[goog.net.XhrIo] Object is active with another request="+this.D+"; newUri="+o);B=B?B.toUpperCase():"GET",this.D=o,this.l="",this.o=0,this.A=!1,this.h=!0,this.g=this.L?this.L.g():np.g(),this.g.onreadystatechange=C(l(this.Ca,this));try{this.B=!0,this.g.open(B,String(o),!0),this.B=!1}catch(N){wp(this,N);return}if(o=f||"",f=new Map(this.headers),p)if(Object.getPrototypeOf(p)===Object.prototype)for(var R in p)f.set(R,p[R]);else if(typeof p.keys=="function"&&typeof p.get=="function")for(let N of p.keys())f.set(N,p.get(N));else throw Error("Unknown input type for opt_headers: "+String(p));p=Array.from(f.keys()).find(N=>N.toLowerCase()=="content-type"),R=a.FormData&&o instanceof a.FormData,!(Array.prototype.indexOf.call(Iy,B,void 0)>=0)||p||R||f.set("Content-Type","application/x-www-form-urlencoded;charset=utf-8");for(let[N,H]of f)this.g.setRequestHeader(N,H);this.F&&(this.g.responseType=this.F),"withCredentials"in this.g&&this.g.withCredentials!==this.H&&(this.g.withCredentials=this.H);try{this.m&&(clearTimeout(this.m),this.m=null),this.v=!0,this.g.send(o),this.v=!1}catch(N){wp(this,N)}};function wp(o,B){o.h=!1,o.g&&(o.j=!0,o.g.abort(),o.j=!1),o.l=B,o.o=5,Dp(o),Ya(o)}function Dp(o){o.A||(o.A=!0,rt(o,"complete"),rt(o,"error"))}r.abort=function(o){this.g&&this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1,this.o=o||7,rt(this,"complete"),rt(this,"abort"),Ya(this))},r.N=function(){this.g&&(this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1),Ya(this,!0)),Ie.Z.N.call(this)},r.Ca=function(){this.u||(this.B||this.v||this.j?Ip(this):this.Xa())},r.Xa=function(){Ip(this)};function Ip(o){if(o.h&&typeof i<"u"){if(o.v&&An(o)==4)setTimeout(o.Ca.bind(o),0);else if(rt(o,"readystatechange"),An(o)==4){o.h=!1;try{let N=o.ca();e:switch(N){case 200:case 201:case 202:case 204:case 206:case 304:case 1223:var B=!0;break e;default:B=!1}var f;if(!(f=B)){var p;if(p=N===0){let H=String(o.D).match(fp)[1]||null;!H&&a.self&&a.self.location&&(H=a.self.location.protocol.slice(0,-1)),p=!Dy.test(H?H.toLowerCase():"")}f=p}if(f)rt(o,"complete"),rt(o,"success");else{o.o=6;try{var R=An(o)>2?o.g.statusText:""}catch{R=""}o.l=R+" ["+o.ca()+"]",Dp(o)}}finally{Ya(o)}}}}function Ya(o,B){if(o.g){o.m&&(clearTimeout(o.m),o.m=null);let f=o.g;o.g=null,B||rt(o,"ready");try{f.onreadystatechange=null}catch{}}}r.isActive=function(){return!!this.g};function An(o){return o.g?o.g.readyState:0}r.ca=function(){try{return An(this)>2?this.g.status:-1}catch{return-1}},r.la=function(){try{return this.g?this.g.responseText:""}catch{return""}},r.La=function(o){if(this.g){var B=this.g.responseText;return o&&B.indexOf(o)==0&&(B=B.substring(o.length)),ry(B)}};function Tp(o){try{if(!o.g)return null;if("response"in o.g)return o.g.response;switch(o.F){case"":case"text":return o.g.responseText;case"arraybuffer":if("mozResponseArrayBuffer"in o.g)return o.g.mozResponseArrayBuffer}return null}catch{return null}}function Ty(o){let B={};o=(o.g&&An(o)>=2&&o.g.getAllResponseHeaders()||"").split(`\r
`);for(let p=0;p<o.length;p++){if(_(o[p]))continue;var f=cy(o[p]);let R=f[0];if(f=f[1],typeof f!="string")continue;f=f.trim();let N=B[R]||[];B[R]=N,N.push(f)}Y_(B,function(p){return p.join(", ")})}r.ya=function(){return this.o},r.Ha=function(){return typeof this.l=="string"?this.l:String(this.l)};function hi(o,B,f){return f&&f.internalChannelParams&&f.internalChannelParams[o]||B}function Ap(o){this.za=0,this.i=[],this.j=new ni,this.ba=this.na=this.J=this.W=this.g=this.wa=this.G=this.H=this.u=this.U=this.o=null,this.Ya=this.V=0,this.Sa=hi("failFast",!1,o),this.F=this.C=this.v=this.m=this.l=null,this.X=!0,this.xa=this.K=-1,this.Y=this.A=this.D=0,this.Qa=hi("baseRetryDelayMs",5e3,o),this.Za=hi("retryDelaySeedMs",1e4,o),this.Ta=hi("forwardChannelMaxRetries",2,o),this.va=hi("forwardChannelRequestTimeoutMs",2e4,o),this.ma=o&&o.xmlHttpFactory||void 0,this.Ua=o&&o.Rb||void 0,this.Aa=o&&o.useFetchStreams||!1,this.O=void 0,this.L=o&&o.supportsCrossDomainXhr||!1,this.M="",this.h=new up(o&&o.concurrentRequestLimit),this.Ba=new wy,this.S=o&&o.fastHandshake||!1,this.R=o&&o.encodeInitMessageHeaders||!1,this.S&&this.R&&(this.R=!1),this.Ra=o&&o.Pb||!1,o&&o.ua&&this.j.ua(),o&&o.forceLongPolling&&(this.X=!1),this.aa=!this.S&&this.X&&o&&o.detectBufferingProxy||!1,this.ia=void 0,o&&o.longPollingTimeout&&o.longPollingTimeout>0&&(this.ia=o.longPollingTimeout),this.ta=void 0,this.T=0,this.P=!1,this.ja=this.B=null}r=Ap.prototype,r.ka=8,r.I=1,r.connect=function(o,B,f,p){st(0),this.W=o,this.H=B||{},f&&p!==void 0&&(this.H.OSID=f,this.H.OAID=p),this.F=this.X,this.J=Fp(this,null,this.W),Za(this)};function Mc(o){if(bp(o),o.I==3){var B=o.V++,f=Gt(o.J);if(me(f,"SID",o.M),me(f,"RID",B),me(f,"TYPE","terminate"),fi(o,f),B=new Dn(o,o.j,B),B.M=2,B.A=Wa(Gt(f)),f=!1,a.navigator&&a.navigator.sendBeacon)try{f=a.navigator.sendBeacon(B.A.toString(),"")}catch{}!f&&a.Image&&(new Image().src=B.A,f=!0),f||(B.g=Lp(B.j,null),B.g.ea(B.A)),B.F=Date.now(),za(B)}xp(o)}function Xa(o){o.g&&(Uc(o),o.g.cancel(),o.g=null)}function bp(o){Xa(o),o.v&&(a.clearTimeout(o.v),o.v=null),eo(o),o.h.cancel(),o.m&&(typeof o.m=="number"&&a.clearTimeout(o.m),o.m=null)}function Za(o){if(!cp(o.h)&&!o.m){o.m=!0;var B=o.Ea;Qe||E(),_e||(Qe(),_e=!0),A.add(B,o),o.D=0}}function Ay(o,B){return lp(o.h)>=o.h.j-(o.m?1:0)?!1:o.m?(o.i=B.G.concat(o.i),!0):o.I==1||o.I==2||o.D>=(o.Sa?0:o.Ta)?!1:(o.m=ti(l(o.Ea,o,B),Op(o,o.D)),o.D++,!0)}r.Ea=function(o){if(this.m)if(this.m=null,this.I==1){if(!o){this.V=Math.floor(Math.random()*1e5),o=this.V++;let R=new Dn(this,this.j,o),N=this.o;if(this.U&&(N?(N=Md(N),Ud(N,this.U)):N=this.U),this.u!==null||this.R||(R.J=N,N=null),this.S)e:{for(var B=0,f=0;f<this.i.length;f++){t:{var p=this.i[f];if("__data__"in p.map&&(p=p.map.__data__,typeof p=="string")){p=p.length;break t}p=void 0}if(p===void 0)break;if(B+=p,B>4096){B=f;break e}if(B===4096||f===this.i.length-1){B=f+1;break e}}B=1e3}else B=1e3;B=Rp(this,R,B),f=Gt(this.J),me(f,"RID",o),me(f,"CVER",22),this.G&&me(f,"X-HTTP-Session-Id",this.G),fi(this,f),N&&(this.R?B="headers="+ri(yp(N))+"&"+B:this.u&&Vc(f,this.u,N)),Lc(this.h,R),this.Ra&&me(f,"TYPE","init"),this.S?(me(f,"$req",B),me(f,"SID","null"),R.U=!0,Nc(R,f,null)):Nc(R,f,B),this.I=2}}else this.I==3&&(o?vp(this,o):this.i.length==0||cp(this.h)||vp(this))};function vp(o,B){var f;B?f=B.l:f=o.V++;let p=Gt(o.J);me(p,"SID",o.M),me(p,"RID",f),me(p,"AID",o.K),fi(o,p),o.u&&o.o&&Vc(p,o.u,o.o),f=new Dn(o,o.j,f,o.D+1),o.u===null&&(f.J=o.o),B&&(o.i=B.G.concat(o.i)),B=Rp(o,f,1e3),f.H=Math.round(o.va*.5)+Math.round(o.va*.5*Math.random()),Lc(o.h,f),Nc(f,p,B)}function fi(o,B){o.H&&Ha(o.H,function(f,p){me(B,p,f)}),o.l&&Ha({},function(f,p){me(B,p,f)})}function Rp(o,B,f){f=Math.min(o.i.length,f);let p=o.l?l(o.l.Ka,o.l,o):null;e:{var R=o.i;let re=-1;for(;;){let Ne=["count="+f];re==-1?f>0?(re=R[0].g,Ne.push("ofs="+re)):re=0:Ne.push("ofs="+re);let de=!0;for(let Le=0;Le<f;Le++){var N=R[Le].g;let Ut=R[Le].map;if(N-=re,N<0)re=Math.max(0,R[Le].g-100),de=!1;else try{N="req"+N+"_"||"";try{var H=Ut instanceof Map?Ut:Object.entries(Ut);for(let[Yn,bn]of H){let vn=bn;u(bn)&&(vn=bc(bn)),Ne.push(N+Yn+"="+encodeURIComponent(vn))}}catch(Yn){throw Ne.push(N+"type="+encodeURIComponent("_badmap")),Yn}}catch{p&&p(Ut)}}if(de){H=Ne.join("&");break e}}H=void 0}return o=o.i.splice(0,f),B.G=o,H}function Sp(o){if(!o.g&&!o.v){o.Y=1;var B=o.Da;Qe||E(),_e||(Qe(),_e=!0),A.add(B,o),o.A=0}}function Gc(o){return o.g||o.v||o.A>=3?!1:(o.Y++,o.v=ti(l(o.Da,o),Op(o,o.A)),o.A++,!0)}r.Da=function(){if(this.v=null,Pp(this),this.aa&&!(this.P||this.g==null||this.T<=0)){var o=4*this.T;this.j.info("BP detection timer enabled: "+o),this.B=ti(l(this.Wa,this),o)}},r.Wa=function(){this.B&&(this.B=null,this.j.info("BP detection timeout reached."),this.j.info("Buffering proxy detected and switch to long-polling!"),this.F=!1,this.P=!0,st(10),Xa(this),Pp(this))};function Uc(o){o.B!=null&&(a.clearTimeout(o.B),o.B=null)}function Pp(o){o.g=new Dn(o,o.j,"rpc",o.Y),o.u===null&&(o.g.J=o.o),o.g.P=0;var B=Gt(o.na);me(B,"RID","rpc"),me(B,"SID",o.M),me(B,"AID",o.K),me(B,"CI",o.F?"0":"1"),!o.F&&o.ia&&me(B,"TO",o.ia),me(B,"TYPE","xmlhttp"),fi(o,B),o.u&&o.o&&Vc(B,o.u,o.o),o.O&&(o.g.H=o.O);var f=o.g;o=o.ba,f.M=1,f.A=Wa(Gt(B)),f.u=null,f.R=!0,ip(f,o)}r.Va=function(){this.C!=null&&(this.C=null,Xa(this),Gc(this),st(19))};function eo(o){o.C!=null&&(a.clearTimeout(o.C),o.C=null)}function Np(o,B){var f=null;if(o.g==B){eo(o),Uc(o),o.g=null;var p=2}else if(Fc(o.h,B))f=B.G,Bp(o.h,B),p=1;else return;if(o.I!=0){if(B.o)if(p==1){f=B.u?B.u.length:0,B=Date.now()-B.F;var R=o.D;p=Ka(),rt(p,new ep(p,f)),Za(o)}else Sp(o);else if(R=B.m,R==3||R==0&&B.X>0||!(p==1&&Ay(o,B)||p==2&&Gc(o)))switch(f&&f.length>0&&(B=o.h,B.i=B.i.concat(f)),R){case 1:$n(o,5);break;case 4:$n(o,10);break;case 3:$n(o,6);break;default:$n(o,2)}}}function Op(o,B){let f=o.Qa+Math.floor(Math.random()*o.Za);return o.isActive()||(f*=2),f*B}function $n(o,B){if(o.j.info("Error code "+B),B==2){var f=l(o.bb,o),p=o.Ua;let R=!p;p=new In(p||"//www.google.com/images/cleardot.gif"),a.location&&a.location.protocol=="http"||ii(p,"https"),Wa(p),R?_y(p.toString(),f):yy(p.toString(),f)}else st(2);o.I=0,o.l&&o.l.pa(B),xp(o),bp(o)}r.bb=function(o){o?(this.j.info("Successfully pinged google.com"),st(2)):(this.j.info("Failed to ping google.com"),st(1))};function xp(o){if(o.I=0,o.ja=[],o.l){let B=hp(o.h);(B.length!=0||o.i.length!=0)&&(D(o.ja,B),D(o.ja,o.i),o.h.i.length=0,y(o.i),o.i.length=0),o.l.oa()}}function Fp(o,B,f){var p=f instanceof In?Gt(f):new In(f);if(p.g!="")B&&(p.g=B+"."+p.g),ai(p,p.u);else{var R=a.location;p=R.protocol,B=B?B+"."+R.hostname:R.hostname,R=+R.port;let N=new In(null);p&&ii(N,p),B&&(N.g=B),R&&ai(N,R),f&&(N.h=f),p=N}return f=o.G,B=o.wa,f&&B&&me(p,f,B),me(p,"VER",o.ka),fi(o,p),p}function Lp(o,B,f){if(B&&!o.L)throw Error("Can't create secondary domain capable XhrIo object.");return B=o.Aa&&!o.ma?new Ie(new Qa({ab:f})):new Ie(o.ma),B.Fa(o.L),B}r.isActive=function(){return!!this.l&&this.l.isActive(this)};function kp(){}r=kp.prototype,r.ra=function(){},r.qa=function(){},r.pa=function(){},r.oa=function(){},r.isActive=function(){return!0},r.Ka=function(){};function to(){}to.prototype.g=function(o,B){return new pt(o,B)};function pt(o,B){$e.call(this),this.g=new Ap(B),this.l=o,this.h=B&&B.messageUrlParams||null,o=B&&B.messageHeaders||null,B&&B.clientProtocolHeaderRequired&&(o?o["X-Client-Protocol"]="webchannel":o={"X-Client-Protocol":"webchannel"}),this.g.o=o,o=B&&B.initMessageHeaders||null,B&&B.messageContentType&&(o?o["X-WebChannel-Content-Type"]=B.messageContentType:o={"X-WebChannel-Content-Type":B.messageContentType}),B&&B.sa&&(o?o["X-WebChannel-Client-Profile"]=B.sa:o={"X-WebChannel-Client-Profile":B.sa}),this.g.U=o,(o=B&&B.Qb)&&!_(o)&&(this.g.u=o),this.A=B&&B.supportsCrossDomainXhr||!1,this.v=B&&B.sendRawJson||!1,(B=B&&B.httpSessionIdParam)&&!_(B)&&(this.g.G=B,o=this.h,o!==null&&B in o&&(o=this.h,B in o&&delete o[B])),this.j=new zr(this)}d(pt,$e),pt.prototype.m=function(){this.g.l=this.j,this.A&&(this.g.L=!0),this.g.connect(this.l,this.h||void 0)},pt.prototype.close=function(){Mc(this.g)},pt.prototype.o=function(o){var B=this.g;if(typeof o=="string"){var f={};f.__data__=o,o=f}else this.v&&(f={},f.__data__=bc(o),o=f);B.i.push(new hy(B.Ya++,o)),B.I==3&&Za(B)},pt.prototype.N=function(){this.g.l=null,delete this.j,Mc(this.g),delete this.g,pt.Z.N.call(this)};function Vp(o){vc.call(this),o.__headers__&&(this.headers=o.__headers__,this.statusCode=o.__status__,delete o.__headers__,delete o.__status__);var B=o.__sm__;if(B){e:{for(let f in B){o=f;break e}o=void 0}(this.i=o)&&(o=this.i,B=B!==null&&o in B?B[o]:void 0),this.data=B}else this.data=o}d(Vp,vc);function Mp(){Rc.call(this),this.status=1}d(Mp,Rc);function zr(o){this.g=o}d(zr,kp),zr.prototype.ra=function(){rt(this.g,"a")},zr.prototype.qa=function(o){rt(this.g,new Vp(o))},zr.prototype.pa=function(o){rt(this.g,new Mp)},zr.prototype.oa=function(){rt(this.g,"b")},to.prototype.createWebChannel=to.prototype.g,pt.prototype.send=pt.prototype.o,pt.prototype.open=pt.prototype.m,pt.prototype.close=pt.prototype.close,$l=ln.createWebChannelTransport=function(){return new to},Ql=ln.getStatEventTarget=function(){return Ka()},Wl=ln.Event=zn,Ko=ln.Stat={jb:0,mb:1,nb:2,Hb:3,Mb:4,Jb:5,Kb:6,Ib:7,Gb:8,Lb:9,PROXY:10,NOPROXY:11,Eb:12,Ab:13,Bb:14,zb:15,Cb:16,Db:17,fb:18,eb:19,gb:20},Ja.NO_ERROR=0,Ja.TIMEOUT=8,Ja.HTTP_ERROR=6,Li=ln.ErrorCode=Ja,tp.COMPLETE="complete",zl=ln.EventType=tp,$d.EventType=Zs,Zs.OPEN="a",Zs.CLOSE="b",Zs.ERROR="c",Zs.MESSAGE="d",$e.prototype.listen=$e.prototype.J,ns=ln.WebChannel=$d,NI=ln.FetchXmlHttpFactory=Qa,Ie.prototype.listenOnce=Ie.prototype.K,Ie.prototype.getLastError=Ie.prototype.Ha,Ie.prototype.getLastErrorCode=Ie.prototype.ya,Ie.prototype.getStatus=Ie.prototype.ca,Ie.prototype.getResponseJson=Ie.prototype.La,Ie.prototype.getResponseText=Ie.prototype.la,Ie.prototype.send=Ie.prototype.ea,Ie.prototype.setWithCredentials=Ie.prototype.Fa,Jl=ln.XhrIo=Ie}).apply(typeof jo<"u"?jo:typeof self<"u"?self:typeof window<"u"?window:{});/*!
* re2js
* RE2JS is the JavaScript port of RE2, a regular expression engine that provides linear time matching
*
* @version v2.10.0
* @author Oleksii Vasyliev
* @homepage https://github.com/le0pard/re2js#readme
* @repository [object Object]
* @license MIT
*/var F=class ur{static FOLD_CASE=1;static LITERAL=2;static CLASS_NL=4;static DOT_NL=8;static ONE_LINE=16;static NON_GREEDY=32;static PERL_X=64;static UNICODE_GROUPS=128;static WAS_DOLLAR=256;static LOOKBEHIND=512;static MATCH_NL=ur.CLASS_NL|ur.DOT_NL;static PERL=ur.CLASS_NL|ur.ONE_LINE|ur.PERL_X|ur.UNICODE_GROUPS;static POSIX=0;static UNANCHORED=0;static ANCHOR_START=1;static ANCHOR_BOTH=2},ze={CASE_INSENSITIVE:1,DOTALL:2,MULTILINE:4,DISABLE_UNICODE_GROUPS:8,LONGEST_MATCH:16,LOOKBEHINDS:512},Gi=128,tB=new Int32Array(Gi),nB=new Int32Array(Gi),Jo=65535;for(let r=0;r<Gi;r++)r>=97&&r<=122?tB[r]=r-32:tB[r]=r,r>=65&&r<=90?nB[r]=r+32:nB[r]=r;var L=class{static CODES=Object.freeze({"\x07":7,"\b":8,"	":9,"\n":10,"\v":11,"\f":12,"\r":13," ":32,'"':34,$:36,"&":38,"'":39,"(":40,")":41,"*":42,"+":43,"-":45,".":46,0:48,1:49,2:50,3:51,4:52,5:53,6:54,7:55,8:56,9:57,":":58,"<":60,">":62,"?":63,A:65,B:66,C:67,F:70,P:80,Q:81,U:85,Z:90,"[":91,"\\":92,"]":93,"^":94,_:95,"`":96,a:97,b:98,f:102,i:105,m:109,n:110,r:114,s:115,t:116,v:118,x:120,z:122,"{":123,"|":124,"}":125});static toUpperCase(r){if(r<Gi)return tB[r];let e=String.fromCodePoint(r).toUpperCase(),t=e.codePointAt(0)>Jo?2:1;if(e.length>t)return r;let n=String.fromCodePoint(e.codePointAt(0)).toLowerCase(),s=n.codePointAt(0)>Jo?2:1;return n.length>s||n.codePointAt(0)!==r?r:e.codePointAt(0)}static toLowerCase(r){if(r<Gi)return nB[r];let e=String.fromCodePoint(r).toLowerCase(),t=e.codePointAt(0)>Jo?2:1;if(e.length>t)return r;let n=String.fromCodePoint(e.codePointAt(0)).toUpperCase(),s=n.codePointAt(0)>Jo?2:1;return n.length>s||n.codePointAt(0)!==r?r:e.codePointAt(0)}},g=class{constructor(r,e=!1){this.data=r,this.isStride1=e,this.SIZE=e?2:3}getLo(r){return this.data[r*this.SIZE]}getHi(r){return this.data[r*this.SIZE+1]}getStride(r){return this.isStride1?1:this.data[r*this.SIZE+2]}get length(){return this.data.length/this.SIZE}},OI="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+-",jg=new Uint8Array(256);for(let r=0;r<64;r++)jg[OI.charCodeAt(r)]=r;var Kg=r=>{let e=[],t=0,n=0;for(let s=0;s<r.length;s++){let i=jg[r.charCodeAt(s)];t|=(i&31)<<n,(i&32)===0?(e.push(t),t=0,n=0):n+=5}return e},m=(r,e)=>{let t=Kg(r),n=e?t.length/2:t.length/3,s=new Uint32Array(n*3),i=0,a=0;for(let u=0;u<n;u++)i+=t[a++],s[u*3]=i,i+=t[a++],s[u*3+1]=i,s[u*3+2]=e?1:t[a++];return s},xI=r=>{let e=Kg(r),t=new Map,n=0;for(let s=0;s<e.length;s+=2){n+=e[s];let i=e[s+1],a=i>>>1^-(i&1);t.set(n,n+a)}return t},zo=class{constructor(r){this.initializer=r,this.cache=new Map}has(r){return Object.hasOwn(this.initializer,r)}get(r){if(this.cache.has(r))return this.cache.get(r);let e=this.has(r)?this.initializer[r]():null;return this.cache.set(r,e),e}},mt=class{static _CASE_ORBIT=null;static get CASE_ORBIT(){return this._CASE_ORBIT||(this._CASE_ORBIT=xI("rCgCIgCY+rQI4QiCuuBLgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCCgCBgCBgCBgCBgCBgCBgCB+7OB-BB-BB-BB-BB-BBskQB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BC-BB-BB-BB-BB-BB-BB-BByHBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBDCBBBCBBBCBBCCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBCCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBxHBCBBBCBBBCBBB3SBmMBkNBCBBBCBBB8MBCBBB6MB6MBCBBC+EB0MB2MBCBBB6MB+MBiGBmNBiNBCBBBmKBikzCBmNBqNBkIBsNBCBBBCBBBCBBB0NBCBBB0NDCBBB0NBCBBByNByNBCBBBCBBB2NBCBBDCBBCwDFCBCBDBCBCBDBCBCBDBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBB9EBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBCCBCBDBCBBBhGBvDBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBjICCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBH2iVBCBBBlKBwiVB+jVB+jVBCBBBlMBqEBuEBCBBBCBBBCBBBCBBBCBBB+hVB4hVB8hVBjNB7MC5MB5MCzMC1MB+0yCE5MB20yCC9MBu2yCBwyyCBo0yCChNBlNBo0yCBu-UBi0yCDlNC6-UBpNDrNIu+UDzNCm0yCBzNE0yyCBzNBpEBxNBxNBtEG1NLqxyCBkxyCnFoFrBCBBBCBBDCBBEkIBkIBkICoHHsCCqCBqCBqCCgEC+DB+DBmkOBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCC+BBgCBgCBgCBgCBgCBgCBgCBgCBrCBpCBpCBpCBmjOB-BB8BB-BB-BBgEB-BB-BByBBqgOBsDB-BBtwBB-BB-BB-BBsBBgDBCB-BB-BB-BBeB-BB-BB61OB-BB-BB-DB9DB9DBQB7DBmCE9CBrDBPBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBrFB-EBOBnHB3FB-FCCBBBNBCBBCjIBjIBjIBgFBgFBgFBgFBgFBgFBgFBgFBgFBgFBgFBgFBgFBgFBgFBgFBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCB-BB-BB8kMB-BB6kMB-BB-BB-BB-BB-BB-BB-BB-BB-BBokMB-BB-BBkkMBkkMB-BB-BB-BB-BB-BB-BB-BB4jMB-BB-BB-BB-BB-BB-EB-EB-EB-EB-EB-EB-EB-EB-EB-EB-EB-EB-EB-EB-EB-EBCBBBCBoiMBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBJCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBeBCBBBCBBBCBBBCBBBCBBBCBBBCBBBdBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBCgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDL-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-C64CgmOBgmOBgmOBgmOBgmOBgmOBgmOBgmOBgmOBgmOBgmOBgmOBgmOBgmOBgmOBgmOBgmOBgmOBgmOBgmOBgmOBgmOBgmOBgmOBgmOBgmOBgmOBgmOBgmOBgmOBgmOBgmOBgmOBgmOBgmOBgmOBgmOBgmOCgmOGgmODg8FBg8FBg8FBg8FBg8FBg8FBg8FBg8FBg8FBg8FBg8FBg8FBg8FBg8FBg8FBg8FBg8FBg8FBg8FBg8FBg8FBg8FBg8FBg8FBg8FBg8FBg8FBg8FBg8FBg8FBg8FBg8FBg8FBg8FBg8FBg8FBg8FBg8FBg8FBg8FBg8FBg8FBg8FDg8FBg8FBg8FhVg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBQBQBQBQBQBQDPBPBPBPBPBPjkC7mMB5mMBnmMBjmMBCBlmMB3lMBpiMBk8kCBCBBG-7FB-7FB-7FB-7FB-7FB-7FB-7FB-7FB-7FB-7FB-7FB-7FB-7FB-7FB-7FB-7FB-7FB-7FB-7FB-7FB-7FB-7FB-7FB-7FB-7FB-7FB-7FB-7FB-7FB-7FB-7FB-7FB-7FB-7FB-7FB-7FB-7FB-7FB-7FB-7FB-7FB-7FB-7FD-7FB-7FB-7F6FoglCEsuHRwjlCyDCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCB0DBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBG1DD97OCCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBQBQBQBQBQBQBQBQBPBPBPBPBPBPBPBPBQBQBQBQBQBQDPBPBPBPBPBPDQBQBQBQBQBQBQBQBPBPBPBPBPBPBPBPBQBQBQBQBQBQBQBQBPBPBPBPBPBPBPBPBQBQBQBQBQBQDPBPBPBPBPBPEQCQCQCQCPCPCPCPBQBQBQBQBQBQBQBQBPBPBPBPBPBPBPBPB0EB0EBsFBsFBsFBsFBoGBoGBgIBgIBgHBgHB8HB8HDQBQBQBQBQBQBQBQBPBPBPBPBPBPBPBPBQBQBQBQBQBQBQBQBPBPBPBPBPBPBPBPBQBQBQBQBQBQBQBQBPBPBPBPBPBPBPBPBQBQCSFPBPBzEBzEBRCxnOFSFrFBrFBrFBrFBREQBQClkOFPBPBnGBnGFQBQCljOCODPBPB-GB-GBNHSF-HB-HB7HB7HBRqJ53OE9tQBrmQH4Bc3BSgBBgBBgBBgBBgBBgBBgBBgBBgBBgBBgBBgBBgBBgBBgBBgBBfBfBfBfBfBfBfBfBfBfBfBfBfBfBfBfECBByZ0BB0BB0BB0BB0BB0BB0BB0BB0BB0BB0BB0BB0BB0BB0BB0BB0BB0BB0BB0BB0BB0BB0BB0BB0BB0BBzBBzBBzBBzBBzBBzBBzBBzBBzBBzBBzBBzBBzBBzBBzBBzBBzBBzBBzBBzBBzBBzBBzBBzBBzBBzB34BgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CBCBBBt-UBruHBt+UB1iVBviVBCBBBCBBBCBBB3hVB5-UB9hVB7hVCCBBCCBBI9jVB9jVBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBICBBBCBBECBBN-lOB-lOB-lOB-lOB-lOB-lOB-lOB-lOB-lOB-lOB-lOB-lOB-lOB-lOB-lOB-lOB-lOB-lOB-lOB-lOB-lOB-lOB-lOB-lOB-lOB-lOB-lOB-lOB-lOB-lOB-lOB-lOB-lOB-lOB-lOB-lOB-lOB-lOC-lOG-lOzoeCBBBCBBBCBBBCBBBCBBBCBl8kCBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBTCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBnECBBBCBBBCBBBCBBBCBBBCBBBCBBDCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBKCBBBCBBBnglCBCBBBCBBBCBBBCBBBCBBECBBBvyyCDCBBBCBBBgDCCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBn0yCB90yCB10yCBh0yCBn0yCCjxyCBzyyCBpxyCBg6BBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBB-CBl0yCBvjlCBCBBBCBBBt2yCBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBhkzCZCBB9a-5Bd-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCm6TCBB7gBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCH-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BmlBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvChDwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCFvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvC1DuCBuCBuCBuCBuCBuCBuCBuCBuCBuCBuCCuCBuCBuCBuCBuCBuCBuCBuCBuCBuCBuCBuCBuCBuCBuCCuCBuCBuCBuCBuCBuCBuCCuCBuCCtCBtCBtCBtCBtCBtCBtCBtCBtCBtCBtCCtCBtCBtCBtCBtCBtCBtCBtCBtCBtCBtCBtCBtCBtCBtCCtCBtCBtCBtCBtCBtCBtCCtCBtCk2BgEBgEBgEBgEBgEBgEBgEBgEBgEBgEBgEBgEBgEBgEBgEBgEBgEBgEBgEBgEBgEBgEBgEBgEBgEBgEBgEBgEBgEBgEBgEBgEBgEBgEBgEBgEBgEBgEBgEBgEBgEBgEBgEBgEBgEBgEBgEBgEBgEBgEBgEO-DB-DB-DB-DB-DB-DB-DB-DB-DB-DB-DB-DB-DB-DB-DB-DB-DB-DB-DB-DB-DB-DB-DB-DB-DB-DB-DB-DB-DB-DB-DB-DB-DB-DB-DB-DB-DB-DB-DB-DB-DB-DB-DB-DB-DB-DB-DB-DB-DB-DB-D+CgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCL-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-B74CgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BhrVgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BhB2BB2BB2BB2BB2BB2BB2BB2BB2BB2BB2BB2BB2BB2BB2BB2BB2BB2BB2BB2BB2BB2BB2BB2BB2BD1BB1BB1BB1BB1BB1BB1BB1BB1BB1BB1BB1BB1BB1BB1BB1BB1BB1BB1BB1BB1BB1BB1BB1BB1BtxekCBkCBkCBkCBkCBkCBkCBkCBkCBkCBkCBkCBkCBkCBkCBkCBkCBkCBkCBkCBkCBkCBkCBkCBkCBkCBkCBkCBkCBkCBkCBkCBkCBkCBjCBjCBjCBjCBjCBjCBjCBjCBjCBjCBjCBjCBjCBjCBjCBjCBjCBjCBjCBjCBjCBjCBjCBjCBjCBjCBjCBjCBjCBjCBjCBjCBjCBjC")),this._CASE_ORBIT}static _Print=null;static get Print(){return this._Print||(this._Print=new g(m("hB9CBjBLBCpWBDFBFGBCCCBSBCsMBClBBDxBBDCBC2BBJaBFFBSVBC-FBCvBBD6BBDkDBP6BBDwBBDOBCbBDCCBJBGfBIqCBCgFBCHBDBBDVBCGBCEEBCBDIBDBBDDBJFFBCCBDBDYBDCBCFBFBBDVBCGBCBBCBBCBBDCCBDBFBBDCBEIIBCBCIIBPBLCBCIBCCBCVBCGBCBBCEBDJBCCBCCBDQQBCBDLBIGBCCBCHBDBBDVBCGBCBBCEBDIBDBBDCBICBFBBCEBDRBLBBCFBECBCDBEBBCCCBEEBEEBBBELBFEBECBCDBDHHPUBGMBCCBCWBCPBDIBCCBCDBIBBCCBCBBDDBDJBIVBCCBCWBCJBCEBDIBCCBCDBIBBGCBCDBDJBCCBNMBCCBCyBBCCBCFBFPBDZBCCBCRBEXBCIBCDDBFBEFFBEBCCCBGBHJBDCBN5BBFcBmBBBCCCBDBCXBCCCBVBDEBCCCBFBCJBDDBhBnCBCjBBFmBBCjBBCOBCMBmBlGBCGGD4LBCDBDGBCCCBCBDoBBCDBDgBBCDBDGBCCCBCBDOBC4BBCDBDiCBDfBEZBH1CBDFBD-TBCbBE4CBIVBKXBKTBNMBCCBCBBN9CBDJBHJBHNBCKBH4CBIqBBGlCBLeBCLBFLBFEEBoBBDEBMrBBFZBHKBE9BBDgCBCcBDKBHJBHNBDtBBDLBVsCBClFBJ7BBEOBE9BBGqBBDKBJqBBG1QBDFBDlBBDFBDHBCGCBdBD0BBCOBCNBDFBCSBDCBCIBSXBJuBBSBBDaBCMBEhBBPgBBQrEBF5UBXKBWz4BBD9LBGsBBCGGD3BBIBBPXBKGBCGBCGBCGBCGBCGBCGBCGBC9DBjBZBC4CBN1GBbPBC+BBC1CBDmDBGqBBC9CBC1CBKvBBCszcBE2BBK7KBV3FBJ8GBV7BBEJBH3BBJlCBJLBHzDBMdBEtCBCKBFgBBC2BBKNBDJBDmDBZbBLFBDFBDFBKGBCGBC7BBF9DBDJBHj9KBNWBFwBBloItLBDpDBnBGBNEBGZBCEBCCCBCCBCCBoUBhBpBBHyBBCSBCDBFEBCmEBF9FBEFBDFBDFBDCBEGBCGBOBBDLBCZBCSBCBBCOBDNBjB6DBGCBFsBBE3CBCMBEwBwBBsBBjEcBEwBBQbBFjBBKdBGqBBGdBCkBBFNBrB9EBDJBHjBBFjBBFnBBJzBBMLBCOBCGBCBBCKBCOBCGBCBBEzBBN2JBKVBLHBZFBCpBBCIBmCFBDCCBqBBCBBEDDBVBCnCBJIBxBSBCBBGgBBEaBGaBnB3BBFTBDxBBCBBGHBCCBCcBDCBFJBIIBI-BBhBmBBFLBK1BBEcBDaBGZBIDBNGBxCoCB4ByBBOyBBItBBJJBHlBBEcBJBBxGeBCpBBCCBDBBRFBJIBiBtBBJpBBXZBnBbBVWBKtCBFjBBK9BBCEBOYBIJBH0BBCRBJmBBK-CBCTBMRBCuBB-BGBCCCBCBCOBCKBH6BBGJBHDBCHBDBBDVBCGBCBBCEBCJBDBBDCBDHHGGBDGBEEBMJBCDDClBBCJBCDDCDBCJBCBBJBBe7CBCEBfnCBJJBnF1BBDlBBjBkCBMJBHMBU5BBHJBHTBdaBDOBFWB6F7BBlDyCBNHBDDDBGBCBBCdBCBBDLBKJBnCHBDtBBDKBcnCBJyCBOoCBIJB3CHB5ChBBPJBHIBCsBBCNBLcBEfBDVBCNBqCGBCBBCrBBECCBCCBHBJJBHFBCBBCkBBCBBCFBIJBHrBBFJB3HYBIQBCoBBEcB2CQQBwBBO6cBnDuDBCEBMjGBtyCiDBOvhBBRVBL68DBGmSB61G5BBn2B4RBIeBCJBFwCBCJBHdBDFBLlCBLJBCGBCUBGSBxN5BBnG6CBGYBDYBtBqCBF4BBIQBhCEBMGBK1mHBqBfBiDyDB+vIDBCGBCBBCiJBQeeBBBDPPBCBJrMBloCqDBGMBEIBIJBDDBh7D8HBEzNBHWBQQBQtBBDWBKzDB9B1HBLmBBDpCBJvDBWlCB7DTBNTBN2CBKYBoE0CBCmCBCBBDDDBDDBCBCLBCCCBFBCgCBCDBDHBCGBCbBCDBCEBCEEBFBCzKBDjJBD9VBQEBCOBxiBeBHFB2GGBCQBDGBCBBCEBG9BBiBxDxDBrBBENBDJBFBBhKeBS5BBGxOxOBoBB3GqBBFhGhGBdBCVBJBBhHGBCDBCBBCOBCkGBDPBqBrCBFJBFBByYjCBtC8BBjGDBCaBCBBCDDCJBCDBCCCHFFCECBBBCBBCDDCICBCCDDBCGBCDBCDBCCCBIBCQBGCBCEBCQB1BBBvIrBBFjDBNOBDOBCOBCkBBLtFB5BcBOrBBFIBIBBPFB7E4eBEQBEMBE5GBHLBFQQBKBF3BBJJBHnBBJdBDLBFBBPIBoB3KBJNBDMBEKBE4BBCFFBOBDLBFJBIyEBCmDBmgB-2pBBhB9oEBDt0FBDwpHBQtTBjtC9QBjvBq6EBGppIBnkzVvHB",!1))),this._Print}static CATEGORIES=new zo({C:()=>new g(m("AfBgDgBBOrWrWBHHBCBICCVuMuMnBBBzBBBE4B4BBGBcDBHQBXhGhGxBBB8BBBmDNB8BBByBBBQddBCCMEBhBGBsCiFiFJBBDBBXIICCBFBBKBBDBBFHBCDBDGGBaaBEEHDBDBBXIIDGDBCCGDBDBBECBCGBFCCBFBSJBEKKEXXIDDGBBLIEBCCBNBFBBNGBIEEJBBDBBXIIDGGBKKBDDBEEBFBEDBDGGBTTBIBDHHBBBEFFBBBDCCDCBDCBECBNDBGCBEFFBCCBEBCNBWEBOEEYRRBKKEFFBFBDEEDBBFBBLGBXEEYLLGBBKEEFGBDEBEFFBLLELBOEE0BEEHDBRBBbEETCBZKKCBBICBCDBHCCJFBLBBELB7BDBekBBDCCGZZCYYBGGCIILBBFfBpClBlBBCBoBlBlBQOOBjBBnGCCBDBCBB6LFFBIICFFBqBqBFBBiBFFBIICFFBQQ6BFFBkCkCBhBhBBBBbFB3CBBHBB+UCB6CGBXIBZIBVLBOEEDLB-CBBLFBLFBPMMBEB6CGBsBEBnCJBgBNNBCBNDBCCBrBBBGKBtBDBbFBMCB-BBBiCeeBMMBEBLFBPBBvBBBNTBuCnFnFBGB9BCBQCB-BEBsBBBMHBsBEB3QBBHBBnBBBHBBJGCgBBB2BQQPBBHUUBEEKMMBDBbEByBPBDBBcOOBBBjBNBiBOBtEDB7UVBMUB14BBB-LEBuBCCBDBCBB5BGBDNBZIBI4BI-DhBBb6C6CBKB3GZBxC3C3CBoDoDBDBsB-C-C3CIBxBuzcuzcBBB4BIB9KTB5FHB+GTB9BCBLFB5BHBnCHBNFB1DKBfCBvCMMBCBiB4B4BBHBPBBLBBoDXBdJBHBBHBBHIBIII9BDB-DBBLFBl9KLBYDByBjoIBvLBBrDlBBILBGEBbGGCGDrUfBrBFB0BUUFDBGoEoEBCB-FCBHBBHBBHBBECBIIIBLBDBBNbbUDDQBBPhBB8DEBEDBuBCB5COOBBBCuBBvBhEBeCByBOBdDBlBIBfEBsBEBfmBmBBCBPpBB-EBBLFBlBDBlBDBpBHB1BKBNQQIDDMQQIDDBBB1BLB4JIBXJBJXBHrBrBKkCBHBBCtBtBDCBCBBYpCpCBGBKvBBUDDBDBiBCBcEBclBB5BDBVBBzBDDBDBJEEeBBEDBLGBKGBhCfBoBDBNIB3BCBeBBcEBbGBFLBIvCBqC2BB0BMB0BGBvBHBLFBnBCBeHBDvGBgBrBrBEBBDPBHHBKgBBvBHBrBVBblBBdTBYIBvCDBlBIB-BGGBLBaGBLFB2BTTBGBoBIBhDVVBJBTwBwBB8BBICCFQQMFB8BEBLFBFJJBDDBXXIDDGLLBDDBEEBCCBEBCEBIBBICBGKBLCCBCCnBLLCBBCFFLDDBGBDcB9CGGBcBpCHBLlFB3BBBnBhBBmCKBLFBOSB7BFBLFBVbBcBBQDBY4FB9BjDB0CLBJBBCBBJDDfDDBNNBHBLlCBJBBvBBBMaBpCHB0CMBqCGBL1CBJ3CBjBNBLFBKuBuBPJBeCBhBBBXPPBnCBIDDtBCBCDDKHBLFBHDDmBDDHGBLFBtBDBL1HBaGBSqBqBBBBe0CBCOBzBMB8clDBwDGGBJBlGryCBkDMBxhBPBXJB88DEBoS41GB7Bl2BB6RGBgBLLBCByCLLBEBfBBHJBnCJBLIIWEBUvNB7BlGB8CEBaBBarBBsCDB6BGBS-BBGKBIIB3mHoBBhBgDB0D8vIBFIIDkJkJBNBCcBEBBCNBFHBtMjoCBsDEBOCBKGBLBBF-6DB+HCB1NFBYOBSOBvBBBYIB1D7BB3HJBoBBBrCHBxDUBnC5DBVLBVLB4CIBamEB2CoCoCDBBCBBDBBFNNCIIiCFFBJJIddFGGCCBI1K1KBlJlJB-V-VBNBGQQBuiBBgBFBH0GBISSBIIDGGBDB-BgBBCvDBuBCBPBBLDBD-JBgBQB7BEBCvOBrB1GBsBDBC-FBgBXXBGBD-GBIFFDQQmGBBRoBBtCDBLDBDwYBlCrCB+BhGBFccDCCBCCLFFCCCBEBCDBCECEDDCBBCICDCCBFFIKFCLLSEBEGGSzBBDtIBtBDBlDLBQBBQQQmBJBvF3BBeMBtBDBKGBDNBH5EB6eCBSCBOCB7GFBNDBCOBNDB5BHBLFBpBHBfBBNDBDNBKmBB5KHBPBBOCBMCB6BCCBCBRBBNDBLGB0EoDoDBjgBBh3pBfB-oEBBv0FBBypHOBvThtCB-QhvBBs6EEBrpIlkzVBxHvw-FB",!1)),Cc:()=>new g(m("AfgDgB",!0)),Cf:()=>new g(m("tFzqBzqBBEBXhGhGyBhMhMBxCxCs5D9-B9-BBDBbEByBEBCJBw03B6H6HBBBimEQQj7IPBhjiBDBwmFHBn0rYffB+CB",!1)),Cn:()=>new g(m("4bBBHDBICCVuMuMnBBBzBBBE4B4BBGBcDBHKBvI9B9BBmDmDBMB8BBByBBBQddBCCMEBjBEBuHJJBDDBXXICCBBBFBBKBBDBBFHBCDBDGGBaaBEEHDBDBBXIIDGDBCCGDBDBBECBCGBFCCBFBSJBEKKEXXIDDGBBLIEBCCBNBFBBNGBIEEJBBDBBXIIDGGBKKBDDBEEBFBEDBDGGBTTBIBDHHBBBEFFBBBDCCDCBDCBECBNDBGCBEFFBCCBEBCNBWEBOEEYRRBKKEFFBFBDEEDBBFBBLGBXEEYLLGBBKEEFGBDEBEFFBLLELBOEE0BEEHDBRBBbEETCBZKKCBBICBCDBHCCJFBLBBELB7BDBekBBDCCGZZCYYBGGCIILBBFfBpClBlBBCBoBlBlBQOOBjBBnGCCBDBCBB6LFFBIICFFBqBqBFBBiBFFBIICFFBQQ6BFFBkCkCBhBhBBBBbFB3CBBHBB+UCB6CGBXIBZIBVLBOEEDLB-CBBLFBLFBbFB6CGBsBEBnCJBgBNNBCBNDBCCBrBBBGKBtBDBbFBMCB-BBBiCeeBMMBEBLFBPBBvBBBNTBuCnFnFBGB9BCBQCB-BEBsBBBMHBsBEB3QBBHBBnBBBHBBJGCgBBB2BQQPBBHUUBEEKmDmDNBBcOOBBBjBNBiBOBtEDB7UVBMUB14BBB-LEBuBCCBDBCBB5BGBDNBZIBI4BI-DhBBb6C6CBKB3GZBxC3C3CBoDoDBDBsB-C-C3CIBxBuzcuzcBBB4BIB9KTB5FHB+GTB9BCBLFB5BHBnCHBNFB1DKBfCBvCMMBCBiB4B4BBHBPBBLBBoDXBdJBHBBHBBHIBIII9BDB-DBBLFBl9KLBYDByBDBvzIBBrDlBBILBGEBbGGCGDrUfBrBFB0BUUFDBGoEoEBCC-FCBHBBHBBHBBECBIIIBIBGBBNbbUDDQBBPhBB8DEBEDBuBCB5COOBBBCuBBvBhEBeCByBOBdDBlBIBfEBsBEBfmBmBBCBPpBB-EBBLFBlBDBlBDBpBHB1BKBNQQIDDMQQIDDBBB1BLB4JIBXJBJXBHrBrBKkCBHBBCtBtBDCBCBBYpCpCBGBKvBBUDDBDBiBCBcEBclBB5BDBVBBzBDDBDBJEEeBBEDBLGBKGBhCfBoBDBNIB3BCBeBBcEBbGBFLBIvCBqC2BB0BMB0BGBvBHBLFBnBCBeHBDvGBgBrBrBEBBDPBHHBKgBBvBHBrBVBblBBdTBYIBvCDBlBIBlCJBCBBaGBLFB2BTTBGBoBIBhDVVBJBTwBwBB8BBICCFQQMFB8BEBLFBFJJBDDBXXIDDGLLBDDBEEBCCBEBCEBIBBICBGKBLCCBCCnBLLCBBCFFLDDBGBDcB9CGGBcBpCHBLlFB3BBBnBhBBmCKBLFBOSB7BFBLFBVbBcBBQDBY4FB9BjDB0CLBJBBCBBJDDfDDBNNBHBLlCBJBBvBBBMaBpCHB0CMBqCGBL1CBJ3CBjBNBLFBKuBuBPJBeCBhBBBXPPBnCBIDDtBCBCDDKHBLFBHDDmBDDHGBLFBtBDBL1HBaGBSqBqBBBBe0CBCOBzBMB8clDBwDGGBJBlGryCBkDMB3iBJB88DEBoS41GB7Bl2BB6RGBgBLLBCByCLLBEBfBBHJBnCJBLIIWEBUvNB7BlGB8CEBaBBarBBsCDB6BGBS-BBGKBIIB3mHoBBhBgDB0D8vIBFIIDkJkJBNBCcBEBBCNBFHBtMjoCBsDEBOCBKGBLBBJ76DB+HCB1NFBYOBSOBvBBBYIB1D7BB3HJBoBBBjGUBnC5DBVLBVLB4CIBamEB2CoCoCDBBCBBDBBFNNCIIiCFFBJJIddFGGCCBI1K1KBlJlJB-V-VBNBGQQBuiBBgBFBH0GBISSBIIDGGBDB-BgBBCvDBuBCBPBBLDBD-JBgBQB7BEBCvOBrB1GBsBDBC-FBgBXXBGBD-GBIFFDQQmGBBRoBBtCDBLDBDwYBlCrCB+BhGBFccDCCBCCLFFCCCBEBCDBCECEDDCBBCICDCCBFFIKFCLLSEBEGGSzBBDtIBtBDBlDLBQBBQQQmBJBvF3BBeMBtBDBKGBDNBH5EB6eCBSCBOCB7GFBNDBCOBNDB5BHBLFBpBHBfBBNDBDNBKmBB5KHBPBBOCBMCB6BCCBCBRBBNDBLGB0EoDoDBjgBBh3pBfB-oEBBv0FBBypHOBvThtCB-QhvBBs6EEBrpIm8yVBCdBhD-DBxHvw-BB---BBB---BBB",!1)),Co:()=>new g(m("gg4B-nGh4hc9--BD9--B",!0)),Cs:()=>new g(m("gg2B--B",!0)),L:()=>new g(m("hCZBHZBwBLLFGGBVBCeBCpOBFLBPEBICCiEEBCBBDDBCHHCCBCCCBSBCyCBCqEBJlFBClBBDHHBnBBoCaBFDBuBqBBkBBBCiDBCQQBIIBLLBBBDRRCdBe4CBMZZBfBKBBFGGBUBFKKEYYBXBIKBGXBCGBRpBB7B1BBETTIJBQPBFHBDBBDVBCGBCEEBCBERROBBCCBPBBLJJBEBFBBDVBCGBCBBCBBCBBgBDBCUUBBBRIBCCBCVBCGBCBBCEBETTQBBYMMBGBDBBDVBCGBCBBCEBEffBCCBBBQSSCFBECBCDBEBBCCCBEEBEEBBBELBX1B1BBGBCCBCWBCPBEbbBBBCBBDBBfFFBGBCCBCWBCJBCEBEffBBBCBBQBBSIBCCBCoBBDRRGCBJCBZFBGRBEXBCIBCDDBFB7BvBBCBBNGB7BBBCCCBDBCXBCCCBIBCBBKDDBDBCWWBCBhBgCgCBGBCjBBcEB0DqBBVRRBEBFDBEEEBIIBBBFMBNSSBkBBCGGDqBBCsKBCDBDGBCCCBCBDoBBCDBDgBBCDBDGBCCCBCBDOBC4BBCDBDiCBmBPBR1CBDFBErTBDQBCZBGqCBHHBIRBOSBPRBPMBCCBQzBBkBFFkC4CBIEBDhBBCGGBkCBLeByBdBDEBMrBBFZB3BWBK0BBzC+C+CBtBBSHB3BdBOBBLrBBbjBBqBCBLjBBDKBGqBBDCBqBDBCFBCBBEGGB+FBhC1IBDFBDlBBDFBDHBCGCBdBD0BBCGBCEEBBBCGBEDBDFBFMBGCBCGB1DOORMBmDFFDJBCEEBDBHGCBCBCKBDDBGEBF1B1BB8zC8zCBjHBHDBEBBNlBBCGGD3BBIRRBVBKGBCGBCGBCGBCGBCGBCGBCGBxC2O2OBrBrBBDBGBBF1CBHCBC5CBCDBGqBBC9CBSfBxBPBhQ-tGBhCs0VBkCtBBDsIBEPBLBBVuBBReBDlCByBIBDmDBDxCBVQBCCBCDBCWBezBBPxBB-BFBECCBMMBaBLWBacBIuBBdRRBDBCJBLEBCoBBYCBCHBVWBEEEBwBBCEEBDDBDBDCCZCBDKBICBNFBDFBDFBKGBCGBCqBBCNBHyDBej9KBNWBFwBBloItLBDpDBnBGBNEBGCCBIBCMBCEBCCCBCCBCCBqDBiBqLBT-BBD1BBpBLB1DEBCmEBlBZBHZBM4CBEFBDFBDFBDCBkBLBCZBCSBCBBCOBDNBjB6DBmMcBEwBBwBfBOTBCHBHlBBLdBDjBBFHBxB9EBTjBBFjBBFnBBJzBBNKBCOBCGBCBBCKBCOBCGBCBBEzBBN2JBKVBLHBZFBCpBBCIBmCFBDCCBqBBCBBEDDBVBLWBKeBiCSBCBBLVBLZBHZBnB3BBHBBhCQQBCBCCBCcBrBcBEcBkBHBCbBc1BBLVBLSBORBvDoCB4ByBBOyBBOjBBnBbBKWB7HpBBHBBRFB5BcBLJJBUBrBRBvBUBcWBN0BB6BBBDOOBrBBhBYBbjBBeDDJiBBENNBuBBPDBWCCkBRBCYBUBBgCGBCCCBCBCOBCJBIuBBnBHBDBBDVBCGBCBBCEBETTNEBfJBCDDClBBCaaCtBtBBzBBTDBVCBfvBBVBBC5F5FBtBBqBDBlBvBBV8B8BBpBBOoCoCBZBmBGB6FrBB1D-BBgBHBDDDBGBCBBCXBQCC-CHBDmBBRCCdLLBmBBIWWMtBBUTTBnCBoGgBBgBIBCkBBSyByBBcBxDGBCBBClBBWaaBEBCBBCfBPYYBqBBlISBQCCBLBChBB9DwCwCB4cBnHjGBtyCgDBQvhBBSFBa68DBGmSB61GdBj3B4RBIeBSuCBSdBTvBBRDBgBUBGSBxNsBB0G-BBhBYBDYBtBqCBGjCjCBLBhCBBCPPBNNB0mHBqBfBiDyDB+vIDBCGBCBBCiJBQeeBBBDPPBCBJrMBloCqDBGMBEIBIJBn7F0CBCmCBCBBDDDBDDBCBCLBCCCBFBCgCBCDBDHBCGBCbBCDBCEBCEEBFBCzKBDYBCYBCeBCYBCeBCYBCeBCYBCeBCYBCHB15BeBHFBmI9BBzEsBBLGBRiKiKBcBTrBBlPbBlHdBDwGwGBdBCCBCBBCGBDEBKBBhHGBCDBCBBCOBCkGB8BjCBI1lB1lBBCBCaBCBBCDDCJBCDBCCCHFFCECBBBCBBCDDCICBCCDDBCGBCDBCDBCCCBIBCQBGCBCEBCQBlqE-2pBBhB9oEBDt0FBDwpHBQtTBjtC9QBjvBq6EBGppIB",!1)),LC:()=>new g(m("hCZBHZB7BLLBVBCeBCiGBCDBFvGBDZBhGDBDBBECBCHHCCBCCCBSBCyCBCqEBJlFBClBBKoBB44ClBBCGGDqBBDCBhV1CBDFBjkCKBGqBBDCBhCrBBgCMBChBBmD1IBDFBDlBBDFBDHBCGCBdBD0BBCGBCEEBBBCGBEDBDFBFMBGCBCGBmIFFDJBCEEBDBHGCBCBCFBFDDBCBGEBF1B1BB8zC8zCB6DBDmDBHDBEBBNlBBCGGzoetBBTbBnEtCBCWBEDBCsCBZBBE2Z2ZBpBBGIBIvCBh6TGBNEBqgBZBHZBmlBvCBhDjBBFjBB1DKBCOBCGBCBBCKBCOBCGBCBBk2ByBBOyBB+CVBLVB74C-BBhrV-BBhBYBDYBtpZ0CBCmCBCBBDDDBDDBCBCLBCCCBFBCgCBCDBDHBCGBCbBCDBCEBCEEBFBCzKBDYBCYBCeBCYBCeBCYBCeBCYBCeBCYBCHB15BJBCTBHFB2uCjCB",!1)),Ll:()=>new g(m("hDZB7BqBqBBWBCHBC2BCBQCBuBCDECBBBDCCDEEBFFDEEBBBDDDCCCDCCBCCDEECDDBDDBBBHGDCOCBSCBDDCEEC4BCBFBDDDBCCFICBjCBDZBiGCCEEEBBBTccBhBBCBBECBCWCBDBCGDB0B0BBuBBCgBCK0BCDMCBgDCxBoBBo6CqBBDCB5XFBjkCIBC2D2DBqBBgCMBChBBnD0ECBHBCgDCBHBJFBLHBJHBJFBLHBJHBJNBDHBJHBJHBJEBCBBHEEBBBCBBJDBDBBJHBLCBCBBzIEEBEEcKFDBBJDBF2B2Bs1CvBBCEEBGCFCCBCCBEBGiDCBIICFFNlBBCGG0oesBCUaCoEMCBBBC+BCBGBCCCDICFCCDCCBBBCSCGGGCMCFCCDOCbEE2ZqBBGIBIvCBh6TGBNEBqhBZBumBnBBpEjBB8EKBCOBCGBCBBk4ByBB+DVB75CfBhsVfB8BYBnqZZBbGBCRBbZBbDBCCCBFBCKBbZBbZBbZBbZBbZBbZBbZBbZBbbBdYBCFBbYBCFBbYBCFBbYBCFBbYBCFBC15B15BBIBCTBHFB4vChBB",!1)),Lm:()=>new g(m("wVRBFLBPEBICCmEGG-OnHnHlFBBuIBBFgBgBKEEhFoFoF1mBgEgE2R72B72BsDkTkTxOFBvF+BBOjBjBBjBByVOORMBg-CBByHgGgG2OsBsBBDBGiDiDB+C+CBBB34bjnBjnBBEBvIzDzDdBB6DIBxCYYpDDBEBB2OXXqEtDtDWBBoDDBKngVngVuBBBh-BFBCpBBCIB0sBhBhB2K04D04DnrTDB9PCBpBBBnRMBhCBBCPPB9-P9-PBCBCGBCBByhM9BBqGGBud0Q0QsSAB",!1)),Lo:()=>new g(m("qFQQhIFFBCBxGBB7ZaBFDBuBfBCJBkBBBCiDBCZZBLLBBBDRRCdBe4CBMZZBfBWVBrBYBIKBGXBCGBRoBB8B1BBETTIJBROBFHBDBBDVBCGBCEEBCBERROBBCCBPBBLJJBEBFBBDVBCGBCBBCBBCBBgBDBCUUBBBRIBCCBCVBCGBCBBCEBETTQBBYMMBGBDBBDVBCGBCBBCEBEffBCCBBBQSSCFBECBCDBEBBCCCBEEBEEBBBELBX1B1BBGBCCBCWBCPBEbbBBBCBBDBBfFFBGBCCBCWBCJBCEBEffBBBCBBQBBSIBCCBCoBBDRRGCBJCBZFBGRBEXBCIBCDDBFB7BvBBCBBNFB8BBBCCCBDBCXBCCCBIBCBBKDDBDBYDBhBgCgCBGBCjBBcEB0DqBBVRRBEBFDBEEEBIIBBBFMBNyDyDBnKBCDBDGBCCCBCBDoBBCDBDgBBCDBDGBCCCBCBDOBC4BBCDBDiCBmBPByDrTBDQBCZBGqCBHHBIRBOSBPRBPMBCCBQzBBpBkCkCBhBBC0BBIEBDhBBCGGBkCBLeByBdBDEBMrBBFZB3BWBK0BBxFuBBSHB3BdBOBBLrBBbjBBqBCBLdByDDBCFBCBBE7hB7hBBCB4-C3BBZWBKGBCGBCGBCGBCGBCGBCGBCGBoR2B2BF1CBJCCB4CBFGGBpBBC9CBSfBxBPBhQ-tGBhC0wUBC2jBBkCnBBJrIBFPBLBBjCyByBBkCBqFoDoDEGBCCBCDBCWBezBBPxBB-BFBECCBMMBaBLWBacBIuBBuBEBDIBLEBCoBBYCBCHBVPBCFBEEEBwBBCEEBDDBDBDCCZBBEKBIPPBEBDFBDFBKGBCGByEiBBej9KBNWBFwBBloItLBDpDBkCCCBIBCMBCEBCCCBCCBCCBqDBiBqLBT-BBD1BBpBLB1DEBCmEBqDJBCsBBDeBEFBDFBDFBDCBkBLBCZBCSBCBBCOBDNBjB6DBmMcBEwBBwBfBOTBCHBHlBBLdBDjBBFHBhEtCBjDnBBJzBB9CzBBN2JBKVBLHB5EFBDCCBqBBCBBEDDBVBLWBKeBiCSBCBBLVBLZBHZBnB3BBHBBhCQQBCBCCBCcBrBcBEcBkBHBCbBc1BBLVBLSBORBvDoCB4FjBBnBDBCxJxJBoBBHBBRCBCBB5BcBLJJBUBrBRBvBUBcWBN0BB6BBBDOOBrBBhBYBbjBBeDDJiBBENNBuBBPDBWCCkBRBCYBUBBgCGBCCCBCBCOBCJBIuBBnBHBDBBDVBCGBCBBCEBETTNEBfJBCDDClBBCaaCtBtBBzBBTDBVCBfvBBVBBC5F5FBtBBqBDBlBvBBV8B8BBpBBOoCoCBZBmBGB6FrBB0GHBDDDBGBCBBCXBQCC-CHBDmBBRCCdLLBmBBIWWMtBBUTTBnCBoGgBBgBIBCkBBSyByBBcBxDGBCBBClBBWaaBEBCBBCfBPYYBnBBCBBlISBQCCBLBChBB9DwCwCB4cBnHjGBtyCgDBQvhBBSFBa68DBGmSB61GdBj3B4RBIeBSuCBSdBTvBB0BUBGSB0NnBB2MqCBGwFwFB0mHBqBfBiDyDBuwIiJBQeeBBBDPPBCBJrMBloCqDBGMBEIBIJBxzI2P2PBrBBiBiKiKBcBTrBBlPaBmHdBDwGwGBdBCCBCBBCGBDEBKiHiHBFBCDBCBBCOBCkGB8pBDBCaBCBBCDDCJBCDBCCCHFFCECBBBCBBCDDCICBCCDDBCGBCDBCDBCCCBIBCQBGCBCEBCQBlqE-2pBBhB9oEBDt0FBDwpHBQtTBjtC9QBjvBq6EBGppIB",!1)),Lt:()=>new g(m("lOGDnB2sH2sHBGBJHBJHBNQQwBAB",!1)),Lu:()=>new g(m("hCZBmDWBCGBiB2BCDOCDuBCBECEBBCCCBCCBBBDDBCBBCCBEBBCBBCECBCCDCCBCCBBBCCCBEEIJDCMCDQCDDDCCBC4BCIBBCBBDCCBCBCGCiJCCEJJHCCBBBCCCBCCBPBCIBkBDDBBBEWCGDDCBBDyBBxBgBCK2BCBMCD+CCDlBBq6ClBBCGGzW1CB0kCHHBpBBDCBhK0ECKgDCKHBJFBLHBJHBJFBMGCJHBpCDBNDBNDBNEBMDBnIFFECBDCBDEEBDBHGCBCBDDBLBBG+B+B9zCvBBxBCCBBBDGCBCBCDDJCBCgDCJCCFuqeuqeCqBCUaCoEMCE8BCLECBICFCCDCCEUCBDBCEBCOCBCBCCCBQCZs5Vs5VBYBmmBnBBpEjBB9EKBCOBCGBCBBr3ByBB+EVB75CfBhsVfBhCYBoqZZBbZBbZBbCCBGDBDDBCBCHBbZBbBBCDBDHBCGBcBBCDBCEBCEEBFBcZBbZBbZBbZBbZBbZBfYBiBYBiBYBiBYBiBYBiB2pE2pEBgBB",!1)),M:()=>new g(m("gYvDB0IGBoIsBBCCCBCCBCCpCKBxBUBRmDmDBFBDFBDBBCDBkBffBZB8CKB7BIBKZZBCBCIBCCBCEBsBCB8BIBrBXBCgBB3BCBCRBCGBLBBeCB5BCCBFBDBBDCBKLLBbbDCB5BCCBDBFBBDCBEffBEEMCB5BCCBGBCCBCCBVBBXFBCCB5BCCBFBDBBDCBICBLBBf8B8BBDBECBCDBKpBpBBDB4BCCBFBCCBCDBIBBMBBeCB5BCCBFBCCBCDBIBBMBBQNNBCB4BBBCGBCCBCDBKLLBeeBBBnCFFBEBCCCBGBTBB+BDDBFBNHBjDDDBHBMGBqCBBcECFBByBTBCBBGKBCjBBKlDlDBSBYDBFCBCCBDGBEDBOLBCLLBCBgWCBzdDBdCBeBBfBBhCfBKuBuBBBBC2D2DBjBjB3DLBFLB8GEB6BJBCcBDxBxBBsBBDLBVEBwBQBnBIBNCBfMB5BNBxBTB5ECBCUBFHHDCBnG-BBxWgBB--CCBuEhDhDBeBrRFBqDBB1udDBCJBhBBBxCBBxIEEFYYBDBF0C0CBzBzBBQBbRBOnBnBBGBaMBtBDBwBNBlBkCkCBMBNJJBuBuBBBBzBCCBBBDBBGBBCqBqBBDBGBBtHHBCBBx5TiXiXBOBRPBuejHjH2EEBn0BCBCBBGDBpBCBFmFmFB+R+RBCBiCEB+JBBuCFBnCKByBDB7DCB2BOBqBDDBLLBCBuBKBI+B+BBBBlBNBRBBtBNNBBBxBNBJDBCBB9CLBHDD+ELBWDB4BBBCGBDBBDCBKLLBDDBFBEEBkCIBCDDCDBCEBCPPBzCzCBQBYyCyCBSBsHGBDIBcBBzCQBrDMBmDOBhIOB2HFBCBBDDBCCCBuEuEBFBDGBEddBIBpBGBCDBJKKBJBvBPBnGHBoGHBCHBzCVBCNB7DFBECCBCCBFBCjCjCBDBCBBCEB8KDBKBBCxBxBBFBEEBYmnFmnFHOBpmLRBhuCEB8BGB5gBCCB1BBIDByCMMBslTslTBizEizEBsBBDWB-QEBEFBJHBDGBfDB1ECB89B2BBFxBBJPPXEBCOBxqBGBCQBDGBCBBCEBlDhFhFBFB4L+B+BBCB9PDB-HBB0HDDIBBG7O7OBFBuDGB29lYvHB",!1)),Mc:()=>new g(m("joC4B4BDCBJDBCBBzBBB7BCBHBBDBBLsBsB7BCBjC7B7BBBBJCCB2B2BB7B7BCHHBDDBLLnDBBCBBECBCCBLqBqBBBB+BDB+BBB7BCCBDBDBBCBBKBBdPPB7B7BBBBGCBCCBLrBrBBsCsCBBBHHBTBBrKBBgCsFsFBFFHDDBaaBLLBBBDGBWBBDFBDLLBBB5zBffiEIIBGBCBB7KDBDCBFBBCFBhHBB7BCCKCCBJJBEByExBxBGCCBDBCBB+BffFBBD9B9BDCBCEEBxBxBBGBJBBsFWW35EBB0-dBBD5C5CBzBzBBOBvEBBwBxBxBBFFBDDBBBvDBBDBBZuBuBCuDuDDBBGuHuHBCCBCCBCC0gZCCgEuBuBBBBFBB0DZZB8B8BxBCBKBBO+C+CBBBEBBCrFrFBBBgBBB7BBBCDBDBBDCBKLLB1C1CBBBIDDCDBCBBCmDmDBBBJBBErDrDBBBHCCBCBDuHuHBBBHDBDyDyDBBBJBBCuDuDCBBHoDoDCBBFmImIBBBK4H4HBEBCBBFDDCvEvEBBBJDBF1C1CeBB-BqGqGECCoGPPrDIID2G2GBDBFBBC-K-KBNNxBBBJBBCpvQpvQBBBlxD2BBpDBB0rYBBHFB",!1)),Me:()=>new g(m("okBBB1xF-wB-wBBCBCCBsshBCB",!1)),Mn:()=>new g(m("gYvDB0IEBqIsBBCCCBCCBCCpCKBxBUBRmDmDBFBDFBDBBCDBkBffBZB8CKB7BIBKZZBCBCIBCCBCEBsBCB8BIBrBXBCfB4BCCFHBFEEBFBLBBe7B7BFDBJVVBbbDBB6BFFBFFBDDBBBEffBEEMBB6BFFBDBCBBFVVBXXBEBC7B7BDCCBCBJIIBMMBff+BNNzBEE4BCCBBBGCBCDBIBBMBBe7B7BDHHGBBVBBdBB6BBBFDBJVVBeepCIIBBBC7C7CDGBNHBjDDDBHBMGBqCBBcEC4BNBCEBCBBGKBCjBBKnDnDBCBCFBCBBDBBaBBFCBRDBODDBHHQgWgWBBBzdCBeBBfBBfBBhCBBCGBJDDBJBKuBuBBBBC2D2DBjBjB3DCBFBBKHHBBB8GBBD7B7BCGBCCCDHBHJBDxBxBBMBCeBDLBVDBxBCCBDBCGGpBIBNBBhBDBDBBCCB5BCCBEECCB7BHBDBB5ECBCMBCGBFHHEBBnG-BBxWMBFEEBKB--CCBuEhDhDBeBrRDBsDBB1udFFBIBhBBBxCBBxIEEFaaBGG4EBBbRBOnBnBBGBaKBvBCBxBDDBCBDBBoBkCkCBEBDBBDBBNJJwB0B0BCCBDBBGBBCrBrBBJJvHDDFx5Tx5TiXPBRPBuejHjH2EEBn0BCBCBBGDBpBCBFmFmFB+R+RBCBiCEB+JBBuCFBnCKByBDB8D3B3BBNBqBDDBLLBBByBDBDBBI+B+BBBBlBEBCHB-BNNB1B1BBHBLDBDgDgDBBBDCCBHHD+E+EEHBWBB6BBBEmBmBBFBEEBnCFBOECPBB2CHBDCBCYY1CFBCFFBCCBvHvHBCBHBBCBBcBB2CHBDCCBrDrDCDDBEBCmDmDCDDBCBCEBkIIBCBBhIBBCFFxEDBDBBFhBhBBIBpBFBDDBJKKBEBDCBvBMBCBBnGCCBBBCqGqGBFBCFBCzCzCBUBDGBCBBCBB7DFBECCBCCBFBCpCpCBEEC8K8KBMMB1B1BBDBGCCYmnFmnFHOBpmLLBECBhuCEB8BGB5gBgCgCBCByC5lT5lTBizEizEBsBBDWBhRCBSHBDGBfDB1ECB89B2BBFxBBJPPXEBCOBxqBGBCQBDGBCBBCEBlDhFhFBFB4L+B+BBCB9PDB-HBB0HDDIBBG7O7OBFBuDGB29lYvHB",!1)),N:()=>new g(m("wBJB5DBBGDDBBBitBJBnEJBnGJB9MJB3DJBFFBtDJB3DJB3DJBDFBvDMB0DJBJGBoDJBpDGBISBuDJBhDJB3DJBnCTBtIJBnCJBwWTBybCBwHJBHJBXJBtJJBhEKBmFJBHJB3FJB3CJBnEJBHJB3gBEEBEBHJBnGyBBDEB3W7BBvCVB3TdBqrBqYqYaIBPCB4KDBrEJBfHBCOBhBJBoBOBh7cJB9FJBhKFB7EJBnBJBnGJBXJB3CJB3MJB34UJBuPsBBN4BBSBB2KaBlBDBeJJnEEBrGJBvdHBaGBoBIBsCEBXFBhFBBDPBDtBBhCIB1BBBfCBsCEBpDHBZHBqBGBrKFBxBJBHJB3IeB-EJBrBDBxDGBnEdBhEJB9BJBxEJBITB8HJB3KJB3DJB3LJBnDJBHTBtCLBlNSB+CJB3UJB3CcBkHJBnCJB3BJBnLJBnDUBshBuDBimPJBnpCJB3CJBnEJBCGBvQJBnIWB+KCB6nXJBnuBTBNTBtDYB2iBxBBhqCJBnNJB3PJB4HJBtWIBhEJB4Y6BBCCBCDBtCsBBCOBjeMBk3CJB",!1)),Nd:()=>new g(m("wBJnxBJnEJnGJ9MJ3DJ3DJ3DJ3DJ3DJ3DJ3DJ3DJ3DJhDJ3DJnCJ3IJnCJn6BJnBJtJJhEJnFJHJ3FJ3CJnEJHJnuiBJnVJnBJnGJXJ3CJ3MJ34UJnsBJnkCJHJ9YJhEJ9BJxEJ3IJ3KJ3DJ3LJnDJHTtCJnNJnDJ3UJ3CJ3HJnCJ3BJnLJ3uQJnpCJ3CJnEJ3QJ37XJ12CxBhqCJnNJ3PJ4HJ2aJ30EJ",!0)),Nl:()=>new g(m("u3FCBwzCiBBDDB-zDaaBHBPCBs1dJBxyW0BBtOJJnEEBrhIuDBm8SCB",!1)),No:()=>new g(m("yFBBGDDBBB2pCFB5LFB5DCBmEGB6GGBSIByNJB2hBTB0jBJBhP20B20BEFBHJBnGPBqB3W3WB6BBvCVB3TdBqrB1kB1kBBCBrEJBfHBCOBhBJBoBOBxrdFBymWsBBiCDBSBB2KaBlBDB1pBHBaGBoBIBsCEBXFBhFBBDPBDtBBhCIB1BBBfCBsCEBpDHBZHBqBGBrKFBhLeB-EJBrBDBxDGBnETB8LTBmqBBBvNIBobSB0aUBn8SGB-YWBqhZTBNTBtDYBvqFIBid6BBCCBCDBtCsBBCOBjeMB",!1)),P:()=>new g(m("hBCBCFBCDBLBBEBBbCBCccCkBkBGEELBBEEE-VJJzOFBqBBB0BCCDDDtBBBVBBCBBOCCBBBrCDBnDsBsBBMBqHCB3BOBgBmImIBLLtE5D5D6DnMnMNwLwL7CLLBpFpFBNBCmBmBBCBoCrCrCBDBFBBwDFBsFlTlTBHB4EuTuTtBBBvCCBoCBB+ECBCCBmBKB6JBB5GBBhEGBCFBhFBBLGBdCB9DDB8BEB-BBBhCHBM9Z9ZBWBJTBCMBCLBfBBPBB6TDBeBB+hBNBwCBBgBJB0MVBgCDBhBBB8XDBCBBxDwEwEBtBBCfBDLBkNCBFJBDLBRNNjD7C7CjgdBBuICBkDLL0DFB9LDB3CBBpBCBCyByBBwBwBiDMBRBB9DDB-DBBRBB6HzqUzqUBxGxGBIBXiBBCNBCFFCBB2ECBCFBCDBLBBEBBbCBCccCCCBFB7MCB9UxBxB-MoXoXoGgBgBxIIBnBxDxDBFBjCGB6CDByO-J-JjBlElEBDBtBDB+FGBuDBBCDB-DDBxBBBwCDBFOOCCB5CFBsDrJrJBCCBzDzDBDBLBBCpDpD7HWBqDCBdMBtCjEjEBBB9HpIpIBBB8E9C9CBGB0CCBCEB+CJB4GgDgDBDBrBBBmUBBrCMBwFxjBxjBBDB97CBB8zOBBmEiCiCBDBJpRpRBBBoJDBoK9lT9lTovHEB07C-a-aBAB",!1)),Pc:()=>new g(m("-Cg-Hg-HBUU-u3BBBZCBwHAB",!1)),Pd:()=>new g(m("tB9qB9qB0BiyDiyDmgBqgCqgCBEBiwDDDgBBBFdd-NUUwDxszBxszBBmBmBLqFqFhzD-J-J",!1)),Pe:()=>new g(m("pB0B0BgB+1D+1DC-6B-6BqtC4B4BQ7T7TCff-hBMCxChBhBCGC1MUChCCCiBmhBmhBCECtBGCtNICEGCDBB-ozB6G6GeOCESSCCCrF0B0BgBGD",!1)),Pf:()=>new g(m("7F+6H+6HEddpuDCCFDDQEE",!1)),Pi:()=>new g(m("rFt7Ht7HDBBDaapuDCCFDDQEE",!1)),Po:()=>new g(m("hBCBCCBDECBLLBEEBcclCGGPBBI-V-VJzOzOBEBqB3B3BDDDtBBBVBBCBBOCCBBBrCDBnDsBsBBMBqHCB3BOBgBmImIBLLtE5D5D6DnMnMNwLwL7CLLBpFpFBNBCxDxDrCEBFBBwDFBsFlTlTBHBmY9D9DBBBoCBB+ECBCCBmBFBCDB6JBB5GBBhEGBCFBhFBBLGBdCB9DDB8BEB-BBBhCHBMjajaBJJBGBJIBDDBDCBEKBCCCBIB7kDDBCBBxDwEwEBFFBBBDDDBHBCBBCDDBLLBDBCJBDDBCCCBLBDCBtNCB6B+F+FjgdBBuICBkDLL0DFB9LDB3CBBpBCBCyByBBwBwBiDMBRBB9DDB-DBBRBB6HlxUlxUBFBDXXVBBDDBECBCDBICBHCCB2E2EBBBCCBDECBLLBEEBcclBDDB7M7MBBB9UxBxB-MoXoXoGgBgBxIIBnBxDxDBFBjCGB6CDB0ZlElEBDBtBDB+FGBuDBBCDB-DDBxBBBwCDBFOOCCB5CFBsDrJrJBCCBzDzDBDBLBBCpDpD7HWBqDCBdMBtCjEjEBBB9HpIpIBBB8E9C9CBGB0CCBCEB+CJB4GgDgDBDBrBBBmUBBrCMBwFxjBxjBBDB97CBB8zOBBmEiCiCBDBJpRpRBBBoJDBoK9lT9lTovHEB07C-a-aBAB",!1)),Ps:()=>new g(m("oBzBzBgB-1D-1DC-6B-6B-rCEEnB4B4BQ7T7TCff-hBMCxChBhBCGC1MUChCCCiBmhBmhBCECaTTCECtNICEGCDipzBipzB4GeeCMCESSCCCrFzBzBgBEEDAB",!1)),S:()=>new g(m("kBHHRCBgBCCcCCkBEBCBBDCCBCBDEEfgBgBrODBNNBGGBCCCBPB2DPPBxDxDsErIrIBBB3DCBDDDBvGvGLUUB4H4HIBBpEqLqLBHHB2H2H-DjEjEBGBlEwGwGqBmGmGiGCBQCCBBBDFBVECmEHBCFBCBBGDBmGBBxXJB0WuLuLlL+E+EBgBBiLJBKIBhiBCCBBBMCBOCBOCBOBBmCOOoBCBOCBUhBB-BBBCDBCBBLCCBBBGFBCECFMMBFFBDBGDBC7B7BBFFB2LBFcBD+HBXKByCtCBXnTBtBwBBDeBLyMBX+BBFfBD1LBDpEBmHFBmLBBvBZBC4CBN1GBbPBFOOBNNWBBHBB8CBB0HBBFJBhBlBBKRRBdBMdBJQQBeBLmBBQ-JBhuG-BBx0V2BB6RWBKBBoDBB+EDBLDB+RCBiHPPB+9T+9TpEgBBuLPBhCBB3BHBtBDBjDCCBBBD7E7EHRRBBBgBCCcCCiEGBCGBOBB6JIB6BQBDCBCMBEwBwBBrBB7zBBBwSmWmWBiKiKBGBnjC2kC2kCBbBr6SDBG3qU3qUk7DvHBLCBEzNBHWBQQBgDzDB9B1HBLmBBD7BBGCBXBBIdBF8BBWhCBE7F7FB1CBrbaagBaagBaagBaagBaa9B-PB4BDBzBHBCNBCBBp2BwNwNttCEE+DiOiOBvIvIBqBBFjDBNOBDOBCOBCkBBYgFB5BcBOrBBFIBIBBPFB7E4eBEQBEMBE5GBHLBFQQBKBF3BBJJBHnBBJdBDLBFBBPIBoB3KBJNBDMBEKBE4BBCFFBOBDLBFJBIyEBC7CBLAB",!1)),Sc:()=>new g(m("kB+D+DBCBqnB8D8DzPBBzPBBI2H2HoImSmS8sClmClmCBgBB37hBkuVkuVtD7E7E8GBBEBB3-HDB-4wBxtCxtC",!1)),Sk:()=>new g(m("+CCCoCHHFEEqQDBNNBGGBCCCBPB2DPPBjoBjoB15FCCBBBMCBOCBOCBOBB9kEBBkzdWBKBBoDBBxePPBniUniUBPB8bCCjF4g9B4g9BBDB",!1)),Sm:()=>new g(m("rBRRBBB+BCCuBFFmBgBgB-XwQwQBBB8xGOOoBCBOCBsEoBoBBDBHlClCBDBGBBFGDIgBgBBDDCgBgBBqIBhBBB7CffBXBpBFB2OKK3BHBwDxKxKBDBDeBLPBhIiEBX+BBFfBDhIBxBUBDFB9+zB5Z5ZCCBlFRRBBB+BCCkEHHBCBitDBBhrwBx+Bx+BagBgBagBgBagBgBagBgBat5Ft5FB-uC-uCBHB",!1)),So:()=>new g(m("mFDDFCCyerIrIBgEgEBvGvGLUUB4H4HkQ2L2LjEFBClElEwGqBqBoMCBQCCBBBDFBVECmEHBCFBCBBGDBmGBBxXJB0WzWzW+EhBBiLJBKIBksBBBCDBCBBLCCBHHBEBCECFMMBPPCBBC7B7BBKKBDBDDBCBBCBBCGBCeBDBBCCCBdBtIHBFTBDGBDwCBCdBanBBHnCBXKByCtCBX2FBCIBC1BBJuDBC3HBtBrBBhC-HBhQvBBWBBHmBBDpEBmHFBmLBBvBZBC4CBN1GBbPBFOOBNNWBBHBBxKBBFJBhBlBBKRRBdBMdBJQQBeBLmBBQ-JBhuG-BBx0V2BBibDBLBBC+R+RBBBqqUPBuLPBhCBB3BHBuBCBlPEEFBBOBB6JIB6BQBDCBCMBEwBwBBrBB7zBBBwSpgBpgBBGBnjC2kC2kCBGBFQBr6SDBG3qU3qUk7DvHBLCBEzNBHWBQPBhDzDB9B1HBLmBBD7BBGCBXBBIdBF8BBWhCBE7F7FB1CBqlB-PB4BDBzBHBCNBCBBp2B96C96CiEyWyWBqBBFjDBNOBDOBCOBCkBBYgFB5BcBOrBBFIBIBBPFB7E6HBG4WBEQBEMBE5GBHLBFQQBKBF3BBJJBHnBBJdBDLBFBB-B3KBJNBDMBEKBE4BBCFFBOBDLBFJBIyEBC7CBLAB",!1)),Z:()=>new g(m("gBgEgEgvFgsCgsCBJBeBBGwBwBh9DAB",!1)),Zl:()=>new g(m("ohIA",!0)),Zp:()=>new g(m("phIA",!0)),Zs:()=>new g(m("gBgEgEgvFgsCgsCBJBlBwBwBh9DAB",!1)),ASCII_Hex_Digit:()=>new g(m("wBJIFbF",!0)),Alphabetic:()=>new g(m("hCZBHZBwBLLFGGBVBCeBCpOBFLBPEBICC3CeeBQBCBBDDBCHHCCBCCCBSBCyCBCqEBJlFBClBBDHHBnBBoBNBCCCBCCBCCJaBFDBeKBG3BBCGBPlDBCHBFHBFCBLCBDRRBuBBOkDBZgBBKBBFGGBWBDSBUYBIKBGXBCGBIJJBoBBLLBEGBHrCBCPBCCBFOBOSBCHBDBBDVBCGBCEEBCBEHBDBBDBBCJJFBBCEBNBBLFFBBBCFBFBBDVBCGBCBBCBBCBBFEBFBBDBBFIIBCBCSSBEBMCBCIBCCBCVBCGBCBBCEBEIBCCBCBBEQQBCBWDBFCBCHBDBBDVBCGBCBBCEBEHBDBBDBBKBBFBBCEBORRBCCBEBECBCDBEBBCCCBEEBEEBBBELBFEBECBCCBEHHpBMBCCBCWBCPBEHBCCBCCBJBBCCBCBBDDBdDBCHBCCBCWBCJBCEBEHBCCBCCBJBBGCBCDBOCBNMBCCBCoBBDHBCCBCCBCGGBCBIEBXFBCCBCRBEXBCIBCDDBFBJFBCCCBGBTBBO5BBGGBH0B0BBECBDBCXBCCCBRBCCBDEBCHHPDBhBgCgCBGBCjBBFSBFPBCjBBkC2BBCDDBDBR-BBLDBDlBBCGGDqBBCsKBCDBDGBCCCBCBDoBBCDBDgBBCDBDGBCCCBCBDOBC4BBCDBDiCBmBPBR1CBDFBErTBDQBCZBGqCBEKBITBMUBNTBNMBCCBCBBNzBBDSBPFFkC4CBIqBBGlCBLeBCLBFIBYdBDEBMrBBFZB3BbBF+BBDTBzBYYBMMBBByBzBBCOBCHB0BpBBDDBLrBBCKBP2BBXCBLjBBDKBGqBBDCBqBDBCFBCBBEGGB+FBUhBBM1IBDFBDlBBDFBDHBCGCBdBD0BBCGBCEEBBBCGBEDBDFBFMBGCBCGB1DOORMBmDFFDJBCEEBDBHGCBCBCKBDDBGEBFSSBnBBuZzBB34BkHBHDBEBBNlBBCGGD3BBIRRBVBKGBCGBCGBCGBCGBCGBCGBCGBCfBwB2O2OBBBaIBIEBDEBF1CBHCBC5CBCDBGqBBC9CBSfBxBPBhQ-tGBhCs0VBkCtBBDsIBEPBLBBVuBBGHBEwDBoBIBDmDBDxCBVUBCgBBZzBBNjCBCtBtBBEBECCBBBLgBBGiBBOcBEyBBCLBQRRBOBLEBC2BBKNBTWBEkCBCCCZCBDPBDDBMFBDFBDFBKGBCGBCqBBCNBH6DBWj9KBNWBFwBBloItLBDpDBnBGBNEBGLBCMBCEBCCCBCCBCCBqDBiBqLBT-BBD1BBpBLB1DEBCmEBlBZBHZBM4CBEFBDFBDFBDCBkBLBCZBCSBCBBCOBDNBjB6DBmC0BBsIcBEwBBwBfBOdBGqBBGdBDjBBFHBCEBrB9EBTjBBFjBBFnBBJzBBNKBCOBCGBCBBCKBCOBCGBCBBEzBBN2JBKVBLHBZFBCpBBCIBmCFBDCCBqBBCBBEDDBVBLWBKeBiCSBCBBLVBLZBHZBnB3BBHBBhCDBCBBGHBCCBCcBrBcBEcBkBHBCbBc1BBLVBLSBORBvDoCB4ByBBOyBBOnBBjBbBEGGBVB7HpBBCBBEBBRFBzBCBEcBLJJBUBrBRBvBUBcWBKlCBsBEBL4BBKOOBXBYyBBSDBJiBBEKKB+BBCDBKBBLCCkBRBChBBDHHBCB-BGBCCCBCBCOBCJBI4BBYDBCHBDBBDVBCGBCBBCEBEHBDBBDBBEHHGGBdJBCDDClBBCJBCDDCDBCBBECCtBhCBCCBCDBVCBfhCBDBBC5F5FB0BBDGBaFBjB+BBCEE8B1BBDoCoCBZBDNBWGB6F4BBoD-BBgBHBDDDBGBCBBCdBCBBDBBDDB+CHBDtBBDFBCCCBccBxBBDJBSnCBGTTBnCBoDHB5CgBBgBIBCsBBCGBCyByBBcBDVBCNBqCGBCBBCrBBECCBCCBBBCDDBZZBEBCBBCkBBCBBCDBCYYBqBBlIWBKQBCoBBECBwDwCwCB4cBnDuDBSjGBtyCgDBQvhBBSFBa68DBGmSB61GuBBy2B4RBIeBSuCBSdBTvBBRDBgBUBGSBxNsBB0G-BBhBYBDYBtBqCBF4BBIQBhCBBCNNBFBK1mHBqBfBiDyDB+vIDBCGBCBBCiJBQeeBBBDPPBCBJrMBloCqDBGMBEIBIJBFi7Fi7FBzCBCmCBCBBDDDBDDBCBCLBCCCBFBCgCBCDBDHBCGBCbBCDBCEBCEEBFBCzKBDYBCYBCeBCYBCeBCYBCeBCYBCeBCYBCHB15BeBHFB2GGBCQBDGBCBBCEBG9BBiBxDxDBrBBLGBRiKiKBcBTrBBlPbBlHdBDwGwGBdBCVBJBBhHGBCDBCBBCOBCkGB8BjCBEEE1lBDBCaBCBBCDDCJBCDBCCCHFFCECBBBCBBCDDCICBCCDDBCGBCDBCDBCCCBIBCQBGCBCEBCQB1TZBHZBHZB3zD-2pBBhB9oEBDt0FBDwpHBQtTBjtC9QBjvBq6EBGppIB",!1)),Dash:()=>new g(m("tB9qB9qB0BiyDiyDmgBqgCqgCBEB+BoBoBQnMnMlgDDDgBBBFdd-NUUwDxszBxszBBmBmBLqFqFhzD-J-J",!1)),Emoji:()=>new g(m("jBHHGJBwDFFu8HNN5GXX7CFBQBBwLBBNnFnFaKBFCBoGoHoHBLLK7B7BBCBCEBKGDBDDFDDCBBDIEBJJBBBGCCGLBMBBDCCBCCTDDBTTBEBCCCBEEBGGDBBFBBMBBGBBDGGBECBVVBGGBEBCDBDFFDDDBEBCDDCCCHEEHLLBQQDFFCFFBBBCMMBxBxBBBBKeP1LBBwOCBUBB0BFF7mBNN6SCCrrvDrGrGhFBBNBBPDDBIBsCZBCBBYVVDIBWBBvFhBBDvDBDBBCCBDyCBDCBCmIBC+BBMFBCXBIBBDHBNDDBCBDFFBOOBDDJBBKGGBBBNCBJCBDCCFHHEHHB0CBxBlCBGHBDDBEJBECCBEEDJBkHLBF8I8IBtBBCJBC4FBxDMBEKBE4BBCFFBOBDLBFJB",!1)),Emoji_Component:()=>new g(m("jBHHGJB0+H2G2Gsp3B3+8B3+8BBYB8PEBxtBDBtzhY-CB",!1)),Emoji_Modifier:()=>new g(m("7-8DE",!0)),Emoji_Modifier_Base:()=>new g(m("9wJ8G8GRDB4jzD9B9BBBBDDDBBB2DBBDKBWSBEFFBBBCCBICCZqGqGBFFWFFBvFvFBBBEEB0CRRBBBKMMgSDDJHBHKKBIBDCB5B+B+BBCCBCCSCBCMBmHCBrBIB",!1)),Emoji_Presentation:()=>new g(m("64IBBuGDBEDDqQBBWBBzBLBsBUUOJJBSSBGGBJJGWWIBBCFFDIIFBBdkBkBCFFBBBC+B+BBBBZPP8aBB0BFFvlxDrGrG-FDDBIBsCZBCZZVDDBDBCCBWBBvFgBBNIBClCBCVBNqBBFEBNQBEEEBlCBCCCB5FBD+BBODBCXBTbbBOO3C0CBxBlCBHEEBBBDDBEDBMBBIIBkHLBF8I8IBtBBCJBC4FBxDMBEKBE4BBCFFBOBDLBFJB",!1)),Extended_Pictographic:()=>new g(m("pFFFu8HNN5GXX7CFBQBBwLBBNnFnFaKBFCBoGoHoHBLLK7B7BBCBCEBKGDBDDFDDCBBDIEBJJBBBGCCGLBMBBDCCBCCTDDBTTBEBCCCBEEBGGDBBFBBMBBGBBDGGBECBVVBGGBEBCDBDFFDDDBEBCDDCCCHEEHLLBQQDFFCFFBBBCMMBxBxBBBBKeP1LBBwOCBUBB0BFF7mBNN6SCCrrvDoBoBBCBlDLBQBBQPPBmBmBBIBxDBBNBBPDDBIBU3BBcOBLVVDIBCDBKWBH7FBDvDBDBBCCBDyCBDCBCDBG9HBC+BBMFBCXBIBBDHBNDDBCBDFFBOOBDDJBBKGGBBBNCBJCBDCCFHHEHHB0CBxBlCBGHBDQBECCBEBDMB7GlBBNDB5BHBLFBpBHBfBBNDBDNBKmBBNuBBCJBC4FB5CHBPxEBhI9fB",!1)),Hex_Digit:()=>new g(m("wBJIFbFq1-BJIFbF",!0)),Lowercase:()=>new g(m("hDZBwBLLFlBlBBWBCHBC2BCBQCBuBCDECBBBDCCDEEBFFDEEBBBDDDCCCDCCBCCDEECDDBDDBBBHGDCOCBSCBDDCEEC4BCBFBDDDBCCFICBjCBDiBBIBBfEBhDsBsBCEEDDBTccBhBBCBBECBCWCBDBCGDB0B0BBuBBCgBCK0BCDMCBgDCxBoBBo6CqBBCDB5XFBjkCIBC2D2DB+FBiC0ECBHBCgDCBHBJFBLHBJHBJFBLHBJHBJNBDHBJHBJHBJEBCBBHEEBBBCBBJDBDBBJHBLCBCBB6DOORMBuDEEBEEcKFDBBJDBFiBiBBOBFsasaBYBn6BvBBCEEBGCFCCBCCBGBEiDCBIICFFNlBBCGG0oesBCUaCBBBmEMCBBBC8BCBIBCCCDICFCCDCCBBBCSCGGGCMCFCCDOCWDBCCCBBB2ZqBBCNBHvCBh6TGBNEBqhBZBumBnBBpEjBB8EKBCOBCGBCBBkODDBBBCpBBCIBmoByBB+DVB75CfBhsVfB8BYBnqZZBbGBCRBbZBbDBCCCBFBCKBbZBbZBbZBbZBbZBbZBbZBbZBbbBdYBCFBbYBCFBbYBCFBbYBCFBbYBCFBC15B15BBIBCTBHFBmI9BB1lChBB",!1)),Math:()=>new g(m("rBRRBBBgBeeCuBuBFmBmBgB5W5WBBBDbbBDDBBBwQCBuwGccBBBMEEOPPBCBWEBMEBiCMBFEEBFFBDBTFFDJBCDDBEBHEEBDDBCCBBBCFBENBClClCBWBCFBCBBFBBFfBCHHBPPBqIBJDBVBB7CffBZBCZZMGB+NBBNJBFFBFBBDBBEEBPCCDFBMHBGBB6BCCeDBKCBxK-BBhI-PBxBUBDFB9+zB4Z4ZBEBCjFjFRCBeCCeCCkEHHBCBitDBBhrwBwoBwoBBzCBCmCBCBBDDDBDDBCBCLBCCCBFBCgCBCDBDHBCGBCbBCDBCEBCEEBFBCzKBDjJBDxBBhwFDBCaBCBBCDDCJBCDBCCCHFFCECBBBCBBCDDCICBCCDDBCGBCDBCDBCCCBIBCQBGCBCEBCQB1BBB-uCIB",!1)),Quotation_Mark:()=>new g(m("iBFFkEQQ96HHBaBBowDqOqOBCBOCBixzBDB+FFF7CBB",!1)),Terminal_Punctuation:()=>new g(m("hBLLCMMBEE-ZJJiQ6B6BpCPPCCB1FsBsBBJBCsHsHB3B3BBEBCHBgBmImIB1nB1nBBtFtFFFB4JBB2YHBmY9D9DBBBoCBB+ECBEoBoBBCBDBB7JBBjLDBjFBBLBBCCBeCB8FEB-BBBldYYBKKBBBwlDCBzJOOFLLCBBEBBtNBB8ndBBuICBkHEB-LBB3CBBgD4E4EBBB0ECBgERRB6H6HnxUDDB6B6BBBBCDBqFLLCMMBEEiCDD7hBxBxBnkBoGoG3JBB5EFBlCFB6CDB5dEBtBDB+FGBxDDBgECBiEBBHRRB5C5CBDBtDrJrJB2D2DBBBNBBnLDBEOBqDBB6HCBmQCC8HBB4CBBFBB-MCBuBmUmUBrCrCBspBspBBDB6vRBBmEiCiCBBBLqRqRBoJoJBnwTnwTovHDB",!1)),Uppercase:()=>new g(m("hCZBmDWBCGBiB2BCDOCDuBCBECEBBCCCBCCBBBDDBCBBCCBEBBCBBCECBCCDCCBCCBBBCCCBEEIJDCMCDQCDDDCCBC4BCIBBCBBDCCBCBCGCiJCCEJJHCCBBBCCCBCCBPBCIBkBDDBBBEWCGDDCBBDyBBxBgBCK2BCBMCD+CCDlBBq6ClBBCGGzW1CB0kCHHBpBBDCBhK0ECKgDCKHBJFBLHBJHBJFBMGCJHBpCDBNDBNDBNEBMDBnIFFECBDCBDEEBDBHGCBCBDDBLBBGbbBOBUzZzZBYBx5BvBBxBCCBBBDGCBCBCDDJCBCgDCJCCFuqeuqeCqBCUaCoEMCE8BCLECBICFCCDCCEUCBDBCEBCOCBCBCCCBQCZs5Vs5VBYBmmBnBBpEjBB9EKBCOBCGBCBBr3ByBB+EVB75CfBhsVfBhCYBoqZZBbZBbZBbCCBGDBDDBCBCHBbZBbBBCDBDHBCGBcBBCDBCEBCEEBFBcZBbZBbZBbZBbZBbZBfYBiBYBiBYBiBYBiBYBiB2pE2pEBgBBvgCZBHZBHZB",!1)),White_Space:()=>new g(m("JEBTlDlDbgvFgvFgsCKBeBBGwBwBh9DAB",!1))});static SCRIPTS=new zo({Adlam:()=>new g(m("go6DrCFJFB",!0)),Ahom:()=>new g(m("g4lCaDOFW",!0)),Anatolian_Hieroglyphs:()=>new g(m("ggxCmS",!0)),Arabic:()=>new g(m("gwBEBCFBCNBCCBCfBCJBMZBCrDBChBBxCvBBxHhBBGqCBCcBxy8BtPBDvEBhBPBxDEBCmEBk7DeBkCFBJIBiBFBh43BDBCaBCBBCDDCJBCDBCCCHFFCECBBBCBBCDDCICBCCDDBCGBCDBCDBCCCBIBCQBGCBCEBCQB1BBB",!1)),Armenian:()=>new g(m("xpBlBDxBDCks9BE",!0)),Avestan:()=>new g(m("g4iC1BEG",!0)),Balinese:()=>new g(m("g4GsCCxB",!0)),Bamum:()=>new g(m("g1pB3CpowB4R",!0)),Bassa_Vah:()=>new g(m("w26CdDF",!0)),Batak:()=>new g(m("g+GzBJD",!0)),Bengali:()=>new g(m("gsCDBCHBDBBDVBCGBCEEBCBDIBDBBDDBJFFBCCBDBDYB",!1)),Beria_Erfe:()=>new g(m("g17CYDY",!0)),Bhaiksuki:()=>new g(m("ggnCICsBCNLc",!0)),Bopomofo:()=>new g(m("qXB6wLqBxDf",!0)),Brahmi:()=>new g(m("ggkCtCFjBKA",!0)),Braille:()=>new g(m("ggK-H",!0)),Buginese:()=>new g(m("gwGbDB",!0)),Buhid:()=>new g(m("g6FT",!0)),Canadian_Aboriginal:()=>new g(m("ggF-TxRlC7tgCP",!0)),Carian:()=>new g(m("g1gCwB",!0)),Caucasian_Albanian:()=>new g(m("wphCzBMA",!0)),Chakma:()=>new g(m("gokC0BCR",!0)),Cham:()=>new g(m("gwqB2BKNDJDD",!0)),Cherokee:()=>new g(m("g9E1CDFz7lBvC",!0)),Chorasmian:()=>new g(m("w9jCb",!0)),Common:()=>new g(m("AgCBbFBbuBBCOBCEBYgBgBiOmBBGEBDTB1DKKHCC+THHPEEhB9E9ElQiEiEB6mB6mB2MDBjJwvBwvBBBBoCBBsGBBCumBumBOIIBCBCFBCCBDmYmYBKBD2CBCKBEKBCOBShBB-BlBBCCBDFBCaBCQBqBCBF5UBXKBW-cBhIzTBDpEBhQ9CBzMUBCCCBXBQHBFDB8CBBE7C7CB0E0EBOBhBlBBKxBxBB+BBgBwCBwB5C5CBmFBhuG-BBhoWhBBnDCBmFJB1HhFhFsMPPBzuUzuUBxGxGBIBXiBBCSBCDB0ECCBeBbFBbKBLuBuBBhChCBFBCGBLEBjICBFsBBEIBxCMB0BsBBlHaBltuBDB96D8HBEzNBHWBQQBgDzDB9B1HBLmBBD9BBEQBJBBIdBF8BB2GTBNTBN2CBKYBoE0CBCmCBCBBDDDBDDBCBCLBCCCBFBCgCBCDBDHBCGBCbBCDBCEBCEEBFBCzKBDjJBDxBByjFjCBtC8BBjWrBBFjDBNOBDOBCOBCkBBLtFB5BZBCBBOrBBFIBIBBPFB7E4eBEQBEMBE5GBHLBFQQBKBF3BBJJBHnBBJdBDLBFBBPIBoB3KBJNBDMBEKBE4BBCFFBOBDLBFJBIyEBCmDBnghYffB+CB",!1)),Coptic:()=>new g(m("ifNxkKzDGG",!0)),Cuneiform:()=>new g(m("ggoC5cnDuDCEMjG",!0)),Cypriot:()=>new g(m("ggiCFBDCCBqBBCBBEDD",!1)),Cypro_Minoan:()=>new g(m("w8rCiD",!0)),Cyrillic:()=>new g(m("ggBkEBDoFBx6FKBhFtCtCojEfBhie-CBv8VBBhw4B9BBiBAB",!1)),Deseret:()=>new g(m("gghCvC",!0)),Devanagari:()=>new g(m("goCwCFODZh7nBfhwcJ",!0)),Dives_Akuru:()=>new g(m("gomCGBDDDBGBCBBCdBCBBDLBKJB",!1)),Dogra:()=>new g(m("ggmC7B",!0)),Duployan:()=>new g(m("ggvDqDGMEIIJDD",!0)),Egyptian_Hieroglyphs:()=>new g(m("ggsC1iBL68D",!0)),Elbasan:()=>new g(m("gohCnB",!0)),Elymaic:()=>new g(m("g-jCW",!0)),Ethiopic:()=>new g(m("gwEoCBCDBDGBCCCBCBDoBBCDBDgBBCDBDGBCCCBCBDOBC4BBCDBDiCBDfBEZBnvGWBKGBCGBCGBCGBCGBCGBCGBCGBjpfFBDFBDFBKGBCGBylvCGBCDBCBBCOB",!1)),Garay:()=>new g(m("gqjClBEcJB",!0)),Georgian:()=>new g(m("glElBBCGGDqBBCDBx8CqBBDCBhiElBBCGG",!1)),Glagolitic:()=>new g(m("ggL-Ch9sDGCQDGCBCE",!0)),Gothic:()=>new g(m("w5gCa",!0)),Grantha:()=>new g(m("g4kCDBCHBDBBDVBCGBCBBCEBDIBDBBDCBDHHGGBDGBEEB",!1)),Greek:()=>new g(m("wbDBCCBDDBCFFCCCBBBCCCBSBC+BBPPBnpGEBzBEBFEB1ChKhKBUBDFBDlBBDFBDHBCGCBdBD0BBCOBCNBDFBCSBDCBCIBoJ-xiB-xiB7uVuCBSgj0Bgj0BBkCB",!1)),Gujarati:()=>new g(m("h0CCBCIBCCBCVBCGBCBBCEBDJBCCBCCBDQQBCBDLBIGB",!1)),Gunjala_Gondi:()=>new g(m("grnCFCBCkBCBCFIJ",!0)),Gurmukhi:()=>new g(m("hwCCBCFBFBBDVBCGBCBBCBBCBBDCCBDBFBBDCBEIIBCBCIIBPB",!1)),Gurung_Khema:()=>new g(m("go4C5B",!0)),Han:()=>new g(m("g0LZBC4CBN1GBwBCCaIBPDBle-tGBhC-vUBhoWtLBDpDBpodBBNGBqgkB-2pBBhB9oEBDt0FBDwpHBQtTBjtC9QBjvBq6EBGppIB",!1)),Hangul:()=>new g(m("goE-HvxHBiI9CyDeiCei3dckUj9KNWFwBl9JeEFDFDFDC",!0)),Hanifi_Rohingya:()=>new g(m("gojCnBJJ",!0)),Hanunoo:()=>new g(m("g5FU",!0)),Hatran:()=>new g(m("gniCSCBGE",!0)),Hebrew:()=>new g(m("xsB2BBJaBFFBpp9BZBCEBCCCBCCBCCBIB",!1)),Hiragana:()=>new g(m("hiM1CBHCBi7-C+IBTeeBBBulQAB",!1)),Imperial_Aramaic:()=>new g(m("giiCVCI",!0)),Inherited:()=>new g(m("gYvDB2IBBlOKBbhXhXBCB8qEtBBDLBlPCBCMBCGBFHHEBBnG-BBtQBBjGgBB65DDBsDBBmrzBPBRNBwejHjH7iEl+uBl+uBBsBBDWBhRCBSHBDGBfDBz6rYvHB",!1)),Inscriptional_Pahlavi:()=>new g(m("g7iCSGH",!0)),Inscriptional_Parthian:()=>new g(m("g6iCVDH",!0)),Javanese:()=>new g(m("gsqBtCDJFB",!0)),Kaithi:()=>new g(m("gkkCiCLA",!0)),Kannada:()=>new g(m("gkDMCCCWCJCEDICCCDIBGCCDDJCC",!0)),Katakana:()=>new g(m("hlM5CBDCBxHPBxGuBBC3CBvgzBJBCsBBzisBDBCGBCBBCgJgJBBBzBPPBCB",!1)),Kawi:()=>new g(m("g4nCQCoBEc",!0)),Kayah_Li:()=>new g(m("goqBtBCA",!0)),Kharoshthi:()=>new g(m("gwiCDCBGHCCCcDCFJII",!0)),Khitan_Small_Script:()=>new g(m("k-7C84G84GB0OBqBAB",!1)),Khmer:()=>new g(m("g8F9CDJHJnPf",!0)),Khojki:()=>new g(m("gwkCRCuB",!0)),Khudawadi:()=>new g(m("w1kC6BGJ",!0)),Kirat_Rai:()=>new g(m("gq7C5B",!0)),Lao:()=>new g(m("h0DBBCCCBDBCXBCCCBVBDEBCCCBFBCJBDDB",!1)),Latin:()=>new g(m("hCZBHZBwBQQGWBCeBCgOBoBEB8wGlBBHwBBGDBGMBClCBiC-HByLOORMBuEBBHccSoBB42CfBj1elDBExCBVOBxZqBBCIBCDB38TGB7gBZBHZBmhCFBCpBBCIBm61BeBHFB",!1)),Lepcha:()=>new g(m("ggH3BEOEC",!0)),Limbu:()=>new g(m("goGeBCLBFLBFEEBKB",!1)),Linear_A:()=>new g(m("gwhC2JKVLH",!0)),Linear_B:()=>new g(m("gggCLCZCSCBCODNjB6D",!0)),Lisu:()=>new g(m("wmpBvBx1eA",!0)),Lycian:()=>new g(m("g0gCc",!0)),Lydian:()=>new g(m("gpiCZGA",!0)),Mahajani:()=>new g(m("wqkCmB",!0)),Makasar:()=>new g(m("g3nCY",!0)),Malayalam:()=>new g(m("goDMCCCyBCCCFFPDZ",!0)),Mandaic:()=>new g(m("giCbDA",!0)),Manichaean:()=>new g(m("g2iCmBFL",!0)),Marchen:()=>new g(m("wjnCfDVCN",!0)),Masaram_Gondi:()=>new g(m("gonCGBCBBCrBBECCBCCBHBJJB",!1)),Medefaidrin:()=>new g(m("gy7C6C",!0)),Meetei_Mayek:()=>new g(m("g3qBWqGtBDJ",!0)),Mende_Kikakui:()=>new g(m("gg6DkGDP",!0)),Meroitic_Cursive:()=>new g(m("gtiCXFTDtB",!0)),Meroitic_Hieroglyphs:()=>new g(m("gsiCf",!0)),Miao:()=>new g(m("g47CqCF4BIQ",!0)),Modi:()=>new g(m("gwlCkCMJ",!0)),Mongolian:()=>new g(m("ggGBBDCCBSBH4CBIqBB2t-BMB",!1)),Mro:()=>new g(m("gy6CeCJFB",!0)),Multani:()=>new g(m("g0kCGBCCCBCBCOBCKB",!1)),Myanmar:()=>new g(m("ggE-EhqmBeiDfxibT",!0)),Nabataean:()=>new g(m("gkiCeJI",!0)),Nag_Mundari:()=>new g(m("wm5DpB",!0)),Nandinagari:()=>new g(m("gtmCHDtBDK",!0)),New_Tai_Lue:()=>new g(m("gsGrBFZHKEB",!0)),Newa:()=>new g(m("gglC7CCE",!0)),Nko:()=>new g(m("g+B6BDC",!0)),Nushu:()=>new g(m("h-7CvsQvsQBqMB",!1)),Nyiakeng_Puachue_Hmong:()=>new g(m("go4DsBENDJFB",!0)),Ogham:()=>new g(m("g0Fc",!0)),Ol_Chiki:()=>new g(m("wiHvB",!0)),Ol_Onal:()=>new g(m("wu5DqBFA",!0)),Old_Hungarian:()=>new g(m("gkjCyBOyBIF",!0)),Old_Italic:()=>new g(m("g4gCjBKC",!0)),Old_North_Arabian:()=>new g(m("g0iCf",!0)),Old_Permic:()=>new g(m("w6gCqB",!0)),Old_Persian:()=>new g(m("g9gCjBFN",!0)),Old_Sogdian:()=>new g(m("g4jCnB",!0)),Old_South_Arabian:()=>new g(m("gziCf",!0)),Old_Turkic:()=>new g(m("ggjCoC",!0)),Old_Uyghur:()=>new g(m("w7jCZ",!0)),Oriya:()=>new g(m("h4CCCHDBDVCGCBCEDIDBDCICFBCEDR",!0)),Osage:()=>new g(m("wlhCjBFjB",!0)),Osmanya:()=>new g(m("gkhCdDJ",!0)),Pahawh_Hmong:()=>new g(m("g46ClCLJCGCUGS",!0)),Palmyrene:()=>new g(m("gjiCf",!0)),Pau_Cin_Hau:()=>new g(m("g2mC4B",!0)),Phags_Pa:()=>new g(m("giqB3B",!0)),Phoenician:()=>new g(m("goiCbEA",!0)),Psalter_Pahlavi:()=>new g(m("g8iCRIDNG",!0)),Rejang:()=>new g(m("wpqBjBMA",!0)),Runic:()=>new g(m("g1FqCEK",!0)),Samaritan:()=>new g(m("ggCtBDO",!0)),Saurashtra:()=>new g(m("gkqBlCJL",!0)),Sharada:()=>new g(m("gskC-ChsCH",!0)),Shavian:()=>new g(m("wihCvB",!0)),Siddham:()=>new g(m("gslC1BDlB",!0)),Sidetic:()=>new g(m("gqiCZ",!0)),SignWriting:()=>new g(m("gg2DrUQECO",!0)),Sinhala:()=>new g(m("hsDCBCRBEXBCIBCDDBFBEFFBEBCCCBGBHJBDCBt-gCTB",!1)),Sogdian:()=>new g(m("w5jCpB",!0)),Sora_Sompeng:()=>new g(m("wmkCYIJ",!0)),Soyombo:()=>new g(m("wymCyC",!0)),Sundanese:()=>new g(m("g8G-BhIH",!0)),Sunuwar:()=>new g(m("g+mChBPJ",!0)),Syloti_Nagri:()=>new g(m("ggqBsB",!0)),Syriac:()=>new g(m("g4BNC7BDCxIK",!0)),Tagalog:()=>new g(m("g4FVKA",!0)),Tagbanwa:()=>new g(m("g7FMCCCB",!0)),Tai_Le:()=>new g(m("wqGdDE",!0)),Tai_Tham:()=>new g(m("gxG+BCcDKHJHN",!0)),Tai_Viet:()=>new g(m("g0qBiCZE",!0)),Tai_Yo:()=>new g(m("g25DeCVJB",!0)),Takri:()=>new g(m("g0lC5BHJ",!0)),Tamil:()=>new g(m("i8CBBCFBECBCDBEBBCCCBEEBEEBBBELBFEBECBCDBDHHPUBm+kCxBBOAB",!1)),Tangsa:()=>new g(m("wz6CuCCJ",!0)),Tangut:()=>new g(m("g-7CgBgBB+3GBhQeBiDyDB",!1)),Telugu:()=>new g(m("ggDMCCCWCPDICCCDIBCCCBDDDJII",!0)),Thaana:()=>new g(m("g8BxB",!0)),Thai:()=>new g(m("hwD5BGb",!0)),Tibetan:()=>new g(m("g4DnCCjBFmBCjBCOCGFB",!0)),Tifinagh:()=>new g(m("wpL3BIBPA",!0)),Tirhuta:()=>new g(m("gklCnCJJ",!0)),Todhri:()=>new g(m("guhCzB",!0)),Tolong_Siki:()=>new g(m("wtnCrBFJ",!0)),Toto:()=>new g(m("w04De",!0)),Tulu_Tigalari:()=>new g(m("g8kCJBCDDClBBCJBCDDCDBCJBCBBJBB",!1)),Ugaritic:()=>new g(m("g8gCdCA",!0)),Unknown:()=>new g(m("4bBBHDBICCVuMuMnBBBzBBBE4B4BBGBcDBHKBvI9B9BBmDmDBMB8BBByBBBQddBCCMEBjBEBuHJJBDDBXXICCBBBFBBKBBDBBFHBCDBDGGBaaBEEHDBDBBXIIDGDBCCGDBDBBECBCGBFCCBFBSJBEKKEXXIDDGBBLIEBCCBNBFBBNGBIEEJBBDBBXIIDGGBKKBDDBEEBFBEDBDGGBTTBIBDHHBBBEFFBBBDCCDCBDCBECBNDBGCBEFFBCCBEBCNBWEBOEEYRRBKKEFFBFBDEEDBBFBBLGBXEEYLLGBBKEEFGBDEBEFFBLLELBOEE0BEEHDBRBBbEETCBZKKCBBICBCDBHCCJFBLBBELB7BDBekBBDCCGZZCYYBGGCIILBBFfBpClBlBBCBoBlBlBQOOBjBBnGCCBDBCBB6LFFBIICFFBqBqBFBBiBFFBIICFFBQQ6BFFBkCkCBhBhBBBBbFB3CBBHBB+UCB6CGBXIBZIBVLBOEEDLB-CBBLFBLFBbFB6CGBsBEBnCJBgBNNBCBNDBCCBrBBBGKBtBDBbFBMCB-BBBiCeeBMMBEBLFBPBBvBBBNTBuCnFnFBGB9BCBQCB-BEBsBBBMHBsBEB3QBBHBBnBBBHBBJGCgBBB2BQQPBBHUUBEEKmDmDNBBcOOBBBjBNBiBOBtEDB7UVBMUB14BBB-LEBuBCCBDBCBB5BGBDNBZIBI4BI-DhBBb6C6CBKB3GZBxC3C3CBoDoDBDBsB-C-C3CIBxBuzcuzcBBB4BIB9KTB5FHB+GTB9BCBLFB5BHBnCHBNFB1DKBfCBvCMMBCBiB4B4BBHBPBBLBBoDXBdJBHBBHBBHIBIII9BDB-DBBLFBl9KLBYDByBjoIBvLBBrDlBBILBGEBbGGCGDrUfBrBFB0BUUFDBGoEoEBCC-FCBHBBHBBHBBECBIIIBIBGBBNbbUDDQBBPhBB8DEBEDBuBCB5COOBBBCuBBvBhEBeCByBOBdDBlBIBfEBsBEBfmBmBBCBPpBB-EBBLFBlBDBlBDBpBHB1BKBNQQIDDMQQIDDBBB1BLB4JIBXJBJXBHrBrBKkCBHBBCtBtBDCBCBBYpCpCBGBKvBBUDDBDBiBCBcEBclBB5BDBVBBzBDDBDBJEEeBBEDBLGBKGBhCfBoBDBNIB3BCBeBBcEBbGBFLBIvCBqC2BB0BMB0BGBvBHBLFBnBCBeHBDvGBgBrBrBEBBDPBHHBKgBBvBHBrBVBblBBdTBYIBvCDBlBIBlCJBCBBaGBLFB2BTTBGBoBIBhDVVBJBTwBwBB8BBICCFQQMFB8BEBLFBFJJBDDBXXIDDGLLBDDBEEBCCBEBCEBIBBICBGKBLCCBCCnBLLCBBCFFLDDBGBDcB9CGGBcBpCHBLlFB3BBBnBhBBmCKBLFBOSB7BFBLFBVbBcBBQDBY4FB9BjDB0CLBJBBCBBJDDfDDBNNBHBLlCBJBBvBBBMaBpCHB0CMBqCGBL1CBJ3CBjBNBLFBKuBuBPJBeCBhBBBXPPBnCBIDDtBCBCDDKHBLFBHDDmBDDHGBLFBtBDBL1HBaGBSqBqBBBBe0CBCOBzBMB8clDBwDGGBJBlGryCBkDMB3iBJB88DEBoS41GB7Bl2BB6RGBgBLLBCByCLLBEBfBBHJBnCJBLIIWEBUvNB7BlGB8CEBaBBarBBsCDB6BGBS-BBGKBIIB3mHoBBhBgDB0D8vIBFIIDkJkJBNBCcBEBBCNBFHBtMjoCBsDEBOCBKGBLBBJ76DB+HCB1NFBYOBSOBvBBBYIB1D7BB3HJBoBBBjGUBnC5DBVLBVLB4CIBamEB2CoCoCDBBCBBDBBFNNCIIiCFFBJJIddFGGCCBI1K1KBlJlJB-V-VBNBGQQBuiBBgBFBH0GBISSBIIDGGBDB-BgBBCvDBuBCBPBBLDBD-JBgBQB7BEBCvOBrB1GBsBDBC-FBgBXXBGBD-GBIFFDQQmGBBRoBBtCDBLDBDwYBlCrCB+BhGBFccDCCBCCLFFCCCBEBCDBCECEDDCBBCICDCCBFFIKFCLLSEBEGGSzBBDtIBtBDBlDLBQBBQQQmBJBvF3BBeMBtBDBKGBDNBH5EB6eCBSCBOCB7GFBNDBCOBNDB5BHBLFBpBHBfBBNDBDNBKmBB5KHBPBBOCBMCB6BCCBCBRBBNDBLGB0EoDoDBjgBBh3pBfB-oEBBv0FBBypHOBvThtCB-QhvBBs6EEBrpIm8yVBCdBhD-DBxHvw-FB",!1)),Vai:()=>new g(m("gopBrJ",!0)),Vithkuqi:()=>new g(m("wrhCKCOCGCBCKCOCGCB",!0)),Wancho:()=>new g(m("g24D5BGA",!0)),Warang_Citi:()=>new g(m("glmCyCNA",!0)),Yezidi:()=>new g(m("g0jCpBCCDB",!0)),Yi:()=>new g(m("ggoBskBE2B",!0)),Zanabazar_Square:()=>new g(m("gwmCnC",!0))});static FOLD_CATEGORIES=new zo({L:()=>new g(m("laA",!0)),LC:()=>new g(m("laA",!0)),Ll:()=>new g(m("hCZBmDWBCGBiBuBCEECDOCDuBCBECEBBCCCBCCBBBDDBCBBCCBEBBCBBCECBCCDCCBCCBBBCCCBEEIBBCBBCBBCOCDQCDBBCCCBBBC4BCIBBCBBDCCBCBCGC3HrBrBCEEJHHCCBCCCBCCBPBCIBkBJJCUCGDDCBBDyBBxBgBCK2BCBMCD+CCDlBBq6ClBBCGGzW1CB0kCHHBpBBDCBhK0ECKgDCKHBJFBLHBJHBJFBMGCJHBZHBJHBJHBJEBMEBMDBNEBMEBqJEEBHHxC9zC9zCBuBBxBCCBBBDGCBCBCDDJCBCgDCJCCFuqeuqeCqBCUaCoEMCE8BCLECBICFCCDCCEUCBDBCEBCOCBCBCCCBQCZs5Vs5VBYBmmBnBBpEjBB9EKBCOBCGBCBBr3ByBB+EVB75CfBhsVfBhCYBoyehBB",!1)),Lt:()=>new g(m("kOCCBCCBCClBCCtsHHBJHBJHBMQQwBAB",!1)),Lu:()=>new g(m("hDZB7BqBqBBWBCHBCuBCEECDOCDsBCDECBBBDCCDEEGDDECBDDDCCCDFFDEECDDECCGBBCBBCBBCOCBSCDBBCEECkBCEQCJDDBCCFICBEBCBBCCCBEEBCCBCBCEBDCCBDDIDDCBBEFBGLLBnFnFsBCCEEEBBBvBDBCdBCBBECBCWCBDBCGD1BvBBCgBCK0BCDMCBgDCyBlBBq6CqBBDCB5XFBjkCIBCvHvHERRzD0ECGGGC8CCBHBJFBLHBJHBJFBMGCJHBJNBzBBBNSSBPPBEEpL2B2Bs1CvBBCEEBGCHDDLiDCJCCFNNBkBBCGG0oesBCUaCoEMCE8BCLCCDICFFFCBBDSCMOCFCCDOCb9a9advCBi8UZBumBnBBpEjBB8EKBCOBCGBCBBk4ByBB+DVB75CfBhsVfB8BYBvyehBB",!1)),M:()=>new g(m("5cgBgBlgHAB",!1)),Mn:()=>new g(m("5cgBgBlgHAB",!1)),Emoji:()=>new g(m("8mJA",!0)),Extended_Pictographic:()=>new g(m("8mJA",!0)),Lowercase:()=>new g(m("hCZBmDWBCGBiBuBCEECDOCDuBCBECEBBCCCBCCBBBDDBCBBCCBEBBCBBCECBCCDCCBCCBBBCCCBEEIBBCBBCBBCOCDQCDBBCCCBBBC4BCIBBCBBDCCBCBCGCiJCCEJJHCCBBBCCCBCCBPBCIBkBJJCUCGDDCBBDyBBxBgBCK2BCBMCD+CCDlBBq6ClBBCGGzW1CB0kCHHBpBBDCBhK0ECKgDCKHBJFBLHBJHBJFBMGCJHBZHBJHBJHBJEBMEBMDBNEBMEBqJEEBHHuBPBUzZzZBYBx5BvBBxBCCBBBDGCBCBCDDJCBCgDCJCCFuqeuqeCqBCUaCoEMCE8BCLECBICFCCDCCEUCBDBCEBCOCBCBCCCBQCZs5Vs5VBYBmmBnBBpEjBB9EKBCOBCGBCBBr3ByBB+EVB75CfBhsVfBhCYBoyehBB",!1)),Math:()=>new g(m("ycGDCHHFMMDDDCHHFAB",!1)),Uppercase:()=>new g(m("hDZB7BqBqBBWBCHBCuBCEECDOCDsBCDECBBBDCCDEEGDDECBDDDCCCDFFDEECDDECCGBBCBBCBBCOCBSCDBBCEECkBCEQCJDDBCCFICBEBCBBCCCBEEBCCBCBCEBDCCBDDIDDCBBEFBGLLBnFnFsBCCEEEBBBvBDBCdBCBBECBCWCBDBCGD1BvBBCgBCK0BCDMCBgDCyBlBBq6CqBBDCB5XFBjkCIBCvHvHERRzD0ECGGGC8CCBHBJFBLHBJHBJFBMGCJHBJNBzBBBNSSBPPBEEpLiBiBBOBFsasaBYBn6BvBBCEEBGCHDDLiDCJCCFNNBkBBCGG0oesBCUaCoEMCE8BCLCCDICFFFCBBDSCMOCFCCDOCb9a9advCBi8UZBumBnBBpEjBB8EKBCOBCGBCBBk4ByBB+DVB75CfBhsVfB8BYBvyehBB",!1))});static FOLD_SCRIPT=new zo({Common:()=>new g(m("8cgBgB",!1)),Greek:()=>new g(m("1FwUwU",!1)),Inherited:()=>new g(m("5cgBgBlgHAB",!1))})},J=class ct{static MAX_RUNE=1114111;static RUNE_ERROR=65533;static isUnsearchable(e){return e===ct.RUNE_ERROR||e>=ct.MIN_HIGH_SURROGATE&&e<=ct.MAX_LOW_SURROGATE}static MAX_ASCII=127;static MAX_LATIN1=255;static MAX_BMP=65535;static MIN_FOLD=65;static MAX_FOLD=125251;static MIN_HIGH_SURROGATE=55296;static MAX_HIGH_SURROGATE=56319;static MIN_LOW_SURROGATE=56320;static MAX_LOW_SURROGATE=57343;static MIN_SUPPLEMENTARY_CODE_POINT=65536;static is32(e,t){let n=0,s=e.length;for(;n<s;){let i=n+Math.floor((s-n)/2),a=e.getLo(i),u=e.getHi(i);if(a<=t&&t<=u){let c=e.getStride(i);return(t-a)%c===0}t<a?s=i:n=i+1}return!1}static is(e,t){if(t<=ct.MAX_LATIN1){for(let n=0;n<e.length;n++){if(t>e.getHi(n))continue;let s=e.getLo(n);if(t<s)return!1;let i=e.getStride(n);return(t-s)%i===0}return!1}return e.length>0&&t>=e.getLo(0)&&ct.is32(e,t)}static isPrint(e){return e<=ct.MAX_LATIN1?e>=32&&e<ct.MAX_ASCII||e>=161&&e!==173:ct.is(mt.Print,e)}static simpleFold(e){if(mt.CASE_ORBIT.has(e))return mt.CASE_ORBIT.get(e);if(e<=ct.MAX_ASCII){let t=L.toLowerCase(e);return t!==e?t:L.toUpperCase(e)}return e}static equalsIgnoreCase(e,t){if(e===t)return!0;if(e<0||t<0)return!1;if(e<=ct.MAX_ASCII&&t<=ct.MAX_ASCII)return 65<=e&&e<=90&&(e|=32),65<=t&&t<=90&&(t|=32),e===t;for(let n=ct.simpleFold(e);n!==e;n=ct.simpleFold(n))if(n===t)return!0;return!1}},Ui=class extends Error{constructor(r){super(r),this.name="RE2JSException"}},Ce=class extends Ui{constructor(r,e=null){let t=`error parsing regexp: ${r}`;e&&(t+=`: \`${e}\``),super(t),this.name="RE2JSSyntaxException",this.message=t,this.error=r,this.input=e}getDescription(){return this.error}getPattern(){return this.input}},Mi=class extends Ui{constructor(r){super(r),this.name="RE2JSCompileException"}},ut=class extends Ui{constructor(r){super(r),this.name="RE2JSGroupException"}},Jg=class extends Ui{constructor(r){super(r),this.name="RE2JSFlagsException"}},Zo=class extends Ui{constructor(r){super(r),this.name="RE2JSInternalException"}},iB=256,zg=new Uint8Array(iB);for(let r=0;r<iB;r++)zg[r]=97<=r&&r<=122||65<=r&&r<=90||48<=r&&r<=57||r===95?1:0;var Yl=null,Xl=null,U=class Ge{static METACHARACTERS="\\.+*?()|[]{}^$";static EMPTY_BEGIN_LINE=1;static EMPTY_END_LINE=2;static EMPTY_BEGIN_TEXT=4;static EMPTY_END_TEXT=8;static EMPTY_WORD_BOUNDARY=16;static EMPTY_NO_WORD_BOUNDARY=32;static EMPTY_ALL=-1;static emptyInts(){return[]}static isString(e){return typeof e=="string"||Object.prototype.toString.call(e)==="[object String]"}static typeName(e){return e===null||typeof e!="object"&&typeof e!="function"?e===null?"null":typeof e:Object.prototype.toString.call(e).slice(8,-1)}static checkPattern(e){if(!Ge.isString(e))throw new TypeError(`The pattern must be a string, not ${Ge.typeName(e)} (RE2JS.translateRegExp() converts a RegExp)`)}static checkInput(e){if(!Ge.isString(e)&&!Ge.isByteArray(e))throw new TypeError(`The input must be a string or a byte array (Uint8Array or number[]), not ${Ge.typeName(e)}`)}static checkFlags(e){let t=ze.MULTILINE|ze.DOTALL|ze.CASE_INSENSITIVE|ze.DISABLE_UNICODE_GROUPS|ze.LONGEST_MATCH|ze.LOOKBEHINDS;if(!Number.isInteger(e)||(e&~t)!==0)throw new Jg("Flags should only be a combination of MULTILINE, DOTALL, CASE_INSENSITIVE, DISABLE_UNICODE_GROUPS, LONGEST_MATCH, LOOKBEHINDS")}static isByteArray(e){return Array.isArray(e)||Object.prototype.toString.call(e)==="[object Uint8Array]"}static isalnum(e){return L.CODES[0]<=e&&e<=L.CODES[9]||L.CODES.a<=e&&e<=L.CODES.z||L.CODES.A<=e&&e<=L.CODES.Z}static unhex(e){return L.CODES[0]<=e&&e<=L.CODES[9]?e-L.CODES[0]:L.CODES.a<=e&&e<=L.CODES.f?e-L.CODES.a+10:L.CODES.A<=e&&e<=L.CODES.F?e-L.CODES.A+10:-1}static escapeRune(e){let t="";if(J.isPrint(e))Ge.METACHARACTERS.indexOf(String.fromCodePoint(e))>=0&&(t+="\\"),t+=String.fromCodePoint(e);else switch(e){case L.CODES['"']:t+='\\"';break;case L.CODES["\\"]:t+="\\\\";break;case L.CODES["	"]:t+="\\t";break;case L.CODES[`
`]:t+="\\n";break;case L.CODES["\r"]:t+="\\r";break;case L.CODES["\b"]:t+="\\b";break;case L.CODES["\f"]:t+="\\f";break;default:{let n=e.toString(16);e<256?(t+="\\x",n.length===1&&(t+="0"),t+=n):t+=`\\x{${n}}`;break}}return t}static stringToRunes(e){let t=String(e),n=[],s=0;for(;s<t.length;){let i=t.codePointAt(s);n.push(i),s+=i>J.MAX_BMP?2:1}return new Int32Array(n)}static runeToString(e){return String.fromCodePoint(e)}static isWordRune(e){return e<iB?zg[e]===1:!1}static emptyOpContext(e,t){let n=0;return e<0&&(n|=Ge.EMPTY_BEGIN_TEXT|Ge.EMPTY_BEGIN_LINE),e===10&&(n|=Ge.EMPTY_BEGIN_LINE),t<0&&(n|=Ge.EMPTY_END_TEXT|Ge.EMPTY_END_LINE),t===10&&(n|=Ge.EMPTY_END_LINE),Ge.isWordRune(e)!==Ge.isWordRune(t)?n|=Ge.EMPTY_WORD_BOUNDARY:n|=Ge.EMPTY_NO_WORD_BOUNDARY,n}static quoteMeta(e){return e.split("").map(t=>Ge.METACHARACTERS.indexOf(t)>=0?`\\${t}`:t).join("")}static charCount(e){return e>J.MAX_BMP?2:1}static toArray(e){let t=e.length,n=new Array(t);for(let s=0;s<t;s++)n[s]=e[s];return n}static stringToUtf8ByteArray(e){if(globalThis.TextEncoder)return Yl||(Yl=new TextEncoder),Yl.encode(e);{let t=[],n=0;for(let s=0;s<e.length;s++){let i=e.charCodeAt(s);i<128?t[n++]=i:i<2048?(t[n++]=i>>6|192,t[n++]=i&63|128):(i&64512)===J.MIN_HIGH_SURROGATE&&s+1<e.length&&(e.charCodeAt(s+1)&64512)===J.MIN_LOW_SURROGATE?(i=J.MIN_SUPPLEMENTARY_CODE_POINT+((i&1023)<<10)+(e.charCodeAt(++s)&1023),t[n++]=i>>18|240,t[n++]=i>>12&63|128,t[n++]=i>>6&63|128,t[n++]=i&63|128):(t[n++]=i>>12|224,t[n++]=i>>6&63|128,t[n++]=i&63|128)}return t}}static utf8ByteArrayToString(e){if(globalThis.TextDecoder){Xl||(Xl=new TextDecoder("utf-8"));let t=e instanceof Uint8Array?e:new Uint8Array(e);return Xl.decode(t)}else{let t=[],n=0,s=0;for(;n<e.length;){let i=e[n++];if(i<128)t[s++]=String.fromCharCode(i);else if(i>191&&i<224){let a=e[n++];t[s++]=String.fromCharCode((i&31)<<6|a&63)}else if(i>239&&i<365){let a=e[n++],u=e[n++],c=e[n++],l=((i&7)<<18|(a&63)<<12|(u&63)<<6|c&63)-J.MIN_SUPPLEMENTARY_CODE_POINT;t[s++]=String.fromCharCode(J.MIN_HIGH_SURROGATE+(l>>10)),t[s++]=String.fromCharCode(J.MIN_LOW_SURROGATE+(l&1023))}else{let a=e[n++],u=e[n++];t[s++]=String.fromCharCode((i&15)<<12|(a&63)<<6|u&63)}}return t.join("")}}},Wg=(r=[],e=0)=>{let t=Object.create(null);for(let n=0;n<r.length;n++){let s=r[n],i=e+n;t[s]=i,t[i]=s}return Object.freeze(t)},hr=class rB{static Encoding=Wg(["UTF_16","UTF_8"]);getEncoding(){throw Error("not implemented")}asCharSequence(){throw Error("not implemented")}asBytes(){throw Error("not implemented")}length(){throw Error("not implemented")}isUTF8Encoding(){return this.getEncoding()===rB.Encoding.UTF_8}isUTF16Encoding(){return this.getEncoding()===rB.Encoding.UTF_16}},pg=class extends hr{constructor(r=null){super(),this.bytes=r}getEncoding(){return hr.Encoding.UTF_8}asCharSequence(){return U.utf8ByteArrayToString(this.bytes)}asBytes(){return this.bytes}length(){return this.bytes.length}},FI=class extends hr{constructor(r=null){super(),this.charSequence=r}getEncoding(){return hr.Encoding.UTF_16}asCharSequence(){return this.charSequence}asBytes(){return U.stringToUtf8ByteArray(this.charSequence.toString())}length(){return this.charSequence.length}},Br=class{static utf16(r){return U.checkInput(r),new FI(r)}static utf8(r){return U.isByteArray(r)?new pg(r):new pg(U.stringToUtf8ByteArray(r))}},it=class{static EOF(){return-8}constructor(){this.start=0,this.end=0}canCheckPrefix(){return!0}endPos(){return this.end-this.start}hasString(){return!1}hasAnyString(){return!1}prefixLength(){return 0}},LI=class rs extends it{static RUNE_ERROR_STEP=J.RUNE_ERROR<<3|1;constructor(e,t=0,n=e.length){super(),this.bytes=e,this.start=t,this.end=n}hasString(e,t){let n=e.bytes;if(n.length===0)return!0;let s=this.indexOf(this.bytes,n,this.start+t);return s!==-1&&s<=this.end-n.length}hasAnyString(e,t){return e.automaton8().searchUTF8(this.bytes,this.start+t,this.end)}step(e){if(e+=this.start,e>=this.end)return it.EOF();let t=this.bytes[e]&255;if(t<128)return t<<3|1;let n,s,i=128,a=191;if(t>=194&&t<=223)n=2,s=t&31;else if(t>=224&&t<=239)n=3,s=t&15,t===224?i=160:t===237&&(a=159);else if(t>=240&&t<=244)n=4,s=t&7,t===240?i=144:t===244&&(a=143);else return rs.RUNE_ERROR_STEP;if(e+n>this.end)return rs.RUNE_ERROR_STEP;let u=this.bytes[e+1]&255;if(u<i||u>a)return rs.RUNE_ERROR_STEP;if(s=s<<6|u&63,n>2){let c=this.bytes[e+2]&255;if((c&192)!==128)return rs.RUNE_ERROR_STEP;if(s=s<<6|c&63,n>3){let l=this.bytes[e+3]&255;if((l&192)!==128)return rs.RUNE_ERROR_STEP;s=s<<6|l&63}}return s<<3|n}index(e,t){t+=this.start;let n=this.indexOf(this.bytes,e.prefixUTF8,t);return n<0?n:n-t}context(e){e+=this.start;let t=-1;if(e>this.start&&e<=this.end){let s=e-1;if(t=this.bytes[s--],t>=128){let i=e-4;for(i<this.start&&(i=this.start);s>=i&&(this.bytes[s]&192)===128;)s--;s<this.start&&(s=this.start);let a=this.step(s-this.start);t=s+(a&7)===e?a>>3:J.RUNE_ERROR}}let n=e<this.end?this.step(e-this.start)>>3:-1;return U.emptyOpContext(t,n)}indexOf(e,t,n=0){let s=t.length;if(s===0)return n<=this.end?n:-1;let i=t[0],a=this.end-s,u=typeof e.indexOf=="function",c=n;for(;c<=a;){if(u){if(c=e.indexOf(i,c),c===-1||c>a)return-1}else{for(;c<=a&&e[c]!==i;)c++;if(c>a)return-1}let l=!0;for(let h=1;h<s;h++)if(e[c+h]!==t[h]){l=!1;break}if(l)return c;c++}return-1}prefixLength(e){return e.prefixUTF8.length}},kI=class extends it{constructor(r,e=0,t=r.length){super(),this.charSequence=r,this.start=e,this.end=t}hasString(r,e){let t=this.charSequence.indexOf(r.str,this.start+e);return t!==-1&&t<=this.end-r.str.length}hasAnyString(r,e){return r.automaton16().searchUTF16(this.charSequence,this.start+e,this.end)}step(r){if(r+=this.start,r>=this.end)return it.EOF();let e=this.charSequence.charCodeAt(r);if(e<J.MIN_HIGH_SURROGATE||e>J.MAX_HIGH_SURROGATE||r+1>=this.end)return e<<3|1;let t=this.charSequence.charCodeAt(r+1);return t>=J.MIN_LOW_SURROGATE&&t<=J.MAX_LOW_SURROGATE?(e-J.MIN_HIGH_SURROGATE)*1024+(t-J.MIN_LOW_SURROGATE)+J.MIN_SUPPLEMENTARY_CODE_POINT<<3|2:e<<3|1}index(r,e){e+=this.start;let t=this.charSequence.indexOf(r.prefix,e);return t<0||t>this.end-r.prefix.length?-1:t-e}context(r){r+=this.start;let e=r>this.start&&r<=this.end?this.charSequence.charCodeAt(r-1):-1,t=r<this.end?this.charSequence.charCodeAt(r):-1;return U.emptyOpContext(e,t)}prefixLength(r){return r.prefix.length}},pe=class{static fromUTF8(r,e=0,t=r.length){return new LI(r,e,t)}static fromUTF16(r,e=0,t=void 0){return U.checkInput(r),new kI(r,e,t??r.length)}},Cg=class Qg{static MAX_REPLACER_ARGS=65535;static quoteReplacement(e,t=!1){return t?e.indexOf("\\")<0&&e.indexOf("$")<0?e:e.split("").map(n=>{let s=n.codePointAt(0);return s===L.CODES["\\"]||s===L.CODES.$?`\\${n}`:n}).join(""):e.indexOf("$")<0?e:e.split("").map(n=>n.codePointAt(0)===L.CODES.$?"$$":n).join("")}constructor(e,t){if(e===null)throw new Error("pattern is null");this.patternInput=e;let n=this.patternInput.re2();this.patternGroupCount=n.numberOfCapturingGroups(),this.groups=[],this.namedGroups=n.namedGroups,this.hasNamedGroups=Object.keys(this.namedGroups).length>0,this.numberOfInstructions=n.numberOfInstructions(),this.lookbehindState=null,t instanceof hr?this.resetMatcherInput(t):U.isByteArray(t)?this.resetMatcherInput(Br.utf8(t)):this.resetMatcherInput(Br.utf16(t))}pattern(){return this.patternInput}reset(){return this.matcherInputLength=this.matcherInput.length(),this.appendPos=0,this.hasMatch=!1,this.hasGroups=!1,this.anchorFlag=0,this}resetMatcherInput(e){if(e===null)throw new Error("input is null");return e instanceof hr||(U.isByteArray(e)?e=Br.utf8(e):e=Br.utf16(e)),this.matcherInput=e,this.lookbehindState!==null?this.lookbehindState.reset():this.lookbehindState=this.patternInput.re2().createLookbehindState(),this.reset(),this}start(e=0){if(typeof e=="string"){let t=this.namedGroups[e];if(!Number.isFinite(t))throw new ut(`group '${e}' not found`);e=t}return this.loadGroup(e),this.groups[2*e]}end(e=0){if(typeof e=="string"){let t=this.namedGroups[e];if(!Number.isFinite(t))throw new ut(`group '${e}' not found`);e=t}return this.loadGroup(e),this.groups[2*e+1]}programSize(){return this.numberOfInstructions}group(e=0){if(typeof e=="string"){let s=this.namedGroups[e];if(!Number.isFinite(s))throw new ut(`group '${e}' not found`);e=s}let t=this.start(e),n=this.end(e);return t<0&&n<0?null:this.substring(t,n)}getNamedGroups(){if(!this.hasMatch)throw new ut("perhaps no match attempted");let e=Object.create(null);for(let t of Object.keys(this.namedGroups))e[t]=this.group(t);return e}groupCount(){return this.patternGroupCount}loadGroup(e){if(!Number.isInteger(e)||e<0||e>this.patternGroupCount)throw new ut(`Group index out of bounds: ${e}`);if(!this.hasMatch)throw new ut("perhaps no match attempted");if(e===0||this.hasGroups)return;let t=this.matcherInputLength,n=this.patternInput.re2().matchMachineInput(this.matcherInput,this.groups[0],t,this.anchorFlag,1+this.patternGroupCount,this.lookbehindState);if(!n[0])throw new ut("inconsistency in matching group data");this.groups=n[1],this.hasGroups=!0}matches(){return this.genMatch(0,F.ANCHOR_BOTH)}lookingAt(){return this.genMatch(0,F.ANCHOR_START)}find(e=null){if(e!==null){if(!Number.isInteger(e)||e<0||e>this.matcherInputLength)throw new ut(`start index out of bounds: ${e}`);return this.reset(),this.genMatch(e,0)}if(e=0,this.hasMatch&&(e=this.groups[1],this.groups[0]===this.groups[1])){let t=(this.matcherInput.isUTF16Encoding()?pe.fromUTF16(this.matcherInput.asCharSequence(),0,this.matcherInputLength):pe.fromUTF8(this.matcherInput.asBytes(),0,this.matcherInputLength)).step(e);t<0?e++:e+=t&7}return this.genMatch(e,F.UNANCHORED)}genMatch(e,t){let n=this.patternInput.re2().matchMachineInput(this.matcherInput,e,this.matcherInputLength,t,1,this.lookbehindState);return n[0]?(this.groups=n[1],this.hasMatch=!0,this.hasGroups=this.patternGroupCount===0,this.anchorFlag=t,!0):(this.hasMatch=!1,!1)}substring(e,t){return this.matcherInput.isUTF8Encoding()?U.utf8ByteArrayToString(this.matcherInput.asBytes().slice(e,t)):this.matcherInput.asCharSequence().substring(e,t).toString()}inputLength(){return this.matcherInputLength}appendReplacement(e,t=!1){let n="",s=this.start(),i=this.end();return this.appendPos<s&&(n+=this.substring(this.appendPos,s)),this.appendPos=i,n+=t?this.appendReplacementInternalJava(e):this.appendReplacementInternalJs(e),n}appendReplacementInternalJava(e){let t="",n=0,s=e.length,i=0;for(;i<s;){let a=e.codePointAt(i);if(a===L.CODES["\\"]){if(n<i&&(t+=e.substring(n,i)),i++,i>=s)throw new ut("character to be escaped is missing");n=i,i++;continue}if(a===L.CODES.$){if(n<i&&(t+=e.substring(n,i)),i+1>=s)throw new ut("Illegal group reference: group index is missing");let u=e.codePointAt(i+1);if(L.CODES[0]<=u&&u<=L.CODES[9]){let c=u-L.CODES[0],l=i+2;for(;l<s;l++){let d=e.codePointAt(l);if(d<L.CODES[0]||d>L.CODES[9]||c*10+d-L.CODES[0]>this.patternGroupCount)break;c=c*10+d-L.CODES[0]}if(c>this.patternGroupCount)throw new ut(`n > number of groups: ${c}`);let h=this.group(c);h!==null&&(t+=h),i=l,n=i}else if(u===L.CODES["{"]){let c=i+2;for(;c<s&&e.codePointAt(c)!==L.CODES["}"];)c++;if(c>=s)throw new ut("named capture group is missing trailing '}'");let l=e.substring(i+2,c),h=this.group(l);h!==null&&(t+=h),i=c+1,n=i}else throw new ut("Illegal group reference");continue}i++}return n<s&&(t+=e.substring(n,s)),t}appendReplacementInternalJs(e){let t=a=>a>=48&&a<=57,n=this.patternGroupCount,s="",i=0;for(;i<e.length;){let a=e.indexOf("$",i);if(a<0)break;s+=e.substring(i,a),i=a;let u=e.charCodeAt(i+1);if(u===L.CODES.$)s+="$",i+=2;else if(u===L.CODES["&"])s+=this.group(0),i+=2;else if(u===L.CODES["`"])s+=this.substring(0,this.start(0)),i+=2;else if(u===L.CODES["'"])s+=this.substring(this.end(0),this.matcherInputLength),i+=2;else if(t(u)){let c=1,l=u-48,h=e.charCodeAt(i+2);if(t(h)&&l*10+h-48<=n&&(c=2,l=l*10+h-48),l>=1&&l<=n){let d=this.group(l);d!==null&&(s+=d)}else s+=e.substring(i,i+1+c);i+=1+c}else if(u===L.CODES["<"]&&this.hasNamedGroups){let c=e.indexOf(">",i+2);if(c<0)s+="$<",i+=2;else{let l=e.substring(i+2,c);if(Object.hasOwn(this.namedGroups,l)){let h=this.group(l);h!==null&&(s+=h)}i=c+1}}else s+="$",i+=1}return s+e.substring(i)}appendTail(){return this.substring(this.appendPos,this.matcherInputLength)}replaceAll(e,t=!1){return this.replace(e,!0,t)}replaceFirst(e,t=!1){return this.replace(e,!1,t)}replace(e,t=!0,n=!1){let s="";this.reset();let i=typeof e=="function",a=null;if(i){if(this.groupCount()>=Qg.MAX_REPLACER_ARGS)throw new ut("Too many capture groups to safely invoke replacer function");a=this.matcherInput.isUTF8Encoding()?this.matcherInput.asBytes():this.matcherInput.asCharSequence()}for(;this.find()&&(s+=i?this.appendReplacementFunc(e,a):this.appendReplacement(e,n),!!t););return s+=this.appendTail(),s}appendReplacementFunc(e,t){let n="",s=this.start(),i=this.end();this.appendPos<s&&(n+=this.substring(this.appendPos,s)),this.appendPos=i;let a=this.matchArray();return a.push(s,t),this.hasNamedGroups&&a.push(this.namedGroupsObject()),n+=String(e(...a)),n}matchArray(){let e=[this.group(0)];for(let t=1;t<=this.patternGroupCount;t++){let n=this.group(t);e.push(n===null?void 0:n)}return e}namedGroupsObject(){if(!this.hasNamedGroups)return;let e=this.getNamedGroups();for(let t in e)e[t]===null&&(e[t]=void 0);return e}},O=class Ue{static ALT=1;static ALT_MATCH=2;static CAPTURE=3;static EMPTY_WIDTH=4;static FAIL=5;static MATCH=6;static NOP=7;static RUNE=8;static RUNE1=9;static RUNE_ANY=10;static RUNE_ANY_NOT_NL=11;static LB_WRITE=12;static LB_CHECK=13;static isRuneOp(e){return Ue.RUNE<=e&&e<=Ue.RUNE_ANY_NOT_NL}static escapeRunes(e){let t='"';for(let n of e)t+=U.escapeRune(n);return t+='"',t}constructor(e){this.op=e,this.out=0,this.arg=0,this.runes=new Int32Array(0),this.next=null}matchRune(e){if(this.runes.length===1){let a=this.runes[0];return(this.arg&F.FOLD_CASE)!==0?J.equalsIgnoreCase(a,e):e===a}let t=this.runes.length;if(t===0)return!1;if(t===2||t===4||t===6||t===8){for(let a=0;a<t;a+=2){if(e<this.runes[a])return!1;if(e<=this.runes[a+1])return!0}return!1}let n=0,s=t>>1;for(;s>1;){let a=s>>1;n+=this.runes[n+a<<1]<=e?a:0,s-=a}n+=this.runes[n<<1]<=e?1:0;let i=n-1;return i>=0&&e<=this.runes[i<<1|1]}matchRunePos(e){if(this.runes.length===1){let a=this.runes[0];return(this.arg&F.FOLD_CASE)!==0?J.equalsIgnoreCase(a,e)?0:-1:e===a?0:-1}let t=this.runes.length;if(t===0)return-1;if(t===2||t===4||t===6||t===8){for(let a=0;a<t;a+=2){if(e<this.runes[a])return-1;if(e<=this.runes[a+1])return Math.floor(a/2)}return-1}let n=0,s=t>>1;for(;s>1;){let a=s>>1;n+=this.runes[n+a<<1]<=e?a:0,s-=a}n+=this.runes[n<<1]<=e?1:0;let i=n-1;return i>=0&&e<=this.runes[i<<1|1]?i:-1}toString(){switch(this.op){case Ue.ALT:return`alt -> ${this.out}, ${this.arg}`;case Ue.ALT_MATCH:return`altmatch -> ${this.out}, ${this.arg}`;case Ue.CAPTURE:return`cap ${this.arg} -> ${this.out}`;case Ue.EMPTY_WIDTH:return`empty ${this.arg} -> ${this.out}`;case Ue.MATCH:return`match${this.arg!==0?` ${this.arg}`:""}`;case Ue.FAIL:return"fail";case Ue.NOP:return`nop -> ${this.out}`;case Ue.LB_WRITE:return`lbwrite ${this.arg} -> ${this.out}`;case Ue.LB_CHECK:return`lbcheck ${this.arg} -> ${this.out}`;case Ue.RUNE:return this.runes===null?"rune <null>":["rune ",Ue.escapeRunes(this.runes),(this.arg&F.FOLD_CASE)!==0?"/i":""," -> ",this.out].join("");case Ue.RUNE1:return`rune1 ${Ue.escapeRunes(this.runes)} -> ${this.out}`;case Ue.RUNE_ANY:return`any -> ${this.out}`;case Ue.RUNE_ANY_NOT_NL:return`anynotnl -> ${this.out}`;default:throw new Error("unhandled case in Inst.toString")}}},gg=class $g{constructor(e){this.sparse=new Int32Array(e),this.densePcs=new Int32Array(e),this.denseCaps=null,this.size=0,this.ncap=0,this.mainThreads=0}static INITIAL_THREADS=32;init(e){this.ncap=e;let t=Math.min(this.densePcs.length,$g.INITIAL_THREADS)*e;(!this.denseCaps||this.denseCaps.length<t)&&(this.denseCaps=new Int32Array(t))}growCaps(e){let t=this.densePcs.length*this.ncap,n=new Int32Array(Math.min(t,Math.max(e,2*this.denseCaps.length)));n.set(this.denseCaps),this.denseCaps=n}contains(e){let t=this.sparse[e];return t<this.size&&this.densePcs[t]===e}isEmpty(){return this.size===0}add(e){let t=this.size++;return this.sparse[e]=t,this.densePcs[t]=e,t}clear(){this.size=0,this.mainThreads=0}toString(){let e="{";for(let t=0;t<this.size;t++)t!==0&&(e+=", "),e+=this.densePcs[t];return e+="}",e}},VI=class{constructor(r){this.pos=-1,this.pcs=new Int32Array(r.numInst()),this.size=0,this.lbTable=new Int32Array(r.numLb+1)}reset(){this.pos=-1,this.size=0}},Yg=class Xg{static fromRE2(e){let t=new Xg;return t.prog=e.prog,t.re2=e,t.q0=new gg(t.prog.numInst()),t.q1=new gg(t.prog.numInst()),t.addStack=new Int32Array(2*(t.prog.numInst()+1)),t.matched=!1,t.matchcap=new Int32Array(t.prog.numCap<2?2:t.prog.numCap),t.ncap=0,t}constructor(){this.prog=null,this.re2=null,this.q0=null,this.q1=null,this.addStack=null,this.matched=!1,this.matchcap=null,this.ncap=0,this.lbTable=null}init(e){this.ncap=e,e>this.matchcap.length?this.matchcap=new Int32Array(e).fill(-1):this.matchcap.fill(-1),this.q0.init(e),this.q1.init(e),this.prog.numLb>0&&((!this.lbTable||this.lbTable.length<this.prog.numLb+1)&&(this.lbTable=new Int32Array(this.prog.numLb+1)),this.lbTable.fill(-1))}submatches(){return this.ncap===0?U.emptyInts():U.toArray(this.matchcap.subarray(0,this.ncap))}match(e,t,n,s=null){let i=this.re2.cond;if(i===U.EMPTY_ALL||(n===F.ANCHOR_START||n===F.ANCHOR_BOTH)&&t!==0)return!1;this.matched=!1,this.matchcap.fill(-1);let a=this.prog.numLb>0,u=t,c=t,l=!1;a&&(s!==null&&s.pos>=0&&s.pos<=t?(c=s.pos,l=!0):c=0);let h=a&&s!==null,d=this.q0,C=this.q1,y=e.step(c),D=y>>3,P=y&7,V=-1,q=0;y!==it.EOF()&&(y=e.step(c+P),V=y>>3,q=y&7);let W;for(c===0?W=U.emptyOpContext(-1,D):W=e.context(c),a&&(l?this.restoreLookbehinds(s,d,W):this.spawnLookbehinds(d,c,W));;){if(d.mainThreads===0){if((i&U.EMPTY_BEGIN_TEXT)!==0&&c!==0||(n===F.ANCHOR_START||n===F.ANCHOR_BOTH)&&c!==0||this.matched)break;if(this.prog.numLb===0&&d.isEmpty()&&this.re2.prefix.length!==0&&V!==this.re2.prefixRune&&e.canCheckPrefix()){let Qe=e.index(this.re2,c);if(Qe<0)break;c+=Qe,y=e.step(c),D=y>>3,P=y&7,y=e.step(c+P),V=y>>3,q=y&7,W=e.context(c)}}c>=u&&(h&&(this.saveLookbehinds(s,d,c),h=!1),!this.matched&&(c===0||n===F.UNANCHORED)&&(this.ncap>0&&(this.matchcap[0]=c),this.add(d,this.prog.start,c,this.matchcap,0,W)));let ce=c+P;if(W=e.context(ce),this.step(d,C,c,ce,D,W,n,c===e.endPos()),P===0||this.ncap===0&&this.matched)break;c+=P,D=V,P=q,D!==-1&&(y=e.step(c+P),V=y>>3,q=y&7);let De=d;d=C,C=De}return d.clear(),C.clear(),this.matched}matchSet(e,t,n){let s=this.re2.cond;if(s===U.EMPTY_ALL)return[];if((n===F.ANCHOR_START||n===F.ANCHOR_BOTH)&&t!==0)return[];let i=this.prog.numLb>0?0:t,a=t,u=this.q0,c=this.q1,l=e.step(i),h=l>>3,d=l&7,C=-1,y=0;l!==it.EOF()&&(l=e.step(i+d),C=l>>3,y=l&7);let D=i===0?U.emptyOpContext(-1,h):e.context(i),P=new Set;for(this.prog.numLb>0&&this.spawnLookbehinds(u,i,D);!(u.mainThreads===0&&((s&U.EMPTY_BEGIN_TEXT)!==0&&i!==0||(n===F.ANCHOR_START||n===F.ANCHOR_BOTH)&&i!==0));){(i===0||n===F.UNANCHORED)&&i>=a&&this.add(u,this.prog.start,i,this.matchcap,0,D);let V=i+d;D=e.context(V);for(let W=0;W<u.size;W++){let ce=u.densePcs[W],De=this.prog.inst[ce],Qe=W*this.ncap,_e=!1;switch(De.op){case O.MATCH:if(n===F.ANCHOR_BOTH&&i!==e.endPos())break;P.add(De.arg);break;case O.RUNE:_e=De.matchRune(h);break;case O.RUNE1:_e=h===De.runes[0];break;case O.RUNE_ANY:_e=!0;break;case O.RUNE_ANY_NOT_NL:_e=h!==10;break;default:continue}_e&&this.add(c,De.out,V,u.denseCaps,Qe,D)}if(u.clear(),d===0)break;i+=d,h=C,d=y,h!==-1&&(l=e.step(i+d),C=l>>3,y=l&7);let q=u;u=c,c=q}return c.clear(),Array.from(P).sort((V,q)=>V-q)}step(e,t,n,s,i,a,u,c){let l=this.re2.longest;for(let h=0;h<e.size;h++){let d=e.densePcs[h],C=h*this.ncap;if(l&&this.matched&&this.ncap>0&&this.matchcap[0]<e.denseCaps[C])continue;let y=this.prog.inst[d],D=!1;switch(y.op){case O.MATCH:if(u===F.ANCHOR_BOTH&&!c)break;if(this.ncap>0&&(!l||!this.matched||this.matchcap[1]<n)){e.denseCaps[C+1]=n;for(let P=0;P<this.ncap;P++)this.matchcap[P]=e.denseCaps[C+P]}l||(e.size=0),this.matched=!0;break;case O.RUNE:D=y.matchRune(i);break;case O.RUNE1:D=i===y.runes[0];break;case O.RUNE_ANY:D=!0;break;case O.RUNE_ANY_NOT_NL:D=i!==10;break;default:continue}D&&this.add(t,y.out,s,e.denseCaps,C,a)}e.clear()}spawnLookbehinds(e,t,n){for(let s=0;s<this.prog.lbStarts.length;s++)this.add(e,this.prog.lbStarts[s],t,this.matchcap,0,n)}restoreLookbehinds(e,t,n){this.lbTable.set(e.lbTable);for(let s=0;s<e.size;s++)this.add(t,e.pcs[s],e.pos,this.matchcap,0,n)}saveLookbehinds(e,t,n){let s=0;for(let i=0;i<t.size;i++){let a=t.densePcs[i];this.prog.lbInst[a]===1&&O.isRuneOp(this.prog.inst[a].op)&&(e.pcs[s++]=a)}e.size=s,e.pos=n,e.lbTable.set(this.lbTable)}add(e,t,n,s,i,a){let u=this.addStack,c=0;for(;;){for(;t!==0&&!e.contains(t);){let h=e.add(t),d=this.prog.inst[t];switch(d.op){case O.FAIL:t=0;break;case O.ALT:case O.ALT_MATCH:u[c++]=d.arg,u[c++]=0,t=d.out;break;case O.EMPTY_WIDTH:t=(d.arg&~a)===0?d.out:0;break;case O.NOP:t=d.out;break;case O.CAPTURE:d.arg<this.ncap&&(u[c++]=-d.arg-1,u[c++]=s[i+d.arg],s[i+d.arg]=n),t=d.out;break;case O.LB_WRITE:this.lbTable[Math.abs(d.arg)]=n,t=d.out;break;case O.LB_CHECK:d.arg>0?t=this.lbTable[d.arg]===n?d.out:0:t=this.lbTable[-d.arg]!==n?d.out:0;break;case O.MATCH:case O.RUNE:case O.RUNE1:case O.RUNE_ANY:case O.RUNE_ANY_NOT_NL:if(this.prog.lbInst[t]===0&&e.mainThreads++,this.ncap>0){let C=h*this.ncap;C+this.ncap>e.denseCaps.length&&e.growCaps(C+this.ncap);for(let y=0;y<this.ncap;y++)e.denseCaps[C+y]=s[i+y]}t=0;break;default:throw new Zo("unhandled")}}if(c===0)return;c-=2;let l=u[c];l<0?(s[i-l-1]=u[c+1],t=0):t=l}}},MI=(r,e,t)=>{let n=-2128831035;for(let s=0;s<r.length;s++)n^=r[s],n=Math.imul(n,16777619);n^=e,n=Math.imul(n,16777619);for(let s=0;s<t.length;s++)n^=t[s],n=Math.imul(n,16777619);return n},mg=(r,e)=>{if(r.length!==e.length)return!1;for(let t=0;t<r.length;t++)if(r[t]!==e[t])return!1;return!0},Eg=(r,e,t,n)=>r.flag===t&&mg(r.nfaStates,e)&&mg(r.matchIDs,n),Zl=[],ki=-1,Wo=class{constructor(r,e,t){this.nfaStates=r,this.flag=e,this.isMatch=(e&aB.FLAG_MATCH)!==0,this.matchIDs=t,this.next=null,this.nextAnchored=null}},aB=class He{static FLAG_EMPTY_MASK=255;static FLAG_MATCH=256;static FLAG_LAST_WORD=512;static FLAG_NEED_SHIFT=16;static STATE_OVERHEAD=150;static ARRAY_OVERHEAD=40;static ELEMENT_SIZE=8;static TABLE_OVERHEAD=48;static PROGRESS_PER_STATE=10;constructor(e,t=8388608){this.prog=e,this.maxMem=t,this.stateCache=new Map,this.stateCount=0,this.startStates=new Map,this.failed=!1;for(let n=0;n<e.numInst();n++){let s=e.getInst(n).op;if(s===O.LB_WRITE||s===O.LB_CHECK){this.failed=!0;break}}this.computeRuneClasses(),this.stateBudget=t,this.memBudget=t}computeRuneClasses(){let e=new Set,t=(s,i)=>{e.add(s),e.add(i+1)};for(let s=0;s<this.prog.numInst();s++){let i=this.prog.getInst(s);switch(i.op){case O.RUNE:case O.RUNE1:if(i.runes.length===1){if(t(i.runes[0],i.runes[0]),(i.arg&F.FOLD_CASE)!==0)for(let a=J.simpleFold(i.runes[0]);a!==i.runes[0];a=J.simpleFold(a))t(a,a)}else for(let a=0;a<i.runes.length;a+=2)t(i.runes[a],i.runes[a+1]);break;case O.RUNE_ANY_NOT_NL:t(10,10);break;case O.EMPTY_WIDTH:(i.arg&(U.EMPTY_BEGIN_LINE|U.EMPTY_END_LINE))!==0&&t(10,10),(i.arg&(U.EMPTY_WORD_BOUNDARY|U.EMPTY_NO_WORD_BOUNDARY))!==0&&(t(48,57),t(65,90),t(95,95),t(97,122))}}e.delete(0),this.classBounds=Int32Array.from(e).sort(),this.numClasses=this.classBounds.length+1;let n=new Int32Array(J.MAX_LATIN1+1);for(let s=0;s<=J.MAX_LATIN1;s++)n[s]=this.searchClass(s);this.latin1Class=n}runeClass(e){return e<=J.MAX_LATIN1?this.latin1Class[e]:this.searchClass(e)}searchClass(e){let t=this.classBounds,n=0,s=t.length;for(;n<s;){let i=n+s>>1;t[i]<=e?n=i+1:s=i}return n}closure(e,t){let n=new Set,s=Array.from(e),i=0;for(;s.length>0;){let a=s.pop();if(a===0||n.has(a))continue;n.add(a);let u=this.prog.getInst(a);switch(u.op){case O.ALT:case O.ALT_MATCH:s.push(u.out),s.push(u.arg);break;case O.NOP:case O.CAPTURE:s.push(u.out);break;case O.EMPTY_WIDTH:i|=u.arg,(u.arg&~t)===0&&s.push(u.out)}}return{pcs:Array.from(n).sort((a,u)=>a-u),needflags:i}}getState(e,t,n){let s=MI(e,t,n),i=this.stateCache.get(s);if(i instanceof Wo){if(Eg(i,e,t,n))return i}else if(i!==void 0){for(let c=0;c<i.length;c++)if(Eg(i[c],e,t,n))return i[c]}let a=He.stateCost(e,n);if(this.memBudget<a)return null;this.memBudget-=a;let u=new Wo(e,t,n);return i===void 0?this.stateCache.set(s,u):i instanceof Wo?this.stateCache.set(s,[i,u]):i.push(u),this.stateCount++,u}static stateCost(e,t){let n=t.length===0?0:He.ARRAY_OVERHEAD+He.ELEMENT_SIZE*t.length;return He.STATE_OVERHEAD+He.ELEMENT_SIZE*e.length+n}*cachedStates(){for(let e of this.stateCache.values())e instanceof Wo?yield e:yield*e}makeState(e,t,n){let s=this.closure(e,t&He.FLAG_EMPTY_MASK),i=t;return s.needflags===0&&(i&=He.FLAG_MATCH),i|=s.needflags<<He.FLAG_NEED_SHIFT,this.getState(s.pcs,i,n)}allocTable(e,t){let n=this.numClasses+1,s=He.TABLE_OVERHEAD+He.ELEMENT_SIZE*n;if(this.memBudget<s)return null;this.memBudget-=s;let i=new Array(n).fill(null);return t===F.UNANCHORED?e.next=i:e.nextAnchored=i,i}clearCache(){this.stateCache.clear(),this.stateCount=0,this.startStates.clear(),this.memBudget=this.stateBudget}resetCache(e){return this.clearCache(),this.getState(e.nfaStates,e.flag,e.matchIDs)}step(e,t,n,s){let i=s===F.UNANCHORED?e.next:e.nextAnchored;if(i!==null){let W=i[t];if(W!==null)return W}else if(i=this.allocTable(e,s),i===null)return null;let a=e.flag>>>He.FLAG_NEED_SHIFT,u=e.flag&He.FLAG_EMPTY_MASK,c=u,l=0;n===10&&(c|=U.EMPTY_END_LINE,l|=U.EMPTY_BEGIN_LINE),n===ki&&(c|=U.EMPTY_END_LINE|U.EMPTY_END_TEXT);let h=(e.flag&He.FLAG_LAST_WORD)!==0,d=n!==ki&&U.isWordRune(n);c|=d===h?U.EMPTY_NO_WORD_BOUNDARY:U.EMPTY_WORD_BOUNDARY;let C=e.nfaStates;(c&~u&a)!==0&&(C=this.closure(C,c).pcs);let y=[],D=!1,P=Zl;for(let W=0;W<C.length;W++){let ce=this.prog.getInst(C[W]);ce.op===O.MATCH?(D||(D=!0,P=[]),P.push(ce.arg)):n!==ki&&O.isRuneOp(ce.op)&&ce.matchRune(n)&&y.push(ce.out)}P.length>1&&P.sort((W,ce)=>W-ce),s===F.UNANCHORED&&n!==ki&&y.push(this.prog.start);let V=l;D&&(V|=He.FLAG_MATCH),d&&(V|=He.FLAG_LAST_WORD);let q=this.makeState(y,V,P);return q===null?null:(i[t]=q,q)}start(e,t){let n=e.context(t),s;if((n&U.EMPTY_BEGIN_TEXT)!==0)s=U.EMPTY_BEGIN_TEXT|U.EMPTY_BEGIN_LINE;else if((n&U.EMPTY_BEGIN_LINE)!==0)s=U.EMPTY_BEGIN_LINE;else{let a=e.step(t),u=a>=0&&U.isWordRune(a>>3);s=(n&U.EMPTY_WORD_BOUNDARY)!==0!==u?He.FLAG_LAST_WORD:0}let i=this.startStates.get(s);if(i===void 0){if(i=this.makeState([this.prog.start],s,Zl),i===null&&(this.clearCache(),i=this.makeState([this.prog.start],s,Zl),i===null))return null;this.startStates.set(s,i)}return i}stepOrReset(e,t,n,s,i,a){let u=this.step(e,t,n,s);if(u!==null)return u;if(a.resetPos>=0&&i-a.resetPos<He.PROGRESS_PER_STATE*this.stateCount)return null;a.resetPos=i;let c=this.resetCache(e);return c===null?null:(u=this.step(c,t,n,s),u)}run(e,t,n,s,i){let a=e.endPos(),u=this.latin1Class,c=n===F.UNANCHORED,l={resetPos:-1},h=t;for(;h<a;){let d=e.step(h),C=d>>3,y=d&7;if(y===0)break;let D=C<=J.MAX_LATIN1?u[C]:this.runeClass(C),P=c&&s.next!==null?s.next[D]:null;if(P===null&&(P=this.stepOrReset(s,D,C,n,h,l),P===null))return null;if(s=P,s.isMatch&&i(s,!1))return!0;if(!c&&s.nfaStates.length===0)return!1;h+=y}return s=this.stepOrReset(s,this.numClasses,ki,n,h,l),s===null?null:s.isMatch&&i(s,!0)}match(e,t,n){if(this.failed)return null;if((n===F.ANCHOR_START||n===F.ANCHOR_BOTH)&&t!==0)return!1;let s=this.start(e,t);return s===null?null:this.run(e,t,n,s,(i,a)=>n!==F.ANCHOR_BOTH||a)}matchSet(e,t,n){if(this.failed)return null;if((n===F.ANCHOR_START||n===F.ANCHOR_BOTH)&&t!==0)return[];let s=this.start(e,t);if(s===null)return null;let i=new Set,a=(u,c)=>{if(n!==F.ANCHOR_BOTH||c)for(let l=0;l<u.matchIDs.length;l++)i.add(u.matchIDs[l]);return!1};return this.run(e,t,n,s,a)===null?null:Array.from(i).sort((u,c)=>u-c)}},GI=32,UI=500,eB=256,HI=262144,qI=class{constructor(){this.end=0,this.cap=new Int32Array(0),this.matchcap=new Int32Array(0),this.ncap=0,this.jobPc=new Int32Array(eB),this.jobArg=new Uint8Array(eB),this.jobPos=new Int32Array(eB),this.jobLen=0,this.visited=new Uint32Array(0)}reset(r,e,t){this.end=e,this.jobLen=0,this.ncap=t;let n=r.numInst()*(e+1)+GI-1>>>5;this.visited.length<n?this.visited=new Uint32Array(n):this.visited.fill(0,0,n),this.cap.length<t?this.cap=new Int32Array(t).fill(-1):this.cap.fill(-1,0,t),this.matchcap.length<t?this.matchcap=new Int32Array(t).fill(-1):this.matchcap.fill(-1,0,t)}shouldVisit(r,e){let t=r*(this.end+1)+e,n=t>>>5,s=1<<(t&31);return(this.visited[n]&s)!==0?!1:(this.visited[n]|=s,!0)}push(r,e,t,n){if(r.prog.getInst(e).op!==O.FAIL&&(n||this.shouldVisit(e,t))){if(this.jobLen>=this.jobPc.length){let s=this.jobPc.length*2,i=new Int32Array(s);i.set(this.jobPc),this.jobPc=i;let a=new Uint8Array(s);a.set(this.jobArg),this.jobArg=a;let u=new Int32Array(s);u.set(this.jobPos),this.jobPos=u}this.jobPc[this.jobLen]=e,this.jobArg[this.jobLen]=n?1:0,this.jobPos[this.jobLen]=t,this.jobLen++}}tryBacktrack(r,e,t,n,s){let i=r.longest;for(this.push(r,t,n,!1);this.jobLen>0;){this.jobLen--;let a=this.jobPc[this.jobLen],u=this.jobArg[this.jobLen]===1,c=this.jobPos[this.jobLen],l=!0;for(;!(!l&&!this.shouldVisit(a,c));){l=!1;let h=r.prog.getInst(a);switch(h.op){case O.FAIL:break;case O.ALT:if(u){u=!1,a=h.arg;continue}else{this.push(r,a,c,!0),a=h.out;continue}case O.ALT_MATCH:{let d=r.prog.getInst(h.out);if(O.isRuneOp(d.op)){this.push(r,h.arg,c,!1),a=h.arg,c=this.end;continue}this.push(r,h.out,this.end,!1),a=h.out;continue}case O.RUNE:{let d=e.step(c);if(d===it.EOF()||!h.matchRune(d>>3))break;c+=d&7,a=h.out;continue}case O.RUNE1:{let d=e.step(c);if(d===it.EOF()||d>>3!==h.runes[0])break;c+=d&7,a=h.out;continue}case O.RUNE_ANY_NOT_NL:{let d=e.step(c);if(d===it.EOF()||d>>3===10)break;c+=d&7,a=h.out;continue}case O.RUNE_ANY:{let d=e.step(c);if(d===it.EOF())break;c+=d&7,a=h.out;continue}case O.CAPTURE:if(u){this.cap[h.arg]=c;break}else{h.arg<this.ncap&&(this.push(r,a,this.cap[h.arg],!0),this.cap[h.arg]=c),a=h.out;continue}case O.EMPTY_WIDTH:{let d=e.context(c);if((h.arg&~d)!==0)break;a=h.out;continue}case O.NOP:a=h.out;continue;case O.MATCH:{if(s===F.ANCHOR_BOTH&&c!==this.end)break;if(this.ncap===0)return!0;this.ncap>1&&(this.cap[1]=c);let d=this.matchcap[1];if((d===-1||i&&c>0&&c>d)&&this.matchcap.set(this.cap),!i||c===this.end)return!0;break}case O.LB_WRITE:case O.LB_CHECK:throw new Zo("Backtracker cannot evaluate Lookbehind instructions");default:throw new Zo("bad inst")}break}}return i&&this.matchcap.length>1&&this.matchcap[1]>=0}},Qo=[],$o=class Zg{static shouldBacktrack(e){return e.numInst()<=UI}static maxBitStateLen(e){return Zg.shouldBacktrack(e)?Math.floor(HI/e.numInst()):0}static execute(e,t,n,s,i){let a=e.cond;if(a===U.EMPTY_ALL||(s===F.ANCHOR_START||s===F.ANCHOR_BOTH)&&n!==0||(a&U.EMPTY_BEGIN_TEXT)!==0&&n!==0)return null;let u=Qo.length>0?Qo.pop():new qI,c=t.endPos();u.reset(e.prog,c,i);let l=!1;if((a&U.EMPTY_BEGIN_TEXT)!==0||s===F.ANCHOR_START||s===F.ANCHOR_BOTH)u.ncap>0&&(u.cap[0]=n),u.tryBacktrack(e,t,e.prog.start,n,s)&&(l=!0);else{let d=-1;for(;n<=c&&d!==0;n+=d){if(e.prefix.length>0){let y=t.index(e,n);if(y<0)break;n+=y}if(u.ncap>0&&(u.cap[0]=n),u.tryBacktrack(e,t,e.prog.start,n,s)){l=!0;break}let C=t.step(n);d=C===it.EOF()?0:C&7}}if(!l)return Qo.push(u),null;let h=i===0?[]:U.toArray(u.matchcap.subarray(0,i));return Qo.push(u),h}},_g=class{constructor(r){this.sparse=new Uint32Array(r),this.dense=new Uint32Array(r),this.size=0,this.nextIndex=0}empty(){return this.nextIndex>=this.size}next(){return this.dense[this.nextIndex++]}clear(){this.size=0,this.nextIndex=0}contains(r){return r<this.sparse.length&&this.sparse[r]<this.size&&this.dense[this.sparse[r]]===r}insert(r){this.contains(r)||this.insertNew(r)}insertNew(r){r>=this.sparse.length||(this.sparse[r]=this.size,this.dense[this.size]=r,this.size++)}},jI=(r,e,t,n)=>{let s=r.length,i=e.length,a=0,u=0,c=[],l=[],h=!0,d=-1,C=y=>{let D=y?r:e,P=y?a:u,V=y?t:n;return d>0&&D[P]<=c[d]?!1:(c.push(D[P],D[P+1]),y?a+=2:u+=2,d+=2,l.push(V),!0)};for(;a<s||u<i;)if(u>=i?h=C(!0):a>=s||e[u]<r[a]?h=C(!1):h=C(!0),!h)return null;return{merged:c,next:l}},KI=class{constructor(r){this.start=r.start,this.numCap=r.numCap,this.inst=new Array(r.inst.length);for(let e=0;e<r.inst.length;e++){let t=r.inst[e],n=new O(t.op);n.out=t.out,n.arg=t.arg,n.runes=t.runes?new Int32Array(t.runes):new Int32Array(0),n.next=null,this.inst[e]=n}}},JI=r=>{let e=new KI(r);for(let t=0;t<e.inst.length;t++){let n=e.inst[t];if(n.op!==O.ALT&&n.op!==O.ALT_MATCH)continue;let s="out",i="arg",a=e.inst[n[i]];if(a.op!==O.ALT&&a.op!==O.ALT_MATCH&&(s="arg",i="out",a=e.inst[n[i]],a.op!==O.ALT&&a.op!==O.ALT_MATCH))continue;let u=e.inst[n[s]];if(u.op===O.ALT||u.op===O.ALT_MATCH)continue;let c="out",l="arg",h=!1;a.out===t?h=!0:a.arg===t&&(h=!0,c="arg",l="out"),h&&(a[c]=n[s]),n[s]===a[c]&&(n[i]=a[l])}return e},zI=r=>{if(r.inst.length>=1e3)return null;let e=new _g(r.inst.length),t=new _g(r.inst.length),n=new Array(r.inst.length),s=new Array(r.inst.length).fill(!1),i=a=>{let u=!0,c=r.inst[a];if(t.contains(a))return!0;switch(t.insert(a),c.op){case O.ALT:case O.ALT_MATCH:{u=i(c.out)&&i(c.arg);let l=s[c.out],h=s[c.arg];if(l&&h)return!1;if(h){let D=c.out;c.out=c.arg,c.arg=D;let P=l;l=h,h=P}l&&(s[a]=!0,c.op=O.ALT_MATCH);let d=n[c.out]||[],C=n[c.arg]||[],y=jI(d,C,c.out,c.arg);if(!y)return!1;n[a]=new Int32Array(y.merged),c.next=new Uint32Array(y.next);break}case O.CAPTURE:case O.EMPTY_WIDTH:case O.NOP:u=i(c.out),s[a]=s[c.out],n[a]=n[c.out]?new Int32Array(n[c.out]):new Int32Array(0),c.next=new Uint32Array(Math.floor(n[a].length/2)+1).fill(c.out);break;case O.MATCH:case O.FAIL:s[a]=c.op===O.MATCH;break;case O.RUNE:{if(s[a]=!1,c.next&&c.next.length>0)break;if(e.insert(c.out),!c.runes||c.runes.length===0){n[a]=new Int32Array(0),c.next=new Uint32Array([c.out]);break}let l=[];if(c.runes.length===1&&(c.arg&F.FOLD_CASE)!==0){let h=c.runes[0];l.push(h,h);for(let d=J.simpleFold(h);d!==h;d=J.simpleFold(d))l.push(d,d);l.sort((d,C)=>d-C)}else for(let h=0;h<c.runes.length;h++)l.push(c.runes[h]);n[a]=new Int32Array(l),c.next=new Uint32Array(Math.floor(l.length/2)+1).fill(c.out),c.op=O.RUNE;break}case O.RUNE1:{if(s[a]=!1,c.next&&c.next.length>0)break;e.insert(c.out);let l=[];if((c.arg&F.FOLD_CASE)!==0){let h=c.runes[0];l.push(h,h);for(let d=J.simpleFold(h);d!==h;d=J.simpleFold(d))l.push(d,d);l.sort((d,C)=>d-C)}else l.push(c.runes[0],c.runes[0]);n[a]=new Int32Array(l),c.next=new Uint32Array(Math.floor(l.length/2)+1).fill(c.out),c.op=O.RUNE;break}case O.RUNE_ANY:if(s[a]=!1,c.next&&c.next.length>0)break;e.insert(c.out),n[a]=new Int32Array([0,J.MAX_RUNE]),c.next=new Uint32Array([c.out]);break;case O.RUNE_ANY_NOT_NL:if(s[a]=!1,c.next&&c.next.length>0)break;e.insert(c.out),n[a]=new Int32Array([0,9,11,J.MAX_RUNE]),c.next=new Uint32Array(Math.floor(n[a].length/2)+1).fill(c.out)}return u};for(e.clear(),e.insert(r.start);!e.empty();)if(t.clear(),!i(e.next()))return null;for(let a=0;a<r.inst.length;a++)n[a]&&(r.inst[a].runes=n[a]);return r},WI=(r,e)=>{for(let t=0;t<e.inst.length;t++){let n=e.inst[t];switch(n.op){case O.ALT:case O.ALT_MATCH:case O.RUNE:break;case O.CAPTURE:case O.EMPTY_WIDTH:case O.NOP:case O.MATCH:case O.FAIL:r.inst[t].next=null;break;case O.RUNE1:case O.RUNE_ANY:case O.RUNE_ANY_NOT_NL:r.inst[t].next=null,r.inst[t].op=n.op,r.inst[t].runes=n.runes?new Int32Array(n.runes):new Int32Array(0)}}},yg=class em{static compile(e){if(e.start===0||e.numLb>0)return null;let t=e.inst[e.start];if(t.op!==O.EMPTY_WIDTH||(t.arg&U.EMPTY_BEGIN_TEXT)===0)return null;let n=!1;for(let i=0;i<e.inst.length;i++)if(e.inst[i].op===O.ALT||e.inst[i].op===O.ALT_MATCH){n=!0;break}for(let i=0;i<e.inst.length;i++){let a=e.inst[i],u=e.inst[a.out].op;switch(a.op){case O.ALT:case O.ALT_MATCH:if(u===O.MATCH||e.inst[a.arg].op===O.MATCH)return null;break;case O.EMPTY_WIDTH:if(u===O.MATCH){if((a.arg&U.EMPTY_END_TEXT)===U.EMPTY_END_TEXT)continue;return null}break;default:if(u===O.MATCH&&n)return null}}let s=JI(e);return s=zI(s),s!==null&&WI(s,e),s}static next(e,t){let n=e.matchRunePos(t);return n>=0?e.next[n]:e.op===O.ALT_MATCH?e.out:0}static execute(e,t,n,s,i){let a=e.onepass;if(!a)return null;let u=new Int32Array(i).fill(-1),c=!1,l=t.step(n),h=l>>3,d=l&7,C=it.EOF(),y=-1,D=0;l!==it.EOF()&&(C=t.step(n+d),C!==it.EOF()&&(y=C>>3,D=C&7));let P=n===0?U.emptyOpContext(-1,h):t.context(n),V=a.start,q;for(;;){switch(q=a.inst[V],V=q.out,q.op){case O.MATCH:return s===F.ANCHOR_BOTH&&n!==t.endPos()?null:(c=!0,u.length>0&&(u[0]=0,u[1]=n),i===0?[]:U.toArray(u));case O.RUNE:if(!q.matchRune(h))return null;break;case O.RUNE1:if(h!==q.runes[0])return null;break;case O.RUNE_ANY:break;case O.RUNE_ANY_NOT_NL:if(h===10)return null;break;case O.ALT:case O.ALT_MATCH:V=em.next(q,h);continue;case O.FAIL:return null;case O.NOP:continue;case O.EMPTY_WIDTH:if((q.arg&~P)!==0)return null;continue;case O.CAPTURE:q.arg<u.length&&(u[q.arg]=n);continue;default:throw new Zo("bad inst")}if(d===0)break;P=U.emptyOpContext(h,y),n+=d,h=y,d=D,h!==-1&&(C=t.step(n+d),C!==it.EOF()?(y=C>>3,D=C&7):(y=-1,D=0))}return c?i===0?[]:U.toArray(u):null}},I=class Z{static Op=Wg(["NO_MATCH","EMPTY_MATCH","LITERAL","CHAR_CLASS","ANY_CHAR_NOT_NL","ANY_CHAR","BEGIN_LINE","END_LINE","BEGIN_TEXT","END_TEXT","WORD_BOUNDARY","NO_WORD_BOUNDARY","CAPTURE","STAR","PLUS","QUEST","REPEAT","CONCAT","ALTERNATE","PLB","NLB","LEFT_PAREN","VERTICAL_BAR"]);static isPseudoOp(e){return e>=Z.Op.LEFT_PAREN}static emptySubs(){return[]}static quoteIfHyphen(e){return e===L.CODES["-"]?"\\":""}static fromRegexp(e){let t=new Z(e.op);return t.flags=e.flags,t.subs=e.subs,t.runes=e.runes,t.cap=e.cap,t.min=e.min,t.max=e.max,t.name=e.name,t.namedGroups=e.namedGroups,t.lb=e.lb,t}constructor(e){this.op=e,this.flags=0,this.subs=Z.emptySubs(),this.runes=new Int32Array(0),this.min=0,this.max=0,this.cap=0,this.name=null,this.namedGroups=Object.create(null),this.lb=0}reinit(){this.flags=0,this.subs=Z.emptySubs(),this.runes=new Int32Array(0),this.cap=0,this.min=0,this.max=0,this.name=null,this.namedGroups=Object.create(null),this.lb=0}toString(){return this.appendTo()}appendTo(){let e="";switch(this.op){case Z.Op.NO_MATCH:e+="[^\\x00-\\x{10FFFF}]";break;case Z.Op.EMPTY_MATCH:e+="(?:)";break;case Z.Op.STAR:case Z.Op.PLUS:case Z.Op.QUEST:case Z.Op.REPEAT:{let t=this.subs[0];switch(t.op>Z.Op.CAPTURE||t.op===Z.Op.LITERAL&&t.runes.length>1?e+=`(?:${t.appendTo()})`:e+=t.appendTo(),this.op){case Z.Op.STAR:e+="*";break;case Z.Op.PLUS:e+="+";break;case Z.Op.QUEST:e+="?";break;case Z.Op.REPEAT:e+=`{${this.min}`,this.min!==this.max&&(e+=",",this.max>=0&&(e+=this.max)),e+="}"}(this.flags&F.NON_GREEDY)!==0&&(e+="?");break}case Z.Op.CONCAT:for(let t of this.subs)t.op===Z.Op.ALTERNATE?e+=`(?:${t.appendTo()})`:e+=t.appendTo();break;case Z.Op.ALTERNATE:{let t="";for(let n of this.subs)e+=t,t="|",e+=n.appendTo();break}case Z.Op.LITERAL:(this.flags&F.FOLD_CASE)!==0&&(e+="(?i:");for(let t of this.runes)e+=U.escapeRune(t);(this.flags&F.FOLD_CASE)!==0&&(e+=")");break;case Z.Op.ANY_CHAR_NOT_NL:e+="(?-s:.)";break;case Z.Op.ANY_CHAR:e+="(?s:.)";break;case Z.Op.PLB:e+=`(?<=${this.subs[0].appendTo()})`;break;case Z.Op.NLB:e+=`(?<!${this.subs[0].appendTo()})`;break;case Z.Op.CAPTURE:this.name===null||this.name.length===0?e+="(":e+=`(?P<${this.name}>`,this.subs[0].op!==Z.Op.EMPTY_MATCH&&(e+=this.subs[0].appendTo()),e+=")";break;case Z.Op.BEGIN_TEXT:e+="\\A";break;case Z.Op.END_TEXT:(this.flags&F.WAS_DOLLAR)!==0?e+="(?-m:$)":e+="\\z";break;case Z.Op.BEGIN_LINE:e+="^";break;case Z.Op.END_LINE:e+="$";break;case Z.Op.WORD_BOUNDARY:e+="\\b";break;case Z.Op.NO_WORD_BOUNDARY:e+="\\B";break;case Z.Op.CHAR_CLASS:if(this.runes.length%2!==0){e+="[invalid char class]";break}if(e+="[",this.runes.length===0)e+="^\\x00-\\x{10FFFF}";else if(this.runes[0]===0&&this.runes[this.runes.length-1]===J.MAX_RUNE){e+="^";for(let t=1;t<this.runes.length-1;t+=2){let n=this.runes[t]+1,s=this.runes[t+1]-1;e+=Z.quoteIfHyphen(n),e+=U.escapeRune(n),n!==s&&(e+="-",e+=Z.quoteIfHyphen(s),e+=U.escapeRune(s))}}else for(let t=0;t<this.runes.length;t+=2){let n=this.runes[t],s=this.runes[t+1];e+=Z.quoteIfHyphen(n),e+=U.escapeRune(n),n!==s&&(e+="-",e+=Z.quoteIfHyphen(s),e+=U.escapeRune(s))}e+="]";break;default:e+=this.op}return e}maxCap(){let e=0;if(this.op===Z.Op.CAPTURE&&(e=this.cap),this.subs!==null)for(let t of this.subs){let n=t.maxCap();e<n&&(e=n)}return e}equals(e){if(!(e!==null&&e instanceof Z)||this.op!==e.op)return!1;switch(this.op){case Z.Op.END_TEXT:if((this.flags&F.WAS_DOLLAR)!==(e.flags&F.WAS_DOLLAR))return!1;break;case Z.Op.LITERAL:case Z.Op.CHAR_CLASS:if((this.flags&F.FOLD_CASE)!==(e.flags&F.FOLD_CASE))return!1;if(this.runes===null&&e.runes===null)break;if(this.runes===null||e.runes===null||this.runes.length!==e.runes.length)return!1;for(let t=0;t<this.runes.length;t++)if(this.runes[t]!==e.runes[t])return!1;break;case Z.Op.ALTERNATE:case Z.Op.CONCAT:if(this.subs.length!==e.subs.length)return!1;for(let t=0;t<this.subs.length;++t)if(!this.subs[t].equals(e.subs[t]))return!1;break;case Z.Op.STAR:case Z.Op.PLUS:case Z.Op.QUEST:if((this.flags&F.NON_GREEDY)!==(e.flags&F.NON_GREEDY)||!this.subs[0].equals(e.subs[0]))return!1;break;case Z.Op.REPEAT:if((this.flags&F.NON_GREEDY)!==(e.flags&F.NON_GREEDY)||this.min!==e.min||this.max!==e.max||!this.subs[0].equals(e.subs[0]))return!1;break;case Z.Op.CAPTURE:if(this.cap!==e.cap||(this.name===null?e.name!==null:this.name!==e.name)||!this.subs[0].equals(e.subs[0]))return!1;break;case Z.Op.PLB:case Z.Op.NLB:if(this.lb!==e.lb||!this.subs[0].equals(e.subs[0]))return!1}return!0}},oB=class{static walk(r,e){let t=[],n=r,s;for(;;){if(n.subs.length===0)s=e.leaf(n);else{let i=e.enter(n);if(i.result===void 0){t.push({re:n,state:i,i:0}),n=n.subs[0];continue}s=i.result}for(;;){if(t.length===0)return s;let i=t[t.length-1];if(e.child(i.re,i.state,s,i.i),i.i++,i.state.result===void 0&&i.i<i.re.subs.length){n=i.re.subs[i.i];break}t.pop(),s=i.state.result!==void 0?i.state.result:e.leave(i.re,i.state)}}}},wg=class{constructor(r,e){let t=new Map,n=[0],s=[0],i=[0],a=[0];for(let D of r){let P=0;for(let V=0;V<D.length;V++){let q=P*e+D[V],W=t.get(q);W===void 0&&(W=n.length,t.set(q,W),n.push(P),s.push(D[V]),i.push(i[P]+1),a.push(0)),P=W}a[P]=1}let u=n.length,c=new Int32Array(u-1);for(let D=1;D<u;D++)c[D-1]=D;c.sort((D,P)=>n[D]-n[P]||s[D]-s[P]);let l=new Int32Array(u+1);for(let D=1;D<u;D++)l[n[D]+1]++;for(let D=0;D<u;D++)l[D+1]+=l[D];let h=new Int32Array(u-1);for(let D=0;D<c.length;D++)h[D]=s[c[D]];this.childStart=l,this.childUnit=h,this.childNode=c;let d=new Int32Array(u);for(let D=0;D<u;D++)d[D]=D;d.sort((D,P)=>i[D]-i[P]);let C=new Int32Array(u),y=Uint8Array.from(a);for(let D=1;D<u;D++){let P=d[D],V=n[P];if(V!==0){let q=C[V],W=this.next(q,s[P]);for(;W<0&&q!==0;)q=C[q],W=this.next(q,s[P]);C[P]=W>=0?W:0}y[P]|=y[C[P]]}this.fail=C,this.match=y}next(r,e){let t=this.childStart[r],n=this.childStart[r+1],s=this.childUnit;for(;t<n;){let i=t+n>>1,a=s[i];if(a===e)return this.childNode[i];a<e?t=i+1:n=i}return-1}advance(r,e){for(;;){let t=this.next(r,e);if(t>=0)return t;if(r===0)return 0;r=this.fail[r]}}searchUTF16(r,e,t){let n=0;for(let s=e;s<t;s++)if(n=this.advance(n,r.charCodeAt(s)),this.match[n]===1)return!0;return!1}searchUTF8(r,e,t){let n=0;for(let s=e;s<t;s++)if(n=this.advance(n,r[s]),this.match[n]===1)return!0;return!1}},se=class ss{static Type={NONE:0,EXACT:1,AND:2,OR:3};static MAX_SCANS=32;static MAX_AC_UNITS=1<<18;constructor(e){this.type=e,this.subs=[],this.str="",this.bytes=null,this.cost=e===ss.Type.EXACT?1:0,this.allExact=!1,this.ac16=null,this.ac8=null}automaton16(){if(this.ac16===null){let e=this.subs.map(t=>{let n=new Array(t.str.length);for(let s=0;s<t.str.length;s++)n[s]=t.str.charCodeAt(s);return n});this.ac16=new wg(e,65536)}return this.ac16}automaton8(){return this.ac8===null&&(this.ac8=new wg(this.subs.map(e=>e.bytes),256)),this.ac8}eval(e,t){switch(this.type){case ss.Type.NONE:return!0;case ss.Type.EXACT:return e.hasString(this,t);case ss.Type.AND:for(let n=0;n<this.subs.length;n++)if(!this.subs[n].eval(e,t))return!1;return!0;case ss.Type.OR:if(this.allExact)return e.hasAnyString(this,t);for(let n=0;n<this.subs.length;n++)if(this.subs[n].eval(e,t))return!0;return!1;default:return!0}}},QI=class is{static build(e){return e?oB.walk(e,is.WALKER):new se(se.Type.NONE)}static WALKER={leaf:e=>is.leaf(e),enter:e=>is.enter(e),child:(e,t,n)=>is.child(e,t,n),leave:(e,t)=>is.leave(e,t)};static leaf(e){if(e.op!==I.Op.LITERAL)return new se(se.Type.NONE);if(e.runes.length===0||(e.flags&F.FOLD_CASE)!==0)return new se(se.Type.NONE);let t="";for(let s=0;s<e.runes.length;s++){if(J.isUnsearchable(e.runes[s]))return new se(se.Type.NONE);t+=String.fromCodePoint(e.runes[s])}let n=new se(se.Type.EXACT);return n.str=t,n.bytes=U.stringToUtf8ByteArray(n.str),n}static enter(e){switch(e.op){case I.Op.CAPTURE:case I.Op.PLUS:return{sub:null};case I.Op.REPEAT:return e.min>=1?{sub:null}:{result:new se(se.Type.NONE)};case I.Op.CONCAT:return{pf:new se(se.Type.AND),subs:[]};case I.Op.ALTERNATE:return{pf:new se(se.Type.OR),subs:[]};default:return{result:new se(se.Type.NONE)}}}static child(e,t,n){if(t.subs===void 0){t.sub=n;return}if(t.pf.type===se.Type.AND){if(n.type===se.Type.NONE)return;if(n.type===se.Type.AND){for(let s=0;s<n.subs.length;s++)t.subs.push(n.subs[s]);return}t.subs.push(n);return}if(n.type===se.Type.NONE){t.result=new se(se.Type.NONE);return}if(n.type===se.Type.OR){for(let s=0;s<n.subs.length;s++)t.subs.push(n.subs[s]);return}t.subs.push(n)}static leave(e,t){if(t.subs===void 0)return t.sub;let n=t.pf,s=new Set,i=[];for(let l of t.subs){if(l.type===se.Type.EXACT){if(s.has(l.str))continue;s.add(l.str)}i.push(l)}if(n.type===se.Type.AND){let l=[],h=0;for(let d of i)h+d.cost>se.MAX_SCANS||(l.push(d),h+=d.cost);return l.length===0?new se(se.Type.NONE):l.length===1?l[0]:(n.subs=l,n.cost=h,n)}if(i.length===0)return new se(se.Type.NONE);if(i.length===1)return i[0];n.subs=i;let a=!0,u=0,c=0;for(let l of i)l.type!==se.Type.EXACT?a=!1:c+=l.bytes.length,u+=l.cost;return a?c>se.MAX_AC_UNITS?new se(se.Type.NONE):(n.allExact=!0,n.cost=1,n):u>se.MAX_SCANS?new se(se.Type.NONE):(n.cost=u,n)}},bt=class{constructor(r=0,e=0){this.head=r,this.tail=e}},$I=class{constructor(){this.inst=[],this.start=0,this.numCap=2,this.lbStarts=[],this.numLb=0,this.lbInst=null}getInst(r){return this.inst[r]}numInst(){return this.inst.length}addInst(r){this.inst.push(new O(r))}markLookbehindInsts(){let r=new Uint8Array(this.inst.length),e=this.lbStarts.slice();for(;e.length>0;){let t=e.pop();if(t===0||r[t]===1)continue;r[t]=1;let n=this.inst[t];switch(n.op){case O.ALT:case O.ALT_MATCH:e.push(n.out,n.arg);break;case O.MATCH:case O.FAIL:break;default:e.push(n.out)}}this.lbInst=r}skipNop(r){let e=this.inst[r];for(;e.op===O.NOP||e.op===O.CAPTURE;)e=this.inst[r],r=e.out;return e}prefix(){let r="",e=this.skipNop(this.start);if(!O.isRuneOp(e.op)||e.runes.length!==1)return[e.op===O.MATCH,r];for(;O.isRuneOp(e.op)&&e.runes.length===1&&(e.arg&F.FOLD_CASE)===0&&!J.isUnsearchable(e.runes[0]);)r+=String.fromCodePoint(e.runes[0]),e=this.skipNop(e.out);return[e.op===O.MATCH,r]}startCond(){let r=0,e=this.start;e:for(;;){let t=this.inst[e];switch(t.op){case O.EMPTY_WIDTH:r|=t.arg;break;case O.FAIL:return-1;case O.CAPTURE:case O.NOP:break;default:break e}e=t.out}return r}patch(r,e){let t=r.head;for(;t!==0;){let n=this.inst[t>>1];(t&1)===0?(t=n.out,n.out=e):(t=n.arg,n.arg=e)}}append(r,e){if(r.head===0)return e;if(e.head===0)return r;let t=this.inst[r.tail>>1];return(r.tail&1)===0?t.out=e.head:t.arg=e.head,new bt(r.head,e.tail)}toString(){let r="";for(let e=0;e<this.inst.length;e++){let t=r.length;r+=e,e===this.start&&(r+="*"),r+="        ".substring(r.length-t),r+=this.inst[e],r+=`
`}return r}},YI=new Int32Array([0,L.CODES[`
`]-1,L.CODES[`
`]+1,J.MAX_RUNE]),Dg=new Int32Array([0,J.MAX_RUNE]),Yo=class{constructor(r=0,e=new bt,t=!1){this.i=r,this.out=e,this.nullable=t}},tm=class sB{static compileRegexp(e){let t=new sB,n=t.compile(e);return t.prog.patch(n.out,t.newInst(O.MATCH).i),t.prog.start=n.i,t.prog.markLookbehindInsts(),t.prog}static compileSet(e){let t=new sB;if(e.length===0)return t.prog.start=t.newInst(O.FAIL).i,t.prog.markLookbehindInsts(),t.prog;let n=[];for(let i=0;i<e.length;i++){t.lbOffset=t.prog.numLb;let a=t.compile(e[i]),u=t.newInst(O.MATCH);t.prog.getInst(u.i).arg=i,t.prog.patch(a.out,u.i),n.push(a.i)}let s=n[0];for(let i=1;i<n.length;i++){let a=t.newInst(O.ALT),u=t.prog.getInst(a.i);u.out=s,u.arg=n[i],s=a.i}return t.prog.start=s,t.prog.markLookbehindInsts(),t.prog}constructor(){this.prog=new $I,this.newInst(O.FAIL),this.lbOffset=0,this.runeCache=new Map,this.walker={leaf:e=>this.leaf(e),enter:e=>this.enter(e),child:(e,t,n)=>this.child(e,t,n),leave:(e,t)=>this.leave(e,t)}}newInst(e){return this.prog.addInst(e),new Yo(this.prog.numInst()-1,new bt,!0)}nop(){let e=this.newInst(O.NOP);return e.out=new bt(e.i<<1,e.i<<1),e}fail(){return new Yo}cap(e){let t=this.newInst(O.CAPTURE);return t.out=new bt(t.i<<1,t.i<<1),this.prog.getInst(t.i).arg=e,this.prog.numCap<e+1&&(this.prog.numCap=e+1),t}cat(e,t){return e.i===0||t.i===0?(this.prog.patch(e.out,0),this.prog.patch(t.out,0),this.fail()):(this.prog.patch(e.out,t.i),new Yo(e.i,t.out,e.nullable&&t.nullable))}alt(e,t){if(e.i===0)return t;if(t.i===0)return e;let n=this.newInst(O.ALT),s=this.prog.getInst(n.i);return s.out=e.i,s.arg=t.i,n.out=this.prog.append(e.out,t.out),n.nullable=e.nullable||t.nullable,n}loop(e,t){let n=this.newInst(O.ALT),s=this.prog.getInst(n.i);return t?(s.arg=e.i,n.out=new bt(n.i<<1,n.i<<1)):(s.out=e.i,n.out=new bt(n.i<<1|1,n.i<<1|1)),this.prog.patch(e.out,n.i),n}quest(e,t){if(e.i===0)return this.nop();let n=this.newInst(O.ALT),s=this.prog.getInst(n.i);return t?(s.arg=e.i,n.out=new bt(n.i<<1,n.i<<1)):(s.out=e.i,n.out=new bt(n.i<<1|1,n.i<<1|1)),n.out=this.prog.append(n.out,e.out),n}star(e,t){return e.i===0?this.nop():e.nullable?this.quest(this.plus(e,t),t):this.loop(e,t)}plus(e,t){return e.i===0?this.fail():new Yo(e.i,this.loop(e,t).out,e.nullable)}empty(e){let t=this.newInst(O.EMPTY_WIDTH);return this.prog.getInst(t.i).arg=e,t.out=new bt(t.i<<1,t.i<<1),t}rune(e,t){let n=this.newInst(O.RUNE);n.nullable=!1;let s=this.prog.getInst(n.i);return s.runes=e,t&=F.FOLD_CASE,(e.length!==1||J.simpleFold(e[0])===e[0])&&(t&=~F.FOLD_CASE),s.arg=t,n.out=new bt(n.i<<1,n.i<<1),(t&F.FOLD_CASE)===0&&e.length===1||e.length===2&&e[0]===e[1]?s.op=O.RUNE1:e.length===2&&e[0]===0&&e[1]===J.MAX_RUNE?s.op=O.RUNE_ANY:e.length===4&&e[0]===0&&e[1]===L.CODES[`
`]-1&&e[2]===L.CODES[`
`]+1&&e[3]===J.MAX_RUNE&&(s.op=O.RUNE_ANY_NOT_NL),n}lookBehind(e,t){let n=Math.sign(t)*(Math.abs(t)+this.lbOffset),s=this.newInst(O.LB_WRITE);this.prog.getInst(s.i).arg=n;let i=this.rune(Dg,0),a=this.star(i,!0),u=this.cat(a,e);this.prog.patch(u.out,s.i);let c=this.newInst(O.LB_CHECK);return this.prog.getInst(c.i).arg=n,this.prog.lbStarts.push(u.i),Math.abs(n)>this.prog.numLb&&(this.prog.numLb=Math.abs(n)),c.out=new bt(c.i<<1,c.i<<1),c}compile(e){return oB.walk(e,this.walker)}leaf(e){switch(e.op){case I.Op.NO_MATCH:return this.fail();case I.Op.EMPTY_MATCH:return this.nop();case I.Op.LITERAL:{if(e.runes.length===0)return this.nop();let t=null;for(let n of e.runes){let s=this.runeCache.get(n);s===void 0&&(s=new Int32Array([n]),this.runeCache.set(n,s));let i=this.rune(s,e.flags);t=t===null?i:this.cat(t,i)}return t}case I.Op.CHAR_CLASS:return this.rune(e.runes,e.flags);case I.Op.ANY_CHAR_NOT_NL:return this.rune(YI,0);case I.Op.ANY_CHAR:return this.rune(Dg,0);case I.Op.BEGIN_LINE:return this.empty(U.EMPTY_BEGIN_LINE);case I.Op.END_LINE:return this.empty(U.EMPTY_END_LINE);case I.Op.BEGIN_TEXT:return this.empty(U.EMPTY_BEGIN_TEXT);case I.Op.END_TEXT:return this.empty(U.EMPTY_END_TEXT);case I.Op.WORD_BOUNDARY:return this.empty(U.EMPTY_WORD_BOUNDARY);case I.Op.NO_WORD_BOUNDARY:return this.empty(U.EMPTY_NO_WORD_BOUNDARY);case I.Op.CONCAT:case I.Op.ALTERNATE:return this.nop();default:throw new Mi("regexp: unhandled case in compile")}}enter(e){switch(e.op){case I.Op.PLB:case I.Op.NLB:case I.Op.STAR:case I.Op.PLUS:case I.Op.QUEST:return{sub:null};case I.Op.CAPTURE:return{bra:this.cap(e.cap<<1),sub:null};case I.Op.CONCAT:case I.Op.ALTERNATE:return{f:null};default:throw new Mi("regexp: unhandled case in compile")}}child(e,t,n){e.op===I.Op.CONCAT?t.f=t.f===null?n:this.cat(t.f,n):e.op===I.Op.ALTERNATE?t.f=t.f===null?n:this.alt(t.f,n):t.sub=n}leave(e,t){switch(e.op){case I.Op.PLB:case I.Op.NLB:return this.lookBehind(t.sub,e.lb);case I.Op.CAPTURE:{let n=this.cap(e.cap<<1|1);return this.cat(this.cat(t.bra,t.sub),n)}case I.Op.STAR:return this.star(t.sub,(e.flags&F.NON_GREEDY)!==0);case I.Op.PLUS:return this.plus(t.sub,(e.flags&F.NON_GREEDY)!==0);case I.Op.QUEST:return this.quest(t.sub,(e.flags&F.NON_GREEDY)!==0);case I.Op.CONCAT:case I.Op.ALTERNATE:return t.f;default:throw new Mi("regexp: unhandled case in compile")}}},nm=class Xe{static simplify(e){return e===null?null:oB.walk(e,Xe.WALKER)}static WALKER={leaf:e=>Xe.leaf(e),enter:e=>Xe.enter(e),child:(e,t,n,s)=>Xe.child(e,t,n,s),leave:(e,t)=>Xe.leave(e,t)};static leaf(e){if(e.op===I.Op.CHAR_CLASS){if(e.runes===null)return e;if(e.runes.length===0)return new I(I.Op.NO_MATCH);if(e.runes.length===2&&e.runes[0]===0&&e.runes[1]===J.MAX_RUNE)return new I(I.Op.ANY_CHAR);if(e.runes.length===4&&e.runes[0]===0&&e.runes[1]===L.CODES[`
`]-1&&e.runes[2]===L.CODES[`
`]+1&&e.runes[3]===J.MAX_RUNE)return new I(I.Op.ANY_CHAR_NOT_NL)}return e}static enter(e){switch(e.op){case I.Op.PLB:case I.Op.NLB:case I.Op.CAPTURE:case I.Op.STAR:case I.Op.PLUS:case I.Op.QUEST:return{sub:null};case I.Op.CONCAT:case I.Op.ALTERNATE:return{subs:[],changed:!1};case I.Op.REPEAT:return e.min===0&&e.max===0?{result:new I(I.Op.EMPTY_MATCH)}:{sub:null};default:return{result:e}}}static child(e,t,n,s){if(t.subs===void 0){t.sub=n;return}if(n!==e.subs[s]&&(t.changed=!0),e.op===I.Op.CONCAT){if(n.op===I.Op.NO_MATCH){t.result=new I(I.Op.NO_MATCH);return}if(n.op===I.Op.EMPTY_MATCH){t.changed=!0;return}if(n.op===I.Op.CONCAT){t.changed=!0;for(let i=0;i<n.subs.length;i++)t.subs.push(n.subs[i]);return}}else{if(n.op===I.Op.NO_MATCH){t.changed=!0;return}if(n.op===I.Op.ALTERNATE){t.changed=!0;for(let i=0;i<n.subs.length;i++)t.subs.push(n.subs[i]);return}}t.subs.push(n)}static leave(e,t){switch(e.op){case I.Op.PLB:case I.Op.NLB:case I.Op.CAPTURE:{let n=t.sub;if(n!==e.subs[0]){let s=I.fromRegexp(e);return s.runes=new Int32Array(0),s.subs=[n],s}return e}case I.Op.CONCAT:case I.Op.ALTERNATE:if(t.changed){let n=t.subs;if(n.length===0)return new I(e.op===I.Op.CONCAT?I.Op.EMPTY_MATCH:I.Op.NO_MATCH);if(n.length===1)return n[0];let s=I.fromRegexp(e);return s.runes=new Int32Array(0),s.subs=n,s}return e;case I.Op.STAR:case I.Op.PLUS:case I.Op.QUEST:return Xe.simplify1(e.op,e.flags,t.sub,e);case I.Op.REPEAT:return Xe.simplifyRepeat(e,t.sub);default:return e}}static simplifyRepeat(e,t){if(e.max===-1){if(e.min===0)return Xe.simplify1(I.Op.STAR,e.flags,t,null);if(e.min===1)return Xe.simplify1(I.Op.PLUS,e.flags,t,null);let s=[];for(let i=0;i<e.min-1;i++)s.push(t);return s.push(Xe.simplify1(I.Op.PLUS,e.flags,t,null)),Xe.concat(s)}if(e.min===1&&e.max===1)return t;let n=null;if(e.min>0){n=[];for(let s=0;s<e.min;s++)n.push(t)}if(e.max>e.min){let s=Xe.simplify1(I.Op.QUEST,e.flags,t,null);for(let i=e.min+1;i<e.max;i++)s=Xe.simplify1(I.Op.QUEST,e.flags,Xe.concat([t,s]),null);if(n===null)return s;n.push(s)}return n!==null?Xe.concat(n):new I(I.Op.NO_MATCH)}static concat(e){let t=[];for(let s=0;s<e.length;s++){let i=e[s];if(i.op===I.Op.NO_MATCH)return new I(I.Op.NO_MATCH);if(i.op!==I.Op.EMPTY_MATCH){if(i.op===I.Op.CONCAT){for(let a=0;a<i.subs.length;a++)t.push(i.subs[a]);continue}t.push(i)}}if(t.length===0)return new I(I.Op.EMPTY_MATCH);if(t.length===1)return t[0];let n=new I(I.Op.CONCAT);return n.subs=t,n}static simplify1(e,t,n,s){if(n.op===I.Op.EMPTY_MATCH)return n;if(n.op===I.Op.NO_MATCH)return e===I.Op.PLUS?n:new I(I.Op.EMPTY_MATCH);if(e===n.op&&(t&F.NON_GREEDY)===(n.flags&F.NON_GREEDY))return n;if(s!==null&&s.op===e&&(s.flags&F.NON_GREEDY)===(t&F.NON_GREEDY)&&n===s.subs[0])return s;let i=new I(e);return i.flags=t,i.subs=[n],i}},le=class{constructor(r,e){this.sign=r,this.cls=e}},Ig=[48,57],Tg=[9,10,12,13,32,32],Ag=[48,57,65,90,95,95,97,122],bg=new Map([["\\d",new le(1,Ig)],["\\D",new le(-1,Ig)],["\\s",new le(1,Tg)],["\\S",new le(-1,Tg)],["\\w",new le(1,Ag)],["\\W",new le(-1,Ag)]]),vg=[48,57,65,90,97,122],Rg=[65,90,97,122],Sg=[0,127],Pg=[9,9,32,32],Ng=[0,31,127,127],Og=[48,57],xg=[33,126],Fg=[97,122],Lg=[32,126],kg=[33,47,58,64,91,96,123,126],Vg=[9,13,32,32],Mg=[65,90],Gg=[48,57,65,90,95,95,97,122],Ug=[48,57,65,70,97,102],Hg=new Map([["[:alnum:]",new le(1,vg)],["[:^alnum:]",new le(-1,vg)],["[:alpha:]",new le(1,Rg)],["[:^alpha:]",new le(-1,Rg)],["[:ascii:]",new le(1,Sg)],["[:^ascii:]",new le(-1,Sg)],["[:blank:]",new le(1,Pg)],["[:^blank:]",new le(-1,Pg)],["[:cntrl:]",new le(1,Ng)],["[:^cntrl:]",new le(-1,Ng)],["[:digit:]",new le(1,Og)],["[:^digit:]",new le(-1,Og)],["[:graph:]",new le(1,xg)],["[:^graph:]",new le(-1,xg)],["[:lower:]",new le(1,Fg)],["[:^lower:]",new le(-1,Fg)],["[:print:]",new le(1,Lg)],["[:^print:]",new le(-1,Lg)],["[:punct:]",new le(1,kg)],["[:^punct:]",new le(-1,kg)],["[:space:]",new le(1,Vg)],["[:^space:]",new le(-1,Vg)],["[:upper:]",new le(1,Mg)],["[:^upper:]",new le(-1,Mg)],["[:word:]",new le(1,Gg)],["[:^word:]",new le(-1,Gg)],["[:xdigit:]",new le(1,Ug)],["[:^xdigit:]",new le(-1,Ug)]]),or=class Xo{static charClassToString(e,t){let n="[";for(let s=0;s<t;s+=2){s>0&&(n+=" ");let i=e[s],a=e[s+1];i===a?n+=`0x${i.toString(16)}`:n+=`0x${i.toString(16)}-0x${a.toString(16)}`}return n+="]",n}static sortRanges(e,t){let n=t>>1,s=new Array(n);for(let a=0;a<n;a++)s[a]=a;s.sort((a,u)=>e[2*a]-e[2*u]||e[2*u+1]-e[2*a+1]);let i=e.slice(0,t);for(let a=0;a<n;a++)e[2*a]=i[2*s[a]],e[2*a+1]=i[2*s[a]+1]}constructor(e=U.emptyInts()){this.r=e,this.len=e.length}toArray(){return this.r instanceof Int32Array?this.len===this.r.length?this.r:this.r.subarray(0,this.len):new Int32Array(this.len===this.r.length?this.r:this.r.slice(0,this.len))}toGrowableArray(){return Array.isArray(this.r)?(this.r.length=this.len,this.r):Array.from(this.r.subarray(0,this.len))}cleanClass(){if(this.len<4)return this;Xo.sortRanges(this.r,this.len);let e=2;for(let t=2;t<this.len;t+=2){let n=this.r[t],s=this.r[t+1];if(n<=this.r[e-1]+1){s>this.r[e-1]&&(this.r[e-1]=s);continue}this.r[e]=n,this.r[e+1]=s,e+=2}return this.len=e,this}appendLiteral(e,t){return(t&F.FOLD_CASE)!==0?this.appendFoldedRange(e,e):this.appendRange(e,e)}appendRange(e,t){if(this.len>0){for(let n=2;n<=4;n+=2)if(this.len>=n){let s=this.r[this.len-n],i=this.r[this.len-n+1];if(e<=i+1&&s<=t+1)return e<s&&(this.r[this.len-n]=e),t>i&&(this.r[this.len-n+1]=t),this}}return this.r[this.len++]=e,this.r[this.len++]=t,this}appendFoldedRange(e,t){if(e<=J.MIN_FOLD&&t>=J.MAX_FOLD)return this.appendRange(e,t);if(t<J.MIN_FOLD||e>J.MAX_FOLD)return this.appendRange(e,t);e<J.MIN_FOLD&&(this.appendRange(e,J.MIN_FOLD-1),e=J.MIN_FOLD),t>J.MAX_FOLD&&(this.appendRange(J.MAX_FOLD+1,t),t=J.MAX_FOLD);for(let n=e;n<=t;n++){this.appendRange(n,n);for(let s=J.simpleFold(n);s!==n;s=J.simpleFold(s))this.appendRange(s,s)}return this}appendClass(e){for(let t=0;t<e.length;t+=2)this.appendRange(e[t],e[t+1]);return this}appendFoldedClass(e){for(let t=0;t<e.length;t+=2)this.appendFoldedRange(e[t],e[t+1]);return this}appendNegatedClass(e){let t=0;for(let n=0;n<e.length;n+=2){let s=e[n],i=e[n+1];t<=s-1&&this.appendRange(t,s-1),t=i+1}return t<=J.MAX_RUNE&&this.appendRange(t,J.MAX_RUNE),this}appendTable(e){for(let t=0;t<e.length;++t){let n=e.getLo(t),s=e.getHi(t),i=e.getStride(t);if(i===1){this.appendRange(n,s);continue}for(let a=n;a<=s;a+=i)this.appendRange(a,a)}return this}appendNegatedTable(e){let t=0;for(let n=0;n<e.length;++n){let s=e.getLo(n),i=e.getHi(n),a=e.getStride(n);if(a===1){t<=s-1&&this.appendRange(t,s-1),t=i+1;continue}for(let u=s;u<=i;u+=a)t<=u-1&&this.appendRange(t,u-1),t=u+1}return t<=J.MAX_RUNE&&this.appendRange(t,J.MAX_RUNE),this}appendTableWithSign(e,t){return t<0?this.appendNegatedTable(e):this.appendTable(e)}negateClass(){let e=0,t=0;for(let n=0;n<this.len;n+=2){let s=this.r[n],i=this.r[n+1];e<=s-1&&(this.r[t]=e,this.r[t+1]=s-1,t+=2),e=i+1}return this.len=t,e<=J.MAX_RUNE&&(this.r[this.len++]=e,this.r[this.len++]=J.MAX_RUNE),this}appendClassWithSign(e,t){return t<0?this.appendNegatedClass(e):this.appendClass(e)}appendGroup(e,t){let n=e.cls;return t&&(n=new Xo().appendFoldedClass(n).cleanClass().toArray()),this.appendClassWithSign(n,e.sign)}toString(){return Xo.charClassToString(this.r,this.len)}},XI=class{constructor(r){this.str=r,this.position=0}pos(){return this.position}rewindTo(r){this.position=r}more(){return this.position<this.str.length}peek(){return this.str.codePointAt(this.position)}skip(r){this.position+=r}skipString(r){this.position+=r.length}pop(){let r=this.str.codePointAt(this.position);return this.position+=U.charCount(r),r}lookingAt(r){return this.str.startsWith(r,this.position)}rest(){return this.str.substring(this.position)}from(r){return this.str.substring(r,this.position)}toString(){return this.rest()}},Vi=class Q{static ERR_INTERNAL_ERROR="regexp/syntax: internal error";static ERR_INVALID_CHAR_RANGE="invalid character class range";static ERR_INVALID_ESCAPE="invalid escape sequence";static ERR_INVALID_NAMED_CAPTURE="invalid named capture";static ERR_INVALID_PERL_OP="invalid or unsupported Perl syntax";static ERR_INVALID_REPEAT_OP="invalid nested repetition operator";static ERR_INVALID_REPEAT_SIZE="invalid repeat count";static ERR_MISSING_BRACKET="missing closing ]";static ERR_MISSING_PAREN="missing closing )";static ERR_MISSING_REPEAT_ARGUMENT="missing argument to repetition operator";static ERR_TRAILING_BACKSLASH="trailing backslash at end of expression";static ERR_DUPLICATE_NAMED_CAPTURE="duplicate capture group name";static ERR_UNEXPECTED_PAREN="unexpected )";static ERR_NESTING_DEPTH="expression nests too deeply";static ERR_LARGE="expression too large";static ERR_INVALID_CAPTURE_IN_LOOKBEHIND="invalid capture in lookbehind";static MAX_HEIGHT=1e3;static MAX_SIZE=1398101;static MAX_RUNES=33554432;static ANY_TABLE=new g(new Uint32Array([0,J.MAX_RUNE,1]));static ASCII_TABLE=new g(new Uint32Array([0,127,1]));static ASCII_FOLD_TABLE=new g(new Uint32Array([0,127,1,383,383,1,8490,8490,1]));static unicodeTable(e){return e==="Any"?{tab:Q.ANY_TABLE,fold:Q.ANY_TABLE,sign:1}:e==="Ascii"?{tab:Q.ASCII_TABLE,fold:Q.ASCII_FOLD_TABLE,sign:1}:e==="Assigned"?{tab:mt.CATEGORIES.get("Cn"),fold:mt.CATEGORIES.get("Cn"),sign:-1}:e==="Lc"?{tab:mt.CATEGORIES.get("LC"),fold:mt.FOLD_CATEGORIES.get("LC"),sign:1}:mt.CATEGORIES.has(e)?{tab:mt.CATEGORIES.get(e),fold:mt.FOLD_CATEGORIES.get(e),sign:1}:mt.SCRIPTS.has(e)?{tab:mt.SCRIPTS.get(e),fold:mt.FOLD_SCRIPT.get(e),sign:1}:null}static minFoldRune(e){if(e<J.MIN_FOLD||e>J.MAX_FOLD)return e;let t=e,n=e;for(e=J.simpleFold(e);e!==n;e=J.simpleFold(e))t>e&&(t=e);return t}static leadingRegexp(e){if(e.op===I.Op.EMPTY_MATCH)return null;if(e.op===I.Op.CONCAT&&e.subs.length>0){let t=e.subs[0];return t.op===I.Op.EMPTY_MATCH?null:t}return e}static literalRegexp(e,t){let n=new I(I.Op.LITERAL);return n.flags=t,n.runes=U.stringToRunes(e),n}static parse(e,t){return new Q(e,t).parseInternal()}static parseRepeat(e){let t=e.pos();if(!e.more()||!e.lookingAt("{"))return-1;e.skip(1);let n=Q.parseInt(e);if(n===-1||!e.more())return-1;let s;if(!e.lookingAt(","))s=n;else{if(e.skip(1),!e.more())return-1;if(e.lookingAt("}"))s=-1;else if((s=Q.parseInt(e))===-1)return-1}if(!e.more()||!e.lookingAt("}"))return-1;if(e.skip(1),n<0||n>1e3||s===-2||s>1e3||s>=0&&n>s)throw new Ce(Q.ERR_INVALID_REPEAT_SIZE,e.from(t));return n<<16|s&J.MAX_BMP}static isValidCaptureName(e){if(e.length===0)return!1;for(let t=0;t<e.length;t++){let n=e.codePointAt(t);if(n!==L.CODES._&&!U.isalnum(n))return!1}return!0}static parseInt(e){let t=e.pos();for(;e.more()&&e.peek()>=L.CODES[0]&&e.peek()<=L.CODES[9];)e.skip(1);let n=e.from(t);return n.length===0||n.length>1&&n.codePointAt(0)===L.CODES[0]?-1:n.length>8?-2:parseInt(n,10)}static isCharClass(e){return e.op===I.Op.LITERAL&&e.runes.length===1||e.op===I.Op.CHAR_CLASS||e.op===I.Op.ANY_CHAR_NOT_NL||e.op===I.Op.ANY_CHAR}static matchRune(e,t){switch(e.op){case I.Op.LITERAL:return e.runes.length===1&&e.runes[0]===t;case I.Op.CHAR_CLASS:for(let n=0;n<e.runes.length;n+=2)if(e.runes[n]<=t&&t<=e.runes[n+1])return!0;return!1;case I.Op.ANY_CHAR_NOT_NL:return t!==L.CODES[`
`];case I.Op.ANY_CHAR:return!0}return!1}static mergeCharClass(e,t){switch(e.op){case I.Op.ANY_CHAR:break;case I.Op.ANY_CHAR_NOT_NL:Q.matchRune(t,L.CODES[`
`])&&(e.op=I.Op.ANY_CHAR);break;case I.Op.CHAR_CLASS:{let n=new or(Array.isArray(e.runes)?e.runes:Array.from(e.runes));t.op===I.Op.LITERAL?n.appendLiteral(t.runes[0],t.flags):n.appendClass(t.runes),e.runes=n.toGrowableArray();break}case I.Op.LITERAL:if(t.runes[0]===e.runes[0]&&t.flags===e.flags)break;e.op=I.Op.CHAR_CLASS,e.runes=new or().appendLiteral(e.runes[0],e.flags).appendLiteral(t.runes[0],t.flags).toGrowableArray()}}static parseEscape(e){let t=e.pos();if(e.skip(1),!e.more())throw new Ce(Q.ERR_TRAILING_BACKSLASH);let n=e.pop();e:switch(n){case L.CODES[1]:case L.CODES[2]:case L.CODES[3]:case L.CODES[4]:case L.CODES[5]:case L.CODES[6]:case L.CODES[7]:if(!e.more()||e.peek()<L.CODES[0]||e.peek()>L.CODES[7])break;case L.CODES[0]:{let s=n-L.CODES[0];for(let i=1;i<3&&!(!e.more()||e.peek()<L.CODES[0]||e.peek()>L.CODES[7]);i++)s=s*8+e.peek()-L.CODES[0],e.skip(1);return s}case L.CODES.x:{if(!e.more())break;if(n=e.pop(),n===L.CODES["{"]){let a=0,u=0;for(;;){if(!e.more())break e;if(n=e.pop(),n===L.CODES["}"])break;let c=U.unhex(n);if(c<0||(u=u*16+c,u>J.MAX_RUNE))break e;a++}if(a===0)break e;return u}let s=U.unhex(n);if(!e.more())break;n=e.pop();let i=U.unhex(n);if(s<0||i<0)break;return s*16+i}case L.CODES.a:return L.CODES["\x07"];case L.CODES.f:return L.CODES["\f"];case L.CODES.n:return L.CODES[`
`];case L.CODES.r:return L.CODES["\r"];case L.CODES.t:return L.CODES["	"];case L.CODES.v:return L.CODES["\v"];default:if(n<=J.MAX_ASCII&&!U.isalnum(n))return n}throw new Ce(Q.ERR_INVALID_ESCAPE,e.from(t))}static parseClassChar(e,t){if(!e.more())throw new Ce(Q.ERR_MISSING_BRACKET,e.from(t));return e.lookingAt("\\")?Q.parseEscape(e):e.pop()}static hasCapture(e){if(e===null)return!1;if(e.op===I.Op.CAPTURE)return!0;if(e.subs){for(let t of e.subs)if(Q.hasCapture(t))return!0}return!1}constructor(e,t=0){this.wholeRegexp=e,this.flags=t,this.numCap=0,this.namedGroups=Object.create(null),this.stack=[],this.free=null,this.numRegexp=0,this.numRunes=0,this.repeats=0,this.height=null,this.size=null,this.nlb=0}newRegexp(e){let t=this.free;return t!==null&&t.subs!==null&&t.subs.length>0?(this.free=t.subs[0],t.reinit(),t.op=e):(t=new I(e),this.numRegexp+=1),t}reuse(e){this.height!==null&&this.height.has(e)&&this.height.delete(e),e.subs!==null&&e.subs.length>0&&(e.subs[0]=this.free),this.free=e}checkLimits(e){if(this.numRunes>Q.MAX_RUNES)throw new Ce(Q.ERR_LARGE);this.checkSize(e),this.checkHeight(e)}checkSize(e){if(this.size===null){if(this.repeats===0&&(this.repeats=1),e.op===I.Op.REPEAT){let t=e.max;t===-1&&(t=e.min),t<=0&&(t=1),t>Math.floor(Q.MAX_SIZE/this.repeats)?this.repeats=Q.MAX_SIZE:this.repeats*=t}if(this.numRegexp<Math.floor(Q.MAX_SIZE/this.repeats))return;this.size=new Map;for(let t of this.stack)this.checkSize(t)}if(this.calcSize(e,!0)>Q.MAX_SIZE)throw new Ce(Q.ERR_LARGE)}calcSize(e,t=!1){if(!t&&this.size!==null&&this.size.has(e))return this.size.get(e);let n=0;switch(e.op){case I.Op.LITERAL:n=e.runes.length;break;case I.Op.PLB:case I.Op.NLB:case I.Op.CAPTURE:case I.Op.STAR:n=2+this.calcSize(e.subs[0]);break;case I.Op.PLUS:case I.Op.QUEST:n=1+this.calcSize(e.subs[0]);break;case I.Op.CONCAT:for(let s of e.subs)n=n+this.calcSize(s);break;case I.Op.ALTERNATE:for(let s of e.subs)n=n+this.calcSize(s);e.subs.length>1&&(n=n+e.subs.length-1);break;case I.Op.REPEAT:{let s=this.calcSize(e.subs[0]);if(e.max===-1){e.min===0?n=2+s:n=1+e.min*s;break}n=e.max*s+(e.max-e.min);break}}return n=Math.max(1,n),this.size===null&&(this.size=new Map),this.size.set(e,n),n}checkHeight(e){if(!(this.numRegexp<Q.MAX_HEIGHT)){if(this.height===null){this.height=new Map;for(let t of this.stack)this.checkHeight(t)}if(this.calcHeight(e,!0)>Q.MAX_HEIGHT)throw new Ce(Q.ERR_NESTING_DEPTH)}}calcHeight(e,t=!1){if(!t&&this.height!==null&&this.height.has(e))return this.height.get(e);let n=1;for(let s of e.subs){let i=this.calcHeight(s);n<1+i&&(n=1+i)}return this.height===null&&(this.height=new Map),this.height.set(e,n),n}pop(){return this.stack.pop()}popToPseudo(){let e=this.stack.length,t=e;for(;t>0&&!I.isPseudoOp(this.stack[t-1].op);)t--;return this.stack.splice(t,e-t)}push(e){if(this.numRunes+=e.runes.length,e.op===I.Op.CHAR_CLASS&&e.runes.length===2&&e.runes[0]===e.runes[1]){if(this.maybeConcat(e.runes[0],this.flags&~F.FOLD_CASE))return null;e.op=I.Op.LITERAL,e.runes=[e.runes[0]],e.flags=this.flags&~F.FOLD_CASE}else if(e.op===I.Op.CHAR_CLASS&&e.runes.length===4&&e.runes[0]===e.runes[1]&&e.runes[2]===e.runes[3]&&J.simpleFold(e.runes[0])===e.runes[2]&&J.simpleFold(e.runes[2])===e.runes[0]||e.op===I.Op.CHAR_CLASS&&e.runes.length===2&&e.runes[0]+1===e.runes[1]&&J.simpleFold(e.runes[0])===e.runes[1]&&J.simpleFold(e.runes[1])===e.runes[0]){if(this.maybeConcat(e.runes[0],this.flags|F.FOLD_CASE))return null;e.op=I.Op.LITERAL,e.runes=[e.runes[0]],e.flags=this.flags|F.FOLD_CASE}else this.maybeConcat(-1,0);return this.stack.push(e),this.checkLimits(e),e}maybeConcat(e,t){let n=this.stack.length;if(n<2)return!1;let s=this.stack[n-1],i=this.stack[n-2];if(s.op!==I.Op.LITERAL||i.op!==I.Op.LITERAL||(s.flags&F.FOLD_CASE)!==(i.flags&F.FOLD_CASE))return!1;Array.isArray(i.runes)||(i.runes=Array.from(i.runes));for(let a=0;a<s.runes.length;a++)i.runes.push(s.runes[a]);return e>=0?(s.runes=[e],s.flags=t,!0):(this.pop(),this.reuse(s),!1)}newLiteral(e,t){let n=this.newRegexp(I.Op.LITERAL);return n.flags=t,(t&F.FOLD_CASE)!==0&&(e=Q.minFoldRune(e)),n.runes=[e],n}literal(e){this.push(this.newLiteral(e,this.flags))}op(e){let t=this.newRegexp(e);return t.flags=this.flags,this.push(t)}repeat(e,t,n,s,i,a){let u=this.flags;if((u&F.PERL_X)!==0&&(i.more()&&i.lookingAt("?")&&(i.skip(1),u^=F.NON_GREEDY),a!==-1))throw new Ce(Q.ERR_INVALID_REPEAT_OP,i.from(a));let c=this.stack.length;if(c===0)throw new Ce(Q.ERR_MISSING_REPEAT_ARGUMENT,i.from(s));let l=this.stack[c-1];if(I.isPseudoOp(l.op))throw new Ce(Q.ERR_MISSING_REPEAT_ARGUMENT,i.from(s));let h=this.newRegexp(e);if(h.min=t,h.max=n,h.flags=u,h.subs=[l],this.stack[c-1]=h,this.checkLimits(h),e===I.Op.REPEAT&&(t>=2||n>=2)&&!this.repeatIsValid(h,1e3))throw new Ce(Q.ERR_INVALID_REPEAT_SIZE,i.from(s))}repeatIsValid(e,t){if(e.op===I.Op.REPEAT){let n=e.max;if(n===0)return!0;if(n<0&&(n=e.min),n>t)return!1;n>0&&(t=Math.trunc(t/n))}for(let n of e.subs)if(!this.repeatIsValid(n,t))return!1;return!0}concat(){this.maybeConcat(-1,0);let e=this.popToPseudo();return e.length===0?this.push(this.newRegexp(I.Op.EMPTY_MATCH)):this.push(this.collapse(e,I.Op.CONCAT))}alternate(){let e=this.popToPseudo();return e.length>0&&this.cleanAlt(e[e.length-1]),e.length===0?this.push(this.newRegexp(I.Op.NO_MATCH)):this.push(this.collapse(e,I.Op.ALTERNATE))}cleanAlt(e){e.op===I.Op.CHAR_CLASS&&(e.runes=new or(Array.from(e.runes)).cleanClass().toArray(),e.runes.length===2&&e.runes[0]===0&&e.runes[1]===J.MAX_RUNE?(e.runes=new Int32Array(0),e.op=I.Op.ANY_CHAR):e.runes.length===4&&e.runes[0]===0&&e.runes[1]===L.CODES[`
`]-1&&e.runes[2]===L.CODES[`
`]+1&&e.runes[3]===J.MAX_RUNE&&(e.runes=new Int32Array(0),e.op=I.Op.ANY_CHAR_NOT_NL))}collapse(e,t){if(e.length===1)return e[0];let n=0;for(let u of e)n+=u.op===t?u.subs.length:1;let s=new Array(n).fill(null),i=0;for(let u of e)if(u.op===t){for(let c=0;c<u.subs.length;c++)s[i++]=u.subs[c];this.reuse(u)}else s[i++]=u;let a=this.newRegexp(t);if(a.subs=s,t===I.Op.ALTERNATE&&(a.subs=this.factor(a.subs),a.subs.length===1)){let u=a;a=a.subs[0],this.reuse(u)}return a}factor(e){if(e.length<2)return e;let t=0,n=e.length,s=0,i=null,a=0,u=0,c=0;for(let h=0;h<=n;h++){let d=null,C=0,y=0;if(h<n){let D=e[t+h];if(D.op===I.Op.CONCAT&&D.subs.length>0&&(D=D.subs[0]),D.op===I.Op.LITERAL&&(d=D.runes,C=D.runes.length,y=D.flags&F.FOLD_CASE),y===u){let P=0;for(;P<a&&P<C&&i[P]===d[P];)P++;if(P>0){a=P;continue}}}if(h!==c)if(h===c+1)e[s++]=e[t+c];else{let D=this.newRegexp(I.Op.LITERAL);D.flags=u,D.runes=i.slice(0,a);for(let q=c;q<h;q++)e[t+q]=this.removeLeadingString(e[t+q],a),this.checkLimits(e[t+q]);let P=this.collapse(e.slice(t+c,t+h),I.Op.ALTERNATE),V=this.newRegexp(I.Op.CONCAT);V.subs=[D,P],e[s++]=V}c=h,i=d,a=C,u=y}n=s,t=0,c=0,s=0;let l=null;for(let h=0;h<=n;h++){let d=null;if(!(h<n&&(d=Q.leadingRegexp(e[t+h]),l!==null&&l.equals(d)&&(Q.isCharClass(l)||l.op===I.Op.REPEAT&&l.min===l.max&&Q.isCharClass(l.subs[0]))))){if(h!==c)if(h===c+1)e[s++]=e[t+c];else{let C=l;for(let P=c;P<h;P++){let V=P!==c;e[t+P]=this.removeLeadingRegexp(e[t+P],V),this.checkLimits(e[t+P])}let y=this.collapse(e.slice(t+c,t+h),I.Op.ALTERNATE),D=this.newRegexp(I.Op.CONCAT);D.subs=[C,y],e[s++]=D}c=h,l=d}}n=s,t=0,c=0,s=0;for(let h=0;h<=n;h++)if(!(h<n&&Q.isCharClass(e[t+h]))){if(h!==c)if(h===c+1)e[s++]=e[t+c];else{let d=c;for(let y=c+1;y<h;y++){let D=e[t+d],P=e[t+y];(D.op<P.op||D.op===P.op&&(D.runes!==null?D.runes.length:0)<(P.runes!==null?P.runes.length:0))&&(d=y)}let C=e[t+c];e[t+c]=e[t+d],e[t+d]=C;for(let y=c+1;y<h;y++)Q.mergeCharClass(e[t+c],e[t+y]),this.reuse(e[t+y]);this.cleanAlt(e[t+c]),e[s++]=e[t+c]}h<n&&(e[s++]=e[t+h]),c=h+1}n=s,t=0,c=0,s=0;for(let h=0;h<n;++h)h+1<n&&e[t+h].op===I.Op.EMPTY_MATCH&&e[t+h+1].op===I.Op.EMPTY_MATCH||(e[s++]=e[t+h]);return n=s,t=0,e.slice(t,n)}removeLeadingString(e,t){if(e.op===I.Op.CONCAT&&e.subs.length>0){let n=this.removeLeadingString(e.subs[0],t);if(e.subs[0]=n,n.op===I.Op.EMPTY_MATCH)switch(this.reuse(n),e.subs.length){case 0:case 1:e.op=I.Op.EMPTY_MATCH,e.subs=I.emptySubs();break;case 2:{let s=e;e=e.subs[1],this.reuse(s);break}default:e.subs=e.subs.slice(1,e.subs.length)}return e}return e.op===I.Op.LITERAL&&(e.runes=e.runes.slice(t,e.runes.length),e.runes.length===0&&(e.op=I.Op.EMPTY_MATCH)),e}removeLeadingRegexp(e,t){if(e.op===I.Op.CONCAT&&e.subs.length>0){switch(t&&this.reuse(e.subs[0]),e.subs=e.subs.slice(1,e.subs.length),e.subs.length){case 0:e.op=I.Op.EMPTY_MATCH,e.subs=I.emptySubs();break;case 1:{let n=e;e=e.subs[0],this.reuse(n);break}}return e}return t&&this.reuse(e),this.newRegexp(I.Op.EMPTY_MATCH)}parseInternal(){if((this.flags&F.LITERAL)!==0)return Q.literalRegexp(this.wholeRegexp,this.flags);let e=-1,t=-1,n=-1,s=new XI(this.wholeRegexp);for(;s.more();){let i=-1;e:switch(s.peek()){case L.CODES["("]:if((this.flags&F.LOOKBEHIND)!==0){if(s.lookingAt("(?<=")){this.parsePosLookBehind(),s.skip(4);break}if(s.lookingAt("(?<!")){this.parseNegLookBehind(),s.skip(4);break}}if((this.flags&F.PERL_X)!==0&&s.lookingAt("(?")){this.parsePerlFlags(s);break}this.op(I.Op.LEFT_PAREN).cap=++this.numCap,s.skip(1);break;case L.CODES["|"]:this.parseVerticalBar(),s.skip(1);break;case L.CODES[")"]:this.parseRightParen(),s.skip(1);break;case L.CODES["^"]:(this.flags&F.ONE_LINE)!==0?this.op(I.Op.BEGIN_TEXT):this.op(I.Op.BEGIN_LINE),s.skip(1);break;case L.CODES.$:(this.flags&F.ONE_LINE)!==0?this.op(I.Op.END_TEXT).flags|=F.WAS_DOLLAR:this.op(I.Op.END_LINE),s.skip(1);break;case L.CODES["."]:(this.flags&F.DOT_NL)!==0?this.op(I.Op.ANY_CHAR):this.op(I.Op.ANY_CHAR_NOT_NL),s.skip(1);break;case L.CODES["["]:this.parseClass(s);break;case L.CODES["*"]:case L.CODES["+"]:case L.CODES["?"]:{i=s.pos();let a=null;switch(s.pop()){case L.CODES["*"]:a=I.Op.STAR;break;case L.CODES["+"]:a=I.Op.PLUS;break;case L.CODES["?"]:a=I.Op.QUEST}this.repeat(a,t,n,i,s,e);break}case L.CODES["{"]:{let a=s.pos(),u=Q.parseRepeat(s);if(u<0){s.rewindTo(a),this.literal(s.pop());break}i=a,t=u>>16,n=(u&J.MAX_BMP)<<16>>16,this.repeat(I.Op.REPEAT,t,n,i,s,e);break}case L.CODES["\\"]:{let a=s.pos();if(s.skip(1),(this.flags&F.PERL_X)!==0&&s.more())switch(s.pop()){case L.CODES.A:this.op(I.Op.BEGIN_TEXT);break e;case L.CODES.b:this.op(I.Op.WORD_BOUNDARY);break e;case L.CODES.B:this.op(I.Op.NO_WORD_BOUNDARY);break e;case L.CODES.C:throw new Ce(Q.ERR_INVALID_ESCAPE,"\\C");case L.CODES.Q:{let l=s.rest(),h=l.indexOf("\\E");h>=0?(l=l.substring(0,h),s.skipString(l),s.skipString("\\E")):s.skipString(l);let d=0;for(;d<l.length;){let C=l.codePointAt(d);this.literal(C),d+=U.charCount(C)}break e}case L.CODES.z:this.op(I.Op.END_TEXT);break e;default:s.rewindTo(a)}else s.rewindTo(a);let u=this.newRegexp(I.Op.CHAR_CLASS);if(u.flags=this.flags,s.lookingAt("\\p")||s.lookingAt("\\P")){let l=new or;if(this.parseUnicodeClass(s,l)){u.runes=l.toArray(),this.push(u);break e}}let c=new or;if(this.parsePerlClassEscape(s,c)){u.runes=c.toArray(),this.push(u);break e}s.rewindTo(a),this.reuse(u),this.literal(Q.parseEscape(s));break}default:this.literal(s.pop())}e=i}if(this.concat(),this.swapVerticalBar()&&this.pop(),this.alternate(),this.stack.length!==1)throw new Ce(Q.ERR_MISSING_PAREN,this.wholeRegexp);return this.stack[0].namedGroups=this.namedGroups,this.stack[0]}parsePerlFlags(e){let t=e.pos(),n=e.rest();if(n.startsWith("(?P<")||n.startsWith("(?<")){let u=n.charAt(2)==="P"?4:3,c=n.indexOf(">");if(c<0)throw new Ce(Q.ERR_INVALID_NAMED_CAPTURE,n);let l=n.substring(u,c);if(e.skipString(l),e.skip(u+1),!Q.isValidCaptureName(l))throw new Ce(Q.ERR_INVALID_NAMED_CAPTURE,n.substring(0,c+1));let h=this.op(I.Op.LEFT_PAREN);if(h.cap=++this.numCap,this.namedGroups[l])throw new Ce(Q.ERR_DUPLICATE_NAMED_CAPTURE,l);this.namedGroups[l]=this.numCap,h.name=l;return}e.skip(2);let s=this.flags,i=1,a=!1;e:for(;e.more();){let u=e.pop();switch(u){case L.CODES.i:s|=F.FOLD_CASE,a=!0;break;case L.CODES.m:s&=~F.ONE_LINE,a=!0;break;case L.CODES.s:s|=F.DOT_NL,a=!0;break;case L.CODES.U:s|=F.NON_GREEDY,a=!0;break;case L.CODES["-"]:if(i<0)break e;i=-1,s=~s,a=!1;break;case L.CODES[":"]:case L.CODES[")"]:if(i<0){if(!a)break e;s=~s}u===L.CODES[":"]&&this.op(I.Op.LEFT_PAREN),this.flags=s;return;default:break e}}throw new Ce(Q.ERR_INVALID_PERL_OP,e.from(t))}parsePosLookBehind(){let e=this.newRegexp(I.Op.LEFT_PAREN);return e.flags=this.flags,e.lb=++this.nlb,this.push(e)}parseNegLookBehind(){let e=this.newRegexp(I.Op.LEFT_PAREN);return e.flags=this.flags,e.lb=-++this.nlb,this.push(e)}parseVerticalBar(){this.concat(),this.swapVerticalBar()||this.op(I.Op.VERTICAL_BAR)}swapVerticalBar(){let e=this.stack.length;if(e>=3&&this.stack[e-2].op===I.Op.VERTICAL_BAR&&Q.isCharClass(this.stack[e-1])&&Q.isCharClass(this.stack[e-3])){let t=this.stack[e-1],n=this.stack[e-3];if(t.op>n.op){let s=n;n=t,t=s,this.stack[e-3]=n}return Q.mergeCharClass(n,t),this.reuse(t),this.pop(),!0}if(e>=2){let t=this.stack[e-1],n=this.stack[e-2];if(n.op===I.Op.VERTICAL_BAR)return e>=3&&this.cleanAlt(this.stack[e-3]),this.stack[e-2]=t,this.stack[e-1]=n,!0}return!1}parseRightParen(){if(this.concat(),this.swapVerticalBar()&&this.pop(),this.alternate(),this.stack.length<2)throw new Ce(Q.ERR_UNEXPECTED_PAREN,this.wholeRegexp);let e=this.pop(),t=this.pop();if(t.op!==I.Op.LEFT_PAREN)throw new Ce(Q.ERR_UNEXPECTED_PAREN,this.wholeRegexp);if(this.flags=t.flags,t.lb!==0){if(Q.hasCapture(e))throw new Ce(Q.ERR_INVALID_CAPTURE_IN_LOOKBEHIND,this.wholeRegexp);t.lb>0?t.op=I.Op.PLB:t.op=I.Op.NLB,t.subs=[e],this.push(t);return}t.cap===0?this.push(e):(t.op=I.Op.CAPTURE,t.subs=[e],this.push(t))}parsePerlClassEscape(e,t){let n=e.pos();if((this.flags&F.PERL_X)===0||!e.more()||e.pop()!==L.CODES["\\"]||!e.more())return!1;e.pop();let s=e.from(n),i=bg.has(s)?bg.get(s):null;return i===null?!1:(t.appendGroup(i,(this.flags&F.FOLD_CASE)!==0),!0)}parseNamedClass(e,t){let n=e.rest(),s=n.indexOf(":]");if(s<0)return!1;let i=n.substring(0,s+2);e.skipString(i);let a=Hg.has(i)?Hg.get(i):null;if(a===null)throw new Ce(Q.ERR_INVALID_CHAR_RANGE,i);return t.appendGroup(a,(this.flags&F.FOLD_CASE)!==0),!0}parseUnicodeClass(e,t){let n=e.pos();if((this.flags&F.UNICODE_GROUPS)===0||!e.lookingAt("\\p")&&!e.lookingAt("\\P"))return!1;e.skip(1);let s=1,i=e.pop();if(i===L.CODES.P&&(s=-1),!e.more())throw e.rewindTo(n),new Ce(Q.ERR_INVALID_CHAR_RANGE,e.rest());i=e.pop();let a;if(i!==L.CODES["{"])a=U.runeToString(i);else{let h=e.rest(),d=h.indexOf("}");if(d<0)throw e.rewindTo(n),new Ce(Q.ERR_INVALID_CHAR_RANGE,e.rest());a=h.substring(0,d),e.skipString(a),e.skip(1)}a.length!==0&&a.codePointAt(0)===L.CODES["^"]&&(s=0-s,a=a.substring(1));let u=Q.unicodeTable(a);if(u===null)throw new Ce(Q.ERR_INVALID_CHAR_RANGE,e.from(n));u.sign<0&&(s=0-s);let c=u.tab,l=u.fold;if((this.flags&F.FOLD_CASE)===0||l===null)t.appendTableWithSign(c,s);else{let h=new or().appendTable(c).appendTable(l).cleanClass().toArray();t.appendClassWithSign(Array.from(h),s)}return!0}parseClass(e){let t=e.pos();e.skip(1);let n=this.newRegexp(I.Op.CHAR_CLASS);n.flags=this.flags;let s=new or,i=1;e.more()&&e.lookingAt("^")&&(i=-1,e.skip(1),(this.flags&F.CLASS_NL)===0&&s.appendRange(L.CODES[`
`],L.CODES[`
`]));let a=!0;for(;!e.more()||e.peek()!==L.CODES["]"]||a;){if(e.more()&&e.lookingAt("-")&&(this.flags&F.PERL_X)===0&&!a){let h=e.rest();if(h==="-"||!h.startsWith("-]"))throw e.rewindTo(t),new Ce(Q.ERR_INVALID_CHAR_RANGE,e.rest())}a=!1;let u=e.pos();if(e.lookingAt("[:")){if(this.parseNamedClass(e,s))continue;e.rewindTo(u)}if(this.parseUnicodeClass(e,s)||this.parsePerlClassEscape(e,s))continue;e.rewindTo(u);let c=Q.parseClassChar(e,t),l=c;if(e.more()&&e.lookingAt("-")){if(e.skip(1),e.more()&&e.lookingAt("]"))e.skip(-1);else if(l=Q.parseClassChar(e,t),l<c)throw new Ce(Q.ERR_INVALID_CHAR_RANGE,e.from(u))}(this.flags&F.FOLD_CASE)===0?s.appendRange(c,l):s.appendFoldedRange(c,l)}e.skip(1),s.cleanClass(),i<0&&s.negateClass(),n.runes=s.toArray(),this.push(n)}},ZI=class cr{static initTest(e){let t=cr.compile(e),n=new cr(t.expr,t.prog,t.numSubexp,t.longest);return n.cond=t.cond,n.prefix=t.prefix,n.prefixUTF8=t.prefixUTF8,n.prefixComplete=t.prefixComplete,n.prefixRune=t.prefixRune,n.prefilter=t.prefilter,n.namedGroups=t.namedGroups,n}static compile(e){return cr.compileImpl(e,F.PERL,!1)}static compilePOSIX(e){return cr.compileImpl(e,F.POSIX,!0)}static compileImpl(e,t,n){let s=Vi.parse(e,t),i=s.maxCap(),a=s.namedGroups;s=nm.simplify(s);let u=QI.build(s),c=tm.compileRegexp(s),l=new cr(e,c,i,n);l.prefilter=u.type===se.Type.NONE?null:u;let[h,d]=c.prefix();return l.prefixComplete=h,l.prefix=d,l.prefixUTF8=U.stringToUtf8ByteArray(l.prefix),l.prefix.length>0&&(l.prefixRune=l.prefix.codePointAt(0)),l.namedGroups=a,l}static match(e,t){return cr.compile(e).match(t)}constructor(e,t,n=0,s=0){this.expr=e,this.prog=t,this.numSubexp=n,this.longest=s,this.cond=t.startCond(),this.prefix=null,this.prefixUTF8=null,this.prefixComplete=!1,this.prefixRune=0,this.namedGroups=Object.create(null),this.machinePool=[],this.lazyDFA=null,this.onepass=yg.compile(this.prog),this.prefilter=null}get dfa(){return this.lazyDFA===null&&(this.lazyDFA=new aB(this.prog)),this.lazyDFA}matchPrefixComplete(e,t,n,s){if((n===F.ANCHOR_START||n===F.ANCHOR_BOTH)&&t!==0)return null;let i=-1,a=-1,u=e.prefixLength(this);if(n===F.UNANCHORED){let c=e.index(this,t);if(c<0)return null;i=t+c,a=i+u}else if(n===F.ANCHOR_BOTH){if(e.endPos()!==u||e.index(this,0)!==0)return null;i=0,a=u}else if(n===F.ANCHOR_START){if(e.index(this,0)!==0)return null;i=0,a=u}if(i<0)return null;if(s>0){let c=new Int32Array(s).fill(-1);return c[0]=i,c[1]=a,Array.from(c)}return[]}createLookbehindState(){return this.prog.numLb>0?new VI(this.prog):null}executeEngine(e,t,n,s,i=null){if(this.prefixComplete&&(s===0||this.numSubexp===0))return this.matchPrefixComplete(e,t,n,s);if(this.prefilter!==null&&n===F.UNANCHORED&&!this.prefilter.eval(e,t))return null;if(this.onepass!==null)return yg.execute(this,e,t,n,s);if(s>0)return this.prog.numLb===0&&e.endPos()<=$o.maxBitStateLen(this.prog)?$o.execute(this,e,t,n,s):this.doExecuteNFA(e,t,n,s,i);if(this.prog.numLb===0){let a=this.dfa.match(e,t,n);if(a!==null)return a?[]:null;if(e.endPos()<=$o.maxBitStateLen(this.prog))return $o.execute(this,e,t,n,s)}return this.doExecuteNFA(e,t,n,s,i)}numberOfCapturingGroups(){return this.numSubexp}numberOfInstructions(){return this.prog.numInst()}get(){return this.machinePool.length>0?this.machinePool.pop():null}reset(){this.machinePool.length=0}put(e){this.machinePool.push(e)}toString(){return this.expr}doExecuteNFA(e,t,n,s,i=null){let a=this.get();a||(a=Yg.fromRE2(this)),a.init(s);let u=a.match(e,t,n,i)?a.submatches():null;return this.put(a),u}match(e){return this.executeEngine(pe.fromUTF16(e),0,F.UNANCHORED,0)!==null}matchWithGroup(e,t,n,s,i,a=null){return e instanceof hr||(U.isByteArray(e)?e=Br.utf8(e):e=Br.utf16(e)),this.matchMachineInput(e,t,n,s,i,a)}matchMachineInput(e,t,n,s,i,a=null){if(t>n)return[!1,null];let u=e.isUTF16Encoding()?pe.fromUTF16(e.asCharSequence(),0,n):pe.fromUTF8(e.asBytes(),0,n),c=this.executeEngine(u,t,s,2*i,a);return c===null?[!1,null]:[!0,c]}matchUTF8(e){return this.executeEngine(pe.fromUTF8(e),0,F.UNANCHORED,0)!==null}replaceAll(e,t){return this.replaceAllFunc(e,()=>t,2*e.length+1)}replaceFirst(e,t){return this.replaceAllFunc(e,()=>t,1)}replaceAllFunc(e,t,n){let s=0,i=0,a="",u=pe.fromUTF16(e),c=this.createLookbehindState(),l=0;for(;i<=e.length;){let h=this.executeEngine(u,i,F.UNANCHORED,2,c);if(h===null||h.length===0)break;a+=e.substring(s,h[0]),(h[1]>s||h[0]===0)&&(a+=t(e.substring(h[0],h[1])),l++),s=h[1];let d=u.step(i)&7;if(i+d>h[1]?i+=d:i+1>h[1]?i++:i=h[1],l>=n)break}return a+=e.substring(s),a}pad(e){if(e===null)return null;let t=(1+this.numSubexp)*2;if(e.length<t){let n=new Array(t).fill(-1);for(let s=0;s<e.length;s++)n[s]=e[s];e=n}return e}allMatches(e,t,n=s=>s){let s=[],i=e.endPos();t<0&&(t=i+1);let a=0,u=0,c=-1,l=this.createLookbehindState();for(;u<t&&a<=i;){let h=this.executeEngine(e,a,F.UNANCHORED,this.prog.numCap,l);if(h===null||h.length===0)break;let d=!0;if(h[1]===a){h[0]===c&&(d=!1);let C=e.step(a);C<0?a=i+1:a+=C&7}else a=h[1];c=h[1],d&&(s.push(n(this.pad(h))),u++)}return s}findUTF8(e){let t=this.executeEngine(pe.fromUTF8(e),0,F.UNANCHORED,2);return t===null?null:e.slice(t[0],t[1])}findUTF8Index(e){let t=this.executeEngine(pe.fromUTF8(e),0,F.UNANCHORED,2);return t===null?null:t.slice(0,2)}find(e){let t=this.executeEngine(pe.fromUTF16(e),0,F.UNANCHORED,2);return t===null?"":e.substring(t[0],t[1])}findIndex(e){return this.executeEngine(pe.fromUTF16(e),0,F.UNANCHORED,2)}findUTF8Submatch(e){let t=this.executeEngine(pe.fromUTF8(e),0,F.UNANCHORED,this.prog.numCap);if(t===null)return null;let n=new Array(1+this.numSubexp).fill(null);for(let s=0;s<n.length;s++)2*s<t.length&&t[2*s]>=0&&(n[s]=e.slice(t[2*s],t[2*s+1]));return n}findUTF8SubmatchIndex(e){return this.pad(this.executeEngine(pe.fromUTF8(e),0,F.UNANCHORED,this.prog.numCap))}findSubmatch(e){let t=this.executeEngine(pe.fromUTF16(e),0,F.UNANCHORED,this.prog.numCap);if(t===null)return null;let n=new Array(1+this.numSubexp).fill(null);for(let s=0;s<n.length;s++)2*s<t.length&&t[2*s]>=0&&(n[s]=e.substring(t[2*s],t[2*s+1]));return n}findSubmatchIndex(e){return this.pad(this.executeEngine(pe.fromUTF16(e),0,F.UNANCHORED,this.prog.numCap))}findAllUTF8(e,t){let n=this.allMatches(pe.fromUTF8(e),t,s=>e.slice(s[0],s[1]));return n.length===0?null:n}findAllUTF8Index(e,t){let n=this.allMatches(pe.fromUTF8(e),t,s=>s.slice(0,2));return n.length===0?null:n}findAll(e,t){let n=this.allMatches(pe.fromUTF16(e),t,s=>e.substring(s[0],s[1]));return n.length===0?null:n}findAllIndex(e,t){let n=this.allMatches(pe.fromUTF16(e),t,s=>s.slice(0,2));return n.length===0?null:n}findAllUTF8Submatch(e,t){let n=this.allMatches(pe.fromUTF8(e),t,s=>{let i=new Array(s.length/2|0).fill(null);for(let a=0;a<i.length;a++)s[2*a]>=0&&(i[a]=e.slice(s[2*a],s[2*a+1]));return i});return n.length===0?null:n}findAllUTF8SubmatchIndex(e,t){let n=this.allMatches(pe.fromUTF8(e),t);return n.length===0?null:n}findAllSubmatch(e,t){let n=this.allMatches(pe.fromUTF16(e),t,s=>{let i=new Array(s.length/2|0).fill(null);for(let a=0;a<i.length;a++)s[2*a]>=0&&(i[a]=e.substring(s[2*a],s[2*a+1]));return i});return n.length===0?null:n}findAllSubmatchIndex(e,t){let n=this.allMatches(pe.fromUTF16(e),t);return n.length===0?null:n}},Av=class lr{static UNANCHORED=F.UNANCHORED;static ANCHOR_START=F.ANCHOR_START;static ANCHOR_BOTH=F.ANCHOR_BOTH;constructor(e=lr.UNANCHORED,t=0,n=8388608){if(![lr.UNANCHORED,lr.ANCHOR_START,lr.ANCHOR_BOTH].includes(e))throw new Jg("The anchor should be RE2Set.UNANCHORED, RE2Set.ANCHOR_START or RE2Set.ANCHOR_BOTH");U.checkFlags(t),this.anchor=e,this.jsFlags=t,this.maxMem=n;let s=F.PERL;(t&ze.DISABLE_UNICODE_GROUPS)!==0&&(s&=~F.UNICODE_GROUPS),(t&ze.LOOKBEHINDS)!==0&&(s|=F.LOOKBEHIND),this.re2Flags=s,this.regexps=[],this.prog=null,this.dfa=null,this.dummyRe2=null}add(e){if(this.prog)throw new Mi("Cannot add patterns after compile");U.checkPattern(e);let t=e;(this.jsFlags&ze.CASE_INSENSITIVE)!==0&&(t=`(?i)${t}`),(this.jsFlags&ze.DOTALL)!==0&&(t=`(?s)${t}`),(this.jsFlags&ze.MULTILINE)!==0&&(t=`(?m)${t}`);let n=Vi.parse(t,this.re2Flags);return this.regexps.push(nm.simplify(n)),this.regexps.length-1}compile(){if(this.prog)return;let e=tm.compileSet(this.regexps);if(e.numInst()>Vi.MAX_SIZE)throw new Mi(`${Vi.ERR_LARGE}: the set compiles to ${e.numInst()} instructions, more than ${Vi.MAX_SIZE}`);this.prog=e,this.dfa=new aB(this.prog,this.maxMem),this.dummyRe2={prog:this.prog,cond:this.prog.startCond(),prefix:"",prefixRune:0,longest:!1}}match(e){this.prog||this.compile();let t=U.isByteArray(e)?pe.fromUTF8(e):pe.fromUTF16(e),n=F.UNANCHORED;this.anchor===lr.ANCHOR_START?n=F.ANCHOR_START:this.anchor===lr.ANCHOR_BOTH&&(n=F.ANCHOR_BOTH);let s=this.dfa.matchSet(t,0,n);if(s!==null)return s;let i=Yg.fromRE2(this.dummyRe2);return i.init(0),i.matchSet(t,0,n)}},eT=class as{static isHexadecimal(e){return"0"<=e&&e<="9"||"A"<=e&&e<="F"||"a"<=e&&e<="f"}static translate(e){let t="";if(Object.prototype.toString.call(e)==="[object RegExp]"&&(e.ignoreCase&&(t+="i"),e.multiline&&(t+="m"),e.dotAll&&(t+="s"),e=e.source),typeof e!="string")return e;let n="",s=!1,i=e.length;i===0&&(n="(?:)",s=!0);let a=!1,u=0;for(;u<i;){let l=e[u];if(l==="\\"){if(u+1<i)switch(l=e[u+1],l){case"\\":n+="\\\\",u+=2;continue;case"c":if(u+2<i){let C=e[u+2].charCodeAt(0);if(C>=65&&C<=90||C>=97&&C<=122){let y=C%32;n+="\\x",n+=(y>>4).toString(16).toUpperCase(),n+=(y&15).toString(16).toUpperCase(),u+=3,s=!0;continue}}n+="c",u+=2,s=!0;continue;case"u":if(u+2<i){if(e[u+2]==="{"){let C=u+3,y=!1,D=!1;for(;C<i;){let P=e[C];if(P==="}"){D=!0;break}if(!as.isHexadecimal(P))break;y=!0,C++}if(D&&y){n+="\\x",u+=2,s=!0;continue}}else if(u+5<i){let C=!0;for(let y=0;y<4;y++)if(!as.isHexadecimal(e[u+2+y])){C=!1;break}if(C){n+="\\x{"+e.substring(u+2,u+6)+"}",u+=6,s=!0;continue}}}n+="u",u+=2,s=!0;continue;case"x":{let C=!1;if(u+2<i&&e[u+2]==="{"){let y=u+3,D=!1,P=!1;for(;y<i;){let V=e[y];if(V==="}"){P=!0;break}if(!as.isHexadecimal(V))break;D=!0,y++}P&&D&&(C=!0)}else u+3<i&&as.isHexadecimal(e[u+2])&&as.isHexadecimal(e[u+3])&&(C=!0);C?(n+="\\x",u+=2):(n+="x",u+=2,s=!0);continue}case"n":case"r":case"t":case"a":case"f":case"v":case"d":case"D":case"s":case"S":case"w":case"W":case"b":case"B":case"p":case"P":case"A":case"z":case"Q":case"E":case"0":case"1":case"2":case"3":case"4":case"5":case"6":case"7":n+="\\"+l,u+=2;continue;default:{let C=e.codePointAt(u+1);if(C>=48&&C<=57||C>=65&&C<=90||C>=97&&C<=122){let y=U.charCount(C);n+=e.substring(u+1,u+1+y),u+=y+1,s=!0}else{n+="\\";let y=U.charCount(C);n+=e.substring(u+1,u+1+y),u+=y+1}continue}}}else if(l==="/"){n+="\\/",u+=1,s=!0;continue}else if(l==="["){if(!a&&e[u+1]==="]"){n+="[^\\x00-\\x{10FFFF}]",u+=2,s=!0;continue}if(!a&&e[u+1]==="^"&&e[u+2]==="]"){n+="[\\x00-\\x{10FFFF}]",u+=3,s=!0;continue}a=!0}else if(l==="]")a=!1;else if(!a&&l==="("&&u+2<i&&e[u+1]==="?"&&e[u+2]==="<"&&u+3<i&&!"=!>)".includes(e[u+3])){n+="(?P<",u+=3,s=!0;continue}let h=e.codePointAt(u),d=U.charCount(h);n+=e.substring(u,u+d),u+=d}let c=s?n:e;return t.length>0?`(?${t})${c}`:c}},qg=(r,e)=>{let t=r.matchArray();return t.index=r.start(0),t.input=e,t.groups=r.namedGroupsObject(),t},eu=class Jt{static CASE_INSENSITIVE=ze.CASE_INSENSITIVE;static DOTALL=ze.DOTALL;static MULTILINE=ze.MULTILINE;static DISABLE_UNICODE_GROUPS=ze.DISABLE_UNICODE_GROUPS;static LONGEST_MATCH=ze.LONGEST_MATCH;static LOOKBEHINDS=ze.LOOKBEHINDS;static quote(e){return U.quoteMeta(e)}static quoteReplacement(e,t=!1){return Cg.quoteReplacement(e,t)}static translateRegExp(e){return eT.translate(e)}static compile(e,t=0){U.checkPattern(e),U.checkFlags(t);let n=e;(t&Jt.CASE_INSENSITIVE)!==0&&(n=`(?i)${n}`),(t&Jt.DOTALL)!==0&&(n=`(?s)${n}`),(t&Jt.MULTILINE)!==0&&(n=`(?m)${n}`);let s=F.PERL;(t&Jt.DISABLE_UNICODE_GROUPS)!==0&&(s&=~F.UNICODE_GROUPS),(t&Jt.LOOKBEHINDS)!==0&&(s|=F.LOOKBEHIND);let i=new Jt(e,t);return i.re2Input=ZI.compileImpl(n,s,(t&Jt.LONGEST_MATCH)!==0),i}static matches(e,t){return Jt.compile(e).testExact(t)}static initTest(e,t,n){if(e==null)throw new Error("pattern is null");if(n==null)throw new Error("re2 is null");let s=new Jt(e,t);return s.re2Input=n,s}constructor(e,t){this.patternInput=e,this.flagsInput=t,this.re2Input=null}reset(){this.re2Input.reset()}flags(){return this.flagsInput}pattern(){return this.patternInput}re2(){return this.re2Input}matches(e){return this.testExact(e)}matcher(e){return U.isByteArray(e)&&(e=Br.utf8(e)),new Cg(this,e)}test(e){return U.isByteArray(e)?this.re2Input.matchUTF8(e):this.re2Input.match(e)}testExact(e){let t=U.isByteArray(e)?pe.fromUTF8(e):pe.fromUTF16(e);return this.re2Input.executeEngine(t,0,F.ANCHOR_BOTH,0)!==null}exec(e){let t=this.matcher(e);return t.find()?qg(t,e):null}split(e,t=0){let n=this.matcher(e),s=[],i=0,a=0;for(;n.find();){if(a===0&&n.end()===0){a=n.end();continue}if(t>0&&s.length===t-1)break;if(a===n.start()){if(t===0){i+=1,a=n.end();continue}}else for(;i>0;)s.push(""),i-=1;s.push(n.substring(a,n.start())),a=n.end()}if(t===0&&a!==n.inputLength()){for(;i>0;)s.push(""),i-=1;s.push(n.substring(a,n.inputLength()))}return(t!==0||s.length===0&&!(a===n.inputLength()&&a>0))&&s.push(n.substring(a,n.inputLength())),s}*matchAll(e){let t=this.matcher(e);for(;t.find();)yield qg(t,e)}toString(){return this.patternInput}programSize(){return this.re2Input.numberOfInstructions()}groupCount(){return this.re2Input.numberOfCapturingGroups()}namedGroups(){return this.re2Input.namedGroups}equals(e){return this===e?!0:e===null||this.constructor!==e.constructor?!1:this.flagsInput===e.flagsInput&&this.patternInput===e.patternInput}};/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var zs="13.3.0";function Hm(r){zs=r}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var Er=new Rn("@firebase/firestore");function os(){return Er.logLevel}function K(r,...e){if(Er.logLevel<=ae.DEBUG){let t=e.map(ud);Er.debug(`Firestore (${zs}): ${r}`,...t)}}function gn(r,...e){if(Er.logLevel<=ae.ERROR){let t=e.map(ud);Er.error(`Firestore (${zs}): ${r}`,...t)}}function Pt(r,...e){if(Er.logLevel<=ae.WARN){let t=e.map(ud);Er.warn(`Firestore (${zs}): ${r}`,...t)}}function ud(r){if(typeof r=="string")return r;try{return(function(t){return JSON.stringify(t)})(r)}catch{return r}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function $(r,e,t){let n="Unexpected state";typeof e=="string"?n=e:t=e,qm(r,n,t)}function qm(r,e,t){let n=`FIRESTORE (${zs}) INTERNAL ASSERTION FAILED: ${e} (ID: ${r.toString(16)})`;if(t!==void 0)try{n+=" CONTEXT: "+JSON.stringify(t)}catch{n+=" CONTEXT: "+t}throw gn(n),new Error(n)}function z(r,e,t,n){let s="Unexpected state";typeof t=="string"?s=t:n=t,r||qm(e,s,n)}function ne(r,e){return r}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function tT(r){let e=typeof self<"u"&&(self.crypto||self.msCrypto),t=new Uint8Array(r);if(e&&typeof e.getRandomValues=="function")e.getRandomValues(t);else for(let n=0;n<r;n++)t[n]=Math.floor(256*Math.random());return t}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var gs=class{static newId(){let e="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",t=62*Math.floor(4.129032258064516),n="";for(;n.length<20;){let s=tT(40);for(let i=0;i<s.length;++i)n.length<20&&s[i]<t&&(n+=e.charAt(s[i]%62))}return n}};function ie(r,e){return r<e?-1:r>e?1:0}function Xi(r,e){let t=Math.min(r.length,e.length);for(let n=0;n<t;n++){let s=r.charAt(n),i=e.charAt(n);if(s!==i)return uB(s)===uB(i)?ie(s,i):uB(s)?1:-1}return ie(r.length,e.length)}var nT=55296,rT=57343;function uB(r){let e=r.charCodeAt(0);return e>=nT&&e<=rT}function ms(r,e,t){return r.length===e.length&&r.every(((n,s)=>t(n,e[s])))}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var we=class r{constructor(e,t){this.comparator=e,this.root=t||$t.EMPTY}insert(e,t){return new r(this.comparator,this.root.insert(e,t,this.comparator).copy(null,null,$t.BLACK,null,null))}remove(e){return new r(this.comparator,this.root.remove(e,this.comparator).copy(null,null,$t.BLACK,null,null))}get(e){let t=this.root;for(;!t.isEmpty();){let n=this.comparator(e,t.key);if(n===0)return t.value;n<0?t=t.left:n>0&&(t=t.right)}return null}indexOf(e){let t=0,n=this.root;for(;!n.isEmpty();){let s=this.comparator(e,n.key);if(s===0)return t+n.left.size;s<0?n=n.left:(t+=n.left.size+1,n=n.right)}return-1}isEmpty(){return this.root.isEmpty()}get size(){return this.root.size}minKey(){return this.root.minKey()}maxKey(){return this.root.maxKey()}inorderTraversal(e){return this.root.inorderTraversal(e)}forEach(e){this.inorderTraversal(((t,n)=>(e(t,n),!1)))}toString(){let e=[];return this.inorderTraversal(((t,n)=>(e.push(`${t}:${n}`),!1))),`{${e.join(", ")}}`}reverseTraversal(e){return this.root.reverseTraversal(e)}getIterator(){return new hs(this.root,null,this.comparator,!1)}getIteratorFrom(e){return new hs(this.root,e,this.comparator,!1)}getReverseIterator(){return new hs(this.root,null,this.comparator,!0)}getReverseIteratorFrom(e){return new hs(this.root,e,this.comparator,!0)}},hs=class{constructor(e,t,n,s){this.isReverse=s,this.nodeStack=[];let i=1;for(;!e.isEmpty();)if(i=t?n(e.key,t):1,t&&s&&(i*=-1),i<0)e=this.isReverse?e.left:e.right;else{if(i===0){this.nodeStack.push(e);break}this.nodeStack.push(e),e=this.isReverse?e.right:e.left}}getNext(){let e=this.nodeStack.pop(),t={key:e.key,value:e.value};if(this.isReverse)for(e=e.left;!e.isEmpty();)this.nodeStack.push(e),e=e.right;else for(e=e.right;!e.isEmpty();)this.nodeStack.push(e),e=e.left;return t}hasNext(){return this.nodeStack.length>0}peek(){if(this.nodeStack.length===0)return null;let e=this.nodeStack[this.nodeStack.length-1];return{key:e.key,value:e.value}}},$t=class r{constructor(e,t,n,s,i){this.key=e,this.value=t,this.color=n??r.RED,this.left=s??r.EMPTY,this.right=i??r.EMPTY,this.size=this.left.size+1+this.right.size}copy(e,t,n,s,i){return new r(e??this.key,t??this.value,n??this.color,s??this.left,i??this.right)}isEmpty(){return!1}inorderTraversal(e){return this.left.inorderTraversal(e)||e(this.key,this.value)||this.right.inorderTraversal(e)}reverseTraversal(e){return this.right.reverseTraversal(e)||e(this.key,this.value)||this.left.reverseTraversal(e)}min(){return this.left.isEmpty()?this:this.left.min()}minKey(){return this.min().key}maxKey(){return this.right.isEmpty()?this.key:this.right.maxKey()}insert(e,t,n){let s=this,i=n(e,s.key);return s=i<0?s.copy(null,null,null,s.left.insert(e,t,n),null):i===0?s.copy(null,t,null,null,null):s.copy(null,null,null,null,s.right.insert(e,t,n)),s.fixUp()}removeMin(){if(this.left.isEmpty())return r.EMPTY;let e=this;return e.left.isRed()||e.left.left.isRed()||(e=e.moveRedLeft()),e=e.copy(null,null,null,e.left.removeMin(),null),e.fixUp()}remove(e,t){let n,s=this;if(t(e,s.key)<0)s.left.isEmpty()||s.left.isRed()||s.left.left.isRed()||(s=s.moveRedLeft()),s=s.copy(null,null,null,s.left.remove(e,t),null);else{if(s.left.isRed()&&(s=s.rotateRight()),s.right.isEmpty()||s.right.isRed()||s.right.left.isRed()||(s=s.moveRedRight()),t(e,s.key)===0){if(s.right.isEmpty())return r.EMPTY;n=s.right.min(),s=s.copy(n.key,n.value,null,null,s.right.removeMin())}s=s.copy(null,null,null,null,s.right.remove(e,t))}return s.fixUp()}isRed(){return this.color}fixUp(){let e=this;return e.right.isRed()&&!e.left.isRed()&&(e=e.rotateLeft()),e.left.isRed()&&e.left.left.isRed()&&(e=e.rotateRight()),e.left.isRed()&&e.right.isRed()&&(e=e.colorFlip()),e}moveRedLeft(){let e=this.colorFlip();return e.right.left.isRed()&&(e=e.copy(null,null,null,null,e.right.rotateRight()),e=e.rotateLeft(),e=e.colorFlip()),e}moveRedRight(){let e=this.colorFlip();return e.left.left.isRed()&&(e=e.rotateRight(),e=e.colorFlip()),e}rotateLeft(){let e=this.copy(null,null,r.RED,null,this.right.left);return this.right.copy(null,null,this.color,e,null)}rotateRight(){let e=this.copy(null,null,r.RED,this.left.right,null);return this.left.copy(null,null,this.color,null,e)}colorFlip(){let e=this.left.copy(null,null,!this.left.color,null,null),t=this.right.copy(null,null,!this.right.color,null,null);return this.copy(null,null,!this.color,e,t)}checkMaxDepth(){let e=this.check();return Math.pow(2,e)<=this.size+1}check(){if(this.isRed()&&this.left.isRed())throw $(43730,{key:this.key,value:this.value});if(this.right.isRed())throw $(14113,{key:this.key,value:this.value});let e=this.left.check();if(e!==this.right.check())throw $(27949);return e+(this.isRed()?0:1)}};$t.EMPTY=null,$t.RED=!0,$t.BLACK=!1;$t.EMPTY=new class{constructor(){this.size=0}get key(){throw $(57766)}get value(){throw $(16141)}get color(){throw $(16727)}get left(){throw $(29726)}get right(){throw $(36894)}copy(e,t,n,s,i){return this}insert(e,t,n){return new $t(e,t)}remove(e,t){return this}isEmpty(){return!0}inorderTraversal(e){return!1}reverseTraversal(e){return!1}minKey(){return null}maxKey(){return null}isRed(){return!1}checkMaxDepth(){return!0}check(){return 0}};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var Fe=class r{constructor(e){this.comparator=e,this.data=new we(this.comparator)}has(e){return this.data.get(e)!==null}first(){return this.data.minKey()}last(){return this.data.maxKey()}get size(){return this.data.size}indexOf(e){return this.data.indexOf(e)}forEach(e){this.data.inorderTraversal(((t,n)=>(e(t),!1)))}forEachInRange(e,t){let n=this.data.getIteratorFrom(e[0]);for(;n.hasNext();){let s=n.getNext();if(this.comparator(s.key,e[1])>=0)return;t(s.key)}}forEachWhile(e,t){let n;for(n=t!==void 0?this.data.getIteratorFrom(t):this.data.getIterator();n.hasNext();)if(!e(n.getNext().key))return}firstAfterOrEqual(e){let t=this.data.getIteratorFrom(e);return t.hasNext()?t.getNext().key:null}getIterator(){return new lu(this.data.getIterator())}getIteratorFrom(e){return new lu(this.data.getIteratorFrom(e))}add(e){return this.copy(this.data.remove(e).insert(e,!0))}delete(e){return this.has(e)?this.copy(this.data.remove(e)):this}isEmpty(){return this.data.isEmpty()}unionWith(e){let t=this;return t.size<e.size&&(t=e,e=this),e.forEach((n=>{t=t.add(n)})),t}isEqual(e){if(!(e instanceof r)||this.size!==e.size)return!1;let t=this.data.getIterator(),n=e.data.getIterator();for(;t.hasNext();){let s=t.getNext().key,i=n.getNext().key;if(this.comparator(s,i)!==0)return!1}return!0}toArray(){let e=[];return this.forEach((t=>{e.push(t)})),e}toString(){let e=[];return this.forEach((t=>e.push(t))),"SortedSet("+e.toString()+")"}copy(e){let t=new r(this.comparator);return t.data=e,t}},lu=class{constructor(e){this.iter=e}getNext(){return this.iter.getNext().key}hasNext(){return this.iter.hasNext()}};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var k={OK:"ok",CANCELLED:"cancelled",UNKNOWN:"unknown",INVALID_ARGUMENT:"invalid-argument",DEADLINE_EXCEEDED:"deadline-exceeded",NOT_FOUND:"not-found",ALREADY_EXISTS:"already-exists",PERMISSION_DENIED:"permission-denied",UNAUTHENTICATED:"unauthenticated",RESOURCE_EXHAUSTED:"resource-exhausted",FAILED_PRECONDITION:"failed-precondition",ABORTED:"aborted",OUT_OF_RANGE:"out-of-range",UNIMPLEMENTED:"unimplemented",INTERNAL:"internal",UNAVAILABLE:"unavailable",DATA_LOSS:"data-loss"},j=class extends Ct{constructor(e,t){super(e,t),this.code=e,this.message=t,this.toString=()=>`${this.name}: [code=${this.code}]: ${this.message}`}};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var Es="__name__",Bu=class r{constructor(e,t,n){t===void 0?t=0:t>e.length&&$(637,{offset:t,range:e.length}),n===void 0?n=e.length-t:n>e.length-t&&$(1746,{length:n,range:e.length-t}),this.segments=e,this.offset=t,this.len=n}get length(){return this.len}isEqual(e){return r.comparator(this,e)===0}child(e){let t=this.segments.slice(this.offset,this.limit());return e instanceof r?e.forEach((n=>{t.push(n)})):t.push(e),this.construct(t)}limit(){return this.offset+this.length}popFirst(e){return e=e===void 0?1:e,this.construct(this.segments,this.offset+e,this.length-e)}popLast(){return this.construct(this.segments,this.offset,this.length-1)}firstSegment(){return this.segments[this.offset]}lastSegment(){return this.get(this.length-1)}get(e){return this.segments[this.offset+e]}isEmpty(){return this.length===0}isPrefixOf(e){if(e.length<this.length)return!1;for(let t=0;t<this.length;t++)if(this.get(t)!==e.get(t))return!1;return!0}isImmediateParentOf(e){if(this.length+1!==e.length)return!1;for(let t=0;t<this.length;t++)if(this.get(t)!==e.get(t))return!1;return!0}forEach(e){for(let t=this.offset,n=this.limit();t<n;t++)e(this.segments[t])}toArray(){return this.segments.slice(this.offset,this.limit())}static comparator(e,t){let n=Math.min(e.length,t.length);for(let s=0;s<n;s++){let i=r.compareSegments(e.get(s),t.get(s));if(i!==0)return i}return ie(e.length,t.length)}static compareSegments(e,t){let n=r.isNumericId(e),s=r.isNumericId(t);return n&&!s?-1:!n&&s?1:n&&s?r.extractNumericId(e).compare(r.extractNumericId(t)):Xi(e,t)}static isNumericId(e){return e.startsWith("__id")&&e.endsWith("__")}static extractNumericId(e){return cn.fromString(e.substring(4,e.length-2))}},he=class r extends Bu{construct(e,t,n){return new r(e,t,n)}canonicalString(){return this.toArray().join("/")}toString(){return this.canonicalString()}toStringWithLeadingSlash(){return`/${this.canonicalString()}`}toUriEncodedString(){return this.toArray().map(encodeURIComponent).join("/")}static fromString(...e){let t=[];for(let n of e){if(n.indexOf("//")>=0)throw new j(k.INVALID_ARGUMENT,`Invalid segment (${n}). Paths must not contain // in them.`);t.push(...n.split("/").filter((s=>s.length>0)))}return new r(t)}static emptyPath(){return new r([])}},sT=/^[_a-zA-Z][_a-zA-Z0-9]*$/,ht=class us extends Bu{construct(e,t,n){return new us(e,t,n)}static isValidIdentifier(e){return sT.test(e)}canonicalString(){return this.toArray().map((e=>(e=e.replace(/\\/g,"\\\\").replace(/`/g,"\\`"),us.isValidIdentifier(e)||(e="`"+e+"`"),e))).join(".")}toString(){return this.canonicalString()}isKeyField(){return this.length===1&&this.get(0)===Es}static keyField(){return new us([Es])}static fromServerFormat(e){let t=[],n="",s=0,i=()=>{if(n.length===0)throw new j(k.INVALID_ARGUMENT,`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`);t.push(n),n=""},a=!1;for(;s<e.length;){let u=e[s];if(u==="\\"){if(s+1===e.length)throw new j(k.INVALID_ARGUMENT,"Path has trailing escape character: "+e);let c=e[s+1];if(c!=="\\"&&c!=="."&&c!=="`")throw new j(k.INVALID_ARGUMENT,"Path has invalid escape sequence: "+e);n+=c,s+=2}else u==="`"?(a=!a,s++):u!=="."||a?(n+=u,s++):(i(),s++)}if(i(),a)throw new j(k.INVALID_ARGUMENT,"Unterminated ` in path: "+e);return new us(t)}static emptyPath(){return new us([])}};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var St=class r{constructor(e){this.fields=e,e.sort(ht.comparator)}static empty(){return new r([])}unionWith(e){let t=new Fe(ht.comparator);for(let n of this.fields)t=t.add(n);for(let n of e)t=t.add(n);return new r(t.toArray())}covers(e){for(let t of this.fields)if(t.isPrefixOf(e))return!0;return!1}isEqual(e){return ms(this.fields,e.fields,((t,n)=>t.isEqual(n)))}};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function _r(r){let e=0;for(let t in r)Object.prototype.hasOwnProperty.call(r,t)&&e++;return e}function jn(r,e){for(let t in r)Object.prototype.hasOwnProperty.call(r,t)&&e(t,r[t])}function jm(r,e){let t=[];for(let n in r)Object.prototype.hasOwnProperty.call(r,n)&&t.push(e(r[n],n,r));return t}function Km(r){for(let e in r)if(Object.prototype.hasOwnProperty.call(r,e))return!1;return!0}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var X=class r{constructor(e){this.path=e}static fromPath(e){return new r(he.fromString(e))}static fromName(e){return new r(he.fromString(e).popFirst(5))}static empty(){return new r(he.emptyPath())}get collectionGroup(){return this.path.popLast().lastSegment()}hasCollectionId(e){return this.path.length>=2&&this.path.get(this.path.length-2)===e}getCollectionGroup(){return this.path.get(this.path.length-2)}getCollectionPath(){return this.path.popLast()}isEqual(e){return e!==null&&he.comparator(this.path,e.path)===0}toString(){return this.path.toString()}static comparator(e,t){return he.comparator(e.path,t.path)}static isDocumentKey(e){return e.length%2==0}static fromSegments(e){return new r(new he(e.slice()))}};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Jm(r,e,t){if(!t)throw new j(k.INVALID_ARGUMENT,`Function ${r}() cannot be called with an empty ${e}.`)}function zm(r,e,t,n){if(e===!0&&n===!0)throw new j(k.INVALID_ARGUMENT,`${r} and ${t} cannot be used together.`)}function rm(r){if(!X.isDocumentKey(r))throw new j(k.INVALID_ARGUMENT,`Invalid document reference. Document references must have an even number of segments, but ${r} has ${r.length}.`)}function sm(r){if(X.isDocumentKey(r))throw new j(k.INVALID_ARGUMENT,`Invalid collection reference. Collection references must have an odd number of segments, but ${r} has ${r.length}.`)}function va(r){return typeof r=="object"&&r!==null&&(Object.getPrototypeOf(r)===Object.prototype||Object.getPrototypeOf(r)===null)}function ic(r){if(r===void 0)return"undefined";if(r===null)return"null";if(typeof r=="string")return r.length>20&&(r=`${r.substring(0,20)}...`),JSON.stringify(r);if(typeof r=="number"||typeof r=="boolean")return""+r;if(typeof r=="object"){if(r instanceof Array)return"an array";{let e=(function(n){return n.constructor?n.constructor.name:null})(r);return e?`a custom ${e} object`:"an object"}}return typeof r=="function"?"a function":$(12329,{type:typeof r})}function Mt(r,e){if("_delegate"in r&&(r=r._delegate),!(r instanceof e)){if(e.name===r.constructor.name)throw new j(k.INVALID_ARGUMENT,"Type does not match the expected instance. Did you pass a reference from a different Firestore SDK?");{let t=ic(r);throw new j(k.INVALID_ARGUMENT,`Expected type '${e.name}', but it was: ${t}`)}}return r}/**
 * @license
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ae(r,e){let t={typeString:r};return e&&(t.value=e),t}function Ra(r,e){if(!va(r))throw new j(k.INVALID_ARGUMENT,"JSON must be an object");let t;for(let n in e)if(e[n]){let s=e[n].typeString,i="value"in e[n]?{value:e[n].value}:void 0,a=e[n].optional;if(!(n in r)){if(a)continue;t=`JSON missing required field: '${n}'`;break}let u=r[n];if(s&&typeof u!==s){t=`JSON field '${n}' must be a ${s}.`;break}if(i!==void 0&&u!==i.value){t=`Expected '${n}' field to equal '${i.value}'`;break}}if(t)throw new j(k.INVALID_ARGUMENT,t);return!0}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var im=-62135596800,am=1e6,ye=class r{static now(){return r.fromMillis(Date.now())}static fromDate(e){return r.fromMillis(e.getTime())}static fromMillis(e){let t=Math.floor(e/1e3),n=Math.floor((e-1e3*t)*am);return new r(t,n)}static fromInstant(e){if(!e||typeof e.t!="bigint")throw new j(k.INVALID_ARGUMENT,"Invalid Temporal.Instant object provided.");return r._fromEpochNanoseconds(e.t)}static _fromEpochNanoseconds(e){let t,n;if(e>=0n)t=Number(e/1000000000n),n=Number(e%1000000000n);else{let s=e%1000000000n;s===0n?(t=Number(e/1000000000n),n=0):(t=Number(e/1000000000n-1n),n=Number(s+1000000000n))}return new r(t,n)}constructor(e,t){if(this.seconds=e,this.nanoseconds=t,t<0)throw new j(k.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+t);if(t>=1e9)throw new j(k.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+t);if(e<im)throw new j(k.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e);if(e>=253402300800)throw new j(k.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e)}toDate(){return new Date(this.toMillis())}toMillis(){return 1e3*this.seconds+this.nanoseconds/am}toInstant(){if(typeof Temporal>"u"||!Temporal.Instant)throw new j(k.FAILED_PRECONDITION,"The Temporal object is not available in the current environment.");let e=1000000000n*BigInt(this.seconds)+BigInt(this.nanoseconds);return Temporal.Instant.__PRIVATE_fromEpochNanoseconds(e)}_compareTo(e){return this.seconds===e.seconds?ie(this.nanoseconds,e.nanoseconds):ie(this.seconds,e.seconds)}isEqual(e){return e.seconds===this.seconds&&e.nanoseconds===this.nanoseconds}toString(){return"Timestamp(seconds="+this.seconds+", nanoseconds="+this.nanoseconds+")"}toJSON(){return{type:r._jsonSchemaVersion,seconds:this.seconds,nanoseconds:this.nanoseconds}}static fromJSON(e){if(Ra(e,r._jsonSchema))return new r(e.seconds,e.nanoseconds)}valueOf(){let e=this.seconds-im;return String(e).padStart(12,"0")+"."+String(this.nanoseconds).padStart(9,"0")}};ye._jsonSchemaVersion="firestore/timestamp/1.0",ye._jsonSchema={type:Ae("string",ye._jsonSchemaVersion),seconds:Ae("number"),nanoseconds:Ae("number")};/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var hu=class extends Error{constructor(){super(...arguments),this.name="Base64DecodeError"}};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var Ee=class r{constructor(e){this.binaryString=e}static fromBase64String(e){let t=(function(s){try{return atob(s)}catch(i){throw typeof DOMException<"u"&&i instanceof DOMException?new hu("Invalid base64 string: "+i):i}})(e);return new r(t)}static fromUint8Array(e){let t=(function(s){let i="";for(let a=0;a<s.length;++a)i+=String.fromCharCode(s[a]);return i})(e);return new r(t)}[Symbol.iterator](){let e=0;return{next:()=>e<this.binaryString.length?{value:this.binaryString.charCodeAt(e++),done:!1}:{value:void 0,done:!0}}}toBase64(){return(function(t){return btoa(t)})(this.binaryString)}toUint8Array(){return(function(t){let n=new Uint8Array(t.length);for(let s=0;s<t.length;s++)n[s]=t.charCodeAt(s);return n})(this.binaryString)}approximateByteSize(){return 2*this.binaryString.length}compareTo(e){return ie(this.binaryString,e.binaryString)}isEqual(e){return this.binaryString===e.binaryString}};Ee.EMPTY_BYTE_STRING=new Ee("");var iT=new RegExp(/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(?:\.(\d+))?Z$/);function mn(r){if(z(!!r,39018),typeof r=="string"){let e=0,t=iT.exec(r);if(z(!!t,46558,{timestamp:r}),t[1]){let s=t[1];s=(s+"000000000").substr(0,9),e=Number(s)}let n=new Date(r);return{seconds:Math.floor(n.getTime()/1e3),nanos:e}}return{seconds:ge(r.seconds),nanos:ge(r.nanos)}}function ge(r){return typeof r=="number"?r:typeof r=="string"?Number(r):0}function Lt(r){return typeof r=="string"?Ee.fromBase64String(r):Ee.fromUint8Array(r)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var Wm="server_timestamp",Qm="__type__",$m="__previous_value__",Ym="__local_write_time__";function ac(r){return(r?.mapValue?.fields||{})[Qm]?.stringValue===Wm}function Sa(r){let e=r.mapValue.fields[$m];return ac(e)?Sa(e):e}function _s(r){let e=mn(r.mapValue.fields[Ym].timestampValue);return new ye(e.seconds,e.nanos)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var dB=class{constructor(e,t,n,s,i,a,u,c,l,h,d,C,y){this.databaseId=e,this.appId=t,this.persistenceKey=n,this.host=s,this.ssl=i,this.forceLongPolling=a,this.autoDetectLongPolling=u,this.longPollingOptions=c,this.useFetchStreams=l,this.isUsingEmulator=h,this.apiKey=d,this._customHeaders=C,this.grpcFlowControlWindow=y}},fu="(default)",Zi=class r{constructor(e,t){this.projectId=e,this.database=t||fu}static empty(){return new r("","")}get isDefaultDatabase(){return this.database===fu}isEqual(e){return e instanceof r&&e.projectId===this.projectId&&e.database===this.database}};function Xm(r,e){if(!Object.prototype.hasOwnProperty.apply(r.options,["projectId"]))throw new j(k.INVALID_ARGUMENT,'"projectId" not provided in firebase.initializeApp.');return new Zi(r.options.projectId,e)}/**
 * Copyright 2021 M.Vokhmentsev
 *
 * @license
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var Te=class r{constructor(){this.exponent=0,this.i=0n,this.o=0n,this.u=new Array(4).fill(0n),this.l=new Array(6).fill(0n),this.h=new Array(6).fill(0n),this.T=new Array(6).fill(0n),this.P=new Array(12).fill(0n)}static I(e,t){let n=new r;return n.parse(e,t),n}parse(e,t){t+=e.length-1,this.exponent=0,this.i=0n,this.o=0n;let n=this.T,s=this.R(e,n);if(s==0&&this.isEmpty(n)||(t+=s)<r.A)return;if(t>r.V)return void(this.exponent=Number(r.m));let i=this.p(t,n);this.S(t,i,n)}R(e,t){for(let i=0;i<6;i++)t[i]=0n;let n=0;for(;n<e.length&&e[n]==0;)n+=1;if(n==e.length)return 0;let s=-n;if(e.length-n>r.v){let i=e[r.v]>=5,a=new Array(r.v).fill(0);for(let u=0;u<r.v;u++)a[u]=e[u+n];i&&(s+=this.D(a)),e=a,n=0}for(let i=e.length-1;i>=n;i--)t[0]|=BigInt(e[i])<<32n,this.C(t);return s}C(e){let t=e.length;for(let n=0;n<t;n++){let s=e[n]%10n;e[n]=e[n]/10n,n+1<t&&(e[n+1]+=s<<32n)}}isEmpty(e){for(let t=0;t<e.length;t++)if(e[t]!=0n)return!1;return!0}D(e){for(let t=e.length-1;t>=0;t--){if(e[t]!=9)return e[t]=e[t]+1,0;e[t]=0}return e[0]=1,1}p(e,t){let n=t[0]<<31n|t[1]>>1n,s=Number(n)/r.F;return Math.floor(Number(e)*r.O+this.log2(s))}log2(e){return r.M*Math.log(e)}S(e,t,n){let s=this.u;this.N(-t,s);let i=this.P;this.B(n,s,i),this.L(i),BigInt(s[0])!=BigInt(-e)&&this.L(i),t+=this.$(i),(t+=r.U)<=0||(t+=this.k(i),BigInt(t)>=r.m?this.exponent=Number(r.m):(this.exponent=Number(t),this.i=(i[0]<<32n)+i[1]&0xffffffffffffffffn,this.o=(i[2]<<32n)+i[3]&0xffffffffffffffffn))}N(e,t){if(e==0)return void this.q(r.K[0],t);let n=r.K;e<0&&(e=-e,n=r.W);let s=r.G,i=32,a=!0;for(;e>0;)e>=s&&(a?(this.q(n[i],t),a=!1):this.j(t,n[i],t),e-=s),i-=1,s*=.5}q(e,t){for(let n=0;n<t.length;n++)t[n]=e[n]}j(e,t,n){this.H(e,t,this.P);let s=this.J(this.P);this.Y(this.P,n),n[0]=e[0]+t[0]+BigInt(s)}H(e,t,n){for(let s=0;s<n.length;s++)n[s]=0n;this.Z(e,this.l),this.Z(t,this.h);for(let s=5;s>=0;s--)for(let i=5;i>=0;i--){let a=this.l[s]*this.h[i];n[i+s+1]=n[i+s+1]+(a&r.X)&0xffffffffffffffffn,n[i+s]=n[i+s]+(a>>32n)&0xffffffffffffffffn}for(let s=11;s>=1;s--)n[s-1]=n[s-1]+(n[s]>>32n)&0xffffffffffffffffn,n[s]&=r.X}J(e){let t=0;for(;this.ee(e);)this.L(e),t-=1;return t}ee(e){if(e[0]<0x19999999n)return!0;if(e[0]>0x19999999n)return!1;for(let t=1;t<e.length;t++){if(e[t]<0x99999999n)return!0;if(e[t]>0x99999999n)return!1}return!1}B(e,t,n){for(let a=0;a<n.length;a++)n[a]=0n;let s=this.h;this.Z(t,s);let i=e.length;for(let a=i-1;a>=0;a--)for(let u=i-1;u>=0;u--){let c=e[a]*s[u];n[u+a+1]=n[u+a+1]+(c&r.X)&0xffffffffffffffffn,n[u+a]=n[u+a]+(c>>32n)&0xffffffffffffffffn}for(let a=11;a>=1;a--)n[a-1]=n[a-1]+(n[a]>>32n)&0xffffffffffffffffn,n[a]&=r.X}L(e){let t=e.length-1;e[0]&=r.X,e[t]*=10n;for(let n=t-1;n>=0;n--)e[n]=10n*e[n]+(e[n+1]>>32n)&0xffffffffffffffffn,e[n+1]&=r.X}$(e){let t=31-r.te(e[0]);return t!=0&&this.ne(e,t),t}k(e){return this.re(e,5,100n),this.re(e,4,0x80000000n),(e[0]&r.ie<<1n)!=0n?(this.ne(e,1),1):0}Y(e,t){t[1]=(e[0]<<32n)+e[1],t[2]=(e[2]<<32n)+e[3],t[3]=(e[4]<<32n)+e[5]}Z(e,t){t[0]=e[1]>>32n,t[1]=e[1]&r.X,t[2]=e[2]>>32n,t[3]=e[2]&r.X,t[4]=e[3]>>32n,t[5]=e[3]&r.X}ne(e,t){let n=e.length-1,s=BigInt(32-Math.abs(t));if(t>0){let i=BigInt(t);for(let a=n+1-1;a>=1;a--)e[a]=e[a]>>i|e[a-1]<<s&r.X;e[0]=e[0]>>i}else if(t<0){let i=BigInt(-t);e[0]=0xffffffffffffffffn&(e[0]<<i|e[1]>>s);for(let a=1;a<n;a++)e[a]=0xffffffffffffffffn&(e[a]<<i&r.X|e[a+1]>>s);e[n]=e[n]<<i&r.X}}re(e,t,n){let s=t;e[s]=e[s]+n&0xffffffffffffffffn;for(let i=s+1-1;i>=1&&(e[i]&r.ie)!=0n;i--)e[i]&=r.X,e[i-1]+=1n}static te(e){let t=Number(e>>32n);return t==0?32+Math.clz32(Number(BigInt.asUintN(32,e))):Math.clz32(t)}};/**
 * @license
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var qe,fs,pB,au,ou,ji;Te.v=59,Te.V=646456993,Te.A=-646457032,Te.F=0xccccccccccccd00,Te.se=0x8000000000000000n,Te.G=2147483648,Te.X=0x00000000ffffffffn,Te.ie=0xffffffff00000000n,Te.O=Math.log(10)/Math.log(2),Te.M=1/Math.log(2),Te.U=2147483647,Te.m=0xffffffffn,Te.K=[[1n,0x1999999999999999n,0x9999999999999999n,0x999999999999999an],[1n,0x3333333333333333n,0x3333333333333333n,0x3333333333333334n],[1n,0x6666666666666666n,0x6666666666666666n,0x6666666666666667n],[2n,0x28f5c28f5c28f5c2n,0x8f5c28f5c28f5c28n,0xf5c28f5c28f5c290n],[3n,0x4189374bc6a7ef9dn,0xb22d0e5604189374n,0xbc6a7ef9db22d0e6n],[5n,0xa7c5ac471b478423n,0x0fcf80dc33721d53n,0xcddd6e04c0592104n],[10n,0x6df37f675ef6eadfn,0x5ab9a2072d44268dn,0x97df837e6748956en],[20n,0x2f394219248446ban,0xa23d2ec729af3d61n,0x0607aa0167dd94cbn],[39n,0x571cbec554b60dbbn,0xd5f64baf0506840dn,0x451db70d5904029bn],[78n,0x1da48ce468e7c702n,0x6520247d3556476dn,0x1469caf6db224cfan],[155n,0x2252f0e5b39769dcn,0x9ae2eea30ca3ade0n,0xeeaa3c08dfe84e30n],[309n,0x2e055c9a3f6ba793n,0x16583a816eb60a59n,0x22c4b0826cf1ebf7n],[617n,0x52bb45e9cf23f17fn,0x7688c07606e50364n,0xb34479aa9d449a57n],[1234n,0x1abc81c8ff5f846cn,0x8f5e3c9853e38c97n,0x45060097f3bf9296n],[2467n,0x1bec53b510daa7b4n,0x48369ed77dbb0eb1n,0x3b05587b2187b41en],[4933n,0x1e75063a5ba91326n,0x8abfb8e460016ae3n,0x28008702d29e8a3cn],[9865n,0x243c5d8bb5c5fa55n,0x40c6d248c5881915n,0x4c0fd99fd5befc22n],[19729n,0x334a5570c3f4ef3cn,0xa13c36c43f979c90n,0xda7ac473555fb7a8n],[39457n,0x66c304445dd98f3bn,0xa8c293a20e47a41bn,0x4c5b03dc12604964n],[78914n,0x293ffbf5fb028cc4n,0x89d3e5ff44238406n,0x369a339e1bfe8c9bn],[157827n,0x427792fbb68e5d20n,0x7b297cd9fc154b62n,0xf09142114aa9a20cn],[315653n,0xac92bc65ad5c08fcn,0x00beeb115a566c19n,0x4ba882d8a4622437n],[631306n,0x745581440f92e80en,0x4da822cf7f896f41n,0x509d598678164ecdn],[1262612n,0x34dd99b4c69523a5n,0x64bc2e8f0d8b1044n,0xb03b1c96da5dd349n],[2525223n,0x6d2bbea9d6d25a08n,0xa0a4606a88e96b70n,0x182063bbc2fe8520n],[5050446n,0x2e8e47d63bfdd6e3n,0x2b55fa8976eaa3e9n,0x1a6b9d3086412a73n],[10100891n,0x54aa68efa1d719dfn,0xd8505806612c5c8fn,0xad068837fee8b43an],[20201782n,0x1c00464ccb7bae77n,0x9e3877784c77982cn,0xd94af3b61717404fn],[40403563n,0x1ea099c8be2b6cd0n,0x8bfb6d539fa50466n,0x6d3bc37e69a84218n],[80807125n,0x24a457f466ce8d18n,0xf2c8f3b81bc6bb59n,0xa78c757692e02d49n],[161614249n,0x347256677aba6b53n,0x3fbf90d30611a67cn,0x1e039d87e0bdb32bn],[323228497n,0x6b727daf0fd3432an,0x71f71121f9e4200fn,0x8fcd9942d486c10cn],[646456994n,0x2d18e84484d91f78n,0x4079bfe7829dec6fn,0x21551643e365abc6n]],Te.W=[[1n,0x1999999999999999n,0x9999999999999999n,0x999999999999999an],[0n,0x8000000000000000n,0x0000000000000000n,0x0000000000000000n],[0n,0x4000000000000000n,0x0000000000000000n,0x0000000000000001n],[-1n,0xa000000000000000n,0x0000000000000000n,0x0000000000000000n],[-2n,0x6400000000000000n,0x0000000000000000n,0x0000000000000000n],[-4n,0x2710000000000000n,0x0000000000000000n,0x0000000000000001n],[-9n,0x3b9aca0000000000n,0x0000000000000000n,0x0000000000000001n],[-19n,0x8ac7230489e80000n,0x0000000000000000n,0x0000000000000000n],[-38n,0x4b3b4ca85a86c47an,0x098a224000000000n,0x0000000000000001n],[-77n,0xdd15fe86affad912n,0x49ef0eb713f39eben,0xaa987b6e6fd2a002n],[-154n,0xbeeefb584aff8603n,0xaafb550ffacfd8fan,0x5ca47e4f88d45371n],[-308n,0x8e679c2f5e44ff8fn,0x570f09eaa7ea7648n,0x5961db50c6d2b888n],[-616n,0x4f371b3399fc2ab0n,0x8170041c9feb05aan,0xc7c343447c75bcf6n],[-1233n,0xf51e928179013fd3n,0xde4bd12cde4d985cn,0x4a573ca6f94bff14n],[-2466n,0xeab388127bccaff7n,0x1667639142b9fbaen,0x775ec9995e1039fbn],[-4932n,0xd72cb2a95c7ef6ccn,0xe81bf1e825ba7515n,0xc2feb521d6cb5dcdn],[-9864n,0xb4dc1be6604502dcn,0xd491079b8eef6535n,0x578d3965d24de84dn],[-19728n,0x7fc6447bee60ea43n,0x2548da5c8b125b27n,0x5f42d1142f41d349n],[-39456n,0x3fc65180f88af8fbn,0x6a6915f383349413n,0x063c3708b6ceb291n],[-78913n,0x9ee0197c8dcd55bfn,0x2b2b9b942c38f4a2n,0x0f8ba634e9c706aen],[-157826n,0x629963a25b8b2d79n,0xd00b9d2286f70876n,0xe97004700c3644fcn],[-315652n,0x25f9cc308ceef4f3n,0x40f19543911a4546n,0xa2cd389452cfc366n],[-631305n,0x385597b0d47e76b8n,0x1b9f67e103bf2329n,0xc3119848595985f7n],[-1262611n,0x7bf795d276c12f66n,0x66a61d62a446659an,0xa1a4d73bebf093d5n],[-2525222n,0x3c07d96ab1ed7799n,0xcb7355c22cc05ac0n,0x4ffc0ab73b1f6a49n],[-5050445n,0x8cc4cd8c3edefb9an,0x6c8ff86a90a97e0cn,0x166cfddbf98b71bfn],[-10100890n,0x4d67d81cc88e1228n,0x1d7cfb06666b79b3n,0x7b916728aaa4e70dn],[-20201781n,0xea0c55494e7a552dn,0xb88cb9484bb86c61n,0x8d44893c610bb7dfn],[-40403562n,0xd5fa8c821ec0c24an,0xa80e46e764e0f8b0n,0xa7276bfa432fac7en],[-80807124n,0xb2dae307426f6791n,0xc970b82f58b12918n,0x0472592f7f39190en],[-161614248n,0x7cf51edd8a15f1c9n,0x656dab3498f8e697n,0x12daa2a80e53c807n],[-323228496n,0x3cfe609ab5883c50n,0xbec8b5d22b198871n,0xe18477703b4622b4n],[-646456993n,0x9152447b9d7cda9an,0x3b4d3f6110d77aadn,0xfa81bad1c394adb4n]];var fe=class r{constructor(e,t,n,s){this.negative=e,this._e=t,this.i=n,this.o=s}exponent(){return this._e-Te.U}oe(){return this._e===0&&this.i===0n&&this.o===0n}ae(){return this._e===Me(r,qe,"f",fs)&&this.i===0n&&this.o===0n}isNaN(){return this._e===Me(r,qe,"f",fs)&&!(this.i===0n&&this.o===0n)}compareTo(e){if(this.isNaN())return e.isNaN()?0:1;if(e.isNaN())return-1;let t,n;if(this.negative){if(!e.negative)return-1;t=1,n=-1}else{if(e.negative)return 1;t=-1,n=1}return this._e<e._e?t:this._e>e._e?n:this.i<e.i?t:this.i>e.i?n:this.o<e.o?t:this.o>e.o?n:0}debug(){return(this.negative?"+":"-")+Me(r,qe,"m",pB).call(r,this.i)+Me(r,qe,"m",pB).call(r,this.o)+"*2^"+this.exponent()}static fromNumber(e){if(isNaN(e))return r.NaN;if(!isFinite(e))return e<0?r.ue:r.ce;if(e===0)return Math.sign(1/e)>0?r.le:r.Ee;let t=new DataView(new ArrayBuffer(8));t.setFloat64(0,e);let n=t.getBigUint64(0),s=BigInt.asUintN(64,n<<12n),i=2047&Number(n>>52n);if(i===0){let a=Te.te(s);s=a<63?s<<BigInt(a+1):0n,i=-a}return new r(e<0,Me(r,qe,"m",ji).call(r,i-1023),s,0n)}static fromString(e){if(e==="NaN")return r.NaN;if(e==="-Infinity")return r.ue;if(e==="Infinity"||e==="+Infinity")return r.ce;let t=new Array(e.length).fill(0),n=0,s=0,i=0,a=!1;for(e[n]==="-"?(a=!0,n++):e[n]==="+"&&n++;Me(r,qe,"m",au).call(r,e,n);)t[s++]=Me(r,qe,"m",ou).call(r,e,n++);if(e[n]==="."){let c=++n;for(;Me(r,qe,"m",au).call(r,e,n);)t[s++]=Me(r,qe,"m",ou).call(r,e,n++);i=c-n}if(e[n]==="e"||e[n]==="E"){let c=0;n++;let l=1;e[n]==="-"?(l=-1,n++):e[n]==="+"&&n++;let h=n;for(;Me(r,qe,"m",au).call(r,e,n);)if(c=10*c+Me(r,qe,"m",ou).call(r,e,n++),n-h>9)throw new Error("Exponent too large "+e);if(n===h)throw new Error("Invalid number "+e);i+=c*l}if(s===0||n!==e.length)throw new Error("Invalid number "+e);let u=Te.I(t.slice(0,s),i);return new r(a,u.exponent,u.i,u.o)}};qe=fe,pB=function(e){return e.toString(16).padStart(16,"0")},au=function(e,t){let n=e.codePointAt(t);return n!==void 0&&n>=48&&n<=57},ou=function(e,t){return e.codePointAt(t)-48},ji=function(e){return e+Te.U},fs={value:Number(Te.m)},fe.le=new fe(!1,0,0n,0n),fe.Ee=new fe(!0,0,0n,0n),fe.NaN=new fe(!1,Me(fe,qe,"f",fs),1n<<63n,0n),fe.ue=new fe(!0,Me(fe,qe,"f",fs),0n,0n),fe.ce=new fe(!1,Me(fe,qe,"f",fs),0n,0n),new fe(!0,Me(fe,qe,"m",ji).call(fe,63),0n,0n),new fe(!1,Me(fe,qe,"m",ji).call(fe,0),0n,0n),new fe(!0,Me(fe,qe,"m",ji).call(fe,0),0n,0n);/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var cd=-1;function Pa(r){return r==null}function ys(r){return r===0&&1/r==-1/0}function aT(r){return typeof r=="number"&&Number.isInteger(r)&&!ys(r)&&r<=Number.MAX_SAFE_INTEGER&&r>=Number.MIN_SAFE_INTEGER}function CB(r){return typeof r=="string"}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var oc="__type__",uc="__vector__",yr="value",oT="server_timestamp",ld="__min__",Na="__max__",zt="__regex__",ws="pattern",Ds="options",wr="__oid__",Kn="__int__",En="__decimal128__",Bn="__request_timestamp__",ea="seconds",ta="increment",Is="__binary__",Ts={nullValue:"NULL_VALUE"},tu={mapValue:{fields:{__type__:{stringValue:Na}}}},hR={mapValue:{fields:{[oc]:{stringValue:uc},[yr]:{arrayValue:{}}}}},fR={mapValue:{fields:{[ld]:{nullValue:"NULL_VALUE"}}}},dR={mapValue:{fields:{[Na]:{nullValue:"NULL_VALUE"}}}},pR={mapValue:{fields:{[wr]:{stringValue:""}}}},CR={mapValue:{fields:{[Bn]:{mapValue:{fields:{[ea]:{integerValue:0},[ta]:{integerValue:0}}}}}}},gR={mapValue:{fields:{[zt]:{mapValue:{fields:{[ws]:{stringValue:""},[Ds]:{stringValue:""}}}}}}},ue,vt;(vt=ue||(ue={})).he="regexValue",vt.Te="bsonObjectIdValue",vt.Pe="int32Value",vt.Ie="decimal128Value",vt.Re="bsonTimestampValue",vt.Ae="bsonBinaryValue",vt.Ve="minKeyValue",vt.de="maxKeyValue",vt.fe="maxValue",vt.me="vectorValue",vt.pe="serverTimestampValue",vt.ge="regularMapValue";var om={[uc]:ue.me,[Na]:ue.fe,[oT]:ue.pe},Zm={[zt]:ue.he,[wr]:ue.Te,[Kn]:ue.Pe,[En]:ue.Ie,[Bn]:ue.Re,[Is]:ue.Ae,[ld]:ue.Ve,[Na]:ue.de},uT=new Set(Object.values(Zm)),ft={booleanValue:!0},Ke={booleanValue:!1};function Pe(r){if("nullValue"in r)return 0;if("booleanValue"in r)return 2;if("integerValue"in r||"doubleValue"in r)return 3;if("timestampValue"in r)return 4;if("stringValue"in r)return 7;if("bytesValue"in r)return 8;if("referenceValue"in r)return 9;if("geoPointValue"in r)return 11;if("arrayValue"in r)return 13;if(!("mapValue"in r))return $(28295,{value:r});switch(Bd(r)){case ue.pe:return 6;case ue.fe:return 9007199254740991;case ue.me:return 14;case ue.he:return 12;case ue.Te:return 10;case ue.Pe:case ue.Ie:return 3;case ue.Re:return 5;case ue.Ae:return 8;case ue.Ve:return 1;case ue.de:return 16;default:return 15}}function Nt(r,e,t){if(r===e)return!0;let n=Pe(r);if(n!==Pe(e))return!1;switch(n){case 0:case 9007199254740991:case 16:case 1:return!0;case 2:return r.booleanValue===e.booleanValue;case 6:return _s(r).isEqual(_s(e));case 4:return(function(i,a){if(typeof i.timestampValue=="string"&&typeof a.timestampValue=="string"&&i.timestampValue.length===a.timestampValue.length)return i.timestampValue===a.timestampValue;let u=mn(i.timestampValue),c=mn(a.timestampValue);return u.seconds===c.seconds&&u.nanos===c.nanos})(r,e);case 7:return r.stringValue===e.stringValue;case 8:return(function(i,a){return rE(i,a)===0})(r,e);case 9:return r.referenceValue===e.referenceValue;case 11:return(function(i,a){return ge(i.geoPointValue.latitude)===ge(a.geoPointValue.latitude)&&ge(i.geoPointValue.longitude)===ge(a.geoPointValue.longitude)})(r,e);case 3:return(function(i,a,u){if(Ot(i)&&Ot(a))return tE(i,a)===0;if("integerValue"in i&&"integerValue"in a||kn(i)&&kn(a))return ra(i)===ra(a);let c,l;if("doubleValue"in i&&"doubleValue"in a)c=ge(i.doubleValue),l=ge(a.doubleValue);else{if(!u?.ye)return!1;c=ge(i.integerValue??i.doubleValue),l=ge(a.integerValue??a.doubleValue)}return c===l?!!u?.we||ys(c)===ys(l):!!(u===void 0||u.be)&&isNaN(c)&&isNaN(l)})(r,e,t);case 13:return ms(r.arrayValue.values||[],e.arrayValue.values||[],((s,i)=>Nt(s,i,t)));case 14:case 15:return(function(i,a,u){let c=i.mapValue.fields||{},l=a.mapValue.fields||{};if(_r(c)!==_r(l))return!1;for(let h in c)if(c.hasOwnProperty(h)&&(l[h]===void 0||!Nt(c[h],l[h],u)))return!1;return!0})(r,e,t);case 5:return nE(r,e)===0;case 12:return sE(r,e)===0;case 10:return iE(r,e)===0;default:return $(52216,{left:r})}}function na(r,e){return(r.values||[]).find((t=>Nt(t,e)))!==void 0}function dt(r,e){if(r===e)return 0;let t=Pe(r),n=Pe(e);if(t!==n)return ie(t,n);switch(t){case 0:case 1:case 16:case 9007199254740991:return 0;case 2:return ie(r.booleanValue,e.booleanValue);case 3:return sa(r,e);case 4:return cm(r.timestampValue,e.timestampValue);case 6:return cm(_s(r),_s(e));case 7:return Xi(r.stringValue,e.stringValue);case 8:return rE(r,e);case 9:return(function(i,a){let u=i.split("/"),c=a.split("/");for(let l=0;l<u.length&&l<c.length;l++){let h=ie(u[l],c[l]);if(h!==0)return h}return ie(u.length,c.length)})(r.referenceValue,e.referenceValue);case 11:return(function(i,a){let u=ie(ge(i.latitude),ge(a.latitude));return u!==0?u:ie(ge(i.longitude),ge(a.longitude))})(r.geoPointValue,e.geoPointValue);case 13:return lm(r.arrayValue,e.arrayValue);case 14:return(function(i,a){let u=i.fields||{},c=a.fields||{},l=u[yr]?.arrayValue,h=c[yr]?.arrayValue,d=ie(l?.values?.length||0,h?.values?.length||0);return d!==0?d:lm(l,h)})(r.mapValue,e.mapValue);case 15:return(function(i,a){if(i===tu.mapValue&&a===tu.mapValue)return 0;if(i===tu.mapValue)return 1;if(a===tu.mapValue)return-1;let u=i.fields||{},c=Object.keys(u),l=a.fields||{},h=Object.keys(l);c.sort(),h.sort();for(let d=0;d<c.length&&d<h.length;++d){let C=Xi(c[d],h[d]);if(C!==0)return C;let y=dt(u[c[d]],l[h[d]]);if(y!==0)return y}return ie(c.length,h.length)})(r.mapValue,e.mapValue);case 5:return nE(r,e);case 12:return sE(r,e);case 10:return iE(r,e);default:throw $(23264,{Se:t})}}function ra(r){let e;return e=kn(r)?r.mapValue.fields[Kn].integerValue:r.integerValue||r.doubleValue,ge(e)}function eE(r){return r.mapValue.fields[En].stringValue}function sa(r,e){if(Ot(r)||Ot(e))return tE(r,e);let t=ra(r),n=ra(e);return isNaN(t)?isNaN(n)?0:-1:isNaN(n)?1:ie(t,n)}function tE(r,e){let t=um(r),n=um(e);return t.oe()&&n.oe()?0:t.isNaN()?n.isNaN()?0:-1:n.isNaN()?1:t.compareTo(n)}function um(r){return Ot(r)?fe.fromString(eE(r)):fe.fromNumber(ra(r))}function cm(r,e){if(typeof r=="string"&&typeof e=="string"&&r.length===e.length)return ie(r,e);let t=mn(r),n=mn(e),s=ie(t.seconds,n.seconds);return s!==0?s:ie(t.nanos,n.nanos)}function lm(r,e){let t=r.values||[],n=e.values||[];for(let s=0;s<t.length&&s<n.length;++s){let i=dt(t[s],n[s]);if(i!==void 0&&i!==0)return i}return ie(t.length,n.length)}function nE(r,e){let t=r.mapValue.fields?.[Bn].mapValue?.fields?.[ea],n=e.mapValue.fields?.[Bn].mapValue?.fields?.[ea],s=r.mapValue.fields?.[Bn].mapValue?.fields?.[ta],i=e.mapValue.fields?.[Bn].mapValue?.fields?.[ta],a=sa(t,n);return a!==0?a:sa(s,i)}function Bm(r){if("bytesValue"in r)return{subtype:0,bytes:Lt(r.bytesValue)};let e=r.mapValue?.fields,t=e?.[Is],n=t?.bytesValue;if(!n)throw new Error("Received incorrect value for BsonBinaryData");let s=Lt(n).toUint8Array();if(s.length===0)throw new Error("Received empty bytesValue for BsonBinaryData");let i=s[0],a=s.slice(1);return{subtype:i,bytes:Ee.fromUint8Array(a)}}function rE(r,e){let t=Bm(r),n=Bm(e);return t.subtype!==n.subtype?t.subtype<n.subtype?-1:1:t.bytes.compareTo(n.bytes)}function sE(r,e){let t=r.mapValue.fields,n=t?.[zt]?.mapValue?.fields?.[ws]?.stringValue??"",s=t?.[zt]?.mapValue?.fields?.[Ds]?.stringValue??"",i=e.mapValue.fields,a=i?.[zt]?.mapValue?.fields?.[ws]?.stringValue??"",u=i?.[zt]?.mapValue?.fields?.[Ds]?.stringValue??"",c=Xi(n,a);return c!==0?c:ie(s,u)}function iE(r,e){return Xi(r.mapValue.fields?.[wr]?.stringValue??"",e.mapValue.fields?.[wr]?.stringValue??"")}function As(r){return gB(r)}function gB(r){return"nullValue"in r?"null":"booleanValue"in r?""+r.booleanValue:"integerValue"in r?""+r.integerValue:"doubleValue"in r?""+r.doubleValue:"timestampValue"in r?(function(t){let n=mn(t);return`time(${n.seconds},${n.nanos})`})(r.timestampValue):"stringValue"in r?r.stringValue:"bytesValue"in r?(function(t){return Lt(t).toBase64()})(r.bytesValue):"referenceValue"in r?(function(t){return X.fromName(t).toString()})(r.referenceValue):"geoPointValue"in r?(function(t){return`geo(${t.latitude},${t.longitude})`})(r.geoPointValue):"arrayValue"in r?(function(t){let n="[",s=!0;for(let i of t.values||[])s?s=!1:n+=",",n+=gB(i);return n+"]"})(r.arrayValue):"mapValue"in r?(function(t){let n=Object.keys(t.fields||{}).sort(),s="{",i=!0;for(let a of n)i?i=!1:s+=",",s+=`${a}:${gB(t.fields[a])}`;return s+"}"})(r.mapValue):$(61005,{value:r})}function du(r){switch(Pe(r)){case 0:case 2:return 4;case 3:return Ot(r)?16:8;case 4:case 11:return 16;case 6:let e=Sa(r);return e?16+du(e):16;case 7:return 2*r.stringValue.length;case 8:return"bytesValue"in r?Lt(r.bytesValue).approximateByteSize():hm(r.mapValue);case 9:return r.referenceValue.length;case 13:return(function(n){return(n.values||[]).reduce(((s,i)=>s+du(i)),0)})(r.arrayValue);case 14:case 15:case 12:case 10:case 5:case 1:case 16:return hm(r.mapValue);default:throw $(13486,{value:r})}}function hm(r){let e=0;return jn(r.fields,((t,n)=>{e+=t.length+du(n)})),e}function Wt(r){return!!r&&"integerValue"in r}function Qt(r){return!!r&&"doubleValue"in r}function Ot(r){if(!r.mapValue?.fields)return!1;let e=r.mapValue.fields;return _r(e)===1&&e[En]&&!!e[En].stringValue}function kn(r){if(!r.mapValue?.fields)return!1;let e=r.mapValue.fields;return _r(e)===1&&e[Kn]?.integerValue!==void 0}function _n(r){return Wt(r)||Qt(r)||!!r&&kn(r)||!!r&&Ot(r)}function bs(r){return!!r&&"arrayValue"in r}function _t(r){return!!r&&"nullValue"in r}function Je(r){return!(!Qt(r)||!isNaN(Number(r.doubleValue)))||!(!Ot(r)||eE(r)!=="NaN")}function Cr(r){return!!r&&"mapValue"in r}function Bd(r){if(!r.mapValue?.fields)return ue.ge;let e=r.mapValue.fields,t=e[oc]?.stringValue;if(t&&om[t])return om[t];if(_r(e)===1){let n=Object.keys(e);return Zm[n[0]]??ue.ge}return ue.ge}function mB(r){return(r?.mapValue?.fields||{})[oc]?.stringValue===uc}function EB(r){return(r?.mapValue?.fields||{})[yr]?.arrayValue}function Ki(r){if(r.geoPointValue)return{geoPointValue:{...r.geoPointValue}};if(r.timestampValue&&typeof r.timestampValue=="object")return{timestampValue:{...r.timestampValue}};if(r.mapValue){let e={mapValue:{fields:{}}};return jn(r.mapValue.fields,((t,n)=>e.mapValue.fields[t]=Ki(n))),e}if(r.arrayValue){let e={arrayValue:{values:[]}};for(let t=0;t<(r.arrayValue.values||[]).length;++t)e.arrayValue.values[t]=Ki(r.arrayValue.values[t]);return e}return{...r}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var tt=class r{constructor(e){this.value=e}static empty(){return new r({mapValue:{}})}field(e){if(e.isEmpty())return this.value;{let t=this.value;for(let n=0;n<e.length-1;++n)if(t=(t.mapValue.fields||{})[e.get(n)],!Cr(t))return null;return t=(t.mapValue.fields||{})[e.lastSegment()],t||null}}set(e,t){this.getFieldsMap(e.popLast())[e.lastSegment()]=Ki(t)}setAll(e){let t=ht.emptyPath(),n={},s=[];e.forEach(((a,u)=>{if(!t.isImmediateParentOf(u)){let c=this.getFieldsMap(t);this.applyChanges(c,n,s),n={},s=[],t=u.popLast()}a?n[u.lastSegment()]=Ki(a):s.push(u.lastSegment())}));let i=this.getFieldsMap(t);this.applyChanges(i,n,s)}delete(e){let t=this.field(e.popLast());Cr(t)&&t.mapValue.fields&&delete t.mapValue.fields[e.lastSegment()]}isEqual(e){return Nt(this.value,e.value)}getFieldsMap(e){let t=this.value;t.mapValue.fields||(t.mapValue={fields:{}});for(let n=0;n<e.length;++n){let s=t.mapValue.fields[e.get(n)];Cr(s)&&s.mapValue.fields||(s={mapValue:{fields:{}}},t.mapValue.fields[e.get(n)]=s),t=s}return t.mapValue.fields}applyChanges(e,t,n){jn(t,((s,i)=>e[s]=i));for(let s of n)delete e[s]}clone(){return new r(Ki(this.value))}};function aE(r){let e=[];return jn(r.fields,((t,n)=>{let s=new ht([t]);if(Cr(n)&&!(function(a){return uT.has(Bd(a))})(n)){let i=aE(n.mapValue).fields;if(i.length===0)e.push(s);else for(let a of i)e.push(s.child(a))}else e.push(s)})),new St(e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function hd(r,e){if(r.useProto3Json){if(isNaN(e))return{doubleValue:"NaN"};if(e===1/0)return{doubleValue:"Infinity"};if(e===-1/0)return{doubleValue:"-Infinity"}}return{doubleValue:ys(e)?"-0":e}}function ds(r){return{integerValue:""+r}}function cc(r,e,t){return aT(e)?ds(e):hd(r,e)}/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var vs=class{constructor(){this._=void 0}};function cT(r,e,t){return r instanceof Dr?(function(s,i){let a={fields:{[Qm]:{stringValue:Wm},[Ym]:{timestampValue:{seconds:s.seconds,nanos:s.nanoseconds}}}};return i&&ac(i)&&(i=Sa(i)),i&&(a.fields[$m]=i),{mapValue:a}})(t,e):r instanceof Ir?uE(r,e):r instanceof Tr?cE(r,e):r instanceof Ar?(function(s,i){let a=oE(s,i),u=fm(a)+fm(s.xe);return Ot(a)||Ot(s.xe)?{mapValue:{fields:{[En]:{stringValue:u.toString()}}}}:kn(a)?Qt(s.xe)?{doubleValue:u}:Wt(s.xe)?{integerValue:u.toString()}:{mapValue:{fields:{[Kn]:ds(u)}}}:Wt(a)&&(Wt(s.xe)||kn(s.xe))?ds(u):hd(s.serializer,u)})(r,e):r instanceof Rs?(function(s,i){return!_n(i)||Je(s.xe)?s.xe:Je(i)?i:sa(s.xe,i)<0?s.xe:i})(r,e):r instanceof Ss?(function(s,i){return!_n(i)||Je(s.xe)?s.xe:Je(i)?i:sa(s.xe,i)>0?s.xe:i})(r,e):void 0}function lT(r,e,t){return r instanceof Ir?uE(r,e):r instanceof Tr?cE(r,e):t}function oE(r,e){return r instanceof Ar?_n(e)?e:{integerValue:0}:null}var Dr=class extends vs{},Ir=class extends vs{constructor(e){super(),this.elements=e}};function uE(r,e){let t=lE(e);for(let n of r.elements)t.some((s=>Nt(s,n)))||t.push(n);return{arrayValue:{values:t}}}var Tr=class extends vs{constructor(e){super(),this.elements=e}};function cE(r,e){let t=lE(e);for(let n of r.elements)t=t.filter((s=>!Nt(s,n)));return{arrayValue:{values:t}}}var ia=class extends vs{constructor(e,t){super(),this.serializer=e,this.xe=t}},Ar=class extends ia{},Rs=class extends ia{},Ss=class extends ia{};function fm(r){return Wt(r)?ge(r.integerValue):Qt(r)?ge(r.doubleValue):kn(r)?ge(r.mapValue.fields[Kn].integerValue):Ot(r)?parseFloat(r.mapValue.fields[En].stringValue):0}function lE(r){return bs(r)&&r.arrayValue.values?r.arrayValue.values.slice():[]}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var _B=class{constructor(e,t){this.field=e,this.transform=t}};function BT(r,e){return r.field.isEqual(e.field)&&(function(n,s){return n instanceof Ir&&s instanceof Ir||n instanceof Tr&&s instanceof Tr?ms(n.elements,s.elements,Nt):n instanceof Ar&&s instanceof Ar||n instanceof Rs&&s instanceof Rs||n instanceof Ss&&s instanceof Ss?Nt(n.xe,s.xe):n instanceof Dr&&s instanceof Dr})(r.transform,e.transform)}var yB=class{constructor(e,t){this.version=e,this.transformResults=t}},lt=class r{constructor(e,t){this.updateTime=e,this.exists=t}static none(){return new r}static exists(e){return new r(void 0,e)}static updateTime(e){return new r(e)}get isNone(){return this.updateTime===void 0&&this.exists===void 0}isEqual(e){return this.exists===e.exists&&(this.updateTime?!!e.updateTime&&this.updateTime.isEqual(e.updateTime):!e.updateTime)}};function uu(r,e){return r.updateTime!==void 0?e.isFoundDocument()&&e.version.isEqual(r.updateTime):r.exists===void 0||r.exists===e.isFoundDocument()}var Ps=class{};function BE(r,e){if(!r.hasLocalMutations||e&&e.fields.length===0)return null;if(e===null)return r.isNoDocument()?new vr(r.key,lt.none()):new br(r.key,r.data,lt.none());{let t=r.data,n=tt.empty(),s=new Fe(ht.comparator);for(let i of e.fields)if(!s.has(i)){let a=t.field(i);a===null&&i.length>1&&(i=i.popLast(),a=t.field(i)),a===null?n.delete(i):n.set(i,a),s=s.add(i)}return new Xt(r.key,n,new St(s.toArray()),lt.none())}}function hT(r,e,t){r instanceof br?(function(s,i,a){let u=s.value.clone(),c=pm(s.fieldTransforms,i,a.transformResults);u.setAll(c),i.convertToFoundDocument(a.version,u).setHasCommittedMutations()})(r,e,t):r instanceof Xt?(function(s,i,a){if(!uu(s.precondition,i))return void i.convertToUnknownDocument(a.version);let u=pm(s.fieldTransforms,i,a.transformResults),c=i.data;c.setAll(hE(s)),c.setAll(u),i.convertToFoundDocument(a.version,c).setHasCommittedMutations()})(r,e,t):(function(s,i,a){i.convertToNoDocument(a.version).setHasCommittedMutations()})(0,e,t)}function Ji(r,e,t,n){return r instanceof br?(function(i,a,u,c){if(!uu(i.precondition,a))return u;let l=i.value.clone(),h=Cm(i.fieldTransforms,c,a);return l.setAll(h),a.convertToFoundDocument(a.version,l).setHasLocalMutations(),null})(r,e,t,n):r instanceof Xt?(function(i,a,u,c){if(!uu(i.precondition,a))return u;let l=Cm(i.fieldTransforms,c,a),h=a.data;return h.setAll(hE(i)),h.setAll(l),a.convertToFoundDocument(a.version,h).setHasLocalMutations(),u===null?null:u.unionWith(i.fieldMask.fields).unionWith(i.fieldTransforms.map((d=>d.field)))})(r,e,t,n):(function(i,a,u){return uu(i.precondition,a)?(a.convertToNoDocument(a.version).setHasLocalMutations(),null):u})(r,e,t)}function fT(r,e){let t=null;for(let n of r.fieldTransforms){let s=e.data.field(n.field),i=oE(n.transform,s||null);i!=null&&(t===null&&(t=tt.empty()),t.set(n.field,i))}return t||null}function dm(r,e){return r.type===e.type&&!!r.key.isEqual(e.key)&&!!r.precondition.isEqual(e.precondition)&&!!(function(n,s){return n===void 0&&s===void 0||!(!n||!s)&&ms(n,s,((i,a)=>BT(i,a)))})(r.fieldTransforms,e.fieldTransforms)&&(r.type===0?r.value.isEqual(e.value):r.type!==1||r.data.isEqual(e.data)&&r.fieldMask.isEqual(e.fieldMask))}var br=class extends Ps{constructor(e,t,n,s=[]){super(),this.key=e,this.value=t,this.precondition=n,this.fieldTransforms=s,this.type=0}getFieldMask(){return null}},Xt=class extends Ps{constructor(e,t,n,s,i=[]){super(),this.key=e,this.data=t,this.fieldMask=n,this.precondition=s,this.fieldTransforms=i,this.type=1}getFieldMask(){return this.fieldMask}};function hE(r){let e=new Map;return r.fieldMask.fields.forEach((t=>{if(!t.isEmpty()){let n=r.data.field(t);e.set(t,n)}})),e}function pm(r,e,t){let n=new Map;z(r.length===t.length,32656,{ve:t.length,De:r.length});for(let s=0;s<t.length;s++){let i=r[s],a=i.transform,u=e.data.field(i.field);n.set(i.field,lT(a,u,t[s]))}return n}function Cm(r,e,t){let n=new Map;for(let s of r){let i=s.transform,a=t.data.field(s.field);n.set(s.field,cT(i,a,e))}return n}var vr=class extends Ps{constructor(e,t){super(),this.key=e,this.precondition=t,this.type=2,this.fieldTransforms=[]}getFieldMask(){return null}},pu=class extends Ps{constructor(e,t){super(),this.key=e,this.precondition=t,this.type=3,this.fieldTransforms=[]}getFieldMask(){return null}};/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var Rr=class{constructor(e,t){this.position=e,this.inclusive=t}};function gm(r,e,t){let n=0;for(let s=0;s<r.position.length;s++){let i=e[s],a=r.position[s];if(i.field.isKeyField()?n=X.comparator(X.fromName(a.referenceValue),t.key):n=dt(a,t.data.field(i.field)),i.dir==="desc"&&(n*=-1),n!==0)break}return n}function mm(r,e){if(r===null)return e===null;if(e===null||r.inclusive!==e.inclusive||r.position.length!==e.position.length)return!1;for(let t=0;t<r.position.length;t++)if(!Nt(r.position[t],e.position[t]))return!1;return!0}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var Cu=class{},Re=class r extends Cu{constructor(e,t,n){super(),this.field=e,this.op=t,this.value=n}static create(e,t,n){return e.isKeyField()?t==="in"||t==="not-in"?this.createKeyFieldInFilter(e,t,n):new DB(e,t,n):t==="array-contains"?new AB(e,n):t==="in"?new bB(e,n):t==="not-in"?new vB(e,n):t==="array-contains-any"?new RB(e,n):new r(e,t,n)}static createKeyFieldInFilter(e,t,n){return t==="in"?new IB(e,n):new TB(e,n)}matches(e){let t=e.data.field(this.field);return this.op==="!="?t!==null&&t.nullValue===void 0&&this.matchesComparison(dt(t,this.value)):t!==null&&Pe(this.value)===Pe(t)&&this.matchesComparison(dt(t,this.value))}matchesComparison(e){switch(this.op){case"<":return e<0;case"<=":return e<=0;case"==":return e===0;case"!=":return e!==0;case">":return e>0;case">=":return e>=0;default:return $(47266,{operator:this.op})}}isInequality(){return["<","<=",">",">=","!=","not-in"].indexOf(this.op)>=0}getFlattenedFilters(){return[this]}getFilters(){return[this]}},Vt=class r extends Cu{constructor(e,t){super(),this.filters=e,this.op=t,this.Ce=null}static create(e,t){return new r(e,t)}matches(e){return fE(this)?this.filters.find((t=>!t.matches(e)))===void 0:this.filters.find((t=>t.matches(e)))!==void 0}getFlattenedFilters(){return this.Ce!==null||(this.Ce=this.filters.reduce(((e,t)=>e.concat(t.getFlattenedFilters())),[])),this.Ce}getFilters(){return Object.assign([],this.filters)}};function fE(r){return r.op==="and"}function dE(r){return dT(r)&&fE(r)}function dT(r){for(let e of r.filters)if(e instanceof Vt)return!1;return!0}function wB(r){if(r instanceof Re)return r.field.canonicalString()+r.op.toString()+As(r.value);if(dE(r))return r.filters.map((e=>wB(e))).join(",");{let e=r.filters.map((t=>wB(t))).join(",");return`${r.op}(${e})`}}function pE(r,e){return r instanceof Re?(function(n,s){return s instanceof Re&&n.op===s.op&&n.field.isEqual(s.field)&&Nt(n.value,s.value)})(r,e):r instanceof Vt?(function(n,s){return s instanceof Vt&&n.op===s.op&&n.filters.length===s.filters.length?n.filters.reduce(((i,a,u)=>i&&pE(a,s.filters[u])),!0):!1})(r,e):void $(19439)}function CE(r){return r instanceof Re?(function(t){return`${t.field.canonicalString()} ${t.op} ${As(t.value)}`})(r):r instanceof Vt?(function(t){return t.op.toString()+" {"+t.getFilters().map(CE).join(" ,")+"}"})(r):"Filter"}var DB=class extends Re{constructor(e,t,n){super(e,t,n),this.key=X.fromName(n.referenceValue)}matches(e){let t=X.comparator(e.key,this.key);return this.matchesComparison(t)}},IB=class extends Re{constructor(e,t){super(e,"in",t),this.keys=gE("in",t)}matches(e){return this.keys.some((t=>t.isEqual(e.key)))}},TB=class extends Re{constructor(e,t){super(e,"not-in",t),this.keys=gE("not-in",t)}matches(e){return!this.keys.some((t=>t.isEqual(e.key)))}};function gE(r,e){return(e.arrayValue?.values||[]).map((t=>X.fromName(t.referenceValue)))}var AB=class extends Re{constructor(e,t){super(e,"array-contains",t)}matches(e){let t=e.data.field(this.field);return bs(t)&&na(t.arrayValue,this.value)}},bB=class extends Re{constructor(e,t){super(e,"in",t)}matches(e){let t=e.data.field(this.field);return t!==null&&na(this.value.arrayValue,t)}},vB=class extends Re{constructor(e,t){super(e,"not-in",t)}matches(e){if(na(this.value.arrayValue,{nullValue:"NULL_VALUE"}))return!1;let t=e.data.field(this.field);return t!==null&&t.nullValue===void 0&&!na(this.value.arrayValue,t)}},RB=class extends Re{constructor(e,t){super(e,"array-contains-any",t)}matches(e){let t=e.data.field(this.field);return!(!bs(t)||!t.arrayValue.values)&&t.arrayValue.values.some((n=>na(this.value.arrayValue,n)))}};/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var Sr=class{constructor(e,t="asc"){this.field=e,this.dir=t}};function pT(r,e){return r.dir===e.dir&&r.field.isEqual(e.field)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var te=class r{static fromTimestamp(e){return new r(e)}static min(){return new r(new ye(0,0))}static max(){return new r(new ye(253402300799,999999999))}constructor(e){this.timestamp=e}compareTo(e){return this.timestamp._compareTo(e.timestamp)}isEqual(e){return this.timestamp.isEqual(e.timestamp)}toMicroseconds(){return 1e6*this.timestamp.seconds+this.timestamp.nanoseconds/1e3}toString(){return"SnapshotVersion("+this.timestamp.toString()+")"}toTimestamp(){return this.timestamp}};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var It=class r{constructor(e,t,n,s,i,a,u){this.key=e,this.documentType=t,this.version=n,this.readTime=s,this.createTime=i,this.data=a,this.documentState=u}static newInvalidDocument(e){return new r(e,0,te.min(),te.min(),te.min(),tt.empty(),0)}static newFoundDocument(e,t,n,s){return new r(e,1,t,te.min(),n,s,0)}static newNoDocument(e,t){return new r(e,2,t,te.min(),te.min(),tt.empty(),0)}static newUnknownDocument(e,t){return new r(e,3,t,te.min(),te.min(),tt.empty(),2)}convertToFoundDocument(e,t){return!this.createTime.isEqual(te.min())||this.documentType!==2&&this.documentType!==0||(this.createTime=e),this.version=e,this.documentType=1,this.data=t,this.documentState=0,this}convertToNoDocument(e){return this.version=e,this.documentType=2,this.data=tt.empty(),this.documentState=0,this}convertToUnknownDocument(e){return this.version=e,this.documentType=3,this.data=tt.empty(),this.documentState=2,this}setHasCommittedMutations(){return this.documentState=2,this}setHasLocalMutations(){return this.documentState=1,this.version=te.min(),this}setReadTime(e){return this.readTime=e,this}get hasLocalMutations(){return this.documentState===1}get hasCommittedMutations(){return this.documentState===2}get hasPendingWrites(){return this.hasLocalMutations||this.hasCommittedMutations}isValidDocument(){return this.documentType!==0}isFoundDocument(){return this.documentType===1}isNoDocument(){return this.documentType===2}isUnknownDocument(){return this.documentType===3}isEqual(e){return e instanceof r&&this.key.isEqual(e.key)&&this.version.isEqual(e.version)&&this.documentType===e.documentType&&this.documentState===e.documentState&&this.data.isEqual(e.data)}mutableCopy(){return new r(this.key,this.documentType,this.version,this.readTime,this.createTime,this.data.clone(),this.documentState)}toString(){return`Document(${this.key}, ${this.version}, ${JSON.stringify(this.data.value)}, {createTime: ${this.createTime}}), {documentType: ${this.documentType}}), {documentState: ${this.documentState}})`}};/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var aa=-1,gu=class{constructor(e,t,n,s){this.indexId=e,this.collectionGroup=t,this.fields=n,this.indexState=s}};gu.UNKNOWN_ID=-1;function CT(r,e){let t=r.toTimestamp().seconds,n=r.toTimestamp().nanoseconds+1,s=te.fromTimestamp(n===1e9?new ye(t+1,0):new ye(t,n));return new Pr(s,X.empty(),e)}function gT(r){return new Pr(r.readTime,r.key,aa)}var Pr=class r{constructor(e,t,n){this.readTime=e,this.documentKey=t,this.largestBatchId=n}static min(){return new r(te.min(),X.empty(),aa)}static max(){return new r(te.max(),X.empty(),aa)}};function mT(r,e){let t=r.readTime.compareTo(e.readTime);return t!==0?t:(t=X.comparator(r.documentKey,e.documentKey),t!==0?t:ie(r.largestBatchId,e.largestBatchId))}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var SB=class{constructor(e,t=null,n=[],s=[],i=null,a=null,u=null){this.path=e,this.collectionGroup=t,this.orderBy=n,this.filters=s,this.limit=i,this.startAt=a,this.endAt=u,this.Fe=null}};function Em(r,e=null,t=[],n=[],s=null,i=null,a=null){return new SB(r,e,t,n,s,i,a)}function mE(r){let e=ne(r);if(e.Fe===null){let t=e.path.canonicalString();e.collectionGroup!==null&&(t+="|cg:"+e.collectionGroup),t+="|f:",t+=e.filters.map((n=>wB(n))).join(","),t+="|ob:",t+=e.orderBy.map((n=>(function(i){return i.field.canonicalString()+i.dir})(n))).join(","),Pa(e.limit)||(t+="|l:",t+=e.limit),e.startAt&&(t+="|lb:",t+=e.startAt.inclusive?"b:":"a:",t+=e.startAt.position.map((n=>As(n))).join(",")),e.endAt&&(t+="|ub:",t+=e.endAt.inclusive?"a:":"b:",t+=e.endAt.position.map((n=>As(n))).join(",")),e.Fe=t}return e.Fe}function EE(r,e){if(r.limit!==e.limit||r.orderBy.length!==e.orderBy.length)return!1;for(let t=0;t<r.orderBy.length;t++)if(!pT(r.orderBy[t],e.orderBy[t]))return!1;if(r.filters.length!==e.filters.length)return!1;for(let t=0;t<r.filters.length;t++)if(!pE(r.filters[t],e.filters[t]))return!1;return r.collectionGroup===e.collectionGroup&&!!r.path.isEqual(e.path)&&!!mm(r.startAt,e.startAt)&&mm(r.endAt,e.endAt)}function fr(r){return!!r.isCorePipeline}function _E(r){return!!r.path&&X.isDocumentKey(r.path)&&r.collectionGroup===null&&r.filters.length===0}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var Ns=class{constructor(e,t=null,n=[],s=[],i=null,a="F",u=null,c=null){this.path=e,this.collectionGroup=t,this.explicitOrderBy=n,this.filters=s,this.limit=i,this.limitType=a,this.startAt=u,this.endAt=c,this.Oe=null,this.Me=null,this.Ne=null,this.startAt,this.endAt}};function ET(r,e,t,n,s,i,a,u){return new Ns(r,e,t,n,s,i,a,u)}function Oa(r){return new Ns(r)}function _m(r){return r.filters.length===0&&r.limit===null&&r.startAt==null&&r.endAt==null&&(r.explicitOrderBy.length===0||r.explicitOrderBy.length===1&&r.explicitOrderBy[0].field.isKeyField())}function _T(r){return X.isDocumentKey(r.path)&&r.collectionGroup===null&&r.filters.length===0}function yE(r){return r.collectionGroup!==null}function ps(r){let e=ne(r);if(e.Oe===null){e.Oe=[];let t=new Set;for(let i of e.explicitOrderBy)e.Oe.push(i),t.add(i.field.canonicalString());let n=e.explicitOrderBy.length>0?e.explicitOrderBy[e.explicitOrderBy.length-1].dir:"asc";(function(a){let u=new Fe(ht.comparator);return a.filters.forEach((c=>{c.getFlattenedFilters().forEach((l=>{l.isInequality()&&(u=u.add(l.field))}))})),u})(e).forEach((i=>{t.has(i.canonicalString())||i.isKeyField()||e.Oe.push(new Sr(i,n))})),t.has(ht.keyField().canonicalString())||e.Oe.push(new Sr(ht.keyField(),n))}return e.Oe}function Yt(r){let e=ne(r);return e.Me||(e.Me=yT(e,ps(r))),e.Me}function yT(r,e){if(r.limitType==="F")return Em(r.path,r.collectionGroup,e,r.filters,r.limit,r.startAt,r.endAt);{e=e.map((s=>{let i=s.dir==="desc"?"asc":"desc";return new Sr(s.field,i)}));let t=r.endAt?new Rr(r.endAt.position,r.endAt.inclusive):null,n=r.startAt?new Rr(r.startAt.position,r.startAt.inclusive):null;return Em(r.path,r.collectionGroup,e,r.filters,r.limit,t,n)}}function mu(r,e,t){return new Ns(r.path,r.collectionGroup,r.explicitOrderBy.slice(),r.filters.slice(),e,t,r.startAt,r.endAt)}function wT(r,e){return EE(Yt(r),Yt(e))&&r.limitType===e.limitType}function zi(r){return`Query(target=${(function(t){let n=t.path.canonicalString();return t.collectionGroup!==null&&(n+=" collectionGroup="+t.collectionGroup),t.filters.length>0&&(n+=`, filters: [${t.filters.map((s=>CE(s))).join(", ")}]`),Pa(t.limit)||(n+=", limit: "+t.limit),t.orderBy.length>0&&(n+=`, orderBy: [${t.orderBy.map((s=>(function(a){return`${a.field.canonicalString()} (${a.dir})`})(s))).join(", ")}]`),t.startAt&&(n+=", startAt: ",n+=t.startAt.inclusive?"b:":"a:",n+=t.startAt.position.map((s=>As(s))).join(",")),t.endAt&&(n+=", endAt: ",n+=t.endAt.inclusive?"a:":"b:",n+=t.endAt.position.map((s=>As(s))).join(",")),`Target(${n})`})(Yt(r))}; limitType=${r.limitType})`}function lc(r,e){return e.isFoundDocument()&&(function(n,s){let i=s.key.path;return n.collectionGroup!==null?s.key.hasCollectionId(n.collectionGroup)&&n.path.isPrefixOf(i):X.isDocumentKey(n.path)?n.path.isEqual(i):n.path.isImmediateParentOf(i)})(r,e)&&(function(n,s){for(let i of ps(n))if(!i.field.isKeyField()&&s.data.field(i.field)===null)return!1;return!0})(r,e)&&(function(n,s){for(let i of n.filters)if(!i.matches(s))return!1;return!0})(r,e)&&(function(n,s){return!(n.startAt&&!(function(a,u,c){let l=gm(a,u,c);return a.inclusive?l<=0:l<0})(n.startAt,ps(n),s)||n.endAt&&!(function(a,u,c){let l=gm(a,u,c);return a.inclusive?l>=0:l>0})(n.endAt,ps(n),s))})(r,e)}function fd(r){return(e,t)=>{let n=!1;for(let s of ps(r)){let i=DT(s,e,t);if(i!==0)return i;n=n||s.field.isKeyField()}return 0}}function DT(r,e,t){let n=r.field.isKeyField()?X.comparator(e.key,t.key):(function(i,a,u){let c=a.data.field(i),l=u.data.field(i);return c!==null&&l!==null?dt(c,l):$(42886)})(r.field,e,t);switch(r.dir){case"asc":return n;case"desc":return-1*n;default:return $(19790,{direction:r.dir})}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var PB=class{constructor(e,t){this.count=e,this.unchangedNames=t}};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var be,Be;function wE(r){switch(r){case k.OK:return $(64938);case k.CANCELLED:case k.UNKNOWN:case k.DEADLINE_EXCEEDED:case k.RESOURCE_EXHAUSTED:case k.INTERNAL:case k.UNAVAILABLE:case k.UNAUTHENTICATED:return!1;case k.INVALID_ARGUMENT:case k.NOT_FOUND:case k.ALREADY_EXISTS:case k.PERMISSION_DENIED:case k.FAILED_PRECONDITION:case k.ABORTED:case k.OUT_OF_RANGE:case k.UNIMPLEMENTED:case k.DATA_LOSS:return!0;default:return $(15467,{code:r})}}function DE(r){if(r===void 0)return gn("GRPC error has no .code"),k.UNKNOWN;switch(r){case be.OK:return k.OK;case be.CANCELLED:return k.CANCELLED;case be.UNKNOWN:return k.UNKNOWN;case be.DEADLINE_EXCEEDED:return k.DEADLINE_EXCEEDED;case be.RESOURCE_EXHAUSTED:return k.RESOURCE_EXHAUSTED;case be.INTERNAL:return k.INTERNAL;case be.UNAVAILABLE:return k.UNAVAILABLE;case be.UNAUTHENTICATED:return k.UNAUTHENTICATED;case be.INVALID_ARGUMENT:return k.INVALID_ARGUMENT;case be.NOT_FOUND:return k.NOT_FOUND;case be.ALREADY_EXISTS:return k.ALREADY_EXISTS;case be.PERMISSION_DENIED:return k.PERMISSION_DENIED;case be.FAILED_PRECONDITION:return k.FAILED_PRECONDITION;case be.ABORTED:return k.ABORTED;case be.OUT_OF_RANGE:return k.OUT_OF_RANGE;case be.UNIMPLEMENTED:return k.UNIMPLEMENTED;case be.DATA_LOSS:return k.DATA_LOSS;default:return $(39323,{code:r})}}(Be=be||(be={}))[Be.OK=0]="OK",Be[Be.CANCELLED=1]="CANCELLED",Be[Be.UNKNOWN=2]="UNKNOWN",Be[Be.INVALID_ARGUMENT=3]="INVALID_ARGUMENT",Be[Be.DEADLINE_EXCEEDED=4]="DEADLINE_EXCEEDED",Be[Be.NOT_FOUND=5]="NOT_FOUND",Be[Be.ALREADY_EXISTS=6]="ALREADY_EXISTS",Be[Be.PERMISSION_DENIED=7]="PERMISSION_DENIED",Be[Be.UNAUTHENTICATED=16]="UNAUTHENTICATED",Be[Be.RESOURCE_EXHAUSTED=8]="RESOURCE_EXHAUSTED",Be[Be.FAILED_PRECONDITION=9]="FAILED_PRECONDITION",Be[Be.ABORTED=10]="ABORTED",Be[Be.OUT_OF_RANGE=11]="OUT_OF_RANGE",Be[Be.UNIMPLEMENTED=12]="UNIMPLEMENTED",Be[Be.INTERNAL=13]="INTERNAL",Be[Be.UNAVAILABLE=14]="UNAVAILABLE",Be[Be.DATA_LOSS=15]="DATA_LOSS";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var yn=class{constructor(e,t){this.mapKeyFn=e,this.equalsFn=t,this.inner={},this.innerSize=0}get(e){let t=this.mapKeyFn(e),n=this.inner[t];if(n!==void 0){for(let[s,i]of n)if(this.equalsFn(s,e))return i}}has(e){return this.get(e)!==void 0}set(e,t){let n=this.mapKeyFn(e),s=this.inner[n];if(s===void 0)return this.inner[n]=[[e,t]],void this.innerSize++;for(let i=0;i<s.length;i++)if(this.equalsFn(s[i][0],e))return void(s[i]=[e,t]);s.push([e,t]),this.innerSize++}delete(e){let t=this.mapKeyFn(e),n=this.inner[t];if(n===void 0)return!1;for(let s=0;s<n.length;s++)if(this.equalsFn(n[s][0],e))return n.length===1?delete this.inner[t]:n.splice(s,1),this.innerSize--,!0;return!1}forEach(e){jn(this.inner,((t,n)=>{for(let[s,i]of n)e(s,i)}))}isEmpty(){return Km(this.inner)}size(){return this.innerSize}};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var IT=new we(X.comparator);function Bt(){return IT}var IE=new we(X.comparator);function cs(...r){let e=IE;for(let t of r)e=e.insert(t.key,t);return e}function TE(r){let e=IE;return r.forEach(((t,n)=>e=e.insert(t,n.overlayedDocument))),e}function xn(){return Wi()}function AE(){return Wi()}function Wi(){return new yn((r=>r.toString()),((r,e)=>r.isEqual(e)))}var TT=new we(X.comparator),AT=new Fe(X.comparator);function oe(...r){let e=AT;for(let t of r)e=e.add(t);return e}var bT=new Fe(ie);function vT(){return bT}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var RT=null;/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ST(){return new TextEncoder}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var PT=new cn([4294967295,4294967295],0);function ym(r){let e=ST().encode(r),t=new Kl;return t.update(e),new Uint8Array(t.digest())}function wm(r){let e=new DataView(r.buffer),t=e.getUint32(0,!0),n=e.getUint32(4,!0),s=e.getUint32(8,!0),i=e.getUint32(12,!0);return[new cn([t,n],0),new cn([s,i],0)]}var NB=class r{constructor(e,t,n){if(this.bitmap=e,this.padding=t,this.hashCount=n,t<0||t>=8)throw new dr(`Invalid padding: ${t}`);if(n<0)throw new dr(`Invalid hash count: ${n}`);if(e.length>0&&this.hashCount===0)throw new dr(`Invalid hash count: ${n}`);if(e.length===0&&t!==0)throw new dr(`Invalid padding when bitmap length is 0: ${t}`);this.Be=8*e.length-t,this.Le=cn.fromNumber(this.Be)}$e(e,t,n){let s=e.add(t.multiply(cn.fromNumber(n)));return s.compare(PT)===1&&(s=new cn([s.getBits(0),s.getBits(1)],0)),s.modulo(this.Le).toNumber()}Ue(e){return!!(this.bitmap[Math.floor(e/8)]&1<<e%8)}mightContain(e){if(this.Be===0)return!1;let t=ym(e),[n,s]=wm(t);for(let i=0;i<this.hashCount;i++){let a=this.$e(n,s,i);if(!this.Ue(a))return!1}return!0}static create(e,t,n){let s=e%8==0?0:8-e%8,i=new Uint8Array(Math.ceil(e/8)),a=new r(i,s,t);return n.forEach((u=>a.insert(u))),a}insert(e){if(this.Be===0)return;let t=ym(e),[n,s]=wm(t);for(let i=0;i<this.hashCount;i++){let a=this.$e(n,s,i);this.ke(a)}}ke(e){let t=Math.floor(e/8),n=e%8;this.bitmap[t]|=1<<n}},dr=class extends Error{constructor(){super(...arguments),this.name="BloomFilterError"}};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var oa=class r{constructor(e,t,n,s,i,a){this.snapshotVersion=e,this.targetChanges=t,this.targetMismatches=n,this.documentUpdates=s,this.augmentedDocumentUpdates=i,this.resolvedLimboDocuments=a}static createSynthesizedRemoteEventForCurrentChange(e,t,n){let s=new Map;return s.set(e,ua.createSynthesizedTargetChangeForCurrentChange(e,t,n)),new r(te.min(),s,new we(ie),Bt(),Bt(),oe())}},ua=class r{constructor(e,t,n,s,i){this.resumeToken=e,this.current=t,this.addedDocuments=n,this.modifiedDocuments=s,this.removedDocuments=i}static createSynthesizedTargetChangeForCurrentChange(e,t,n){return new r(n,t,oe(),oe(),oe())}};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var Cs=class{constructor(e,t,n,s){this.Qe=e,this.removedTargetIds=t,this.key=n,this.qe=s}},Eu=class{constructor(e,t){this.targetId=e,this.Ke=t}},_u=class{constructor(e,t,n=Ee.EMPTY_BYTE_STRING,s=null){this.state=e,this.targetIds=t,this.resumeToken=n,this.cause=s}},yu=class{constructor(e){this.targetId=e,this.We=0,this.Ge=Dm(),this.je=Ee.EMPTY_BYTE_STRING,this.ze=!1,this.He=!0}get current(){return this.ze}get resumeToken(){return this.je}get Je(){return this.We!==0}get Ye(){return this.He}Ze(e){e.approximateByteSize()>0&&(this.He=!0,this.je=e)}Xe(){let e=oe(),t=oe(),n=oe();return this.Ge.forEach(((s,i)=>{switch(i){case 0:e=e.add(s);break;case 2:t=t.add(s);break;case 1:n=n.add(s);break;default:$(38017,{changeType:i})}})),new ua(this.je,this.ze,e,t,n)}et(){this.He=!1,this.Ge=Dm()}tt(e,t){this.He=!0,this.Ge=this.Ge.insert(e,t)}nt(e){this.He=!0,this.Ge=this.Ge.remove(e)}rt(){this.We+=1}it(){this.We-=1,z(this.We>=0,3241,{We:this.We,targetId:this.targetId})}st(){this.He=!0,this.ze=!0}},Hi="WatchChangeAggregator",OB=class{constructor(e){this._t=e,this.ot=new Map,this.ut=Bt(),this.ct=nu(),this.lt=Bt(),this.Et=nu(),this.ht=new we(ie)}Tt(e){for(let t of e.Qe)e.qe&&e.qe.isFoundDocument()?this.Pt(t,e.qe):this.It(t,e.key,e.qe);for(let t of e.removedTargetIds)this.It(t,e.key,e.qe)}Rt(e){this.forEachTarget(e,(t=>{let n=this.ot.get(t);if(n)switch(e.state){case 0:this.At(t)&&n.Ze(e.resumeToken);break;case 1:n.it(),n.Je||n.et(),n.Ze(e.resumeToken);break;case 2:n.it(),n.Je||this.removeTarget(t);break;case 3:this.At(t)&&(n.st(),n.Ze(e.resumeToken));break;case 4:this.At(t)&&(this.Vt(t),n.Ze(e.resumeToken));break;default:$(56790,{state:e.state})}else K(Hi,`handleTargetChange received targetChange for untracked target ID (${t}) with state (${e.state})`)}))}forEachTarget(e,t){e.targetIds.length>0?e.targetIds.forEach(t):this.ot.forEach(((n,s)=>{this.At(s)&&t(s)}))}dt(e){return fr(e)?e.getPipelineSourceType()==="documents"&&e.getPipelineDocuments()?.length===1:_E(e)}ft(e){let t=e.targetId,n=e.Ke.count,s=this.gt(t);if(s){let i=s.target;if(this.dt(i))if(n===0){let a=new X(fr(i)?he.fromString(i.getPipelineDocuments()[0]):i.path);this.It(t,a,It.newNoDocument(a,te.min()))}else z(n===1,20013,"Single document existence filter with count: "+n);else{let a=this.yt(t);if(a!==n){let u=this.wt(e),c=u?this.bt(u,e,a):1;if(c!==0){this.Vt(t);let l=c===2?"TargetPurposeExistenceFilterMismatchBloom":"TargetPurposeExistenceFilterMismatch";this.ht=this.ht.insert(t,l)}RT?.St((function(h,d,C,y,D){let P={localCacheCount:h,existenceFilterCount:d.count,databaseId:C.database,projectId:C.projectId},V=d.unchangedNames;return V&&(P.bloomFilter={applied:D===0,hashCount:V?.hashCount??0,bitmapLength:V?.bits?.bitmap?.length??0,padding:V?.bits?.padding??0,mightContain:q=>y?.mightContain(q)??!1}),P})(a,e.Ke,this._t.xt(),u,c))}}}}wt(e){let t=e.Ke.unchangedNames;if(!t||!t.bits)return null;let{bits:{bitmap:n="",padding:s=0},hashCount:i=0}=t,a,u;try{a=Lt(n).toUint8Array()}catch(c){if(c instanceof hu)return Pt("Decoding the base64 bloom filter in existence filter failed ("+c.message+"); ignoring the bloom filter and falling back to full re-query."),null;throw c}try{u=new NB(a,s,i)}catch(c){return Pt(c instanceof dr?"BloomFilter error: ":"Applying bloom filter failed: ",c),null}return u.Be===0?null:u}bt(e,t,n){return t.Ke.count===n-this.vt(e,t.targetId)?0:2}vt(e,t){let n=this._t.getRemoteKeysForTarget(t),s=0;return n.forEach((i=>{let a=this._t.xt(),u=`projects/${a.projectId}/databases/${a.database}/documents/${i.path.canonicalString()}`;e.mightContain(u)||(this.It(t,i,null),s++)})),s}Dt(e){let t=new Map;this.ot.forEach(((i,a)=>{let u=this.gt(a);if(u){if(i.current&&this.dt(u.target)){let c=fr(u.target)?he.fromString(u.target.getPipelineDocuments()[0]):u.target.path,l=new X(c);this.Ct(l).has(a)||this.Ft(a,l)||this.It(a,l,It.newNoDocument(l,e))}i.Ye&&(t.set(a,i.Xe()),i.et())}}));let n=oe();this.Et.forEach(((i,a)=>{let u=!0;a.forEachWhile((c=>{let l=this.gt(c);return!l||l.purpose==="TargetPurposeLimboResolution"||(u=!1,!1)})),u&&(n=n.add(i))})),this.ut.forEach(((i,a)=>a.setReadTime(e))),this.lt.forEach(((i,a)=>a.setReadTime(e)));let s=new oa(e,t,this.ht,this.ut,this.lt,n);return this.ut=Bt(),this.ct=nu(),this.lt=Bt(),this.Et=nu(),this.ht=new we(ie),s}Pt(e,t){let n=this.ot.get(e);if(!n||!this.At(e))return void K(Hi,`addDocumentToTarget received document for unknown inactive target (${e})`);let s=this.Ft(e,t.key)?2:0;n.tt(t.key,s),fr(this.gt(e).target)&&this.gt(e).target.getPipelineFlavor()!=="exact"?this.lt=this.lt.insert(t.key,t):this.ut=this.ut.insert(t.key,t),this.ct=this.ct.insert(t.key,this.Ct(t.key).add(e)),this.Et=this.Et.insert(t.key,this.Ot(t.key).add(e))}It(e,t,n){let s=this.ot.get(e);s&&this.At(e)?(this.Ft(e,t)?s.tt(t,1):s.nt(t),this.Et=this.Et.insert(t,this.Ot(t).delete(e)),this.Et=this.Et.insert(t,this.Ot(t).add(e)),n&&(fr(this.gt(e).target)&&this.gt(e).target.getPipelineFlavor()!=="exact"?this.lt=this.lt.insert(t,n):this.ut=this.ut.insert(t,n))):K(Hi,`removeDocumentFromTarget received document for unknown or inactive target (${e})`)}removeTarget(e){this.ot.delete(e)}yt(e){let t=this.ot.get(e);if(!t)return 0;let n=t.Xe();return this._t.getRemoteKeysForTarget(e).size+n.addedDocuments.size-n.removedDocuments.size}rt(e){let t=this.ot.get(e);t||(K(Hi,`recordPendingTargetRequest set up tracking for target ID ${e}`),t=new yu(e),this.ot.set(e,t)),t.rt()}Ot(e){let t=this.Et.get(e);return t||(t=new Fe(ie),this.Et=this.Et.insert(e,t)),t}Ct(e){let t=this.ct.get(e);return t||(t=new Fe(ie),this.ct=this.ct.insert(e,t)),t}At(e){let t=this.gt(e)!==null;return t||K(Hi,"Detected inactive target",e),t}gt(e){let t=this.ot.get(e);return t===void 0||t.Je?null:this._t.Mt(e)}Vt(e){this.ot.set(e,new yu(e)),this._t.getRemoteKeysForTarget(e).forEach((t=>{this.It(e,t,null)}))}Ft(e,t){return this._t.getRemoteKeysForTarget(e).has(t)}};function nu(){return new we(X.comparator)}function Dm(){return new we(X.comparator)}var NT={asc:"ASCENDING",desc:"DESCENDING"},OT={"<":"LESS_THAN","<=":"LESS_THAN_OR_EQUAL",">":"GREATER_THAN",">=":"GREATER_THAN_OR_EQUAL","==":"EQUAL","!=":"NOT_EQUAL","array-contains":"ARRAY_CONTAINS",in:"IN","not-in":"NOT_IN","array-contains-any":"ARRAY_CONTAINS_ANY"},xT={and:"AND",or:"OR"},xB=class{constructor(e,t){this.databaseId=e,this.useProto3Json=t}};function FB(r,e){return r.useProto3Json||Pa(e)?e:{value:e}}function Qi(r,e){return r.useProto3Json?`${new Date(1e3*e.seconds).toISOString().replace(/\.\d*/,"").replace("Z","")}.${("000000000"+e.nanoseconds).slice(-9)}Z`:{seconds:""+e.seconds,nanos:e.nanoseconds}}function dd(r){let e=mn(r);return new ye(e.seconds,e.nanos)}function LB(r,e){return r.useProto3Json?e.toBase64():e.toUint8Array()}function cu(r,e){return Qi(r,e.toTimestamp())}function yt(r){return z(!!r,49232),te.fromTimestamp(dd(r))}function pd(r,e){return kB(r,e).canonicalString()}function kB(r,e){let t=(function(s){return new he(["projects",s.projectId,"databases",s.database])})(r).child("documents");return e===void 0?t:t.child(e)}function bE(r){let e=he.fromString(r);return z(OE(e),10190,{key:e.toString()}),e}function ca(r,e){return pd(r.databaseId,e.path)}function $i(r,e){let t=bE(e);if(t.get(1)!==r.databaseId.projectId)throw new j(k.INVALID_ARGUMENT,"Tried to deserialize key from different project: "+t.get(1)+" vs "+r.databaseId.projectId);if(t.get(3)!==r.databaseId.database)throw new j(k.INVALID_ARGUMENT,"Tried to deserialize key from different database: "+t.get(3)+" vs "+r.databaseId.database);return new X(RE(t))}function vE(r,e){return pd(r.databaseId,e)}function FT(r){let e=bE(r);return e.length===4?he.emptyPath():RE(e)}function VB(r){return new he(["projects",r.databaseId.projectId,"databases",r.databaseId.database]).canonicalString()}function RE(r){return z(r.length>4&&r.get(4)==="documents",29091,{key:r.toString()}),r.popFirst(5)}function Im(r,e,t){return{name:ca(r,e),fields:t.value.mapValue.fields}}function LT(r,e){return"found"in e?(function(n,s){z(!!s.found,43571),s.found.name,s.found.updateTime;let i=$i(n,s.found.name),a=yt(s.found.updateTime),u=s.found.createTime?yt(s.found.createTime):te.min(),c=new tt({mapValue:{fields:s.found.fields}});return It.newFoundDocument(i,a,u,c)})(r,e):"missing"in e?(function(n,s){z(!!s.missing,3894),z(!!s.readTime,22933);let i=$i(n,s.missing),a=yt(s.readTime);return It.newNoDocument(i,a)})(r,e):$(7234,{result:e})}function kT(r,e){let t;if("targetChange"in e){e.targetChange;let n=(function(l){return l==="NO_CHANGE"?0:l==="ADD"?1:l==="REMOVE"?2:l==="CURRENT"?3:l==="RESET"?4:$(39313,{state:l})})(e.targetChange.targetChangeType||"NO_CHANGE"),s=e.targetChange.targetIds||[],i=(function(l,h){return l.useProto3Json?(z(h===void 0||typeof h=="string",58123),Ee.fromBase64String(h||"")):(z(h===void 0||h instanceof Buffer||h instanceof Uint8Array,16193),Ee.fromUint8Array(h||new Uint8Array))})(r,e.targetChange.resumeToken),a=e.targetChange.cause,u=a&&(function(l){let h=l.code===void 0?k.UNKNOWN:DE(l.code);return new j(h,l.message||"")})(a);t=new _u(n,s,i,u||null)}else if("documentChange"in e){e.documentChange;let n=e.documentChange;n.document,n.document.name,n.document.updateTime;let s=$i(r,n.document.name),i=yt(n.document.updateTime),a=n.document.createTime?yt(n.document.createTime):te.min(),u=new tt({mapValue:{fields:n.document.fields}}),c=It.newFoundDocument(s,i,a,u),l=n.targetIds||[],h=n.removedTargetIds||[];t=new Cs(l,h,c.key,c)}else if("documentDelete"in e){e.documentDelete;let n=e.documentDelete;n.document;let s=$i(r,n.document),i=n.readTime?yt(n.readTime):te.min(),a=It.newNoDocument(s,i),u=n.removedTargetIds||[];t=new Cs([],u,a.key,a)}else if("documentRemove"in e){e.documentRemove;let n=e.documentRemove;n.document;let s=$i(r,n.document),i=n.removedTargetIds||[];t=new Cs([],i,s,null)}else{if(!("filter"in e))return $(11601,{Nt:e});{e.filter;let n=e.filter;n.targetId;let{count:s=0,unchangedNames:i}=n,a=new PB(s,i),u=n.targetId;t=new Eu(u,a)}}return t}function SE(r,e){let t;if(e instanceof br)t={update:Im(r,e.key,e.value)};else if(e instanceof vr)t={delete:ca(r,e.key)};else if(e instanceof Xt)t={update:Im(r,e.key,e.data),updateMask:zT(e.fieldMask)};else{if(!(e instanceof pu))return $(16599,{Bt:e.type});t={verify:ca(r,e.key)}}return e.fieldTransforms.length>0&&(t.updateTransforms=e.fieldTransforms.map((n=>(function(i,a){let u=a.transform;if(u instanceof Dr)return{fieldPath:a.field.canonicalString(),setToServerValue:"REQUEST_TIME"};if(u instanceof Ir)return{fieldPath:a.field.canonicalString(),appendMissingElements:{values:u.elements}};if(u instanceof Tr)return{fieldPath:a.field.canonicalString(),removeAllFromArray:{values:u.elements}};if(u instanceof Ar)return{fieldPath:a.field.canonicalString(),increment:u.xe};if(u instanceof Rs)return{fieldPath:a.field.canonicalString(),minimum:u.xe};if(u instanceof Ss)return{fieldPath:a.field.canonicalString(),maximum:u.xe};throw $(20930,{transform:a.transform})})(0,n)))),e.precondition.isNone||(t.currentDocument=(function(s,i){return i.updateTime!==void 0?{updateTime:cu(s,i.updateTime)}:i.exists!==void 0?{exists:i.exists}:$(27497)})(r,e.precondition)),t}function VT(r,e){return r&&r.length>0?(z(e!==void 0,14353),r.map((t=>(function(s,i){let a=s.updateTime?yt(s.updateTime):yt(i);return a.isEqual(te.min())&&(a=yt(i)),new yB(a,s.transformResults||[])})(t,e)))):[]}function MT(r,e){return{documents:[vE(r,e.path)]}}function GT(r,e){let t={structuredQuery:{}},n=e.path,s;e.collectionGroup!==null?(s=n,t.structuredQuery.from=[{collectionId:e.collectionGroup,allDescendants:!0}]):(s=n.popLast(),t.structuredQuery.from=[{collectionId:n.lastSegment()}]),t.parent=vE(r,s);let i=(function(l){if(l.length!==0)return NE(Vt.create(l,"and"))})(e.filters);i&&(t.structuredQuery.where=i);let a=(function(l){if(l.length!==0)return l.map((h=>(function(C){return{field:ls(C.field),direction:jT(C.dir)}})(h)))})(e.orderBy);a&&(t.structuredQuery.orderBy=a);let u=FB(r,e.limit);return u!==null&&(t.structuredQuery.limit=u),e.startAt&&(t.structuredQuery.startAt=(function(l){return{before:l.inclusive,values:l.position}})(e.startAt)),e.endAt&&(t.structuredQuery.endAt=(function(l){return{before:!l.inclusive,values:l.position}})(e.endAt)),{Lt:t,parent:s}}function UT(r){let e=FT(r.parent),t=r.structuredQuery,n=t.from?t.from.length:0,s=null;if(n>0){z(n===1,65062);let h=t.from[0];h.allDescendants?s=h.collectionId:e=e.child(h.collectionId)}let i=[];t.where&&(i=(function(d){let C=PE(d);return C instanceof Vt&&dE(C)?C.getFilters():[C]})(t.where));let a=[];t.orderBy&&(a=(function(d){return d.map((C=>(function(D){return new Sr(Bs(D.field),(function(V){switch(V){case"ASCENDING":return"asc";case"DESCENDING":return"desc";default:return}})(D.direction))})(C)))})(t.orderBy));let u=null;t.limit&&(u=(function(d){let C;return C=typeof d=="object"?d.value:d,Pa(C)?null:C})(t.limit));let c=null;t.startAt&&(c=(function(d){let C=!!d.before,y=d.values||[];return new Rr(y,C)})(t.startAt));let l=null;return t.endAt&&(l=(function(d){let C=!d.before,y=d.values||[];return new Rr(y,C)})(t.endAt)),ET(e,s,a,i,u,"F",c,l)}function HT(r,e){let t=(function(s){switch(s){case"TargetPurposeListen":return null;case"TargetPurposeExistenceFilterMismatch":return"existence-filter-mismatch";case"TargetPurposeExistenceFilterMismatchBloom":return"existence-filter-mismatch-bloom";case"TargetPurposeLimboResolution":return"limbo-document";default:return $(28987,{purpose:s})}})(e.purpose);return t==null?null:{"goog-listen-tags":t}}function qT(r,e){return{structuredPipeline:{pipeline:{stages:e.stages.map((t=>t._toProto(r)))}}}}function PE(r){return r.unaryFilter!==void 0?(function(t){switch(t.unaryFilter.op){case"IS_NAN":let n=Bs(t.unaryFilter.field);return Re.create(n,"==",{doubleValue:NaN});case"IS_NULL":let s=Bs(t.unaryFilter.field);return Re.create(s,"==",{nullValue:"NULL_VALUE"});case"IS_NOT_NAN":let i=Bs(t.unaryFilter.field);return Re.create(i,"!=",{doubleValue:NaN});case"IS_NOT_NULL":let a=Bs(t.unaryFilter.field);return Re.create(a,"!=",{nullValue:"NULL_VALUE"});case"OPERATOR_UNSPECIFIED":return $(61313);default:return $(60726)}})(r):r.fieldFilter!==void 0?(function(t){return Re.create(Bs(t.fieldFilter.field),(function(s){switch(s){case"EQUAL":return"==";case"NOT_EQUAL":return"!=";case"GREATER_THAN":return">";case"GREATER_THAN_OR_EQUAL":return">=";case"LESS_THAN":return"<";case"LESS_THAN_OR_EQUAL":return"<=";case"ARRAY_CONTAINS":return"array-contains";case"IN":return"in";case"NOT_IN":return"not-in";case"ARRAY_CONTAINS_ANY":return"array-contains-any";case"OPERATOR_UNSPECIFIED":return $(58110);default:return $(50506)}})(t.fieldFilter.op),t.fieldFilter.value)})(r):r.compositeFilter!==void 0?(function(t){return Vt.create(t.compositeFilter.filters.map((n=>PE(n))),(function(s){switch(s){case"AND":return"and";case"OR":return"or";default:return $(1026)}})(t.compositeFilter.op))})(r):$(30097,{filter:r})}function jT(r){return NT[r]}function KT(r){return OT[r]}function JT(r){return xT[r]}function ls(r){return{fieldPath:r.canonicalString()}}function Bs(r){return ht.fromServerFormat(r.fieldPath)}function NE(r){return r instanceof Re?(function(t){if(t.op==="=="){if(Je(t.value))return{unaryFilter:{field:ls(t.field),op:"IS_NAN"}};if(_t(t.value))return{unaryFilter:{field:ls(t.field),op:"IS_NULL"}}}else if(t.op==="!="){if(Je(t.value))return{unaryFilter:{field:ls(t.field),op:"IS_NOT_NAN"}};if(_t(t.value))return{unaryFilter:{field:ls(t.field),op:"IS_NOT_NULL"}}}return{fieldFilter:{field:ls(t.field),op:KT(t.op),value:t.value}}})(r):r instanceof Vt?(function(t){let n=t.getFilters().map((s=>NE(s)));return n.length===1?n[0]:{compositeFilter:{op:JT(t.op),filters:n}}})(r):$(54877,{filter:r})}function zT(r){let e=[];return r.fields.forEach((t=>e.push(t.canonicalString()))),{fieldPaths:e}}function OE(r){return r.length>=4&&r.get(0)==="projects"&&r.get(2)==="databases"}function xE(r){return!!r&&typeof r._toProto=="function"&&r._protoValueType==="ProtoValue"}function la(r,e){let t={fields:{}};return e.forEach(((n,s)=>{if(typeof s!="string")throw new Error(`Cannot encode map with non-string key: ${s}`);t.fields[s]=n._toProto(r)})),{mapValue:t}}function wu(r){return{stringValue:r}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Bc(r){return new xB(r,!0)}/**
 * @license
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var Os=class{constructor(e){this.value=e}isEqual(e){return this.value===e.value}};/**
 * @license
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var xs=class{constructor(e,t){if(this.seconds=e,this.increment=t,!Number.isInteger(e)||e<0||e>4294967295)throw new Error("BsonTimestamp 'seconds' must be in the range of a 32-bit unsigned integer (0-4294967295).");if(!Number.isInteger(t)||t<0||t>4294967295)throw new Error("BsonTimestamp 'increment' must be in the range of a 32-bit unsigned integer (0-4294967295).")}isEqual(e){return this.seconds===e.seconds&&this.increment===e.increment}};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var wt=class r{constructor(e,t=0){if(this.subtype=t,!Number.isInteger(t)||t<0||t>255)throw new j(k.INVALID_ARGUMENT,"The subtype for Bytes must be a value in the inclusive [0, 255] range.");this._byteString=e}static fromBase64String(e,t=0){try{return new r(Ee.fromBase64String(e),t)}catch(n){throw new j(k.INVALID_ARGUMENT,"Failed to construct data from Base64 string: "+n)}}static fromUint8Array(e,t=0){return new r(Ee.fromUint8Array(e),t)}toBase64(){return this._byteString.toBase64()}toUint8Array(){return this._byteString.toUint8Array()}get data(){return this.toUint8Array()}toString(){return"Bytes(base64: "+this.toBase64()+", subtype: "+this.subtype+")"}isEqual(e){return this.subtype===e.subtype&&this._byteString.isEqual(e._byteString)}toJSON(){let e={type:r._jsonSchemaVersion,bytes:this.toBase64()};return this.subtype!==0&&(e.subtype=this.subtype),e}static fromJSON(e){if(Ra(e,r._jsonSchema)){let t=e.subtype??0;return r.fromBase64String(e.bytes,t)}}};wt._jsonSchemaVersion="firestore/bytes/1.0",wt._jsonSchema={type:Ae("string",wt._jsonSchemaVersion),bytes:Ae("string"),subtype:{...Ae("number"),optional:!0}};/**
 * @license
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var Fs=class{constructor(e){this.stringValue=e,this.value=fe.fromString(e)}isEqual(e){return!(!this.value.oe()||!e.value.oe())||this.value.compareTo(e.value)===0}toJSON(){return{Ut:{stringValue:this.stringValue}}}};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var Nr=class{constructor(...e){for(let t=0;t<e.length;++t)if(e[t].length===0)throw new j(k.INVALID_ARGUMENT,"Invalid field name at argument $(i + 1). Field names must not be empty.");this._internalPath=new ht(e)}isEqual(e){return this._internalPath.isEqual(e._internalPath)}};function FE(){return new Nr(Es)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var Or=class{constructor(e){this._methodName=e}};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var fn=class r{constructor(e,t){if(!isFinite(e)||e<-90||e>90)throw new j(k.INVALID_ARGUMENT,"Latitude must be a number between -90 and 90, but was: "+e);if(!isFinite(t)||t<-180||t>180)throw new j(k.INVALID_ARGUMENT,"Longitude must be a number between -180 and 180, but was: "+t);this._lat=e,this._long=t}get latitude(){return this._lat}get longitude(){return this._long}isEqual(e){return this._lat===e._lat&&this._long===e._long}_compareTo(e){return ie(this._lat,e._lat)||ie(this._long,e._long)}toJSON(){return{latitude:this._lat,longitude:this._long,type:r._jsonSchemaVersion}}static fromJSON(e){if(Ra(e,r._jsonSchema))return new r(e.latitude,e.longitude)}};fn._jsonSchemaVersion="firestore/geoPoint/1.0",fn._jsonSchema={type:Ae("string",fn._jsonSchemaVersion),latitude:Ae("number"),longitude:Ae("number")};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var Ls=class{constructor(e){this.value=e}isEqual(e){return this.value===e.value}};/**
 * @license
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var xr=class r{constructor(){this.type="MaxKey"}static instance(){return r.MAX_KEY_VALUE_INSTANCE||(r.MAX_KEY_VALUE_INSTANCE=new r),r.MAX_KEY_VALUE_INSTANCE}};xr.MAX_KEY_VALUE_INSTANCE=null;/**
 * @license
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var Fr=class r{constructor(){this.type="MinKey"}static instance(){return r.MIN_KEY_VALUE_INSTANCE||(r.MIN_KEY_VALUE_INSTANCE=new r),r.MIN_KEY_VALUE_INSTANCE}};Fr.MIN_KEY_VALUE_INSTANCE=null;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var je=class{constructor(e){this.uid=e}isAuthenticated(){return this.uid!=null}toKey(){return this.isAuthenticated()?"uid:"+this.uid:"anonymous-user"}isEqual(e){return e.uid===this.uid}};je.UNAUTHENTICATED=new je(null),je.GOOGLE_CREDENTIALS=new je("google-credentials-uid"),je.FIRST_PARTY=new je("first-party-uid"),je.MOCK_USER=new je("mock-user");/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var kt=class{constructor(){this.promise=new Promise(((e,t)=>{this.resolve=e,this.reject=t}))}};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var Du=class{constructor(e,t){this.user=t,this.type="OAuth",this.headers=new Map,this.headers.set("Authorization",`Bearer ${e}`)}},Iu=class{getToken(){return Promise.resolve(null)}invalidateToken(){}start(e,t){e.enqueueRetryable((()=>t(je.UNAUTHENTICATED)))}shutdown(){}},MB=class{constructor(e){this.token=e,this.changeListener=null}getToken(){return Promise.resolve(this.token)}invalidateToken(){}start(e,t){this.changeListener=t,e.enqueueRetryable((()=>t(this.token.user)))}shutdown(){this.changeListener=null}},Tu=class{constructor(e){this.kt=e,this.currentUser=je.UNAUTHENTICATED,this.Qt=0,this.forceRefresh=!1,this.auth=null}start(e,t){z(this.qt===void 0,42304);let n=this.Qt,s=c=>this.Qt!==n?(n=this.Qt,t(c)):Promise.resolve(),i=new kt;this.qt=()=>{this.Qt++,this.currentUser=this.Kt(),i.resolve(),i=new kt,e.enqueueRetryable((()=>s(this.currentUser)))};let a=()=>{let c=i;e.enqueueRetryable((async()=>{await c.promise,await s(this.currentUser)}))},u=c=>{K("FirebaseAuthCredentialsProvider","Auth detected"),this.auth=c,this.qt&&(this.auth.addAuthTokenListener(this.qt),a())};this.kt.onInit((c=>u(c))),setTimeout((()=>{if(!this.auth){let c=this.kt.getImmediate({optional:!0});c?u(c):(K("FirebaseAuthCredentialsProvider","Auth not yet detected"),i.resolve(),i=new kt)}}),0),a()}getToken(){let e=this.Qt,t=this.forceRefresh;return this.forceRefresh=!1,this.auth?this.auth.getToken(t).then((n=>this.Qt!==e?(K("FirebaseAuthCredentialsProvider","getToken aborted due to token change."),this.getToken()):n?(z(typeof n.accessToken=="string",31837,{Wt:n}),new Du(n.accessToken,this.currentUser)):null)):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.auth&&this.qt&&this.auth.removeAuthTokenListener(this.qt),this.qt=void 0}Kt(){let e=this.auth&&this.auth.getUid();return z(e===null||typeof e=="string",2055,{Gt:e}),new je(e)}},GB=class{constructor(e,t,n){this.jt=e,this.zt=t,this.Ht=n,this.type="FirstParty",this.user=je.FIRST_PARTY,this.Jt=new Map}Yt(){return this.Ht?this.Ht():null}get headers(){this.Jt.set("X-Goog-AuthUser",this.jt);let e=this.Yt();return e&&this.Jt.set("Authorization",e),this.zt&&this.Jt.set("X-Goog-Iam-Authorization-Token",this.zt),this.Jt}},UB=class{constructor(e,t,n){this.jt=e,this.zt=t,this.Ht=n}getToken(){return Promise.resolve(new GB(this.jt,this.zt,this.Ht))}start(e,t){e.enqueueRetryable((()=>t(je.FIRST_PARTY)))}shutdown(){}invalidateToken(){}},Au=class{constructor(e){this.value=e,this.type="AppCheck",this.headers=new Map,e&&e.length>0&&this.headers.set("x-firebase-appcheck",this.value)}},bu=class{constructor(e,t){this.Zt=t,this.forceRefresh=!1,this.appCheck=null,this.Xt=null,this.en=null,gt(e)&&e.settings.appCheckToken&&(this.en=e.settings.appCheckToken)}start(e,t){z(this.qt===void 0,3512);let n=i=>{i.error!=null&&K("FirebaseAppCheckTokenProvider",`Error getting App Check token; using placeholder token instead. Error: ${i.error.message}`);let a=i.token!==this.Xt;return this.Xt=i.token,K("FirebaseAppCheckTokenProvider",`Received ${a?"new":"existing"} token.`),a?t(i.token):Promise.resolve()};this.qt=i=>{e.enqueueRetryable((()=>n(i)))};let s=i=>{K("FirebaseAppCheckTokenProvider","AppCheck detected"),this.appCheck=i,this.qt&&this.appCheck.addTokenListener(this.qt)};this.Zt.onInit((i=>s(i))),setTimeout((()=>{if(!this.appCheck){let i=this.Zt.getImmediate({optional:!0});i?s(i):K("FirebaseAppCheckTokenProvider","AppCheck not yet detected")}}),0)}getToken(){if(this.en)return Promise.resolve(new Au(this.en));let e=this.forceRefresh;return this.forceRefresh=!1,this.appCheck?this.appCheck.getToken(e).then((t=>t?(z(typeof t.token=="string",44558,{tokenResult:t}),this.Xt=t.token,new Au(t.token)):null)):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.appCheck&&this.qt&&this.appCheck.removeTokenListener(this.qt),this.qt=void 0}};function LE(r){let e={};return r.timeoutSeconds!==void 0&&(e.timeoutSeconds=r.timeoutSeconds),e}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var HB=class{tn(e){}shutdown(){}};/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var Tm="ConnectivityMonitor",vu=class{constructor(){this.nn=()=>this.rn(),this.sn=()=>this._n(),this.an=[],this.un()}tn(e){this.an.push(e)}shutdown(){window.removeEventListener("online",this.nn),window.removeEventListener("offline",this.sn)}un(){window.addEventListener("online",this.nn),window.addEventListener("offline",this.sn)}rn(){K(Tm,"Network connectivity changed: AVAILABLE");for(let e of this.an)e(0)}_n(){K(Tm,"Network connectivity changed: UNAVAILABLE");for(let e of this.an)e(1)}static cn(){return typeof window<"u"&&window.addEventListener!==void 0&&window.removeEventListener!==void 0}};/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var ru=null;function qB(){return ru===null?ru=(function(){return 268435456+Math.round(2147483648*Math.random())})():ru++,"0x"+ru.toString(16)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var cB="RestConnection",WT={BatchGetDocuments:"batchGet",Commit:"commit",RunQuery:"runQuery",RunAggregationQuery:"runAggregationQuery",ExecutePipeline:"executePipeline"},jB=class{get En(){return!1}constructor(e){this.databaseInfo=e,this.databaseId=e.databaseId;let t=e.ssl?"https":"http",n=encodeURIComponent(this.databaseId.projectId),s=encodeURIComponent(this.databaseId.database);this.hn=t+"://"+e.host,this.Tn=`projects/${n}/databases/${s}`,this.Pn=this.databaseId.database===fu?`project_id=${n}`:`project_id=${n}&database_id=${s}`}In(e,t,n,s,i){let a=qB(),u=this.Rn(e,t.toUriEncodedString());K(cB,`Sending RPC '${e}' ${a}:`,u,n);let c={"google-cloud-resource-prefix":this.Tn,"x-goog-request-params":this.Pn};this.An(c,s,i);let{host:l}=new URL(u),h=Xr(l);return this.Vn(e,u,c,n,h).then((d=>(K(cB,`Received RPC '${e}' ${a}: `,d),d)),(d=>{throw Pt(cB,`RPC '${e}' ${a} failed with error: `,d,"url: ",u,"request:",n),d}))}dn(e,t,n,s,i,a){return this.In(e,t,n,s,i)}An(e,t,n){if(e["X-Goog-Api-Client"]=(function(){return"gl-js/ fire/"+zs})(),e["Content-Type"]="text/plain",this.databaseInfo.appId&&(e["X-Firebase-GMPID"]=this.databaseInfo.appId),t&&t.headers.forEach(((s,i)=>e[i]=s)),n&&n.headers.forEach(((s,i)=>e[i]=s)),this.databaseInfo._customHeaders)for(let s of Object.keys(this.databaseInfo._customHeaders))e[s]=this.databaseInfo._customHeaders[s]}Rn(e,t){let n=WT[e],s=`${this.hn}/v1/${t}:${n}`;return this.databaseInfo.apiKey&&(s=`${s}?key=${encodeURIComponent(this.databaseInfo.apiKey)}`),s}terminate(){}};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var KB=class{constructor(e){this.fn=e.fn,this.mn=e.mn}pn(e){this.gn=e}yn(e){this.wn=e}bn(e){this.Sn=e}onMessage(e){this.xn=e}close(){this.mn()}send(e){this.fn(e)}vn(){this.gn()}Dn(){this.wn()}Cn(e){this.Sn(e)}Fn(e){this.xn(e)}};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var Ze="WebChannelConnection",qi=(r,e,t)=>{r.listen(e,(n=>{try{t(n)}catch(s){setTimeout((()=>{throw s}),0)}}))},Ru=class r extends jB{constructor(e){super(e),this.On=[],this.forceLongPolling=e.forceLongPolling,this.autoDetectLongPolling=e.autoDetectLongPolling,this.useFetchStreams=e.useFetchStreams,this.longPollingOptions=e.longPollingOptions}static Mn(){if(!r.Nn){let e=Ql();qi(e,Wl.STAT_EVENT,(t=>{t.stat===Ko.PROXY?K(Ze,"STAT_EVENT: detected buffering proxy"):t.stat===Ko.NOPROXY&&K(Ze,"STAT_EVENT: detected no buffering proxy")})),r.Nn=!0}}Vn(e,t,n,s,i){let a=qB();return new Promise(((u,c)=>{let l=new Jl;l.setWithCredentials(!0),l.listenOnce(zl.COMPLETE,(()=>{try{switch(l.getLastErrorCode()){case Li.NO_ERROR:let d=l.getResponseJson();K(Ze,`XHR for RPC '${e}' ${a} received:`,JSON.stringify(d)),u(d);break;case Li.TIMEOUT:K(Ze,`RPC '${e}' ${a} timed out`),c(new j(k.DEADLINE_EXCEEDED,"Request time out"));break;case Li.HTTP_ERROR:let C=l.getStatus();if(K(Ze,`RPC '${e}' ${a} failed with status:`,C,"response text:",l.getResponseText()),C>0){let y=l.getResponseJson();Array.isArray(y)&&(y=y[0]);let D=y?.error;if(D&&D.status&&D.message){let P=(function(q){let W=q.toLowerCase().replace(/_/g,"-");return Object.values(k).indexOf(W)>=0?W:k.UNKNOWN})(D.status);c(new j(P,D.message))}else c(new j(k.UNKNOWN,"Server responded with status "+l.getStatus()))}else c(new j(k.UNAVAILABLE,"Connection failed."));break;default:$(9055,{Bn:e,streamId:a,Ln:l.getLastErrorCode(),$n:l.getLastError()})}}finally{K(Ze,`RPC '${e}' ${a} completed.`)}}));let h=JSON.stringify(s);K(Ze,`RPC '${e}' ${a} sending request:`,s),l.send(t,"POST",h,n,15)}))}Un(e,t,n){let s=qB(),i=[this.hn,"/","google.firestore.v1.Firestore","/",e,"/channel"],a=this.createWebChannelTransport(),u={httpSessionIdParam:"gsessionid",initMessageHeaders:{},messageUrlParams:{database:`projects/${this.databaseId.projectId}/databases/${this.databaseId.database}`},sendRawJson:!0,supportsCrossDomainXhr:!0,internalChannelParams:{forwardChannelRequestTimeoutMs:6e5},forceLongPolling:this.forceLongPolling,detectBufferingProxy:this.autoDetectLongPolling},c=this.longPollingOptions.timeoutSeconds;c!==void 0&&(u.longPollingTimeout=Math.round(1e3*c)),this.useFetchStreams&&(u.useFetchStreams=!0),this.An(u.initMessageHeaders,t,n),u.encodeInitMessageHeaders=!0;let l=i.join("");K(Ze,`Creating RPC '${e}' stream ${s}: ${l}`,u);let h=a.createWebChannel(l,u);this.kn(h);let d=!1,C=!1,y=new KB({fn:D=>{C?K(Ze,`Not sending because RPC '${e}' stream ${s} is closed:`,D):(d||(K(Ze,`Opening RPC '${e}' stream ${s} transport.`),h.open(),d=!0),K(Ze,`RPC '${e}' stream ${s} sending:`,D),h.send(D))},mn:()=>h.close()});return qi(h,ns.EventType.OPEN,(()=>{C||(K(Ze,`RPC '${e}' stream ${s} transport opened.`),y.vn())})),qi(h,ns.EventType.CLOSE,(()=>{C||(C=!0,K(Ze,`RPC '${e}' stream ${s} transport closed`),y.Cn(),this.Qn(h))})),qi(h,ns.EventType.ERROR,(D=>{C||(C=!0,Pt(Ze,`RPC '${e}' stream ${s} transport errored. Name:`,D.name,"Message:",D.message),y.Cn(new j(k.UNAVAILABLE,"The operation could not be completed")))})),qi(h,ns.EventType.MESSAGE,(D=>{if(!C){let P=D.data[0];z(!!P,16349);let V=P,q=V?.error||V[0]?.error;if(q){K(Ze,`RPC '${e}' stream ${s} received error:`,q);let W=q.status,ce=(function(_e){let A=be[_e];if(A!==void 0)return DE(A)})(W),De=q.message;W==="NOT_FOUND"&&De.includes("database")&&De.includes("does not exist")&&De.includes(this.databaseId.database)&&Pt(`Database '${this.databaseId.database}' not found. Please check your project configuration.`),ce===void 0&&(ce=k.INTERNAL,De="Unknown error status: "+W+" with message "+q.message),C=!0,y.Cn(new j(ce,De)),h.close()}else K(Ze,`RPC '${e}' stream ${s} received:`,P),y.Fn(P)}})),r.Mn(),setTimeout((()=>{y.Dn()}),0),y}terminate(){this.On.forEach((e=>e.close())),this.On=[]}kn(e){this.On.push(e)}Qn(e){this.On=this.On.filter((t=>t===e))}An(e,t,n){super.An(e,t,n),this.databaseInfo.apiKey&&(e["x-goog-api-key"]=this.databaseInfo.apiKey)}createWebChannelTransport(){return $l()}};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function QT(r){return new Ru(r)}Ru.Nn=!1;var Ba=class{constructor(e,t,n=1e3,s=1.5,i=6e4){this.qn=e,this.timerId=t,this.Kn=n,this.Wn=s,this.Gn=i,this.jn=0,this.zn=null,this.Hn=Date.now(),this.reset()}reset(){this.jn=0}Jn(){this.jn=this.Gn}Yn(e){this.cancel();let t=Math.floor(this.jn+this.Zn()),n=Math.max(0,Date.now()-this.Hn),s=Math.max(0,t-n);s>0&&K("ExponentialBackoff",`Backing off for ${s} ms (base delay: ${this.jn} ms, delay with jitter: ${t} ms, last attempt: ${n} ms ago)`),this.zn=this.qn.enqueueAfterDelay(this.timerId,s,(()=>(this.Hn=Date.now(),e()))),this.jn*=this.Wn,this.jn<this.Kn&&(this.jn=this.Kn),this.jn>this.Gn&&(this.jn=this.Gn)}Xn(){this.zn!==null&&(this.zn.skipDelay(),this.zn=null)}cancel(){this.zn!==null&&(this.zn.cancel(),this.zn=null)}Zn(){return(Math.random()-.5)*this.jn}};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var Am="PersistentStream",Su=class{constructor(e,t,n,s,i,a,u,c){this.qn=e,this.er=n,this.tr=s,this.connection=i,this.authCredentialsProvider=a,this.appCheckCredentialsProvider=u,this.listener=c,this.state=0,this.nr=0,this.rr=null,this.ir=null,this.stream=null,this.sr=0,this._r=new Ba(e,t)}ar(){return this.state===1||this.state===5||this.ur()}ur(){return this.state===2||this.state===3}start(){this.sr=0,this.state!==4?this.auth():this.cr()}async stop(){this.ar()&&await this.close(0)}lr(){this.state=0,this._r.reset()}Er(){this.ur()&&this.rr===null&&(this.rr=this.qn.enqueueAfterDelay(this.er,6e4,(()=>this.hr())))}Tr(e){this.Pr(),this.stream.send(e)}async hr(){if(this.ur())return this.close(0)}Pr(){this.rr&&(this.rr.cancel(),this.rr=null)}Ir(){this.ir&&(this.ir.cancel(),this.ir=null)}async close(e,t){this.Pr(),this.Ir(),this._r.cancel(),this.nr++,e!==4?this._r.reset():t&&t.code===k.RESOURCE_EXHAUSTED?(gn(t.toString()),gn("Using maximum backoff delay to prevent overloading the backend."),this._r.Jn()):t&&t.code===k.UNAUTHENTICATED&&this.state!==3&&(this.authCredentialsProvider.invalidateToken(),this.appCheckCredentialsProvider.invalidateToken()),this.stream!==null&&(this.Rr(),this.stream.close(),this.stream=null),this.state=e,await this.listener.bn(t)}Rr(){}auth(){this.state=1;let e=this.Ar(this.nr),t=this.nr;Promise.all([this.authCredentialsProvider.getToken(),this.appCheckCredentialsProvider.getToken()]).then((([n,s])=>{this.nr===t&&this.Vr(n,s)}),(n=>{e((()=>{let s=new j(k.UNKNOWN,"Fetching auth token failed: "+n.message);return this.dr(s)}))}))}Vr(e,t){let n=this.Ar(this.nr);this.stream=this.mr(e,t),this.stream.pn((()=>{n((()=>this.listener.pn()))})),this.stream.yn((()=>{n((()=>(this.state=2,this.ir=this.qn.enqueueAfterDelay(this.tr,1e4,(()=>(this.ur()&&(this.state=3),Promise.resolve()))),this.listener.yn())))})),this.stream.bn((s=>{n((()=>this.dr(s)))})),this.stream.onMessage((s=>{n((()=>++this.sr==1?this.pr(s):this.onNext(s)))}))}cr(){this.state=5,this._r.Yn((async()=>{this.state=0,this.start()}))}dr(e){return K(Am,`close with error: ${e}`),this.stream=null,this.close(4,e)}Ar(e){return t=>{this.qn.enqueueAndForget((()=>this.nr===e?t():(K(Am,"stream callback skipped by getCloseGuardedDispatcher."),Promise.resolve())))}}},JB=class extends Su{constructor(e,t,n,s,i,a){super(e,"listen_stream_connection_backoff","listen_stream_idle","health_check_timeout",t,n,s,a),this.serializer=i}mr(e,t){return this.connection.Un("Listen",e,t)}pr(e){return this.onNext(e)}onNext(e){this._r.reset();let t=kT(this.serializer,e),n=(function(i){if(!("targetChange"in i))return te.min();let a=i.targetChange;return a.targetIds&&a.targetIds.length?te.min():a.readTime?yt(a.readTime):te.min()})(e);return this.listener.gr(t,n)}yr(e){let t={};t.database=VB(this.serializer),t.addTarget=(function(i,a){let u,c=a.target;if(u=fr(c)?{pipelineQuery:qT(i,c)}:_E(c)?{documents:MT(i,c)}:{query:GT(i,c).Lt},u.targetId=a.targetId,a.resumeToken.approximateByteSize()>0){u.resumeToken=LB(i,a.resumeToken);let l=FB(i,a.expectedCount);l!==null&&(u.expectedCount=l)}else if(a.snapshotVersion.compareTo(te.min())>0){u.readTime=Qi(i,a.snapshotVersion.toTimestamp());let l=FB(i,a.expectedCount);l!==null&&(u.expectedCount=l)}return u})(this.serializer,e);let n=HT(this.serializer,e);n&&(t.labels=n),this.Tr(t)}wr(e){let t={};t.database=VB(this.serializer),t.removeTarget=e,this.Tr(t)}},zB=class extends Su{constructor(e,t,n,s,i,a){super(e,"write_stream_connection_backoff","write_stream_idle","health_check_timeout",t,n,s,a),this.serializer=i}get br(){return this.sr>0}start(){this.lastStreamToken=void 0,super.start()}Rr(){this.br&&this.Sr([])}mr(e,t){return this.connection.Un("Write",e,t)}pr(e){return z(!!e.streamToken,31322),this.lastStreamToken=e.streamToken,z(!e.writeResults||e.writeResults.length===0,55816),this.listener.vr()}onNext(e){z(!!e.streamToken,12678),this.lastStreamToken=e.streamToken,this._r.reset();let t=VT(e.writeResults,e.commitTime),n=yt(e.commitTime);return this.listener.Dr(n,t)}Cr(){let e={};e.database=VB(this.serializer),this.Tr(e)}Sr(e){let t={streamToken:this.lastStreamToken,writes:e.map((n=>SE(this.serializer,n)))};this.Tr(t)}};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var WB=class{},QB=class extends WB{constructor(e,t,n,s){super(),this.authCredentials=e,this.appCheckCredentials=t,this.connection=n,this.serializer=s,this.Fr=!1}Or(){if(this.Fr)throw new j(k.FAILED_PRECONDITION,"The client has already been terminated.")}In(e,t,n,s){return this.Or(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then((([i,a])=>this.connection.In(e,kB(t,n),s,i,a))).catch((i=>{throw i.name==="FirebaseError"?(i.code===k.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),i):new j(k.UNKNOWN,i.toString())}))}dn(e,t,n,s,i){return this.Or(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then((([a,u])=>this.connection.dn(e,kB(t,n),s,a,u,i))).catch((a=>{throw a.name==="FirebaseError"?(a.code===k.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),a):new j(k.UNKNOWN,a.toString())}))}terminate(){this.Fr=!0,this.connection.terminate()}};function $T(r,e,t,n){return new QB(r,e,t,n)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var YT="ComponentProvider",bm=new Map;function XT(r,e,t,n,s){return new dB(r,e,t,s.host,s.ssl,s.experimentalForceLongPolling,s.experimentalAutoDetectLongPolling,LE(s.experimentalLongPollingOptions),s.useFetchStreams,s.isUsingEmulator,n,s._customHeaders,s.grpcFlowControlWindow)}/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var vm={didRun:!1,sequenceNumbersCollected:0,targetsRemoved:0,documentsRemoved:0},kE=41943040,Rt=class r{static withCacheSize(e){return new r(e,r.DEFAULT_COLLECTION_PERCENTILE,r.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT)}constructor(e,t,n){this.cacheSizeCollectionThreshold=e,this.percentileToCollect=t,this.maximumSequenceNumbersToCollect=n}};Rt.DEFAULT_COLLECTION_PERCENTILE=10,Rt.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT=1e3,Rt.DEFAULT=new Rt(kE,Rt.DEFAULT_COLLECTION_PERCENTILE,Rt.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT),Rt.DISABLED=new Rt(-1,0,0);/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var ks=class{constructor(e,t){this.previousValue=e,t&&(t.sequenceNumberHandler=n=>this.Mr(n),this.Nr=n=>t.writeSequenceNumber(n))}Mr(e){return this.previousValue=Math.max(e,this.previousValue),this.previousValue}next(){let e=++this.previousValue;return this.Nr&&this.Nr(e),e}};ks.Br=-1;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var ZT="The current tab is not in the required state to perform this operation. It might be necessary to refresh the browser tab.",$B=class{constructor(){this.onCommittedListeners=[]}addOnCommittedListener(e){this.onCommittedListeners.push(e)}raiseOnCommittedEvent(){this.onCommittedListeners.forEach((e=>e()))}};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Ws(r){if(r.code!==k.FAILED_PRECONDITION||r.message!==ZT)throw r;K("LocalStore","Unexpectedly lost primary lease")}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var M=class r{constructor(e){this.nextCallback=null,this.catchCallback=null,this.result=void 0,this.error=void 0,this.isDone=!1,this.callbackAttached=!1,e((t=>{this.isDone=!0,this.result=t,this.nextCallback&&this.nextCallback(t)}),(t=>{this.isDone=!0,this.error=t,this.catchCallback&&this.catchCallback(t)}))}catch(e){return this.next(void 0,e)}next(e,t){return this.callbackAttached&&$(59440),this.callbackAttached=!0,this.isDone?this.error?this.wrapFailure(t,this.error):this.wrapSuccess(e,this.result):new r(((n,s)=>{this.nextCallback=i=>{this.wrapSuccess(e,i).next(n,s)},this.catchCallback=i=>{this.wrapFailure(t,i).next(n,s)}}))}toPromise(){return new Promise(((e,t)=>{this.next(e,t)}))}wrapUserFunction(e){try{let t=e();return t instanceof r?t:r.resolve(t)}catch(t){return r.reject(t)}}wrapSuccess(e,t){return e?this.wrapUserFunction((()=>e(t))):r.resolve(t)}wrapFailure(e,t){return e?this.wrapUserFunction((()=>e(t))):r.reject(t)}static resolve(e){return new r(((t,n)=>{t(e)}))}static reject(e){return new r(((t,n)=>{n(e)}))}static waitFor(e){return new r(((t,n)=>{let s=0,i=0,a=!1;e.forEach((u=>{++s,u.next((()=>{++i,a&&i===s&&t()}),(c=>n(c)))})),a=!0,i===s&&t()}))}static or(e){let t=r.resolve(!1);for(let n of e)t=t.next((s=>s?r.resolve(s):n()));return t}static forEach(e,t){let n=[];return e.forEach(((s,i)=>{n.push(t.call(this,s,i))})),this.waitFor(n)}static mapArray(e,t){return new r(((n,s)=>{let i=e.length,a=new Array(i),u=0;for(let c=0;c<i;c++){let l=c;t(e[l]).next((h=>{a[l]=h,++u,u===i&&n(a)}),(h=>s(h)))}}))}static doWhile(e,t){return new r(((n,s)=>{let i=()=>{e()===!0?t().next((()=>{i()}),s):n()};i()}))}};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function e0(r){let e=r.match(/Android ([\d.]+)/i),t=e?e[1].split(".").slice(0,2).join("."):"-1";return Number(t)}function Qs(r){return r.name==="IndexedDbTransactionError"}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var Rm="LruGarbageCollector",t0=1048576;function Sm([r,e],[t,n]){let s=ie(r,t);return s===0?ie(e,n):s}var YB=class{constructor(e){this.ai=e,this.buffer=new Fe(Sm),this.ui=0}ci(){return++this.ui}li(e){let t=[e,this.ci()];if(this.buffer.size<this.ai)this.buffer=this.buffer.add(t);else{let n=this.buffer.last();Sm(t,n)<0&&(this.buffer=this.buffer.delete(n).add(t))}}get maxValue(){return this.buffer.last()[0]}},XB=class{constructor(e,t,n){this.garbageCollector=e,this.asyncQueue=t,this.localStore=n,this.Ei=null}start(){this.garbageCollector.params.cacheSizeCollectionThreshold!==-1&&this.hi(6e4)}stop(){this.Ei&&(this.Ei.cancel(),this.Ei=null)}get started(){return this.Ei!==null}hi(e){K(Rm,`Garbage collection scheduled in ${e}ms`),this.Ei=this.asyncQueue.enqueueAfterDelay("lru_garbage_collection",e,(async()=>{this.Ei=null;try{await this.localStore.collectGarbage(this.garbageCollector)}catch(t){Qs(t)?K(Rm,"Ignoring IndexedDB error during garbage collection: ",t):await Ws(t)}await this.hi(3e5)}))}},ZB=class{constructor(e,t){this.Ti=e,this.params=t}calculateTargetCount(e,t){return this.Ti.Pi(e).next((n=>Math.floor(t/100*n)))}nthSequenceNumber(e,t){if(t===0)return M.resolve(ks.Br);let n=new YB(t);return this.Ti.forEachTarget(e,(s=>n.li(s.sequenceNumber))).next((()=>this.Ti.Ii(e,(s=>n.li(s))))).next((()=>n.maxValue))}removeTargets(e,t,n){return this.Ti.removeTargets(e,t,n)}removeOrphanedDocuments(e,t){return this.Ti.removeOrphanedDocuments(e,t)}collect(e,t){return this.params.cacheSizeCollectionThreshold===-1?(K("LruGarbageCollector","Garbage collection skipped; disabled"),M.resolve(vm)):this.getCacheSize(e).next((n=>n<this.params.cacheSizeCollectionThreshold?(K("LruGarbageCollector",`Garbage collection skipped; Cache size ${n} is lower than threshold ${this.params.cacheSizeCollectionThreshold}`),vm):this.Ri(e,t)))}getCacheSize(e){return this.Ti.getCacheSize(e)}Ri(e,t){let n,s,i,a,u,c,l,h=Date.now();return this.calculateTargetCount(e,this.params.percentileToCollect).next((d=>(d>this.params.maximumSequenceNumbersToCollect?(K("LruGarbageCollector",`Capping sequence numbers to collect down to the maximum of ${this.params.maximumSequenceNumbersToCollect} from ${d}`),s=this.params.maximumSequenceNumbersToCollect):s=d,a=Date.now(),this.nthSequenceNumber(e,s)))).next((d=>(n=d,u=Date.now(),this.removeTargets(e,n,t)))).next((d=>(i=d,c=Date.now(),this.removeOrphanedDocuments(e,n)))).next((d=>(l=Date.now(),os()<=ae.DEBUG&&K("LruGarbageCollector",`LRU Garbage Collection
	Counted targets in ${a-h}ms
	Determined least recently used ${s} in `+(u-a)+`ms
	Removed ${i} targets in `+(c-u)+`ms
	Removed ${d} documents in `+(l-c)+`ms
Total Duration: ${l-h}ms`),M.resolve({didRun:!0,sequenceNumbersCollected:s,targetsRemoved:i,documentsRemoved:d}))))}};function n0(r,e){return new ZB(r,e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var VE="firestore.googleapis.com",Pm=!0,Pu=class{constructor(e){if(e.host===void 0){if(e.ssl!==void 0)throw new j(k.INVALID_ARGUMENT,"Can't provide ssl option if host option is not set");this.host=VE,this.ssl=Pm}else this.host=e.host,this.ssl=e.ssl??Pm;if(this.isUsingEmulator=e.emulatorOptions!==void 0,this.credentials=e.credentials,this.ignoreUndefinedProperties=!!e.ignoreUndefinedProperties,this.localCache=e.localCache,e._customHeaders&&(this._customHeaders={...e._customHeaders}),e.cacheSizeBytes===void 0)this.cacheSizeBytes=kE;else{if(e.cacheSizeBytes!==-1&&e.cacheSizeBytes<t0)throw new j(k.INVALID_ARGUMENT,"cacheSizeBytes must be at least 1048576");this.cacheSizeBytes=e.cacheSizeBytes}if(zm("experimentalForceLongPolling",e.experimentalForceLongPolling,"experimentalAutoDetectLongPolling",e.experimentalAutoDetectLongPolling),this.experimentalForceLongPolling=!!e.experimentalForceLongPolling,this.experimentalForceLongPolling?this.experimentalAutoDetectLongPolling=!1:e.experimentalAutoDetectLongPolling===void 0?this.experimentalAutoDetectLongPolling=!0:this.experimentalAutoDetectLongPolling=!!e.experimentalAutoDetectLongPolling,this.experimentalLongPollingOptions=LE(e.experimentalLongPollingOptions??{}),(function(n){if(n.timeoutSeconds!==void 0){if(isNaN(n.timeoutSeconds))throw new j(k.INVALID_ARGUMENT,`invalid long polling timeout: ${n.timeoutSeconds} (must not be NaN)`);if(n.timeoutSeconds<5)throw new j(k.INVALID_ARGUMENT,`invalid long polling timeout: ${n.timeoutSeconds} (minimum allowed value is 5)`);if(n.timeoutSeconds>30)throw new j(k.INVALID_ARGUMENT,`invalid long polling timeout: ${n.timeoutSeconds} (maximum allowed value is 30)`)}})(this.experimentalLongPollingOptions),this.useFetchStreams=!!e.useFetchStreams,e.grpcFlowControlWindow!==void 0){if(typeof e.grpcFlowControlWindow!="number"||e.grpcFlowControlWindow<=0||e.grpcFlowControlWindow>2147483647||!Number.isInteger(e.grpcFlowControlWindow))throw new j(k.INVALID_ARGUMENT,"grpcFlowControlWindow must be a positive integer and cannot exceed 2147483647");this.grpcFlowControlWindow=e.grpcFlowControlWindow}}isEqual(e){return this.host===e.host&&this.ssl===e.ssl&&this.credentials===e.credentials&&this.cacheSizeBytes===e.cacheSizeBytes&&this.experimentalForceLongPolling===e.experimentalForceLongPolling&&this.experimentalAutoDetectLongPolling===e.experimentalAutoDetectLongPolling&&(function(n,s){return n.timeoutSeconds===s.timeoutSeconds})(this.experimentalLongPollingOptions,e.experimentalLongPollingOptions)&&this.ignoreUndefinedProperties===e.ignoreUndefinedProperties&&this.useFetchStreams===e.useFetchStreams&&this.grpcFlowControlWindow===e.grpcFlowControlWindow&&(function(n,s){if(n===s)return!0;if(!n||!s)return!1;let i=Object.keys(n),a=Object.keys(s);if(i.length!==a.length)return!1;for(let u of i)if(n[u]!==s[u])return!1;return!0})(this._customHeaders,e._customHeaders)}},hc=class{constructor(e,t,n,s){this._authCredentials=e,this._appCheckCredentials=t,this._databaseId=n,this._app=s,this.type="firestore-lite",this._persistenceKey="(lite)",this._settings=new Pu({}),this._settingsFrozen=!1,this._emulatorOptions={},this._terminateTask="notTerminated"}get app(){if(!this._app)throw new j(k.FAILED_PRECONDITION,"Firestore was not initialized using the Firebase SDK. 'app' is not available");return this._app}get _initialized(){return this._settingsFrozen}get _terminated(){return this._terminateTask!=="notTerminated"}_setSettings(e){if(this._settingsFrozen)throw new j(k.FAILED_PRECONDITION,"Firestore has already been started and its settings can no longer be changed. You can only modify settings before calling any other methods on a Firestore object.");this._settings=new Pu(e),this._emulatorOptions=e.emulatorOptions||{},e.credentials!==void 0&&(this._authCredentials=(function(n){if(!n)return new Iu;switch(n.type){case"firstParty":return new UB(n.sessionIndex||"0",n.iamToken||null,n.authTokenFactory||null);case"provider":return n.client;default:throw new j(k.INVALID_ARGUMENT,"makeAuthCredentialsProvider failed due to invalid credential type")}})(e.credentials))}_getSettings(){return this._settings}_getEmulatorOptions(){return this._emulatorOptions}_freezeSettings(){return this._settingsFrozen=!0,this._settings}_delete(){return this._terminateTask==="notTerminated"&&(this._terminateTask=this._terminate()),this._terminateTask}async _restart(){this._terminateTask==="notTerminated"?await this._terminate():this._terminateTask="notTerminated"}toJSON(){return{app:this._app,databaseId:this._databaseId,settings:this._settings}}_terminate(){return(function(t){let n=bm.get(t);n&&(K(YT,"Removing Datastore"),bm.delete(t),n.terminate())})(this),Promise.resolve()}};function ME(r,e,t,n={}){r=Mt(r,hc);let s=Xr(e),i=r._getSettings(),a={...i,emulatorOptions:r._getEmulatorOptions()},u=`${e}:${t}`;s&&Wc(`https://${u}`),i.host!==VE&&i.host!==u&&Pt("Host has been set in both settings() and connectFirestoreEmulator(), emulator host will be used.");let c={...i,host:u,ssl:s,emulatorOptions:n};if(!sn(c,a)&&(r._setSettings(c),n.mockUserToken)){let l,h;if(typeof n.mockUserToken=="string")l=n.mockUserToken,h=je.MOCK_USER;else{l=Wp(n.mockUserToken,r._app?.options.projectId);let d=n.mockUserToken.sub||n.mockUserToken.user_id;if(!d)throw new j(k.INVALID_ARGUMENT,"mockUserToken must contain 'sub' or 'user_id' field!");h=new je(d)}r._authCredentials=new MB(new Du(l,h))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var ha=class r{constructor(e,t,n){this.converter=t,this._query=n,this.type="query",this.firestore=e}withConverter(e){return new r(this.firestore,e,this._query)}},Se=class r{constructor(e,t,n){this.converter=t,this._key=n,this.type="document",this.firestore=e}get _path(){return this._key.path}get id(){return this._key.path.lastSegment()}get path(){return this._key.path.canonicalString()}get parent(){return new dn(this.firestore,this.converter,this._key.path.popLast())}withConverter(e){return new r(this.firestore,e,this._key)}toJSON(){return{type:r._jsonSchemaVersion,referencePath:this._key.toString()}}static fromJSON(e,t,n){if(Ra(t,r._jsonSchema))return new r(e,n||null,new X(he.fromString(t.referencePath)))}};Se._jsonSchemaVersion="firestore/documentReference/1.0",Se._jsonSchema={type:Ae("string",Se._jsonSchemaVersion),referencePath:Ae("string")};var dn=class r extends ha{constructor(e,t,n){super(e,t,Oa(n)),this._path=n,this.type="collection"}get id(){return this._query.path.lastSegment()}get path(){return this._query.path.canonicalString()}get parent(){let e=this._path.popLast();return e.isEmpty()?null:new Se(this.firestore,null,new X(e))}withConverter(e){return new r(this.firestore,e,this._path)}};function Cd(r,e,...t){if(r=Oe(r),Jm("collection","path",e),r instanceof hc){let n=he.fromString(e,...t);return sm(n),new dn(r,null,n)}{if(!(r instanceof Se||r instanceof dn))throw new j(k.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");let n=r._path.child(he.fromString(e,...t));return sm(n),new dn(r.firestore,null,n)}}function qr(r,e,...t){if(r=Oe(r),arguments.length===1&&(e=gs.newId()),Jm("doc","path",e),r instanceof hc){let n=he.fromString(e,...t);return rm(n),new Se(r,null,new X(n))}{if(!(r instanceof Se||r instanceof dn))throw new j(k.INVALID_ARGUMENT,"Expected first argument to doc() to be a CollectionReference, a DocumentReference or FirebaseFirestore");let n=r._path.child(he.fromString(e,...t));return rm(n),new Se(r.firestore,r instanceof dn?r.converter:null,new X(n))}}/**
 * @license
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var Vs=class{constructor(e,t){this.pattern=e,this.options=t}isEqual(e){return this.pattern===e.pattern&&this.options===e.options}};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var Dt=class r{constructor(e){this._values=(e||[]).map((t=>t))}toArray(){return this._values.map((e=>e))}isEqual(e){return(function(n,s){if(n.length!==s.length)return!1;for(let i=0;i<n.length;++i)if(n[i]!==s[i])return!1;return!0})(this._values,e._values)}toJSON(){return{type:r._jsonSchemaVersion,vectorValues:this._values}}static fromJSON(e){if(Ra(e,r._jsonSchema)){if(Array.isArray(e.vectorValues)&&e.vectorValues.every((t=>typeof t=="number")))return new r(e.vectorValues);throw new j(k.INVALID_ARGUMENT,"Expected 'vectorValues' field to be a number array")}}};Dt._jsonSchemaVersion="firestore/vectorValue/1.0",Dt._jsonSchema={type:Ae("string",Dt._jsonSchemaVersion),vectorValues:Ae("object")};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var r0=/^__.*__$/,eh=class{constructor(e,t,n){this.data=e,this.fieldMask=t,this.fieldTransforms=n}toMutation(e,t){return this.fieldMask!==null?new Xt(e,this.data,this.fieldMask,t,this.fieldTransforms):new br(e,this.data,t,this.fieldTransforms)}},Nu=class{constructor(e,t,n){this.data=e,this.fieldMask=t,this.fieldTransforms=n}toMutation(e,t){return new Xt(e,this.data,this.fieldMask,t,this.fieldTransforms)}};function GE(r){switch(r){case 0:case 2:case 1:return!0;case 3:case 4:return!1;default:throw $(40011,{dataSource:r})}}var th=class r{constructor(e,t,n,s,i,a){this.settings=e,this.databaseId=t,this.serializer=n,this.ignoreUndefinedProperties=s,i===void 0&&this.validatePath(),this.fieldTransforms=i||[],this.fieldMask=a||[]}get path(){return this.settings.path}get dataSource(){return this.settings.dataSource}contextWith(e){return new r({...this.settings,...e},this.databaseId,this.serializer,this.ignoreUndefinedProperties,this.fieldTransforms,this.fieldMask)}childContextForField(e){let t=this.path?.child(e),n=this.contextWith({path:t,arrayElement:!1});return n.validatePathSegment(e),n}childContextForFieldPath(e){let t=this.path?.child(e),n=this.contextWith({path:t,arrayElement:!1});return n.validatePath(),n}childContextForArray(e){return this.contextWith({path:void 0,arrayElement:!0})}createError(e){return xu(e,this.settings.methodName,this.settings.hasConverter||!1,this.path,this.settings.targetDoc)}contains(e){return this.fieldMask.find((t=>e.isPrefixOf(t)))!==void 0||this.fieldTransforms.find((t=>e.isPrefixOf(t.field)))!==void 0}validatePath(){if(this.path)for(let e=0;e<this.path.length;e++)this.validatePathSegment(this.path.get(e))}validatePathSegment(e){if(e.length===0)throw this.createError("Document fields must not be empty");if(GE(this.dataSource)&&r0.test(e))throw this.createError('Document fields cannot begin and end with "__"')}},nh=class{constructor(e,t,n){this.databaseId=e,this.ignoreUndefinedProperties=t,this.serializer=n||Bc(e)}createContext(e,t,n,s=!1){return new th({dataSource:e,methodName:t,targetDoc:n,path:ht.emptyPath(),arrayElement:!1,hasConverter:s},this.databaseId,this.serializer,this.ignoreUndefinedProperties)}};function gd(r){let e=r._freezeSettings(),t=Bc(r._databaseId);return new nh(r._databaseId,!!e.ignoreUndefinedProperties,t)}function md(r,e,t,n,s,i={}){let a=r.createContext(i.merge||i.mergeFields?2:0,e,t,s);Ed("Data must be an object, but it was:",a,n);let u=qE(n,a),c,l;if(i.merge)c=new St(a.fieldMask),l=a.fieldTransforms;else if(i.mergeFields){let h=[];for(let d of i.mergeFields){let C=kr(e,d,t);if(!a.contains(C))throw new j(k.INVALID_ARGUMENT,`Field '${C}' is specified in your field mask but missing from your input data.`);JE(h,C)||h.push(C)}c=new St(h),l=a.fieldTransforms.filter((d=>c.covers(d.field)))}else c=null,l=a.fieldTransforms;return new eh(new tt(u),c,l)}var Ou=class r extends Or{_toFieldTransform(e){if(e.dataSource!==2)throw e.dataSource===1?e.createError(`${this._methodName}() can only appear at the top level of your update data`):e.createError(`${this._methodName}() cannot be used with set() unless you pass {merge:true}`);return e.fieldMask.push(e.path),null}isEqual(e){return e instanceof r}};var rh=class r extends Or{_toFieldTransform(e){return new _B(e.path,new Dr)}isEqual(e){return e instanceof r}};function UE(r,e,t,n){let s=r.createContext(1,e,t);Ed("Data must be an object, but it was:",s,n);let i=[],a=tt.empty();jn(n,((c,l)=>{let h=_d(e,c,t);l=Oe(l);let d=s.childContextForFieldPath(h);if(l instanceof Ou)i.push(h);else{let C=Lr(l,d);C!=null&&(i.push(h),a.set(h,C))}}));let u=new St(i);return new Nu(a,u,s.fieldTransforms)}function HE(r,e,t,n,s,i){let a=r.createContext(1,e,t),u=[kr(e,n,t)],c=[s];if(i.length%2!=0)throw new j(k.INVALID_ARGUMENT,`Function ${e}() needs to be called with an even number of arguments that alternate between field names and values.`);for(let C=0;C<i.length;C+=2)u.push(kr(e,i[C])),c.push(i[C+1]);let l=[],h=tt.empty();for(let C=u.length-1;C>=0;--C)if(!JE(l,u[C])){let y=u[C],D=c[C];D=Oe(D);let P=a.childContextForFieldPath(y);if(D instanceof Ou)l.push(y);else{let V=Lr(D,P);V!=null&&(l.push(y),h.set(y,V))}}let d=new St(l);return new Nu(h,d,a.fieldTransforms)}function Lr(r,e,t){if(KE(r=Oe(r)))return Ed("Unsupported field value:",e,r),qE(r,e);if(r instanceof Or)return(function(s,i){if(!GE(i.dataSource))throw i.createError(`${s._methodName}() can only be used with update() and set()`);if(!i.path)throw i.createError(`${s._methodName}() is not currently supported inside arrays`);let a=s._toFieldTransform(i);a&&i.fieldTransforms.push(a)})(r,e),null;if(r===void 0&&e.ignoreUndefinedProperties)return null;if(e.path&&e.fieldMask.push(e.path),r instanceof Array){if(e.settings.arrayElement&&e.dataSource!==4)throw e.createError("Nested arrays are not supported");return(function(s,i){let a=[],u=0;for(let c of s){let l=Lr(c,i.childContextForArray(u));l==null&&(l={nullValue:"NULL_VALUE"}),a.push(l),u++}return{arrayValue:{values:a}}})(r,e)}return(function(s,i,a){if((s=Oe(s))===null)return{nullValue:"NULL_VALUE"};if(typeof s=="number")return cc(i.serializer,s);if(typeof s=="boolean")return{booleanValue:s};if(typeof s=="string")return{stringValue:s};if(s instanceof Date){let u=ye.fromDate(s);return{timestampValue:Qi(i.serializer,u)}}if(s instanceof ye){let u=new ye(s.seconds,1e3*Math.floor(s.nanoseconds/1e3));return{timestampValue:Qi(i.serializer,u)}}if(jE(s)){let u=ye.fromInstant(s),c=new ye(u.seconds,1e3*Math.floor(u.nanoseconds/1e3));return{timestampValue:Qi(i.serializer,c)}}if(s instanceof fn)return{geoPointValue:{latitude:s.latitude,longitude:s.longitude}};if(s instanceof wt)return s.subtype===0?{bytesValue:LB(i.serializer,s._byteString)}:(function(c,l){let h=l.toUint8Array(),d=new Uint8Array(h.length+1);return d[0]=l.subtype,d.set(h,1),{mapValue:{fields:{[Is]:{bytesValue:LB(c,Ee.fromUint8Array(d))}}}}})(i.serializer,s);if(s instanceof Se){let u=i.databaseId,c=s.firestore._databaseId;if(!c.isEqual(u))throw i.createError(`Document reference is for database ${c.projectId}/${c.database} but should be for database ${u.projectId}/${u.database}`);return{referenceValue:pd(s.firestore._databaseId||i.databaseId,s._key.path)}}if(s instanceof Dt)return(function(c,l){let h=c instanceof Dt?c.toArray():c;return{mapValue:{fields:{[oc]:{stringValue:uc},[yr]:{arrayValue:{values:h.map((C=>{if(typeof C!="number")throw l.createError("VectorValues must only contain numeric values.");return hd(l.serializer,C)}))}}}}}})(s,i);if(s instanceof Vs)return(function(c){return{mapValue:{fields:{[zt]:{mapValue:{fields:{[ws]:{stringValue:c.pattern},[Ds]:{stringValue:c.options}}}}}}}})(s);if(s instanceof Os)return(function(c){return{mapValue:{fields:{[wr]:{stringValue:c.value}}}}})(s);if(s instanceof Ls)return(function(c){return{mapValue:{fields:{[Kn]:ds(c.value)}}}})(s);if(s instanceof Fs)return(function(c){return{mapValue:{fields:{[En]:{stringValue:c.stringValue}}}}})(s);if(s instanceof xs)return(function(c){return{mapValue:{fields:{[Bn]:{mapValue:{fields:{[ea]:ds(c.seconds),[ta]:ds(c.increment)}}}}}}})(s);if(s instanceof Fr)return(function(){return{mapValue:{fields:{[ld]:{nullValue:"NULL_VALUE"}}}}})();if(s instanceof xr)return(function(){return{mapValue:{fields:{[Na]:{nullValue:"NULL_VALUE"}}}}})();if(xE(s))return s._toProto(i.serializer);throw i.createError(`Unsupported field value: ${ic(s)}`)})(r,e)}function qE(r,e){let t={};return Km(r)?e.path&&e.path.length>0&&e.fieldMask.push(e.path):jn(r,((n,s)=>{let i=Lr(s,e.childContextForField(n));i!=null&&(t[n]=i)})),{mapValue:{fields:t}}}function jE(r){if(typeof r!="object"||r===null)return!1;if(typeof Temporal<"u"&&typeof Temporal.Instant=="function"&&r instanceof Temporal.Instant)return!0;let e=r;return e[Symbol.toStringTag]==="Temporal.Instant"&&typeof e.t=="bigint"}function KE(r){return!(typeof r!="object"||r===null||r instanceof Array||r instanceof Date||r instanceof ye||r instanceof fn||r instanceof wt||r instanceof Se||r instanceof Or||r instanceof Dt||r instanceof Fr||r instanceof xr||r instanceof Ls||r instanceof Fs||r instanceof Vs||r instanceof Os||r instanceof xs||jE(r)||xE(r))}function Ed(r,e,t){if(!KE(t)||!va(t)){let n=ic(t);throw n==="an object"?e.createError(r+" a custom object"):e.createError(r+" "+n)}}function kr(r,e,t){if((e=Oe(e))instanceof Nr)return e._internalPath;if(typeof e=="string")return _d(r,e);throw xu("Field path arguments must be of type string or ",r,!1,void 0,t)}var s0=new RegExp("[~\\*/\\[\\]]");function _d(r,e,t){if(e.search(s0)>=0)throw xu(`Invalid field path (${e}). Paths must not contain '~', '*', '/', '[', or ']'`,r,!1,void 0,t);try{return new Nr(...e.split("."))._internalPath}catch{throw xu(`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`,r,!1,void 0,t)}}function xu(r,e,t,n,s){let i=n&&!n.isEmpty(),a=s!==void 0,u=`Function ${e}() called with invalid data`;t&&(u+=" (via `toFirestore()`)"),u+=". ";let c="";return(i||a)&&(c+=" (found",i&&(c+=` in field ${n}`),a&&(c+=` in document ${s}`),c+=")"),new j(k.INVALID_ARGUMENT,u+r+c)}function JE(r,e){return r.some((t=>t.isEqual(e)))}function i0(r){return typeof r._readUserData=="function"}/**
 * @license
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var nt=class r{constructor(e){this.optionDefinitions=e}_getKnownOptions(e,t){let n=tt.empty();for(let s in this.optionDefinitions)if(this.optionDefinitions.hasOwnProperty(s)){let i=this.optionDefinitions[s];if(s in e){let a=e[s],u;i.nestedOptions&&va(a)?u={mapValue:{fields:new r(i.nestedOptions).getOptionsProto(t,a)}}:a&&(u=Lr(a,t)??void 0),u&&n.set(ht.fromServerFormat(i.serverName),u)}}return n}getOptionsProto(e,t,n){let s=this._getKnownOptions(t,e);if(n){let i=new Map(jm(n,((a,u)=>[ht.fromServerFormat(u),a!==void 0?Lr(a,e):null])));s.setAll(i)}return s.value.mapValue.fields??{}}};/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function a0(r){return typeof r=="object"&&r!==null&&!!("nullValue"in r&&(r.nullValue===null||r.nullValue==="NULL_VALUE")||"booleanValue"in r&&(r.booleanValue===null||typeof r.booleanValue=="boolean")||"integerValue"in r&&(r.integerValue===null||typeof r.integerValue=="number"||typeof r.integerValue=="string")||"doubleValue"in r&&(r.doubleValue===null||typeof r.doubleValue=="number")||"timestampValue"in r&&(r.timestampValue===null||(function(t){return typeof t=="object"&&t!==null&&"seconds"in t&&(t.seconds===null||typeof t.seconds=="number"||typeof t.seconds=="string")&&"nanos"in t&&(t.nanos===null||typeof t.nanos=="number")})(r.timestampValue))||"stringValue"in r&&(r.stringValue===null||typeof r.stringValue=="string")||"bytesValue"in r&&(r.bytesValue===null||r.bytesValue instanceof Uint8Array)||"referenceValue"in r&&(r.referenceValue===null||typeof r.referenceValue=="string")||"geoPointValue"in r&&(r.geoPointValue===null||(function(t){return typeof t=="object"&&t!==null&&"latitude"in t&&(t.latitude===null||typeof t.latitude=="number")&&"longitude"in t&&(t.longitude===null||typeof t.longitude=="number")})(r.geoPointValue))||"arrayValue"in r&&(r.arrayValue===null||(function(t){return typeof t=="object"&&t!==null&&!(!("values"in t)||t.values!==null&&!Array.isArray(t.values))})(r.arrayValue))||"mapValue"in r&&(r.mapValue===null||(function(t){return typeof t=="object"&&t!==null&&!(!("fields"in t)||t.fields!==null&&!va(t.fields))})(r.mapValue))||"fieldReferenceValue"in r&&(r.fieldReferenceValue===null||typeof r.fieldReferenceValue=="string")||"functionValue"in r&&(r.functionValue===null||(function(t){return typeof t=="object"&&t!==null&&!(!("name"in t)||t.name!==null&&typeof t.name!="string"||!("args"in t)||t.args!==null&&!Array.isArray(t.args))})(r.functionValue))||"pipelineValue"in r&&(r.pipelineValue===null||(function(t){return typeof t=="object"&&t!==null&&!(!("stages"in t)||t.stages!==null&&!Array.isArray(t.stages))})(r.pipelineValue)))}function fc(){return new rh("serverTimestamp")}function zE(r){return new Dt(r)}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function G(r){let e;return r instanceof Zt?r:(e=va(r)?c0(r):r instanceof Array?l0(r):WE(r,void 0),e)}function lB(r){if(r instanceof Zt)return r;if(r instanceof Dt)return fa(r);if(Array.isArray(r))return fa(zE(r));throw new Error("Unsupported value: "+typeof r)}function dc(r){return CB(r)?o0(r):G(r)}var Zt=class{constructor(){this._protoValueType="ProtoValue"}add(e){return new x("add",[this,G(e)],"add")}asBoolean(){if(this instanceof Vn)return this;if(this instanceof Ms)return new Lu(this);if(this instanceof Vr)return new ah(this);if(this instanceof x)return new Fu(this);throw new j("invalid-argument",`Conversion of type ${typeof this} to BooleanExpression not supported.`)}subtract(e){return new x("subtract",[this,G(e)],"subtract")}multiply(e){return new x("multiply",[this,G(e)],"multiply")}divide(e){return new x("divide",[this,G(e)],"divide")}mod(e){return new x("mod",[this,G(e)],"mod")}equal(e){return new x("equal",[this,G(e)],"equal").asBoolean()}notEqual(e){return new x("not_equal",[this,G(e)],"notEqual").asBoolean()}lessThan(e){return new x("less_than",[this,G(e)],"lessThan").asBoolean()}lessThanOrEqual(e){return new x("less_than_or_equal",[this,G(e)],"lessThanOrEqual").asBoolean()}greaterThan(e){return new x("greater_than",[this,G(e)],"greaterThan").asBoolean()}greaterThanOrEqual(e){return new x("greater_than_or_equal",[this,G(e)],"greaterThanOrEqual").asBoolean()}arrayConcat(e,...t){let n=[e,...t].map((s=>G(s)));return new x("array_concat",[this,...n],"arrayConcat")}arrayContains(e){return new x("array_contains",[this,G(e)],"arrayContains").asBoolean()}arrayContainsAll(e){let t=Array.isArray(e)?new pr(e.map(G),"arrayContainsAll"):e;return new x("array_contains_all",[this,t],"arrayContainsAll").asBoolean()}arrayContainsAny(e){let t=Array.isArray(e)?new pr(e.map(G),"arrayContainsAny"):e;return new x("array_contains_any",[this,t],"arrayContainsAny").asBoolean()}arrayReverse(){return new x("array_reverse",[this])}arrayLength(){return new x("array_length",[this],"arrayLength")}equalAny(e){let t=Array.isArray(e)?new pr(e.map(G),"equalAny"):e;return new x("equal_any",[this,t],"equalAny").asBoolean()}notEqualAny(e){let t=Array.isArray(e)?new pr(e.map(G),"notEqualAny"):e;return new x("not_equal_any",[this,t],"notEqualAny").asBoolean()}exists(){return new x("exists",[this],"exists").asBoolean()}charLength(){return new x("char_length",[this],"charLength")}like(e){return new x("like",[this,G(e)],"like").asBoolean()}regexContains(e){return new x("regex_contains",[this,G(e)],"regexContains").asBoolean()}regexFind(e){return new x("regex_find",[this,G(e)],"regexFind")}regexFindAll(e){return new x("regex_find_all",[this,G(e)],"regexFindAll")}regexMatch(e){return new x("regex_match",[this,G(e)],"regexMatch").asBoolean()}stringContains(e){return new x("string_contains",[this,G(e)],"stringContains").asBoolean()}startsWith(e){return new x("starts_with",[this,G(e)],"startsWith").asBoolean()}endsWith(e){return new x("ends_with",[this,G(e)],"endsWith").asBoolean()}toLower(){return new x("to_lower",[this],"toLower")}toUpper(){return new x("to_upper",[this],"toUpper")}trim(e){let t=[this];return e&&t.push(G(e)),new x("trim",t,"trim")}ltrim(e){let t=[this];return e&&t.push(G(e)),new x("ltrim",t,"ltrim")}rtrim(e){let t=[this];return e&&t.push(G(e)),new x("rtrim",t,"rtrim")}type(){return new x("type",[this])}isType(e){return new x("is_type",[this,fa(e)],"isType").asBoolean()}stringConcat(e,...t){let n=[e,...t].map(G);return new x("string_concat",[this,...n],"stringConcat")}stringIndexOf(e){return new x("string_index_of",[this,G(e)],"stringIndexOf")}stringRepeat(e){return new x("string_repeat",[this,G(e)],"stringRepeat")}stringReplaceAll(e,t){return new x("string_replace_all",[this,G(e),G(t)],"stringReplaceAll")}stringReplaceOne(e,t){return new x("string_replace_one",[this,G(e),G(t)],"stringReplaceOne")}concat(e,...t){let n=[e,...t].map(G);return new x("concat",[this,...n],"concat")}reverse(){return new x("reverse",[this],"reverse")}arrayFilter(e,t){return new x("array_filter",[this,G(e),t],"arrayFilter")}arrayTransform(e,t){return new x("array_transform",[this,G(e),t],"arrayTransform")}arrayTransformWithIndex(e,t,n){return new x("array_transform",[this,G(e),G(t),n],"arrayTransformWithIndex")}arraySlice(e,t){let n=[this,G(e)];return t!==void 0&&n.push(G(t)),new x("array_slice",n,"arraySlice")}arrayFirst(){return new x("array_first",[this],"arrayFirst")}arrayFirstN(e){return new x("array_first_n",[this,G(e)],"arrayFirstN")}arrayLast(){return new x("array_last",[this],"arrayLast")}arrayLastN(e){return new x("array_last_n",[this,G(e)],"arrayLastN")}arrayMaximum(){return new x("maximum",[this],"arrayMaximum")}arrayMaximumN(e){return new x("maximum_n",[this,G(e)],"arrayMaximumN")}arrayMinimum(){return new x("minimum",[this],"arrayMinimum")}arrayMinimumN(e){return new x("minimum_n",[this,G(e)],"arrayMinimumN")}arrayIndexOf(e){return new x("array_index_of",[this,G(e),G("first")],"arrayIndexOf")}arrayLastIndexOf(e){return new x("array_index_of",[this,G(e),G("last")],"arrayLastIndexOf")}arrayIndexOfAll(e){return new x("array_index_of_all",[this,G(e)],"arrayIndexOfAll")}byteLength(){return new x("byte_length",[this],"byteLength")}ceil(){return new x("ceil",[this])}floor(){return new x("floor",[this])}abs(){return new x("abs",[this])}exp(){return new x("exp",[this])}mapGet(e){return new x("map_get",[this,fa(e)],"mapGet")}mapSet(e,t,...n){let s=[this,G(e),G(t),...n.map(G)];return new x("map_set",s,"mapSet")}mapKeys(){return new x("map_keys",[this],"mapKeys")}mapValues(){return new x("map_values",[this],"mapValues")}mapEntries(){return new x("map_entries",[this],"mapEntries")}getField(e){return new x("get_field",[this,G(e)],"get_field")}count(){return Et._create("count",[this],"count")}sum(){return Et._create("sum",[this],"sum")}average(){return Et._create("average",[this],"average")}minimum(){return Et._create("minimum",[this],"minimum")}maximum(){return Et._create("maximum",[this],"maximum")}first(){return Et._create("first",[this],"first")}last(){return Et._create("last",[this],"last")}arrayAgg(){return Et._create("array_agg",[this],"arrayAgg")}arrayAggDistinct(){return Et._create("array_agg_distinct",[this],"arrayAggDistinct")}countDistinct(){return Et._create("count_distinct",[this],"countDistinct")}logicalMaximum(e,...t){let n=[e,...t];return new x("maximum",[this,...n.map(G)],"logicalMaximum")}logicalMinimum(e,...t){let n=[e,...t];return new x("minimum",[this,...n.map(G)],"minimum")}vectorLength(){return new x("vector_length",[this],"vectorLength")}cosineDistance(e){return new x("cosine_distance",[this,lB(e)],"cosineDistance")}dotProduct(e){return new x("dot_product",[this,lB(e)],"dotProduct")}euclideanDistance(e){return new x("euclidean_distance",[this,lB(e)],"euclideanDistance")}unixMicrosToTimestamp(){return new x("unix_micros_to_timestamp",[this],"unixMicrosToTimestamp")}timestampToUnixMicros(){return new x("timestamp_to_unix_micros",[this],"timestampToUnixMicros")}unixMillisToTimestamp(){return new x("unix_millis_to_timestamp",[this],"unixMillisToTimestamp")}timestampToUnixMillis(){return new x("timestamp_to_unix_millis",[this],"timestampToUnixMillis")}unixSecondsToTimestamp(){return new x("unix_seconds_to_timestamp",[this],"unixSecondsToTimestamp")}timestampToUnixSeconds(){return new x("timestamp_to_unix_seconds",[this],"timestampToUnixSeconds")}timestampAdd(e,t){return new x("timestamp_add",[this,G(e),G(t)],"timestampAdd")}timestampSubtract(e,t){return new x("timestamp_subtract",[this,G(e),G(t)],"timestampSubtract")}timestampDiff(e,t){return new x("timestamp_diff",[this,dc(e),G(t)],"timestampDiff")}timestampExtract(e,t){let n=[this,G(e)];return t&&n.push(G(t)),new x("timestamp_extract",n,"timestampExtract")}documentId(){return new x("document_id",[this],"documentId")}parent(){return new x("parent",[this],"parent")}substring(e,t){let n=G(e);return new x("substring",t===void 0?[this,n]:[this,n,G(t)],"substring")}arrayGet(e){return new x("array_get",[this,G(e)],"arrayGet")}isError(){return new x("is_error",[this],"isError").asBoolean()}ifError(e){let t=new x("if_error",[this,G(e)],"ifError");return e instanceof Vn?t.asBoolean():t}isAbsent(){return new x("is_absent",[this],"isAbsent").asBoolean()}mapRemove(e){return new x("map_remove",[this,G(e)],"mapRemove")}mapMerge(e,...t){let n=G(e),s=t.map(G);return new x("map_merge",[this,n,...s],"mapMerge")}pow(e){return new x("pow",[this,G(e)])}trunc(e){return e===void 0?new x("trunc",[this]):new x("trunc",[this,G(e)],"trunc")}round(e){return e===void 0?new x("round",[this]):new x("round",[this,G(e)],"round")}collectionId(){return new x("collection_id",[this])}length(){return new x("length",[this])}ln(){return new x("ln",[this])}sqrt(){return new x("sqrt",[this])}stringReverse(){return new x("string_reverse",[this])}ifAbsent(e){return new x("if_absent",[this,G(e)],"ifAbsent")}ifNull(e){return new x("if_null",[this,G(e)],"ifNull")}coalesce(e,...t){return new x("coalesce",[this,G(e),...t.map(G)],"coalesce")}join(e){return new x("join",[this,G(e)],"join")}log10(){return new x("log10",[this])}arraySum(){return new x("sum",[this])}split(e){return new x("split",[this,G(e)])}timestampTruncate(e,t){let n=[this,G(e)];return t&&n.push(G(t)),new x("timestamp_trunc",n)}ascending(){return B0(this)}descending(){return h0(this)}as(e){return new ih(this,e,"as")}},Et=class r{constructor(e,t){this.name=e,this.params=t,this.exprType="AggregateFunction",this._protoValueType="ProtoValue"}static _create(e,t,n){let s=new r(e,t);return s._methodName=n,s}as(e){return new sh(this,e,"as")}over(e){return new oh(this.name,this.params,new Vu(e),"over")}_toProto(e){return{functionValue:{name:this.name,args:this.params.map((t=>t._toProto(e)))}}}_readUserData(e){e=this._methodName?e.contextWith({methodName:this._methodName}):e,this.params.forEach((t=>t._readUserData(e)))}},sh=class{constructor(e,t,n){this.aggregate=e,this.alias=t,this._methodName=n}_readUserData(e){this.aggregate._readUserData(e)}},ih=class{constructor(e,t,n){this.expr=e,this.alias=t,this._methodName=n,this.exprType="AliasedExpression",this.selectable=!0}_readUserData(e){this.expr._readUserData(e)}},pr=class extends Zt{constructor(e,t){super(),this.di=e,this._methodName=t,this.expressionType="ListOfExpressions"}_toProto(e){return{arrayValue:{values:this.di.map((t=>t._toProto(e)))}}}_readUserData(e){this.di.forEach((t=>t._readUserData(e)))}},Vr=class extends Zt{constructor(e,t){super(),this.fieldPath=e,this._methodName=t,this.expressionType="Field",this.selectable=!0}get _fieldPath(){return this.fieldPath}get fieldName(){return this.fieldPath.canonicalString()}get alias(){return this.fieldName}get expr(){return this}geoDistance(e){return new x("geo_distance",[this,G(e)],"geoDistance")}_toProto(e){return{fieldReferenceValue:this.fieldPath.canonicalString()}}_readUserData(e){}};function o0(r){return u0(r,"field")}function u0(r,e){return new Vr(typeof r=="string"?Es===r?FE()._internalPath:kr("field",r):r._internalPath,e)}var Ms=class r extends Zt{constructor(e,t){super(),this.value=e,this._methodName=t,this.expressionType="Constant"}static _fromProto(e){let t=new r(e,void 0);return t._protoValue=e,t}_toProto(e){return z(this._protoValue!==void 0,237),this._protoValue}_getValue(){return this._protoValue}_readUserData(e){e=this._methodName?e.contextWith({methodName:this._methodName}):e,a0(this._protoValue)||(this._protoValue=Lr(this.value,e))}};function fa(r,e){return WE(r,"constant")}function WE(r,e){let t=new Ms(r,e);return typeof r=="boolean"?new Lu(t):t}var x=class extends Zt{constructor(e,t,n,s){super(),this.name=e,this.params=t,this.expressionType="Function",this._optionsProto=void 0,n!==void 0&&(this._methodName=n),s!==void 0&&(this._options=s)}get _optionsUtil(){return new nt({})}_toProto(e){let t={functionValue:{name:this.name,args:this.params.map((n=>n._toProto(e)))}};return this._optionsProto&&(t.functionValue.options=this._optionsProto),t}_readUserData(e){e=this._methodName?e.contextWith({methodName:this._methodName}):e,this.params.forEach((t=>t._readUserData(e))),this._options&&(this._optionsProto=this._optionsUtil.getOptionsProto(e,this._options))}},Vn=class r extends Zt{get _methodName(){return this._expr._methodName}countIf(){return Et._create("count_if",[this],"countIf")}not(){return new x("not",[this],"not").asBoolean()}conditional(e,t){return new x("conditional",[this,e,t],"conditional")}ifError(e){let t=G(e),n=new x("if_error",[this,t],"ifError");return t instanceof r?n.asBoolean():n}_toProto(e){return this._expr._toProto(e)}_readUserData(e){this._expr._readUserData(e)}},Fu=class extends Vn{constructor(e){super(),this._expr=e,this.expressionType="Function"}},Lu=class extends Vn{constructor(e){super(),this._expr=e,this.expressionType="Constant"}_getValue(){return this._expr._getValue()}},ah=class extends Vn{constructor(e){super(),this._expr=e,this.expressionType="Field"}};function c0(r,e){let t=[];for(let n in r)if(Object.prototype.hasOwnProperty.call(r,n)){let s=r[n];t.push(fa(n)),t.push(G(s))}return new x("map",t,"map")}function l0(r){return(function(t,n){return new x("array",t.map((s=>G(s))),n)})(r,"array")}function B0(r){return new ku(dc(r),"ascending","ascending")}function h0(r){return new ku(dc(r),"descending","descending")}var ku=class{constructor(e,t,n){this.expr=e,this.direction=t,this._methodName=n,this._protoValueType="ProtoValue"}_toProto(e){return{mapValue:{fields:{direction:wu(this.direction),expression:this.expr._toProto(e)}}}}_readUserData(e){this.expr._readUserData(e)}};function su(r){return r instanceof Zt}var Vu=class{constructor(e){this._protoValueType="ProtoValue";let t=e.sort;this.partition=(e.partition??[]).map(dc),this.sort=t===void 0?[]:Array.isArray(t)?t:[t],this.documents=e.documents,this.range=e.range}_toProto(e){let t={};return this.partition.length>0&&(t.partition={arrayValue:{values:this.partition.map((n=>n._toProto(e)))}}),this.sort.length>0&&(t.sort={arrayValue:{values:this.sort.map((n=>n._toProto(e)))}}),this.documents!==void 0&&(t.documents=this.frameToProto(e,this.documents)),this.range!==void 0&&(t.range=this.frameToProto(e,this.range)),{mapValue:{fields:t}}}_readUserData(e){this.partition.forEach((t=>t._readUserData(e))),this.sort.forEach((t=>t._readUserData(e)));for(let t of[this.documents,this.range]){if(t===void 0)continue;su(t.preceding)&&t.preceding._readUserData(e),su(t.following)&&t.following._readUserData(e);let n=t.unit;n!==void 0&&su(n)&&n._readUserData(e)}}frameToProto(e,t){let n={};t.preceding!==void 0&&(n.preceding=this.frameBoundToProto(e,t.preceding,"preceding")),t.following!==void 0&&(n.following=this.frameBoundToProto(e,t.following,"following"));let s=t.unit;return s!==void 0&&(n.unit=CB(s)?wu(s):s._toProto(e)),{mapValue:{fields:n}}}frameBoundToProto(e,t,n){if(typeof t=="number")return cc(e,t);if(CB(t))return wu(t);if(su(t))return t._toProto(e);throw new j("invalid-argument",`Invalid window frame bound: '${n}'. Expected a number, 'current', 'unbounded', or an Expression.`)}},oh=class r{constructor(e,t=[],n,s){this.name=e,this.params=t,this.window=n,this._methodName=s,this.exprType="WindowFunction",this._protoValueType="ProtoValue"}over(e){return new r(this.name,this.params,new Vu(e),this._methodName??"over")}as(e){return new uh(this,e,"as")}_toProto(e){let t={functionValue:{name:this.name,args:this.params.map((n=>n._toProto(e)))}};return this.window===void 0?t:{functionValue:{name:"over",args:[t,this.window._toProto(e)]}}}_readUserData(e){e=this._methodName?e.contextWith({methodName:this._methodName}):e,this.params.forEach((t=>t._readUserData(e))),this.window?._readUserData(e)}},uh=class{constructor(e,t,n){this.windowFunction=e,this.alias=t,this._methodName=n}_readUserData(e){this.windowFunction._readUserData(e)}};/**
 * @license
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var at=class{constructor(e){this.optionsProto=void 0,{rawOptions:this.rawOptions,...this.knownOptions}=e}_readUserData(e){this.optionsProto=this._optionsUtil.getOptionsProto(e,this.knownOptions,this.rawOptions)}_toProto(e){return{name:this._name,options:this.optionsProto}}},Mu=class extends at{get _name(){return"add_fields"}get _optionsUtil(){return new nt({})}constructor(e,t){super(t),this.fields=e}_toProto(e){return{...super._toProto(e),args:[la(e,this.fields)]}}_readUserData(e){super._readUserData(e),Mn(this.fields,e)}};var Gu=class extends at{get _name(){return"aggregate"}get _optionsUtil(){return new nt({})}constructor(e,t,n){super(n),this.groups=e,this.accumulators=t}_toProto(e){return{...super._toProto(e),args:[la(e,this.accumulators),la(e,this.groups)]}}_readUserData(e){super._readUserData(e),Mn(this.groups,e),Mn(this.accumulators,e)}},Uu=class extends at{get _name(){return"distinct"}get _optionsUtil(){return new nt({})}constructor(e,t){super(t),this.groups=e}_toProto(e){return{...super._toProto(e),args:[la(e,this.groups)]}}_readUserData(e){super._readUserData(e),Mn(this.groups,e)}},Gs=class extends at{get _name(){return"collection"}get _optionsUtil(){return new nt({forceIndex:{serverName:"force_index"}})}constructor(e,t){super(t),this.pi=f0(e)}_toProto(e){return{...super._toProto(e),args:[{referenceValue:this.pi}]}}_readUserData(e){super._readUserData(e)}},Us=class extends at{get _name(){return"collection_group"}get _optionsUtil(){return new nt({forceIndex:{serverName:"force_index"}})}constructor(e,t){super(t),this.collectionId=e}_toProto(e){return{...super._toProto(e),args:[{referenceValue:""},{stringValue:this.collectionId}]}}_readUserData(e){super._readUserData(e)}};var da=class extends at{get _name(){return"database"}get _optionsUtil(){return new nt({})}_toProto(e){return{...super._toProto(e)}}_readUserData(e){super._readUserData(e)}},pa=class extends at{get _name(){return"documents"}get _optionsUtil(){return new nt({})}constructor(e,t){if(super(t),!e||e.length===0)throw new j(k.INVALID_ARGUMENT,"Empty document paths are not allowed in DocumentsSource");let n=e.map((i=>i.startsWith("/")?i:"/"+i)),s=new Set(n);if(s.size!==n.length)throw new j(k.INVALID_ARGUMENT,"Duplicate document paths are not allowed in DocumentsSource");this.gi=n,this.yi=s}_toProto(e){return{...super._toProto(e),args:this.gi.map((t=>({referenceValue:t})))}}_readUserData(e){super._readUserData(e)}};var Ca=class extends at{get _name(){return"where"}get _optionsUtil(){return new nt({})}constructor(e,t){super(t),this.condition=e}_toProto(e){return{...super._toProto(e),args:[this.condition._toProto(e)]}}_readUserData(e){super._readUserData(e),Mn(this.condition,e)}};var Mr=class extends at{get _name(){return"limit"}get _optionsUtil(){return new nt({})}constructor(e,t){z(!isNaN(e)&&e!==1/0&&e!==-1/0,34860),super(t),this.limit=e}_toProto(e){return{...super._toProto(e),args:[cc(e,this.limit)]}}},Hu=class extends at{get _name(){return"offset"}get _optionsUtil(){return new nt({})}constructor(e,t){super(t),this.offset=e}_toProto(e){return{...super._toProto(e),args:[cc(e,this.offset)]}}},ch=class extends at{get _name(){return"select"}get _optionsUtil(){return new nt({})}constructor(e,t){super(t),this.selections=e}_toProto(e){return{...super._toProto(e),args:[la(e,this.selections)]}}_readUserData(e){super._readUserData(e),Mn(this.selections,e)}},ga=class extends at{get _name(){return"sort"}get _optionsUtil(){return new nt({})}constructor(e,t){super(t),this.orderings=e}_toProto(e){return{...super._toProto(e),args:this.orderings.map((t=>t._toProto(e)))}}_readUserData(e){super._readUserData(e),Mn(this.orderings,e)}};var lh=class r extends at{get _name(){return"replace_with"}get _optionsUtil(){return new nt({})}constructor(e,t){super(t),this.map=e}_toProto(e){return{...super._toProto(e),args:[this.map._toProto(e),wu(r.bi)]}}_readUserData(e){super._readUserData(e),Mn(this.map,e)}};lh.bi="full_replace";function f0(r){let e=typeof r=="string"?r:r.path;return e.startsWith("/")?e:"/"+e}function Mn(r,e){return i0(r)?r._readUserData(e):Array.isArray(r)?r.forEach((t=>t._readUserData(e))):r instanceof Map?r.forEach((t=>t._readUserData(e))):Object.values(r).forEach((t=>t._readUserData(e))),r}/**
 * @license
 * Copyright 2026 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */// Copyright 2024 Google LLC* @license
var et=class{constructor(e,t,n){this.serializer=e,this.stages=t,this.listenOptions=n,this.isCorePipeline=!0}getPipelineCollection(){return pc(this)}getPipelineCollectionGroup(){return yd(this)}getPipelineCollectionId(){return d0(this)}getPipelineDocuments(){return Bh(this)}getPipelineFlavor(){return(function(t){let n="exact";return t.stages.forEach(((s,i)=>{s._name!==Uu.name&&s._name!==Gu.name||(n="keyless"),s._name===ch.name&&n==="exact"&&(n="augmented"),s._name===Mu.name&&i<t.stages.length-1&&n==="exact"&&(n="augmented")})),n})(this)}getPipelineSourceType(){return Fn(this)}};function Fn(r){let e=r.stages[0];return e instanceof Gs||e instanceof Us||e instanceof da||e instanceof pa?e._name:"unknown"}function pc(r){if(Fn(r)==="collection")return r.stages[0].pi}function yd(r){if(Fn(r)==="collection_group")return r.stages[0].collectionId}function d0(r){switch(Fn(r)){case"collection":return he.fromString(pc(r)).lastSegment();case"collection_group":return yd(r);default:return}}function Bh(r){if(Fn(r)==="documents")return r.stages[0].gi}var b=class r{constructor(e,t){this.type=e,this.value=t}static Oi(){return new r("ERROR",void 0)}static Mi(){return new r("UNSET",void 0)}static Ni(){return new r("NULL",Ts)}static newValue(e){return _t(e)?new r("NULL",Ts):(function(n){return!!n&&"booleanValue"in n})(e)?new r("BOOLEAN",e):Wt(e)?new r("INT",e):Qt(e)?new r("DOUBLE",e):(function(n){return!!n&&"timestampValue"in n&&!!n.timestampValue})(e)?new r("TIMESTAMP",e):(function(n){return!!n&&"stringValue"in n})(e)?new r("STRING",e):(function(n){return!!n&&"bytesValue"in n})(e)?new r("BYTES",e):e.referenceValue?new r("REFERENCE",e):e.geoPointValue?new r("GEO_POINT",e):bs(e)?new r("ARRAY",e):mB(e)?new r("VECTOR",e):Cr(e)?new r("MAP",e):new r("ERROR",void 0)}Bi(){return this.type==="ERROR"||this.type==="UNSET"}Li(){return this.type==="NULL"}};function Yi(r){if(!r.Bi())return r.value}function QE(r){return r instanceof Vn?r._expr:r}function ee(r){if((r=QE(r))instanceof Vr)return new hh(r);if(r instanceof Ms)return new fh(r);if(r instanceof pr)return new dh(r);if(r instanceof x){if(r.name==="add")return new ph(r);if(r.name==="subtract")return new Ch(r);if(r.name==="multiply")return new gh(r);if(r.name==="divide")return new mh(r);if(r.name==="mod")return new Eh(r);if(r.name==="and")return new _h(r);if(r.name==="equal")return new Oh(r);if(r.name==="not_equal")return new xh(r);if(r.name==="less_than")return new Fh(r);if(r.name==="less_than_or_equal")return new Lh(r);if(r.name==="greater_than")return new kh(r);if(r.name==="greater_than_or_equal")return new Vh(r);if(r.name==="array_concat")return new Mh(r);if(r.name==="array_reverse")return new Gh(r);if(r.name==="array_contains")return new Uh(r);if(r.name==="array_contains_all")return new Hh(r);if(r.name==="array_contains_any")return new qh(r);if(r.name==="array_length")return new jh(r);if(r.name==="array_element")return new Kh(r);if(r.name==="equal_any")return new qu(r);if(r.name==="not_equal_any")return new Dh(r);if(r.name==="is_nan")return new Ih(r);if(r.name==="is_not_nan")return new Th(r);if(r.name==="is_null")return new Ah(r);if(r.name==="is_not_null")return new bh(r);if(r.name==="is_error")return new vh(r);if(r.name==="exists")return new Rh(r);if(r.name==="not")return new Hs(r);if(r.name==="or")return new yh(r);if(r.name==="xor")return new wh(r);if(r.name==="conditional")return new Sh(r);if(r.name==="maximum")return new Ph(r);if(r.name==="minimum")return new Nh(r);if(r.name==="reverse")return new Jh(r);if(r.name==="replace_first")return new zh(r);if(r.name==="replace_all")return new Wh(r);if(r.name==="char_length")return new Qh(r);if(r.name==="byte_length")return new $h(r);if(r.name==="like")return new Yh(r);if(r.name==="regex_contains")return new Xh(r);if(r.name==="regex_match")return new Zh(r);if(r.name==="string_contains")return new ef(r);if(r.name==="starts_with")return new tf(r);if(r.name==="ends_with")return new nf(r);if(r.name==="to_lower")return new rf(r);if(r.name==="to_upper")return new sf(r);if(r.name==="trim")return new af(r);if(r.name==="string_concat")return new of(r);if(r.name==="map_get")return new uf(r);if(r.name==="cosine_distance")return new cf(r);if(r.name==="dot_product")return new lf(r);if(r.name==="euclidean_distance")return new Bf(r);if(r.name==="vector_length")return new hf(r);if(r.name==="unix_micros_to_timestamp")return new ff(r);if(r.name==="timestamp_to_unix_micros")return new Cf(r);if(r.name==="unix_millis_to_timestamp")return new df(r);if(r.name==="timestamp_to_unix_millis")return new gf(r);if(r.name==="unix_seconds_to_timestamp")return new pf(r);if(r.name==="timestamp_to_unix_seconds")return new mf(r);if(r.name==="timestamp_add")return new Ef(r);if(r.name==="timestamp_subtract")return new _f(r)}throw new Error(`Unknown Expr : ${r}`)}var hh=class{constructor(e){this.expr=e}evaluate(e,t){if(this.expr.fieldName===Es)return b.newValue({referenceValue:ca(e.serializer,t.key)});if(this.expr.fieldName==="__update_time__")return b.newValue({timestampValue:cu(e.serializer,t.version)});if(this.expr.fieldName==="__create_time__")return b.newValue({timestampValue:cu(e.serializer,t.createTime)});let n=t.data.field(this.expr._fieldPath);return n?ac(n)?b.newValue((function(i,a){if(i.serverTimestampBehavior==="estimate")return{timestampValue:cu(i.serializer,te.fromTimestamp(_s(a)))};if(i.serverTimestampBehavior==="previous"){let u=Sa(a);if(u)return u}return{nullValue:"NULL_VALUE"}})(e,n)):b.newValue(n):b.Mi()}},fh=class{constructor(e){this.expr=e}evaluate(e,t){return b.newValue(this.expr._getValue())}},dh=class{constructor(e){this.expr=e}evaluate(e,t){let n=this.expr.di.map((s=>ee(s).evaluate(e,t)));return n.some((s=>s.Bi()))?b.Oi():b.newValue({arrayValue:{values:n.map((s=>s.value))}})}};function We(r){return Qt(r)?Number(r.doubleValue):Number(r.integerValue)}function en(r){return BigInt(r.integerValue)}var p0=BigInt("0x7fffffffffffffff"),C0=-BigInt("0x8000000000000000"),Gr=class{constructor(e){this.expr=e}evaluate(e,t){z(this.expr.params.length>=2,24778);let n=ee(this.expr.params[0]).evaluate(e,t),s=ee(this.expr.params[1]).evaluate(e,t),i=this.$i(n,s);for(let a of this.expr.params.slice(2)){let u=ee(a).evaluate(e,t);i=this.$i(i,u)}return i}$i(e,t){if(e.Bi()||t.Bi())return b.Oi();if(e.Li()||t.Li())return b.Ni();let n=e.value,s=t.value;if(!Qt(n)&&!Wt(n)||!Qt(s)&&!Wt(s))return b.Oi();if(Qt(n)||Qt(s)){let i=this.Ui(n,s);return i?b.newValue(i):b.Oi()}if(Wt(n)&&Wt(s)){let i=this.ki(n,s);return i===void 0?b.Oi():typeof i=="number"?b.newValue({doubleValue:i}):i<C0||i>p0?b.Oi():b.newValue({integerValue:`${i}`})}return b.Oi()}};function wn(r,e){return Pe(r)!==Pe(e)?"TYPE_MISMATCH":Je(r)||Je(e)?"NOT_EQ":_t(r)&&_t(e)?"EQ":_t(r)||_t(e)?"NULL":bs(r)&&bs(e)?(function(n,s){if(n.values?.length!==s.values?.length)return"NOT_EQ";let i=!1;for(let a=0;a<(n.values?.length??0);a++){let u=n.values[a],c=s.values[a];switch(wn(u,c)){case"EQ":break;case"NOT_EQ":case"TYPE_MISMATCH":return"NOT_EQ";case"NULL":i=!0;break;default:$(44609,{Qi:u,qi:c})}}return i?"NULL":"EQ"})(r.arrayValue,e.arrayValue):mB(r)&&mB(e)||Cr(r)&&Cr(e)?(function(n,s){let i=n.fields||{},a=s.fields||{};if(_r(i)!==_r(a))return"NOT_EQ";let u=!1;for(let c in i)if(i.hasOwnProperty(c)){if(a[c]===void 0)return"NOT_EQ";switch(wn(i[c],a[c])){case"NOT_EQ":case"TYPE_MISMATCH":return"NOT_EQ";case"NULL":u=!0}}return u?"NULL":"EQ"})(r.mapValue,e.mapValue):(function(n,s){return Nt(n,s,{be:!1,ye:!0,we:!0})})(r,e)?"EQ":"NOT_EQ"}var ph=class extends Gr{ki(e,t){return en(e)+en(t)}Ui(e,t){return{doubleValue:We(e)+We(t)}}},Ch=class extends Gr{constructor(e){super(e),this.expr=e}ki(e,t){return en(e)-en(t)}Ui(e,t){return{doubleValue:We(e)-We(t)}}},gh=class extends Gr{constructor(e){super(e),this.expr=e}ki(e,t){return en(e)*en(t)}Ui(e,t){return{doubleValue:We(e)*We(t)}}},mh=class extends Gr{constructor(e){super(e),this.expr=e}ki(e,t){let n=en(t);if(n!==BigInt(0))return en(e)/n}Ui(e,t){let n=We(t);return n===0?{doubleValue:ys(n)?Number.NEGATIVE_INFINITY:Number.POSITIVE_INFINITY}:{doubleValue:We(e)/n}}},Eh=class extends Gr{constructor(e){super(e),this.expr=e}ki(e,t){let n=en(t);if(n!==BigInt(0))return en(e)%n}Ui(e,t){let n=We(t);if(n!==0)return{doubleValue:We(e)%n}}},_h=class{constructor(e){this.expr=e}evaluate(e,t){let n=!1,s=!1;for(let i of this.expr.params){let a=ee(i).evaluate(e,t);switch(a.type){case"BOOLEAN":if(!a.value?.booleanValue)return b.newValue(Ke);break;case"NULL":s=!0;break;default:n=!0}}return n?b.Oi():s?b.Ni():b.newValue(ft)}},Hs=class{constructor(e){this.expr=e}evaluate(e,t){z(this.expr.params.length===1,9634);let n=ee(this.expr.params[0]).evaluate(e,t);switch(n.type){case"BOOLEAN":return b.newValue({booleanValue:!n.value?.booleanValue});case"NULL":return b.Ni();default:return b.Oi()}}},yh=class{constructor(e){this.expr=e}evaluate(e,t){let n=!1,s=!1;for(let i of this.expr.params){let a=ee(i).evaluate(e,t);switch(a.type){case"BOOLEAN":if(a.value?.booleanValue)return b.newValue(ft);break;case"NULL":s=!0;break;default:n=!0}}return n?b.Oi():s?b.Ni():b.newValue(Ke)}},wh=class r{constructor(e){this.expr=e}evaluate(e,t){let n=!1,s=!1;for(let i of this.expr.params){let a=ee(i).evaluate(e,t);switch(a.type){case"BOOLEAN":n=r.xor(n,!!a.value?.booleanValue);break;case"NULL":s=!0;break;default:return b.Oi()}}return s?b.Ni():b.newValue({booleanValue:n})}static xor(e,t){return(e||t)&&!(e&&t)}},qu=class{constructor(e){this.expr=e}evaluate(e,t){z(this.expr.params.length===2,55094);let n=!1,s=ee(this.expr.params[0]).evaluate(e,t);switch(s.type){case"NULL":n=!0;break;case"ERROR":case"UNSET":return b.Oi()}let i=ee(this.expr.params[1]).evaluate(e,t);switch(i.type){case"ARRAY":break;case"NULL":n=!0;break;default:return b.Oi()}if(n)return b.Ni();for(let a of i.value?.arrayValue?.values??[])switch(_t(s.value)&&_t(a)?"EQ":wn(s.value,a)){case"EQ":return b.newValue(ft);case"NOT_EQ":case"TYPE_MISMATCH":break;case"NULL":n=!0;break;default:$(44608,{value:s.value,candidate:a})}return n?b.Ni():b.newValue(Ke)}},Dh=class{constructor(e){this.expr=e}evaluate(e,t){return new Hs(new x("not",[new x("equal_any",this.expr.params)])).evaluate(e,t)}},Ih=class{constructor(e){this.expr=e}evaluate(e,t){z(this.expr.params.length===1,23322);let n=ee(this.expr.params[0]).evaluate(e,t);switch(n.type){case"INT":return b.newValue(Ke);case"DOUBLE":return b.newValue({booleanValue:isNaN(We(n.value))});case"NULL":return b.Ni();default:return b.Oi()}}},Th=class{constructor(e){this.expr=e}evaluate(e,t){return z(this.expr.params.length===1,50406),new Hs(new x("not",[new x("is_nan",this.expr.params)])).evaluate(e,t)}},Ah=class{constructor(e){this.expr=e}evaluate(e,t){switch(z(this.expr.params.length===1,23123),ee(this.expr.params[0]).evaluate(e,t).type){case"NULL":return b.newValue(ft);case"UNSET":case"ERROR":return b.Oi();default:return b.newValue(Ke)}}},bh=class{constructor(e){this.expr=e}evaluate(e,t){return z(this.expr.params.length===1,23167),new Hs(new x("not",[new x("is_null",this.expr.params)])).evaluate(e,t)}},vh=class{constructor(e){this.expr=e}evaluate(e,t){return z(this.expr.params.length===1,5228),ee(this.expr.params[0]).evaluate(e,t).type==="ERROR"?b.newValue(ft):b.newValue(Ke)}},Rh=class{constructor(e){this.expr=e}evaluate(e,t){switch(z(this.expr.params.length===1,6877),ee(this.expr.params[0]).evaluate(e,t).type){case"ERROR":return b.Oi();case"UNSET":return b.newValue(Ke);default:return b.newValue(ft)}}},Sh=class{constructor(e){this.expr=e}evaluate(e,t){z(this.expr.params.length===3,11706);let n=ee(this.expr.params[0]).evaluate(e,t);switch(n.type){case"BOOLEAN":return n.value?.booleanValue?ee(this.expr.params[1]).evaluate(e,t):ee(this.expr.params[2]).evaluate(e,t);case"NULL":return ee(this.expr.params[2]).evaluate(e,t);default:return b.Oi()}}},Ph=class{constructor(e){this.expr=e}evaluate(e,t){let n=this.expr.params.map((i=>ee(i).evaluate(e,t))),s;for(let i of n)switch(i.type){case"ERROR":case"UNSET":case"NULL":continue;default:s=s===void 0||dt(i.value,s.value)>0?i:s}return s===void 0?b.Ni():s}},Nh=class{constructor(e){this.expr=e}evaluate(e,t){let n=this.expr.params.map((i=>ee(i).evaluate(e,t))),s;for(let i of n)switch(i.type){case"ERROR":case"UNSET":case"NULL":continue;default:s=s===void 0||dt(i.value,s.value)<0?i:s}return s===void 0?b.Ni():s}},Gn=class{constructor(e){this.expr=e}evaluate(e,t){z(this.expr.params.length===2,31033,`${this.expr.name}() function should have exactly 2 params`);let n=ee(this.expr.params[0]).evaluate(e,t);switch(n.type){case"ERROR":case"UNSET":return b.Oi()}let s=ee(this.expr.params[1]).evaluate(e,t);switch(s.type){case"ERROR":case"UNSET":return b.Oi()}return this.Ki(n,s)}},Oh=class extends Gn{constructor(e){super(e),this.expr=e}Ki(e,t){if(e.Li()&&t.Li())return b.newValue(ft);if(e.Li()||t.Li()||Je(e.value)||Je(t.value)||Pe(e.value)!==Pe(t.value))return b.newValue(Ke);switch(wn(e.value,t.value)){case"EQ":return b.newValue(ft);case"NOT_EQ":return b.newValue(Ke);case"NULL":return b.Ni();default:$(44615,{left:e,right:t})}}},xh=class extends Gn{constructor(e){super(e),this.expr=e}Ki(e,t){switch(wn(e.value,t.value)){case"EQ":return b.newValue(Ke);case"NOT_EQ":case"TYPE_MISMATCH":return b.newValue(ft);case"NULL":return b.Ni();default:$(44614,{left:e,right:t})}}},Fh=class extends Gn{constructor(e){super(e),this.expr=e}Ki(e,t){return Pe(e.value)!==Pe(t.value)||Je(e.value)||Je(t.value)?b.newValue(Ke):b.newValue({booleanValue:dt(e.value,t.value)<0})}},Lh=class extends Gn{constructor(e){super(e),this.expr=e}Ki(e,t){return Pe(e.value)!==Pe(t.value)||Je(e.value)||Je(t.value)?b.newValue(Ke):wn(e.value,t.value)==="EQ"?b.newValue(ft):b.newValue({booleanValue:dt(e.value,t.value)<0})}},kh=class extends Gn{constructor(e){super(e),this.expr=e}Ki(e,t){return Pe(e.value)!==Pe(t.value)||Je(e.value)||Je(t.value)?b.newValue(Ke):b.newValue({booleanValue:dt(e.value,t.value)>0})}},Vh=class extends Gn{constructor(e){super(e),this.expr=e}Ki(e,t){return Pe(e.value)!==Pe(t.value)||Je(e.value)||Je(t.value)?b.newValue(Ke):wn(e.value,t.value)==="EQ"?b.newValue(ft):b.newValue({booleanValue:dt(e.value,t.value)>0})}},Mh=class{constructor(e){this.expr=e}evaluate(e,t){throw new Error("Unimplemented")}},Gh=class{constructor(e){this.expr=e}evaluate(e,t){z(this.expr.params.length===1,216);let n=ee(this.expr.params[0]).evaluate(e,t);switch(n.type){case"NULL":return b.Ni();case"ARRAY":{let s=n.value.arrayValue?.values??[];return b.newValue({arrayValue:{values:[...s].reverse()}})}default:return b.Oi()}}},Uh=class{constructor(e){this.expr=e}evaluate(e,t){return z(this.expr.params.length===2,52884),new qu(new x("eq_any",[this.expr.params[1],this.expr.params[0]])).evaluate(e,t)}},Hh=class{constructor(e){this.expr=e}evaluate(e,t){z(this.expr.params.length===2,1392);let n=!1,s=ee(this.expr.params[0]).evaluate(e,t);switch(s.type){case"ARRAY":break;case"NULL":n=!0;break;default:return b.Oi()}let i=ee(this.expr.params[1]).evaluate(e,t);switch(i.type){case"ARRAY":break;case"NULL":n=!0;break;default:return b.Oi()}if(n)return b.Ni();let a=i.value?.arrayValue?.values??[],u=s.value?.arrayValue?.values??[];for(let c of a){let l=!1;n=!1;for(let h of u){switch(_t(c)&&_t(h)?"EQ":wn(c,h)){case"EQ":l=!0;break;case"NOT_EQ":case"TYPE_MISMATCH":break;case"NULL":n=!0;break;default:$(44613,{value:h,search:c})}if(l)break}if(!l)return b.newValue(Ke)}return b.newValue(ft)}},qh=class{constructor(e){this.expr=e}evaluate(e,t){z(this.expr.params.length===2,2680);let n=!1,s=ee(this.expr.params[0]).evaluate(e,t);switch(s.type){case"ARRAY":break;case"NULL":n=!0;break;default:return b.Oi()}let i=ee(this.expr.params[1]).evaluate(e,t);switch(i.type){case"ARRAY":break;case"NULL":n=!0;break;default:return b.Oi()}if(n)return b.Ni();let a=i.value?.arrayValue?.values??[],u=s.value?.arrayValue?.values??[];for(let c of u)for(let l of a)switch(_t(c)&&_t(l)?"EQ":wn(c,l)){case"EQ":return b.newValue(ft);case"NOT_EQ":case"TYPE_MISMATCH":break;case"NULL":n=!0;break;default:$(60403,{value:c,search:l})}return n?b.Ni():b.newValue(Ke)}},jh=class{constructor(e){this.expr=e}evaluate(e,t){z(this.expr.params.length===1,38605);let n=ee(this.expr.params[0]).evaluate(e,t);switch(n.type){case"NULL":return b.Ni();case"ARRAY":return b.newValue({integerValue:`${n.value?.arrayValue?.values?.length??0}`});default:return b.Oi()}}},Kh=class{constructor(e){this.expr=e}evaluate(e,t){throw new Error("Unimplemented")}},Jh=class{constructor(e){this.expr=e}evaluate(e,t){z(this.expr.params.length===1,1508);let n=ee(this.expr.params[0]).evaluate(e,t);switch(n.type){case"NULL":return b.Ni();case"BYTES":{let s=n.value?.bytesValue;if(typeof s=="string"){let i=Ee.fromBase64String(s).toUint8Array();return i.reverse(),b.newValue({bytesValue:Ee.fromUint8Array(i).toBase64()})}return b.newValue({bytesValue:new Uint8Array(s).reverse()})}case"STRING":{let s=n.value?.stringValue,i=new Intl.__PRIVATE_Segmenter(void 0,{granularity:"grapheme"}).segment(s),a=Array.from(i,(u=>u.segment)).reverse();return b.newValue({stringValue:a.join("")})}default:return b.Oi()}}},zh=class{constructor(e){this.expr=e}evaluate(e,t){throw new Error("Unimplemented")}},Wh=class{constructor(e){this.expr=e}evaluate(e,t){throw new Error("Unimplemented")}},Qh=class{constructor(e){this.expr=e}evaluate(e,t){z(this.expr.params.length===1,19400);let n=ee(this.expr.params[0]).evaluate(e,t);switch(n.type){case"NULL":return b.Ni();case"STRING":{let s=(function(a){let u=0;for(let c=0;c<a.length;c++){let l=a.codePointAt(c);if(l===void 0)return;if(l<=65535)if(l>=55296&&l<=57343)if(l<=56319){let h=a.codePointAt(c+1);h!==void 0&&h>=56320&&h<=57343?(u+=1,c++):u+=1}else u+=1;else u+=1;else{if(!(l<=1114111))return;u+=1,c++}}return u})(n.value.stringValue);return s===void 0?b.Oi():b.newValue({integerValue:s})}default:return b.Oi()}}},$h=class{constructor(e){this.expr=e}evaluate(e,t){z(this.expr.params.length===1,8486);let n=ee(this.expr.params[0]).evaluate(e,t);switch(n.type){case"BYTES":{let s=n.value?.bytesValue;return typeof s=="string"?b.newValue({integerValue:Ee.fromBase64String(s).toUint8Array().length}):b.newValue({integerValue:new Uint8Array(s).length})}case"STRING":{let s=(function(a){let u=0;for(let c=0;c<a.length;c++){let l=a.codePointAt(c);if(l===void 0)return;if(l>=55296&&l<=57343){if(!(l<=56319))return;{let h=a.codePointAt(c+1);if(h===void 0||!(h>=56320&&h<=57343))return;u+=4,c++}}else if(l<=127)u+=1;else if(l<=2047)u+=2;else if(l<=65535)u+=3;else{if(!(l<=1114111))return;u+=4,c++}}return u})(n.value?.stringValue);return s===void 0?b.Oi():b.newValue({integerValue:s})}case"NULL":return b.Ni();default:return b.Oi()}}},Un=class{constructor(e){this.expr=e}evaluate(e,t){z(this.expr.params.length===2,39773,`${this.expr.name}() function should have exactly two parameters`);let n=!1,s=ee(this.expr.params[0]).evaluate(e,t);switch(s.type){case"STRING":break;case"NULL":n=!0;break;default:return b.Oi()}let i=ee(this.expr.params[1]).evaluate(e,t);switch(i.type){case"STRING":break;case"NULL":n=!0;break;default:return b.Oi()}return n?b.Ni():this.Wi(s.value?.stringValue,i.value?.stringValue)}},Yh=class extends Un{Wi(e,t){try{let n=(function(a){let u="";for(let c=0;c<a.length;c++){let l=a.charAt(c);switch(l){case"_":u+=".";break;case"%":u+=".*";break;case"\\":case".":case"*":case"?":case"+":case"^":case"$":case"|":case"(":case")":case"[":case"]":case"{":case"}":u+="\\"+l;break;default:u+=l}}return"^"+u+"$"})(t),s=eu.compile(n);return b.newValue({booleanValue:s.matches(e)})}catch(n){return Pt(`Invalid LIKE pattern converted to regex: ${t}, returning error. Error: ${n}`),b.Oi()}}},Xh=class extends Un{Wi(e,t){try{let n=eu.compile(t);return b.newValue({booleanValue:n.test(e)})}catch{return Pt(`Invalid regex pattern found in regex_contains: ${t}, returning error`),b.Oi()}}},Zh=class extends Un{Wi(e,t){try{return b.newValue({booleanValue:eu.compile(t).matches(e)})}catch{return Pt(`Invalid regex pattern found in regex_match: ${t}, returning error`),b.Oi()}}},ef=class extends Un{Wi(e,t){return b.newValue({booleanValue:e.includes(t)})}},tf=class extends Un{Wi(e,t){return b.newValue({booleanValue:e.startsWith(t)})}},nf=class extends Un{Wi(e,t){return b.newValue({booleanValue:e.endsWith(t)})}},rf=class{constructor(e){this.expr=e}evaluate(e,t){z(this.expr.params.length===1,29079);let n=ee(this.expr.params[0]).evaluate(e,t);switch(n.type){case"STRING":return b.newValue({stringValue:n.value?.stringValue?.toLowerCase()});case"NULL":return b.Ni();default:return b.Oi()}}},sf=class{constructor(e){this.expr=e}evaluate(e,t){z(this.expr.params.length===1,60487);let n=ee(this.expr.params[0]).evaluate(e,t);switch(n.type){case"STRING":return b.newValue({stringValue:n.value?.stringValue?.toUpperCase()});case"NULL":return b.Ni();default:return b.Oi()}}},af=class{constructor(e){this.expr=e}evaluate(e,t){z(this.expr.params.length===1,28544);let n=ee(this.expr.params[0]).evaluate(e,t);switch(n.type){case"STRING":return b.newValue({stringValue:n.value?.stringValue?.trim()});case"NULL":return b.Ni();default:return b.Oi()}}},of=class{constructor(e){this.expr=e}evaluate(e,t){let n=this.expr.params.map((a=>ee(a).evaluate(e,t))),s="",i=!1;for(let a of n)switch(a.type){case"STRING":s+=a.value.stringValue;break;case"NULL":i=!0;break;default:return b.Oi()}return i?b.Ni():b.newValue({stringValue:s})}},uf=class{constructor(e){this.expr=e}evaluate(e,t){z(this.expr.params.length===2,4483);let n=ee(this.expr.params[0]).evaluate(e,t);switch(n.type){case"UNSET":return b.Mi();case"MAP":break;default:return b.Oi()}let s=ee(this.expr.params[1]).evaluate(e,t);if(s.type!=="STRING")return b.Oi();let i=n.value?.mapValue?.fields?.[s.value?.stringValue];return i===void 0?b.Mi():b.newValue(i)}},ma=class{constructor(e){this.expr=e}evaluate(e,t){z(this.expr.params.length===2,25231,`${this.expr.name}() function should have exactly 2 params`);let n=!1,s=ee(this.expr.params[0]).evaluate(e,t);switch(s.type){case"VECTOR":break;case"NULL":n=!0;break;default:return b.Oi()}let i=ee(this.expr.params[1]).evaluate(e,t);switch(i.type){case"VECTOR":break;case"NULL":n=!0;break;default:return b.Oi()}if(n)return b.Ni();let a=EB(s.value),u=EB(i.value);if(a===void 0||u===void 0||a.values?.length!==u.values?.length)return b.Oi();let c=this.Gi(a,u);return c===void 0||isNaN(c)?b.Oi():b.newValue({doubleValue:c})}},cf=class extends ma{Gi(e,t){let n=e?.values??[],s=t?.values??[];if(n.length===0)return;let i=0,a=0,u=0;for(let l=0;l<n.length;l++){if(!_n(n[l])||!_n(s[l]))return;let h=We(n[l]),d=We(s[l]);i+=h*d,a+=h*h,u+=d*d}let c=Math.sqrt(a)*Math.sqrt(u);if(c!==0)return 1-Math.max(-1,Math.min(1,i/c))}},lf=class extends ma{Gi(e,t){let n=e?.values??[],s=t?.values??[];if(n.length===0)return 0;let i=0;for(let a=0;a<n.length;a++){if(!_n(n[a])||!_n(s[a]))return;i+=We(n[a])*We(s[a])}return i}},Bf=class extends ma{Gi(e,t){let n=e?.values??[],s=t?.values??[];if(n.length===0)return 0;let i=0;for(let a=0;a<n.length;a++){if(!_n(n[a])||!_n(s[a]))return;let u=We(n[a]),c=We(s[a]);i+=Math.pow(u-c,2)}return Math.sqrt(i)}},hf=class{constructor(e){this.expr=e}evaluate(e,t){z(this.expr.params.length===1,39044);let n=ee(this.expr.params[0]).evaluate(e,t);switch(n.type){case"VECTOR":{let s=EB(n.value);return b.newValue({integerValue:s?.values?.length??0})}case"NULL":return b.Ni();default:return b.Oi()}}},Ea=BigInt(-62135596800),_a=BigInt(253402300799),ju=BigInt(1e3),Ln=BigInt(1e6),g0=Ea*ju,m0=_a*ju+BigInt(999),E0=Ea*Ln,_0=_a*Ln+BigInt(999999);function wd(r){return r>=E0&&r<=_0}function $E(r){return r>=Ea&&r<=_a}function ya(r,e){let t=BigInt(r);return!(t<Ea||t>_a)&&!(e<0||e>=1e9)&&(t!==Ea||e===0)&&!(t===_a&&e>999999999)}function YE(r,e){return e<0?{seconds:r-1,nanos:e+1e9}:{seconds:r,nanos:e}}function Dd(r){return BigInt(r.seconds)*Ln+BigInt(Math.trunc(r.nanoseconds/1e3))}var wa=class{constructor(e){this.expr=e}evaluate(e,t){z(this.expr.params.length===1,49262,`${this.expr.name}() function should have exactly one parameter`);let n=ee(this.expr.params[0]).evaluate(e,t);switch(n.type){case"INT":return this.toTimestamp(BigInt(n.value.integerValue));case"NULL":return b.Ni();default:return b.Oi()}}},ff=class extends wa{toTimestamp(e){if(!wd(e))return b.Oi();let t=Number(e/Ln),n=Number(e%Ln*BigInt(1e3)),s=YE(t,n);return t=s.seconds,n=s.nanos,ya(t,n)?b.newValue({timestampValue:{seconds:t,nanos:n}}):b.Oi()}},df=class extends wa{toTimestamp(e){if(!(function(a){return a>=g0&&a<=m0})(e))return b.Oi();let t=Number(e/ju),n=Number(e%ju*BigInt(1e6)),s=YE(t,n);return t=s.seconds,n=s.nanos,ya(t,n)?b.newValue({timestampValue:{seconds:t,nanos:n}}):b.Oi()}},pf=class extends wa{toTimestamp(e){if(!$E(e))return b.Oi();let t=Number(e);return b.newValue({timestampValue:{seconds:t,nanos:0}})}},Da=class{constructor(e){this.expr=e}evaluate(e,t){z(this.expr.params.length===1,1265,`${this.expr.name}() function should have exactly one parameter`);let n=ee(this.expr.params[0]).evaluate(e,t);switch(n.type){case"TIMESTAMP":break;case"NULL":return b.Ni();default:return b.Oi()}let s=dd(n.value.timestampValue);return ya(s.seconds,s.nanoseconds)?this.ji(s):b.Oi()}},Cf=class extends Da{ji(e){let t=Dd(e);return wd(t)?b.newValue({integerValue:`${t.toString()}`}):b.Oi()}},gf=class extends Da{ji(e){let t=Dd(e),n=t/BigInt(1e3),s=t%BigInt(1e3);return n>BigInt(0)||s===BigInt(0)?b.newValue({integerValue:n.toString()}):b.newValue({integerValue:(n-BigInt(1)).toString()})}},mf=class extends Da{ji(e){let t=BigInt(e.seconds);return $E(t)?b.newValue({integerValue:t.toString()}):b.Oi()}},Ku=class{constructor(e){this.expr=e}evaluate(e,t){z(this.expr.params.length===3,2775,`${this.expr.name}() function should have exactly 3 parameters`);let n=!1,s=ee(this.expr.params[0]).evaluate(e,t);switch(s.type){case"TIMESTAMP":break;case"NULL":n=!0;break;default:return b.Oi()}let i=ee(this.expr.params[1]).evaluate(e,t),a;switch(i.type){case"STRING":if(a=(function(W){switch(W){case"microsecond":return"microsecond";case"millisecond":return"millisecond";case"second":return"second";case"minute":return"minute";case"hour":return"hour";case"day":return"day";default:return}})(i.value.stringValue),a===void 0)return b.Oi();break;case"NULL":n=!0;break;default:return b.Oi()}let u=ee(this.expr.params[2]).evaluate(e,t);switch(u.type){case"INT":break;case"NULL":n=!0;break;default:return b.Oi()}if(n)return b.Ni();let c=BigInt(u.value.integerValue),l;try{switch(a){case"microsecond":l=c;break;case"millisecond":l=c*BigInt(1e3);break;case"second":l=c*BigInt(1e6);break;case"minute":l=c*BigInt(6e7);break;case"hour":l=c*BigInt(36e8);break;case"day":l=c*BigInt(864e8);break;default:return b.Oi()}if(a!=="microsecond"&&c!==BigInt(0)&&l/c!==BigInt(this.zi(a)))return b.Oi()}catch(q){return Pt(`Error during timestamp arithmetic: ${q}`),b.Oi()}let h=dd(s.value.timestampValue);if(!ya(h.seconds,h.nanoseconds))return b.Oi();let d=Dd(h),C=this.Hi(d,l);if(!wd(C))return b.Oi();let y=Number(C/Ln),D=C%Ln,P=Number((D<0?D+Ln:D)*BigInt(1e3)),V=D<0?y-1:y;return ya(V,P)?b.newValue({timestampValue:{seconds:V,nanos:P}}):b.Oi()}zi(e){switch(e){case"millisecond":return 1e3;case"second":return 1e6;case"minute":return 6e7;case"hour":return 36e8;case"day":return 864e8;default:return 1}}},Ef=class extends Ku{Hi(e,t){return e+t}},_f=class extends Ku{Hi(e,t){return e-t}};/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ia(r){if((r=QE(r))instanceof Vr)return`fld(${r.fieldName})`;if(r instanceof Ms)return`cst(${(function(t){return t===null?"null":typeof t=="number"?t.toString():typeof t=="string"?`"${t}"`:t instanceof Se?`ref(${t.path})`:t instanceof Dt?`vec(${JSON.stringify(t)})`:JSON.stringify(t)})(r.value)})`;if(r instanceof x)return`fn(${r.name},[${r.params.map(Ia).join(",")}])`;if(r.expressionType==="ListOfExpressions")return`list([${r.di.map(Ia).join(",")}])`;throw new Error(`Unrecognized expr ${JSON.stringify(r,null,2)}`)}function y0(r){if(r instanceof Mu)return`${r._name}(${iu(r.fields)})`;if(r instanceof Gu){let e=`${r._name}(${iu(r.accumulators)})`;return r.groups.size>0&&(e+=`grouping(${iu(r.groups)})`),e}if(r instanceof Uu)return`${r._name}(${iu(r.groups)})`;if(r instanceof Gs)return`${r._name}(${r.pi})`;if(r instanceof Us)return`${r._name}(${r.collectionId})`;if(r instanceof da)return`${r._name}()`;if(r instanceof pa)return`${r._name}(${r.gi.sort()})`;if(r instanceof Ca)return`${r._name}(${Ia(r.condition)})`;if(r instanceof Mr)return`${r._name}(${r.limit})`;if(r instanceof ga)return`${r._name}(${(function(t){return t.map((n=>`${Ia(n.expr)}${n.direction}`)).join(",")})(r.orderings)})`;throw new Error(`Unrecognized stage ${r._name}`)}function iu(r){return`${Array.from(r.entries()).sort().map((([e,t])=>`${e}=${Ia(t)}`)).join(",")}`}function pn(r){return r.stages.map((e=>y0(e))).join("|")}function XE(r,e){return pn(r)===pn(e)}function xe(r){return r instanceof et}function Nm(r){return xe(r)?pn(r):zi(r)}function ZE(r){return xe(r)?pn(r):(function(t){return`${mE(Yt(t))}|lt:${t.limitType}`})(r)}function Cc(r,e){return r instanceof et&&e instanceof et?XE(r,e):!(r instanceof et&&!(e instanceof et)||!(r instanceof et)&&e instanceof et)&&wT(r,e)}function e_(r){return fr(r)?pn(r):mE(r)}function t_(r,e){return r instanceof et&&e instanceof et?XE(r,e):!(r instanceof et&&!(e instanceof et)||!(r instanceof et)&&e instanceof et)&&EE(r,e)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var yf=class{constructor(e,t,n,s){this.batchId=e,this.localWriteTime=t,this.baseMutations=n,this.mutations=s}applyToRemoteDocument(e,t){let n=t.mutationResults;for(let s=0;s<this.mutations.length;s++){let i=this.mutations[s];i.key.isEqual(e.key)&&hT(i,e,n[s])}}applyToLocalView(e,t){for(let n of this.baseMutations)n.key.isEqual(e.key)&&(t=Ji(n,e,t,this.localWriteTime));for(let n of this.mutations)n.key.isEqual(e.key)&&(t=Ji(n,e,t,this.localWriteTime));return t}applyToLocalDocumentSet(e,t){let n=AE();return this.mutations.forEach((s=>{let i=e.get(s.key),a=i.overlayedDocument,u=this.applyToLocalView(a,i.mutatedFields);u=t.has(s.key)?null:u;let c=BE(a,u);c!==null&&n.set(s.key,c),a.isValidDocument()||a.convertToNoDocument(te.min())})),n}keys(){return this.mutations.reduce(((e,t)=>e.add(t.key)),oe())}isEqual(e){return this.batchId===e.batchId&&ms(this.mutations,e.mutations,((t,n)=>dm(t,n)))&&ms(this.baseMutations,e.baseMutations,((t,n)=>dm(t,n)))}},wf=class r{constructor(e,t,n,s){this.batch=e,this.commitVersion=t,this.mutationResults=n,this.docVersions=s}static from(e,t,n){z(e.mutations.length===n.length,58842,{Ji:e.mutations.length,Yi:n.length});let s=(function(){return TT})(),i=e.mutations;for(let a=0;a<i.length;a++)s=s.insert(i[a].key,n[a].version);return new r(e,t,n,s)}};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var n_="";function w0(r){let e="";for(let t=0;t<r.length;t++)e.length>0&&(e=Om(e)),e=D0(r.get(t),e);return Om(e)}function D0(r,e){let t=e,n=r.length;for(let s=0;s<n;s++){let i=r.charAt(s);switch(i){case"\0":t+="";break;case n_:t+="";break;default:t+=i}}return t}function Om(r){return r+n_+""}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var I0="remoteDocuments",r_="owner";var s_="mutationQueues";var i_="mutations";/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var a_="documentMutations",T0="remoteDocumentsV14";var o_="remoteDocumentGlobal";var u_="targets";var c_="targetDocuments";var l_="targetGlobal",B_="collectionParents";var h_="clientMetadata";var f_="bundles";var d_="namedQueries";var A0="indexConfiguration";var b0="indexState";var v0="indexEntries";var p_="documentOverlays";var R0="globals";var S0=[s_,i_,a_,I0,u_,r_,l_,c_,h_,o_,B_,f_,d_],ER=[...S0,p_],P0=[s_,i_,a_,T0,u_,r_,l_,c_,h_,o_,B_,f_,d_,p_],N0=P0,O0=[...N0,A0,b0,v0];var _R=[...O0,R0];/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var Df=class{constructor(e,t){this.largestBatchId=e,this.mutation=t}getKey(){return this.mutation.key}isEqual(e){return e!==null&&this.mutation===e.mutation}toString(){return`Overlay{
      largestBatchId: ${this.largestBatchId},
      mutation: ${this.mutation.toString()}
    }`}};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var qs=class r{constructor(e,t,n,s,i=te.min(),a=te.min(),u=Ee.EMPTY_BYTE_STRING,c=null){this.target=e,this.targetId=t,this.purpose=n,this.sequenceNumber=s,this.snapshotVersion=i,this.lastLimboFreeSnapshotVersion=a,this.resumeToken=u,this.expectedCount=c}withSequenceNumber(e){return new r(this.target,this.targetId,this.purpose,e,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,this.expectedCount)}withResumeToken(e,t){return new r(this.target,this.targetId,this.purpose,this.sequenceNumber,t,this.lastLimboFreeSnapshotVersion,e,null)}withExpectedCount(e){return new r(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,e)}withLastLimboFreeSnapshotVersion(e){return new r(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,e,this.resumeToken,this.expectedCount)}};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var If=class{constructor(e){this.Xi=e}};function x0(r){let e=UT({parent:r.parent,structuredQuery:r.structuredQuery});return r.limitType==="LAST"?mu(e,e.limit,"L"):e}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var Ju=class{constructor(){}Ts(e,t){this.Ps(e,t),t.Is()}Ps(e,t){if("nullValue"in e)this.Rs(t,5);else if("booleanValue"in e)this.Rs(t,10),t.As(e.booleanValue?1:0);else if("integerValue"in e)this.Rs(t,15),t.As(ge(e.integerValue));else if("doubleValue"in e){let n=ge(e.doubleValue);this.Vs(n,t)}else if("timestampValue"in e)this.ds(e.timestampValue,t);else if("stringValue"in e)this.fs(e.stringValue,t),this.ps(t);else if("bytesValue"in e)this.Rs(t,30),t.gs(Lt(e.bytesValue)),this.ps(t);else if("referenceValue"in e)this.ys(e.referenceValue,t);else if("geoPointValue"in e)this.ws(e.geoPointValue,t);else if("mapValue"in e){let n=Bd(e);if(n===ue.fe)this.Rs(t,Number.MAX_SAFE_INTEGER);else if(n===ue.me)this.bs(e.mapValue,t);else if(n===ue.de)this.Rs(t,999);else if(n===ue.Ve)this.Rs(t,7);else if(n===ue.Ae){let s=e.mapValue?.fields,i=s?.[Is],a=i?.bytesValue,u=Lt(a).toUint8Array();if(u[0]===0){let c=u.slice(1);this.Rs(t,30),t.gs(Ee.fromUint8Array(c)),this.ps(t)}else this.Ss(e.mapValue,t)}else if(n===ue.he)this.xs(e.mapValue,t);else if(n===ue.Re)this.vs(e.mapValue,t);else if(n===ue.Te)this.Ds(e.mapValue,t);else if(n===ue.Pe)this.Cs(e.mapValue,t);else if(n===ue.Ie){let s=parseFloat(e.mapValue.fields[En].stringValue);this.Vs(s,t)}else this.Fs(e.mapValue,t),this.ps(t)}else"arrayValue"in e?(this.Os(e.arrayValue,t),this.ps(t)):$(19022,{Ms:e})}fs(e,t){this.Rs(t,25),this.Ns(e,t)}Ns(e,t){t.Bs(e)}Vs(e,t){isNaN(e)?this.Rs(t,13):(this.Rs(t,15),ys(e)?t.As(0):t.As(e))}Cs(e,t){this.Rs(t,15),t.As(ge(e.fields[Kn].integerValue))}ds(e,t){this.Rs(t,20),typeof e=="string"&&(e=mn(e)),t.Bs(`${e.seconds||""}`),t.As(e.nanos||0)}ws(e,t){this.Rs(t,45),t.As(e.latitude||0),t.As(e.longitude||0)}Fs(e,t){let n=e.fields||{};this.Rs(t,55);for(let s of Object.keys(n))this.fs(s,t),this.Ps(n[s],t)}bs(e,t){let n=e.fields||{};this.Rs(t,53);let s=yr,i=n[s].arrayValue?.values?.length||0;this.Rs(t,15),t.As(ge(i)),this.fs(s,t),this.Ps(n[s],t)}Os(e,t){let n=e.values||[];this.Rs(t,50);for(let s of n)this.Ps(s,t)}ys(e,t){this.Rs(t,37);let n=e.split("/").filter((s=>s.length>0));X.fromSegments(n.slice(5)).path.forEach((s=>{this.Rs(t,60),this.Ns(s,t)}))}Rs(e,t){e.As(t)}ps(e){e.As(2)}vs(e,t){this.Rs(t,22);let n=e.fields||{};n&&this.Fs(n[Bn].mapValue,t)}Ds(e,t){this.Rs(t,43);let n=e.fields||{},s=n[wr]?.stringValue||"";t.gs(Lt(s))}Ss(e,t){this.Rs(t,31);let n=e.fields||{},s=n[Is]?.bytesValue||"";t.gs(Lt(s)),this.ps(t)}xs(e,t){this.Rs(t,47);let n=e.fields||{},s=n[zt]?.mapValue?.fields||{};s&&(t.Bs(s[ws]?.stringValue||""),t.Bs(s[Ds]?.stringValue||"")),this.ps(t)}};Ju.Ls=new Ju;/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law | agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES | CONDITIONS OF ANY KIND, either express | implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var Tf=class{constructor(){this.d_=new Af}addToCollectionParentIndex(e,t){return this.d_.add(t),M.resolve()}getCollectionParents(e,t){return M.resolve(this.d_.getEntries(t))}addFieldIndex(e,t){return M.resolve()}deleteFieldIndex(e,t){return M.resolve()}deleteAllFieldIndexes(e){return M.resolve()}createTargetIndexes(e,t){return M.resolve()}getDocumentsMatchingTarget(e,t){return M.resolve(null)}getIndexType(e,t){return M.resolve(0)}getFieldIndexes(e,t){return M.resolve([])}getNextCollectionGroupToUpdate(e){return M.resolve(null)}getMinOffset(e,t){return M.resolve(Pr.min())}getMinOffsetFromCollectionGroup(e,t){return M.resolve(Pr.min())}updateCollectionGroup(e,t,n){return M.resolve()}updateIndexEntries(e,t){return M.resolve()}},Af=class{constructor(){this.index={}}add(e){let t=e.lastSegment(),n=e.popLast(),s=this.index[t]||new Fe(he.comparator),i=!s.has(n);return this.index[t]=s.add(n),i}has(e){let t=e.lastSegment(),n=e.popLast(),s=this.index[t];return s&&s.has(n)}getEntries(e){return(this.index[e]||new Fe(he.comparator)).toArray()}};/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var yR=new Uint8Array(0);/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var Ur=class r{constructor(e){this.K_=e}next(){return this.K_+=2,this.K_}static W_(){return new r(0)}static G_(){return new r(-1)}};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */// Copyright 2024 Google LLC* @license
function C_(r,e){let t=e;for(let n of r.stages)t=L0({serializer:r.serializer,serverTimestampBehavior:r.listenOptions?.serverTimestampBehavior},n,t);return t}function gc(r,e){return C_(r,[e]).length>0}function F0(r,e){return xe(r)?gc(r,e):lc(r,e)}function L0(r,e,t){if(e instanceof Gs)return(function(s,i,a){return a.filter((u=>u.isFoundDocument()&&`/${u.key.getCollectionPath().canonicalString()}`===i.pi))})(0,e,t);if(e instanceof Ca)return(function(s,i,a){return a.filter((u=>{let c=Yi(ee(i.condition).evaluate(s,u));return c!==void 0&&Nt(c,ft)}))})(r,e,t);if(e instanceof Us)return(function(s,i,a){return a.filter((u=>u.isFoundDocument()&&u.key.getCollectionPath().lastSegment()===i.collectionId))})(0,e,t);if(e instanceof da)return(function(s,i,a){return a.filter((u=>u.isFoundDocument()))})(0,0,t);if(e instanceof pa)return(function(s,i,a){return a.filter((u=>u.isFoundDocument()&&i.yi.has(u.key.path.toStringWithLeadingSlash())))})(0,e,t);if(e instanceof Mr)return(function(s,i,a){return a.slice(0,i.limit)})(0,e,t);if(e instanceof ga)return(function(s,i,a){let u=i.orderings.map((c=>({eo:ee(c.expr),direction:c.direction})));return[...a].sort(((c,l)=>{for(let{eo:h,direction:d}of u){let C=Yi(h.evaluate(s,c)),y=Yi(h.evaluate(s,l)),D=dt(C??Ts,y??Ts);if(D!==0)return d==="ascending"?D:-D}return 0}))})(r,e,t);throw new Error(`Unknown stage: ${e._name}`)}function bf(r){let e=(function(n){for(let s=n.stages.length-1;s>=0;s--){let i=n.stages[s];if(i instanceof ga)return i.orderings}throw new Error("Pipeline must contain at least one Sort stage")})(r);return(t,n)=>{for(let s of e){let i=Yi(ee(s.expr).evaluate({serializer:r.serializer},t)),a=Yi(ee(s.expr).evaluate({serializer:r.serializer},n)),u=dt(i||Ts,a||Ts);if(u!==0)return s.direction==="ascending"?u:-u}return 0}}function BB(r){for(let e=r.stages.length-1;e>=0;e--){let t=r.stages[e];if(t instanceof Mr)return{limit:t.limit}}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var vf=class{constructor(){this.changes=new yn((e=>e.toString()),((e,t)=>e.isEqual(t))),this.changesApplied=!1}addEntry(e){this.assertNotApplied(),this.changes.set(e.key,e)}removeEntry(e,t){this.assertNotApplied(),this.changes.set(e,It.newInvalidDocument(e).setReadTime(t))}getEntry(e,t){this.assertNotApplied();let n=this.changes.get(t);return n!==void 0?M.resolve(n):this.getFromCache(e,t)}getEntries(e,t){return this.getAllFromCache(e,t)}apply(e){return this.assertNotApplied(),this.changesApplied=!0,this.applyChanges(e)}assertNotApplied(){}};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var Rf=class{constructor(e,t){this.overlayedDocument=e,this.mutatedFields=t}};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var Sf=class{constructor(e,t,n,s){this.remoteDocumentCache=e,this.mutationQueue=t,this.documentOverlayCache=n,this.indexManager=s}getDocument(e,t){let n=null;return this.documentOverlayCache.getOverlay(e,t).next((s=>(n=s,this.remoteDocumentCache.getEntry(e,t)))).next((s=>(n!==null&&Ji(n.mutation,s,St.empty(),ye.now()),s)))}getDocuments(e,t){return this.remoteDocumentCache.getEntries(e,t).next((n=>this.getLocalViewOfDocuments(e,n,oe()).next((()=>n))))}getLocalViewOfDocuments(e,t,n=oe()){let s=xn();return this.populateOverlays(e,s,t).next((()=>this.computeViews(e,t,s,n).next((i=>{let a=cs();return i.forEach(((u,c)=>{a=a.insert(u,c.overlayedDocument)})),a}))))}getOverlayedDocuments(e,t){let n=xn();return this.populateOverlays(e,n,t).next((()=>this.computeViews(e,t,n,oe())))}populateOverlays(e,t,n){let s=[];return n.forEach((i=>{t.has(i)||s.push(i)})),this.documentOverlayCache.getOverlays(e,s).next((i=>{i.forEach(((a,u)=>{t.set(a,u)}))}))}computeViews(e,t,n,s){let i=Bt(),a=Wi(),u=(function(){return Wi()})();return t.forEach(((c,l)=>{let h=n.get(l.key);s.has(l.key)&&(h===void 0||h.mutation instanceof Xt)?i=i.insert(l.key,l):h!==void 0?(a.set(l.key,h.mutation.getFieldMask()),Ji(h.mutation,l,h.mutation.getFieldMask(),ye.now())):a.set(l.key,St.empty())})),this.recalculateAndSaveOverlays(e,i).next((c=>(c.forEach(((l,h)=>a.set(l,h))),t.forEach(((l,h)=>u.set(l,new Rf(h,a.get(l)??null)))),u)))}recalculateAndSaveOverlays(e,t){let n=Wi(),s=new we(((a,u)=>a-u)),i=oe();return this.mutationQueue.getAllMutationBatchesAffectingDocumentKeys(e,t).next((a=>{for(let u of a)u.keys().forEach((c=>{let l=t.get(c);if(l===null)return;let h=n.get(c)||St.empty();h=u.applyToLocalView(l,h),n.set(c,h);let d=(s.get(u.batchId)||oe()).add(c);s=s.insert(u.batchId,d)}))})).next((()=>{let a=[],u=s.getReverseIterator();for(;u.hasNext();){let c=u.getNext(),l=c.key,h=c.value,d=AE();h.forEach((C=>{if(!i.has(C)){let y=BE(t.get(C),n.get(C));y!==null&&d.set(C,y),i=i.add(C)}})),a.push(this.documentOverlayCache.saveOverlays(e,l,d))}return M.waitFor(a)})).next((()=>n))}recalculateAndSaveOverlaysForDocumentKeys(e,t){return this.remoteDocumentCache.getEntries(e,t).next((n=>this.recalculateAndSaveOverlays(e,n)))}getDocumentsMatchingQuery(e,t,n,s){return xe(t)?this.getDocumentsMatchingPipeline(e,t,n,s):_T(t)?this.getDocumentsMatchingDocumentQuery(e,t.path):yE(t)?this.getDocumentsMatchingCollectionGroupQuery(e,t,n,s):this.getDocumentsMatchingCollectionQuery(e,t,n,s)}getNextDocuments(e,t,n,s){return this.remoteDocumentCache.getAllFromCollectionGroup(e,t,n,s).next((i=>{let a=s-i.size>0?this.documentOverlayCache.getOverlaysForCollectionGroup(e,t,n.largestBatchId,s-i.size):M.resolve(xn()),u=aa,c=i;return a.next((l=>M.forEach(l,((h,d)=>(u<d.largestBatchId&&(u=d.largestBatchId),i.get(h)?M.resolve():this.remoteDocumentCache.getEntry(e,h).next((C=>{c=c.insert(h,C)}))))).next((()=>this.populateOverlays(e,l,i))).next((()=>this.computeViews(e,c,l,oe()))).next((h=>({batchId:u,changes:TE(h)})))))}))}getDocumentsMatchingDocumentQuery(e,t){return this.getDocument(e,new X(t)).next((n=>{let s=cs();return n.isFoundDocument()&&(s=s.insert(n.key,n)),s}))}getDocumentsMatchingCollectionGroupQuery(e,t,n,s){let i=t.collectionGroup,a=cs();return this.indexManager.getCollectionParents(e,i).next((u=>M.forEach(u,(c=>{let l=(function(d,C){return new Ns(C,null,d.explicitOrderBy.slice(),d.filters.slice(),d.limit,d.limitType,d.startAt,d.endAt)})(t,c.child(i));return this.getDocumentsMatchingCollectionQuery(e,l,n,s).next((h=>{h.forEach(((d,C)=>{a=a.insert(d,C)}))}))})).next((()=>a))))}getDocumentsMatchingCollectionQuery(e,t,n,s){let i;return this.documentOverlayCache.getOverlaysForCollection(e,t.path,n.largestBatchId).next((a=>(i=a,this.remoteDocumentCache.getDocumentsMatchingQuery(e,t,n,i,s)))).next((a=>this.retrieveMatchingLocalDocuments(i,a,(u=>lc(t,u)))))}getDocumentsMatchingPipeline(e,t,n,s){if(Fn(t)==="collection_group"){let i=yd(t),a=cs();return this.indexManager.getCollectionParents(e,i).next((u=>M.forEach(u,(c=>{let l=(function(d,C){let y=d.stages.map((D=>D instanceof Us?new Gs(C.canonicalString(),{}):D));return new et(d.serializer,y)})(t,c.child(i));return this.getDocumentsMatchingPipeline(e,l,n,s).next((h=>{h.forEach(((d,C)=>{a=a.insert(d,C)}))}))})).next((()=>a))))}{let i;return this.getOverlaysForPipeline(e,t,n.largestBatchId).next((a=>{switch(i=a,Fn(t)){case"collection":return this.remoteDocumentCache.getDocumentsMatchingQuery(e,t,n,i,s);case"documents":let u=oe();for(let c of Bh(t))u=u.add(X.fromPath(c));return this.remoteDocumentCache.getEntries(e,u);case"database":return this.remoteDocumentCache.getAllEntries(e);default:throw new j("invalid-argument",`Invalid pipeline source to execute offline: ${pn(t)}`)}})).next((a=>this.retrieveMatchingLocalDocuments(i,a,(u=>gc(t,u)))))}}retrieveMatchingLocalDocuments(e,t,n){e.forEach(((i,a)=>{let u=a.getKey();t.get(u)===null&&(t=t.insert(u,It.newInvalidDocument(u)))}));let s=cs();return t.forEach(((i,a)=>{let u=e.get(i);u!==void 0&&Ji(u.mutation,a,St.empty(),ye.now()),n(a)&&(s=s.insert(i,a))})),s}getOverlaysForPipeline(e,t,n){switch(Fn(t)){case"collection":return this.documentOverlayCache.getOverlaysForCollection(e,he.fromString(pc(t)),n);case"collection_group":throw new j("invalid-argument",`Unexpected collection group pipeline: ${pn(t)}`);case"documents":return this.documentOverlayCache.getOverlays(e,Bh(t).map((s=>X.fromPath(s))));case"database":return this.documentOverlayCache.getAllOverlays(e,n);default:throw new j("invalid-argument",`Failed to get overlays for pipeline: ${pn(t)}`)}}};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var Pf=class{constructor(e){this.serializer=e,this.co=new Map,this.lo=new Map}getBundleMetadata(e,t){return M.resolve(this.co.get(t))}saveBundleMetadata(e,t){return this.co.set(t.id,(function(s){return{id:s.id,version:s.version,createTime:yt(s.createTime)}})(t)),M.resolve()}getNamedQuery(e,t){return M.resolve(this.lo.get(t))}saveNamedQuery(e,t){return this.lo.set(t.name,(function(s){return{name:s.name,query:x0(s.bundledQuery),readTime:yt(s.readTime)}})(t)),M.resolve()}};/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var Nf=class{constructor(){this.overlays=new we(X.comparator),this.Eo=new Map}getOverlay(e,t){return M.resolve(this.overlays.get(t))}getOverlays(e,t){let n=xn();return M.forEach(t,(s=>this.getOverlay(e,s).next((i=>{i!==null&&n.set(s,i)})))).next((()=>n))}getAllOverlays(e,t){let n=xn();return this.overlays.forEach(((s,i)=>{i.largestBatchId>t&&n.set(s,i)})),M.resolve(n)}saveOverlays(e,t,n){return n.forEach(((s,i)=>{this.Es(e,t,i)})),M.resolve()}removeOverlaysForBatchId(e,t,n){let s=this.Eo.get(n);return s!==void 0&&(s.forEach((i=>this.overlays=this.overlays.remove(i))),this.Eo.delete(n)),M.resolve()}getOverlaysForCollection(e,t,n){let s=xn(),i=t.length+1,a=new X(t.child("")),u=this.overlays.getIteratorFrom(a);for(;u.hasNext();){let c=u.getNext().value,l=c.getKey();if(!t.isPrefixOf(l.path))break;l.path.length===i&&c.largestBatchId>n&&s.set(c.getKey(),c)}return M.resolve(s)}getOverlaysForCollectionGroup(e,t,n,s){let i=new we(((l,h)=>l-h)),a=this.overlays.getIterator();for(;a.hasNext();){let l=a.getNext().value;if(l.getKey().getCollectionGroup()===t&&l.largestBatchId>n){let h=i.get(l.largestBatchId);h===null&&(h=xn(),i=i.insert(l.largestBatchId,h)),h.set(l.getKey(),l)}}let u=xn(),c=i.getIterator();for(;c.hasNext()&&(c.getNext().value.forEach(((l,h)=>u.set(l,h))),!(u.size()>=s)););return M.resolve(u)}Es(e,t,n){let s=this.overlays.get(n.key);if(s!==null){let a=this.Eo.get(s.largestBatchId).delete(n.key);this.Eo.set(s.largestBatchId,a)}this.overlays=this.overlays.insert(n.key,new Df(t,n));let i=this.Eo.get(t);i===void 0&&(i=oe(),this.Eo.set(t,i)),this.Eo.set(t,i.add(n.key))}};/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var Of=class{constructor(){this.sessionToken=Ee.EMPTY_BYTE_STRING}getSessionToken(e){return M.resolve(this.sessionToken)}setSessionToken(e,t){return this.sessionToken=t,M.resolve()}};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var Ta=class{constructor(){this.ho=new Fe(ve.To),this.Po=new Fe(ve.Io)}isEmpty(){return this.ho.isEmpty()}addReference(e,t){let n=new ve(e,t);this.ho=this.ho.add(n),this.Po=this.Po.add(n)}Ro(e,t){e.forEach((n=>this.addReference(n,t)))}removeReference(e,t){this.Ao(new ve(e,t))}Vo(e,t){e.forEach((n=>this.removeReference(n,t)))}fo(e){let t=new X(new he([])),n=new ve(t,e),s=new ve(t,e+1),i=[];return this.Po.forEachInRange([n,s],(a=>{this.Ao(a),i.push(a.key)})),i}mo(){this.ho.forEach((e=>this.Ao(e)))}Ao(e){this.ho=this.ho.delete(e),this.Po=this.Po.delete(e)}po(e){let t=new X(new he([])),n=new ve(t,e),s=new ve(t,e+1),i=oe();return this.Po.forEachInRange([n,s],(a=>{i=i.add(a.key)})),i}containsKey(e){let t=new ve(e,0),n=this.ho.firstAfterOrEqual(t);return n!==null&&e.isEqual(n.key)}},ve=class{constructor(e,t){this.key=e,this.yo=t}static To(e,t){return X.comparator(e.key,t.key)||ie(e.yo,t.yo)}static Io(e,t){return ie(e.yo,t.yo)||X.comparator(e.key,t.key)}};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var xf=class{constructor(e,t){this.indexManager=e,this.referenceDelegate=t,this.mutationQueue=[],this.rs=1,this.wo=new Fe(ve.To)}checkEmpty(e){return M.resolve(this.mutationQueue.length===0)}addMutationBatch(e,t,n,s){let i=this.rs;this.rs++,this.mutationQueue.length>0&&this.mutationQueue[this.mutationQueue.length-1];let a=new yf(i,t,n,s);this.mutationQueue.push(a);for(let u of s)this.wo=this.wo.add(new ve(u.key,i)),this.indexManager.addToCollectionParentIndex(e,u.key.path.popLast());return M.resolve(a)}lookupMutationBatch(e,t){return M.resolve(this.bo(t))}getNextMutationBatchAfterBatchId(e,t){let n=t+1,s=this.So(n),i=s<0?0:s;return M.resolve(this.mutationQueue.length>i?this.mutationQueue[i]:null)}getHighestUnacknowledgedBatchId(){return M.resolve(this.mutationQueue.length===0?cd:this.rs-1)}getAllMutationBatches(e){return M.resolve(this.mutationQueue.slice())}getAllMutationBatchesAffectingDocumentKey(e,t){let n=new ve(t,0),s=new ve(t,Number.POSITIVE_INFINITY),i=[];return this.wo.forEachInRange([n,s],(a=>{let u=this.bo(a.yo);i.push(u)})),M.resolve(i)}getAllMutationBatchesAffectingDocumentKeys(e,t){let n=new Fe(ie);return t.forEach((s=>{let i=new ve(s,0),a=new ve(s,Number.POSITIVE_INFINITY);this.wo.forEachInRange([i,a],(u=>{n=n.add(u.yo)}))})),M.resolve(this.xo(n))}getAllMutationBatchesAffectingQuery(e,t){let n=t.path,s=n.length+1,i=n;X.isDocumentKey(i)||(i=i.child(""));let a=new ve(new X(i),0),u=new Fe(ie);return this.wo.forEachWhile((c=>{let l=c.key.path;return!!n.isPrefixOf(l)&&(l.length===s&&(u=u.add(c.yo)),!0)}),a),M.resolve(this.xo(u))}xo(e){let t=[];return e.forEach((n=>{let s=this.bo(n);s!==null&&t.push(s)})),t}removeMutationBatch(e,t){z(this.vo(t.batchId,"removed")===0,55003),this.mutationQueue.shift();let n=this.wo;return M.forEach(t.mutations,(s=>{let i=new ve(s.key,t.batchId);return n=n.delete(i),this.referenceDelegate.markPotentiallyOrphaned(e,s.key)})).next((()=>{this.wo=n}))}us(e){}containsKey(e,t){let n=new ve(t,0),s=this.wo.firstAfterOrEqual(n);return M.resolve(t.isEqual(s&&s.key))}performConsistencyCheck(e){return this.mutationQueue.length,M.resolve()}vo(e,t){return this.So(e)}So(e){return this.mutationQueue.length===0?0:e-this.mutationQueue[0].batchId}bo(e){let t=this.So(e);return t<0||t>=this.mutationQueue.length?null:this.mutationQueue[t]}};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var Ff=class{constructor(e){this.Do=e,this.docs=(function(){return new we(X.comparator)})(),this.size=0}setIndexManager(e){this.indexManager=e}addEntry(e,t){let n=t.key,s=this.docs.get(n),i=s?s.size:0,a=this.Do(t);return this.docs=this.docs.insert(n,{document:t.mutableCopy(),size:a}),this.size+=a-i,this.indexManager.addToCollectionParentIndex(e,n.path.popLast())}removeEntry(e){let t=this.docs.get(e);t&&(this.docs=this.docs.remove(e),this.size-=t.size)}getEntry(e,t){let n=this.docs.get(t);return M.resolve(n?n.document.mutableCopy():It.newInvalidDocument(t))}getEntries(e,t){let n=Bt();return t.forEach((s=>{let i=this.docs.get(s);n=n.insert(s,i?i.document.mutableCopy():It.newInvalidDocument(s))})),M.resolve(n)}getAllEntries(e){let t=Bt();return this.docs.forEach(((n,s)=>{t=t.insert(n,s.document)})),M.resolve(t)}getDocumentsMatchingQuery(e,t,n,s){let i,a;xe(t)?(i=he.fromString(pc(t)),a=h=>gc(t,h)):(i=t.path,a=h=>lc(t,h));let u=Bt(),c=new X(i.child("__id-9223372036854775808__")),l=this.docs.getIteratorFrom(c);for(;l.hasNext();){let{key:h,value:{document:d}}=l.getNext();if(!i.isPrefixOf(h.path))break;h.path.length>i.length+1||mT(gT(d),n)<=0||(s.has(d.key)||a(d))&&(u=u.insert(d.key,d.mutableCopy()))}return M.resolve(u)}getAllFromCollectionGroup(e,t,n,s){$(9500)}Co(e,t){return M.forEach(this.docs,(n=>t(n)))}newChangeBuffer(e){return new Lf(this)}getSize(e){return M.resolve(this.size)}},Lf=class extends vf{constructor(e){super(),this.ao=e}applyChanges(e){let t=[];return this.changes.forEach(((n,s)=>{s.isValidDocument()?t.push(this.ao.addEntry(e,s)):this.ao.removeEntry(n)})),M.waitFor(t)}getFromCache(e,t){return this.ao.getEntry(e,t)}getAllFromCache(e,t){return this.ao.getEntries(e,t)}};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var kf=class{constructor(e){this.persistence=e,this.Fo=new yn((t=>e_(t)),t_),this.lastRemoteSnapshotVersion=te.min(),this.highestTargetId=0,this.Oo=0,this.Mo=new Ta,this.targetCount=0,this.No=Ur.W_()}forEachTarget(e,t){return this.Fo.forEach(((n,s)=>t(s))),M.resolve()}getLastRemoteSnapshotVersion(e){return M.resolve(this.lastRemoteSnapshotVersion)}getHighestSequenceNumber(e){return M.resolve(this.Oo)}allocateTargetId(e){return this.highestTargetId=this.No.next(),M.resolve(this.highestTargetId)}setTargetsMetadata(e,t,n){return n&&(this.lastRemoteSnapshotVersion=n),t>this.Oo&&(this.Oo=t),M.resolve()}H_(e){this.Fo.set(e.target,e);let t=e.targetId;t>this.highestTargetId&&(this.No=new Ur(t),this.highestTargetId=t),e.sequenceNumber>this.Oo&&(this.Oo=e.sequenceNumber)}addTargetData(e,t){return this.H_(t),this.targetCount+=1,M.resolve()}updateTargetData(e,t){return this.H_(t),M.resolve()}removeTargetData(e,t){return this.Fo.delete(t.target),this.Mo.fo(t.targetId),this.targetCount-=1,M.resolve()}removeTargets(e,t,n){let s=0,i=[];return this.Fo.forEach(((a,u)=>{u.sequenceNumber<=t&&n.get(u.targetId)===null&&(this.Fo.delete(a),i.push(this.removeMatchingKeysForTargetId(e,u.targetId)),s++)})),M.waitFor(i).next((()=>s))}getTargetCount(e){return M.resolve(this.targetCount)}getTargetData(e,t){let n=this.Fo.get(t)||null;return M.resolve(n)}addMatchingKeys(e,t,n){return this.Mo.Ro(t,n),M.resolve()}removeMatchingKeys(e,t,n){this.Mo.Vo(t,n);let s=this.persistence.referenceDelegate,i=[];return s&&t.forEach((a=>{i.push(s.markPotentiallyOrphaned(e,a))})),M.waitFor(i)}removeMatchingKeysForTargetId(e,t){return this.Mo.fo(t),M.resolve()}getMatchingKeysForTargetId(e,t){let n=this.Mo.po(t);return M.resolve(n)}containsKey(e,t){return M.resolve(this.Mo.containsKey(t))}};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var zu=class{constructor(e,t){this.Bo={},this.overlays={},this.Lo=new ks(0),this.$o=!1,this.$o=!0,this.Uo=new Of,this.referenceDelegate=e(this),this.ko=new kf(this),this.indexManager=new Tf,this.remoteDocumentCache=(function(s){return new Ff(s)})((n=>this.referenceDelegate.Qo(n))),this.serializer=new If(t),this.qo=new Pf(this.serializer)}start(){return Promise.resolve()}shutdown(){return this.$o=!1,Promise.resolve()}get started(){return this.$o}setDatabaseDeletedListener(){}setNetworkEnabled(){}getIndexManager(e){return this.indexManager}getDocumentOverlayCache(e){let t=this.overlays[e.toKey()];return t||(t=new Nf,this.overlays[e.toKey()]=t),t}getMutationQueue(e,t){let n=this.Bo[e.toKey()];return n||(n=new xf(t,this.referenceDelegate),this.Bo[e.toKey()]=n),n}getGlobalsCache(){return this.Uo}getTargetCache(){return this.ko}getRemoteDocumentCache(){return this.remoteDocumentCache}getBundleCache(){return this.qo}runTransaction(e,t,n){K("MemoryPersistence","Starting transaction:",e);let s=new Vf(this.Lo.next());return this.referenceDelegate.Ko(),n(s).next((i=>this.referenceDelegate.Wo(s).next((()=>i)))).toPromise().then((i=>(s.raiseOnCommittedEvent(),i)))}Go(e,t){return M.or(Object.values(this.Bo).map((n=>()=>n.containsKey(e,t))))}},Vf=class extends $B{constructor(e){super(),this.currentSequenceNumber=e}},Mf=class r{constructor(e){this.persistence=e,this.jo=new Ta,this.zo=null}static Ho(e){return new r(e)}get Jo(){if(this.zo)return this.zo;throw $(60996)}addReference(e,t,n){return this.jo.addReference(n,t),this.Jo.delete(n.toString()),M.resolve()}removeReference(e,t,n){return this.jo.removeReference(n,t),this.Jo.add(n.toString()),M.resolve()}markPotentiallyOrphaned(e,t){return this.Jo.add(t.toString()),M.resolve()}removeTarget(e,t){this.jo.fo(t.targetId).forEach((s=>this.Jo.add(s.toString())));let n=this.persistence.getTargetCache();return n.getMatchingKeysForTargetId(e,t.targetId).next((s=>{s.forEach((i=>this.Jo.add(i.toString())))})).next((()=>n.removeTargetData(e,t)))}Ko(){this.zo=new Set}Wo(e){let t=this.persistence.getRemoteDocumentCache().newChangeBuffer();return M.forEach(this.Jo,(n=>{let s=X.fromPath(n);return this.Yo(e,s).next((i=>{i||t.removeEntry(s,te.min())}))})).next((()=>(this.zo=null,t.apply(e))))}updateLimboDocument(e,t){return this.Yo(e,t).next((n=>{n?this.Jo.delete(t.toString()):this.Jo.add(t.toString())}))}Qo(e){return 0}Yo(e,t){return M.or([()=>M.resolve(this.jo.containsKey(t)),()=>this.persistence.getTargetCache().containsKey(e,t),()=>this.persistence.Go(e,t)])}},Wu=class r{constructor(e,t){this.persistence=e,this.Zo=new yn((n=>w0(n.path)),((n,s)=>n.isEqual(s))),this.garbageCollector=n0(this,t)}static Ho(e,t){return new r(e,t)}Ko(){}Wo(e){return M.resolve()}forEachTarget(e,t){return this.persistence.getTargetCache().forEachTarget(e,t)}Pi(e){let t=this.Y_(e);return this.persistence.getTargetCache().getTargetCount(e).next((n=>t.next((s=>n+s))))}Y_(e){let t=0;return this.Ii(e,(n=>{t++})).next((()=>t))}Ii(e,t){return M.forEach(this.Zo,((n,s)=>this.X_(e,n,s).next((i=>i?M.resolve():t(s)))))}removeTargets(e,t,n){return this.persistence.getTargetCache().removeTargets(e,t,n)}removeOrphanedDocuments(e,t){let n=0,s=this.persistence.getRemoteDocumentCache(),i=s.newChangeBuffer();return s.Co(e,(a=>this.X_(e,a,t).next((u=>{u||(n++,i.removeEntry(a,te.min()))})))).next((()=>i.apply(e))).next((()=>n))}markPotentiallyOrphaned(e,t){return this.Zo.set(t,e.currentSequenceNumber),M.resolve()}removeTarget(e,t){let n=t.withSequenceNumber(e.currentSequenceNumber);return this.persistence.getTargetCache().updateTargetData(e,n)}addReference(e,t,n){return this.Zo.set(n,e.currentSequenceNumber),M.resolve()}removeReference(e,t,n){return this.Zo.set(n,e.currentSequenceNumber),M.resolve()}updateLimboDocument(e,t){return this.Zo.set(t,e.currentSequenceNumber),M.resolve()}Qo(e){let t=e.key.toString().length;return e.isFoundDocument()&&(t+=du(e.data.value)),t}X_(e,t,n){return M.or([()=>this.persistence.Go(e,t),()=>this.persistence.getTargetCache().containsKey(e,t),()=>{let s=this.Zo.get(t);return M.resolve(s!==void 0&&s>n)}])}getCacheSize(e){return this.persistence.getRemoteDocumentCache().getSize(e)}};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var Gf=class r{constructor(e,t,n,s){this.targetId=e,this.fromCache=t,this.$a=n,this.Ua=s}static ka(e,t){let n=oe(),s=oe();for(let i of t.docChanges)switch(i.type){case 0:n=n.add(i.doc.key);break;case 1:s=s.add(i.doc.key)}return new r(e,t.fromCache,n,s)}};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function k0(r,e){return X.comparator(r.key,e.key)}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var Uf=class{constructor(){this._documentReadCount=0}get documentReadCount(){return this._documentReadCount}incrementDocumentReadCount(e){this._documentReadCount+=e}};/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var Hf=class{constructor(){this.Qa=!1,this.qa=!1,this.Ka=100,this.Wa=(function(){return eC()?8:e0(ke())>0?6:4})()}initialize(e,t){this.Ga=e,this.indexManager=t,this.Qa=!0}getDocumentsMatchingQuery(e,t,n,s){let i={result:null};return this.ja(e,t).next((a=>{i.result=a})).next((()=>{if(!i.result)return this.za(e,t,s,n).next((a=>{i.result=a}))})).next((()=>{if(i.result)return;let a=new Uf;return this.Ha(e,t,a).next((u=>{if(i.result=u,this.qa)return this.Ja(e,t,a,u.size)}))})).next((()=>i.result))}Ja(e,t,n,s){return xe(t)?M.resolve():n.documentReadCount<this.Ka?(os()<=ae.DEBUG&&K("QueryEngine","SDK will not create cache indexes for query:",zi(t),"since it only creates cache indexes for collection contains","more than or equal to",this.Ka,"documents"),M.resolve()):(os()<=ae.DEBUG&&K("QueryEngine","Query:",zi(t),"scans",n.documentReadCount,"local documents and returns",s,"documents as results."),n.documentReadCount>this.Wa*s?(os()<=ae.DEBUG&&K("QueryEngine","The SDK decides to create cache indexes for query:",zi(t),"as using cache indexes may help improve performance."),this.indexManager.createTargetIndexes(e,Yt(t))):M.resolve())}ja(e,t){if(xe(t))return M.resolve(null);let n=t;if(_m(n))return M.resolve(null);let s=Yt(n);return this.indexManager.getIndexType(e,s).next((i=>i===0?null:(n.limit!==null&&i===1&&(n=mu(n,null,"F"),s=Yt(n)),this.indexManager.getDocumentsMatchingTarget(e,s).next((a=>{let u=oe(...a);return this.Ga.getDocuments(e,u).next((c=>this.indexManager.getMinOffset(e,s).next((l=>{let h=this.Ya(n,c);return this.Za(n,h,u,l.readTime)?this.ja(e,mu(n,null,"F")):this.Xa(e,h,n,l)}))))})))))}za(e,t,n,s){return(xe(t)?(function(a){for(let u of a.stages){if(u instanceof Mr||u instanceof Hu)return!1;if(u instanceof Ca){if(u.condition instanceof Fu&&u.condition._expr.name==="exists"&&u.condition._expr.params[0]instanceof Vr&&u.condition._expr.params[0].fieldName===Es)continue;return!1}}return!0})(t):_m(t))||s.isEqual(te.min())?M.resolve(null):this.Ga.getDocuments(e,n).next((i=>{let a=this.Ya(t,i);return this.Za(t,a,n,s)?M.resolve(null):(os()<=ae.DEBUG&&K("QueryEngine","Re-using previous result from %s to execute query: %s",s.toString(),Nm(t)),this.Xa(e,a,t,CT(s,aa)).next((u=>u)))}))}Ya(e,t){let n,s;return xe(e)?(n=new Fe(k0),s=i=>gc(e,i)):(n=new Fe(fd(e)),s=i=>lc(e,i)),t.forEach(((i,a)=>{s(a)&&(n=n.add(a))})),n}Za(e,t,n,s){if(xe(e))return(function(u){return u.stages.some((c=>c instanceof Mr||c instanceof Hu))})(e);if(e.limit===null)return!1;if(n.size!==t.size)return!0;let i=e.limitType==="F"?t.last():t.first();return!!i&&(i.hasPendingWrites||i.version.compareTo(s)>0)}Ha(e,t,n){return os()<=ae.DEBUG&&K("QueryEngine","Using full collection scan to execute query:",Nm(t)),this.Ga.getDocumentsMatchingQuery(e,t,Pr.min(),n)}Xa(e,t,n,s){return this.Ga.getDocumentsMatchingQuery(e,n,s).next((i=>(t.forEach((a=>{i=i.insert(a.key,a)})),i)))}};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var Id="LocalStore",V0=3e8,qf=class{constructor(e,t,n,s){this.persistence=e,this.eu=t,this.serializer=s,this.tu=new we(ie),this.nu=new yn((i=>e_(i)),t_),this.ru=new Map,this.iu=e.getRemoteDocumentCache(),this.ko=e.getTargetCache(),this.qo=e.getBundleCache(),this.su(n)}su(e){this.documentOverlayCache=this.persistence.getDocumentOverlayCache(e),this.indexManager=this.persistence.getIndexManager(e),this.mutationQueue=this.persistence.getMutationQueue(e,this.indexManager),this.localDocuments=new Sf(this.iu,this.mutationQueue,this.documentOverlayCache,this.indexManager),this.iu.setIndexManager(this.indexManager),this.eu.initialize(this.localDocuments,this.indexManager)}collectGarbage(e){return this.persistence.runTransaction("Collect garbage","readwrite-primary",(t=>e.collect(t,this.tu)))}};function M0(r,e,t,n){return new qf(r,e,t,n)}async function g_(r,e){let t=ne(r);return await t.persistence.runTransaction("Handle user change","readonly",(n=>{let s;return t.mutationQueue.getAllMutationBatches(n).next((i=>(s=i,t.su(e),t.mutationQueue.getAllMutationBatches(n)))).next((i=>{let a=[],u=[],c=oe();for(let l of s){a.push(l.batchId);for(let h of l.mutations)c=c.add(h.key)}for(let l of i){u.push(l.batchId);for(let h of l.mutations)c=c.add(h.key)}return t.localDocuments.getDocuments(n,c).next((l=>({_u:l,removedBatchIds:a,addedBatchIds:u})))}))}))}function G0(r,e){let t=ne(r);return t.persistence.runTransaction("Acknowledge batch","readwrite-primary",(n=>{let s=e.batch.keys(),i=t.iu.newChangeBuffer({trackRemovals:!0});return(function(u,c,l,h){let d=l.batch,C=d.keys(),y=M.resolve();return C.forEach((D=>{y=y.next((()=>h.getEntry(c,D))).next((P=>{let V=l.docVersions.get(D);z(V!==null,48541),P.version.compareTo(V)<0&&(d.applyToRemoteDocument(P,l),P.isValidDocument()&&(P.setReadTime(l.commitVersion),h.addEntry(P)))}))})),y.next((()=>u.mutationQueue.removeMutationBatch(c,d)))})(t,n,e,i).next((()=>i.apply(n))).next((()=>t.mutationQueue.performConsistencyCheck(n))).next((()=>t.documentOverlayCache.removeOverlaysForBatchId(n,s,e.batch.batchId))).next((()=>t.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(n,(function(u){let c=oe();for(let l=0;l<u.mutationResults.length;++l)u.mutationResults[l].transformResults.length>0&&(c=c.add(u.batch.mutations[l].key));return c})(e)))).next((()=>t.localDocuments.getDocuments(n,s)))}))}function m_(r){let e=ne(r);return e.persistence.runTransaction("Get last remote snapshot version","readonly",(t=>e.ko.getLastRemoteSnapshotVersion(t)))}function U0(r,e){let t=ne(r),n=e.snapshotVersion,s=t.tu;return t.persistence.runTransaction("Apply remote event","readwrite-primary",(i=>{let a=t.iu.newChangeBuffer({trackRemovals:!0});s=t.tu;let u=[];e.targetChanges.forEach(((h,d)=>{let C=s.get(d);if(!C)return;u.push(t.ko.removeMatchingKeys(i,h.removedDocuments,d).next((()=>t.ko.addMatchingKeys(i,h.addedDocuments,d))));let y=C.withSequenceNumber(i.currentSequenceNumber);e.targetMismatches.get(d)!==null?y=y.withResumeToken(Ee.EMPTY_BYTE_STRING,te.min()).withLastLimboFreeSnapshotVersion(te.min()):h.resumeToken.approximateByteSize()>0&&(y=y.withResumeToken(h.resumeToken,n)),s=s.insert(d,y),(function(P,V,q){return P.resumeToken.approximateByteSize()===0||V.snapshotVersion.toMicroseconds()-P.snapshotVersion.toMicroseconds()>=V0?!0:q.addedDocuments.size+q.modifiedDocuments.size+q.removedDocuments.size>0})(C,y,h)&&u.push(t.ko.updateTargetData(i,y))}));let c=Bt(),l=oe();if(e.documentUpdates.forEach((h=>{e.resolvedLimboDocuments.has(h)&&u.push(t.persistence.referenceDelegate.updateLimboDocument(i,h))})),u.push(H0(i,a,e.documentUpdates).next((h=>{c=h.ou,l=h.au}))),!n.isEqual(te.min())){let h=t.ko.getLastRemoteSnapshotVersion(i).next((d=>t.ko.setTargetsMetadata(i,i.currentSequenceNumber,n)));u.push(h)}return M.waitFor(u).next((()=>a.apply(i))).next((()=>t.localDocuments.getLocalViewOfDocuments(i,c,l))).next((()=>c))})).then((i=>(t.tu=s,i)))}function H0(r,e,t){let n=oe(),s=oe();return t.forEach((i=>n=n.add(i))),e.getEntries(r,n).next((i=>{let a=Bt();return t.forEach(((u,c)=>{let l=i.get(u);c.isFoundDocument()!==l.isFoundDocument()&&(s=s.add(u)),c.isNoDocument()&&c.version.isEqual(te.min())?(e.removeEntry(u,c.readTime),a=a.insert(u,c)):!l.isValidDocument()||c.version.compareTo(l.version)>0||c.version.compareTo(l.version)===0&&l.hasPendingWrites?(e.addEntry(c),a=a.insert(u,c)):K(Id,"Ignoring outdated watch update for ",u,". Current version:",l.version," Watch version:",c.version)})),{ou:a,au:s}}))}function q0(r,e){let t=ne(r);return t.persistence.runTransaction("Get next mutation batch","readonly",(n=>(e===void 0&&(e=cd),t.mutationQueue.getNextMutationBatchAfterBatchId(n,e))))}function j0(r,e){let t=ne(r);return t.persistence.runTransaction("Allocate target","readwrite",(n=>{let s;return t.ko.getTargetData(n,e).next((i=>i?(s=i,M.resolve(s)):t.ko.allocateTargetId(n).next((a=>(s=new qs(e,a,"TargetPurposeListen",n.currentSequenceNumber),t.ko.addTargetData(n,s).next((()=>s)))))))})).then((n=>{let s=t.tu.get(n.targetId);return(s===null||n.snapshotVersion.compareTo(s.snapshotVersion)>0)&&(t.tu=t.tu.insert(n.targetId,n),t.nu.set(e,n.targetId)),n}))}async function jf(r,e,t){let n=ne(r),s=n.tu.get(e),i=t?"readwrite":"readwrite-primary";try{t||await n.persistence.runTransaction("Release target",i,(a=>n.persistence.referenceDelegate.removeTarget(a,s)))}catch(a){if(!Qs(a))throw a;K(Id,`Failed to update sequence numbers for target ${e}: ${a}`)}n.tu=n.tu.remove(e),n.nu.delete(s.target)}function xm(r,e,t){let n=ne(r),s=te.min(),i=oe();return n.persistence.runTransaction("Execute query","readwrite",(a=>(function(c,l,h){let d=ne(c),C=d.nu.get(h);return C!==void 0?M.resolve(d.tu.get(C)):d.ko.getTargetData(l,h)})(n,a,xe(e)?e:Yt(e)).next((u=>{if(u)return s=u.lastLimboFreeSnapshotVersion,n.ko.getMatchingKeysForTargetId(a,u.targetId).next((c=>{i=c}))})).next((()=>n.eu.getDocumentsMatchingQuery(a,e,t?s:te.min(),t?i:oe()))).next((u=>(K0(n,u),{documents:u,uu:i})))))}function K0(r,e){e.forEach(((t,n)=>{let s=n.key.getCollectionGroup(),i=r.ru.get(s)||te.min();n.readTime.compareTo(i)>0&&r.ru.set(s,n.readTime)}))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var Kf=class{constructor(e,t){this.asyncQueue=e,this.onlineStateHandler=t,this.state="Unknown",this.Pu=0,this.Iu=null,this.Ru=!0}Au(){this.Pu===0&&(this.Vu("Unknown"),this.Iu=this.asyncQueue.enqueueAfterDelay("online_state_timeout",1e4,(()=>(this.Iu=null,this.du("Backend didn't respond within 10 seconds."),this.Vu("Offline"),Promise.resolve()))))}fu(e){this.state==="Online"?this.Vu("Unknown"):(this.Pu++,this.Pu>=1&&(this.mu(),this.du(`Connection failed 1 times. Most recent error: ${e.toString()}`),this.Vu("Offline")))}set(e){this.mu(),this.Pu=0,e==="Online"&&(this.Ru=!1),this.Vu(e)}Vu(e){e!==this.state&&(this.state=e,this.onlineStateHandler(e))}du(e){let t=`Could not reach Cloud Firestore backend. ${e}
This typically indicates that your device does not have a healthy Internet connection at the moment. The client will operate in offline mode until it is able to successfully connect to the backend.`;this.Ru?(gn(t),this.Ru=!1):K("OnlineStateTracker",t)}mu(){this.Iu!==null&&(this.Iu.cancel(),this.Iu=null)}};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var tn="RemoteStore",Jf=class{constructor(e,t,n,s,i){this.localStore=e,this.datastore=t,this.asyncQueue=n,this.remoteSyncer={},this.pu=[],this.gu=new Map,this.yu=new Map,this.wu=new Map,this.bu=new Ur(1e3),this.Su=new Ur(1001),this.xu=new Set,this.vu=[],this.Du=i,this.Du.tn((a=>{n.enqueueAndForget((async()=>{jr(this)&&(K(tn,"Restarting streams for network reachability change."),await(async function(c){let l=ne(c);l.xu.add(4),await xa(l),l.Cu.set("Unknown"),l.xu.delete(4),await mc(l)})(this))}))})),this.Cu=new Kf(n,s)}};async function mc(r){if(jr(r))for(let e of r.vu)await e(!0)}async function xa(r){for(let e of r.vu)await e(!1)}function zf(r,e){return r.yu.get(e)||void 0}function E_(r,e){let t=ne(r),n=zf(t,e.targetId);if(n!==void 0&&t.gu.has(n))return;let s=(function(u,c){let l=zf(u,c);l!==void 0&&u.wu.delete(l);let h=(function(C,y){return y%2!=0?C.Su.next():C.bu.next()})(u,c);return u.yu.set(c,h),u.wu.set(h,c),h})(t,e.targetId);K(tn,"remoteStoreListen mapping SDK target ID to remote",e.targetId,s);let i=new qs(e.target,s,e.purpose,e.sequenceNumber,e.snapshotVersion,e.lastLimboFreeSnapshotVersion,e.resumeToken);t.gu.set(s,i),vd(t)?bd(t):$s(t).ur()&&Ad(t,i)}function Td(r,e){let t=ne(r),n=$s(t),s=zf(t,e);K(tn,"remoteStoreUnlisten removing mapping of SDK target ID to remote",e,s),t.gu.delete(s),t.yu.delete(e),t.wu.delete(s),n.ur()&&__(t,s),t.gu.size===0&&(n.ur()?n.Er():jr(t)&&t.Cu.set("Unknown"))}function Ad(r,e){if(r.Fu.rt(e.targetId),e.resumeToken.approximateByteSize()>0||e.snapshotVersion.compareTo(te.min())>0){let t=r.wu.get(e.targetId);if(t===void 0)return void K(tn,"SDK target ID not found for remote ID: "+e.targetId);let n=r.remoteSyncer.getRemoteKeysForTarget(t).size;e=e.withExpectedCount(n)}$s(r).yr(e)}function __(r,e){r.Fu.rt(e),$s(r).wr(e)}function bd(r){r.Fu=new OB({getRemoteKeysForTarget:e=>{let t=r.wu.get(e);return t!==void 0?r.remoteSyncer.getRemoteKeysForTarget(t):oe()},Mt:e=>r.gu.get(e)||null,xt:()=>r.datastore.serializer.databaseId}),$s(r).start(),r.Cu.Au()}function vd(r){return jr(r)&&!$s(r).ar()&&r.gu.size>0}function jr(r){return ne(r).xu.size===0}function y_(r){r.Fu=void 0}async function J0(r){r.Cu.set("Online")}async function z0(r){r.gu.forEach(((e,t)=>{Ad(r,e)}))}async function W0(r,e){y_(r),vd(r)?(r.Cu.fu(e),bd(r)):r.Cu.set("Unknown")}async function Q0(r,e,t){if(r.Cu.set("Online"),e instanceof _u&&e.state===2&&e.cause)try{await(async function(s,i){let a=i.cause;for(let u of i.targetIds){if(s.gu.has(u)){let c=s.wu.get(u);c!==void 0&&(await s.remoteSyncer.rejectListen(c,a),s.yu.delete(c),s.wu.delete(u)),s.gu.delete(u)}s.Fu.removeTarget(u)}})(r,e)}catch(n){K(tn,"Failed to remove targets %s: %s ",e.targetIds.join(","),n),await Qu(r,n)}else if(e instanceof Cs?r.Fu.Tt(e):e instanceof Eu?r.Fu.ft(e):r.Fu.Rt(e),!t.isEqual(te.min()))try{let n=await m_(r.localStore);t.compareTo(n)>=0&&await(function(i,a){let u=i.Fu.Dt(a);u.targetChanges.forEach(((l,h)=>{if(l.resumeToken.approximateByteSize()>0){let d=i.gu.get(h);d&&i.gu.set(h,d.withResumeToken(l.resumeToken,a))}})),u.targetMismatches.forEach(((l,h)=>{let d=i.gu.get(l);if(!d)return;i.gu.set(l,d.withResumeToken(Ee.EMPTY_BYTE_STRING,d.snapshotVersion)),__(i,l);let C=new qs(d.target,l,h,d.sequenceNumber);Ad(i,C)}));let c=(function(h,d){let C=new Map;d.targetChanges.forEach(((D,P)=>{let V=h.wu.get(P);V!==void 0&&C.set(V,D)}));let y=new we(ie);return d.targetMismatches.forEach(((D,P)=>{let V=h.wu.get(D);V!==void 0&&(y=y.insert(V,P))})),new oa(d.snapshotVersion,C,y,d.documentUpdates,d.augmentedDocumentUpdates,d.resolvedLimboDocuments)})(i,u);return i.remoteSyncer.applyRemoteEvent(c)})(r,t)}catch(n){K(tn,"Failed to raise snapshot:",n),await Qu(r,n)}}async function Qu(r,e,t){if(!Qs(e))throw e;r.xu.add(1),await xa(r),r.Cu.set("Offline"),t||(t=()=>m_(r.localStore)),r.asyncQueue.enqueueRetryable((async()=>{K(tn,"Retrying IndexedDB access"),await t(),r.xu.delete(1),await mc(r)}))}function w_(r,e){return e().catch((t=>Qu(r,t,e)))}async function Ec(r){let e=ne(r),t=Hn(e),n=e.pu.length>0?e.pu[e.pu.length-1].batchId:cd;for(;$0(e);)try{let s=await q0(e.localStore,n);if(s===null){e.pu.length===0&&t.Er();break}n=s.batchId,Y0(e,s)}catch(s){await Qu(e,s)}D_(e)&&I_(e)}function $0(r){return jr(r)&&r.pu.length<10}function Y0(r,e){r.pu.push(e);let t=Hn(r);t.ur()&&t.br&&t.Sr(e.mutations)}function D_(r){return jr(r)&&!Hn(r).ar()&&r.pu.length>0}function I_(r){Hn(r).start()}async function X0(r){Hn(r).Cr()}async function Z0(r){let e=Hn(r);for(let t of r.pu)e.Sr(t.mutations)}async function eA(r,e,t){let n=r.pu.shift(),s=wf.from(n,e,t);await w_(r,(()=>r.remoteSyncer.applySuccessfulWrite(s))),await Ec(r)}async function tA(r,e){e&&Hn(r).br&&await(async function(n,s){if((function(a){return wE(a)&&a!==k.ABORTED})(s.code)){let i=n.pu.shift();Hn(n).lr(),await w_(n,(()=>n.remoteSyncer.rejectFailedWrite(i.batchId,s))),await Ec(n)}})(r,e),D_(r)&&I_(r)}async function Fm(r,e){let t=ne(r);t.asyncQueue.verifyOperationInProgress(),K(tn,"RemoteStore received new credentials");let n=jr(t);t.xu.add(3),await xa(t),n&&t.Cu.set("Unknown"),await t.remoteSyncer.handleCredentialChange(e),t.xu.delete(3),await mc(t)}async function nA(r,e){let t=ne(r);e?(t.xu.delete(2),await mc(t)):e||(t.xu.add(2),await xa(t),t.Cu.set("Unknown"))}function $s(r){return r.Ou||(r.Ou=(function(t,n,s){let i=ne(t);return i.Or(),new JB(n,i.connection,i.authCredentials,i.appCheckCredentials,i.serializer,s)})(r.datastore,r.asyncQueue,{pn:J0.bind(null,r),yn:z0.bind(null,r),bn:W0.bind(null,r),gr:Q0.bind(null,r)}),r.vu.push((async e=>{e?(r.Ou.lr(),vd(r)?bd(r):r.Cu.set("Unknown")):(await r.Ou.stop(),y_(r))}))),r.Ou}function Hn(r){return r.Mu||(r.Mu=(function(t,n,s){let i=ne(t);return i.Or(),new zB(n,i.connection,i.authCredentials,i.appCheckCredentials,i.serializer,s)})(r.datastore,r.asyncQueue,{pn:()=>Promise.resolve(),yn:X0.bind(null,r),bn:tA.bind(null,r),vr:Z0.bind(null,r),Dr:eA.bind(null,r)}),r.vu.push((async e=>{e?(r.Mu.lr(),await Ec(r)):(await r.Mu.stop(),r.pu.length>0&&(K(tn,`Stopping write stream with ${r.pu.length} pending writes`),r.pu=[]))}))),r.Mu}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var $u=class{constructor(e){this.observer=e,this.muted=!1}next(e){this.muted||this.observer.next&&this.Nu(this.observer.next,e)}error(e){this.muted||(this.observer.error?this.Nu(this.observer.error,e):gn("Uncaught Error in snapshot listener:",e.toString()))}Bu(){this.muted=!0}Nu(e,t){setTimeout((()=>{this.muted||e(t)}),0)}};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var Wf=class r{constructor(e,t,n,s,i){this.asyncQueue=e,this.timerId=t,this.targetTimeMs=n,this.op=s,this.removalCallback=i,this.deferred=new kt,this.then=this.deferred.promise.then.bind(this.deferred.promise),this.deferred.promise.catch((a=>{}))}get promise(){return this.deferred.promise}static createAndSchedule(e,t,n,s,i){let a=Date.now()+n,u=new r(e,t,a,s,i);return u.start(n),u}start(e){this.timerHandle=setTimeout((()=>this.handleDelayElapsed()),e)}skipDelay(){return this.handleDelayElapsed()}cancel(e){this.timerHandle!==null&&(this.clearTimeout(),this.deferred.reject(new j(k.CANCELLED,"Operation cancelled"+(e?": "+e:""))))}handleDelayElapsed(){this.asyncQueue.enqueueAndForget((()=>this.timerHandle!==null?(this.clearTimeout(),this.op().then((e=>this.deferred.resolve(e)))):Promise.resolve()))}clearTimeout(){this.timerHandle!==null&&(this.removalCallback(this),clearTimeout(this.timerHandle),this.timerHandle=null)}};function Rd(r,e){if(gn("AsyncQueue",`${e}: ${r}`),Qs(r))return new j(k.UNAVAILABLE,`${e}: ${r}`);throw r}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var Yu=class{constructor(){this.activeTargetIds=vT()}nc(e){this.activeTargetIds=this.activeTargetIds.add(e)}rc(e){this.activeTargetIds=this.activeTargetIds.delete(e)}tc(){let e={activeTargetIds:this.activeTargetIds.toArray(),updateTimeMs:Date.now()};return JSON.stringify(e)}};var Qf=class{constructor(){this.kc=new Yu,this.Qc={},this.onlineStateHandler=null,this.sequenceNumberHandler=null}addPendingMutation(e){}updateMutationState(e,t,n){}addLocalQueryTarget(e,t=!0){return t&&this.kc.nc(e),this.Qc[e]||"not-current"}updateQueryState(e,t,n){this.Qc[e]=t}removeLocalQueryTarget(e){this.kc.rc(e)}isLocalQueryTarget(e){return this.kc.activeTargetIds.has(e)}clearQueryState(e){delete this.Qc[e]}getAllActiveQueryTargets(){return this.kc.activeTargetIds}isActiveQueryTarget(e){return this.kc.activeTargetIds.has(e)}start(){return this.kc=new Yu,Promise.resolve()}handleUserChange(e,t,n){}setOnlineState(e){}shutdown(){}writeSequenceNumber(e){}notifyBundleLoaded(e){}};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function hB(){return typeof document<"u"?document:null}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var Aa=class r{static emptySet(e){return new r(e.comparator)}constructor(e){this.comparator=e?(t,n)=>e(t,n)||X.comparator(t.key,n.key):(t,n)=>X.comparator(t.key,n.key),this.keyedMap=cs(),this.sortedSet=new we(this.comparator)}has(e){return this.keyedMap.get(e)!=null}get(e){return this.keyedMap.get(e)}first(){return this.sortedSet.minKey()}last(){return this.sortedSet.maxKey()}isEmpty(){return this.sortedSet.isEmpty()}indexOf(e){let t=this.keyedMap.get(e);return t?this.sortedSet.indexOf(t):-1}get size(){return this.sortedSet.size}forEach(e){this.sortedSet.inorderTraversal(((t,n)=>(e(t),!1)))}add(e){let t=this.delete(e.key);return t.copy(t.keyedMap.insert(e.key,e),t.sortedSet.insert(e,null))}delete(e){let t=this.get(e);return t?this.copy(this.keyedMap.remove(e),this.sortedSet.remove(t)):this}isEqual(e){if(!(e instanceof r)||this.size!==e.size)return!1;let t=this.sortedSet.getIterator(),n=e.sortedSet.getIterator();for(;t.hasNext();){let s=t.getNext().key,i=n.getNext().key;if(!s.isEqual(i))return!1}return!0}toString(){let e=[];return this.forEach((t=>{e.push(t.toString())})),e.length===0?"DocumentSet ()":`DocumentSet (
  `+e.join(`  
`)+`
)`}copy(e,t){let n=new r;return n.comparator=this.comparator,n.keyedMap=e,n.sortedSet=t,n}};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var Xu=class{constructor(){this.qc=new we(X.comparator)}track(e){let t=e.doc.key,n=this.qc.get(t);n?e.type!==0&&n.type===3?this.qc=this.qc.insert(t,e):e.type===3&&n.type!==1?this.qc=this.qc.insert(t,{type:n.type,doc:e.doc}):e.type===2&&n.type===2?this.qc=this.qc.insert(t,{type:2,doc:e.doc}):e.type===2&&n.type===0?this.qc=this.qc.insert(t,{type:0,doc:e.doc}):e.type===1&&n.type===0?this.qc=this.qc.remove(t):e.type===1&&n.type===2?this.qc=this.qc.insert(t,{type:1,doc:n.doc}):e.type===0&&n.type===1?this.qc=this.qc.insert(t,{type:2,doc:e.doc}):$(63341,{Nt:e,Kc:n}):this.qc=this.qc.insert(t,e)}Wc(){let e=[];return this.qc.inorderTraversal(((t,n)=>{e.push(n)})),e}},js=class r{constructor(e,t,n,s,i,a,u,c,l){this.query=e,this.docs=t,this.oldDocs=n,this.docChanges=s,this.mutatedKeys=i,this.fromCache=a,this.syncStateChanged=u,this.excludesMetadataChanges=c,this.hasCachedResults=l}static fromInitialDocuments(e,t,n,s,i){let a=[];return t.forEach((u=>{a.push({type:0,doc:u})})),new r(e,t,Aa.emptySet(t),a,n,s,!0,!1,i)}get hasPendingWrites(){return!this.mutatedKeys.isEmpty()}isEqual(e){if(!(this.fromCache===e.fromCache&&this.hasCachedResults===e.hasCachedResults&&this.syncStateChanged===e.syncStateChanged&&this.mutatedKeys.isEqual(e.mutatedKeys)&&Cc(this.query,e.query)&&this.docs.isEqual(e.docs)&&this.oldDocs.isEqual(e.oldDocs)))return!1;let t=this.docChanges,n=e.docChanges;if(t.length!==n.length)return!1;for(let s=0;s<t.length;s++)if(t[s].type!==n[s].type||!t[s].doc.isEqual(n[s].doc))return!1;return!0}};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var $f=class{constructor(){this.Gc=void 0,this.jc=[]}zc(){return this.jc.some((e=>e.Hc()))}},Yf=class{constructor(){this.queries=Lm(),this.onlineState="Unknown",this.Jc=new Set}terminate(){(function(t,n){let s=ne(t),i=s.queries;s.queries=Lm(),i.forEach(((a,u)=>{for(let c of u.jc)c.onError(n)}))})(this,new j(k.ABORTED,"Firestore shutting down"))}};function Lm(){return new yn((r=>ZE(r)),Cc)}async function T_(r,e){let t=ne(r),n=3,s=e.query,i=t.queries.get(s);i?!i.zc()&&e.Hc()&&(n=2):(i=new $f,n=e.Hc()?0:1);try{switch(n){case 0:i.Gc=await t.onListen(s,!0);break;case 1:i.Gc=await t.onListen(s,!1);break;case 2:await t.onFirstRemoteStoreListen(s)}}catch(a){let u=Rd(a,`Initialization of query '${xe(e.query)?pn(e.query):zi(e.query)}' failed`);return void e.onError(u)}t.queries.set(s,i),i.jc.push(e),e.Yc(t.onlineState),i.Gc&&e.Zc(i.Gc)&&Sd(t)}async function A_(r,e){let t=ne(r),n=e.query,s=3,i=t.queries.get(n);if(i){let a=i.jc.indexOf(e);a>=0&&(i.jc.splice(a,1),i.jc.length===0?s=e.Hc()?0:1:!i.zc()&&e.Hc()&&(s=2))}switch(s){case 0:return t.queries.delete(n),t.onUnlisten(n,!0);case 1:return t.queries.delete(n),t.onUnlisten(n,!1);case 2:return t.onLastRemoteStoreUnlisten(n);default:return}}function rA(r,e){let t=ne(r),n=!1;for(let s of e){let i=s.query,a=t.queries.get(i);if(a){for(let u of a.jc)u.Zc(s)&&(n=!0);a.Gc=s}}n&&Sd(t)}function sA(r,e,t){let n=ne(r),s=n.queries.get(e);if(s)for(let i of s.jc)i.onError(t);n.queries.delete(e)}function Sd(r){r.Jc.forEach((e=>{e.next()}))}var Xf;(function(r){r.Default="default",r.Cache="cache"})(Xf||(Xf={}));var Zu=class{constructor(e,t,n){this.query=e,this.Xc=t,this.el=!1,this.tl=null,this.onlineState="Unknown",this.options=n||{}}Zc(e){if(!this.options.includeMetadataChanges){let n=[];for(let s of e.docChanges)s.type!==3&&n.push(s);e=new js(e.query,e.docs,e.oldDocs,n,e.mutatedKeys,e.fromCache,e.syncStateChanged,!0,e.hasCachedResults)}let t=!1;return this.el?this.nl(e)&&(this.Xc.next(e),t=!0):this.rl(e,this.onlineState)&&(this.il(e),t=!0),this.tl=e,t}onError(e){this.Xc.error(e)}Yc(e){this.onlineState=e;let t=!1;return this.tl&&!this.el&&this.rl(this.tl,e)&&(this.il(this.tl),t=!0),t}rl(e,t){if(!e.fromCache||!this.Hc())return!0;let n=t!=="Offline";return(!this.options.waitForSyncWhenOnline||!n)&&(!e.docs.isEmpty()||e.hasCachedResults||t==="Offline")}nl(e){if(e.docChanges.length>0)return!0;let t=this.tl&&this.tl.hasPendingWrites!==e.hasPendingWrites;return!(!e.syncStateChanged&&!t)&&this.options.includeMetadataChanges===!0}il(e){e=js.fromInitialDocuments(e.query,e.docs,e.mutatedKeys,e.fromCache,e.hasCachedResults),this.el=!0,this.Xc.next(e)}Hc(){return this.options.source!==Xf.Cache}};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var ec=class{constructor(e){this.key=e}},tc=class{constructor(e){this.key=e}},Zf=class{constructor(e,t){this.query=e,this.hl=t,this.Tl=null,this.hasCachedResults=!1,this.current=!1,this.Pl=oe(),this.mutatedKeys=oe(),this.Il=xe(e)?bf(e):fd(e),this.Rl=new Aa(this.Il)}get Al(){return this.hl}Vl(e,t){let n=t?t.dl:new Xu,s=t?t.Rl:this.Rl,i=t?t.mutatedKeys:this.mutatedKeys,a=s,u=!1,[c,l]=this.fl(this.query,s);e.inorderTraversal(((d,C)=>{let y=s.get(d),D=F0(this.query,C)?C:null,P=!!y&&this.mutatedKeys.has(y.key),V=!!D&&(D.hasLocalMutations||this.mutatedKeys.has(D.key)&&D.hasCommittedMutations),q=!1;y&&D?y.data.isEqual(D.data)?P!==V&&(n.track({type:3,doc:D}),q=!0):this.ml(y,D)||(n.track({type:2,doc:D}),q=!0,(c&&this.Il(D,c)>0||l&&this.Il(D,l)<0)&&(u=!0)):!y&&D?(n.track({type:0,doc:D}),q=!0):y&&!D&&(n.track({type:1,doc:y}),q=!0,(c||l)&&(u=!0)),q&&(D?(a=a.add(D),i=V?i.add(d):i.delete(d)):(a=a.delete(d),i=i.delete(d)))}));let h=this.pl(this.query);if(h)if(xe(this.query)){let d=[];a.forEach((D=>d.push(D)));let C=C_(this.query,d),y=new Aa(bf(this.query));for(let D of C)y=y.add(D);a.forEach((D=>{y.has(D.key)||(i=i.delete(D.key),n.track({type:1,doc:D}))})),a=y}else{let d=this.gl(this.query);for(;a.size>h;){let C=d==="F"?a.last():a.first();a=a.delete(C.key),i=i.delete(C.key),n.track({type:1,doc:C})}}return{Rl:a,dl:n,Za:u,mutatedKeys:i}}pl(e){return xe(e)?BB(e)?.limit:e.limit||void 0}gl(e){if(xe(e)){let t=BB(e);return t&&t.limit<0?"L":"F"}return e.limitType}fl(e,t){if(xe(e)){let n=BB(e)?.limit;return[t.size===n?t.last():null,null]}return[e.limitType==="F"&&t.size===this.pl(this.query)?t.last():null,e.limitType==="L"&&t.size===this.pl(this.query)?t.first():null]}ml(e,t){return e.hasLocalMutations&&t.hasCommittedMutations&&!t.hasLocalMutations}applyChanges(e,t,n,s){let i=this.Rl;this.Rl=e.Rl,this.mutatedKeys=e.mutatedKeys;let a=e.dl.Wc();a.sort(((h,d)=>(function(y,D){let P=V=>{switch(V){case 0:return 1;case 2:case 3:return 2;case 1:return 0;default:return $(20277,{Nt:V})}};return P(y)-P(D)})(h.type,d.type)||this.Il(h.doc,d.doc))),this.yl(n),s=s??!1;let u=t&&!s?this.wl():[],c=this.Pl.size===0&&this.current&&!s?1:0,l=c!==this.Tl;return this.Tl=c,a.length!==0||l?{snapshot:new js(this.query,e.Rl,i,a,e.mutatedKeys,c===0,l,!1,!!n&&n.resumeToken.approximateByteSize()>0),bl:u}:{bl:u}}Yc(e){return this.current&&e==="Offline"?(this.current=!1,this.applyChanges({Rl:this.Rl,dl:new Xu,mutatedKeys:this.mutatedKeys,Za:!1},!1)):{bl:[]}}Sl(e){return!this.hl.has(e)&&!!this.Rl.has(e)&&!this.Rl.get(e).hasLocalMutations}yl(e){e&&(e.addedDocuments.forEach((t=>this.hl=this.hl.add(t))),e.modifiedDocuments.forEach((t=>{})),e.removedDocuments.forEach((t=>this.hl=this.hl.delete(t))),this.current=e.current)}wl(){if(!this.current)return[];let e=this.Pl;this.Pl=oe(),this.Rl.forEach((n=>{this.Sl(n.key)&&(this.Pl=this.Pl.add(n.key))}));let t=[];return e.forEach((n=>{this.Pl.has(n)||t.push(new tc(n))})),this.Pl.forEach((n=>{e.has(n)||t.push(new ec(n))})),t}xl(e){this.hl=e.uu,this.Pl=oe();let t=this.Vl(e.documents);return this.applyChanges(t,!0)}vl(){return js.fromInitialDocuments(this.query,this.Rl,this.mutatedKeys,this.Tl===0,this.hasCachedResults)}},Pd="SyncEngine",ed=class{constructor(e,t,n){this.query=e,this.targetId=t,this.view=n}},td=class{constructor(e){this.key=e,this.Dl=!1}},nd=class{constructor(e,t,n,s,i,a){this.localStore=e,this.remoteStore=t,this.eventManager=n,this.sharedClientState=s,this.currentUser=i,this.maxConcurrentLimboResolutions=a,this.Cl={},this.Fl=new yn((u=>ZE(u)),Cc),this.Ol=new Map,this.Ml=new Set,this.Nl=new we(X.comparator),this.Bl=new Map,this.Ll=new Ta,this.$l={},this.Ul=new Map,this.kl=Ur.G_(),this.onlineState="Unknown",this.Ql=void 0}get isPrimaryClient(){return this.Ql===!0}};async function iA(r,e,t=!0){let n=N_(r),s,i=n.Fl.get(e);return i?(n.sharedClientState.addLocalQueryTarget(i.targetId),s=i.view.vl()):s=await b_(n,e,t,!0),s}async function aA(r,e){let t=N_(r);await b_(t,e,!0,!1)}async function b_(r,e,t,n){let s=await j0(r.localStore,xe(e)?e:Yt(e)),i=s.targetId,a=r.sharedClientState.addLocalQueryTarget(i,t),u;return n&&(u=await oA(r,e,i,a==="current",s.resumeToken)),r.isPrimaryClient&&t&&E_(r.remoteStore,s),u}async function oA(r,e,t,n,s){r.ql=(d,C,y)=>(async function(P,V,q,W){let ce=V.view.Vl(q);ce.Za&&(ce=await xm(P.localStore,V.query,!1).then((({documents:A})=>V.view.Vl(A,ce))));let De=W&&W.targetChanges.get(V.targetId),Qe=W&&W.targetMismatches.get(V.targetId)!=null,_e=V.view.applyChanges(ce,P.isPrimaryClient,De,Qe);return Vm(P,V.targetId,_e.bl),_e.snapshot})(r,d,C,y);let i=await xm(r.localStore,e,!0),a=new Zf(e,i.uu),u=a.Vl(i.documents),c=ua.createSynthesizedTargetChangeForCurrentChange(t,n&&r.onlineState!=="Offline",s),l=a.applyChanges(u,r.isPrimaryClient,c);Vm(r,t,l.bl);let h=new ed(e,t,a);return r.Fl.set(e,h),r.Ol.has(t)?r.Ol.get(t).push(e):r.Ol.set(t,[e]),l.snapshot}async function uA(r,e,t){let n=ne(r),s=n.Fl.get(e),i=n.Ol.get(s.targetId);if(i.length>1)return n.Ol.set(s.targetId,i.filter((a=>!Cc(a,e)))),void n.Fl.delete(e);n.isPrimaryClient?(n.sharedClientState.removeLocalQueryTarget(s.targetId),n.sharedClientState.isActiveQueryTarget(s.targetId)||await jf(n.localStore,s.targetId,!1).then((()=>{n.sharedClientState.clearQueryState(s.targetId),t&&Td(n.remoteStore,s.targetId),rd(n,s.targetId)})).catch(Ws)):(rd(n,s.targetId),await jf(n.localStore,s.targetId,!0))}async function cA(r,e){let t=ne(r),n=t.Fl.get(e),s=t.Ol.get(n.targetId);t.isPrimaryClient&&s.length===1&&(t.sharedClientState.removeLocalQueryTarget(n.targetId),Td(t.remoteStore,n.targetId))}async function lA(r,e,t){let n=gA(r);try{let s=await(function(a,u){let c=ne(a),l=ye.now(),h=u.reduce(((y,D)=>y.add(D.key)),oe()),d,C;return c.persistence.runTransaction("Locally write mutations","readwrite",(y=>{let D=Bt(),P=oe();return c.iu.getEntries(y,h).next((V=>{D=V,D.forEach(((q,W)=>{W.isValidDocument()||(P=P.add(q))}))})).next((()=>c.localDocuments.getOverlayedDocuments(y,D))).next((V=>{d=V;let q=[];for(let W of u){let ce=fT(W,d.get(W.key).overlayedDocument);ce!=null&&q.push(new Xt(W.key,ce,aE(ce.value.mapValue),lt.exists(!0)))}return c.mutationQueue.addMutationBatch(y,l,q,u)})).next((V=>{C=V;let q=V.applyToLocalDocumentSet(d,P);return c.documentOverlayCache.saveOverlays(y,V.batchId,q)}))})).then((()=>({batchId:C.batchId,changes:TE(d)})))})(n.localStore,e);n.sharedClientState.addPendingMutation(s.batchId),(function(a,u,c){let l=a.$l[a.currentUser.toKey()];l||(l=new we(ie)),l=l.insert(u,c),a.$l[a.currentUser.toKey()]=l})(n,s.batchId,t),await Fa(n,s.changes),await Ec(n.remoteStore)}catch(s){let i=Rd(s,"Failed to persist write");t.reject(i)}}async function v_(r,e){let t=ne(r);try{let n=await U0(t.localStore,e);e.targetChanges.forEach(((s,i)=>{let a=t.Bl.get(i);a&&(z(s.addedDocuments.size+s.modifiedDocuments.size+s.removedDocuments.size<=1,22616),s.addedDocuments.size>0?a.Dl=!0:s.modifiedDocuments.size>0?z(a.Dl,14607):s.removedDocuments.size>0&&(z(a.Dl,42227),a.Dl=!1))})),await Fa(t,n,e)}catch(n){await Ws(n)}}function km(r,e,t){let n=ne(r);if(n.isPrimaryClient&&t===0||!n.isPrimaryClient&&t===1){let s=[];n.Fl.forEach(((i,a)=>{let u=a.view.Yc(e);u.snapshot&&s.push(u.snapshot)})),(function(a,u){let c=ne(a);c.onlineState=u;let l=!1;c.queries.forEach(((h,d)=>{for(let C of d.jc)C.Yc(u)&&(l=!0)})),l&&Sd(c)})(n.eventManager,e),s.length&&n.Cl.gr(s),n.onlineState=e,n.isPrimaryClient&&n.sharedClientState.setOnlineState(e)}}async function BA(r,e,t){let n=ne(r);n.sharedClientState.updateQueryState(e,"rejected",t);let s=n.Bl.get(e),i=s&&s.key;if(i){let a=new we(X.comparator);a=a.insert(i,It.newNoDocument(i,te.min()));let u=oe().add(i),c=new oa(te.min(),new Map,new we(ie),a,Bt(),u);await v_(n,c),n.Nl=n.Nl.remove(i),n.Bl.delete(e),Nd(n)}else await jf(n.localStore,e,!1).then((()=>rd(n,e,t))).catch(Ws)}async function hA(r,e){let t=ne(r),n=e.batch.batchId;try{let s=await G0(t.localStore,e);S_(t,n,null),R_(t,n),t.sharedClientState.updateMutationState(n,"acknowledged"),await Fa(t,s)}catch(s){await Ws(s)}}async function fA(r,e,t){let n=ne(r);try{let s=await(function(a,u){let c=ne(a);return c.persistence.runTransaction("Reject batch","readwrite-primary",(l=>{let h;return c.mutationQueue.lookupMutationBatch(l,u).next((d=>(z(d!==null,37113),h=d.keys(),c.mutationQueue.removeMutationBatch(l,d)))).next((()=>c.mutationQueue.performConsistencyCheck(l))).next((()=>c.documentOverlayCache.removeOverlaysForBatchId(l,h,u))).next((()=>c.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(l,h))).next((()=>c.localDocuments.getDocuments(l,h)))}))})(n.localStore,e);S_(n,e,t),R_(n,e),n.sharedClientState.updateMutationState(e,"rejected",t),await Fa(n,s)}catch(s){await Ws(s)}}function R_(r,e){(r.Ul.get(e)||[]).forEach((t=>{t.resolve()})),r.Ul.delete(e)}function S_(r,e,t){let n=ne(r),s=n.$l[n.currentUser.toKey()];if(s){let i=s.get(e);i&&(t?i.reject(t):i.resolve(),s=s.remove(e)),n.$l[n.currentUser.toKey()]=s}}function rd(r,e,t=null){r.sharedClientState.removeLocalQueryTarget(e);for(let n of r.Ol.get(e))r.Fl.delete(n),t&&r.Cl.Kl(n,t);r.Ol.delete(e),r.isPrimaryClient&&r.Ll.fo(e).forEach((n=>{r.Ll.containsKey(n)||P_(r,n)}))}function P_(r,e){r.Ml.delete(e.path.canonicalString());let t=r.Nl.get(e);t!==null&&(Td(r.remoteStore,t),r.Nl=r.Nl.remove(e),r.Bl.delete(t),Nd(r))}function Vm(r,e,t){for(let n of t)n instanceof ec?(r.Ll.addReference(n.key,e),dA(r,n)):n instanceof tc?(K(Pd,"Document no longer in limbo: "+n.key),r.Ll.removeReference(n.key,e),r.Ll.containsKey(n.key)||P_(r,n.key)):$(19791,{Wl:n})}function dA(r,e){let t=e.key,n=t.path.canonicalString();r.Nl.get(t)||r.Ml.has(n)||(K(Pd,"New document in limbo: "+t),r.Ml.add(n),Nd(r))}function Nd(r){for(;r.Ml.size>0&&r.Nl.size<r.maxConcurrentLimboResolutions;){let e=r.Ml.values().next().value;r.Ml.delete(e);let t=new X(he.fromString(e)),n=r.kl.next();r.Bl.set(n,new td(t)),r.Nl=r.Nl.insert(t,n),E_(r.remoteStore,new qs(Yt(Oa(t.path)),n,"TargetPurposeLimboResolution",ks.Br))}}async function Fa(r,e,t){let n=ne(r),s=[],i=[],a=[];n.Fl.isEmpty()||(n.Fl.forEach(((u,c)=>{a.push(n.ql(c,e,t).then((l=>{if((l||t)&&n.isPrimaryClient){let h=l?!l.fromCache:t?.targetChanges.get(c.targetId)?.current;n.sharedClientState.updateQueryState(c.targetId,h?"current":"not-current")}if(l){s.push(l);let h=Gf.ka(c.targetId,l);i.push(h)}})))})),await Promise.all(a),n.Cl.gr(s),await(async function(c,l){let h=ne(c);try{await h.persistence.runTransaction("notifyLocalViewChanges","readwrite",(d=>M.forEach(l,(C=>M.forEach(C.$a,(y=>h.persistence.referenceDelegate.addReference(d,C.targetId,y))).next((()=>M.forEach(C.Ua,(y=>h.persistence.referenceDelegate.removeReference(d,C.targetId,y)))))))))}catch(d){if(!Qs(d))throw d;K(Id,"Failed to update sequence numbers: "+d)}for(let d of l){let C=d.targetId;if(!d.fromCache){let y=h.tu.get(C),D=y.snapshotVersion,P=y.withLastLimboFreeSnapshotVersion(D);h.tu=h.tu.insert(C,P)}}})(n.localStore,i))}async function pA(r,e){let t=ne(r);if(!t.currentUser.isEqual(e)){K(Pd,"User change. New user:",e.toKey());let n=await g_(t.localStore,e);t.currentUser=e,(function(i,a){i.Ul.forEach((u=>{u.forEach((c=>{c.reject(new j(k.CANCELLED,a))}))})),i.Ul.clear()})(t,"'waitForPendingWrites' promise is rejected due to a user change."),t.sharedClientState.handleUserChange(e,n.removedBatchIds,n.addedBatchIds),await Fa(t,n._u)}}function CA(r,e){let t=ne(r),n=t.Bl.get(e);if(n&&n.Dl)return oe().add(n.key);{let s=oe(),i=t.Ol.get(e);if(!i)return s;for(let a of i??[]){let u=t.Fl.get(a);s=s.unionWith(u.view.Al)}return s}}function N_(r){let e=ne(r);return e.remoteStore.remoteSyncer.applyRemoteEvent=v_.bind(null,e),e.remoteStore.remoteSyncer.getRemoteKeysForTarget=CA.bind(null,e),e.remoteStore.remoteSyncer.rejectListen=BA.bind(null,e),e.Cl.gr=rA.bind(null,e.eventManager),e.Cl.Kl=sA.bind(null,e.eventManager),e}function gA(r){let e=ne(r);return e.remoteStore.remoteSyncer.applySuccessfulWrite=hA.bind(null,e),e.remoteStore.remoteSyncer.rejectFailedWrite=fA.bind(null,e),e}var Hr=class{constructor(){this.kind="memory",this.synchronizeTabs=!1}async initialize(e){this.serializer=Bc(e.databaseInfo.databaseId),this.sharedClientState=this.jl(e),this.persistence=this.zl(e),await this.persistence.start(),this.localStore=this.Hl(e),this.gcScheduler=this.Jl(e,this.localStore),this.indexBackfillerScheduler=this.Yl(e,this.localStore)}Jl(e,t){return null}Yl(e,t){return null}Hl(e){return M0(this.persistence,new Hf,e.initialUser,this.serializer)}zl(e){return new zu(Mf.Ho,this.serializer)}jl(e){return new Qf}async terminate(){this.gcScheduler?.stop(),this.indexBackfillerScheduler?.stop(),this.sharedClientState.shutdown(),await this.persistence.shutdown()}};Hr.provider={build:()=>new Hr};var nc=class extends Hr{constructor(e){super(),this.cacheSizeBytes=e}Jl(e,t){z(this.persistence.referenceDelegate instanceof Wu,46915);let n=this.persistence.referenceDelegate.garbageCollector;return new XB(n,e.asyncQueue,t)}zl(e){let t=this.cacheSizeBytes!==void 0?Rt.withCacheSize(this.cacheSizeBytes):Rt.DEFAULT;return new zu((n=>Wu.Ho(n,t)),this.serializer)}};var Ks=class{async initialize(e,t){this.localStore||(this.localStore=e.localStore,this.sharedClientState=e.sharedClientState,this.datastore=this.createDatastore(t),this.remoteStore=this.createRemoteStore(t),this.eventManager=this.createEventManager(t),this.syncEngine=this.createSyncEngine(t,!e.synchronizeTabs),this.sharedClientState.onlineStateHandler=n=>km(this.syncEngine,n,1),this.remoteStore.remoteSyncer.handleCredentialChange=pA.bind(null,this.syncEngine),await nA(this.remoteStore,this.syncEngine.isPrimaryClient))}createEventManager(e){return(function(){return new Yf})()}createDatastore(e){let t=Bc(e.databaseInfo.databaseId),n=QT(e.databaseInfo);return $T(e.authCredentials,e.appCheckCredentials,n,t)}createRemoteStore(e){return(function(n,s,i,a,u){return new Jf(n,s,i,a,u)})(this.localStore,this.datastore,e.asyncQueue,(t=>km(this.syncEngine,t,0)),(function(){return vu.cn()?new vu:new HB})())}createSyncEngine(e,t){return(function(s,i,a,u,c,l,h){let d=new nd(s,i,a,u,c,l);return h&&(d.Ql=!0),d})(this.localStore,this.remoteStore,this.eventManager,this.sharedClientState,e.initialUser,e.maxConcurrentLimboResolutions,t)}async terminate(){await(async function(t){let n=ne(t);K(tn,"RemoteStore shutting down."),n.xu.add(5),await xa(n),n.Du.shutdown(),n.Cu.set("Unknown")})(this.remoteStore),this.datastore?.terminate(),this.eventManager?.terminate()}};Ks.provider={build:()=>new Ks};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var sd=class{constructor(e){this.datastore=e,this.readVersions=new Map,this.mutations=[],this.committed=!1,this.lastTransactionError=null,this.writtenDocs=new Set}async lookup(e){if(this.ensureCommitNotCalled(),this.mutations.length>0)throw this.lastTransactionError=new j(k.INVALID_ARGUMENT,"Firestore transactions require all reads to be executed before all writes."),this.lastTransactionError;let t=await(async function(s,i){let a=ne(s),u={documents:i.map((d=>ca(a.serializer,d)))},c=await a.dn("BatchGetDocuments",a.serializer.databaseId,he.emptyPath(),u,i.length),l=new Map;c.forEach((d=>{let C=LT(a.serializer,d);l.set(C.key.toString(),C)}));let h=[];return i.forEach((d=>{let C=l.get(d.toString());z(!!C,55234,{key:d}),h.push(C)})),h})(this.datastore,e);return t.forEach((n=>this.recordVersion(n))),t}set(e,t){this.write(t.toMutation(e,this.precondition(e))),this.writtenDocs.add(e.toString())}update(e,t){try{this.write(t.toMutation(e,this.preconditionForUpdate(e)))}catch(n){this.lastTransactionError=n}this.writtenDocs.add(e.toString())}delete(e){this.write(new vr(e,this.precondition(e))),this.writtenDocs.add(e.toString())}async commit(){if(this.ensureCommitNotCalled(),this.lastTransactionError)throw this.lastTransactionError;let e=this.readVersions;this.mutations.forEach((t=>{e.delete(t.key.toString())})),e.forEach(((t,n)=>{let s=X.fromPath(n);this.mutations.push(new pu(s,this.precondition(s)))})),await(async function(n,s){let i=ne(n),a={writes:s.map((u=>SE(i.serializer,u)))};await i.In("Commit",i.serializer.databaseId,he.emptyPath(),a)})(this.datastore,this.mutations),this.committed=!0}recordVersion(e){let t;if(e.isFoundDocument())t=e.version;else{if(!e.isNoDocument())throw $(50498,{Xl:e.constructor.name});t=te.min()}let n=this.readVersions.get(e.key.toString());if(n){if(!t.isEqual(n))throw new j(k.ABORTED,"Document version changed between two reads.")}else this.readVersions.set(e.key.toString(),t)}precondition(e){let t=this.readVersions.get(e.toString());return!this.writtenDocs.has(e.toString())&&t?t.isEqual(te.min())?lt.exists(!1):lt.updateTime(t):lt.none()}preconditionForUpdate(e){let t=this.readVersions.get(e.toString());if(!this.writtenDocs.has(e.toString())&&t){if(t.isEqual(te.min()))throw new j(k.INVALID_ARGUMENT,"Can't update a document that doesn't exist.");return lt.updateTime(t)}return lt.exists(!0)}write(e){this.ensureCommitNotCalled(),this.mutations.push(e)}ensureCommitNotCalled(){}};/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var id=class{constructor(e,t,n,s,i){this.asyncQueue=e,this.datastore=t,this.options=n,this.updateFunction=s,this.deferred=i,this.eE=n.maxAttempts,this._r=new Ba(this.asyncQueue,"transaction_retry")}tE(){this.eE-=1,this.nE()}nE(){this._r.Yn((async()=>{let e=new sd(this.datastore),t=this.rE(e);t&&t.then((n=>{this.asyncQueue.enqueueAndForget((()=>e.commit().then((()=>{this.deferred.resolve(n)})).catch((s=>{this.iE(s)}))))})).catch((n=>{this.iE(n)}))}))}rE(e){try{let t=this.updateFunction(e);return!Pa(t)&&t.catch&&t.then?t:(this.deferred.reject(Error("Transaction callback must return a Promise")),null)}catch(t){return this.deferred.reject(t),null}}iE(e){this.eE>0&&this.sE(e)?(this.eE-=1,this.asyncQueue.enqueueAndForget((()=>(this.nE(),Promise.resolve())))):this.deferred.reject(e)}sE(e){if(e?.name==="FirebaseError"){let t=e.code;return t==="aborted"||t==="failed-precondition"||t==="already-exists"||!wE(t)}return!1}};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var qn="FirestoreClient",ad=class{constructor(e,t,n,s,i){this.authCredentials=e,this.appCheckCredentials=t,this.asyncQueue=n,this._databaseInfo=s,this.user=je.UNAUTHENTICATED,this.clientId=gs.newId(),this.authCredentialListener=()=>Promise.resolve(),this.appCheckCredentialListener=()=>Promise.resolve(),this._uninitializedComponentsProvider=i,this.authCredentials.start(n,(async a=>{K(qn,"Received user=",a.uid),await this.authCredentialListener(a),this.user=a})),this.appCheckCredentials.start(n,(a=>(K(qn,"Received new app check token=",a),this.appCheckCredentialListener(a,this.user))))}get configuration(){return{asyncQueue:this.asyncQueue,databaseInfo:this._databaseInfo,clientId:this.clientId,authCredentials:this.authCredentials,appCheckCredentials:this.appCheckCredentials,initialUser:this.user,maxConcurrentLimboResolutions:100}}setCredentialChangeListener(e){this.authCredentialListener=e}setAppCheckTokenChangeListener(e){this.appCheckCredentialListener=e}terminate(){this.asyncQueue.enterRestrictedMode();let e=new kt;return this.asyncQueue.enqueueAndForgetEvenWhileRestricted((async()=>{try{this._onlineComponents&&await this._onlineComponents.terminate(),this._offlineComponents&&await this._offlineComponents.terminate(),this.authCredentials.shutdown(),this.appCheckCredentials.shutdown(),e.resolve()}catch(t){let n=Rd(t,"Failed to shutdown persistence");e.reject(n)}})),e.promise}};async function fB(r,e){r.asyncQueue.verifyOperationInProgress(),K(qn,"Initializing OfflineComponentProvider");let t=r.configuration;await e.initialize(t);let n=t.initialUser;r.setCredentialChangeListener((async s=>{n.isEqual(s)||(await g_(e.localStore,s),n=s)})),e.persistence.setDatabaseDeletedListener((()=>r.terminate())),r._offlineComponents=e}async function Mm(r,e){r.asyncQueue.verifyOperationInProgress();let t=await mA(r);K(qn,"Initializing OnlineComponentProvider"),await e.initialize(t,r.configuration),r.setCredentialChangeListener((n=>Fm(e.remoteStore,n))),r.setAppCheckTokenChangeListener(((n,s)=>Fm(e.remoteStore,s))),r._onlineComponents=e}async function mA(r){if(!r._offlineComponents)if(r._uninitializedComponentsProvider){K(qn,"Using user provided OfflineComponentProvider");try{await fB(r,r._uninitializedComponentsProvider._offline)}catch(e){let t=e;if(!(function(s){return s.name==="FirebaseError"?s.code===k.FAILED_PRECONDITION||s.code===k.UNIMPLEMENTED:!(typeof DOMException<"u"&&s instanceof DOMException)||s.code===22||s.code===20||s.code===11})(t))throw t;Pt("Error using user provided cache. Falling back to memory cache: "+t),await fB(r,new Hr)}}else K(qn,"Using default OfflineComponentProvider"),await fB(r,new nc(void 0));return r._offlineComponents}async function Od(r){return r._onlineComponents||(r._uninitializedComponentsProvider?(K(qn,"Using user provided OnlineComponentProvider"),await Mm(r,r._uninitializedComponentsProvider._online)):(K(qn,"Using default OnlineComponentProvider"),await Mm(r,new Ks))),r._onlineComponents}function EA(r){return Od(r).then((e=>e.syncEngine))}function _A(r){return Od(r).then((e=>e.datastore))}async function od(r){let e=await Od(r),t=e.eventManager;return t.onListen=iA.bind(null,e.syncEngine),t.onUnlisten=uA.bind(null,e.syncEngine),t.onFirstRemoteStoreListen=aA.bind(null,e.syncEngine),t.onLastRemoteStoreUnlisten=cA.bind(null,e.syncEngine),t}function O_(r,e,t,n){let s=new $u(n),i=new Zu(e,s,t);return r.asyncQueue.enqueueAndForget((async()=>T_(await od(r),i))),()=>{s.Bu(),r.asyncQueue.enqueueAndForget((async()=>A_(await od(r),i)))}}function x_(r,e,t={}){let n=new kt;return r.asyncQueue.enqueueAndForget((async()=>(function(i,a,u,c,l){let h=new $u({next:C=>{h.Bu(),a.enqueueAndForget((()=>A_(i,d)));let y=C.docs.has(u);!y&&C.fromCache?l.reject(new j(k.UNAVAILABLE,"Failed to get document because the client is offline.")):y&&C.fromCache&&c&&c.source==="server"?l.reject(new j(k.UNAVAILABLE,'Failed to get document from server. (However, this document does exist in the local cache. Run again without setting source to "server" to retrieve the cached document.)')):l.resolve(C)},error:C=>l.reject(C)}),d=new Zu(Oa(u.path),h,{includeMetadataChanges:!0,waitForSyncWhenOnline:!0});return T_(i,d)})(await od(r),r.asyncQueue,e,t,n))),n.promise}function F_(r,e){let t=new kt;return r.asyncQueue.enqueueAndForget((async()=>lA(await EA(r),e,t))),t.promise}function L_(r,e,t){let n=new kt;return r.asyncQueue.enqueueAndForget((async()=>{let s=await _A(r);new id(r.asyncQueue,s,t,e,n).tE()})),n.promise}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var La=class{constructor(e,t,n,s,i){this._firestore=e,this._userDataWriter=t,this._key=n,this._document=s,this._converter=i}get id(){return this._key.path.lastSegment()}get ref(){return new Se(this._firestore,this._converter,this._key)}exists(){return this._document!==null}data(){if(this._document){if(this._converter){let e=new yA(this._firestore,this._userDataWriter,this._key,this._document,null);return this._converter.fromFirestore(e)}return this._userDataWriter.convertValue(this._document.data.value)}}_fieldsProto(){return this._document?.data.clone().value.mapValue.fields??void 0}get(e){if(this._document){let t=this._document.data.field(kr("DocumentSnapshot.get",e));if(t!==null)return this._userDataWriter.convertValue(t)}}},yA=class extends La{data(){return super.data()}};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var ba=class{convertValue(e,t="none"){switch(Pe(e)){case 0:return null;case 2:return e.booleanValue;case 3:if("mapValue"in e){if(kn(e))return this.convertToInt32Value(e.mapValue);if(Ot(e))return this.convertToDecimal128Value(e.mapValue)}return ge(e.integerValue||e.doubleValue);case 4:return this.convertTimestamp(e.timestampValue);case 6:return this.convertServerTimestamp(e,t);case 7:return e.stringValue;case 8:return"bytesValue"in e?this.convertBytes(Lt(e.bytesValue)):this.convertToBytesWithSubtype(e.mapValue);case 9:return this.convertReference(e.referenceValue);case 11:return this.convertGeoPoint(e.geoPointValue);case 13:return this.convertArray(e.arrayValue,t);case 15:return this.convertObject(e.mapValue,t);case 14:return this.convertVectorValue(e.mapValue);case 12:return this.convertToRegexValue(e.mapValue);case 10:return this.convertToBsonObjectId(e.mapValue);case 5:return this.convertToBsonTimestamp(e.mapValue);case 16:return xr.instance();case 1:return Fr.instance();default:throw $(62114,{value:e})}}convertObject(e,t){return this.convertObjectMap(e.fields,t)}convertObjectMap(e,t="none"){let n={};return jn(e,((s,i)=>{n[s]=this.convertValue(i,t)})),n}convertVectorValue(e){let t=e.fields?.[yr].arrayValue?.values?.map((n=>ge(n.doubleValue)));return new Dt(t)}convertToBsonObjectId(e){let t=e.fields?.[wr]?.stringValue??"";return new Os(t)}convertToBytesWithSubtype(e){let t=e.fields?.[Is],n=t?.bytesValue;if(!n)throw new Error("Received incorrect bytesValue for Bytes with subtype");let s=Lt(n).toUint8Array();if(s.length===0)throw new Error("Received empty bytesValue for Bytes with subtype");let i=s[0],a=s.slice(1);return new wt(Ee.fromUint8Array(a),i)}convertToBsonTimestamp(e){let t=e.fields?.[Bn],n=Number(t?.mapValue?.fields?.[ea]?.integerValue),s=Number(t?.mapValue?.fields?.[ta]?.integerValue);return new xs(n,s)}convertToRegexValue(e){let t=e.fields?.[zt]?.mapValue?.fields?.[ws]?.stringValue??"",n=e.fields?.[zt]?.mapValue?.fields?.[Ds]?.stringValue??"";return new Vs(t,n)}convertToInt32Value(e){let t=Number(e.fields?.[Kn]?.integerValue);return new Ls(t)}convertToDecimal128Value(e){let t=e.fields?.[En]?.stringValue??"";return new Fs(t)}convertGeoPoint(e){return new fn(ge(e.latitude),ge(e.longitude))}convertArray(e,t){return(e.values||[]).map((n=>this.convertValue(n,t)))}convertServerTimestamp(e,t){switch(t){case"previous":let n=Sa(e);return n==null?null:this.convertValue(n,t);case"estimate":return this.convertTimestamp(_s(e));default:return null}}convertTimestamp(e){let t=mn(e);return new ye(t.seconds,t.nanos)}convertDocumentKey(e,t){let n=he.fromString(e);z(OE(n),9688,{name:e});let s=new Zi(n.get(1),n.get(3)),i=new X(n.popFirst(5));return s.isEqual(t)||gn(`A document reference to ${i} refers to a different database (${s.projectId}/${s.database}), which is not supported. It will be treated as a reference in the current database (${t.projectId}/${t.database}) instead.`),i}};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function xd(r,e,t){let n;return n=r?t&&(t.merge||t.mergeFields)?r.toFirestore(e,t):r.toFirestore(e):e,n}var rc=class extends ba{constructor(e){super(),this.firestore=e}convertBytes(e){return new wt(e)}convertReference(e){let t=this.convertDocumentKey(e,this.firestore._databaseId);return new Se(this.firestore,null,t)}};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var Gm="AsyncQueue",sc=class{constructor(e=Promise.resolve()){this._E=[],this.oE=!1,this.aE=[],this.uE=null,this.cE=!1,this.lE=!1,this.EE=[],this._r=new Ba(this,"async_queue_retry"),this.hE=()=>{let n=hB();n&&K(Gm,"Visibility state changed to "+n.visibilityState),this._r.Xn()},this.TE=e;let t=hB();t&&typeof t.addEventListener=="function"&&t.addEventListener("visibilitychange",this.hE)}get isShuttingDown(){return this.oE}enqueueAndForget(e){this.enqueue(e)}enqueueAndForgetEvenWhileRestricted(e){this.PE(),this.IE(e)}enterRestrictedMode(e){if(!this.oE){this.oE=!0,this.lE=e||!1;let t=hB();t&&typeof t.removeEventListener=="function"&&t.removeEventListener("visibilitychange",this.hE)}}enqueue(e){if(this.PE(),this.oE)return new Promise((()=>{}));let t=new kt;return this.IE((()=>this.oE&&this.lE?Promise.resolve():(e().then(t.resolve,t.reject),t.promise))).then((()=>t.promise))}enqueueRetryable(e){this.enqueueAndForget((()=>(this._E.push(e),this.RE())))}async RE(){if(this._E.length!==0){try{await this._E[0](),this._E.shift(),this._r.reset()}catch(e){if(!Qs(e))throw e;K(Gm,"Operation failed with retryable error: "+e)}this._E.length>0&&this._r.Yn((()=>this.RE()))}}IE(e){let t=this.TE.then((()=>(this.cE=!0,e().catch((n=>{throw this.uE=n,this.cE=!1,gn("INTERNAL UNHANDLED ERROR: ",Um(n)),n})).then((n=>(this.cE=!1,n))))));return this.TE=t,t}enqueueAfterDelay(e,t,n){this.PE(),this.EE.indexOf(e)>-1&&(t=0);let s=Wf.createAndSchedule(this,e,t,n,(i=>this.AE(i)));return this.aE.push(s),s}PE(){this.uE&&$(47125,{VE:Um(this.uE)})}verifyOperationInProgress(){}async dE(){let e;do e=this.TE,await e;while(e!==this.TE)}fE(e){for(let t of this.aE)if(t.timerId===e)return!0;return!1}mE(e){return this.dE().then((()=>{this.aE.sort(((t,n)=>t.targetTimeMs-n.targetTimeMs));for(let t of this.aE)if(t.skipDelay(),e!=="all"&&t.timerId===e)break;return this.dE()}))}pE(e){this.EE.push(e)}AE(e){let t=this.aE.indexOf(e);this.aE.splice(t,1)}};function Um(r){let e=r.message||"";return r.stack&&(e=r.stack.includes(r.message)?r.stack:r.message+`
`+r.stack),e}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var nn=class extends hc{constructor(e,t,n,s){super(e,t,n,s),this.type="firestore",this._queue=new sc,this._persistenceKey=s?.name||"[DEFAULT]"}async _terminate(){if(this._firestoreClient){let e=this._firestoreClient.terminate();this._queue=new sc(e),this._firestoreClient=void 0,await e}}};function Fd(r,e){let t=typeof r=="object"?r:Bl(),n=typeof r=="string"?r:e||fu,s=co(t,"firestore").getImmediate({identifier:n});if(!s._initialized){let i=Jp("firestore");i&&ME(s,...i)}return s}function ka(r){if(r._terminated)throw new j(k.FAILED_PRECONDITION,"The client has already been terminated.");return r._firestoreClient||wA(r),r._firestoreClient}function wA(r){let e=r._freezeSettings(),t=XT(r._databaseId,r._app?.options.appId||"",r._persistenceKey,r._app?.options.apiKey,e);r._componentsProvider||e.localCache?._offlineComponentProvider&&e.localCache?._onlineComponentProvider&&(r._componentsProvider={_offline:e.localCache._offlineComponentProvider,_online:e.localCache._onlineComponentProvider}),r._firestoreClient=new ad(r._authCredentials,r._appCheckCredentials,r._queue,t,r._componentsProvider&&(function(s){let i=s?._online.build();return{_offline:s?._offline.build(i),_online:i}})(r._componentsProvider))}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var Js=class extends ba{constructor(e){super(),this.firestore=e}convertBytes(e){return new wt(e)}convertReference(e){let t=this.convertDocumentKey(e,this.firestore._databaseId);return new Se(this.firestore,null,t)}};/**
 * @license
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var hn=class{constructor(e,t){this.hasPendingWrites=e,this.fromCache=t}isEqual(e){return this.hasPendingWrites===e.hasPendingWrites&&this.fromCache===e.fromCache}},Cn=class r extends La{constructor(e,t,n,s,i,a){super(e,t,n,s,a),this._firestore=e,this._firestoreImpl=e,this.metadata=i}exists(){return super.exists()}data(e={}){if(this._document){if(this._converter){let t=new gr(this._firestore,this._userDataWriter,this._key,this._document,this.metadata,null);return this._converter.fromFirestore(t,e)}return this._userDataWriter.convertValue(this._document.data.value,e.serverTimestamps)}}get(e,t={}){if(this._document){let n=this._document.data.field(kr("DocumentSnapshot.get",e));if(n!==null)return this._userDataWriter.convertValue(n,t.serverTimestamps)}}toJSON(){if(this.metadata.hasPendingWrites)throw new j(k.FAILED_PRECONDITION,"DocumentSnapshot.toJSON() attempted to serialize a document with pending writes. Await waitForPendingWrites() before invoking toJSON().");let e=this._document,t={};return t.type=r._jsonSchemaVersion,t.bundle="",t.bundleSource="DocumentSnapshot",t.bundleName=this._key.toString(),!e||!e.isValidDocument()||!e.isFoundDocument()?t:(this._userDataWriter.convertObjectMap(e.data.value.mapValue.fields,"previous"),t.bundle=(this._firestore,this.ref.path,"NOT SUPPORTED"),t)}};Cn._jsonSchemaVersion="firestore/documentSnapshot/1.0",Cn._jsonSchema={type:Ae("string",Cn._jsonSchemaVersion),bundleSource:Ae("string","DocumentSnapshot"),bundleName:Ae("string"),bundle:Ae("string")};var gr=class extends Cn{data(e={}){return super.data(e)}},mr=class r{constructor(e,t,n,s){this._firestore=e,this._userDataWriter=t,this._snapshot=s,this.metadata=new hn(s.hasPendingWrites,s.fromCache),this.query=n}get docs(){let e=[];return this.forEach((t=>e.push(t))),e}get size(){return this._snapshot.docs.size}get empty(){return this.size===0}forEach(e,t){this._snapshot.docs.forEach((n=>{e.call(t,new gr(this._firestore,this._userDataWriter,n.key,n,new hn(this._snapshot.mutatedKeys.has(n.key),this._snapshot.fromCache),this.query.converter))}))}docChanges(e={}){let t=!!e.includeMetadataChanges;if(t&&this._snapshot.excludesMetadataChanges)throw new j(k.INVALID_ARGUMENT,"To include metadata changes with your document changes, you must also pass { includeMetadataChanges:true } to onSnapshot().");return this._cachedChanges&&this._cachedChangesIncludeMetadataChanges===t||(this._cachedChanges=(function(s,i){if(s._snapshot.oldDocs.isEmpty()){let a=0;return s._snapshot.docChanges.map((u=>{xe(s._snapshot.query)?bf(s._snapshot.query):fd(s.query._query);let c=new gr(s._firestore,s._userDataWriter,u.doc.key,u.doc,new hn(s._snapshot.mutatedKeys.has(u.doc.key),s._snapshot.fromCache),s.query.converter);return u.doc,{type:"added",doc:c,oldIndex:-1,newIndex:a++}}))}{let a=s._snapshot.oldDocs;return s._snapshot.docChanges.filter((u=>i||u.type!==3)).map((u=>{let c=new gr(s._firestore,s._userDataWriter,u.doc.key,u.doc,new hn(s._snapshot.mutatedKeys.has(u.doc.key),s._snapshot.fromCache),s.query.converter),l=-1,h=-1;return u.type!==0&&(l=a.indexOf(u.doc.key),a=a.delete(u.doc.key)),u.type!==1&&(a=a.add(u.doc),h=a.indexOf(u.doc.key)),{type:DA(u.type),doc:c,oldIndex:l,newIndex:h}}))}})(this,t),this._cachedChangesIncludeMetadataChanges=t),this._cachedChanges}toJSON(){if(this.metadata.hasPendingWrites)throw new j(k.FAILED_PRECONDITION,"QuerySnapshot.toJSON() attempted to serialize a document with pending writes. Await waitForPendingWrites() before invoking toJSON().");let e={};e.type=r._jsonSchemaVersion,e.bundleSource="QuerySnapshot",e.bundleName=gs.newId(),this._firestore._databaseId.database,this._firestore._databaseId.projectId;let t=[],n=[],s=[];return this.docs.forEach((i=>{i._document!==null&&(t.push(i._document),n.push(this._userDataWriter.convertObjectMap(i._document.data.value.mapValue.fields,"previous")),s.push(i.ref.path))})),e.bundle=(this._firestore,this.query._query,e.bundleName,"NOT SUPPORTED"),e}};function DA(r){switch(r){case 0:return"added";case 2:case 3:return"modified";case 1:return"removed";default:return $(61501,{type:r})}}/**
 * @license
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */mr._jsonSchemaVersion="firestore/querySnapshot/1.0",mr._jsonSchema={type:Ae("string",mr._jsonSchemaVersion),bundleSource:Ae("string","QuerySnapshot"),bundleName:Ae("string"),bundle:Ae("string")};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function IA(r){if(r.limitType==="L"&&r.explicitOrderBy.length===0)throw new j(k.UNIMPLEMENTED,"limitToLast() queries require specifying at least one orderBy() clause")}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function k_(r){return(function(t,n){if(typeof t!="object"||t===null)return!1;let s=t;for(let i of n)if(i in s&&typeof s[i]=="function")return!0;return!1})(r,["next","error","complete"])}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var TA={maxAttempts:5};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Va(r,e){if((r=Oe(r)).firestore!==e)throw new j(k.INVALID_ARGUMENT,"Provided document reference is from a different Firestore instance.");return r}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var AA=class{constructor(e,t){this._firestore=e,this._transaction=t,this._dataReader=gd(e)}get(e){let t=Va(e,this._firestore),n=new rc(this._firestore);return this._transaction.lookup([t._key]).then((s=>{if(!s||s.length!==1)return $(24041);let i=s[0];if(i.isFoundDocument())return new La(this._firestore,n,i.key,i,t.converter);if(i.isNoDocument())return new La(this._firestore,n,t._key,null,t.converter);throw $(18433,{doc:i})}))}set(e,t,n){let s=Va(e,this._firestore),i=xd(s.converter,t,n),a=md(this._dataReader,"Transaction.set",s._key,i,s.converter!==null,n);return this._transaction.set(s._key,a),this}update(e,t,n,...s){let i=Va(e,this._firestore),a;return a=typeof(t=Oe(t))=="string"||t instanceof Nr?HE(this._dataReader,"Transaction.update",i._key,t,n,s):UE(this._dataReader,"Transaction.update",i._key,t),this._transaction.update(i._key,a),this}delete(e){let t=Va(e,this._firestore);return this._transaction.delete(t._key),this}};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var Ld=class extends AA{constructor(e,t){super(e,t),this._firestore=e}get(e){let t=Va(e,this._firestore),n=new Js(this._firestore);return super.get(e).then((s=>new Cn(this._firestore,n,t._key,s._document,new hn(!1,!1),t.converter)))}};function kd(r,e,t){r=Mt(r,nn);let n={...TA,...t};(function(a){if(a.maxAttempts<1)throw new j(k.INVALID_ARGUMENT,"Max attempts must be at least 1")})(n);let s=ka(r);return L_(s,(i=>e(new Ld(r,i))),n)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ma(r){r=Mt(r,Se);let e=Mt(r.firestore,nn),t=ka(e);return x_(t,r._key,{source:"server"}).then((n=>j_(e,r,n)))}function G_(r,e,t){r=Mt(r,Se);let n=Mt(r.firestore,nn),s=xd(r.converter,e,t),i=gd(n);return q_(n,[md(i,"setDoc",r._key,s,r.converter!==null,t).toMutation(r._key,lt.none())])}function U_(r){return q_(Mt(r.firestore,nn),[new vr(r._key,lt.none())])}function H_(r,...e){r=Oe(r);let t={includeMetadataChanges:!1,source:"default"},n=0;typeof e[n]!="object"||k_(e[n])||(t=e[n++]);let s={includeMetadataChanges:t.includeMetadataChanges,source:t.source};if(k_(e[n])){let l=e[n];e[n]=l.next?.bind(l),e[n+1]=l.error?.bind(l),e[n+2]=l.complete?.bind(l)}let i,a,u;if(r instanceof Se)a=Mt(r.firestore,nn),u=Oa(r._key.path),i={next:l=>{e[n]&&e[n](j_(a,r,l))},error:e[n+1],complete:e[n+2]};else{let l=Mt(r,ha);a=Mt(l.firestore,nn),u=l._query;let h=new Js(a);i={next:d=>{e[n]&&e[n](new mr(a,h,l,d))},error:e[n+1],complete:e[n+2]},IA(r._query)}let c=ka(a);return O_(c,u,s,i)}function q_(r,e){let t=ka(r);return F_(t,e)}function j_(r,e,t){let n=t.docs.get(e._key),s=new Js(r);return new Cn(r,s,e._key,n,new hn(t.hasPendingWrites,t.fromCache),e.converter)}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var V_="@firebase/firestore",M_="4.20.0";(function(e,t=!0){Hm(Pn),Sn(new Tt("firestore",((n,{instanceIdentifier:s,options:i})=>{let a=n.getProvider("app").getImmediate(),u=new nn(new Tu(n.getProvider("auth-internal")),new bu(a,n.getProvider("app-check-internal")),Xm(a,s),a);return i={useFetchStreams:t,...i},u._setSettings(i),u}),"PUBLIC").setMultipleInstances(!0)),xt(V_,M_,e),xt(V_,M_,"esm2020")})();var K_=ll({apiKey:"AIzaSyB8Yla5zv0r2i8pVqVVPB7W78feo69i99c",authDomain:"trnasfer-2982c.firebaseapp.com",projectId:"trnasfer-2982c",appId:"1:285593725279:web:a89cd45fadb20817416eea"}),Ga=Gl(K_,{persistence:Uo}),Ys=Fd(K_);async function MS(){return await Ga.authStateReady(),Ga.currentUser}async function GS(){let r=new sr;return r.setCustomParameters({prompt:"select_account"}),(await ql(Ga,r,jl)).user}var US=()=>Ul(Ga);async function HS(r){if(!r)return!1;let e=await Ma(qr(Ys,"counselors",r.email));return e.data()?.active===!0&&e.data()?.quotaAdmin===!0}var Vd=r=>qr(Ys,"quotaGuides2027",r),J_=(r,e,t)=>qr(r,"editions",e,"parts",String(t));async function qS(r){return(await Ma(Vd(r))).data()||null}async function jS(r,e){let t=[];for(let n=0;n<e.parts;n++){let s=await Ma(J_(Vd(r),e.version,n));if(!s.exists())throw Error("\uACF5\uAC1C\uB41C \uBAA8\uC9D1\uD45C \uD30C\uC77C\uC744 \uD655\uC778\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.");t.push(s.data().pdf.toUint8Array())}return new Blob(t,{type:"application/pdf"})}async function KS(r,e,t){let n=Vd(r.school),s=crypto.randomUUID(),i=512*1024,a=Math.ceil(e.length/i),u=[];try{for(let c=0;c<a;c++){let l=J_(n,s,c);await G_(l,{pdf:wt.fromUint8Array(e.subarray(c*i,(c+1)*i))}),u.push(l)}await kd(Ys,async c=>{if(((await c.get(n)).data()?.version||null)!==t)throw Error("\uB2E4\uB978 \uAD00\uB9AC\uC790\uAC00 \uC774 \uD559\uAD50 \uC790\uB8CC\uB97C \uAC31\uC2E0\uD588\uC2B5\uB2C8\uB2E4. \uB2E4\uC2DC \uBBF8\uB9AC\uBCF4\uAE30\uD574 \uC8FC\uC138\uC694.");c.set(n,{...r,version:s,parts:a,publishedAt:fc()})})}catch(c){throw await Promise.allSettled(u.map(l=>U_(l))),c}}async function JS(r){let e=await Ma(qr(Ys,"counselors",r.email));return e.exists()&&e.data().active===!0}function z_(r){if(!/^[a-f0-9]{64}$/.test(r))throw Error("\uD559\uC0DD \uC2DD\uBCC4 \uC815\uBCF4\uB97C \uD655\uC778\uD574 \uC8FC\uC138\uC694.");return Cd(Ys,"cycles","2027","students",r,"applications")}var W_=r=>[r.school,r.campus,r.department,r.field,r.track].join("|");function zS(r,e,t){return H_(z_(r),{includeMetadataChanges:!0},n=>{n.metadata.fromCache||n.metadata.hasPendingWrites||e(new Set(n.docs.filter(s=>s.data().confirmed).map(s=>W_(s.data()))))},t)}async function WS(r,e,t){let n=Ga.currentUser;if(!n)throw Error("\uC5C5\uBB34 \uACC4\uC815\uC73C\uB85C \uB85C\uADF8\uC778\uD574 \uC8FC\uC138\uC694.");let s=await crypto.subtle.digest("SHA-256",new TextEncoder().encode(W_(e))),i=Array.from(new Uint8Array(s),u=>u.toString(16).padStart(2,"0")).join(""),a=qr(z_(r),i);await kd(Ys,async u=>{let c=await u.get(a);if(c.data()?.confirmed===!0===t)return;let l={confirmed:t,updatedBy:n.uid,updatedAt:fc()};c.exists()?u.update(a,t?{...l,verdict:e.verdict}:l):u.set(a,{...e,...l})})}export{MS as account,JS as authorized,W_ as keyOf,GS as login,US as logout,KS as publishQuota,HS as quotaAdmin,jS as quotaExcerpt,qS as quotaGuide,WS as save,zS as subscribe};
