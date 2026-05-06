const fs = require('fs');
const path = require('path');

const sourceDir = path.join('C:', 'Users', 'kkewa', '.gemini', 'antigravity', 'brain', '997867e3-7ad5-4612-af9a-3e7431df8aab');
const targetDir = path.join(__dirname, '..', 'public', 'images', 'carousel');

if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

const files = [
  { src: 'media__1778098962669.jpg', dest: 'carousel-1.jpg' },
  { src: 'media__1778098962913.jpg', dest: 'carousel-2.jpg' },
  { src: 'media__1778098962984.jpg', dest: 'carousel-3.jpg' },
  { src: 'media__1778098963010.jpg', dest: 'carousel-4.jpg' },
  { src: 'media__1778098963026.jpg', dest: 'carousel-5.jpg' },
];

files.forEach(f => {
  fs.copyFileSync(path.join(sourceDir, f.src), path.join(targetDir, f.dest));
});

console.log('Images copied successfully.');
