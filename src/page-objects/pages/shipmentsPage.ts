import { Page, Locator } from '@playwright/test'

class ShipmentsPage {
    page: Page

    constructor(page: Page) {
        this.page = page
    }

    get mainContent() {
        return this.page.locator('#content')
    }
    get tableHeading() {
        return this.mainContent.getByText('Shipments', { exact: true })
    }
    get table() {
        return this.mainContent.getByRole('table')
    }

    get statusFilters() {
        return this.mainContent.locator('[data-id="airportOptions"] li')
    }
    get notStartedFilter() {
        return this.statusFilters.filter({hasText: 'Not Started'}).locator('input')
    }
    get inTransitFilter() {
        return this.statusFilters.filter({hasText: 'In Transit'}).locator('input')
    }
    get closedFilter() {
        return this.statusFilters.filter({hasText: 'Closed'}).locator('input')
    }

    // Load page
    load(url: string) {
        return this.page.goto(url)
    }

    // Configure status filters
    async configureStatusFilters({ notStartedFilterFlag, inTransitFilterFlag, closedFilterFlag }: { notStartedFilterFlag: boolean, inTransitFilterFlag: boolean, closedFilterFlag: boolean }) {
        await this.notStartedFilter.setChecked(notStartedFilterFlag)
        await this.inTransitFilter.setChecked(inTransitFilterFlag)
        await this.closedFilter.setChecked(closedFilterFlag)
    }

    getAllTableRows() {
        return this.table.locator('tbody tr').all()
    }

    getStatusDataFrom(row: Locator) {
        return row.locator('td').nth(10)
    }
}

export default ShipmentsPage
