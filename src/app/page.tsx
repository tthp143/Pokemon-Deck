"use client";

import Link from "next/link";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";
import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { Avatar, Box, Button, Skeleton } from "@mui/material";

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
  const [pokemonData, setPokemonData] = useState<PokemonResponse | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAllPokemon = async () => {
      try {
        const response = await fetch("https://pokeapi.co/api/v2/pokemon/?limit=1351");
        const data = await response.json();
        setPokemonData(data);
      } catch (error) {
        console.error("Error fetching Pokemon data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAllPokemon();
  }, []);

  return (
    <Container sx={{ py: 4 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3, gap: 2, flexWrap: "wrap" }}>
        <Box>
          <Typography variant="h3" component="h1" gutterBottom>
            Pokemon App
          </Typography>
          <Typography variant="body1" color="text.secondary">
            ค้นพบข้อมูลโปเกม่อนและรายละเอียดต่าง ๆ แบบเรียลไทม์
          </Typography>
        </Box>
        <Link href="/about" style={{ textDecoration: "none" }}>
          <Button variant="outlined">
            About this project
          </Button>
        </Link>
      </Box>

      {loading ? (
        <Box sx={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 2 }}>
          {Array.from({ length: 8 }).map((_, index) => (
            <Card key={index} sx={{ aspectRatio: "1 / 1", p: 2 }}>
              <CardContent sx={{ display: "flex", flexDirection: "column", alignItems: "center", height: "100%" }}>
                <Skeleton variant="text" width="40%" />
                <Skeleton variant="circular" width={100} height={100} sx={{ my: 2 }} />
                <Skeleton variant="text" width="60%" />
              </CardContent>
            </Card>
          ))}
        </Box>
      ) : pokemonData ? (
        <Box sx={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 2 }}>
          {pokemonData.results.map((pokemon) => {
            const pokemonId = pokemon.url.split("/")[6];

            return (
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
                      boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)",
                    },
                  }}
                >
                  <CardContent sx={{ textAlign: "center" }}>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                      #{pokemonId}
                    </Typography>
                    <Avatar
                      alt={pokemon.name}
                      sx={{ width: 100, height: 100, margin: "0 auto", mb: 1 }}
                      src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonId}.png`}
                    />
                    <Typography variant="h6" sx={{ textTransform: "capitalize" }}>
                      {pokemon.name}
                    </Typography>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </Box>
      ) : null}
    </Container>
  );
}
