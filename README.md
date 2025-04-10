# Mermaid Clipboard Converter

A command-line tool that takes Mermaid diagram text from the system clipboard and converts it to various image formats using mermaid-cli.

## Features

- Read Mermaid diagram text directly from system clipboard
- Convert to PNG (default), SVG, or PDF
- Customize theme (dark theme by default)
- Set background color (transparent by default)
- Specify custom output filename

## Installation

### Prerequisites

Make sure you have Node.js (v14+) installed on your system.

### Install mermaid-cli

This tool requires mermaid-cli to be installed. You can install it globally:

```bash
npm install -g @mermaid-js/mermaid-cli
```

### Install the converter

Clone this repository and install dependencies:

```bash
git clone https://github.com/yourusername/mermaid-clipboard-converter.git
cd mermaid-clipboard-converter
npm install
```

### System-wide Installation

#### Easy Installation

We provide an installation helper script that handles making the script executable and installing it globally:

```bash
node install.js
```

#### Manual Installation

Alternatively, you can install it manually:

1. Make the script executable (Unix systems only):
   ```bash
   chmod +x clipboard-to-image.js
   ```

2. Install globally:
   ```bash
   npm install -g .
   ```

After installation, you can run the tool from anywhere using:

```bash
mermaid-convert [options]
```

For detailed installation instructions and troubleshooting, see [INSTALLATION.md](INSTALLATION.md).

## Usage

### Basic Usage

Copy a Mermaid diagram to your clipboard, then run:

```bash
mermaid-convert
```

This will convert the Mermaid diagram from your clipboard to a PNG file named "my-diagram.png" with dark theme and transparent background.

#### Example Mermaid Diagram

For example, you could copy this Mermaid diagram text to your clipboard:

```
graph TD
    A[Start] --> B{Is it working?}
    B -- Yes --> C[Great!]
    B -- No --> D[Debug]
    D --> B
```

Then run `mermaid-convert` to get a PNG image.

### Command Line Options

```
Options:
  -f, --format <format>    Output format (png, svg, pdf) [default: png]
  -t, --theme <theme>      Theme (default, dark, forest, neutral) [default: dark]
  -b, --background <color> Background color (any CSS color or 'transparent') [default: transparent]
  -o, --output <filename>  Output filename [default: my-diagram.<format>]
  -h, --help               Display this help message
```

### Examples

Convert to PNG with dark theme (default):
```bash
mermaid-convert
```

Convert to SVG with forest theme:
```bash
mermaid-convert --format svg --theme forest
```

Convert to PDF with custom filename and white background:
```bash
mermaid-convert -f pdf -o diagram.pdf -b white
```

If you haven't installed the tool globally, you can still run it using:
```bash
node clipboard-to-image.js [options]
```

## Troubleshooting

### Mermaid Syntax Errors

If your diagram doesn't convert properly, check that your Mermaid syntax is correct. You can validate it using the [Mermaid Live Editor](https://mermaid.live/).

### Command Not Found

If you get a "command not found" error when running `mmdc`, make sure mermaid-cli is properly installed:

```bash
npm install -g @mermaid-js/mermaid-cli
```

## License

MIT
