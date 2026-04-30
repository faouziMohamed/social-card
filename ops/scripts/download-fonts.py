#!/usr/bin/env python3
"""
Download all project fonts into src/assets/fonts/.
Sources: Google Fonts CSS API (woff2→ttf fallback via direct download), GitHub releases.
"""
import os
import re
import sys
import urllib.request
import urllib.error
import json

DEST = os.path.join(os.path.dirname(__file__), '../../src/assets/fonts')
os.makedirs(DEST, exist_ok=True)

def dl(url: str, dest: str) -> bool:
    if os.path.exists(dest):
        print(f'  skip  {os.path.basename(dest)}')
        return True
    try:
        req = urllib.request.Request(url, headers={
            'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36'
        })
        with urllib.request.urlopen(req, timeout=30) as r, open(dest, 'wb') as f:
            f.write(r.read())
        print(f'  ok    {os.path.basename(dest)}')
        return True
    except Exception as e:
        print(f'  FAIL  {os.path.basename(dest)}: {e}')
        try: os.remove(dest)
        except: pass
        return False

def gf_url(family: str, weight: int, italic: bool = False) -> str:
    """Google Fonts CSS2 API URL for a single variant."""
    style = 'ital,wght@1,' if italic else 'wght@'
    return (
        f'https://fonts.googleapis.com/css2?family={urllib.parse.quote(family)}'
        f':{style}{weight}&display=swap'
    )

import urllib.parse

def fetch_gf_ttf(family: str, weight: int, dest_name: str, italic: bool = False) -> bool:
    """Fetch a TTF from Google Fonts by parsing their CSS2 response."""
    if os.path.exists(os.path.join(DEST, dest_name)):
        print(f'  skip  {dest_name}')
        return True
    style = f'ital,wght@1,{weight}' if italic else f'wght@{weight}'
    url = f'https://fonts.googleapis.com/css2?family={urllib.parse.quote(family)}:{style}&display=swap'
    # Request with a UA that gets ttf (older Android UA)
    ua = 'Mozilla/5.0 (Linux; Android 4.4.2; Nexus 5 Build/KOT49H) Mobile'
    try:
        req = urllib.request.Request(url, headers={'User-Agent': ua})
        with urllib.request.urlopen(req, timeout=15) as r:
            css = r.read().decode()
        # Extract src url(...) from the css
        urls = re.findall(r'src:\s*url\(([^)]+)\)', css)
        if not urls:
            print(f'  FAIL  {dest_name}: no url in css')
            return False
        font_url = urls[0].strip("'\"")
        return dl(font_url, os.path.join(DEST, dest_name))
    except Exception as e:
        print(f'  FAIL  {dest_name}: {e}')
        return False

def fetch_gf_woff2_as_dest(family: str, weight: int, dest_name: str, italic: bool = False) -> bool:
    """Fetch woff2 from Google Fonts (modern UA) and save directly (Satori supports woff2 too)."""
    if os.path.exists(os.path.join(DEST, dest_name)):
        print(f'  skip  {dest_name}')
        return True
    style = f'ital,wght@1,{weight}' if italic else f'wght@{weight}'
    url = f'https://fonts.googleapis.com/css2?family={urllib.parse.quote(family)}:{style}&display=swap'
    ua = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/120'
    try:
        req = urllib.request.Request(url, headers={'User-Agent': ua})
        with urllib.request.urlopen(req, timeout=15) as r:
            css = r.read().decode()
        # Get the last subset block (usually latin)
        blocks = css.split('/*')
        latin_css = ''
        for block in reversed(blocks):
            if 'latin */' in block or 'latin]' in block or block.strip().startswith('latin'):
                latin_css = block
                break
        if not latin_css:
            latin_css = blocks[-1]
        urls = re.findall(r'src:\s*url\(([^)]+)\)', latin_css)
        if not urls:
            # fallback: take last url in whole css
            all_urls = re.findall(r'src:\s*url\(([^)]+)\)', css)
            if not all_urls:
                print(f'  FAIL  {dest_name}: no url in css')
                return False
            urls = [all_urls[-1]]
        font_url = urls[0].strip("'\"")
        return dl(font_url, os.path.join(DEST, dest_name))
    except Exception as e:
        print(f'  FAIL  {dest_name}: {e}')
        return False

def direct(url: str, dest_name: str) -> bool:
    return dl(url, os.path.join(DEST, dest_name))

# ── Google Fonts — fetched as woff2 (Satori supports woff2) ──────────────────
GF = fetch_gf_woff2_as_dest

print('\n=== Sans-serif ===')
# Ubuntu
GF('Ubuntu', 400, 'ubuntu-400.woff2')
GF('Ubuntu', 700, 'ubuntu-700.woff2')
GF('Ubuntu', 300, 'ubuntu-300.woff2')
# Roboto
GF('Roboto', 400, 'roboto-400.woff2')
GF('Roboto', 700, 'roboto-700.woff2')
GF('Roboto', 300, 'roboto-300.woff2')
GF('Roboto', 900, 'roboto-900.woff2')
# Nunito
GF('Nunito', 400, 'nunito-400.woff2')
GF('Nunito', 700, 'nunito-700.woff2')
GF('Nunito', 800, 'nunito-800.woff2')
# Poppins
GF('Poppins', 400, 'poppins-400.woff2')
GF('Poppins', 600, 'poppins-600.woff2')
GF('Poppins', 700, 'poppins-700.woff2')
# Raleway
GF('Raleway', 400, 'raleway-400.woff2')
GF('Raleway', 700, 'raleway-700.woff2')
GF('Raleway', 800, 'raleway-800.woff2')
# Oswald
GF('Oswald', 400, 'oswald-400.woff2')
GF('Oswald', 700, 'oswald-700.woff2')
# DM Sans
GF('DM Sans', 400, 'dm-sans-400.woff2')
GF('DM Sans', 700, 'dm-sans-700.woff2')
# Plus Jakarta Sans
GF('Plus Jakarta Sans', 400, 'plus-jakarta-sans-400.woff2')
GF('Plus Jakarta Sans', 700, 'plus-jakarta-sans-700.woff2')
GF('Plus Jakarta Sans', 800, 'plus-jakarta-sans-800.woff2')
# Outfit
GF('Outfit', 400, 'outfit-400.woff2')
GF('Outfit', 700, 'outfit-700.woff2')
# Figtree
GF('Figtree', 400, 'figtree-400.woff2')
GF('Figtree', 700, 'figtree-700.woff2')
# Syne
GF('Syne', 400, 'syne-400.woff2')
GF('Syne', 700, 'syne-700.woff2')
GF('Syne', 800, 'syne-800.woff2')
# Onest
GF('Onest', 400, 'onest-400.woff2')
GF('Onest', 700, 'onest-700.woff2')
# Bricolage Grotesque
GF('Bricolage Grotesque', 400, 'bricolage-grotesque-400.woff2')
GF('Bricolage Grotesque', 700, 'bricolage-grotesque-700.woff2')
# Montserrat
GF('Montserrat', 400, 'montserrat-400.woff2')
GF('Montserrat', 700, 'montserrat-700.woff2')
GF('Montserrat', 900, 'montserrat-900.woff2')
# Exo 2
GF('Exo 2', 400, 'exo2-400.woff2')
GF('Exo 2', 700, 'exo2-700.woff2')
# Work Sans
GF('Work Sans', 400, 'work-sans-400.woff2')
GF('Work Sans', 700, 'work-sans-700.woff2')
# Manrope
GF('Manrope', 400, 'manrope-400.woff2')
GF('Manrope', 700, 'manrope-700.woff2')
GF('Manrope', 800, 'manrope-800.woff2')
# Barlow
GF('Barlow', 400, 'barlow-400.woff2')
GF('Barlow', 700, 'barlow-700.woff2')
# Jost
GF('Jost', 400, 'jost-400.woff2')
GF('Jost', 700, 'jost-700.woff2')
# Albert Sans
GF('Albert Sans', 400, 'albert-sans-400.woff2')
GF('Albert Sans', 700, 'albert-sans-700.woff2')
# Lexend
GF('Lexend', 400, 'lexend-400.woff2')
GF('Lexend', 700, 'lexend-700.woff2')

print('\n=== Serif ===')
# Playfair Display
GF('Playfair Display', 400, 'playfair-display-400.woff2')
GF('Playfair Display', 700, 'playfair-display-700.woff2')
GF('Playfair Display', 900, 'playfair-display-900.woff2')
# Lora
GF('Lora', 400, 'lora-400.woff2')
GF('Lora', 700, 'lora-700.woff2')
# DM Serif Display
GF('DM Serif Display', 400, 'dm-serif-display-400.woff2')
# Fraunces
GF('Fraunces', 400, 'fraunces-400.woff2')
GF('Fraunces', 700, 'fraunces-700.woff2')
GF('Fraunces', 900, 'fraunces-900.woff2')
# Instrument Serif
GF('Instrument Serif', 400, 'instrument-serif-400.woff2')
# Libre Baskerville
GF('Libre Baskerville', 400, 'libre-baskerville-400.woff2')
GF('Libre Baskerville', 700, 'libre-baskerville-700.woff2')
# EB Garamond
GF('EB Garamond', 400, 'eb-garamond-400.woff2')
GF('EB Garamond', 700, 'eb-garamond-700.woff2')
# Cormorant Garamond
GF('Cormorant Garamond', 400, 'cormorant-garamond-400.woff2')
GF('Cormorant Garamond', 700, 'cormorant-garamond-700.woff2')
# Bitter
GF('Bitter', 400, 'bitter-400.woff2')
GF('Bitter', 700, 'bitter-700.woff2')
# Crimson Pro
GF('Crimson Pro', 400, 'crimson-pro-400.woff2')
GF('Crimson Pro', 700, 'crimson-pro-700.woff2')
# Source Serif 4
GF('Source Serif 4', 400, 'source-serif4-400.woff2')
GF('Source Serif 4', 700, 'source-serif4-700.woff2')

print('\n=== Monospace (Google Fonts) ===')
# Fira Code (ligatures)
GF('Fira Code', 400, 'fira-code-400.woff2')
GF('Fira Code', 700, 'fira-code-700.woff2')
# Roboto Mono
GF('Roboto Mono', 400, 'roboto-mono-400.woff2')
GF('Roboto Mono', 700, 'roboto-mono-700.woff2')
# Source Code Pro
GF('Source Code Pro', 400, 'source-code-pro-400.woff2')
GF('Source Code Pro', 700, 'source-code-pro-700.woff2')
# Space Mono
GF('Space Mono', 400, 'space-mono-400.woff2')
GF('Space Mono', 700, 'space-mono-700.woff2')
# Ubuntu Mono
GF('Ubuntu Mono', 400, 'ubuntu-mono-400.woff2')
GF('Ubuntu Mono', 700, 'ubuntu-mono-700.woff2')
# Inconsolata
GF('Inconsolata', 400, 'inconsolata-400.woff2')
GF('Inconsolata', 700, 'inconsolata-700.woff2')
# DM Mono
GF('DM Mono', 400, 'dm-mono-400.woff2')
GF('DM Mono', 700, 'dm-mono-700.woff2')
# Nanum Gothic Coding
GF('Nanum Gothic Coding', 400, 'nanum-gothic-coding-400.woff2')
# Azeret Mono
GF('Azeret Mono', 400, 'azeret-mono-400.woff2')
GF('Azeret Mono', 700, 'azeret-mono-700.woff2')
# Overpass Mono
GF('Overpass Mono', 400, 'overpass-mono-400.woff2')
GF('Overpass Mono', 700, 'overpass-mono-700.woff2')
# Share Tech Mono
GF('Share Tech Mono', 400, 'share-tech-mono-400.woff2')
# Chivo Mono
GF('Chivo Mono', 400, 'chivo-mono-400.woff2')
GF('Chivo Mono', 700, 'chivo-mono-700.woff2')
# Courier Prime
GF('Courier Prime', 400, 'courier-prime-400.woff2')
GF('Courier Prime', 700, 'courier-prime-700.woff2')

print('\n=== Cursive / Handwriting / Display ===')
GF('Dancing Script', 400, 'dancing-script-400.woff2')
GF('Dancing Script', 700, 'dancing-script-700.woff2')
GF('Pacifico', 400, 'pacifico-400.woff2')
GF('Caveat', 400, 'caveat-400.woff2')
GF('Caveat', 700, 'caveat-700.woff2')
GF('Satisfy', 400, 'satisfy-400.woff2')
GF('Kaushan Script', 400, 'kaushan-script-400.woff2')
GF('Sacramento', 400, 'sacramento-400.woff2')
GF('Great Vibes', 400, 'great-vibes-400.woff2')
GF('Righteous', 400, 'righteous-400.woff2')
GF('Dela Gothic One', 400, 'dela-gothic-one-400.woff2')
GF('Bungee', 400, 'bungee-400.woff2')
GF('Abril Fatface', 400, 'abril-fatface-400.woff2')
GF('Anton', 400, 'anton-400.woff2')
GF('Permanent Marker', 400, 'permanent-marker-400.woff2')
GF('Architects Daughter', 400, 'architects-daughter-400.woff2')
GF('Indie Flower', 400, 'indie-flower-400.woff2')
GF('Gloria Hallelujah', 400, 'gloria-hallelujah-400.woff2')
GF('Lobster', 400, 'lobster-400.woff2')
GF('Bebas Neue', 400, 'bebas-neue-400.woff2')

print('\n=== GitHub Releases (ligature monos) ===')
# Victor Mono (ligatures, italics)
direct('https://github.com/rubjo/victor-mono/raw/master/public/VictorMono/VictorMono-Regular.ttf', 'victor-mono-400.ttf')
direct('https://github.com/rubjo/victor-mono/raw/master/public/VictorMono/VictorMono-Bold.ttf', 'victor-mono-700.ttf')
direct('https://github.com/rubjo/victor-mono/raw/master/public/VictorMono/VictorMono-Italic.ttf', 'victor-mono-400-italic.ttf')

# Cascadia Code (Microsoft, ligatures)
direct('https://github.com/microsoft/cascadia-code/releases/download/v2404.23/CascadiaCode-2404.23.zip', '/tmp/cascadia.zip')
# Extract if zip downloaded
import zipfile, glob
zf = '/tmp/cascadia.zip'
if os.path.exists(zf) and os.path.getsize(zf) > 10000:
    with zipfile.ZipFile(zf) as z:
        for name in z.namelist():
            base = os.path.basename(name)
            if base == 'CascadiaCode.ttf':
                data = z.read(name)
                with open(os.path.join(DEST, 'cascadia-code-400.ttf'), 'wb') as f: f.write(data)
                print('  ok    cascadia-code-400.ttf')
            elif base == 'CascadiaCodeItalic.ttf':
                data = z.read(name)
                with open(os.path.join(DEST, 'cascadia-code-400-italic.ttf'), 'wb') as f: f.write(data)
                print('  ok    cascadia-code-400-italic.ttf')

# Commit Mono
direct('https://github.com/eigilnikolajsen/commit-mono/releases/download/v1.143/CommitMono-1-143.zip', '/tmp/commit-mono.zip')
zf = '/tmp/commit-mono.zip'
if os.path.exists(zf) and os.path.getsize(zf) > 10000:
    with zipfile.ZipFile(zf) as z:
        for name in z.namelist():
            base = os.path.basename(name)
            if 'Regular' in base and base.endswith('.otf'):
                data = z.read(name)
                with open(os.path.join(DEST, 'commit-mono-400.otf'), 'wb') as f: f.write(data)
                print('  ok    commit-mono-400.otf')
            elif 'Bold' in base and base.endswith('.otf'):
                data = z.read(name)
                with open(os.path.join(DEST, 'commit-mono-700.otf'), 'wb') as f: f.write(data)
                print('  ok    commit-mono-700.otf')

# JetBrains Mono with ligatures (already have ttf, but ensure ligature variant)
# The standard JetBrains Mono TTF already has ligatures — no separate file needed.

# Maple Mono (ligatures)
direct('https://github.com/subframe7536/maple-font/releases/download/v7.0/MapleMono-TTF.zip', '/tmp/maple-mono.zip')
zf = '/tmp/maple-mono.zip'
if os.path.exists(zf) and os.path.getsize(zf) > 10000:
    with zipfile.ZipFile(zf) as z:
        for name in z.namelist():
            base = os.path.basename(name)
            if base == 'MapleMono-Regular.ttf':
                data = z.read(name)
                with open(os.path.join(DEST, 'maple-mono-400.ttf'), 'wb') as f: f.write(data)
                print('  ok    maple-mono-400.ttf')
            elif base == 'MapleMono-Bold.ttf':
                data = z.read(name)
                with open(os.path.join(DEST, 'maple-mono-700.ttf'), 'wb') as f: f.write(data)
                print('  ok    maple-mono-700.ttf')
            elif base == 'MapleMono-Italic.ttf':
                data = z.read(name)
                with open(os.path.join(DEST, 'maple-mono-400-italic.ttf'), 'wb') as f: f.write(data)
                print('  ok    maple-mono-400-italic.ttf')

# Monaspace (GitHub Copilot font, ligatures)
direct('https://github.com/githubnext/monaspace/releases/download/v1.101/monaspace-v1.101.zip', '/tmp/monaspace.zip')
zf = '/tmp/monaspace.zip'
if os.path.exists(zf) and os.path.getsize(zf) > 10000:
    with zipfile.ZipFile(zf) as z:
        for name in z.namelist():
            base = os.path.basename(name)
            dest_map = {
                'MonaspaceNeon-Regular.otf': 'monaspace-neon-400.otf',
                'MonaspaceNeon-Bold.otf':    'monaspace-neon-700.otf',
                'MonaspaceArgon-Regular.otf':'monaspace-argon-400.otf',
                'MonaspaceKrypton-Regular.otf':'monaspace-krypton-400.otf',
                'MonaspaceXenon-Regular.otf':'monaspace-xenon-400.otf',
                'MonaspaceRadon-Regular.otf':'monaspace-radon-400.otf',
            }
            if base in dest_map:
                data = z.read(name)
                with open(os.path.join(DEST, dest_map[base]), 'wb') as f: f.write(data)
                print(f'  ok    {dest_map[base]}')

print('\n=== Done ===')
total = len(os.listdir(DEST))
print(f'Total files in src/assets/fonts/: {total}')
