async function getTodo() {
    try {
        console.log("Mencoba mengambil data ...");
        const res = await fetch("https://jsonplaceholder.typicode.com/todos/10");
        if (!res.ok) {
            throw new Error("Data tidak Ditemukan!");
        }
        const data = await res.json();
        console.log(data.title);
    } catch(error) {
        console.log("Terjadi Error! \n" + error.message);
    } finally {
        console.log("--- Proses Selesai ---");
    }
}

getTodo();