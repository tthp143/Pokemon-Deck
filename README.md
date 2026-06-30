# Pokemon App

เว็บแอปพลิเคชันสำหรับสำรวจและดูรายละเอียดโปเกม่อนแบบเรียลไทม์ พัฒนาด้วย [Next.js](https://nextjs.org) และดึงข้อมูลจาก [PokeAPI](https://pokeapi.co) โดยตรง

โปรเจกต์นี้พัฒนาขึ้นสำหรับรายวิชา **IN403101 Front-end Web Programming** หลักสูตร Computer Science มหาวิทยาลัยขอนแก่น

## ฟีเจอร์

- **หน้ารวมโปเกม่อน** — แสดงโปเกม่อนทั้งหมด (สูงสุด 1,351 ตัว) ในรูปแบบการ์ดแบบ grid พร้อมเลขประจำตัวและภาพ sprite พร้อม loading skeleton ระหว่างโหลดข้อมูล
- **หน้ารายละเอียดโปเกม่อน** — คลิกที่การ์ดเพื่อดูข้อมูลเชิงลึกของโปเกม่อนแต่ละตัว ประกอบด้วย
  - ภาพ official artwork ความสูง น้ำหนัก และประเภท (Types)
  - ความสามารถ (Abilities)
  - สายวิวัฒนาการ (Evolution Chain) แสดงเป็นลำดับต่อเนื่อง
  - เสียงร้องของโปเกม่อน (Cries) ที่สามารถเล่นได้ผ่าน audio player ในหน้าเว็บ
- **หน้า About** — ข้อมูลเกี่ยวกับโปรเจกต์และผู้พัฒนา

## เทคโนโลยีที่ใช้

| ส่วนประกอบ | รายละเอียด |
|---|---|
| Framework | [Next.js](https://nextjs.org) 16 (App Router) |
| UI Library | [React](https://react.dev) 19 |
| ภาษา | TypeScript |
| Component Library | [MUI (Material UI)](https://mui.com) v9 |
| แหล่งข้อมูล | [PokeAPI](https://pokeapi.co/docs/v2) |
| Linting | ESLint (eslint-config-next) |

## โครงสร้างหน้าเว็บ

```
/                       หน้ารวมรายชื่อโปเกม่อนทั้งหมด
/pokemon/[pokemonname]  หน้ารายละเอียดโปเกม่อนแต่ละตัว (dynamic route)
/about                  หน้าข้อมูลเกี่ยวกับโปรเจกต์
```

## เริ่มต้นใช้งาน

ติดตั้ง dependencies:

```bash
npm install
```

รันเซิร์ฟเวอร์สำหรับพัฒนา:

```bash
npm run dev
```

เปิด [http://localhost:3000](http://localhost:3000) ด้วยเบราว์เซอร์เพื่อดูผลลัพธ์

คำสั่งอื่น ๆ ที่มีให้ใช้งาน:

```bash
npm run build   # build โปรเจกต์สำหรับ production
npm run start   # รันเซิร์ฟเวอร์ production หลัง build เสร็จ
npm run lint    # ตรวจสอบโค้ดด้วย ESLint
```

## การทำงานของแอป

แอปนี้ดึงข้อมูลจาก PokeAPI โดยตรงฝั่ง client ผ่าน `fetch` ภายใน React component (`"use client"`) โดยไม่มีการเก็บข้อมูลไว้ใน backend ของตัวเอง:

- หน้ารวมโปเกม่อนเรียก `GET /pokemon?limit=1351` เพื่อดึงรายชื่อทั้งหมดในครั้งเดียว
- หน้ารายละเอียดเรียกข้อมูล 3 ส่วนพร้อมกัน ได้แก่ ข้อมูลโปเกม่อน (`/pokemon/{name}`), ข้อมูลสปีชีส์ (`/pokemon-species/{name}`) เพื่อนำไปหา evolution chain, และข้อมูลสายวิวัฒนาการ (`/evolution-chain/{id}`)
- ภาพ sprite และ official artwork ดึงจาก [PokeAPI sprites repository](https://github.com/PokeAPI/sprites) บน GitHub

## ผู้พัฒนา

- **ชื่อ:** นายธนกร ทิพเนตร
- **รายวิชา:** IN403101 Front-end Web Programming
- **หลักสูตร:** Computer Science
- **มหาวิทยาลัย:** มหาวิทยาลัยขอนแก่น
- **Source Code:** [github.com/tthp143/Pokemon-Deck](https://github.com/tthp143/Pokemon-Deck.git)

## เรียนรู้เพิ่มเติม

- [Next.js Documentation](https://nextjs.org/docs)
- [PokeAPI Documentation](https://pokeapi.co/docs/v2)
- [MUI Documentation](https://mui.com/material-ui/getting-started/)
