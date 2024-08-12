export function test(msg) { console.log(`message from test.js: ${msg}`) }
export async function load(){
  const req = await fetch(./test.json);
  const res = await req.json()
  console.log(res); 
}
