import 'dotenv/config';
import { test, expect } from '../../fixtures/testFixture';
import { Tags } from '../../constants/Tags';
import { AddToEstimateModalText } from '../../constants/AddToEstimateModalText';

test.describe('Add to Estimate Modal - Element Presence', () => {
  test.beforeEach(async ({ addToEstimateModalSteps }) => {
    await addToEstimateModalSteps.open();
  });

  test(
    '1.1. Modal opens and displays core structural elements',
    { tag: Tags.Smoke },
    async ({ addToEstimateModalSteps }) => {
      // 1. Navigate to the Google Cloud Pricing Calculator page and accept the cookie consent banner if it is shown.
      expect(await addToEstimateModalSteps.isAddToEstimateButtonVisible()).toBe(true);

      // 2. Click the 'Add to estimate' button.
      await addToEstimateModalSteps.openModal();
      expect(await addToEstimateModalSteps.isModalVisible()).toBe(true);

      // 3. Inspect the modal header area.
      expect(await addToEstimateModalSteps.isCloseButtonVisible()).toBe(true);
      expect(await addToEstimateModalSteps.isHeadingVisible()).toBe(true);
      expect(await addToEstimateModalSteps.getHeadingText()).toBe(AddToEstimateModalText.Heading);

      // 4. Inspect the toolbar area directly below the heading.
      expect(await addToEstimateModalSteps.isSearchIconVisible()).toBe(true);
      expect(await addToEstimateModalSteps.isSearchInputVisible()).toBe(true);
      expect(await addToEstimateModalSteps.getSearchInputValue()).toBe('');
      expect(await addToEstimateModalSteps.isSortControlVisible()).toBe(true);
      expect(await addToEstimateModalSteps.getSortControlText()).toContain(
        AddToEstimateModalText.DefaultSortLabel,
      );

      // 5. Inspect the main content area of the modal below the toolbar.
      const productCardCount = await addToEstimateModalSteps.getProductCardCount();
      expect(productCardCount).toBeGreaterThan(1);
      expect(await addToEstimateModalSteps.isFirstProductCardButtonRole()).toBe(true);
      expect(await addToEstimateModalSteps.getFirstProductCardName()).toBe(
        AddToEstimateModalText.FirstProductCard,
      );

      const visibleCardNames = await addToEstimateModalSteps.getProductCardNames(
        AddToEstimateModalText.VisibleProductCardsWithoutScrolling.length,
      );
      expect(visibleCardNames).toEqual(AddToEstimateModalText.VisibleProductCardsWithoutScrolling);
    },
  );

  test(
    '1.2. Close dialog control presence and modal dismissal',
    { tag: Tags.Smoke },
    async ({ addToEstimateModalSteps }) => {
      // 1. Open the calculator page and click the 'Add to estimate' button to display the modal.
      await addToEstimateModalSteps.openModal();
      expect(await addToEstimateModalSteps.isModalVisible()).toBe(true);
      expect(await addToEstimateModalSteps.isCloseButtonVisible()).toBe(true);
      expect(await addToEstimateModalSteps.getCloseButtonTooltipText()).toBe(
        AddToEstimateModalText.CloseButtonTooltip,
      );

      // 2. Click the 'Close dialog' button.
      await addToEstimateModalSteps.closeModal();
      await expect.poll(() => addToEstimateModalSteps.isModalVisible()).toBe(false);
      expect(await addToEstimateModalSteps.isAddToEstimateButtonVisible()).toBe(true);
    },
  );
});
