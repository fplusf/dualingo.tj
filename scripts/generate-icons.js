import fs from 'fs';
import zlib from 'zlib';

function createCrcTable() {
  const table = new Uint32Array(256);
  for (let n = 0; n < 256; n++) {
    let c = n;
    for (let k = 0; k < 8; k++) {
      if (c & 1) c = 0xedb88320 ^ (c >>> 1);
      else c = c >>> 1;
    }
    table[n] = c;
  }
  return table;
}

const crcTable = createCrcTable();

function crc32(buf) {
  let crc = -1;
  for (let i = 0; i < buf.length; i++) {
    crc = (crc >>> 8) ^ crcTable[(crc ^ buf[i]) & 0xff];
  }
  return (crc ^ -1) >>> 0;
}

function makeChunk(type, data) {
  const len = data.length;
  const buf = Buffer.alloc(8 + len + 4);
  buf.writeUInt32BE(len, 0);
  buf.write(type, 4, 4, 'ascii');
  data.copy(buf, 8);
  const crc = crc32(buf.subarray(4, 8 + len));
  buf.writeUInt32BE(crc, 8 + len);
  return buf;
}

function generatePng(width, height, isMaskable = false) {
  const header = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(width, 0);
  ihdr.writeUInt32BE(height, 4);
  ihdr[8] = 8; // 8 bits per channel
  ihdr[9] = 6; // RGBA
  ihdr[10] = 0; // compression
  ihdr[11] = 0; // filter
  ihdr[12] = 0; // interlace

  const ihdrChunk = makeChunk('IHDR', ihdr);

  // Generate image data: Green background (#58CC02) with circular owl face & eye shapes
  const rawData = Buffer.alloc(height * (width * 4 + 1));
  let offset = 0;

  const cx = width / 2;
  const cy = height / 2;
  const r = (Math.min(width, height) / 2) * (isMaskable ? 0.75 : 0.88);

  for (let y = 0; y < height; y++) {
    rawData[offset++] = 0; // filter type None
    for (let x = 0; x < width; x++) {
      const dx = x - cx;
      const dy = y - cy;
      const dist = Math.sqrt(dx * dx + dy * dy);

      // Default green
      let rCol = 88;
      let gCol = 204;
      let bCol = 2;
      let alpha = 255;

      if (!isMaskable && dist > r) {
        // Transparent outside rounded corners
        const cornerDist = Math.max(Math.abs(dx), Math.abs(dy)) - (r * 0.7);
        if (dist > r * 1.05) {
          alpha = 0;
        }
      }

      // Left eye
      const eyeLDist = Math.sqrt((x - (cx - r * 0.32)) ** 2 + (y - (cy - r * 0.15)) ** 2);
      // Right eye
      const eyeRDist = Math.sqrt((x - (cx + r * 0.32)) ** 2 + (y - (cy - r * 0.15)) ** 2);
      const eyeRadius = r * 0.28;

      if (eyeLDist < eyeRadius || eyeRDist < eyeRadius) {
        // White sclera
        rCol = 255; gCol = 255; bCol = 255;
        // Pupil
        const pupilL = Math.sqrt((x - (cx - r * 0.28)) ** 2 + (y - (cy - r * 0.12)) ** 2);
        const pupilR = Math.sqrt((x - (cx + r * 0.28)) ** 2 + (y - (cy - r * 0.12)) ** 2);
        if (pupilL < eyeRadius * 0.55 || pupilR < eyeRadius * 0.55) {
          rCol = 43; gCol = 57; bCol = 66; // Dark pupil
          // Eye shine
          const shineL = Math.sqrt((x - (cx - r * 0.22)) ** 2 + (y - (cy - r * 0.2)) ** 2);
          const shineR = Math.sqrt((x - (cx + r * 0.34)) ** 2 + (y - (cy - r * 0.2)) ** 2);
          if (shineL < eyeRadius * 0.2 || shineR < eyeRadius * 0.2) {
            rCol = 255; gCol = 255; bCol = 255;
          }
        }
      }

      // Beak (orange triangle)
      if (Math.abs(dx) < r * 0.16 && dy > -r * 0.05 && dy < r * 0.25) {
        if (Math.abs(dx) < (r * 0.25 - dy) * 0.55) {
          rCol = 255; gCol = 160; bCol = 0; // Orange
        }
      }

      rawData[offset++] = rCol;
      rawData[offset++] = gCol;
      rawData[offset++] = bCol;
      rawData[offset++] = alpha;
    }
  }

  const compressed = zlib.deflateSync(rawData);
  const idatChunk = makeChunk('IDAT', compressed);
  const iendChunk = makeChunk('IEND', Buffer.alloc(0));

  return Buffer.concat([header, ihdrChunk, idatChunk, iendChunk]);
}

if (!fs.existsSync('./public')) {
  fs.mkdirSync('./public');
}

fs.writeFileSync('./public/pwa-192x192.png', generatePng(192, 192, false));
fs.writeFileSync('./public/pwa-512x512.png', generatePng(512, 512, false));
fs.writeFileSync('./public/pwa-maskable-512x512.png', generatePng(512, 512, true));
fs.writeFileSync('./public/apple-touch-icon.png', generatePng(180, 180, false));
fs.writeFileSync('./public/favicon.ico', generatePng(64, 64, false));

console.log('PWA PNG icons generated successfully!');
