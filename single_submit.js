const path = require('path');
async function newSubmission(browser, url, data) {
    console.log("here")
    return new Promise(async function (resolve, reject) {
        try {
            const fname = data.firstname + "_" + data.lastname;
            const _path = path.join('/home/sujeet/Labs/Hubspot/screenshots/' + fname);
            const fileExt = ".png";
            const page = await browser.newPage();
            await page.goto(url);
            await page.waitForSelector('.hs-form-field')
            // await page.screenshot({
            //     path: _path + "_ip" + fileExt,
            //     type: 'png'
            // });
            let formfields = await page.$$('.hs-form-field')

            for (const elementHandle of formfields) {
                const textElement = await elementHandle.$('input[type="text"]')
                const emailElement = await elementHandle.$('input[type="email"]')
                const element = textElement ? textElement : emailElement
                if (element) {
                    const tagName = await element.evaluate(function (params) {
                        return params['name']
                    })
                    console.log(tagName)
                    let field_val = data[tagName]
                    if (field_val) {
                        await element.type(field_val);
                    }
                }
            }
            await page.screenshot({
                path: _path + "_op" + fileExt,
                type: 'png'
            });
            let submitButton = await page.$('input[type="submit"]');
            await submitButton.click();
            // await new Promise(resolve => setTimeout(resolve, 5000));
            let success = await page.waitForSelector(".submitted-message.hs-main-font-element.free-message",{
                timeout:30000   
            }) != null ? true : false
            if (success) {
                await page.screenshot({
                    path: _path + "_final" + fileExt,
                    type: 'png'
                });
            }
            await page.close();
            resolve({
                "msg": "done"
            })
        } catch (error) {
            console.error({
                "error": error
            })
            resolve({
                "msg": "not done"
            })
        }
    })
}
module.exports = newSubmission;

// (async () => {
//   const browser = await puppeteer.launch();
//   const page = await browser.newPage();

//   await page.goto('https://www.google.com/admin');

//   await page.type('#username', 'foo@example.com');
//   await page.type('#password', 'password');
//   await page.keyboard.press('Enter');

//   await page.waitForNavigation();
//   console.log('New Page URL:', page.url());
//   await browser.close();
// })();