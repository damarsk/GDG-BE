console.log("---Tiket Masuk Zoo---");
let pengunjung = [
    {nama: "damar", umur: 5},
    {nama: "santo", umur: 10},
    {nama: "rahmat", umur: 35},
    {nama: "ashifa", umur: 29}
];

let hargaTiket = 50000;

for (let i = 0; i < pengunjung.length; i++) {
    let namaPengunjung = pengunjung[i].nama;
    let umur = pengunjung[i].umur;
    let pesan = "";

    if (umur < 5) {
        pesan = "Free! Untuk balita";
    } else if (umur <= 12) {
        pesan = "Diskon 50% harga tiket: " + (hargaTiket / 2);
    } else if (umur >= 60) {
        pesan = "Diskon 30% harga tiket: " + (hargaTiket * 0.7);
    } else {
        pesan = "Harga normal: " + hargaTiket;
    }

    console.log("Nama pengunjung    :", namaPengunjung);
    console.log("Umur:", umur, "tahun");
    console.log(pesan);
    console.log("---------------------------------");
}
