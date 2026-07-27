import puppeteer from "puppeteer-core";

const BASE = process.env.BASE ?? "http://127.0.0.1:8123";
const OUT = process.env.OUT ?? ".";

const browser = await puppeteer.launch({
  executablePath:
    "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  headless: "shell",
  args: ["--no-first-run", "--hide-scrollbars"],
});

const shots = [
  { name: "desktop", width: 1440, height: 900, dsf: 1 },
  // dsf 1: con dsf 2 la página completa supera el límite de textura
  // de Chrome (16384px) y la captura sale duplicada
  { name: "mobile", width: 390, height: 844, dsf: 1 },
];

for (const s of shots) {
  const page = await browser.newPage();
  await page.setViewport({
    width: s.width,
    height: s.height,
    deviceScaleFactor: s.dsf,
  });
  await page.goto(`${BASE}/`, { waitUntil: "networkidle0", timeout: 30000 });
  // recorrer la página para disparar imágenes lazy (fullPage no lo hace)
  await page.evaluate(async () => {
    const step = 700;
    for (let y = 0; y <= document.body.scrollHeight; y += step) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 90));
    }
    window.scrollTo(0, 0);
  });
  // forzar visibilidad de reveals para la captura full-page
  await page.evaluate(() => {
    document
      .querySelectorAll(".reveal")
      .forEach((el) => el.classList.add("is-in"));
  });
  // sin esto, captureBeyondViewport pinta en blanco las imágenes lazy
  await page.evaluate(() =>
    Promise.all(
      Array.from(document.images).map((img) => {
        img.loading = "eager";
        return img.decode().catch(() => {});
      }),
    ),
  );
  await new Promise((r) => setTimeout(r, 900));
  await page.screenshot({ path: `${OUT}/${s.name}-full.png`, fullPage: true });
  // above the fold sin forzar nada
  await page.reload({ waitUntil: "networkidle0" });
  await new Promise((r) => setTimeout(r, 900));
  await page.screenshot({ path: `${OUT}/${s.name}-hero.png` });
  await page.close();
}

await browser.close();
console.log("capturas listas");
