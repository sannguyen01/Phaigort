"""
Phaigort Editorial Image Generator
Generates all 14 images from CREATIVE_CODEX.md using fal.ai flux/dev.

Usage:
    FAL_KEY=your-key python scripts/generate-images.py

Output:
    staging/images/<domain>/<prompt-id>.jpg
    staging/images/manifest.json  — URL + local path for every image

Review all images in staging/images/ before uploading to public/.
"""

import os
import json
import time
import urllib.request
from pathlib import Path

try:
    import fal_client
except ImportError:
    raise SystemExit("Run: pip install fal-client")

# ---------------------------------------------------------------------------
# Universal style suffix and negative prompt from the Creative Codex
# ---------------------------------------------------------------------------
STYLE_SUFFIX = (
    "editorial documentary photography, warm amber raking light, "
    "platinum-white highlights, deep navy shadow zones, "
    "Iberian trading house aesthetic, 16th century natural philosophy studio, "
    "geological specimen photography, National Geographic scientific precision, "
    "Kodak Vision 3 film grain, subtle vignette"
)

NEGATIVE = (
    "ring box, velvet cushion, velvet surface, sparkle filter, lens flare, "
    "white cyclorama background, model hands, bokeh-heavy composition, "
    "stock photo aesthetic, fashion photography, lifestyle photography, "
    "commercial jewelry advertising, soft dreamy filter, purple shadows, "
    "plastic, synthetic, CGI render, 3d render, illustration"
)

# ---------------------------------------------------------------------------
# Aspect ratio → fal image_size mapping
# ---------------------------------------------------------------------------
AR_MAP = {
    "16:9":  {"width": 1344, "height": 768},
    "3:2":   {"width": 1152, "height": 768},
    "4:5":   {"width": 768,  "height": 960},
    "1:1":   {"width": 1024, "height": 1024},
}

# ---------------------------------------------------------------------------
# 14 prompts from CREATIVE_CODEX.md Part Five
# ---------------------------------------------------------------------------
PROMPTS = [
    # ── Domain I: Geological Rarities ──────────────────────────────────────
    {
        "id": "PRMT-GR-01",
        "dir": "geological",
        "filename": "kashmir-sapphire-dark-field.jpg",
        "ar": "16:9",
        "prompt": (
            "Extreme close-up macro photograph of an unheated Kashmir sapphire, oval mixed cut, "
            "displaying deep cornflower-blue with velvety silk inclusions visible under raking dark-field "
            "illumination. Stone floats on pure deep navy (#0F172A) background. Single light source from "
            "camera right at 25 degrees elevation, creating a bright crescent on the stone's upper left "
            "pavilion facets. The stone's interior silk rutile needles render as silver-blue threads inside "
            "the blue volume. Geological documentary photography, sharp focus throughout the stone, very "
            "slight warm film grain. The stone occupies 45% of the frame, pure void on all sides. "
            "editorial geological specimen photography, dark-field illumination, deep navy void, "
            "warm amber rim light from camera right, platinum-white highlight ceiling, "
            "Kodak Vision 3 film grain, 4800K color temperature, vignette 8%"
        ),
        "negative": NEGATIVE + ", bokeh background, purple tones in shadow, ring holder",
        "intended_use": "Domain 01 collection card → public/collections/geological-rarities.jpg",
    },
    {
        "id": "PRMT-GR-02",
        "dir": "geological",
        "filename": "sapphire-on-geological-map.jpg",
        "ar": "3:2",
        "prompt": (
            "Top-down flat lay photography. An uncut rough sapphire crystal in host marble matrix placed "
            "directly on an open aged cartographic map showing the Kashmir mountain region. The map shows "
            "topographic contour lines, Urdu/Persian annotations, geological survey grid. The sapphire "
            "occupies the upper-centre of the map at its actual origin coordinates. An aged brass "
            "gemologist's loupe beside the stone, partially open. Aged linen surface beneath the map at "
            "edges. Warm ambient light from upper left (window light quality), slight shadows from stone "
            "giving depth. Scholarly, archival, forensic aesthetic. "
            "archival documentary flat lay, warm ambient light 4500K, aged cartographic map surface, "
            "geological survey aesthetic, natural philosophy study, Dutch Golden Age still life influence, "
            "Kodak Vision 3 film grain, slight warm shadows"
        ),
        "negative": NEGATIVE + ", modern props, white cyclorama studio, cold blue-grey shadows",
        "intended_use": "Collections page domain header editorial spread",
    },
    {
        "id": "PRMT-GR-03",
        "dir": "geological",
        "filename": "alexandrite-colour-change-diptych.jpg",
        "ar": "16:9",
        "prompt": (
            "Two-panel scientific photographic diptych. LEFT PANEL: Same alexandrite gemstone photographed "
            "under daylight 5500K illumination, displaying its pure teal-blue-green colour. Stone on aged "
            "white ceramic specimen dish on dark slate. Sharp focus. RIGHT PANEL: Identical composition, "
            "identical stone, but photographed under incandescent 2800K illumination, displaying pure "
            "blood-crimson red. Both panels equal size, black gutter divider between them. Below each "
            "panel: Jost uppercase annotation DAYLIGHT 5500K and INCANDESCENT 2800K. No other elements. "
            "Pure scientific documentation aesthetic. "
            "scientific gemological documentation, controlled studio light, two-panel comparison, "
            "white ceramic specimen dish, dark slate surface, sharp focus no bokeh, colour-accurate "
            "rendering, Kodak Vision 3 grain, vignette 5%"
        ),
        "negative": NEGATIVE + ", soft bokeh, any retail props, fashion aesthetic, warm filters",
        "intended_use": "Magazine cover concept C, collections editorial spread",
    },
    {
        "id": "PRMT-GR-04",
        "dir": "geological",
        "filename": "spinel-uv-fluorescence.jpg",
        "ar": "16:9",
        "prompt": (
            "Red Burmese spinel photographed in paired comparison. Left: under visible white light on dark "
            "slate surface — the stone is a rich raspberry-red. Right: under UV illumination 365nm — the "
            "stone fluoresces with a vivid blood-red glow, almost appearing to emit its own light against "
            "the completely dark background. The UV frame has pure black background except for the glowing "
            "stone. Scientific documentation style, gemological. "
            "scientific UV fluorescence photography, black background for UV frame, dark slate for visible "
            "light frame, scientific documentation aesthetic, side-by-side comparison, gemological "
            "laboratory photography"
        ),
        "negative": NEGATIVE,
        "intended_use": "Collections editorial spread, material-consciousness page",
    },
    # ── Domain II: Precious Metals ─────────────────────────────────────────
    {
        "id": "PRMT-PM-01",
        "dir": "metals",
        "filename": "crystalline-gold-sculptural.jpg",
        "ar": "16:9",
        "prompt": (
            "Native gold specimen with visible arborescent crystalline habit — the gold has grown in "
            "angular, geometric branches from a central core, displayed on a dark grey slate surface. "
            "Raking light from camera left at 20 degrees elevation creates extreme shadow and highlight "
            "contrast across every facet of the crystalline structure. Each crystal face catches the light "
            "independently, creating a field of micro-sparks. The gold colour: deep warm yellow, not "
            "orange. The matrix quartz at the base: pale grey-white, giving scale. Stone approximately "
            "6cm in largest dimension. Entire stone sharp. No background elements. Pure geological "
            "sculptural photography. "
            "geological sculptural specimen photography, raking light from left 20 degrees, extreme "
            "highlight-shadow contrast, dark grey slate surface, warm 3800K light temperature, "
            "deep warm yellow gold, sharp focus throughout, no background, Kodak Vision 3 grain, "
            "vignette 10%"
        ),
        "negative": NEGATIVE + ", bullion bar, coins, jewelry, soft even light, blue shadows, overexposed highlights",
        "intended_use": "Domain 02 collection card → public/collections/precious-metals.jpg",
    },
    {
        "id": "PRMT-PM-02",
        "dir": "metals",
        "filename": "silver-dendrite-tree-form.jpg",
        "ar": "4:5",
        "prompt": (
            "Native silver dendritic specimen — the silver has formed in a branching, tree-like form like "
            "frost on glass in a dark slate matrix. Photographed on aged granite surface. The dendritic "
            "silver is almost pure white-silver, the matrix dark grey to black. Raking light from upper "
            "right reveals the three-dimensional structure of the silver branches. The entire specimen "
            "reads like a silver tree growing from rock. Geological documentary photography. "
            "geological specimen documentary, raking light upper right, aged granite surface, dramatic "
            "mineral specimen photography, 5000K cool light, sharp focus, Kodak Vision 3 grain"
        ),
        "negative": NEGATIVE,
        "intended_use": "Editorial interior spread, collections page supplement",
    },
    {
        "id": "PRMT-PM-03",
        "dir": "metals",
        "filename": "alluvial-gold-pan.jpg",
        "ar": "1:1",
        "prompt": (
            "Traditional gold panning pan filled with river gravel and water, seen from directly above "
            "plan view. Fine gold dust and two small nuggets visible in the gravel, catching the light. "
            "The pan is old, worn, patinated — clearly used, not new. River water is clear, slightly "
            "turbid. The context is an active alluvial gold field. The gold reads as genuine discovery, "
            "not theatrical. Documentary photography, warm midday tropical light. "
            "documentary alluvial gold photography, plan view from directly above, warm tropical light, "
            "worn gold pan, river gravel, genuine prospecting context, documentary photography, "
            "Kodak Vision 3 grain"
        ),
        "negative": NEGATIVE,
        "intended_use": "Our Story section supplemental image, editorial spread",
    },
    # ── Domain III: Historical Artifacts ───────────────────────────────────
    {
        "id": "PRMT-HA-01",
        "dir": "artifacts",
        "filename": "portuguese-filigree-map.jpg",
        "ar": "16:9",
        "prompt": (
            "Top-down flat lay of a sixteenth-century Portuguese filigree pendant in white gold wire-work "
            "— extremely delicate granulation and twisted wire technique visible in detail. The pendant "
            "rests on an open period map showing the Portuguese Estado da India trade routes (Goa, Malacca, "
            "Macau annotated). The map parchment is aged, with foxing and slight tears at edges. A small "
            "wax seal with a cross-and-sphere device (armillary sphere, Portuguese symbol) partially "
            "visible at the map edge. An aged brass tweezers beside the pendant. The filigree white gold "
            "catches the warm ambient light, its intricate wire-work fully legible against the map. "
            "archival documentary flat lay, warm ambient light 5000K, aged cartographic map, natural "
            "philosophy study aesthetic, sharp focus on filigree detail, period provenance props, "
            "Kodak Vision 3 grain, slight warm shadows"
        ),
        "negative": NEGATIVE,
        "intended_use": "Domain 03 collection card → public/collections/historical-artifacts.jpg",
    },
    {
        "id": "PRMT-HA-02",
        "dir": "artifacts",
        "filename": "filigree-macro-detail.jpg",
        "ar": "1:1",
        "prompt": (
            "Extreme macro close-up of Portuguese filigree wire-work technique — individual twisted wires "
            "of approximately 0.3mm diameter visible as individual elements. The twisted granulation balls "
            "spheres of gold the size of poppy seeds visible at junction points. The construction logic of "
            "the filigree legible as a visual text. Sharp focus on the nearest wire elements, slight "
            "fall-off to depth. Dark warm background. The craft itself is the subject. "
            "extreme macro craft documentation photography, 5:1 magnification, deep focus through filigree "
            "plane, warm dark background, craft technique documentary, 4800K light temperature, "
            "Kodak Vision 3 grain"
        ),
        "negative": NEGATIVE,
        "intended_use": "Collections page editorial spread, atelier page detail",
    },
    {
        "id": "PRMT-HA-03",
        "dir": "artifacts",
        "filename": "scholars-study-the-knowledge.jpg",
        "ar": "3:2",
        "prompt": (
            "Interior documentary photograph of a scholar's desk or study — evening, single warm lamp "
            "source (amber, 2800K). Open on the desk: a facsimile volume of Garcia de Orta's Coloquios "
            "dos simples e drogas da India 1563, open to the gemstone chapter. A brass loupe resting on "
            "the open page. A Kashmir sapphire (round, unset) placed on the text. A brass inkwell, quill, "
            "and navigational dividers off to the right. The entire scene: aged oak or walnut desk "
            "surface, slightly worn. The light: amber lamplight touching only the desk and book — the "
            "rest of the frame falls into warm deep shadow. The feeling: the moment of discovery in a "
            "16th-century Portuguese natural philosopher's study. "
            "interior documentary editorial photography, single warm lamp source 2800K, Dutch Golden Age "
            "still life reference Vermeer de Hoogh, deep warm shadows, ambient darkness, scholar's study "
            "aesthetic, aged books and instruments, Kodak Vision 3 high-ISO grain, vignette 15%, "
            "warm amber-brown palette"
        ),
        "negative": NEGATIVE + ", modern objects of any kind, electric light fixtures, computers, clean modern surfaces",
        "intended_use": "Material Consciousness page hero, Campaign II The Knowledge",
    },
    # ── Domain IV: Contemporary Innovations ────────────────────────────────
    {
        "id": "PRMT-CI-01",
        "dir": "innovations",
        "filename": "iridescent-composite-triptych.jpg",
        "ar": "16:9",
        "prompt": (
            "Scientific triptych of an iridescent metamorphic composite panel specimen approximately 15cm "
            "by 10cm. THREE SEQUENTIAL FRAMES side by side: FRAME 1 (0-degree light angle): The surface "
            "appears matte platinum-silver with subtle structural colour barely perceptible blue-green. "
            "FRAME 2 (45-degree light angle): The surface dramatically shifts to deep iridescent peacock- "
            "blue-green with gold interference colours. FRAME 3 (90-degree light angle): The surface shows "
            "full spectral iridescence — violet through gold through green as a continuous band across the "
            "panel. Each frame: identical studio setup, clean platinum-white background, single light "
            "source at the specified angle. The three frames show the material's reactive property as a "
            "scientific argument. "
            "scientific materials laboratory photography, controlled studio, platinum-white background, "
            "reactive surface documentation, triptych layout, equal frame sizing, scientific documentation "
            "aesthetic, 5500K light temperature, sharp focus"
        ),
        "negative": NEGATIVE,
        "intended_use": "Domain 04 collection card → public/collections/contemporary-innovations.jpg",
    },
    {
        "id": "PRMT-CI-02",
        "dir": "innovations",
        "filename": "innovation-meets-archive.jpg",
        "ar": "3:2",
        "prompt": (
            "Editorial still life — a contemporary iridescent composite material panel (modern, precise, "
            "laboratory-finish) placed directly beside a sixteenth-century Portuguese filigree pendant. "
            "Both on aged linen surface. The contrast: the organic, handmade, ancient filigree wire-work "
            "beside the algorithmically-structured iridescent surface. An aged brass compass between them. "
            "The dialogue is between geological time (craft tradition) and engineering time (innovation). "
            "Warm ambient light from upper left, documentary editorial photography. "
            "editorial still life documentary, warm ambient light 4500K, aged linen surface, contrast of "
            "ancient and contemporary materials, archival aesthetic with modern intrusion, warm shadows, "
            "Kodak Vision 3 grain"
        ),
        "negative": NEGATIVE,
        "intended_use": "Material Consciousness editorial spread, collections page supplement",
    },
    # ── Hero & Campaign ─────────────────────────────────────────────────────
    {
        "id": "PRMT-HERO-01",
        "dir": "hero",
        "filename": "homepage-darkfield-hero.jpg",
        "ar": "16:9",
        "prompt": (
            "Extreme close-up of an uncut rough Kashmir sapphire crystal fragment — photographed in "
            "dark-field illumination against a background that grades from deep navy (#0F172A) at edges "
            "to slightly lighter navy-midnight at center. The stone surface: raw, unpolished, showing the "
            "natural hexagonal crystal habit of corundum. The stone's interior: lit from within by the "
            "dark-field light source, showing the silk inclusions as a luminous veil of silver-blue "
            "threads inside the blue crystal volume. The entire image is intended to be overlaid with the "
            "Phaigort hero text — the stone provides the luminous background texture, the text floats "
            "over it. The image should work harmoniously with deep navy (#0F172A) text overlay. "
            "dark-field illumination gemological photography, deep navy background graduating from "
            "#0F172A at edges, Kashmir sapphire interior illumination, silk inclusions visible as "
            "silver-blue veil, raw crystal surface, not polished or cut, geological specimen photography, "
            "4800K, Kodak Vision 3 grain"
        ),
        "negative": NEGATIVE + ", cut faceted gemstone, sparkle effects, anything that would conflict with text overlay",
        "intended_use": "Hero section background → public/hero/sapphire-hero.jpg",
    },
    {
        "id": "PRMT-HERO-02",
        "dir": "hero",
        "filename": "forty-million-years-campaign.jpg",
        "ar": "16:9",
        "prompt": (
            "Three objects on a pure platinum-white (#F8F9FB) surface — arranged in a precise horizontal "
            "composition with generous void space (50% white at all edges): LEFT: An unheated Kashmir "
            "sapphire, oval cut, deep cornflower-blue, placed on a small white ceramic specimen dish. "
            "Small annotation below: 65,000,000 years. CENTER: A Portuguese filigree pendant (white gold "
            "wirework, 16th century), placed directly on the surface. Small annotation below: 500 years. "
            "RIGHT: A small iridescent composite material swatch (contemporary innovation), placed on a "
            "clean aluminum specimen tray. Small annotation below: 5 years. Overhead studio illumination, "
            "even, precise, 5000K. The platinum-white background appears as a soft studio void. Each "
            "object is sharply focused. The annotations are typographically precise uppercase, very small. "
            "museum object photography, overhead studio illumination 5000K, platinum-white studio "
            "background, precise compositional spacing, three-object taxonomy, Hiroshi Sugimoto museum "
            "photography reference, extreme precision, no shadow drama, minimal Kodak grain"
        ),
        "negative": NEGATIVE,
        "intended_use": "Campaign IV Forty Million Years, magazine spread, OG image alternative",
    },
]

# ---------------------------------------------------------------------------
# Generation
# ---------------------------------------------------------------------------
MODEL = "fal-ai/flux/dev"
OUTPUT_DIR = Path("staging/images")
MANIFEST = []


def download(url: str, dest: Path) -> None:
    dest.parent.mkdir(parents=True, exist_ok=True)
    urllib.request.urlretrieve(url, dest)


def generate_image(p: dict) -> dict:
    size = AR_MAP[p["ar"]]
    print(f"  → Submitting {p['id']} ({p['ar']}, {size['width']}×{size['height']}) …")
    result = fal_client.run(
        MODEL,
        arguments={
            "prompt": p["prompt"] + f", {STYLE_SUFFIX}",
            "negative_prompt": p["negative"],
            "image_size": {"width": size["width"], "height": size["height"]},
            "num_inference_steps": 35,
            "guidance_scale": 3.5,
            "num_images": 1,
            "enable_safety_checker": False,
            "output_format": "jpeg",
        },
    )
    url = result["images"][0]["url"]
    local = OUTPUT_DIR / p["dir"] / p["filename"]
    download(url, local)
    entry = {
        "id": p["id"],
        "url": url,
        "local": str(local),
        "intended_use": p["intended_use"],
        "ar": p["ar"],
    }
    print(f"     ✓ Saved → {local}")
    return entry


def main():
    key = os.environ.get("FAL_KEY")
    if not key:
        raise SystemExit(
            "\n❌  FAL_KEY not set.\n"
            "    Export your fal.ai API key:\n"
            "        $env:FAL_KEY = 'your-key-here'   (PowerShell)\n"
            "        export FAL_KEY=your-key-here       (bash)\n"
            "    Then re-run:  python scripts/generate-images.py\n"
        )

    print(f"\n🌿  Phaigort Image Generator — {len(PROMPTS)} prompts → {MODEL}")
    print(f"    Output: {OUTPUT_DIR.resolve()}\n")

    for i, p in enumerate(PROMPTS, 1):
        print(f"[{i:02d}/{len(PROMPTS)}] {p['id']}")
        try:
            entry = generate_image(p)
            MANIFEST.append(entry)
        except Exception as e:
            print(f"     ✗ Failed: {e}")
            MANIFEST.append({"id": p["id"], "error": str(e)})
        time.sleep(1)

    manifest_path = OUTPUT_DIR / "manifest.json"
    manifest_path.write_text(json.dumps(MANIFEST, indent=2))
    print(f"\n✅  Done. Manifest written to {manifest_path}")
    print("    Review images in staging/images/ before uploading to public/\n")


if __name__ == "__main__":
    main()
