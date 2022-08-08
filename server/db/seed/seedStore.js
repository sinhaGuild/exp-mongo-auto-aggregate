const clan = [
  { name: "Uzumaki", population: 2 },
  { name: "Uchiha", population: 200 },
];
const village = [{ name: "Konoha", country: "Fire" }];
const jutsu = [
  {
    name: "Chidori",
    description: "Electricity strike",
    rank: 6,
  },
  {
    name: "Sharingan",
    description: "Visual Doujutsu",
    rank: 7,
  },
  {
    name: "Sharingan Susanoo",
    description: "Embody and spirit of the black flame warrior",
    rank: 2,
  },
  {
    name: "Kagebunshin no jutsu",
    description: "tajuu kage bunshin no jutsu.",
    rank: 100,
  },
  {
    name: "Rasengan",
    description: "Concentrated ball of chakra.",
    rank: 5,
  },
  {
    name: "Eroke no jutsu",
    description: "Transform into a sexy partner.",
    rank: 999,
  },
];
const shinobi = [
  {
    shinobi_name: "Naruto",
    designation: "Chunin",
    clan: "Uzumaki",
    village: "Konoha",
    jutsu: ["Kagebunshin no jutsu", "Rasengan", "Eroke no jutsu"],
  },
  {
    shinobi_name: "Sasuke",
    designation: "Chunin",
    clan: "Uchiha",
    village: "Konoha",
    jutsu: ["Chidori", "Sharingan", "Susanoo"],
  },
];

module.exports = {
  clan,
  village,
  jutsu,
  shinobi,
};
