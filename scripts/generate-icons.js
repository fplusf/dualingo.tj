// Script to generate/sync PWA icons from dulingo-logo.png
import fs from 'fs';
import { execSync } from 'child_process';

const masterIcon = './public/dulingo-logo.png';

if (fs.existsSync(masterIcon)) {
  console.log('Generating PWA icons from master logo...');
  execSync(`sips -s format png ${masterIcon} --resampleWidth 512 --out ./public/pwa-512x512.png`);
  execSync(`sips -s format png ${masterIcon} --resampleWidth 192 --out ./public/pwa-192x192.png`);
  execSync(`sips -s format png ${masterIcon} --resampleWidth 180 --out ./public/apple-touch-icon.png`);
  execSync(`sips -s format png ${masterIcon} --resampleWidth 410 --out /tmp/maskable-temp.png`);
  execSync(`sips -p 512 512 --padColor 74CC05 /tmp/maskable-temp.png --out ./public/pwa-maskable-512x512.png`);
  if (fs.existsSync('/tmp/maskable-temp.png')) fs.unlinkSync('/tmp/maskable-temp.png');
  console.log('PWA icons updated successfully!');
} else {
  console.log('Master logo not found at ./public/dulingo-logo.png');
}
