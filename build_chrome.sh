#!/usr/bin/env bash

source build_common.sh

RESULTING_FILE="lessdistractingreddit_chrome.zip"

echo "Removing the old extension"
rm -f "./build/$RESULTING_FILE"

echo "Copying Chrome manifest"
cp "./manifest_chrome.json" "$STAGING_DIR/manifest.json"

(cd "$STAGING_DIR" && zip -r "../$RESULTING_FILE" .)