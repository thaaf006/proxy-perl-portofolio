export type MemberRole = "Leader" | "PJK" | "Member";

export interface Member {
  id: string;
  name: string;
  nickname?: string;
  role: MemberRole;
  image?: string;
  nim?: string;
  origin?: string;
  birthday?: string;
  hobbies?: string[];
  funFact?: string;
  instagram?: string;
  linkedin?: string;
  email?: string;
  github?: string;
  cv?: string;
}

// Add images as image: "/members/member-01.jpg" after placing them in public/members.
// Use full https:// social URLs and a plain email address. Leave unavailable fields undefined.
export const members: Member[] = [
  {
    id: "member-02",
    name: "Fahira Fasya",
    nickname: "Fasya",
    role: "PJK",
    origin: "Medan",
    birthday: "17 Maret 2006",
    hobbies: ["Baca buku", "Dengerin musik"],
    funFact: "Cat lovers tapi alergi kucing",
    image: "/members/member-fasya.png",
    instagram: "https://www.instagram.com/fasyafhr",
  },
  {
    id: "member-01",
    name: "Althaaf Bintang Evandhika",
    nickname: "Althaaf",
    role: "Leader",
    origin: "Tangerang",
    birthday: "16 Desember 2006",
    hobbies: ["sosibuk"],
    funFact: "jalan miring",
    image: "/members/member-01.jpg",
    instagram: "https://www.instagram.com/althaaf.be",
    github: "https://github.com/thaaf006",
  },
  {
    id: "member-03",
    name: "Muhammad Davian Shah",
    nickname: "Davian",
    role: "Member",
    origin: "Tangerang",
    birthday: "03 Januari 2007",
    hobbies: ["Rubik"],
    image: "/members/member-02.png",
    funFact: "Suka makan mie",
    instagram: "https://www.instagram.com/davi.an__",
    github: "https://github.com/DavianShah",
  },
  {
    id: "member-04",
    name: "Kornelius Christianto Putra Prasodjo",
    nickname: "Kornel, Kor, Nel",
    role: "Member",
    origin: "Jakarta Timur",
    birthday: "5 Mei 2007",
    hobbies: ["Tech", "Music", "Sports"],
    image: "/members/member-03.png",
    funFact: "ngepush dari mythic romawi ke immortal sehari",
    instagram: "https://www.instagram.com/kornelius_christopras",
    github: "https://github.com/CoRd1Ve",
  },
  {
    id: "member-05",
    name: "Muhammad Dzaky Danial",
    nickname: "Aael, Danial",
    role: "Member",
    origin: "Batam",
    birthday: "06 Januari 2006",
    hobbies: ["emel", "roblox(vd)"],
    image: "/members/member-dzaky.png",
    funFact: "cadel d kata mama",
    instagram: "https://www.instagram.com/daniaaell",
  },
  {
    id: "member-06",
    name: "Arzila Dwinda",
    nickname: "Arzila",
    role: "Member",
    origin: "Riau",
    birthday: "24 November 2006",
    hobbies: ["tidur"],
    funFact: "susah tidur + susah bangun",
    image: "/members/member-06.png",
    instagram: "https://www.instagram.com/oneendonlyone",
  },
  {
    id: "member-07",
    name: "Raihan Rizky Hidayat",
    nickname: "Raihan",
    role: "Member",
    origin: "Sukabumi",
    birthday: "5 Desember 2006",
    hobbies: ["Main basket"],
    funFact: "ga bisa jongkok",
    image: "/members/member-07.png",
    instagram: "https://www.instagram.com/raihaanrh",
  },
  {
    id: "member-08",
    name: "Malika Nazhifah Nur Ramadhani",
    nickname: "Malika",
    role: "Member",
    origin: "Jakarta",
    birthday: "7 Oktober 2006",
    hobbies: ["Tidur"],
    funFact: "Jalannya cepet",
    image: "/members/member-08-malika.png",
    instagram: "https://www.instagram.com/psychao_07",
  },
  {
    id: "member-09",
    name: "Aditya Triamaliza",
    nickname: "Aditya",
    role: "Member",
    origin: "Padang",
    birthday: "21 Juni 2007",
    hobbies: ["eksplor tempat baru"],
    image: "/members/member-09.png",
    funFact: "apaya",
    instagram: "https://www.instagram.com/_adiit.yaa",
  },
  {
    id: "member-10",
    name: "Nisrina Nailah Rayendra",
    nickname: "Nisrina",
    role: "Member",
    origin: "Bogor",
    birthday: "22 Februari 2007",
    hobbies: ["denger lagu"],
    image: "/members/member-nisrina.jpeg",
    funFact: "suka coret coret buku",
    instagram: "https://www.instagram.com/nisndsc",
  },
  {
    id: "member11",
    name: "Ahmad Al Farizi",
    nickname: "Fariz",
    role: "Member",
    origin: "Padang",
    birthday: "16 Oktober 2006",
    hobbies: ["Creativity enthusiast"],
    funFact: "sekali tidur bisa diatas 12 jam",
    image: "/members/member11.png",
    instagram: "https://www.instagram.com/achmaadal",
  },
  {
    id: "member-12",
    name: "Fachri Althaf Azizi",
    nickname: "Fachri",
    role: "Member",
    nim: "GXXXXXXXX",
    origin: "Yogyakarta",
    birthday: "9 September 2007",
    hobbies: ["games"],
    funFact: "Fakta yang menyenangkan",
    image: "/members/member-12.png",
    instagram: "https://www.instagram.com/fchriazzi"

  },
];
