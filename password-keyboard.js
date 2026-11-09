/* Match Korean two-set keyboard input without shipping a password or alias. */
(function(root){
'use strict';
const initial=['r','R','s','e','E','f','a','q','Q','t','T','d','w','W','c','z','x','v','g'];
const medial=['k','o','i','O','j','p','u','P','h','hk','ho','hl','y','n','nj','np','nl','b','m','ml','l'];
const final=['','r','R','rt','s','sw','sg','e','f','fr','fa','fq','ft','fx','fv','fg','a','q','qt','t','T','d','w','c','z','x','v','g'];
function keyboardPassword(value){
  return Array.from(value.normalize('NFC'),char=>{
    const n=char.codePointAt(0)-0xac00;
    return n>=0&&n<11172?initial[Math.floor(n/588)]+medial[Math.floor(n%588/28)]+final[n%28]:char;
  }).join('');
}
if(typeof module==='object'&&module.exports)module.exports=keyboardPassword;
else root.keyboardPassword=keyboardPassword;
})(typeof window==='object'?window:globalThis);
