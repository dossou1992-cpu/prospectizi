import { test, expect } from '@playwright/test';

// MATRICE EXHAUSTIVE DE TESTS CROISÉS : Pays x Villes x Métiers x Canaux
const TEST_MATRIX = [
  // 1. Côte d'Ivoire (Abidjan)
  { trade: "Cabinets de conseil", city: "Abidjan", channel: "google_maps", expectedPrefix: "+225", country: "Côte d'Ivoire" },
  { trade: "Développeur web", city: "Abidjan", channel: "linkedin", expectedPrefix: "+225", country: "Côte d'Ivoire" },
  
  // 2. Bénin (Cotonou)
  { trade: "Architectes & BTP", city: "Cotonou", channel: "google_maps", expectedPrefix: "+229", country: "Bénin" },
  { trade: "Community management", city: "Cotonou", channel: "instagram", expectedPrefix: "+229", country: "Bénin" },

  // 3. Sénégal (Dakar)
  { trade: "Agence de marketing digital", city: "Dakar", channel: "facebook", expectedPrefix: "+221", country: "Sénégal" },
  { trade: "SEO & Référencement", city: "Dakar", channel: "linkedin", expectedPrefix: "+221", country: "Sénégal" },

  // 4. Togo (Lomé)
  { trade: "Graphisme & UI UX", city: "Lomé", channel: "instagram", expectedPrefix: "+228", country: "Togo" },
  { trade: "Rédaction web & Copywriting", city: "Lomé", channel: "google_maps", expectedPrefix: "+228", country: "Togo" },

  // 5. Cameroun (Douala)
  { trade: "Cliniques & Santé", city: "Douala", channel: "google_maps", expectedPrefix: "+237", country: "Cameroun" },

  // 6. France (Paris)
  { trade: "Expertise comptable", city: "Paris", channel: "linkedin", expectedPrefix: "+33", country: "France" },
  { trade: "Studio Web & Design", city: "Paris", channel: "google_maps", expectedPrefix: "+33", country: "France" },

  // 7. Belgique (Bruxelles)
  { trade: "Cabinets d'avocats", city: "Bruxelles", channel: "google_maps", expectedPrefix: "+32", country: "Belgique" },
];

test.describe("🤖 ROBOT DE TEST E2E EXHAUSTIF - MODULE DE PROSPECTION PROSPECTIZI", () => {

  test.beforeEach(async ({ page }) => {
    // Injecter bypass Superadmin pour les tests illimités
    await page.addInitScript(() => {
      window.localStorage.setItem('prospectizi_user', JSON.stringify({
        email: 'dossou1992@gmail.com',
        full_name: 'Doris DOSSOU',
        role: 'superadmin',
        isSuperadminMode: true,
      }));
    });
  });

  for (const tc of TEST_MATRIX) {
    test(`[${tc.channel.toUpperCase()}] ${tc.trade} à ${tc.city} (${tc.country}) - Données Réelles & Liens Directs`, async ({ page }) => {
      // 1. Accéder au formulaire de prospection
      await page.goto('/prospects', { waitUntil: 'domcontentloaded' });

      // Attendre la fin de l'hydratation React
      await page.waitForTimeout(400);

      const keywordInput = page.locator('input[placeholder*="Architecte"], input[placeholder*="secteur"]');
      const locationInput = page.locator('input[placeholder*="Abidjan"], input[placeholder*="Ville"]');
      const channelSelect = page.locator('select').filter({ hasText: /Google Maps|Instagram|LinkedIn|Facebook/i }).first();
      const searchButton = page.locator('button[type="submit"]').filter({ hasText: /Rechercher/i });

      await expect(keywordInput).toBeVisible({ timeout: 15000 });
      await expect(locationInput).toBeVisible();

      // 2. Remplir le formulaire avec la combinaison croisée
      await keywordInput.fill('');
      await keywordInput.fill(tc.trade);
      await locationInput.fill('');
      await locationInput.fill(tc.city);
      await channelSelect.selectOption(tc.channel);

      // 3. Préparer l'interception de la réponse API backend en temps réel
      const responsePromise = page.waitForResponse(
        (response) => response.url().includes('/api/prospects/search-live') && response.request().method() === 'POST',
        { timeout: 35000 }
      );

      // 4. Déclencher la recherche
      await searchButton.click();

      // 5. Intercepter et valider la réponse backend
      const response = await responsePromise;
      expect(response.status()).toBe(200);

      const json = await response.json();
      expect(json.success).toBe(true);
      expect(json.count).toBeGreaterThan(0);
      expect(Array.isArray(json.prospects)).toBe(true);
      expect(json.prospects.length).toBeGreaterThanOrEqual(1);

      // 6. Contrôles stricts sur la structure des données générées en temps réel
      const seenNames = new Set<string>();

      for (const prospect of json.prospects) {
        // A. Vérifier le nom unique et non récursif
        expect(prospect.company_name).toBeTruthy();
        expect(prospect.company_name.length).toBeGreaterThan(3);
        expect(seenNames.has(prospect.company_name.toLowerCase())).toBe(false);
        seenNames.add(prospect.company_name.toLowerCase());

        // B. Vérifier la ville et le pays
        expect(prospect.city.toLowerCase()).toContain(tc.city.toLowerCase());

        // C. Vérifier le format international du téléphone (+225, +229, etc.)
        if (prospect.phone) {
          expect(prospect.phone.length).toBeGreaterThan(6);
          expect(prospect.phone.startsWith('+')).toBe(true);
        }

        // D. Vérifier l'activité / métier
        expect(prospect.activity.toLowerCase()).toContain(tc.trade.toLowerCase().split(' ')[0]);

        // E. VÉRIFICATION STRICTE DES LIENS SOCIAUX : 0 PAGE DE RECHERCHE GÉNÉRIQUE !
        const social = prospect.social_links;
        expect(social).toBeDefined();

        for (const [net, url] of Object.entries(social)) {
          const urlStr = String(url);
          // Aucun lien ne doit pointer vers une page de recherche
          expect(urlStr).not.toContain('/search');
          expect(urlStr).not.toContain('?query=');
          expect(urlStr).not.toContain('?api=1');
          expect(urlStr).not.toContain('/explore/tags/');
          expect(urlStr).not.toBe('https://instagram.com');
          expect(urlStr).not.toBe('https://www.instagram.com');
          expect(urlStr).not.toBe('https://www.instagram.com/');

          // Liens directs spécifiques
          if (net === 'google_maps') {
            expect(urlStr).toContain('/maps/place/');
          }
          if (net === 'instagram') {
            expect(urlStr).toMatch(/^https:\/\/(www\.)?instagram\.com\/[a-zA-Z0-9._-]+\/?$/);
          }
          if (net === 'linkedin') {
            expect(urlStr).toContain('linkedin.com/company/');
          }
          if (net === 'facebook') {
            expect(urlStr).toMatch(/^https:\/\/(www\.)?facebook\.com\/[a-zA-Z0-9._-]+\/?$/);
          }
        }
      }

      // 7. Vérifier le rendu dans le DOM (fiches prospects affichées et interactives)
      const firstCard = page.locator('h3').filter({ hasText: json.prospects[0].company_name });
      await expect(firstCard).toBeVisible({ timeout: 10000 });

      // 8. Vérifier la présence du bouton de lien direct dans l'interface
      const directBadge = page.locator('a[title*="Ouvrir la fiche source"]').first();
      if (await directBadge.count() > 0) {
        const href = await directBadge.getAttribute('href');
        expect(href).not.toContain('/search');
      }
    });
  }

  test("Vérification de la persistance LocalStorage et survie au rechargement de page", async ({ page }) => {
    await page.goto('/prospects', { waitUntil: 'domcontentloaded' });

    // Saisie de filtres
    const keywordInput = page.locator('input[placeholder*="Architecte"], input[placeholder*="secteur"]');
    const locationInput = page.locator('input[placeholder*="Abidjan"], input[placeholder*="Ville"]');

    await keywordInput.fill("Cabinets d'avocats internationaux");
    await locationInput.fill("Abidjan");

    // Déclencher une recherche
    const searchButton = page.locator('button[type="submit"]').filter({ hasText: /Rechercher/i });
    await searchButton.click();
    await page.waitForTimeout(3000);

    // Recharger la page (F5)
    await page.reload({ waitUntil: 'domcontentloaded' });

    // Contrôler que l'état LocalStorage a bien restauré les valeurs sans réinitialisation
    await expect(keywordInput).toHaveValue("Cabinets d'avocats internationaux");
    await expect(locationInput).toHaveValue("Abidjan");
  });

});
