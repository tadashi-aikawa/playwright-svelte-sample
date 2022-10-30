import { test as base, expect } from "@playwright/test";
import type { Locator, Page } from "@playwright/test";

class MainPage {
  constructor(public page: Page) {}

  async setUsersJsonStub(response: Object) {
    await this.page.route("**/api/users?page=2", (route) =>
      route.fulfill({
        status: 200,
        body: JSON.stringify(response),
      })
    );
  }

  async goto() {
    await this.page.goto("localhost:5173");
  }

  get fetchButton(): Locator {
    return this.page.getByRole("button", { name: "Fetch members" });
  }

  get userList(): Locator {
    return this.page.locator("data-test-id=member-list");
  }
}

const test = base.extend<{ mainPage: MainPage }>({
  mainPage: async ({ page }, use) => {
    const mainPage = new MainPage(page);
    await mainPage.goto();
    // デフォルトはこれ. 上書きが必要ならtest関数の中でoverrideする
    await mainPage.setUsersJsonStub({
      data: [
        {
          first_name: "たろう",
          last_name: "手素と",
        },
        {
          first_name: "じろう",
          last_name: "手素と",
        },
      ],
    });
    await use(mainPage);
  },
});

test("Test App.svelte", async ({ mainPage }) => {
  await mainPage.fetchButton.click();
  await expect(mainPage.userList).toHaveText(/たろう/);
  await expect(mainPage.userList).toHaveText(/じろう/);
});
