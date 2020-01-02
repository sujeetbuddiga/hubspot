// const newSubmission = require('./single-submit')
const config = require("./config.json");
const newSubmission = require("./single_submit");
const puppeteer = require('puppeteer');
const XLSX = require('xlsx');
const workbook = XLSX.readFile(config.filePath);
const first_sheet_name = workbook.SheetNames[0];
const worksheet = workbook.Sheets[first_sheet_name];
const worksheet_json = XLSX.utils.sheet_to_json(worksheet)

const url = config.url;

async function bulkSubmit(url, worksheet_json) {

    const browser = await puppeteer.launch();
    try {
        for (let index = 0; index < 300; index++) {
            let data = worksheet_json[index]
            await newSubmission(browser, url, data);
            console.log(data)
        }
    } catch (error) {
        console.error(error)
    }
    // worksheet_json.map(function (data,index) {
    //     console.log(index)

    //     // console.log(data)    
    // })


}
bulkSubmit(url, worksheet_json)
// await newSubmission(browser,url,data)
// console.log(await page.content());
// await page.screenshot({path: 'screenshot.png'});

// await browser.close();