const namaJudy = "Judy Hopps";
const namaNick = "Nick Wilde";

let jarakJudyPerHari = 3;
let jarakNickPerHari = 2;

let totalJudy = 0;
let totalNick = 0;

console.log("=== LATIHAN PENJAGA ZOOTOPIA ===");
console.log("");
console.log(`Jarak lari per hari:`);
console.log(`${namaJudy}: ${jarakJudyPerHari} km`);
console.log(`${namaNick}: ${jarakNickPerHari} km`);
console.log("");

for (let hari = 1; hari <= 5; hari++) {
    console.log(`Hari ${hari}:`);
    console.log(`- ${namaJudy} lari ${jarakJudyPerHari} km`);
    console.log(`- ${namaNick} lari ${jarakNickPerHari} km`);
    console.log("");
    
    totalJudy += jarakJudyPerHari;
    totalNick += jarakNickPerHari;
}

console.log("=== TOTAL JARAK SELAMA 5 HARI ===");
console.log(`${namaJudy}: ${totalJudy} km`);
console.log(`${namaNick}: ${totalNick} km`);