export function generateSlug(text: string): string {
  return text
    .normalize("NFD") // Split special characters: "é" => "e´"
    .replace(/[\u0300-\u036f]/g, "") // Remove accent
    .toLowerCase()
    .replace(/[^\w\s-]/g, "") // Remove symbols
    .replace(/\s+/g, "-"); // Replace empty spaces with "-"
}
