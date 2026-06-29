"use client"
import Image from "next/image";import Link from "next/link";import styles from "./page.module.css";
import Typography from "@mui/material/Typography";
import { useState,useEffect } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Container from "@mui/material/Container";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { Avatar, Box } from "@mui/material";

interface PokemonResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Array<{
    name: string;
    url: string;
  }>;
}

export default function Home() {
  // ประกาศ state สำหรับเก็บข้อมูล Pokemon
  const [pokemonData, setPokemonData] = useState<PokemonResponse | null>(null);
  const [loading, setLoading] = useState(true);
  
  // ฟังก์ชั่น เมื่อมีการเปลี่ยนแปลงตัวแปร state ที่กำหนด
  useEffect(() => {
    const fetchAllPokemon = async () => {
      try {
        // ดึงข้อมูล 1351 ตัว
        const response = await fetch("https://pokeapi.co/api/v2/pokemon/?limit=1351");
        const data = await response.json();
        setPokemonData(data);
        console.log("useEffect is called, total pokemon:", data.count);
      } catch (error) {
        console.error("Error fetching Pokemon data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAllPokemon();
  }, []);
  return( 
    <Container>
      <Typography variant="h1">Pokemon App</Typography>
      {pokemonData && (
        <Box sx={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 2, mt: 3 }}>
          {pokemonData.results.map((pokemon) => (
            <Link href={`/pokemon/${pokemon.name}`} key={pokemon.name} style={{ textDecoration: "none" }}>
              <Card 
                sx={{ 
                  display: "flex", 
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  aspectRatio: "1/1",
                  padding: 2,
                  cursor: "pointer",
                  transition: "transform 0.2s, box-shadow 0.2s",
                  "&:hover": {
                    transform: "scale(1.05)",
                    boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)"
                  }
                }}
              >
                <CardContent sx={{ textAlign: "center" }}>
                  <Typography variant="body2" color="textSecondary" sx={{ mb: 1 }}>
                    #{pokemon.url.split('/')[6]}
                  </Typography>
                  <Avatar
                    alt={pokemon.name}
                    sx={{ width: 100, height: 100, margin: "0 auto", marginBottom: 1 }}
                    src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.url.split('/')[6]}.png`}
                  />
                  <Typography variant="h6">{pokemon.name}</Typography>
                </CardContent>
              </Card>
            </Link>
          ))}
        </Box>
      )}
    </Container>
  );
}
