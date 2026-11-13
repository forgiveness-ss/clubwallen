import {parse} from 'acorn';
import {readFile,writeFile} from 'node:fs/promises';
const text=await readFile(new URL('../src/components/Shop.js',import.meta.url),'utf8');
const ast=parse(text,{ecmaVersion:'latest',sourceType:'module'});
function literal(node){
 if(node.type==='Literal')return node.value;
 if(node.type==='ArrayExpression')return node.elements.map(literal);
 if(node.type==='ObjectExpression')return Object.fromEntries(node.properties.map(p=>[p.key.name??p.key.value,literal(p.value)]));
 throw Error('Catalog must contain only literal values');
}
let products;
function visit(node){if(!node||typeof node!=='object')return;if(node.type==='VariableDeclarator'&&node.id?.name==='a'&&node.init?.type==='ArrayExpression'){try{const value=literal(node.init);if(value[0]?.id==='reserve-hoodie')products=value;}catch{}}for(const value of Object.values(node)){if(Array.isArray(value))value.forEach(visit);else if(value&&typeof value==='object')visit(value);}}
visit(ast);if(!products)throw Error('Missing shop catalog');
const catalog=products.map(p=>({...p,kind:'merch',price_cents:Math.round(p.price*100),currency:'usd'}));
for(const [id,name,price]of [['crew','The Crew',350],['backroad','The Backroad Circle',650],['frontrow','The Front Row',900]])catalog.push({id:'membership-'+id,name,kind:'membership',price_cents:price*100,currency:'usd',description:'One year of membership. Manual renewal; no recurring charge.',sizes:['XS','S','M','L','XL','XXL'],image:null});
await writeFile(new URL('../server/catalog.json',import.meta.url),JSON.stringify(catalog,null,2)+'\n');
console.log('Exported',catalog.length,'products and membership plans');
