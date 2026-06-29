"use client"
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { Avatar, Box, Button, CircularProgress, Card, CardContent } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

interface PokemonDetail {
  id: number;
  name: string;
  height: number;
  weight: number;
  types: Array<{
    type: {
      name: string;
    };
  }>;
  abilities: Array<{
    ability: {
      name: string;
    };
  }>;
  stats: Array<{
    stat: {
      name: string;
    };
    base_stat: number;
  }>;
}

export default function PokemonDetail() {
  const params = useParams();
  const router = useRouter();
  const pokemonName = params.pokemonname as string;
  const [pokemon, setPokemon] = useState<PokemonDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (pokemonName) {
      fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
        .then((response) => {
          if (!response.ok) throw new Error("Pokemon not found");
          return response.json();
        })
        .then((data) => {
          setPokemon(data);
          setLoading(false);
        })
        .catch((err) => {
          setError(err.message);
          setLoading(false);
        });
    }
  }, [pokemonName]);

  if (loading) {
    return (
      <Container sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh" }}>
        <CircularProgress />
      </Container>
    );
  }

  if (error || !pokemon) {
    return (
      <Container>
        <Box sx={{ mt: 4 }}>
          <Typography variant="h4" color="error">{error || "Pokemon not found"}</Typography>
          <Button 
            variant="contained" 
            startIcon={<ArrowBackIcon />}
            onClick={() => router.back()}
            sx={{ mt: 2 }}
          >
            กลับไป
          </Button>
        </Box>
      </Container>
    );
  }

  return (
    <Container>
      <Box sx={{ mt: 4 }}>
        <Button 
          variant="contained" 
          startIcon={<ArrowBackIcon />}
          onClick={() => router.back()}
          sx={{ mb: 3 }}
        >
          กลับไป
        </Button>

        <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" }, gap: 4, mb: 4 }}>
          {/* ด้านซ้าย - รูปภาพและข้อมูลพื้นฐาน */}
          <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <Avatar
              alt={pokemon.name}
              sx={{ width: 250, height: 250, mb: 2 }}
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`}
            />
            <Typography variant="h3" sx={{ textTransform: "capitalize", mb: 2 }}>
              {pokemon.name}
            </Typography>
            <Typography variant="body1" color="textSecondary" sx={{ mb: 2 }}>
              #{pokemon.id}
            </Typography>

            {/* Types */}
            <Box sx={{ mb: 3 }}>
              <Typography variant="h6" sx={{ mb: 1 }}>ประเภท (Types)</Typography>
              <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
                {pokemon.types.map((type) => (
                  <Box
                    key={type.type.name}
                    sx={{
                      px: 2,
                      py: 1,
                      borderRadius: "20px",
                      backgroundColor: "#0a0b0c",
                      border: "1px solid #1976d2"
                    }}
                  >
                    <Typography variant="body2" sx={{ textTransform: "capitalize" }}>
                      {type.type.name}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </Box>
          </Box>

          {/* ด้านขวา - ข้อมูลรายละเอียด */}
          <Box>
            {/* Basic Info */}
            <Card sx={{ mb: 2 }}>
              <CardContent>
                <Typography variant="h6" sx={{ mb: 2 }}>ข้อมูลพื้นฐาน</Typography>
                <Typography variant="body1" sx={{ mb: 1 }}>
                  <strong>ความสูง:</strong> {pokemon.height / 10} m
                </Typography>
                <Typography variant="body1" sx={{ mb: 1 }}>
                  <strong>น้ำหนัก:</strong> {pokemon.weight / 10} kg
                </Typography>
              </CardContent>
            </Card>

            {/* Abilities */}
            <Card sx={{ mb: 2 }}>
              <CardContent>
                <Typography variant="h6" sx={{ mb: 2 }}>ความสามารถ (Abilities)</Typography>
                {pokemon.abilities.map((ability) => (
                  <Typography key={ability.ability.name} variant="body2" sx={{ textTransform: "capitalize", mb: 1 }}>
                    • {ability.ability.name}
                  </Typography>
                ))}
              </CardContent>
            </Card>

            {/* Stats */}
            <Card>
              <CardContent>
                <Typography variant="h6" sx={{ mb: 2 }}>สถิติ (Stats)</Typography>
                {pokemon.stats.map((stat) => (
                  <Box key={stat.stat.name} sx={{ mb: 2 }}>
                    <Box sx={{ display: "flex", justifyContent: "space-between", mb: 0.5 }}>
                      <Typography variant="body2" sx={{ textTransform: "capitalize" }}>
                        {stat.stat.name}
                      </Typography>
                      <Typography variant="body2" sx={{ fontWeight: "bold" }}>
                        {stat.base_stat}
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        height: "8px",
                        borderRadius: "4px",
                        backgroundColor: "#e0e0e0",
                        overflow: "hidden"
                      }}
                    >
                      <Box
                        sx={{
                          height: "100%",
                          width: `${(stat.base_stat / 255) * 100}%`,
                          backgroundColor: stat.base_stat > 100 ? "#4caf50" : "#2196f3",
                          transition: "width 0.3s ease"
                        }}
                      />
                    </Box>
                  </Box>
                ))}
              </CardContent>
            </Card>
          </Box>
        </Box>
      </Box>
    </Container>
  );
}