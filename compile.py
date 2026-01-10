import os
import re
from datetime import datetime
from pathlib import Path

# Paths
ROOT = Path(__file__).parent
FILTERS_DIR = ROOT / "filters"
TEMPLATE_DIR = ROOT / "template"
HEADER_FILE = ROOT / "header.txt"
OUTPUT_FILE = TEMPLATE_DIR / "subscriptions.txt"

# Metadata
META = {
    "version": "1.0.0",
    "updated": datetime.utcnow().strftime("%Y-%m-%d %H:%M:%S UTC"),
    "title": "Thai ads section block list",
    "description": "A filter list to block ads sections on Thai websites.",
    "homepage": "https://github.com/kaozaza2/thai-ads-section-blocker",
    "url": "https://kaozaza2.github.io/thai-ads-section-blocker/subscriptions.txt",
}


def render_header(template: str, meta: dict) -> str:
    """Replace {{ key }} placeholders in header."""
    for key, value in meta.items():
        template = re.sub(
            rf"{{{{\s*{re.escape(key)}\s*}}}}",
            value,
            template,
        )
    return template


def main() -> None:
    # Ensure output directory exists
    TEMPLATE_DIR.mkdir(parents=True, exist_ok=True)

    # Read & render header
    header_template = HEADER_FILE.read_text(encoding="utf-8")
    content = render_header(header_template, META) + "\n"

    # Append filters (sorted for deterministic output)
    for path in sorted(FILTERS_DIR.iterdir()):
        if not path.is_file():
            continue

        filter_name = path.stem
        content += f"!------ filters/{filter_name} ------\n"
        content += path.read_text(encoding="utf-8").rstrip() + "\n\n"

    # Write output once (faster & safer)
    OUTPUT_FILE.write_text(content.rstrip() + "\n", encoding="utf-8")

    # Remove .gitkeep if present
    gitkeep = TEMPLATE_DIR / ".gitkeep"
    if gitkeep.exists():
        gitkeep.unlink()

    print(f"Compiled subscription file created at: {OUTPUT_FILE}")


if __name__ == "__main__":
    main()
