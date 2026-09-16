export type MemberRole = "Leader" | "PJK" | "Member";

export interface Member {
  id: string;
  name: string;
  role: MemberRole;
  image?: string;
  nim?: string;
  origin?: string;
  birthday?: string;
  hobbies?: string[];
  funFact?: string;
  instagram?: string;
  email?: string;
  github?: string;
}

// Add images as image: "/members/member-01.jpg" after placing them in public/members.
// Use full https:// social URLs and a plain email address. Leave unavailable fields undefined.
export const members: Member[] = [
  {
    id: "member-01",
    name: "Member 01",
    role: "Leader",
    nim: "GXXXXXXXX",
    origin: "City / Region",
    birthday: "DD Month YYYY",
    hobbies: ["Hobby 1", "Hobby 2"],
    funFact: "Fun fact goes here",
    image: "/members/member-01.jpg"
  },
  {
    id: "member-02",
    name: "Member 02",
    role: "PJK",
    nim: "GXXXXXXXX",
    origin: "City / Region",
    birthday: "DD Month YYYY",
    hobbies: ["Hobby 1", "Hobby 2"],
    funFact: "Fun fact goes here",
    image: "/members/member-01.jpg"
  },
  {
    id: "member-03",
    name: "Member 03",
    role: "Member",
    nim: "GXXXXXXXX",
    origin: "City / Region",
    birthday: "DD Month YYYY",
    hobbies: ["Hobby 1", "Hobby 2"],
    funFact: "Fun fact goes here",
    image: "/members/member-01.jpg"
  },
  {
    id: "member-04",
    name: "Member 04",
    role: "Member",
    nim: "GXXXXXXXX",
    origin: "City / Region",
    birthday: "DD Month YYYY",
    hobbies: ["Hobby 1", "Hobby 2"],
    funFact: "Fun fact goes here",
    image: "/members/member-01.jpg"
  },
  {
    id: "member-05",
    name: "Member 05",
    role: "Member",
    nim: "GXXXXXXXX",
    origin: "City / Region",
    birthday: "DD Month YYYY",
    hobbies: ["Hobby 1", "Hobby 2"],
    funFact: "Fun fact goes here",
    image: "/members/member-01.jpg"
  },
  {
    id: "member-06",
    name: "Member 06",
    role: "Member",
    nim: "GXXXXXXXX",
    origin: "City / Region",
    birthday: "DD Month YYYY",
    hobbies: ["Hobby 1", "Hobby 2"],
    funFact: "Fun fact goes here",
    image: "/members/member-01.jpg"
  },
  {
    id: "member-07",
    name: "Member 07",
    role: "Member",
    nim: "GXXXXXXXX",
    origin: "City / Region",
    birthday: "DD Month YYYY",
    hobbies: ["Hobby 1", "Hobby 2"],
    funFact: "Fun fact goes here",
    image: "/members/member-01.jpg"
  },
  {
    id: "member-08",
    name: "Member 08",
    role: "Member",
    nim: "GXXXXXXXX",
    origin: "City / Region",
    birthday: "DD Month YYYY",
    hobbies: ["Hobby 1", "Hobby 2"],
    funFact: "Fun fact goes here",
    image: "/members/member-01.jpg"
  },
  {
    id: "member-09",
    name: "Member 09",
    role: "Member",
    nim: "GXXXXXXXX",
    origin: "City / Region",
    birthday: "DD Month YYYY",
    hobbies: ["Hobby 1", "Hobby 2"],
    funFact: "Fun fact goes here",
    image: "/members/member-01.jpg"
  },
  {
    id: "member-10",
    name: "Member 10",
    role: "Member",
    nim: "GXXXXXXXX",
    origin: "City / Region",
    birthday: "DD Month YYYY",
    hobbies: ["Hobby 1", "Hobby 2"],
    funFact: "Fun fact goes here",
    image: "/members/member-01.jpg"
  },
  {
    id: "member-11",
    name: "Member 11",
    role: "Member",
    nim: "GXXXXXXXX",
    origin: "City / Region",
    birthday: "DD Month YYYY",
    hobbies: ["Hobby 1", "Hobby 2"],
    funFact: "Fun fact goes here",
    image: "/members/member-01.jpg"
  },
  {
    id: "member-12",
    name: "Member 12",
    role: "Member",
    nim: "GXXXXXXXX",
    origin: "City / Region",
    birthday: "DD Month YYYY",
    hobbies: ["Hobby 1", "Hobby 2"],
    funFact: "Fun fact goes here",
    image: "/members/member-01.jpg"
  },
];
