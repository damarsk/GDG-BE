// Enkapsulasi
class Motor {
    private nomorMesin: string;
    constructor (nomorMesin: string) {
        this.nomorMesin = nomorMesin;
    }
    public tampilkanNomorMesin(): void {
        console.log("Nomor mesin: ", this.nomorMesin);
    }
}

const motor = new Motor("MX-123");
motor.tampilkanNomorMesin();

// Abstract
abstract class Kendaraan {
    abstract bergerak(): void;
}

class Sepeda extends Kendaraan {
    bergerak(): void {
        console.log("Sepeda dikayuh");
    }
}
const sepeda = new Sepeda();
sepeda.bergerak();

// Inherit
class Hewan {
    nama: string;
    constructor (nama: string) {
        this.nama = nama;
    }
    makan(): void {
        console.log(this.nama + " sedang makan");
    }
}

class Kucing extends Hewan {
    
}
const kucing = new Kucing("Ahmad");
kucing.makan();

// Polimorfisme
class AlatCetak {
    cetak(): void {
        console.log("Mencetak Dokumen");
    }
}

class PrinterFoto extends AlatCetak {
    cetak(): void {
        console.log("Mencetak Foto");
    }
}

const alat1: AlatCetak = new AlatCetak();
const alat2: AlatCetak = new PrinterFoto();

alat1.cetak();
alat2.cetak();