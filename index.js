const puppeteer = require("puppeteer");
const {
  changeRegion,
  checkButtonAvailability,
  checkSoldOutMessage,
  getRegion
} = require("./service");
const settings = require("./settings");

main();
setInterval(main, 1800 * 1000);

async function main() {
  console.log("///////////////////////////////////////////////////////////");
  console.log("Новая итерация проверки...");

  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  // В мобильной раскладке регион прячется в боковое меню
  await page.setViewport({ width: 1920, height: 1080 });
  page.on("load", () => console.log("Loaded: " + page.url()));

  await page.goto(settings.url);

  const regionName = await getRegion(page);
  if (regionName !== settings.city) {
    console.log(`Изменяем регион на ${settings.city}...`);
    await changeRegion(page, settings.city);
    await page.waitForNavigation();
    await getRegion(page);
  }

  await checkButtonAvailability(page);
  await checkSoldOutMessage(page);

  browser.close();
}
