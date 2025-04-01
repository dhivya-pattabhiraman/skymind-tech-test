import { Page } from '@playwright/test'

class LoginPage {
    page: Page

    constructor(page: Page) {
        this.page = page
    }

    get username() {
        return this.page.locator('input[name="username"]')
    }
    get password() {
        return this.page.locator('input[name="password"]')
    }
    get loginButton() {
        return this.page.getByRole('button', { name: `LOGIN` })
    }

    // Load page
    load(url: string) {
        return this.page.goto(url)
    }

    // Login as test user
    async loginAs(username: string, password: string) {
        await this.username.fill(username)
        await this.password.fill(password)
        await this.loginButton.click()
    }
}

export default LoginPage
