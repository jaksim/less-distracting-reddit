#!/usr/bin/env bash

source build_common.sh

RESULTING_FILE="lessdistractingreddit_firefox.zip"

echo "Removing the old extension"
rm -f "./build/$RESULTING_FILE"

echo "Copying Firefox manifest"
cp "./manifest_firefox.json" "$STAGING_DIR/manifest.json"

(cd "$STAGING_DIR" && zip -r "../$RESULTING_FILE" .)