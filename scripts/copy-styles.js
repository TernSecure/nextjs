const postcss = require('postcss');
const tailwindcss = require('tailwindcss');
const fs = require('fs');
const path = require('path');

async function buildStyles() {
  // Ensure directories exist
  if (!fs.existsSync('dist')) {
    fs.mkdirSync('dist');
  }
  
  // Process CSS with PostCSS and Tailwind
  const css = fs.readFileSync(
    path.join('src', 'styles', 'components.css'),
    'utf8'
  );

  const result = await postcss([
    tailwindcss(path.join('src', 'styles', 'tailwind.config.ts')),
  ]).process(css, {
    from: path.join('src', 'styles', 'components.css'),
    to: path.join('dist', 'styles.css'),
  });

  // Write processed CSS to dist
  fs.writeFileSync(path.join('dist', 'styles.css'), result.css);
}

buildStyles().catch(console.error);