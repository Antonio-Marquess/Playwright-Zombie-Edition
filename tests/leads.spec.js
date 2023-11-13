// @ts-check
const { test, expect } = require('@playwright/test');

test('Deve cadastrar um lead na fila de espera', async ({ page }) => {
  await page.goto('http://localhost:3000');

  await page.getByRole('button', { name: /Aperte o play/ }).click();

  await expect(
    page.getByTestId('modal').getByRole('heading')
  ).toHaveText('Fila de espera')

  await page.getByPlaceholder('Seu nome completo').fill('Antonio Maques')
  await page.getByPlaceholder('Seu email principal').fill('antonio.marques.pf@gmail.com')

  await page.getByTestId('modal')
    .getByText('Quero entrar na fila!').click()

  const toastMessage = 'Agradecemos por compartilhar seus dados conosco. Em breve, nossa equipe entrará em contato!'
  await expect(page.locator('.toast')).toHaveText(toastMessage)

  await expect(page.locator('.toast')).toBeHidden({timeout:5000})

});

test('Não deve cadastrar com email incorreto', async ({ page }) => {
  await page.goto('http://localhost:3000');

  await page.getByRole('button', { name: /Aperte o play/ }).click();

  await expect(
    page.getByTestId('modal').getByRole('heading')
  ).toHaveText('Fila de espera')

  await page.getByPlaceholder('Seu nome completo').fill('Antonio Maques')
  await page.getByPlaceholder('Seu email principal').fill('antonio.marques.com.br')

  await page.getByTestId('modal')
    .getByText('Quero entrar na fila!').click()

  await expect(page.locator('.alert')).toHaveText('Email incorreto')

});

