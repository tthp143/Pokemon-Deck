import Link from "next/link";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

export default function AboutPage() {
  return (
    <Container sx={{ py: 4 }}>
      <Link href="/" style={{ textDecoration: "none" }}>
        <Button variant="contained" startIcon={<ArrowBackIcon />} sx={{ mb: 3 }}>
          กลับหน้าแรก
        </Button>
      </Link>

      <Card sx={{ maxWidth: 800, mx: "auto" }}>
        <CardContent>
          <Typography variant="h4" gutterBottom>
            About this project
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
            แอปนี้พัฒนาขึ้นเพื่อแสดงข้อมูลโปเกม่อนจาก PokeAPI แบบ interactive โดยมีฟีเจอร์หลัก เช่น
            ดูรายละเอียดโปเกม่อน, ดูวิวัฒนาการ, และฟังเสียงของโปเกม่อนแต่ละตัว
          </Typography>

          <Box sx={{ display: "grid", gap: 2 }}>
            <Typography variant="h6">ผู้พัฒนา</Typography>
            <Typography variant="body1">ชื่อ: นายธนกร ทิพเนตร</Typography>
            <Typography variant="body1">รายวิชา: IN403101 Front-end Web Programming</Typography>
            <Typography variant="body1">หลักสูตร: Computer Science</Typography>
            <Typography variant="body1">มหาวิทยาลัย: มหาวิทยาลัยขอนแก่น</Typography>
          </Box>

          <Box sx={{ mt: 3 }}>
            <Button
              component="a"
              href="https://github.com/tthp143/Pokemon-Deck.git"
              target="_blank"
              rel="noreferrer"
              variant="outlined"
            >
              GitHub Source Code
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
}
