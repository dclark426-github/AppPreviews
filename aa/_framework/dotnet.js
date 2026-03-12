//! Licensed to the .NET Foundation under one or more agreements.
//! The .NET Foundation licenses this file to you under the MIT license.

var e=!1;const t=async()=>WebAssembly.validate(new Uint8Array([0,97,115,109,1,0,0,0,1,4,1,96,0,0,3,2,1,0,10,8,1,6,0,6,64,25,11,11])),o=async()=>WebAssembly.validate(new Uint8Array([0,97,115,109,1,0,0,0,1,5,1,96,0,1,123,3,2,1,0,10,15,1,13,0,65,1,253,15,65,2,253,15,253,128,2,11])),n=async()=>WebAssembly.validate(new Uint8Array([0,97,115,109,1,0,0,0,1,5,1,96,0,1,123,3,2,1,0,10,10,1,8,0,65,0,253,15,253,98,11])),r=Symbol.for("wasm promise_control");function i(e,t){let o=null;const n=new Promise((function(n,r){o={isDone:!1,promise:null,resolve:t=>{o.isDone||(o.isDone=!0,n(t),e&&e())},reject:e=>{o.isDone||(o.isDone=!0,r(e),t&&t())}}}));o.promise=n;const i=n;return i[r]=o,{promise:i,promise_control:o}}function s(e){return e[r]}function a(e){e&&function(e){return void 0!==e[r]}(e)||Be(!1,"Promise is not controllable")}const l="__mono_message__",c=["debug","log","trace","warn","info","error"],d="MONO_WASM: ";let u,f,m,g,p,h;function w(e){g=e}function b(e){if(Pe.diagnosticTracing){const t="function"==typeof e?e():e;console.debug(d+t)}}function y(e,...t){console.info(d+e,...t)}function v(e,...t){console.info(e,...t)}function E(e,...t){console.warn(d+e,...t)}function _(e,...t){if(t&&t.length>0&&t[0]&&"object"==typeof t[0]){if(t[0].silent)return;if(t[0].toString)return void console.error(d+e,t[0].toString())}console.error(d+e,...t)}function x(e,t,o){return function(...n){try{let r=n[0];if(void 0===r)r="undefined";else if(null===r)r="null";else if("function"==typeof r)r=r.toString();else if("string"!=typeof r)try{r=JSON.stringify(r)}catch(e){r=r.toString()}t(o?JSON.stringify({method:e,payload:r,arguments:n.slice(1)}):[e+r,...n.slice(1)])}catch(e){m.error(`proxyConsole failed: ${e}`)}}}function j(e,t,o){f=t,g=e,m={...t};const n=`${o}/console`.replace("https://","wss://").replace("http://","ws://");u=new WebSocket(n),u.addEventListener("error",A),u.addEventListener("close",S),function(){for(const e of c)f[e]=x(`console.${e}`,T,!0)}()}function R(e){let t=30;const o=()=>{u?0==u.bufferedAmount||0==t?(e&&v(e),function(){for(const e of c)f[e]=x(`console.${e}`,m.log,!1)}(),u.removeEventListener("error",A),u.removeEventListener("close",S),u.close(1e3,e),u=void 0):(t--,globalThis.setTimeout(o,100)):e&&m&&m.log(e)};o()}function T(e){u&&u.readyState===WebSocket.OPEN?u.send(e):m.log(e)}function A(e){m.error(`[${g}] proxy console websocket error: ${e}`,e)}function S(e){m.debug(`[${g}] proxy console websocket closed: ${e}`,e)}function D(){Pe.preferredIcuAsset=O(Pe.config);let e="invariant"==Pe.config.globalizationMode;if(!e)if(Pe.preferredIcuAsset)Pe.diagnosticTracing&&b("ICU data archive(s) available, disabling invariant mode");else{if("custom"===Pe.config.globalizationMode||"all"===Pe.config.globalizationMode||"sharded"===Pe.config.globalizationMode){const e="invariant globalization mode is inactive and no ICU data archives are available";throw _(`ERROR: ${e}`),new Error(e)}Pe.diagnosticTracing&&b("ICU data archive(s) not available, using invariant globalization mode"),e=!0,Pe.preferredIcuAsset=null}const t="DOTNET_SYSTEM_GLOBALIZATION_INVARIANT",o=Pe.config.environmentVariables;if(void 0===o[t]&&e&&(o[t]="1"),void 0===o.TZ)try{const e=Intl.DateTimeFormat().resolvedOptions().timeZone||null;e&&(o.TZ=e)}catch(e){y("failed to detect timezone, will fallback to UTC")}}function O(e){var t;if((null===(t=e.resources)||void 0===t?void 0:t.icu)&&"invariant"!=e.globalizationMode){const t=e.applicationCulture||(ke?globalThis.navigator&&globalThis.navigator.languages&&globalThis.navigator.languages[0]:Intl.DateTimeFormat().resolvedOptions().locale),o=e.resources.icu;let n=null;if("custom"===e.globalizationMode){if(o.length>=1)return o[0].name}else t&&"all"!==e.globalizationMode?"sharded"===e.globalizationMode&&(n=function(e){const t=e.split("-")[0];return"en"===t||["fr","fr-FR","it","it-IT","de","de-DE","es","es-ES"].includes(e)?"icudt_EFIGS.dat":["zh","ko","ja"].includes(t)?"icudt_CJK.dat":"icudt_no_CJK.dat"}(t)):n="icudt.dat";if(n)for(let e=0;e<o.length;e++){const t=o[e];if(t.virtualPath===n)return t.name}}return e.globalizationMode="invariant",null}(new Date).valueOf();const C=class{constructor(e){this.url=e}toString(){return this.url}};async function k(e,t){try{const o="function"==typeof globalThis.fetch;if(Se){const n=e.startsWith("file://");if(!n&&o)return globalThis.fetch(e,t||{credentials:"same-origin"});p||(h=Ne.require("url"),p=Ne.require("fs")),n&&(e=h.fileURLToPath(e));const r=await p.promises.readFile(e);return{ok:!0,headers:{length:0,get:()=>null},url:e,arrayBuffer:()=>r,json:()=>JSON.parse(r),text:()=>{throw new Error("NotImplementedException")}}}if(o)return globalThis.fetch(e,t||{credentials:"same-origin"});if("function"==typeof read)return{ok:!0,url:e,headers:{length:0,get:()=>null},arrayBuffer:()=>new Uint8Array(read(e,"binary")),json:()=>JSON.parse(read(e,"utf8")),text:()=>read(e,"utf8")}}catch(t){return{ok:!1,url:e,status:500,headers:{length:0,get:()=>null},statusText:"ERR28: "+t,arrayBuffer:()=>{throw t},json:()=>{throw t},text:()=>{throw t}}}throw new Error("No fetch implementation available")}function I(e){return"string"!=typeof e&&Be(!1,"url must be a string"),!M(e)&&0!==e.indexOf("./")&&0!==e.indexOf("../")&&globalThis.URL&&globalThis.document&&globalThis.document.baseURI&&(e=new URL(e,globalThis.document.baseURI).toString()),e}const U=/^[a-zA-Z][a-zA-Z\d+\-.]*?:\/\//,P=/[a-zA-Z]:[\\/]/;function M(e){return Se||Ie?e.startsWith("/")||e.startsWith("\\")||-1!==e.indexOf("///")||P.test(e):U.test(e)}let L,N=0;const $=[],z=[],W=new Map,F={"js-module-threads":!0,"js-module-runtime":!0,"js-module-dotnet":!0,"js-module-native":!0,"js-module-diagnostics":!0},B={...F,"js-module-library-initializer":!0},V={...F,dotnetwasm:!0,heap:!0,manifest:!0},q={...B,manifest:!0},H={...B,dotnetwasm:!0},J={dotnetwasm:!0,symbols:!0},Z={...B,dotnetwasm:!0,symbols:!0},Q={symbols:!0};function G(e){return!("icu"==e.behavior&&e.name!=Pe.preferredIcuAsset)}function K(e,t,o){null!=t||(t=[]),Be(1==t.length,`Expect to have one ${o} asset in resources`);const n=t[0];return n.behavior=o,X(n),e.push(n),n}function X(e){V[e.behavior]&&W.set(e.behavior,e)}function Y(e){Be(V[e],`Unknown single asset behavior ${e}`);const t=W.get(e);if(t&&!t.resolvedUrl)if(t.resolvedUrl=Pe.locateFile(t.name),F[t.behavior]){const e=ge(t);e?("string"!=typeof e&&Be(!1,"loadBootResource response for 'dotnetjs' type should be a URL string"),t.resolvedUrl=e):t.resolvedUrl=ce(t.resolvedUrl,t.behavior)}else if("dotnetwasm"!==t.behavior)throw new Error(`Unknown single asset behavior ${e}`);return t}function ee(e){const t=Y(e);return Be(t,`Single asset for ${e} not found`),t}let te=!1;async function oe(){if(!te){te=!0,Pe.diagnosticTracing&&b("mono_download_assets");try{const e=[],t=[],o=(e,t)=>{!Z[e.behavior]&&G(e)&&Pe.expected_instantiated_assets_count++,!H[e.behavior]&&G(e)&&(Pe.expected_downloaded_assets_count++,t.push(se(e)))};for(const t of $)o(t,e);for(const e of z)o(e,t);Pe.allDownloadsQueued.promise_control.resolve(),Promise.all([...e,...t]).then((()=>{Pe.allDownloadsFinished.promise_control.resolve()})).catch((e=>{throw Pe.err("Error in mono_download_assets: "+e),Xe(1,e),e})),await Pe.runtimeModuleLoaded.promise;const n=async e=>{const t=await e;if(t.buffer){if(!Z[t.behavior]){t.buffer&&"object"==typeof t.buffer||Be(!1,"asset buffer must be array-like or buffer-like or promise of these"),"string"!=typeof t.resolvedUrl&&Be(!1,"resolvedUrl must be string");const e=t.resolvedUrl,o=await t.buffer,n=new Uint8Array(o);pe(t),await Ue.beforeOnRuntimeInitialized.promise,Ue.instantiate_asset(t,e,n)}}else J[t.behavior]?("symbols"===t.behavior&&(await Ue.instantiate_symbols_asset(t),pe(t)),J[t.behavior]&&++Pe.actual_downloaded_assets_count):(t.isOptional||Be(!1,"Expected asset to have the downloaded buffer"),!H[t.behavior]&&G(t)&&Pe.expected_downloaded_assets_count--,!Z[t.behavior]&&G(t)&&Pe.expected_instantiated_assets_count--)},r=[],i=[];for(const t of e)r.push(n(t));for(const e of t)i.push(n(e));Promise.all(r).then((()=>{Ce||Ue.coreAssetsInMemory.promise_control.resolve()})).catch((e=>{throw Pe.err("Error in mono_download_assets: "+e),Xe(1,e),e})),Promise.all(i).then((async()=>{Ce||(await Ue.coreAssetsInMemory.promise,Ue.allAssetsInMemory.promise_control.resolve())})).catch((e=>{throw Pe.err("Error in mono_download_assets: "+e),Xe(1,e),e}))}catch(e){throw Pe.err("Error in mono_download_assets: "+e),e}}}let ne=!1;function re(){if(ne)return;ne=!0;const e=Pe.config,t=[];if(e.assets)for(const t of e.assets)"object"!=typeof t&&Be(!1,`asset must be object, it was ${typeof t} : ${t}`),"string"!=typeof t.behavior&&Be(!1,"asset behavior must be known string"),"string"!=typeof t.name&&Be(!1,"asset name must be string"),t.resolvedUrl&&"string"!=typeof t.resolvedUrl&&Be(!1,"asset resolvedUrl could be string"),t.hash&&"string"!=typeof t.hash&&Be(!1,"asset resolvedUrl could be string"),t.pendingDownload&&"object"!=typeof t.pendingDownload&&Be(!1,"asset pendingDownload could be object"),t.isCore?$.push(t):z.push(t),X(t);else if(e.resources){const o=e.resources;o.wasmNative||Be(!1,"resources.wasmNative must be defined"),o.jsModuleNative||Be(!1,"resources.jsModuleNative must be defined"),o.jsModuleRuntime||Be(!1,"resources.jsModuleRuntime must be defined"),K(z,o.wasmNative,"dotnetwasm"),K(t,o.jsModuleNative,"js-module-native"),K(t,o.jsModuleRuntime,"js-module-runtime"),o.jsModuleDiagnostics&&K(t,o.jsModuleDiagnostics,"js-module-diagnostics");const n=(e,t,o)=>{const n=e;n.behavior=t,o?(n.isCore=!0,$.push(n)):z.push(n)};if(o.coreAssembly)for(let e=0;e<o.coreAssembly.length;e++)n(o.coreAssembly[e],"assembly",!0);if(o.assembly)for(let e=0;e<o.assembly.length;e++)n(o.assembly[e],"assembly",!o.coreAssembly);if(0!=e.debugLevel&&Pe.isDebuggingSupported()){if(o.corePdb)for(let e=0;e<o.corePdb.length;e++)n(o.corePdb[e],"pdb",!0);if(o.pdb)for(let e=0;e<o.pdb.length;e++)n(o.pdb[e],"pdb",!o.corePdb)}if(e.loadAllSatelliteResources&&o.satelliteResources)for(const e in o.satelliteResources)for(let t=0;t<o.satelliteResources[e].length;t++){const r=o.satelliteResources[e][t];r.culture=e,n(r,"resource",!o.coreAssembly)}if(o.coreVfs)for(let e=0;e<o.coreVfs.length;e++)n(o.coreVfs[e],"vfs",!0);if(o.vfs)for(let e=0;e<o.vfs.length;e++)n(o.vfs[e],"vfs",!o.coreVfs);const r=O(e);if(r&&o.icu)for(let e=0;e<o.icu.length;e++){const t=o.icu[e];t.name===r&&n(t,"icu",!1)}if(o.wasmSymbols)for(let e=0;e<o.wasmSymbols.length;e++)n(o.wasmSymbols[e],"symbols",!1)}if(e.appsettings)for(let t=0;t<e.appsettings.length;t++){const o=e.appsettings[t],n=he(o);"appsettings.json"!==n&&n!==`appsettings.${e.applicationEnvironment}.json`||z.push({name:o,behavior:"vfs",cache:"no-cache",useCredentials:!0})}e.assets=[...$,...z,...t]}async function ie(e){const t=await se(e);return await t.pendingDownloadInternal.response,t.buffer}async function se(e){try{return await ae(e)}catch(t){if(!Pe.enableDownloadRetry)throw t;if(Ie||Se)throw t;if(e.pendingDownload&&e.pendingDownloadInternal==e.pendingDownload)throw t;if(e.resolvedUrl&&-1!=e.resolvedUrl.indexOf("file://"))throw t;if(t&&404==t.status)throw t;e.pendingDownloadInternal=void 0,await Pe.allDownloadsQueued.promise;try{return Pe.diagnosticTracing&&b(`Retrying download '${e.name}'`),await ae(e)}catch(t){return e.pendingDownloadInternal=void 0,await new Promise((e=>globalThis.setTimeout(e,100))),Pe.diagnosticTracing&&b(`Retrying download (2) '${e.name}' after delay`),await ae(e)}}}async function ae(e){for(;L;)await L.promise;try{++N,N==Pe.maxParallelDownloads&&(Pe.diagnosticTracing&&b("Throttling further parallel downloads"),L=i());const t=await async function(e){if(e.pendingDownload&&(e.pendingDownloadInternal=e.pendingDownload),e.pendingDownloadInternal&&e.pendingDownloadInternal.response)return e.pendingDownloadInternal.response;if(e.buffer){const t=await e.buffer;return e.resolvedUrl||(e.resolvedUrl="undefined://"+e.name),e.pendingDownloadInternal={url:e.resolvedUrl,name:e.name,response:Promise.resolve({ok:!0,arrayBuffer:()=>t,json:()=>JSON.parse(new TextDecoder("utf-8").decode(t)),text:()=>{throw new Error("NotImplementedException")},headers:{get:()=>{}}})},e.pendingDownloadInternal.response}const t=e.loadRemote&&Pe.config.remoteSources?Pe.config.remoteSources:[""];let o;for(let n of t){n=n.trim(),"./"===n&&(n="");const t=le(e,n);e.name===t?Pe.diagnosticTracing&&b(`Attempting to download '${t}'`):Pe.diagnosticTracing&&b(`Attempting to download '${t}' for ${e.name}`);try{e.resolvedUrl=t;const n=fe(e);if(e.pendingDownloadInternal=n,o=await n.response,!o||!o.ok)continue;return o}catch(e){o||(o={ok:!1,url:t,status:0,statusText:""+e});continue}}const n=e.isOptional||e.name.match(/\.pdb$/)&&Pe.config.ignorePdbLoadErrors;if(o||Be(!1,`Response undefined ${e.name}`),!n){const t=new Error(`download '${o.url}' for ${e.name} failed ${o.status} ${o.statusText}`);throw t.status=o.status,t}y(`optional download '${o.url}' for ${e.name} failed ${o.status} ${o.statusText}`)}(e);return t?(J[e.behavior]||(e.buffer=await t.arrayBuffer(),++Pe.actual_downloaded_assets_count),e):e}finally{if(--N,L&&N==Pe.maxParallelDownloads-1){Pe.diagnosticTracing&&b("Resuming more parallel downloads");const e=L;L=void 0,e.promise_control.resolve()}}}function le(e,t){let o;return null==t&&Be(!1,`sourcePrefix must be provided for ${e.name}`),e.resolvedUrl?o=e.resolvedUrl:(o=""===t?"assembly"===e.behavior||"pdb"===e.behavior?e.name:"resource"===e.behavior&&e.culture&&""!==e.culture?`${e.culture}/${e.name}`:e.name:t+e.name,o=ce(Pe.locateFile(o),e.behavior)),o&&"string"==typeof o||Be(!1,"attemptUrl need to be path or url string"),o}function ce(e,t){return Pe.modulesUniqueQuery&&q[t]&&(e+=Pe.modulesUniqueQuery),e}let de=0;const ue=new Set;function fe(e){try{e.resolvedUrl||Be(!1,"Request's resolvedUrl must be set");const t=function(e){let t=e.resolvedUrl;if(Pe.loadBootResource){const o=ge(e);if(o instanceof Promise)return o;"string"==typeof o&&(t=o)}const o={};return e.cache?o.cache=e.cache:Pe.config.disableNoCacheFetch||(o.cache="no-cache"),e.useCredentials?o.credentials="include":!Pe.config.disableIntegrityCheck&&e.hash&&(o.integrity=e.hash),Pe.fetch_like(t,o)}(e),o={name:e.name,url:e.resolvedUrl,response:t};return ue.add(e.name),o.response.then((()=>{"assembly"==e.behavior&&Pe.loadedAssemblies.push(e.name),de++,Pe.onDownloadResourceProgress&&Pe.onDownloadResourceProgress(de,ue.size)})),o}catch(t){const o={ok:!1,url:e.resolvedUrl,status:500,statusText:"ERR29: "+t,arrayBuffer:()=>{throw t},json:()=>{throw t}};return{name:e.name,url:e.resolvedUrl,response:Promise.resolve(o)}}}const me={resource:"assembly",assembly:"assembly",pdb:"pdb",icu:"globalization",vfs:"configuration",manifest:"manifest",dotnetwasm:"dotnetwasm","js-module-dotnet":"dotnetjs","js-module-native":"dotnetjs","js-module-runtime":"dotnetjs","js-module-threads":"dotnetjs"};function ge(e){var t;if(Pe.loadBootResource){const o=null!==(t=e.hash)&&void 0!==t?t:"",n=e.resolvedUrl,r=me[e.behavior];if(r){const t=Pe.loadBootResource(r,e.name,n,o,e.behavior);return"string"==typeof t?I(t):t}}}function pe(e){e.pendingDownloadInternal=null,e.pendingDownload=null,e.buffer=null,e.moduleExports=null}function he(e){let t=e.lastIndexOf("/");return t>=0&&t++,e.substring(t)}async function we(e){e&&await Promise.all((null!=e?e:[]).map((e=>async function(e){try{const t=e.name;if(!e.moduleExports){const o=ce(Pe.locateFile(t),"js-module-library-initializer");Pe.diagnosticTracing&&b(`Attempting to import '${o}' for ${e}`),e.moduleExports=await import(/*! webpackIgnore: true */o)}Pe.libraryInitializers.push({scriptName:t,exports:e.moduleExports})}catch(t){E(`Failed to import library initializer '${e}': ${t}`)}}(e))))}async function be(e,t){if(!Pe.libraryInitializers)return;const o=[];for(let n=0;n<Pe.libraryInitializers.length;n++){const r=Pe.libraryInitializers[n];r.exports[e]&&o.push(ye(r.scriptName,e,(()=>r.exports[e](...t))))}await Promise.all(o)}async function ye(e,t,o){try{await o()}catch(o){throw E(`Failed to invoke '${t}' on library initializer '${e}': ${o}`),Xe(1,o),o}}function ve(e,t){if(e===t)return e;const o={...t};return void 0!==o.assets&&o.assets!==e.assets&&(o.assets=[...e.assets||[],...o.assets||[]]),void 0!==o.resources&&(o.resources=_e(e.resources||{assembly:[],jsModuleNative:[],jsModuleRuntime:[],wasmNative:[]},o.resources)),void 0!==o.environmentVariables&&(o.environmentVariables={...e.environmentVariables||{},...o.environmentVariables||{}}),void 0!==o.runtimeOptions&&o.runtimeOptions!==e.runtimeOptions&&(o.runtimeOptions=[...e.runtimeOptions||[],...o.runtimeOptions||[]]),Object.assign(e,o)}function Ee(e,t){if(e===t)return e;const o={...t};return o.config&&(e.config||(e.config={}),o.config=ve(e.config,o.config)),Object.assign(e,o)}function _e(e,t){if(e===t)return e;const o={...t};return void 0!==o.coreAssembly&&(o.coreAssembly=[...e.coreAssembly||[],...o.coreAssembly||[]]),void 0!==o.assembly&&(o.assembly=[...e.assembly||[],...o.assembly||[]]),void 0!==o.lazyAssembly&&(o.lazyAssembly=[...e.lazyAssembly||[],...o.lazyAssembly||[]]),void 0!==o.corePdb&&(o.corePdb=[...e.corePdb||[],...o.corePdb||[]]),void 0!==o.pdb&&(o.pdb=[...e.pdb||[],...o.pdb||[]]),void 0!==o.jsModuleWorker&&(o.jsModuleWorker=[...e.jsModuleWorker||[],...o.jsModuleWorker||[]]),void 0!==o.jsModuleNative&&(o.jsModuleNative=[...e.jsModuleNative||[],...o.jsModuleNative||[]]),void 0!==o.jsModuleDiagnostics&&(o.jsModuleDiagnostics=[...e.jsModuleDiagnostics||[],...o.jsModuleDiagnostics||[]]),void 0!==o.jsModuleRuntime&&(o.jsModuleRuntime=[...e.jsModuleRuntime||[],...o.jsModuleRuntime||[]]),void 0!==o.wasmSymbols&&(o.wasmSymbols=[...e.wasmSymbols||[],...o.wasmSymbols||[]]),void 0!==o.wasmNative&&(o.wasmNative=[...e.wasmNative||[],...o.wasmNative||[]]),void 0!==o.icu&&(o.icu=[...e.icu||[],...o.icu||[]]),void 0!==o.satelliteResources&&(o.satelliteResources=function(e,t){if(e===t)return e;for(const o in t)e[o]=[...e[o]||[],...t[o]||[]];return e}(e.satelliteResources||{},o.satelliteResources||{})),void 0!==o.modulesAfterConfigLoaded&&(o.modulesAfterConfigLoaded=[...e.modulesAfterConfigLoaded||[],...o.modulesAfterConfigLoaded||[]]),void 0!==o.modulesAfterRuntimeReady&&(o.modulesAfterRuntimeReady=[...e.modulesAfterRuntimeReady||[],...o.modulesAfterRuntimeReady||[]]),void 0!==o.extensions&&(o.extensions={...e.extensions||{},...o.extensions||{}}),void 0!==o.vfs&&(o.vfs=[...e.vfs||[],...o.vfs||[]]),Object.assign(e,o)}function xe(){const e=Pe.config;if(e.environmentVariables=e.environmentVariables||{},e.runtimeOptions=e.runtimeOptions||[],e.resources=e.resources||{assembly:[],jsModuleNative:[],jsModuleWorker:[],jsModuleRuntime:[],wasmNative:[],vfs:[],satelliteResources:{}},e.assets){Pe.diagnosticTracing&&b("config.assets is deprecated, use config.resources instead");for(const t of e.assets){const o={};switch(t.behavior){case"assembly":o.assembly=[t];break;case"pdb":o.pdb=[t];break;case"resource":o.satelliteResources={},o.satelliteResources[t.culture]=[t];break;case"icu":o.icu=[t];break;case"symbols":o.wasmSymbols=[t];break;case"vfs":o.vfs=[t];break;case"dotnetwasm":o.wasmNative=[t];break;case"js-module-threads":o.jsModuleWorker=[t];break;case"js-module-runtime":o.jsModuleRuntime=[t];break;case"js-module-native":o.jsModuleNative=[t];break;case"js-module-diagnostics":o.jsModuleDiagnostics=[t];break;case"js-module-dotnet":break;default:throw new Error(`Unexpected behavior ${t.behavior} of asset ${t.name}`)}_e(e.resources,o)}}e.debugLevel,e.applicationEnvironment||(e.applicationEnvironment="Production"),e.applicationCulture&&(e.environmentVariables.LANG=`${e.applicationCulture}.UTF-8`),Ue.diagnosticTracing=Pe.diagnosticTracing=!!e.diagnosticTracing,Ue.waitForDebugger=e.waitForDebugger,Pe.maxParallelDownloads=e.maxParallelDownloads||Pe.maxParallelDownloads,Pe.enableDownloadRetry=void 0!==e.enableDownloadRetry?e.enableDownloadRetry:Pe.enableDownloadRetry}let je=!1;async function Re(e){var t;if(je)return void await Pe.afterConfigLoaded.promise;let o;try{if(e.configSrc||Pe.config&&0!==Object.keys(Pe.config).length&&(Pe.config.assets||Pe.config.resources)||(e.configSrc="dotnet.boot.js"),o=e.configSrc,je=!0,o&&(Pe.diagnosticTracing&&b("mono_wasm_load_config"),await async function(e){const t=e.configSrc,o=Pe.locateFile(t);let n=null;void 0!==Pe.loadBootResource&&(n=Pe.loadBootResource("manifest",t,o,"","manifest"));let r,i=null;if(n)if("string"==typeof n)n.includes(".json")?(i=await s(I(n)),r=await Ae(i)):r=(await import(I(n))).config;else{const e=await n;"function"==typeof e.json?(i=e,r=await Ae(i)):r=e.config}else o.includes(".json")?(i=await s(ce(o,"manifest")),r=await Ae(i)):r=(await import(ce(o,"manifest"))).config;function s(e){return Pe.fetch_like(e,{method:"GET",credentials:"include",cache:"no-cache"})}Pe.config.applicationEnvironment&&(r.applicationEnvironment=Pe.config.applicationEnvironment),ve(Pe.config,r)}(e)),xe(),await we(null===(t=Pe.config.resources)||void 0===t?void 0:t.modulesAfterConfigLoaded),await be("onRuntimeConfigLoaded",[Pe.config]),e.onConfigLoaded)try{await e.onConfigLoaded(Pe.config,Le),xe()}catch(e){throw _("onConfigLoaded() failed",e),e}xe(),Pe.afterConfigLoaded.promise_control.resolve(Pe.config)}catch(t){const n=`Failed to load config file ${o} ${t} ${null==t?void 0:t.stack}`;throw Pe.config=e.config=Object.assign(Pe.config,{message:n,error:t,isError:!0}),Xe(1,new Error(n)),t}}function Te(){return!!globalThis.navigator&&(Pe.isChromium||Pe.isFirefox)}async function Ae(e){const t=Pe.config,o=await e.json();t.applicationEnvironment||o.applicationEnvironment||(o.applicationEnvironment=e.headers.get("Blazor-Environment")||e.headers.get("DotNet-Environment")||void 0),o.environmentVariables||(o.environmentVariables={});const n=e.headers.get("DOTNET-MODIFIABLE-ASSEMBLIES");n&&(o.environmentVariables.DOTNET_MODIFIABLE_ASSEMBLIES=n);const r=e.headers.get("ASPNETCORE-BROWSER-TOOLS");return r&&(o.environmentVariables.__ASPNETCORE_BROWSER_TOOLS=r),o}"function"!=typeof importScripts||globalThis.onmessage||(globalThis.dotnetSidecar=!0);const Se="object"==typeof process&&"object"==typeof process.versions&&"string"==typeof process.versions.node,De="function"==typeof importScripts,Oe=De&&"undefined"!=typeof dotnetSidecar,Ce=De&&!Oe,ke="object"==typeof window||De&&!Se,Ie=!ke&&!Se;let Ue={},Pe={},Me={},Le={},Ne={},$e=!1;const ze={},We={config:ze},Fe={mono:{},binding:{},internal:Ne,module:We,loaderHelpers:Pe,runtimeHelpers:Ue,diagnosticHelpers:Me,api:Le};function Be(e,t){if(e)return;const o="Assert failed: "+("function"==typeof t?t():t),n=new Error(o);_(o,n),Ue.nativeAbort(n)}function Ve(){return void 0!==Pe.exitCode}function qe(){return Ue.runtimeReady&&!Ve()}function He(){Ve()&&Be(!1,`.NET runtime already exited with ${Pe.exitCode} ${Pe.exitReason}. You can use runtime.runMain() which doesn't exit the runtime.`),Ue.runtimeReady||Be(!1,".NET runtime didn't start yet. Please call dotnet.create() first.")}function Je(){ke&&(globalThis.addEventListener("unhandledrejection",et),globalThis.addEventListener("error",tt))}let Ze,Qe;function Ge(e){Qe&&Qe(e),Xe(e,Pe.exitReason)}function Ke(e){Ze&&Ze(e||Pe.exitReason),Xe(1,e||Pe.exitReason)}function Xe(t,o){var n,r;const i=o&&"object"==typeof o;t=i&&"number"==typeof o.status?o.status:void 0===t?-1:t;const s=i&&"string"==typeof o.message?o.message:""+o;(o=i?o:Ue.ExitStatus?function(e,t){const o=new Ue.ExitStatus(e);return o.message=t,o.toString=()=>t,o}(t,s):new Error("Exit with code "+t+" "+s)).status=t,o.message||(o.message=s);const a=""+(o.stack||(new Error).stack);try{Object.defineProperty(o,"stack",{get:()=>a})}catch(e){}const l=!!o.silent;if(o.silent=!0,Ve())Pe.diagnosticTracing&&b("mono_exit called after exit");else{try{We.onAbort==Ke&&(We.onAbort=Ze),We.onExit==Ge&&(We.onExit=Qe),ke&&(globalThis.removeEventListener("unhandledrejection",et),globalThis.removeEventListener("error",tt)),Ue.runtimeReady?(Ue.jiterpreter_dump_stats&&Ue.jiterpreter_dump_stats(!1),0===t&&(null===(n=Pe.config)||void 0===n?void 0:n.interopCleanupOnExit)&&Ue.forceDisposeProxies(!0,!0),e&&0!==t&&(null===(r=Pe.config)||void 0===r||r.dumpThreadsOnNonZeroExit)):(Pe.diagnosticTracing&&b(`abort_startup, reason: ${o}`),function(e){Pe.allDownloadsQueued.promise_control.reject(e),Pe.allDownloadsFinished.promise_control.reject(e),Pe.afterConfigLoaded.promise_control.reject(e),Pe.wasmCompilePromise.promise_control.reject(e),Pe.runtimeModuleLoaded.promise_control.reject(e),Ue.dotnetReady&&(Ue.dotnetReady.promise_control.reject(e),Ue.afterInstantiateWasm.promise_control.reject(e),Ue.beforePreInit.promise_control.reject(e),Ue.afterPreInit.promise_control.reject(e),Ue.afterPreRun.promise_control.reject(e),Ue.beforeOnRuntimeInitialized.promise_control.reject(e),Ue.afterOnRuntimeInitialized.promise_control.reject(e),Ue.afterPostRun.promise_control.reject(e))}(o))}catch(e){E("mono_exit A failed",e)}try{l||(function(e,t){if(0!==e&&t){const e=Ue.ExitStatus&&t instanceof Ue.ExitStatus?b:_;"string"==typeof t?e(t):(void 0===t.stack&&(t.stack=(new Error).stack+""),t.message?e(Ue.stringify_as_error_with_stack?Ue.stringify_as_error_with_stack(t.message+"\n"+t.stack):t.message+"\n"+t.stack):e(JSON.stringify(t)))}!Ce&&Pe.config&&(Pe.config.logExitCode?Pe.config.forwardConsoleLogsToWS?R("WASM EXIT "+e):v("WASM EXIT "+e):Pe.config.forwardConsoleLogsToWS&&R())}(t,o),function(e){if(ke&&!Ce&&Pe.config&&Pe.config.appendElementOnExit&&document){const t=document.createElement("label");t.id="tests_done",0!==e&&(t.style.background="red"),t.innerHTML=""+e,document.body.appendChild(t)}}(t))}catch(e){E("mono_exit B failed",e)}Pe.exitCode=t,Pe.exitReason||(Pe.exitReason=o),!Ce&&Ue.runtimeReady&&We.runtimeKeepalivePop()}if(Pe.config&&Pe.config.asyncFlushOnExit&&0===t)throw(async()=>{try{await async function(){try{const e=await import(/*! webpackIgnore: true */"process"),t=e=>new Promise(((t,o)=>{e.on("error",o),e.end("","utf8",t)})),o=t(e.stderr),n=t(e.stdout);let r;const i=new Promise((e=>{r=setTimeout((()=>e("timeout")),1e3)}));await Promise.race([Promise.all([n,o]),i]),clearTimeout(r)}catch(e){_(`flushing std* streams failed: ${e}`)}}()}finally{Ye(t,o)}})(),o;Ye(t,o)}function Ye(e,t){if(Ue.runtimeReady&&Ue.nativeExit)try{Ue.nativeExit(e)}catch(e){!Ue.ExitStatus||e instanceof Ue.ExitStatus||E("set_exit_code_and_quit_now failed: "+e.toString())}if(0!==e||!ke)throw Se&&Ne.process?Ne.process.exit(e):Ue.quit&&Ue.quit(e,t),t}function et(e){ot(e,e.reason,"rejection")}function tt(e){ot(e,e.error,"error")}function ot(e,t,o){e.preventDefault();try{t||(t=new Error("Unhandled "+o)),void 0===t.stack&&(t.stack=(new Error).stack),t.stack=t.stack+"",t.silent||(_("Unhandled error:",t),Xe(1,t))}catch(e){}}!function(e){if($e)throw new Error("Loader module already loaded");$e=!0,Ue=e.runtimeHelpers,Pe=e.loaderHelpers,Me=e.diagnosticHelpers,Le=e.api,Ne=e.internal,Object.assign(Le,{INTERNAL:Ne,invokeLibraryInitializers:be}),Object.assign(e.module,{config:ve(ze,{environmentVariables:{}})});const r={mono_wasm_bindings_is_ready:!1,config:e.module.config,diagnosticTracing:!1,nativeAbort:e=>{throw e||new Error("abort")},nativeExit:e=>{throw new Error("exit:"+e)}},l={gitHash:"80d3e14f5e08b4888f464e3cd0d0b2445b63ec46",config:e.module.config,diagnosticTracing:!1,maxParallelDownloads:16,enableDownloadRetry:!0,_loaded_files:[],loadedFiles:[],loadedAssemblies:[],libraryInitializers:[],workerNextNumber:1,actual_downloaded_assets_count:0,actual_instantiated_assets_count:0,expected_downloaded_assets_count:0,expected_instantiated_assets_count:0,afterConfigLoaded:i(),allDownloadsQueued:i(),allDownloadsFinished:i(),wasmCompilePromise:i(),runtimeModuleLoaded:i(),loadingWorkers:i(),is_exited:Ve,is_runtime_running:qe,assert_runtime_running:He,mono_exit:Xe,createPromiseController:i,getPromiseController:s,assertIsControllablePromise:a,mono_download_assets:oe,resolve_single_asset_path:ee,setup_proxy_console:j,set_thread_prefix:w,installUnhandledErrorHandler:Je,retrieve_asset_download:ie,invokeLibraryInitializers:be,isDebuggingSupported:Te,exceptions:t,simd:n,relaxedSimd:o};Object.assign(Ue,r),Object.assign(Pe,l)}(Fe);let nt,rt,it,st=!1,at=!1;async function lt(e){if(!at){if(at=!0,ke&&Pe.config.forwardConsoleLogsToWS&&void 0!==globalThis.WebSocket&&j("main",globalThis.console,globalThis.location.origin),We||Be(!1,"Null moduleConfig"),Pe.config||Be(!1,"Null moduleConfig.config"),"function"==typeof e){const t=e(Fe.api);if(t.ready)throw new Error("Module.ready couldn't be redefined.");Object.assign(We,t),Ee(We,t)}else{if("object"!=typeof e)throw new Error("Can't use moduleFactory callback of createDotnetRuntime function.");Ee(We,e)}await async function(e){if(Se){const e=await import(/*! webpackIgnore: true */"process"),t=14;if(e.versions.node.split(".")[0]<t)throw new Error(`NodeJS at '${e.execPath}' has too low version '${e.versions.node}', please use at least ${t}. See also https://aka.ms/dotnet-wasm-features`)}const t=/*! webpackIgnore: true */import.meta.url,o=t.indexOf("?");var n;if(o>0&&(Pe.modulesUniqueQuery=t.substring(o)),Pe.scriptUrl=t.replace(/\\/g,"/").replace(/[?#].*/,""),Pe.scriptDirectory=(n=Pe.scriptUrl).slice(0,n.lastIndexOf("/"))+"/",Pe.locateFile=e=>"URL"in globalThis&&globalThis.URL!==C?new URL(e,Pe.scriptDirectory).toString():M(e)?e:Pe.scriptDirectory+e,Pe.fetch_like=k,Pe.out=console.log,Pe.err=console.error,Pe.onDownloadResourceProgress=e.onDownloadResourceProgress,ke&&globalThis.navigator){const e=globalThis.navigator,t=e.userAgentData&&e.userAgentData.brands;t&&t.length>0?Pe.isChromium=t.some((e=>"Google Chrome"===e.brand||"Microsoft Edge"===e.brand||"Chromium"===e.brand)):e.userAgent&&(Pe.isChromium=e.userAgent.includes("Chrome"),Pe.isFirefox=e.userAgent.includes("Firefox"))}Ne.require=Se?await import(/*! webpackIgnore: true */"module").then((e=>e.createRequire(/*! webpackIgnore: true */import.meta.url))):Promise.resolve((()=>{throw new Error("require not supported")})),void 0===globalThis.URL&&(globalThis.URL=C)}(We)}}async function ct(e){return await lt(e),Ze=We.onAbort,Qe=We.onExit,We.onAbort=Ke,We.onExit=Ge,We.ENVIRONMENT_IS_PTHREAD?async function(){(function(){const e=new MessageChannel,t=e.port1,o=e.port2;t.addEventListener("message",(e=>{var n,r;n=JSON.parse(e.data.config),r=JSON.parse(e.data.monoThreadInfo),st?Pe.diagnosticTracing&&b("mono config already received"):(ve(Pe.config,n),Ue.monoThreadInfo=r,xe(),Pe.diagnosticTracing&&b("mono config received"),st=!0,Pe.afterConfigLoaded.promise_control.resolve(Pe.config),ke&&n.forwardConsoleLogsToWS&&void 0!==globalThis.WebSocket&&Pe.setup_proxy_console("worker-idle",console,globalThis.location.origin)),t.close(),o.close()}),{once:!0}),t.start(),self.postMessage({[l]:{monoCmd:"preload",port:o}},[o])})(),await Pe.afterConfigLoaded.promise,function(){const e=Pe.config;e.assets||Be(!1,"config.assets must be defined");for(const t of e.assets)X(t),Q[t.behavior]&&z.push(t)}(),setTimeout((async()=>{try{await oe()}catch(e){Xe(1,e)}}),0);const e=dt(),t=await Promise.all(e);return await ut(t),We}():async function(){var e;await Re(We),re();const t=dt();(async function(){try{const e=ee("dotnetwasm");await se(e),e&&e.pendingDownloadInternal&&e.pendingDownloadInternal.response||Be(!1,"Can't load dotnet.native.wasm");const t=await e.pendingDownloadInternal.response,o=t.headers&&t.headers.get?t.headers.get("Content-Type"):void 0;let n;if("function"==typeof WebAssembly.compileStreaming&&"application/wasm"===o)n=await WebAssembly.compileStreaming(t);else{ke&&"application/wasm"!==o&&E('WebAssembly resource does not have the expected content type "application/wasm", so falling back to slower ArrayBuffer instantiation.');const e=await t.arrayBuffer();Pe.diagnosticTracing&&b("instantiate_wasm_module buffered"),n=Ie?await Promise.resolve(new WebAssembly.Module(e)):await WebAssembly.compile(e)}e.pendingDownloadInternal=null,e.pendingDownload=null,e.buffer=null,e.moduleExports=null,Pe.wasmCompilePromise.promise_control.resolve(n)}catch(e){Pe.wasmCompilePromise.promise_control.reject(e)}})(),setTimeout((async()=>{try{D(),await oe()}catch(e){Xe(1,e)}}),0);const o=await Promise.all(t);return await ut(o),await Ue.dotnetReady.promise,await we(null===(e=Pe.config.resources)||void 0===e?void 0:e.modulesAfterRuntimeReady),await be("onRuntimeReady",[Fe.api]),Le}()}function dt(){const e=ee("js-module-runtime"),t=ee("js-module-native");if(nt&&rt)return[nt,rt,it];"object"==typeof e.moduleExports?nt=e.moduleExports:(Pe.diagnosticTracing&&b(`Attempting to import '${e.resolvedUrl}' for ${e.name}`),nt=import(/*! webpackIgnore: true */e.resolvedUrl)),"object"==typeof t.moduleExports?rt=t.moduleExports:(Pe.diagnosticTracing&&b(`Attempting to import '${t.resolvedUrl}' for ${t.name}`),rt=import(/*! webpackIgnore: true */t.resolvedUrl));const o=Y("js-module-diagnostics");return o&&("object"==typeof o.moduleExports?it=o.moduleExports:(Pe.diagnosticTracing&&b(`Attempting to import '${o.resolvedUrl}' for ${o.name}`),it=import(/*! webpackIgnore: true */o.resolvedUrl))),[nt,rt,it]}async function ut(e){const{initializeExports:t,initializeReplacements:o,configureRuntimeStartup:n,configureEmscriptenStartup:r,configureWorkerStartup:i,setRuntimeGlobals:s,passEmscriptenInternals:a}=e[0],{default:l}=e[1],c=e[2];s(Fe),t(Fe),c&&c.setRuntimeGlobals(Fe),await n(We),Pe.runtimeModuleLoaded.promise_control.resolve(),l((e=>(Object.assign(We,{ready:e.ready,__dotnet_runtime:{initializeReplacements:o,configureEmscriptenStartup:r,configureWorkerStartup:i,passEmscriptenInternals:a}}),We))).catch((e=>{if(e.message&&e.message.toLowerCase().includes("out of memory"))throw new Error(".NET runtime has failed to start, because too much memory was requested. Please decrease the memory by adjusting EmccMaximumHeapSize. See also https://aka.ms/dotnet-wasm-features");throw e}))}const ft=new class{withModuleConfig(e){try{return Ee(We,e),this}catch(e){throw Xe(1,e),e}}withOnConfigLoaded(e){try{return Ee(We,{onConfigLoaded:e}),this}catch(e){throw Xe(1,e),e}}withConsoleForwarding(){try{return ve(ze,{forwardConsoleLogsToWS:!0}),this}catch(e){throw Xe(1,e),e}}withExitOnUnhandledError(){try{return ve(ze,{exitOnUnhandledError:!0}),Je(),this}catch(e){throw Xe(1,e),e}}withAsyncFlushOnExit(){try{return ve(ze,{asyncFlushOnExit:!0}),this}catch(e){throw Xe(1,e),e}}withExitCodeLogging(){try{return ve(ze,{logExitCode:!0}),this}catch(e){throw Xe(1,e),e}}withElementOnExit(){try{return ve(ze,{appendElementOnExit:!0}),this}catch(e){throw Xe(1,e),e}}withInteropCleanupOnExit(){try{return ve(ze,{interopCleanupOnExit:!0}),this}catch(e){throw Xe(1,e),e}}withDumpThreadsOnNonZeroExit(){try{return ve(ze,{dumpThreadsOnNonZeroExit:!0}),this}catch(e){throw Xe(1,e),e}}withWaitingForDebugger(e){try{return ve(ze,{waitForDebugger:e}),this}catch(e){throw Xe(1,e),e}}withInterpreterPgo(e,t){try{return ve(ze,{interpreterPgo:e,interpreterPgoSaveDelay:t}),ze.runtimeOptions?ze.runtimeOptions.push("--interp-pgo-recording"):ze.runtimeOptions=["--interp-pgo-recording"],this}catch(e){throw Xe(1,e),e}}withConfig(e){try{return ve(ze,e),this}catch(e){throw Xe(1,e),e}}withConfigSrc(e){try{return e&&"string"==typeof e||Be(!1,"must be file path or URL"),Ee(We,{configSrc:e}),this}catch(e){throw Xe(1,e),e}}withVirtualWorkingDirectory(e){try{return e&&"string"==typeof e||Be(!1,"must be directory path"),ve(ze,{virtualWorkingDirectory:e}),this}catch(e){throw Xe(1,e),e}}withEnvironmentVariable(e,t){try{const o={};return o[e]=t,ve(ze,{environmentVariables:o}),this}catch(e){throw Xe(1,e),e}}withEnvironmentVariables(e){try{return e&&"object"==typeof e||Be(!1,"must be dictionary object"),ve(ze,{environmentVariables:e}),this}catch(e){throw Xe(1,e),e}}withDiagnosticTracing(e){try{return"boolean"!=typeof e&&Be(!1,"must be boolean"),ve(ze,{diagnosticTracing:e}),this}catch(e){throw Xe(1,e),e}}withDebugging(e){try{return null!=e&&"number"==typeof e||Be(!1,"must be number"),ve(ze,{debugLevel:e}),this}catch(e){throw Xe(1,e),e}}withApplicationArguments(...e){try{return e&&Array.isArray(e)||Be(!1,"must be array of strings"),ve(ze,{applicationArguments:e}),this}catch(e){throw Xe(1,e),e}}withRuntimeOptions(e){try{return e&&Array.isArray(e)||Be(!1,"must be array of strings"),ze.runtimeOptions?ze.runtimeOptions.push(...e):ze.runtimeOptions=e,this}catch(e){throw Xe(1,e),e}}withMainAssembly(e){try{return ve(ze,{mainAssemblyName:e}),this}catch(e){throw Xe(1,e),e}}withApplicationArgumentsFromQuery(){try{if(!globalThis.window)throw new Error("Missing window to the query parameters from");if(void 0===globalThis.URLSearchParams)throw new Error("URLSearchParams is supported");const e=new URLSearchParams(globalThis.window.location.search).getAll("arg");return this.withApplicationArguments(...e)}catch(e){throw Xe(1,e),e}}withApplicationEnvironment(e){try{return ve(ze,{applicationEnvironment:e}),this}catch(e){throw Xe(1,e),e}}withApplicationCulture(e){try{return ve(ze,{applicationCulture:e}),this}catch(e){throw Xe(1,e),e}}withResourceLoader(e){try{return Pe.loadBootResource=e,this}catch(e){throw Xe(1,e),e}}async download(){try{await async function(){lt(We),await Re(We),re(),D(),oe(),await Pe.allDownloadsFinished.promise}()}catch(e){throw Xe(1,e),e}}async create(){try{return this.instance||(this.instance=await async function(){return await ct(We),Fe.api}()),this.instance}catch(e){throw Xe(1,e),e}}async run(){try{return We.config||Be(!1,"Null moduleConfig.config"),this.instance||await this.create(),this.instance.runMainAndExit()}catch(e){throw Xe(1,e),e}}},mt=Xe,gt=ct;Ie||"function"==typeof globalThis.URL||Be(!1,"This browser/engine doesn't support URL API. Please use a modern version. See also https://aka.ms/dotnet-wasm-features"),"function"!=typeof globalThis.BigInt64Array&&Be(!1,"This browser/engine doesn't support BigInt64Array API. Please use a modern version. See also https://aka.ms/dotnet-wasm-features"),ft.withConfig(/*json-start*/{
  "mainAssemblyName": "AminoAcidsQuiz.Browser",
  "resources": {
    "hash": "sha256-Ep731Yb1Id2BTirL8PfPAZzUw4qCmzN004rngJBokv0=",
    "jsModuleNative": [
      {
        "name": "dotnet.native.ag22in20gx.js"
      }
    ],
    "jsModuleRuntime": [
      {
        "name": "dotnet.runtime.zj9dll5ffg.js"
      }
    ],
    "wasmNative": [
      {
        "name": "dotnet.native.1yoofmv7pc.wasm",
        "integrity": "sha256-tzRk5M09J7ialAL8wpOnSSYI96TMNTFcwHl094CFRK4=",
        "cache": "force-cache"
      }
    ],
    "icu": [
      {
        "virtualPath": "icudt.dat",
        "name": "icudt.oh1zvcfom8.dat",
        "integrity": "sha256-tO5O5YzMTVSaKBboxAqezOQL9ewmupzV2JrB5Rkc8a4=",
        "cache": "force-cache"
      }
    ],
    "coreAssembly": [
      {
        "virtualPath": "AminoAcidsQuiz.Browser.wasm",
        "name": "AminoAcidsQuiz.Browser.bcemg82f6d.wasm",
        "integrity": "sha256-5f3CQLWi5NrJwLujRiNV++2pMKQkso0draaZN4E5orE=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "AminoAcidsQuiz.wasm",
        "name": "AminoAcidsQuiz.smuvjzcfyk.wasm",
        "integrity": "sha256-LHThXks50+3DkoNnvFmYWgy7QX4dhQHg8WgTi0MBO5g=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "CommunityToolkit.Mvvm.wasm",
        "name": "CommunityToolkit.Mvvm.y483vdvl2q.wasm",
        "integrity": "sha256-8k7/C9QCBRkR+R+GPNGZ56A29KdrnZFHaXexmQmrSH0=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.AspNetCore.Components.Web.wasm",
        "name": "Microsoft.AspNetCore.Components.Web.292u3vdhde.wasm",
        "integrity": "sha256-5jWnvQR40KJRdx4wskkJRhMT+qMccJQh9Bo+q5tSLjE=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.AspNetCore.Components.WebAssembly.wasm",
        "name": "Microsoft.AspNetCore.Components.WebAssembly.rij8f2xri5.wasm",
        "integrity": "sha256-05sj7sPOgxlYPLmFFYDsnemSADtxCeOwsoDiyMuAyQs=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.AspNetCore.Components.wasm",
        "name": "Microsoft.AspNetCore.Components.eyynjq3ql2.wasm",
        "integrity": "sha256-SqSWVVR/mq6Rv2y8VW0K5aQu+Bof+n7GozYU5vbAfRg=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.CSharp.wasm",
        "name": "Microsoft.CSharp.e3e5fk64rh.wasm",
        "integrity": "sha256-mnXL6T/8qFBhZ9Cp+dLNiKAFWauA/89dAPM5pkQvYvs=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.Extensions.Configuration.Abstractions.wasm",
        "name": "Microsoft.Extensions.Configuration.Abstractions.nkp5yj2sa4.wasm",
        "integrity": "sha256-t74MYmYkYTBesW27UFJJhZkfxs3MZhnm6OZgFIpSGU8=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.Extensions.Configuration.Json.wasm",
        "name": "Microsoft.Extensions.Configuration.Json.h0zhyq1tzu.wasm",
        "integrity": "sha256-gSUwUNGpKWY8HWSPLR0xqMfTUMjEio3PANkGa0Vslk4=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.Extensions.Configuration.wasm",
        "name": "Microsoft.Extensions.Configuration.g6sh497ygf.wasm",
        "integrity": "sha256-GB+ztlxgRl/CBRHOgxWLSMtSfMnB19rXdMRl/jLhN7Y=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.Extensions.DependencyInjection.wasm",
        "name": "Microsoft.Extensions.DependencyInjection.wxvl2nll7n.wasm",
        "integrity": "sha256-9CJCYpkHoOUNjJvuzn31ksAfYltz3IPXKdFOSIy/PLk=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.Extensions.DependencyInjection.Abstractions.wasm",
        "name": "Microsoft.Extensions.DependencyInjection.Abstractions.gbuhg4xh3j.wasm",
        "integrity": "sha256-vKMD8EW145Bk2WGAkNXfPRX78Zwv9unsLtVUqzc6GYI=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.Extensions.Localization.Abstractions.wasm",
        "name": "Microsoft.Extensions.Localization.Abstractions.7hwr2kmz6p.wasm",
        "integrity": "sha256-Kw/UHqNHGHdWIuppzrS0tDZ/U8qK1EXCRBVVgIcyvPE=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.Extensions.Localization.wasm",
        "name": "Microsoft.Extensions.Localization.uaqpv9wj67.wasm",
        "integrity": "sha256-ZlT/6CV8PUxM9iLZLFmijvL8LjoNxtiuj7o/Y7XsUrA=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.Extensions.Logging.wasm",
        "name": "Microsoft.Extensions.Logging.sbxbd201mx.wasm",
        "integrity": "sha256-eDJDi0PhY0AKCIABoWdrm5oiNX9MuJLt3J8UwFw0J+U=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.Extensions.Logging.Abstractions.wasm",
        "name": "Microsoft.Extensions.Logging.Abstractions.j4onmv013g.wasm",
        "integrity": "sha256-HTTwO40QdwfqmAXG7XDrC7aXCl+KaRSxcXGqLD1kHV4=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.Extensions.ObjectPool.wasm",
        "name": "Microsoft.Extensions.ObjectPool.ojtr8l9akz.wasm",
        "integrity": "sha256-rKV5OsgPdT/dziClKx+rXomN3MiipX217V7XqBJvlts=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.Extensions.Options.wasm",
        "name": "Microsoft.Extensions.Options.axpe1e1cei.wasm",
        "integrity": "sha256-viO5XFF3+BdsFksDq1swRKO9pKDZBDIencfySaowjkY=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.Extensions.Primitives.wasm",
        "name": "Microsoft.Extensions.Primitives.nncxl65zrc.wasm",
        "integrity": "sha256-U9sKHQkDIl9ywDfiP5k8iByZRa5POfQINHKZxdDZqvs=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.JSInterop.WebAssembly.wasm",
        "name": "Microsoft.JSInterop.WebAssembly.nsfh695mwg.wasm",
        "integrity": "sha256-N8RKL2Eil4ZFxIkWa6Uig12+nRHOstda562q7GCs9fE=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.JSInterop.wasm",
        "name": "Microsoft.JSInterop.6ohw5417do.wasm",
        "integrity": "sha256-ilk+6K/NQQ2uQFm/aQK6hJmllkKhz2zUcpi4j4JoKoE=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.Win32.Primitives.wasm",
        "name": "Microsoft.Win32.Primitives.clfk6slqt1.wasm",
        "integrity": "sha256-8BES0gaFBf41JDP23l0Md//1h/xQD04B8gRlFpSOZ54=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "OpenSilver.Browser.wasm",
        "name": "OpenSilver.Browser.c3jvd8lfbc.wasm",
        "integrity": "sha256-mDDavbpBhf2SdATh4SeKbQKLvCyCOllX/RS+LY9qv6I=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "OpenSilver.Controls.Data.wasm",
        "name": "OpenSilver.Controls.Data.spsmawtkmo.wasm",
        "integrity": "sha256-4NQMq6USCu9R1Wv1vGYNXXVzm4qJbKYoTzur9eegf7A=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "OpenSilver.Controls.Data.DataForm.Toolkit.wasm",
        "name": "OpenSilver.Controls.Data.DataForm.Toolkit.qqs7dhuotz.wasm",
        "integrity": "sha256-voHl5YZfUQGcFRpesRLvPqovty1z9ZtAjgisml4BfCU=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "OpenSilver.Controls.Data.Input.wasm",
        "name": "OpenSilver.Controls.Data.Input.imhx7gb861.wasm",
        "integrity": "sha256-ei4HGMEN8u54Ozv9X387s6e61sEPKyLql+tF3Twr4dM=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "OpenSilver.Controls.Data.Toolkit.wasm",
        "name": "OpenSilver.Controls.Data.Toolkit.zk1f07s9hn.wasm",
        "integrity": "sha256-wzH40oGyC2c9u2M8PlZVuUEQ8ffIwSGC6Sx+rQWTgv0=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "OpenSilver.Controls.DataVisualization.Toolkit.wasm",
        "name": "OpenSilver.Controls.DataVisualization.Toolkit.7u5s8j2qh9.wasm",
        "integrity": "sha256-j+AwFXQstC5hxPHIYWaRE4n/Ol7KXpARwm70tedumF4=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "OpenSilver.Controls.Input.Toolkit.wasm",
        "name": "OpenSilver.Controls.Input.Toolkit.vucdcg9me3.wasm",
        "integrity": "sha256-V17C1nzRyOl67LdMj+t0WLqW35QmYxT/kldTsHDiF3s=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "OpenSilver.Controls.Input.wasm",
        "name": "OpenSilver.Controls.Input.f85kiw4cwd.wasm",
        "integrity": "sha256-gZZkZPq/3pjww/wgWkYsUBkfHM/oSAKB3ESukD6wB6o=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "OpenSilver.Controls.Layout.Toolkit.wasm",
        "name": "OpenSilver.Controls.Layout.Toolkit.8ind15h31n.wasm",
        "integrity": "sha256-wKJPWQuJu3eynaMsb1kgiqZ85PSRUL43/sPjvQuzx6M=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "OpenSilver.Controls.Navigation.wasm",
        "name": "OpenSilver.Controls.Navigation.oea4msusi4.wasm",
        "integrity": "sha256-sLPFLVFecwRghdzgNMID28epinREAreydkQNt1GDrTw=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "OpenSilver.Controls.Theming.Toolkit.wasm",
        "name": "OpenSilver.Controls.Theming.Toolkit.hrrl3htzk4.wasm",
        "integrity": "sha256-MymjYIkv5erq77ZpUV52nANY2GZVCCQQWNfxAuktou4=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "OpenSilver.Controls.Toolkit.wasm",
        "name": "OpenSilver.Controls.Toolkit.sqv91m1mjo.wasm",
        "integrity": "sha256-DK5ZSu5dsIPhNeh6aifC7tkxVNETugL5PvNJHwbV9mI=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "OpenSilver.Controls.wasm",
        "name": "OpenSilver.Controls.fjd5ywfs3f.wasm",
        "integrity": "sha256-NVrQ6JJ9yVC0wWdH6HRjB0T/j4KB1txVI8hlTD4L8WY=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "OpenSilver.Data.wasm",
        "name": "OpenSilver.Data.zv28v2044g.wasm",
        "integrity": "sha256-n4ci+H80sptXAOaFshDRmW8y/W17HBBDDrOHkcOC+d8=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "OpenSilver.Expression.Effects.wasm",
        "name": "OpenSilver.Expression.Effects.y7uoztqcvr.wasm",
        "integrity": "sha256-AhqrBAixi3nMkNas0QTcCejC11RG7NZOXdg35ndDlWE=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "OpenSilver.Expression.Interactions.wasm",
        "name": "OpenSilver.Expression.Interactions.0ohgk9q0d5.wasm",
        "integrity": "sha256-cLW0Aw8W8b9vqFhOIsa6a5cPTALKCTWnNRW9XLRhE1k=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "OpenSilver.Interactivity.wasm",
        "name": "OpenSilver.Interactivity.8r8biaq1v3.wasm",
        "integrity": "sha256-7GRP3MRjvom2fkB1is3f6A6Xh0VXE/7Fl+0SBhFIipg=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "OpenSilver.Themes.Modern.wasm",
        "name": "OpenSilver.Themes.Modern.in0t8yn0yy.wasm",
        "integrity": "sha256-chdgJjwH+Bn+aLyNVwNnmaTYkH/f6IcewQXyTCGcT90=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "OpenSilver.WebAssembly.wasm",
        "name": "OpenSilver.WebAssembly.ollvngwaf2.wasm",
        "integrity": "sha256-HLZljQpYccUrtG+NsfKwSFf2/5P/axP7PnDin+VBKsU=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "OpenSilver.wasm",
        "name": "OpenSilver.rfb1lpfdqd.wasm",
        "integrity": "sha256-J1kuYGHfBGMh4fNasAaLuf7gft2L4+V+zPay8WYepTs=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "QuizEngine.wasm",
        "name": "QuizEngine.tiiwui9s26.wasm",
        "integrity": "sha256-xRtI/urLdXAZC5c9js0/kmQ0rRU38kMKkgYcbWXsabM=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Buffers.wasm",
        "name": "System.Buffers.nlagg0e7km.wasm",
        "integrity": "sha256-Vba3stnovDOWGhQWVnt7gczteIWDwh8p0XyhgnuqrZI=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Collections.Concurrent.wasm",
        "name": "System.Collections.Concurrent.qsrjo2s8i6.wasm",
        "integrity": "sha256-hsxTx5bueWXm2unLp8DhVuYXLrmtVyw/HaQ1iz8WZtU=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Collections.Immutable.wasm",
        "name": "System.Collections.Immutable.45f1q5msk6.wasm",
        "integrity": "sha256-6PA2aC0U6YMlTUm75JOMDuXIZ3uOw8AQho7BLe0RSn0=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Collections.NonGeneric.wasm",
        "name": "System.Collections.NonGeneric.cxjmdvkew8.wasm",
        "integrity": "sha256-oCgkXlFdlnbJVBYHHtuqOa9FOmyF493rbNYznx6FTlU=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Collections.Specialized.wasm",
        "name": "System.Collections.Specialized.wekj98foqe.wasm",
        "integrity": "sha256-6FjsbKlPyvqrBTbG350w6P0f4Y174Y9iy4YoKRcaJt4=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Collections.wasm",
        "name": "System.Collections.waegxlcmq6.wasm",
        "integrity": "sha256-aCGJa+q/Cjo0oqW8Rx+qD8BnnphOs5SFx2l/x/Wnpms=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.ComponentModel.Annotations.wasm",
        "name": "System.ComponentModel.Annotations.3af2i32rg9.wasm",
        "integrity": "sha256-29ex4w0w1XMq4U6jgYAeXYI5t5b1ye3RMKbQTAfFurs=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.ComponentModel.Composition.Initialization.wasm",
        "name": "System.ComponentModel.Composition.Initialization.3mwzf5nuos.wasm",
        "integrity": "sha256-2yIt5T3dN8UckPPnoXV7FFt/LZ1q0dFpVOSm+iTKSh8=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.ComponentModel.Composition.wasm",
        "name": "System.ComponentModel.Composition.nvzkjq5asy.wasm",
        "integrity": "sha256-XaI3w5ipRxamo6LtyWefsME7HvIL6Ixr5fAtSA030n8=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.ComponentModel.EventBasedAsync.wasm",
        "name": "System.ComponentModel.EventBasedAsync.t0a6cm7nk8.wasm",
        "integrity": "sha256-PUwnDEHa8x1pcN90ZJMpkgu356NuyqxBHjMHdN68Nks=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.ComponentModel.Primitives.wasm",
        "name": "System.ComponentModel.Primitives.s6zsm6zzcy.wasm",
        "integrity": "sha256-JD9+3qaLkNs14eaedUAU1V+S6RfmVmyEJolt6RIISmY=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.ComponentModel.TypeConverter.wasm",
        "name": "System.ComponentModel.TypeConverter.otqa8gm8yj.wasm",
        "integrity": "sha256-tLH1zpto/cTAQ7P4dxg/Yzo9iDOVpUqsC1SbQFyEUlU=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.ComponentModel.wasm",
        "name": "System.ComponentModel.ibktb753i3.wasm",
        "integrity": "sha256-4nzyuVg8wYKUoaz9FYu0OhtfM1wcARgDOT4KYKl4aEs=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Console.wasm",
        "name": "System.Console.f77guntukp.wasm",
        "integrity": "sha256-e3Ip9ruYcxJIl24kbKAaBColvANrBkP22Qe4lurrqDM=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Diagnostics.DiagnosticSource.wasm",
        "name": "System.Diagnostics.DiagnosticSource.ur71gmrcb3.wasm",
        "integrity": "sha256-Zkpy+5OQixz0OR98mePL8lTWNcxC6S3Z8Ap2gJNkUzA=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Diagnostics.StackTrace.wasm",
        "name": "System.Diagnostics.StackTrace.qooi6x3ol0.wasm",
        "integrity": "sha256-hpjxcMW4S+aN2JwZ5qa8aHaOTvc6vJ13yccgNllpV1w=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Diagnostics.TraceSource.wasm",
        "name": "System.Diagnostics.TraceSource.17wg94zm3i.wasm",
        "integrity": "sha256-/e8gUYGmnepRlCoa0t9600JyDxamqGSt7YHE43OZ29o=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Diagnostics.Tracing.wasm",
        "name": "System.Diagnostics.Tracing.fb4qs1mgqv.wasm",
        "integrity": "sha256-pcffjn8vsaekqboa7qBn3CMw7N1iRES5nEhp9Ikw4xA=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Formats.Asn1.wasm",
        "name": "System.Formats.Asn1.hbkvstg9gk.wasm",
        "integrity": "sha256-Yxd2GsUnvfDrQ8YjtjEDn01RyyiNcdbWnBLCNmHnmy8=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.IO.Compression.wasm",
        "name": "System.IO.Compression.ckaevw9r7e.wasm",
        "integrity": "sha256-BIQfA6Nr07yAB83b0b2HXg+nM8qHRsky8iX2b8dBf2w=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.IO.MemoryMappedFiles.wasm",
        "name": "System.IO.MemoryMappedFiles.zz21rugbn5.wasm",
        "integrity": "sha256-b7gsnV71eEIfOEeFY6mTVrNVNr4aF0vyJQn/ET5rCXU=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.IO.Pipelines.wasm",
        "name": "System.IO.Pipelines.rd7mb6rtfg.wasm",
        "integrity": "sha256-34Fc2tz6n90/Ij1mZKs/D9VceVpZymska2unM8H4hJA=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Linq.wasm",
        "name": "System.Linq.9doe5g7abt.wasm",
        "integrity": "sha256-Izg05sDreUaf0BG6m1mCNNPDiGP/X4S2GEHwyhPlupw=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Linq.Expressions.wasm",
        "name": "System.Linq.Expressions.nw6i88hlnl.wasm",
        "integrity": "sha256-iZRqTJcbggj1EBnSd4miCtqEehP0S0fjEKUDZDLokzs=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Linq.Queryable.wasm",
        "name": "System.Linq.Queryable.ym1e53bhpr.wasm",
        "integrity": "sha256-ygDHxGF/4LkTMIoxykDC6ADAGeIwYl+Je+mp36dZ4FU=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Memory.wasm",
        "name": "System.Memory.0e427vxhni.wasm",
        "integrity": "sha256-uBVxI2YdkI9+qF5e5Yy/zPwdYxFmo0+zwvSpwOFznsI=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Net.Http.wasm",
        "name": "System.Net.Http.t24snysomd.wasm",
        "integrity": "sha256-pQIhHUHVj3Zrx4WrBk/lOYMkrHVqr4UXSmChFrr1buo=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Net.Primitives.wasm",
        "name": "System.Net.Primitives.151y4zpe82.wasm",
        "integrity": "sha256-RTpDew6fKEAoHh+tniy2olQiIcDE0xAQlg2j+usYGxs=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Net.Requests.wasm",
        "name": "System.Net.Requests.qiwwzb52rw.wasm",
        "integrity": "sha256-oktgXKQLPE5fjAXnimNdKnr/jT3nzA+unSJ5uQ2DzQo=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Net.Security.wasm",
        "name": "System.Net.Security.b6dtwku9x7.wasm",
        "integrity": "sha256-8/dOdYV9FwY+hDyoCEmi5oheLoGIyDFusnSZ/n2LmW0=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Net.WebClient.wasm",
        "name": "System.Net.WebClient.b5g5bcp9uw.wasm",
        "integrity": "sha256-AbRrzoBgoYSScCKDdzW36ToVartd1jjmb82XB8gM5RA=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Net.WebHeaderCollection.wasm",
        "name": "System.Net.WebHeaderCollection.ksclh2gjb7.wasm",
        "integrity": "sha256-/BJh2iYTIr/Cqr9ra+B9akAWZbbnGBj0JISwoOkAue4=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.ObjectModel.wasm",
        "name": "System.ObjectModel.9g9lek6rw1.wasm",
        "integrity": "sha256-5x6Wbc9mj5W5TEcrS3D/3GmPD9eOXAVNBmO1NSvDhs0=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Private.CoreLib.wasm",
        "name": "System.Private.CoreLib.cqh046rdgj.wasm",
        "integrity": "sha256-PFp9syiZ7qC6UC9LVENZr9cy+//ZMGDsb/z+1uQOkIg=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Private.DataContractSerialization.wasm",
        "name": "System.Private.DataContractSerialization.nn5xi254w2.wasm",
        "integrity": "sha256-HXtp5pyeipz1rQusfBBs+UFi/AdxWDstXALodjlKzy0=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Private.Uri.wasm",
        "name": "System.Private.Uri.8lmezkt83j.wasm",
        "integrity": "sha256-3AxmvjMdRe9usqsHhqqRQu8JgzlGvGWy4xfYAgVyccs=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Private.Xml.Linq.wasm",
        "name": "System.Private.Xml.Linq.qzsm03b67e.wasm",
        "integrity": "sha256-RlgakpaIj+8AsJig3dihdoSLCoLfv44/iZZEKDUZ8dI=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Private.Xml.wasm",
        "name": "System.Private.Xml.33ioqq44ws.wasm",
        "integrity": "sha256-j7Nlf+f7sBEa/ppw8zaM/xKbXAtpDAdwEA+0tqrHkGM=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Reflection.DispatchProxy.wasm",
        "name": "System.Reflection.DispatchProxy.eayarzilz0.wasm",
        "integrity": "sha256-6myincW9vofWGrvxdjrBRLjV+dv0rZbOCz0JpIKsBFc=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Reflection.Emit.ILGeneration.wasm",
        "name": "System.Reflection.Emit.ILGeneration.h60o88zk05.wasm",
        "integrity": "sha256-F5GM/Wi7TpOb1td0Yyvw9VMOmIVH+CiP9Cp5orugGZo=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Reflection.Emit.wasm",
        "name": "System.Reflection.Emit.v3vvcx6rxw.wasm",
        "integrity": "sha256-xYCqIOXLgR3yA9zi2OMJRufaS3zqouHUG7e0CmxHW4M=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Reflection.Metadata.wasm",
        "name": "System.Reflection.Metadata.xv6o3an8ko.wasm",
        "integrity": "sha256-Iww35mWflJLqp//5Y91EOvdNF/EkZR6i0q82P6m7XYc=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Reflection.Primitives.wasm",
        "name": "System.Reflection.Primitives.tsrs2u8504.wasm",
        "integrity": "sha256-vbVWweHJYzAlNCM5F0lKl5Q1pIOAZtcGYB62xB3T+Sc=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Runtime.CompilerServices.Unsafe.wasm",
        "name": "System.Runtime.CompilerServices.Unsafe.fbc26r4ech.wasm",
        "integrity": "sha256-23wuCSkbPW5KoGwzgtKn592Kwg5Atu9SgBo0aQy+XRQ=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Runtime.InteropServices.JavaScript.wasm",
        "name": "System.Runtime.InteropServices.JavaScript.b2huynyq00.wasm",
        "integrity": "sha256-428Up4E/dVQOJlC7vt7wrCZ/VP4ZDDI9S4lKHsnFwlo=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Runtime.InteropServices.RuntimeInformation.wasm",
        "name": "System.Runtime.InteropServices.RuntimeInformation.ia4nre8710.wasm",
        "integrity": "sha256-hlc5OgbJQly/ZC1CIdtAgZ/Y+bbD/BvDa5o20CsbCwI=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Runtime.InteropServices.wasm",
        "name": "System.Runtime.InteropServices.1oagd7ba01.wasm",
        "integrity": "sha256-/4wkEStQRP+ckL/aahpw8AS5VZnPIW60bEdDhwRpy08=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Runtime.Numerics.wasm",
        "name": "System.Runtime.Numerics.t8sthshf95.wasm",
        "integrity": "sha256-PaWlWVuaoKEwuiBBvgidFm/I29arm9iLLeuJv3eTn3E=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Runtime.Serialization.Formatters.wasm",
        "name": "System.Runtime.Serialization.Formatters.v33mm71t30.wasm",
        "integrity": "sha256-O1udzW+PEGYO/gU1vENklJ0YS2kCWYDU+WfI5CpZMoU=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Runtime.Serialization.Primitives.wasm",
        "name": "System.Runtime.Serialization.Primitives.pl30y3i1h3.wasm",
        "integrity": "sha256-PcCRecZ8kgpU0dlaAJxFw/d1FSFffHv4xdj+dm/X+c4=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Runtime.Serialization.Xml.wasm",
        "name": "System.Runtime.Serialization.Xml.q7st8kfsnv.wasm",
        "integrity": "sha256-6gOVWpliJP7LPs2ovNnNbLIUwmvxO3YvAhHJdBkUgX0=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Runtime.wasm",
        "name": "System.Runtime.6vn8dkvk3v.wasm",
        "integrity": "sha256-0hfXgU97HfB6RbMYE07sv1zsGkF8akv2e3F0gXcR6Vo=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Security.AccessControl.wasm",
        "name": "System.Security.AccessControl.vpd5cq86v4.wasm",
        "integrity": "sha256-TfeW+el8o+HUH41deJAPbTl4+a+XaQ0i7CWRqG629H0=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Security.Claims.wasm",
        "name": "System.Security.Claims.13pfbshuy7.wasm",
        "integrity": "sha256-vZc4LS604Q4u7t7eD9IRtpWj0UR2L8fz86j0NjmpzCM=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Security.Cryptography.Pkcs.wasm",
        "name": "System.Security.Cryptography.Pkcs.2sv0duc32o.wasm",
        "integrity": "sha256-HnrRT6+UI9W/Ug/VF+2K0dnrrPT4lsWVqBw2IhVlCOM=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Security.Cryptography.Xml.wasm",
        "name": "System.Security.Cryptography.Xml.j9kezkq8kc.wasm",
        "integrity": "sha256-F9E9jXKcFbdfBg/7snD2gDUTtWhbbWeoSPk1xVyeq1Q=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Security.Cryptography.wasm",
        "name": "System.Security.Cryptography.00ahvlq0iw.wasm",
        "integrity": "sha256-4N+/lahigtlD1VfeiuVKyB4UzdIW0Vf7Ke7dlVnGyFw=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Security.Principal.Windows.wasm",
        "name": "System.Security.Principal.Windows.pwav8txwdg.wasm",
        "integrity": "sha256-+fTdScoSLP88057r3i+zPaOg5q8DXQh7vpw56cAMojw=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.ServiceModel.wasm",
        "name": "System.ServiceModel.3dk0gfdu13.wasm",
        "integrity": "sha256-F2OmgVYoVKp5oHZdWMWo2O7Z+Wvr1JWNeT+pZQAGRK4=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.ServiceModel.Duplex.wasm",
        "name": "System.ServiceModel.Duplex.hccdd63tc3.wasm",
        "integrity": "sha256-wfRorSMSt9wIaS9zk7pYl/e2It/TZfdmPhk1+scMSRs=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.ServiceModel.Primitives.wasm",
        "name": "System.ServiceModel.Primitives.oibktztti7.wasm",
        "integrity": "sha256-UDBadJrAMmd83lxLnZx5+zlO6jj40ZwCwg8SjWNhO5g=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.ServiceModel.Security.wasm",
        "name": "System.ServiceModel.Security.8pkegjgj07.wasm",
        "integrity": "sha256-TFy6toELDkw0m7PVdpXroCdXUOp+5tVGcxpHBmXbYrM=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Text.Encoding.Extensions.wasm",
        "name": "System.Text.Encoding.Extensions.8720sut0br.wasm",
        "integrity": "sha256-3FCX78qBXOqn3L/rLkuCo6yD1pwHbH2oG9DSEtn1u6U=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Text.Encodings.Web.wasm",
        "name": "System.Text.Encodings.Web.wa0mji5k05.wasm",
        "integrity": "sha256-+IltccH6C7+yr8GDR1naNfnKde+QMr+5Zi9yWHB9ljY=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Text.Json.wasm",
        "name": "System.Text.Json.zm31393ufm.wasm",
        "integrity": "sha256-VeDCM+SyokaaZpJAWV7Awlz95VY80NkGtEEuyRWw/xE=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Text.RegularExpressions.wasm",
        "name": "System.Text.RegularExpressions.coderdu8o3.wasm",
        "integrity": "sha256-RJQtCnWZZPffSG6Ppa2P7st8veRX29J2A0AL0I+mdCA=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Threading.Overlapped.wasm",
        "name": "System.Threading.Overlapped.7btzb3u89n.wasm",
        "integrity": "sha256-IzbeDZP16Nd3/zBj5R051wc5jCNnio+f9BYdG6Uhy+I=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Threading.Tasks.Extensions.wasm",
        "name": "System.Threading.Tasks.Extensions.1j5i8i6uom.wasm",
        "integrity": "sha256-fVxfb4bd1WU68zKS3huPHXs1yVi4yixNTaJZM5GZ3DE=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Threading.Thread.wasm",
        "name": "System.Threading.Thread.sujwo2x1qe.wasm",
        "integrity": "sha256-hNykacHkvYsdyxhj49EumutyKv6Ckox+u9SK+fT2uiw=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Threading.ThreadPool.wasm",
        "name": "System.Threading.ThreadPool.v9whajlo51.wasm",
        "integrity": "sha256-XXztQvWlGcOwk0ZcmUN0i1sK+rtZ+NA0N1tnHBKkWas=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Threading.wasm",
        "name": "System.Threading.81p2d751c9.wasm",
        "integrity": "sha256-PCST30GrE6wzvVtzte6dHdQS6qF99dq1XA6Q5xXQaSg=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Web.HttpUtility.wasm",
        "name": "System.Web.HttpUtility.sjtx2j21zf.wasm",
        "integrity": "sha256-KB5/PFiehSqBCXeHs91T8VHI8WH+zeK34gIwZqCjPNw=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Xml.Linq.wasm",
        "name": "System.Xml.Linq.dgagfdz6f0.wasm",
        "integrity": "sha256-E/TVeWqhsi/z+RF168faQB/dxl1RSA9nxzO5H8fScDA=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Xml.ReaderWriter.wasm",
        "name": "System.Xml.ReaderWriter.wwrh1ln1or.wasm",
        "integrity": "sha256-kGwyFiJtL91o98whZp3KPqfquXC19sRX5cxlhpixgB4=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Xml.XmlSerializer.wasm",
        "name": "System.Xml.XmlSerializer.acovr8mzt3.wasm",
        "integrity": "sha256-Bjip3h0JkT/k2uoAdw5IrfzWhQJAJBtJHrkReaYj/F4=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.wasm",
        "name": "System.v33j2z85l1.wasm",
        "integrity": "sha256-ewRuTVBvvXZcI3Y9bGavS+qYxztmOrFp01wsHWyvURM=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "netstandard.wasm",
        "name": "netstandard.ngezz5plk9.wasm",
        "integrity": "sha256-9zqLfSnPYiMh5j2enaQ9T1+cL/8D8urTL0igePrAfvU=",
        "cache": "force-cache"
      }
    ],
    "assembly": [],
    "satelliteResources": {
      "cs": [
        {
          "virtualPath": "System.ServiceModel.Primitives.resources.wasm",
          "name": "System.ServiceModel.Primitives.resources.s00x267f4t.wasm",
          "integrity": "sha256-XMiBldUyQNQ15Yp4GygwYMMc7uvGQNNOQI1NcB4f9rA=",
          "cache": "force-cache"
        }
      ],
      "de": [
        {
          "virtualPath": "AminoAcidsQuiz.resources.wasm",
          "name": "AminoAcidsQuiz.resources.d7c552bqnx.wasm",
          "integrity": "sha256-95XDZlJiIDOvkD5ZuehEhKHGOSz2wRrJJRWRwxMHQHw=",
          "cache": "force-cache"
        },
        {
          "virtualPath": "System.ServiceModel.Primitives.resources.wasm",
          "name": "System.ServiceModel.Primitives.resources.wztnq3dud7.wasm",
          "integrity": "sha256-nI2TQgsJpyJvoXqmw4GQrSr7wogxytgEIssI9AIk5Go=",
          "cache": "force-cache"
        }
      ],
      "el": [
        {
          "virtualPath": "AminoAcidsQuiz.resources.wasm",
          "name": "AminoAcidsQuiz.resources.6ths1yd5qr.wasm",
          "integrity": "sha256-KsJ48wQVYShS/f282eR9jZyU4+YxWDbBor8BvBqHXTc=",
          "cache": "force-cache"
        }
      ],
      "en-US": [
        {
          "virtualPath": "AminoAcidsQuiz.resources.wasm",
          "name": "AminoAcidsQuiz.resources.8fxj8kwtgx.wasm",
          "integrity": "sha256-DLh8pwmQHZSmYxBu3McLCR9i1hqF3vc2TUQjLS623RY=",
          "cache": "force-cache"
        }
      ],
      "es": [
        {
          "virtualPath": "AminoAcidsQuiz.resources.wasm",
          "name": "AminoAcidsQuiz.resources.9dojoi3q6z.wasm",
          "integrity": "sha256-HVJ21OUKJuRErMSBXc1JaBmoN0pwXV4BKsVK2mZ6XWE=",
          "cache": "force-cache"
        },
        {
          "virtualPath": "System.ServiceModel.Primitives.resources.wasm",
          "name": "System.ServiceModel.Primitives.resources.9x9e8vpihg.wasm",
          "integrity": "sha256-Q+IEo6Y3ep+Yq3dGoNv+dONx+vbGjZWxMpZXpRNErfI=",
          "cache": "force-cache"
        }
      ],
      "fr": [
        {
          "virtualPath": "AminoAcidsQuiz.resources.wasm",
          "name": "AminoAcidsQuiz.resources.h5h45e7lww.wasm",
          "integrity": "sha256-1fyMVNPkeThc5x13hfcH1uGKk0aG/6b/BtuZgvh8Fow=",
          "cache": "force-cache"
        },
        {
          "virtualPath": "OpenSilver.resources.wasm",
          "name": "OpenSilver.resources.b0oyd1ufko.wasm",
          "integrity": "sha256-Cx8uNmmP8Ihhmn5hhQlYDxhauwZZx3YYRo4biFAGSgQ=",
          "cache": "force-cache"
        },
        {
          "virtualPath": "System.ServiceModel.Primitives.resources.wasm",
          "name": "System.ServiceModel.Primitives.resources.uzoepk1yy0.wasm",
          "integrity": "sha256-Co/FgGAC4oUBaOKCXGTGERxAzccQSoSd+jDV0zItEpE=",
          "cache": "force-cache"
        }
      ],
      "it": [
        {
          "virtualPath": "AminoAcidsQuiz.resources.wasm",
          "name": "AminoAcidsQuiz.resources.ldakmg7234.wasm",
          "integrity": "sha256-iXeVy+DsLl4KVfiYUzFUSG96sEFCkR0aMiD3ZjvIkQA=",
          "cache": "force-cache"
        },
        {
          "virtualPath": "System.ServiceModel.Primitives.resources.wasm",
          "name": "System.ServiceModel.Primitives.resources.e41641zc7p.wasm",
          "integrity": "sha256-0ly1hwxOhX6jfe9mrhfFbRGKqs0Ao6OSmKyM2gdfH04=",
          "cache": "force-cache"
        }
      ],
      "ja": [
        {
          "virtualPath": "AminoAcidsQuiz.resources.wasm",
          "name": "AminoAcidsQuiz.resources.5rb5xtzv94.wasm",
          "integrity": "sha256-wQ94e9lC7mU5okeYUfvV9NQ+jv/QCmNFxumQ0fpx234=",
          "cache": "force-cache"
        },
        {
          "virtualPath": "System.ServiceModel.Primitives.resources.wasm",
          "name": "System.ServiceModel.Primitives.resources.fghrqu9dyr.wasm",
          "integrity": "sha256-H/PbAf6lMFRWbAzP4VrVN4xyjvYyh7pt2XQF6OEbg7Q=",
          "cache": "force-cache"
        }
      ],
      "ko": [
        {
          "virtualPath": "AminoAcidsQuiz.resources.wasm",
          "name": "AminoAcidsQuiz.resources.86dehx6f4x.wasm",
          "integrity": "sha256-0NA6UWqR/b2b17/d10xk7RhERJrPB/zId+zlFeP07rc=",
          "cache": "force-cache"
        },
        {
          "virtualPath": "System.ServiceModel.Primitives.resources.wasm",
          "name": "System.ServiceModel.Primitives.resources.0cs11t3wro.wasm",
          "integrity": "sha256-sKrfI/t4WFEyUpMbJqoXmsNl2qIklGhRBtQHihYPuFA=",
          "cache": "force-cache"
        }
      ],
      "pl": [
        {
          "virtualPath": "System.ServiceModel.Primitives.resources.wasm",
          "name": "System.ServiceModel.Primitives.resources.8222gwpw0f.wasm",
          "integrity": "sha256-EGnjR8wzoYLA94FezkPhtrxiB5zj6LMfpt+LUTxPg04=",
          "cache": "force-cache"
        }
      ],
      "pt-BR": [
        {
          "virtualPath": "System.ServiceModel.Primitives.resources.wasm",
          "name": "System.ServiceModel.Primitives.resources.nv8fwc9o65.wasm",
          "integrity": "sha256-TcWpMeSDQCudiVBR8gxSc2WeRx/CzvGXfp0/KANOe3g=",
          "cache": "force-cache"
        }
      ],
      "pt": [
        {
          "virtualPath": "AminoAcidsQuiz.resources.wasm",
          "name": "AminoAcidsQuiz.resources.spw3cyron1.wasm",
          "integrity": "sha256-YMwXD+Yk8VQX6gVuIPg8F4wQyItEEoRRBcLeZYh0jOA=",
          "cache": "force-cache"
        }
      ],
      "ru": [
        {
          "virtualPath": "AminoAcidsQuiz.resources.wasm",
          "name": "AminoAcidsQuiz.resources.okyqjrmy4z.wasm",
          "integrity": "sha256-eK8WLgEjzI6WI0MeKoHq6a1HlE8hCOKtpgb3G1tJ8xg=",
          "cache": "force-cache"
        },
        {
          "virtualPath": "System.ServiceModel.Primitives.resources.wasm",
          "name": "System.ServiceModel.Primitives.resources.r2qyztjans.wasm",
          "integrity": "sha256-fQAeCI4Ux+XEPUlsPnMTjYRqiVhEV3VSdvFu4B+xccY=",
          "cache": "force-cache"
        }
      ],
      "tr": [
        {
          "virtualPath": "System.ServiceModel.Primitives.resources.wasm",
          "name": "System.ServiceModel.Primitives.resources.b75mifghxb.wasm",
          "integrity": "sha256-KQ7TB8xv6BnAxA5XaAVUP5WoB2eEuYjizjh4Ew8a0/4=",
          "cache": "force-cache"
        }
      ],
      "zh-Hans": [
        {
          "virtualPath": "AminoAcidsQuiz.resources.wasm",
          "name": "AminoAcidsQuiz.resources.wpt6h1nd0w.wasm",
          "integrity": "sha256-9OC2taIUP80CK9WEGrOT81mIb1z01TcfYfFjStNthj4=",
          "cache": "force-cache"
        },
        {
          "virtualPath": "System.ServiceModel.Primitives.resources.wasm",
          "name": "System.ServiceModel.Primitives.resources.jnq9wrnhmd.wasm",
          "integrity": "sha256-LwvRZb/jSDArVpFuoD8j9aYTApLXu0MxCequtiTza3g=",
          "cache": "force-cache"
        }
      ],
      "zh-Hant": [
        {
          "virtualPath": "AminoAcidsQuiz.resources.wasm",
          "name": "AminoAcidsQuiz.resources.ky91n0b6jv.wasm",
          "integrity": "sha256-VHD3nHCTBgKf1NcA+Z81+FFRDryH/X2o4dsvkH+CyYE=",
          "cache": "force-cache"
        },
        {
          "virtualPath": "System.ServiceModel.Primitives.resources.wasm",
          "name": "System.ServiceModel.Primitives.resources.8ge731imjt.wasm",
          "integrity": "sha256-6GuM+M9LJmtIM7VtFIqePOfYhcffkCwdNBfvwWYc2wc=",
          "cache": "force-cache"
        }
      ]
    }
  },
  "debugLevel": 0,
  "linkerEnabled": true,
  "globalizationMode": "all",
  "extensions": {
    "blazor": {}
  },
  "runtimeConfig": {
    "runtimeOptions": {
      "configProperties": {
        "Microsoft.AspNetCore.Components.Routing.RegexConstraintSupport": false,
        "MVVMTOOLKIT_ENABLE_INOTIFYPROPERTYCHANGING_SUPPORT": true,
        "Microsoft.Extensions.DependencyInjection.VerifyOpenGenericServiceTrimmability": true,
        "System.ComponentModel.DefaultValueAttribute.IsSupported": false,
        "System.ComponentModel.Design.IDesignerHost.IsSupported": false,
        "System.ComponentModel.TypeConverter.EnableUnsafeBinaryFormatterInDesigntimeLicenseContextSerialization": false,
        "System.ComponentModel.TypeDescriptor.IsComObjectDescriptorSupported": false,
        "System.Data.DataSet.XmlSerializationIsSupported": false,
        "System.Diagnostics.Debugger.IsSupported": false,
        "System.Diagnostics.Metrics.Meter.IsSupported": false,
        "System.Diagnostics.Tracing.EventSource.IsSupported": false,
        "System.GC.Server": true,
        "System.Globalization.Invariant": false,
        "System.TimeZoneInfo.Invariant": false,
        "System.Linq.Enumerable.IsSizeOptimized": true,
        "System.Net.Http.EnableActivityPropagation": false,
        "System.Net.Http.WasmEnableStreamingResponse": true,
        "System.Net.SocketsHttpHandler.Http3Support": false,
        "System.Reflection.Metadata.MetadataUpdater.IsSupported": false,
        "System.Resources.ResourceManager.AllowCustomResourceTypes": false,
        "System.Resources.UseSystemResourceKeys": true,
        "System.Runtime.CompilerServices.RuntimeFeature.IsDynamicCodeSupported": true,
        "System.Runtime.InteropServices.BuiltInComInterop.IsSupported": false,
        "System.Runtime.InteropServices.EnableConsumingManagedCodeFromNativeHosting": false,
        "System.Runtime.InteropServices.EnableCppCLIHostActivation": false,
        "System.Runtime.InteropServices.Marshalling.EnableGeneratedComInterfaceComImportInterop": false,
        "System.Runtime.Serialization.EnableUnsafeBinaryFormatterSerialization": false,
        "System.StartupHookProvider.IsSupported": false,
        "System.Text.Encoding.EnableUnsafeUTF7Encoding": false,
        "System.Text.Json.JsonSerializer.IsReflectionEnabledByDefault": true,
        "System.Threading.Thread.EnableAutoreleasePool": false,
        "Microsoft.AspNetCore.Components.Endpoints.NavigationManager.DisableThrowNavigationException": false
      }
    }
  }
}/*json-end*/);export{gt as default,ft as dotnet,mt as exit};
