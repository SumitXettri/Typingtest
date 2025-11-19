export function getRandomText(
  level: "easy" | "medium" | "hard" = "medium"
): string {
  const texts = {
    easy: [
      "The cat stretched lazily under the warm sunlight, enjoying a peaceful afternoon.",
      "A cool breeze swept across the garden, bringing the sweet scent of flowers.",
      "Children ran across the field, laughing as they chased colorful balloons.",
      "A small boat floated gently on the calm lake, creating ripples on the surface.",
      "Warm cookies fresh out of the oven filled the house with a cozy smell.",
    ],

    medium: [
      "The sun dipped below the horizon, painting the sky with shades of orange, pink, and purple. Birds returned to their nests while the gentle hum of the evening filled the air.",
      "A gentle breeze rustled the autumn leaves, creating a symphony of whispers across the park. Children laughed as they chased each other through piles of crisp, golden leaves.",
      "The aroma of freshly baked bread wafted through the cozy bakery, mingling with the scent of cinnamon and roasted coffee beans. People chatted happily over warm pastries.",
      "As the rain tapped rhythmically against the window, she curled up with a good book and a steaming cup of tea. Outside, puddles reflected the shimmering lights of the streetlamps.",
      "Under a sky lit by countless stars, the campers gathered around a crackling fire, sharing stories and roasting marshmallows, while the gentle sounds of the forest surrounded them.",
    ],

    hard: [
      "Beyond the bustling marketplace and its vibrant swirl of colors, the ancient city walls stood untouched by time. Their weathered stones whispered stories of forgotten kingdoms, hidden alliances, and centuries-old secrets waiting to be rediscovered.",
      "The scientist stared at the intricate pattern drawn on the frosted glass. Each line represented years of research, trial, and uncertainty, yet one small detail seemed to shift everything she believed about the universe's design.",
      "Beneath the towering redwoods, a rare silence settled over the forest floor. Sunlight filtered through the dense canopy, scattering shards of golden light that made the air feel almost magical to anyone who wandered into its depths.",
      "The old journal, bound in cracking leather, revealed not just entries but entire worlds. The author described distant lands filled with floating islands, bioluminescent rivers, and creatures that shimmered with colors no human eye had ever recorded.",
      "As the orchestra began to play, the grand hall transformed. The soaring violins, echoing through the marble columns, carried the audience into a realm where emotions moved like tides, rising and falling with breathtaking precision.",
    ],
  };

  const selected = texts[level];
  return selected[Math.floor(Math.random() * selected.length)];
}
