import { test, expect, Page } from '@playwright/test'

import {
    LOGIN_PAGE_URL,
    USERNAME,
    PASSWORD,
    LOGIN_PAGE_TITLE,
    SKY_MIND_PAGE_TITLE,
    LOGGERS_PAGE_URL,
    ASSETS_PAGE_URL,
    SHIPMENTS_PAGE_URL
} from '@src/constants'

import LoginPage from '@pages/loginPage'
import LoggersPage from '@pages/loggersPage'
import AssetsPage from '@pages/assetsPage'
import ShipmentsPage from "@pages/shipmentsPage"

let page: Page

test.beforeEach(async ({browser}) => {
    page = await browser.newPage()

    const loginPage = new LoginPage(page)

    // Load login page
    await loginPage.load(LOGIN_PAGE_URL)
    await expect(loginPage.page).toHaveTitle(LOGIN_PAGE_TITLE)

    // Login as test user
    await loginPage.loginAs(USERNAME, PASSWORD)
    await expect(page).toHaveTitle(SKY_MIND_PAGE_TITLE)
})

test('Filtering on Loggers table page', async () => {
    const loggersPage = new LoggersPage(page)

    // Load the loggers page
    await loggersPage.load(LOGGERS_PAGE_URL)
    await expect(loggersPage.page).toHaveTitle(SKY_MIND_PAGE_TITLE)
    await expect(loggersPage.tableHeading).toBeVisible()
    await expect(loggersPage.table).toBeVisible()

    // Select the pairing status as Not Paired
    await loggersPage.configurePairingStatusFilters({ pairedFilterFlag: false, notPairedFilterFlag: true })

    // Wait for the table to refresh with the selected filter
    await page.waitForTimeout(2 * 1000)

    // Assert the table has loaded with entries corresponding to Pairing status = Not paired
    const allTableRows = await loggersPage.getAllTableRows()
    for (const row of allTableRows) {
        await expect(loggersPage.getPairingStatusDataFrom(row)).toHaveText('Not Paired')
    }
})

test('Filtering on Assets table page', async () => {
    const assetsPage = new AssetsPage(page)

    // Load the assets page
    await assetsPage.load(ASSETS_PAGE_URL)
    await expect(assetsPage.page).toHaveTitle(SKY_MIND_PAGE_TITLE)
    await expect(assetsPage.tableHeading).toBeVisible()
    await expect(assetsPage.table).toBeVisible()

    // Select the Asset type as Container
    await assetsPage.configureAssetTypeFilters({ palletFilterFlag: false, containerFilterFlag: true })

    // Wait for the table to refresh with the selected filter
    await page.waitForTimeout(2 * 1000)

    // Assert the table has loaded with entries corresponding to Asset Type = Container
    const allTableRows = await assetsPage.getAllTableRows()
    for (const row of allTableRows) {
        await expect(assetsPage.getAssetTypeDataFrom(row)).toHaveText('Container')
    }
})

test('Filtering on Shipments table page', async () => {
    const shipmentsPage = new ShipmentsPage(page)

    // Load the shipments page
    await shipmentsPage.load(SHIPMENTS_PAGE_URL)
    await expect(shipmentsPage.page).toHaveTitle(SKY_MIND_PAGE_TITLE)
    await expect(shipmentsPage.tableHeading).toBeVisible()
    await expect(shipmentsPage.table).toBeVisible()

    // Select the Status as Closed
    await shipmentsPage.configureStatusFilters({ notStartedFilterFlag: false, inTransitFilterFlag: false, closedFilterFlag: true })

    // Wait for the table to refresh with the selected filter
    await page.waitForTimeout(2 * 1000)

    // Assert the table has loaded with entries corresponding to Status = Closed
    const allTableRows = await shipmentsPage.getAllTableRows()
    for (const row of allTableRows) {
        await expect(shipmentsPage.getStatusDataFrom(row)).toHaveText('Closed')
    }
})

