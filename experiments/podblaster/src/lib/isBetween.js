export default function isBetween(x, min, max) {
  return Math.floor(x) >= min && Math.ceil(x) <= max
}
