import http from 'http';

let msg = "Belum ada pesan";

const server = http.createServer((req, res) => {
    if (req.method === 'GET' && req.url === '/') {
        res.writeHead(200, {'content-type': 'text/plain'});
        res.end("Home");
    } else if(req.method === 'GET' && req.url === '/pesan') {
        res.writeHead(200, {'content-type': 'text/plain'});
        res.end(msg);
    } else if(req.method === 'POST' && req.url === '/pesan') {
        let text = '';
        req.on('data', data => {
            text = data;
        })
        req.on('end', () => {
            msg = text;
            res.writeHead(200, {'content-type': 'text/plain'});
            res.end('Pesan berhasil disimpan');
        })
    } else if(req.method === 'PUT' && req.url === '/pesan') {
        let text = '';
        req.on('data', data => {
            text = data;
        })
        req.on('end', () => {
            msg = text;
            res.writeHead(200, {'content-type': 'text/plain'});
            res.end('Pesan berhasil diperbarui');
        })
    } else {
        res.writeHead(200, {'content-type': 'text/plain'});
        res.end('Endpoint tidak ditemukan');
    }
})

server.listen(3000, () => {
    console.log("Server berjalan di http://127.0.0.1:3000");
})