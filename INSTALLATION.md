# Installing mermaid-convert as a System-wide Command

This guide will help you install `mermaid-convert` as a system-wide command that you can run from anywhere without typing `node` or `.js`.

## Prerequisites

- Node.js (v14 or higher)
- npm (usually comes with Node.js)

## Installation Methods

Choose one of the following installation methods:

### Method 1: Install from the local directory (recommended during development)

1. Clone or download this repository
2. Navigate to the project directory
3. Run the following command:

```bash
npm install -g .
```

This will install `mermaid-convert` globally on your system.

### Method 2: Create and publish to npm (for wider distribution)

If you want to distribute this tool to others, you can publish it to npm:

1. Register an account on npmjs.com (if you don't have one)
2. Login to npm from your terminal:

```bash
npm login
```

3. Publish the package:

```bash
npm publish
```

4. Users can install it with:

```bash
npm install -g mermaid-clipboard-converter
```

## Verifying the Installation

After installation, you can verify that `mermaid-convert` is available globally by running:

```bash
mermaid-convert --help
```

You should see the help output displaying the available options.

## Making the Script Executable (Unix/Linux/macOS)

If you're on a Unix-based system (Linux or macOS), you may need to make the script executable:

```bash
chmod +x ./clipboard-to-image.js
```

## Troubleshooting

### Command not found

If you get a "command not found" error when running `mermaid-convert`:

1. Check if the npm global bin directory is in your PATH:

```bash
npm config get prefix
```

The result usually points to a directory like `/usr/local` or something in your home directory.

2. Add the npm bin directory to your PATH in your shell profile file (.bashrc, .zshrc, etc.):

```bash
export PATH="$(npm config get prefix)/bin:$PATH"
```

3. Reload your shell configuration:

```bash
source ~/.bashrc  # or .zshrc, etc.
```

### Permission issues

If you encounter permission errors during installation:

1. Try installing with sudo (not recommended but sometimes necessary):

```bash
sudo npm install -g .
```

2. Or, a safer approach is to change npm's default directory:

```bash
npm config set prefix ~/.npm-global
export PATH=~/.npm-global/bin:$PATH
```

Add the export line to your shell profile file (.bashrc, .zshrc, etc.) to make it permanent.
