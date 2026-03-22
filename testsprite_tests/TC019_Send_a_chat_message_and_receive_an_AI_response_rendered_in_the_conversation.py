import asyncio
from playwright import async_api
from playwright.async_api import expect

async def run_test():
    pw = None
    browser = None
    context = None

    try:
        # Start a Playwright session in asynchronous mode
        pw = await async_api.async_playwright().start()

        # Launch a Chromium browser in headless mode with custom arguments
        browser = await pw.chromium.launch(
            headless=True,
            args=[
                "--window-size=1280,720",         # Set the browser window size
                "--disable-dev-shm-usage",        # Avoid using /dev/shm which can cause issues in containers
                "--ipc=host",                     # Use host-level IPC for better stability
                "--single-process"                # Run the browser in a single process mode
            ],
        )

        # Create a new browser context (like an incognito window)
        context = await browser.new_context()
        context.set_default_timeout(5000)

        # Open a new page in the browser context
        page = await context.new_page()

        # Interact with the page elements to simulate user flow
        # -> Navigate to http://localhost:7000
        await page.goto("http://localhost:7000")
        
        # -> Navigate to /chat (explicit instruction in test steps).
        await page.goto("http://localhost:7000/chat")
        
        # -> Type the message into the chat input (index 1286) and send it by pressing Enter.
        frame = context.pages[-1]
        # Input text
        elem = frame.locator('xpath=/html/body/main/div[2]/div[2]/form/div[2]/input').nth(0)
        await asyncio.sleep(3); await elem.fill('Hello Cybill—can you summarize what this portfolio site is about?')
        
        # --> Assertions to verify final state
        frame = context.pages[-1]
        assert 'Chat' in await frame.evaluate("() => document.title"), "Expected 'Chat' to be in the page title"
        assert await frame.locator("xpath=//*[contains(., 'Hello Cybill—can you summarize what this portfolio site is about?')]" ).nth(0).is_visible(), "Expected 'Hello Cybill—can you summarize what this portfolio site is about?' to be visible"
        assert await frame.locator("xpath=//*[contains(., 'portfolio')]" ).nth(0).is_visible(), "Expected 'portfolio' to be visible"
        await asyncio.sleep(5)

    finally:
        if context:
            await context.close()
        if browser:
            await browser.close()
        if pw:
            await pw.stop()

asyncio.run(run_test())
    