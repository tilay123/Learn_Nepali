// all possible ways of using diacritics on consonants and
import TableA from "./TableA";
export default function TableACD() {
  const allConsonants = [
    "",
    "क",
    "ख",
    "ग",
    "घ",
    "ङ",
    "च",
    "छ",
    "ज",
    "झ",
    "ञ",
    "ट",
    "ठ",
    "ड",
    "ढ",
    "ण",
    "त",
    "थ",
    "द",
    "ध",
    "न",
    "प",
    "फ",
    "ब",
    "भ",
    "म",
    "य",
    "र",
    "ल",
    "व",
    "श",
    "ष",
    "स",
    "ह",
    "क्ष",
    "त्र",
    "ज्ञ",
  ];

  const allData = allConsonants.map((a) => {
    return ["", "ा", "ि", "ी", "ु", "ू", "े", "ै", "ो", "ौ", "ं", "ः"].map(
      (b) => a + b
    );
  });

  return <TableA exampleRows={allData}></TableA>;
}
