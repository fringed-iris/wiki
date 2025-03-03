import { florr } from "https://fringed-iris.github.io/wiki/scripts/data.js";
window.florr = florr;

export function getMain(baseChance) {
    main = {
        getDropTable: `
const dropTable = [];
for(let mob = 0; mob < ${window.florr.rarity.length}; mob++) { //mob
    const dropList = [];
    for(let petal = 0; petal < ${window.florr.rarity.length}; petal++) { //petal
        let drop = florrio.utils.calculateDropChance(${baseChance},mob,petal);
        dropList.push(drop);
    }
    dropTable.push(dropList);
}
console.log(JSON.stringify(dropTable));`,
    }
    return main;
}

//expected function

// const dropTable = [];
// for(let mob = 0; mob < 9; mob++) { //mob
//     const dropList = [];
//     for(let petal = 0; petal < 9; petal++) { //petal
//         const drop = florrio.utils.calculateDropChance(1,mob,petal);
//         dropList.push(drop);
//     }
//     dropTable.push(dropList);
// }
// console.log(JSON.stringify(dropTable));