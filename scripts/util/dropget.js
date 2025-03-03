import { florr } from "https://fringed-iris.github.io/wiki/scripts/data.js";
window.florr = florr;

export default function (baseChance) {
    const main = {
        getDropTable: `
let dropTableStr = "[";
for(let mob = 0; mob < ${window.florr.rarity.length}; mob++) { //mob
    if(mob !== 0) dropTableStr += ","
    let dropListStr = "[";
    for(let petal = 0; petal < ${window.florr.rarity.length}; petal++) { //petal
        if(petal !== 0) dropListStr += ","
        let dropStr = florrio.utils.calculateDropChance(${baseChance},mob,petal).toFixed(8);
        if(dropStr == 0) dropStr = "0";
        dropListStr += dropStr;
    }
    dropListStr += "]";
    dropTableStr += dropListStr;
}
dropTableStr += "]";
console.log(dropTableStr);`,
    }
    return main;
}

//expected function

