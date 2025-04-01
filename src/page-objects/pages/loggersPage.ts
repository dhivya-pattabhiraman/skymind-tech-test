import { Page, Locator } from '@playwright/test'

class LoggersPage {
    page: Page

    constructor(page: Page) {
        this.page = page
    }

    get mainContent() {
        return this.page.locator('#content')
    }
    get tableHeading() {
        return this.mainContent.getByText('Loggers', { exact: true })
    }
    get table() {
        return this.mainContent.getByRole('table')
    }

    get pairingStatusFilters() {
        return this.mainContent.locator('[data-id="airportOptions"] li')
    }
    get pairedFilter() {
        return this.pairingStatusFilters.filter({hasText: new RegExp(`^Paired`)}).locator('input')
    }
    get notPairedFilter() {
        return this.pairingStatusFilters.filter({hasText: new RegExp(`^Not Paired`)}).locator('input')
    }

    // Load page
    load(url: string) {
        return this.page.goto(url)
    }

    // Configure pairing status filters
    async configurePairingStatusFilters({ pairedFilterFlag, notPairedFilterFlag }: { pairedFilterFlag: boolean, notPairedFilterFlag: boolean }) {
        await this.pairedFilter.setChecked(pairedFilterFlag)
        await this.notPairedFilter.setChecked(notPairedFilterFlag)
    }

    getAllTableRows() {
        return this.table.locator('tbody tr').all()
    }

    getPairingStatusDataFrom(row: Locator) {
        return row.locator('td').last()
    }
}

export default LoggersPage
