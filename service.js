const SOLD_OUT_MESSAGE = "Товар распродан";
const AVAILABLE_MESSAGE = "В наличии";
const BUTTON_IS_NOT_AVAILABLE = "Кнопка отсутствует";

function isPhoneSoldOut(text) {
  return text === SOLD_OUT_MESSAGE;
}

async function checkButtonAvailability(page) {
  const addToBasketBtn = await page.$(".add-to-basket-button");
  if (addToBasketBtn) {
    console.log(
      `${new Date().toString()}, Состояние кнопки "Купить": ${(await page.evaluate(
        el => el.getAttribute("value"),
        addToBasketBtn
      )) || BUTTON_IS_NOT_AVAILABLE}`
    );
  } else {
    console.log(
      `${new Date().toString()}, Состояние кнопки "Купить": ${BUTTON_IS_NOT_AVAILABLE}`
    );
  }
}

async function checkSoldOutMessage(page) {
  const messages = await page.$$(".c-notifications__title");

  if (messages.length) {
    for (const message of messages) {
      if (
        isPhoneSoldOut(
          (await page.evaluate(el => el.textContent, message)).trim()
        )
      ) {
        console.log(
          `${new Date().toString()}, Состояние товара: ${SOLD_OUT_MESSAGE}\n`
        );
        return;
      }
    }

    console.log(
      `${new Date().toString()}, Состояние товара: ${AVAILABLE_MESSAGE}\n`
    );
  }
}

async function getRegion(page) {
  const region = await page.$(".sel-button-region");
  if (region) {
    const regionName = (await page.evaluate(
      el => el.textContent,
      region
    )).trim();
    console.log(`${new Date().toString()}, Регион: ${regionName}`);
    return regionName;
  }
  return "";
}

async function changeRegion(page, targetCity) {
  const region = await page.$(".sel-button-region");
  if (region) {
    region.click();
    await page.waitFor(3000);
    const citiesList = await page.$$(".label-radio");
    if (citiesList.length) {
      for (const city of citiesList) {
        if (
          (await page.evaluate(el => el.textContent, city)).trim() ===
          targetCity
        ) {
          city.click();
          return;
        }
      }
    }
  }
}

module.exports = {
  changeRegion,
  checkButtonAvailability,
  checkSoldOutMessage,
  getRegion
};
