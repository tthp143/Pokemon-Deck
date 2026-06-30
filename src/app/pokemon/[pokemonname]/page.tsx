"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { Avatar, Box, Button, Card, CardContent, Chip, Skeleton } from "@mui/material";
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
  cries?: {
    latest: string;
    legacy: string;
  };
}

interface EvolutionChainNode {
  species?: {
    name: string;
  };
  evolves_to?: EvolutionChainNode[];
}

export default function PokemonDetail() {
  const params = useParams();
  const router = useRouter();
  const pokemonName = params.pokemonname as string;
  const [pokemon, setPokemon] = useState<PokemonDetail | null>(null);
  const [evolutionChain, setEvolutionChain] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!pokemonName) return;

    const loadPokemon = async () => {
      try {
        const [pokemonResponse, speciesResponse] = await Promise.all([
          fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`),
          fetch(`https://pokeapi.co/api/v2/pokemon-species/${pokemonName}`),
        ]);

        if (!pokemonResponse.ok) throw new Error("Pokemon not found");
        if (!speciesResponse.ok) throw new Error("Could not load species data");

        const pokemonData = await pokemonResponse.json();
        const speciesData = await speciesResponse.json();

        let chain: string[] = [];
        if (speciesData.evolution_chain?.url) {
          const evolutionResponse = await fetch(speciesData.evolution_chain.url);
          if (evolutionResponse.ok) {
            const evolutionData = await evolutionResponse.json();
            const collectNames = (node: EvolutionChainNode): string[] => {
              const names = [node.species?.name].filter(Boolean) as string[];
              if (!node.evolves_to?.length) {
                return names;
              }
              return names.concat(...node.evolves_to.map(collectNames));
            };
            chain = collectNames(evolutionData.chain);
          }
        }

        setPokemon(pokemonData);
        setEvolutionChain(chain);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error");
      } finally {
        setLoading(false);
      }
    };

    loadPokemon();
  }, [pokemonName]);

  if (loading) {
    return (
      <Container sx={{ py: 4 }}>
        <Skeleton variant="rectangular" width={120} height={40} sx={{ mb: 2 }} />
        <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" }, gap: 4 }}>
          <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <Skeleton variant="circular" width={250} height={250} sx={{ mb: 2 }} />
            <Skeleton variant="text" width="70%" height={48} />
            <Skeleton variant="text" width="40%" height={24} />
            <Skeleton variant="rectangular" height={80} width="100%" sx={{ mt: 2 }} />
          </Box>
          <Box>
            <Skeleton variant="rectangular" height={140} sx={{ mb: 2 }} />
            <Skeleton variant="rectangular" height={140} sx={{ mb: 2 }} />
            <Skeleton variant="rectangular" height={220} />
          </Box>
        </Box>
      </Container>
    );
  }

  if (error || !pokemon) {
    return (
      <Container sx={{ py: 4 }}>
        <Box>
          <Typography variant="h4" color="error" sx={{ mb: 2 }}>
            {error || "Pokemon not found"}
          </Typography>
          <Button variant="contained" startIcon={<ArrowBackIcon />} onClick={() => router.back()}>
            กลับไป
          </Button>
        </Box>
      </Container>
    );
  }

  return (
    <Container sx={{ py: 4 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3, gap: 2, flexWrap: "wrap" }}>
        <Button variant="contained" startIcon={<ArrowBackIcon />} onClick={() => router.back()}>
          กลับไป
        </Button>
        <Link href="/about" style={{ textDecoration: "none" }}>
          <Button variant="outlined">
            About this project
          </Button>
        </Link>
      </Box>

      <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" }, gap: 4, mb: 4 }}>
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <Avatar
            alt={pokemon.name}
            sx={{ width: 250, height: 250, mb: 2 }}
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`}
          />
          <Typography variant="h3" sx={{ textTransform: "capitalize", mb: 2 }}>
            {pokemon.name}
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
            #{pokemon.id}
          </Typography>

          <Box sx={{ mb: 3 }}>
            <Typography variant="h6" sx={{ mb: 1 }}>
              ประเภท (Types)
            </Typography>
            <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
              {pokemon.types.map((type) => (
                <Box
                  key={type.type.name}
                  sx={{
                    px: 2,
                    py: 1,
                    borderRadius: "20px",
                    backgroundColor: "#0a0b0c",
                    border: "1px solid #1976d2",
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

        <Box>
          <Card sx={{ mb: 2 }}>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2 }}>
                ข้อมูลพื้นฐาน
              </Typography>
              <Typography variant="body1" sx={{ mb: 1 }}>
                <strong>ความสูง:</strong> {pokemon.height / 10} m
              </Typography>
              <Typography variant="body1" sx={{ mb: 1 }}>
                <strong>น้ำหนัก:</strong> {pokemon.weight / 10} kg
              </Typography>
            </CardContent>
          </Card>

          <Card sx={{ mb: 2 }}>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2 }}>
                ความสามารถ (Abilities)
              </Typography>
              {pokemon.abilities.map((ability) => (
                <Typography key={ability.ability.name} variant="body2" sx={{ textTransform: "capitalize", mb: 1 }}>
                  • {ability.ability.name}
                </Typography>
              ))}
            </CardContent>
          </Card>

          <Card sx={{ mb: 2 }}>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2 }}>
                วิวัฒนาการ (Evolution)
              </Typography>
              {evolutionChain.length > 0 ? (
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, alignItems: "center" }}>
                  {evolutionChain.map((name, index) => (
                    <Box key={`${name}-${index}`} sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <Chip label={name} sx={{ textTransform: "capitalize" }} />
                      {index < evolutionChain.length - 1 && <Typography color="text.secondary">→</Typography>}
                    </Box>
                  ))}
                </Box>
              ) : (
                <Typography color="text.secondary">ไม่พบข้อมูลวิวัฒนาการ</Typography>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2 }}>
                เสียงของโปเกม่อน
              </Typography>
              {pokemon.cries?.latest ? (
                <>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                    เล่นเสียงประกอบของโปเกม่อนตัวนี้
                  </Typography>
                  <audio controls src={pokemon.cries.latest}>
                    เบราว์เซอร์ของคุณไม่รองรับไฟล์เสียง
                  </audio>
                </>
              ) : (
                <Typography color="text.secondary">ยังไม่มีเสียงให้เล่นในตอนนี้</Typography>
              )}
            </CardContent>
          </Card>
        </Box>
      </Box>
    </Container>
  );
}