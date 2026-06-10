export const parseTechnologies = (technologies) => {
  if (!technologies) {
    return [];
  }

  if (Array.isArray(technologies)) {
    return technologies.map((item) => String(item).trim()).filter(Boolean);
  }

  return String(technologies)
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
};
