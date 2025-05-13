#!/bin/sh
# husky

# Start husky hook
command_exists () {
  command -v "$1" >/dev/null 2>&1
}

# Load nvm if available so that "npx" works in GUI apps like GitKraken
if [ -s "$HOME/.nvm/nvm.sh" ]; then
  . "$HOME/.nvm/nvm.sh"
fi
