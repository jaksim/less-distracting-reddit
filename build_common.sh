#!/usr/bin/env bash

STAGING_DIR="./build/staging"

echo "Deleting old staging folder"
rm -rf "$STAGING_DIR"

echo "Creating new staging folder"
mkdir -p "$STAGING_DIR"

echo "Copying common files"
cp -r img "$STAGING_DIR"
cp -r options "$STAGING_DIR"
cp -r src "$STAGING_DIR"
cp LICENSE "$STAGING_DIR"
