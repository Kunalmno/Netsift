import puppeteer from "puppeteer";
import { ExecutionEnvironment } from "../../../types/executor";
import { LaunchBrowserTask } from "../task/LaunchBrowser";
// proxy browser to bypass bot detection
/*const BROWSER_WS =
  "wss://brd-customer-hl_80dff1cd-zone-scraping_browser_netsift:9fvd5rw04g2s@brd.superproxy.io:9222";*/
export async function LaunchBrowserExecutor(
  environment: ExecutionEnvironment<typeof LaunchBrowserTask>
): Promise<boolean> {
  try {
    const websiteUrl = environment.getInput("Website Url");
    const browser = await puppeteer.launch({
      headless: true,
    });
    //to remotely launch browser in proxy zone
    /*const browser = await puppeteer.connect({
      browserWSEndpoint: BROWSER_WS,
    });*/
    environment.log.info("Browser Started Successfully");
    environment.setBrowser(browser);
    const page = await browser.newPage();
    // for proxy browser
    //page.setViewport({ width: 2560, height: 1440 });
    await page.goto(websiteUrl);
    environment.setPage(page);
    environment.log.info(`Opened page at: ${websiteUrl}`);
    return true;
  } catch (error: any) {
    environment.log.error(error.message);
    return false;
  }
}
