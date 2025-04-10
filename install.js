#!/usr/bin/env node

/**
 * Installation helper script for mermaid-convert
 * 
 * This script helps with the installation process by:
 * 1. Making the main script executable (on Unix systems)
 * 2. Installing the package globally
 * 3. Verifying the installation
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const os = require('os');

// ANSI colors for prettier output
const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  red: '\x1b[31m'
};

console.log(`${colors.blue}=== Mermaid Convert Installation Helper ===${colors.reset}\n`);

// Function to execute commands and handle errors
function runCommand(command, errorMessage) {
  try {
    console.log(`${colors.yellow}Executing: ${command}${colors.reset}`);
    execSync(command, { stdio: 'inherit' });
    return true;
  } catch (error) {
    console.error(`${colors.red}Error: ${errorMessage}${colors.reset}`);
    console.error(`${colors.red}${error.message}${colors.reset}`);
    return false;
  }
}

// 1. Make the script executable on Unix systems
if (os.platform() !== 'win32') {
  const scriptPath = path.join(__dirname, 'clipboard-to-image.js');
  
  try {
    console.log(`${colors.yellow}Making script executable...${colors.reset}`);
    fs.chmodSync(scriptPath, '755');
    console.log(`${colors.green}Script is now executable.${colors.reset}`);
  } catch (error) {
    console.error(`${colors.red}Error making script executable: ${error.message}${colors.reset}`);
    console.log(`${colors.yellow}You may need to run 'chmod +x ${scriptPath}' manually.${colors.reset}`);
  }
}

// 2. Install dependencies
console.log(`${colors.blue}\nInstalling dependencies...${colors.reset}`);
if (!runCommand('npm install', 'Failed to install dependencies.')) {
  process.exit(1);
}

// 3. Install the package globally
console.log(`${colors.blue}\nInstalling mermaid-convert globally...${colors.reset}`);
if (!runCommand('npm install -g .', 'Failed to install package globally.')) {
  console.log(`${colors.yellow}You might need to use sudo or adjust npm permissions.${colors.reset}`);
  console.log(`${colors.yellow}See INSTALLATION.md for troubleshooting tips.${colors.reset}`);
  process.exit(1);
}

// 4. Verify the installation
console.log(`${colors.blue}\nVerifying installation...${colors.reset}`);
try {
  const versionOutput = execSync('mermaid-convert --help', { encoding: 'utf8' });
  if (versionOutput.includes('mermaid-convert')) {
    console.log(`${colors.green}Installation successful! 🎉${colors.reset}`);
    console.log(`${colors.green}You can now use 'mermaid-convert' command from anywhere.${colors.reset}`);
  } else {
    throw new Error('Unexpected output from mermaid-convert command');
  }
} catch (error) {
  console.error(`${colors.red}Installation verification failed: ${error.message}${colors.reset}`);
  console.log(`${colors.yellow}The package was installed but might not be in your PATH.${colors.reset}`);
  console.log(`${colors.yellow}See INSTALLATION.md for troubleshooting tips.${colors.reset}`);
  process.exit(1);
}

// 5. Additional information
console.log(`\n${colors.blue}Next steps:${colors.reset}`);
console.log(`${colors.yellow}1. Copy a Mermaid diagram to your clipboard${colors.reset}`);
console.log(`${colors.yellow}2. Run 'mermaid-convert' to convert it to PNG with default settings${colors.reset}`);
console.log(`${colors.yellow}3. For more options, run 'mermaid-convert --help'${colors.reset}`);
