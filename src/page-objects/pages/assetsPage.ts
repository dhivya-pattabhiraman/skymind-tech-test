import { Page, Locator } from '@playwright/test'

class AssetsPage {
    page: Page

    constructor(page: Page) {
        this.page = page
    }

    get mainContent() {
        return this.page.locator('#content')
    }
    get tableHeading() {
        return this.mainContent.getByText('Assets', { exact: true })
    }
    get table() {
        return this.mainContent.getByRole('table')
    }

    get assetTypeFilters() {
        return this.mainContent.locator('[data-id="airportOptions"] li')
    }
    get palletFilter() {
        return this.assetTypeFilters.filter({hasText: 'Pallet'}).locator('input')
    }
    get containerFilter() {
        return this.assetTypeFilters.filter({hasText: 'Container'}).locator('input')
    }

    // Load page
    load(url: string) {
        return this.page.goto(url)
    }

    // Configure asset type filters
    async configureAssetTypeFilters({ palletFilterFlag, containerFilterFlag }: { palletFilterFlag: boolean, containerFilterFlag: boolean }) {
        await this.palletFilter.setChecked(palletFilterFlag)
        await this.containerFilter.setChecked(containerFilterFlag)
    }

    getAllTableRows() {
        return this.table.locator('tbody tr').all()
    }

    getAssetTypeDataFrom(row: Locator) {
        return row.locator('td').nth(1)
    }
}

export default AssetsPage
