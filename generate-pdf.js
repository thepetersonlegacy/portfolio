import puppeteer from 'puppeteer';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function generatePDF() {
  console.log('🚀 Starting PDF generation...');
  
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  
  const page = await browser.newPage();
  
  // Read the HTML file
  const htmlPath = path.join(__dirname, 'public', 'lead-magnet-template.html');
  const htmlContent = fs.readFileSync(htmlPath, 'utf8');
  
  // Set content
  await page.setContent(htmlContent, {
    waitUntil: 'networkidle0'
  });
  
  // Generate PDF
  const pdfPath = path.join(__dirname, 'public', '10-website-mistakes-guide.pdf');
  
  await page.pdf({
    path: pdfPath,
    format: 'A4',
    printBackground: true,
    margin: {
      top: 0,
      right: 0,
      bottom: 0,
      left: 0
    },
    preferCSSPageSize: true
  });
  
  await browser.close();
  
  console.log('✅ PDF generated successfully!');
  console.log(`📄 Location: ${pdfPath}`);
  
  // Check file size
  const stats = fs.statSync(pdfPath);
  const fileSizeInMB = stats.size / (1024 * 1024);
  console.log(`📊 File size: ${fileSizeInMB.toFixed(2)} MB`);
}

generatePDF().catch(error => {
  console.error('❌ Error generating PDF:', error);
  process.exit(1);
});

