import * as React from 'react';
import * as jsxRuntime from 'react/jsx-runtime';
import * as navigation from './navigation.js';
import {getSupabaseBrowserClient} from './services.js';
import {factories,primaryIds} from './registry.js';
const exportsById=new Map([
  [13742,React], [40450,jsxRuntime], [30037,navigation],
  [6028,{default:navigation.Link}], [20755,{getSupabaseBrowserClient}],
]);
const executed=new Set();
export function loadComponent(id) {
  if(exportsById.has(id))return exportsById.get(id);
  const factory=factories[id];if(!factory)throw Error('Unknown page component '+id);
  if(!executed.has(factory)) {
    executed.add(factory);
    const primary=primaryIds[id];
    const context={
      i:loadComponent,
      s(entries,target=primary){
        const exported=exportsById.get(target)||{};
        for(let i=0;i<entries.length;){
          const name=entries[i++];
          if(entries[i]===0){i++;exported[name]=entries[i++];}
          else Object.defineProperty(exported,name,{enumerable:true,get:entries[i++]});
        }
        exportsById.set(target,exported);
      },
    };
    factory(context);
  }
  const result=exportsById.get(id);if(!result)throw Error('Component did not export '+id);return result;
}
