#!/usr/bin/env node

/**
 * Mermaid Clipboard Converter
 * 
 * A command-line tool that takes Mermaid diagram text from the system clipboard
 * and converts it to various image formats using mermaid-cli.
 * 
 * Usage: mermaid-convert [options]
 * 
 * Options:
 *   -f, --format <format>    Output format (png, svg, pdf) [default: png]
 *   -t, --theme <theme>      Theme (default, dark, forest, neutral) [default: dark]
 *   -b, --background <color> Background color (any CSS color or 'transparent') [default: transparent]
 *   -o, --output <filename>  Output filename [default: my-diagram.<format>]
 *   -h, --help               Display this help message
 */

const fs = require('fs');
const path = require('path');
const os = require('os');
const { execSync } = require('child_process');
// Import clipboardy as an ES module default export
const clipboardy = require('clipboardy').default;
const yargs = require('yargs/yargs');
const { hideBin } = require('yargs/helpers');

// Parse command-line arguments
const argv = yargs(hideBin(process.argv))
  .option('format', {
    alias: 'f',
    describe: 'Output format (png, svg, pdf)',
    type: 'string',
    default: 'png'
  })
  .option('theme', {
    alias: 't',
    describe: 'Theme (default, dark, forest, neutral)',
    type: 'string',
    default: 'dark'
  })
  .option('background', {
    alias: 'b',
    describe: 'Background color (any CSS color or "transparent")',
    type: 'string',
    default: 'transparent'
  })
  .option('output', {
    alias: 'o',
    describe: 'Output filename',
    type: 'string'
  })
  .help()
  .alias('help', 'h')
  .argv;

// Validate format
const validFormats = ['png', 'svg', 'pdf'];
if (!validFormats.includes(argv.format)) {
  console.error(`Error: Invalid format "${argv.format}". Must be one of: ${validFormats.join(', ')}`);
  process.exit(1);
}

// Validate theme
const validThemes = ['default', 'dark', 'forest', 'neutral'];
if (!validThemes.includes(argv.theme)) {
  console.error(`Error: Invalid theme "${argv.theme}". Must be one of: ${validThemes.join(', ')}`);
  process.exit(1);
}

// Set default output filename if not provided
if (!argv.output) {
  argv.output = `my-diagram.${argv.format}`;
}

async function main() {
  try {
    // Read Mermaid diagram content from clipboard
    console.log('Reading Mermaid diagram from clipboard...');
    const clipboardContent = await clipboardy.read();
    
    // Create temporary Mermaid file
    const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'mermaid-converter-'));
    const tempMermaidPath = path.join(tempDir, 'input.mmd');
    
    console.log(`Creating temporary Mermaid file: ${tempMermaidPath}`);
    fs.writeFileSync(tempMermaidPath, clipboardContent, 'utf8');
    
    // Construct mermaid-cli command
    const mmdc = findMmdcExecutable();
    const outputPath = path.resolve(argv.output);
    
    const mmdcCommand = [
      mmdc,
      '-i', tempMermaidPath,
      '-o', outputPath,
      '-t', argv.theme,
      '-b', argv.background
    ].join(' ');
    
    // Execute the command
    console.log('Converting Mermaid diagram to desired format...');
    console.log(`Command: ${mmdcCommand}`);
    
    execSync(mmdcCommand, { stdio: 'inherit' });
    
    // Cleanup temp files
    fs.unlinkSync(tempMermaidPath);
    fs.rmdirSync(tempDir);
    
    console.log(`Conversion successful! Output saved to: ${outputPath}`);
  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
}

// Function to find the mmdc executable
function findMmdcExecutable() {
  try {
    // Try to find mmdc in path
    execSync('mmdc --version', { stdio: 'ignore' });
    return 'mmdc';
  } catch (e) {
    // Try with npx
    try {
      execSync('npx -p @mermaid-js/mermaid-cli mmdc --version', { stdio: 'ignore' });
      return 'npx -p @mermaid-js/mermaid-cli mmdc';
    } catch (e) {
      console.error('Error: Could not find mermaid-cli (mmdc). Please install it with:');
      console.error('npm install -g @mermaid-js/mermaid-cli');
      process.exit(1);
    }
  }
}

main();
