export function getRandomText(
  level: "normal" | "expert" | "master" = "normal"
): string {
  type Level = "normal" | "expert" | "master";

  const texts: Record<Level, string[]> = {
    normal: [
      `The cat sat on the warm rug. It watched the birds outside. The sun was bright and the day was calm.`,
      `She walked to the store to buy some bread. The air was cool and fresh. It was a nice day for a walk.`,
      `The dog ran fast in the park. It chased a red ball across the grass. The kids laughed and played nearby.`,
      `He made a cup of tea and sat by the window. Rain fell softly on the glass. The room was quiet and warm.`,
      `The book was old but still good. She read it every night before bed. The stories made her dream of far away places.`,
      `They ate lunch in the garden. The food was simple but tasty. Bees buzzed around the flowers nearby.`,
      `The train left the station on time. People waved from the platform. The journey would take about two hours.`,
      `She planted seeds in the soft soil. Soon, small green leaves would appear. Gardening made her feel peaceful.`,
      `The child drew a picture of a house. It had a red door and blue windows. A yellow sun shone in the corner.`,
      `He fixed the broken chair with some glue. It was not perfect but it worked. Small repairs saved money over time.`,
    ],

    expert: [
      `The architect surveyed the construction site, mentally calculating the adjustments needed for the foundation's 15-degree slope. "We'll need approximately 2,500 cubic meters of reinforced concrete," she noted, sketching modifications on her tablet. The project's $4.7 million budget left little room for error, yet the client's specifications demanded nothing less than excellence.`,
      `Dr. Martinez reviewed the patient's electrocardiogram, noting the ST-segment elevation in leads V1-V4. "Schedule an emergent catheterization," she instructed, her voice calm despite the urgency. The 67-year-old male presented with classic symptoms: substernal chest pain radiating to the left arm, diaphoresis, and shortness of breath lasting approximately 45 minutes.`,
      `The software engineer debugged the recursive algorithm, tracing the stack overflow to an improperly initialized base case. "This O(n²) complexity won't scale," she muttered, refactoring the function to achieve O(n log n) performance. The codebase contained 47,000+ lines, and this single fix would reduce server costs by an estimated 23%.`,
      `\"The merger's synergies are projected at $340 million annually,\" the CFO explained, adjusting her glasses. \"However, the due diligence revealed $89 million in undisclosed liabilities—primarily environmental remediation costs from the 1990s manufacturing operations.\" The board members exchanged concerned glances; this acquisition had suddenly become far more complicated.`,
      `The paleontologist carefully extracted the fossilized vertebra from the surrounding matrix, using a pneumatic micro-jack and dental picks. "This Tyrannosaurus specimen dates to approximately 68 million years ago," she explained to her graduate students. "Note the healed fracture on the neural spine—evidence of survival after significant trauma."`,
      `Symphony No. 9 in D minor, Op. 125, demanded the orchestra's absolute precision. The conductor raised his baton, signaling the pianissimo entrance of the strings in measure 17. "The sforzando in bar 92 must be explosive yet controlled," he reminded them. "Beethoven's genius lies in these dynamic contrasts—don't sanitize them."`,
      `The forensic accountant traced the embezzlement through 14 shell companies across 6 jurisdictions: Delaware, Nevada, the Cayman Islands, Luxembourg, Singapore, and the British Virgin Islands. "The funds were layered through cryptocurrency exchanges before conversion," she testified. "Total misappropriated assets exceed $12.3 million over a 7-year period."`,
      `\"Quantum entanglement doesn't permit faster-than-light communication,\" Dr. Chen clarified, adjusting the interferometer's alignment to within 0.001 degrees. "The correlations are instantaneous, yes, but extracting meaningful information still requires classical channels." Her team had achieved a Bell inequality violation of 2.83—well above the classical limit of 2.0.`,
      `The sommelier examined the 1982 Château Lafite Rothschild, noting the brick-red meniscus typical of a well-aged Bordeaux. "Decant for approximately 45 minutes," she advised. "You'll detect notes of cedar, tobacco, and dried roses, with the tannins now silky rather than astringent. This vintage retails at roughly $1,200 per bottle."`,
      `The structural analysis revealed stress concentrations exceeding 450 MPa at the weld joints—dangerously close to the material's yield strength of 500 MPa. "We need to redesign this bracket," the engineer concluded, "using 316L stainless steel instead of carbon steel, and increasing the fillet radius from 3mm to 8mm to distribute the load more effectively."`,
    ],

    master: [
      `The juxtaposition of Nietzsche's "Übermensch" concept with Kierkegaard's "knight of faith" reveals a fundamental epistemological schism: whereas Nietzsche's protagonist transcends conventional morality through sheer will-to-power (a quasi-Darwinian self-actualization), Kierkegaard's Abraham-figure achieves authenticity via the "teleological suspension of the ethical"—a paradoxical leap that simultaneously acknowledges and transgresses universal moral imperatives. Dr. Okonkwo's 2019 meta-analysis of 847 scholarly interpretations suggests that 73.2% of contemporary philosophers mischaracterize this distinction, conflating Nietzsche's aristocratic radicalism with Kierkegaard's theistic existentialism—an error attributable, perhaps, to the seductive superficiality of "death of God" rhetoric.`,
      `The defendant's counsel argued that the arbitration clause in §14(b)(iii) of the Master Services Agreement—which stipulated that "any disputes arising hereunder shall be resolved through binding arbitration pursuant to JAMS Comprehensive Rules"—was unconscionable under California's Armendariz standard, given the $75,000 filing fee requirement and the prohibition on class-wide relief.`,
      `The patient presented with a constellation of findings pathognomonic for Takotsubo cardiomyopathy: transient apical ballooning on echocardiography (ejection fraction 32%), ST-segment elevation in leads V2-V6 without reciprocal changes, mildly elevated troponin-I (0.47 ng/mL), and—crucially—angiographically normal coronary arteries. "The catecholamine surge hypothesis," Dr. Yamamoto explained during Grand Rounds, "posits that epinephrine-mediated microvascular spasm induces myocardial stunning, predominantly affecting the β2-adrenoceptor-rich apex."`,
      `The Kolmogorov-Smirnov test yielded D = 0.0847 (p < 0.001), definitively rejecting the null hypothesis that the residuals followed a normal distribution—an unsurprising result given the pronounced leptokurtosis (κ = 7.34) and negative skewness (γ₁ = -1.28) evident in the Q-Q plot. "We'll need to implement a generalized linear model with gamma-distributed errors," Dr. Petrov noted.`,
      `The Stradivarius's tonal superiority—long attributed to Cremonese varnish formulations or "little ice age" wood density—may instead derive from chemical treatments: Nagyvary et al.'s 2021 spectroscopic analysis revealed anomalous concentrations of aluminum (Al³⁺), copper (Cu²⁺), and zinc (Zn²⁺) in the maple, suggesting deliberate borax and alum preservation.`,
      `The M&A transaction's collar mechanism—structured as a fixed exchange ratio of 0.7234 shares with symmetric 15% walk-away provisions—incorporated a material adverse change clause explicitly carving out "pandemics, epidemics, or disease outbreaks (including COVID-19 and any mutations or variants thereof)."`,
      `The archaeometric analysis of Göbekli Tepe's T-shaped pillars—employing portable X-ray fluorescence (pXRF) spectrometry across 847 sampling points—revealed geochemically distinct source quarries for the site's 11,000-year-old megalithic structures.`,
      `Gödel's incompleteness theorems—demonstrating that any sufficiently powerful formal system either contains undecidable propositions or cannot prove its own consistency—precipitated what Weyl characterized as a "Grundlagenkrise" in early 20th-century mathematics.`,
      `The cytochrome P450 3A4 isoenzyme—responsible for metabolizing approximately 50% of clinically administered pharmaceuticals—exhibits remarkable substrate promiscuity, accommodating molecules ranging from 200-1200 Da within its active site cavity. The clinical ramifications of such drug-drug interactions include significant AUC changes and dosing adjustments in narrow-therapeutic-index drugs.`,
    ],
  };

  const samples = texts[level] ?? texts.normal;
  return samples[Math.floor(Math.random() * samples.length)];
}
