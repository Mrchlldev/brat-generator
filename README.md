# BRAT Generator

Frontend + Backend BRAT Generator pakai HTML, Tailwind CSS, JavaScript, Node.js, Express, dan `@napi-rs/canvas`.

## Install

```bash
npm install
npm start
```

Buka:

```txt
http://localhost:3000
```

## Request URL

Result langsung gambar PNG.

```txt
http://localhost:3000/api/brat?text=Brat%20Canvas%20%F0%9F%8E%A8&theme=white&blur=0
```

## Query

| Parameter | Wajib | Value |
| --- | --- | --- |
| text | Ya | Text bebas, max 500 karakter |
| theme | Tidak | white, black, green |
| blur | Tidak | 0, 1, 2, 3 |

## Contoh

```txt
/api/brat?text=Halo%20Guys&theme=green&blur=2
```
