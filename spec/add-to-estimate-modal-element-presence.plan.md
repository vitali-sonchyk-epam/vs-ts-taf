# Add to This Estimate Modal - Element Presence Test Plan

## Application Overview

The Google Cloud Pricing Calculator (https://cloud.google.com/products/calculator) displays a modal dialog titled "Add to this estimate" when the user clicks the "Add to estimate" button on the calculator page. This modal allows the user to browse and search for Google Cloud products/services to add to their cost estimate. The modal contains a header with a title and close button, a search field, a sort control, and a scrollable grid of product cards, each with a heading, description, and "Add item" button. When a search yields no results, an empty state is shown instead of the product grid. This test plan focuses exclusively on verifying the presence and correct rendering of UI elements within this modal (not on functional behavior such as actual cost calculations).

## Test Scenarios

### 1. Add to Estimate Modal - Element Presence

**Seed:** `src/tests/seed.spec.ts`

#### 1.1. Modal opens and displays core structural elements

**File:** `src/tests/addToEstimateModal.tests.ts`

**Steps:**
  1. Navigate to the Google Cloud Pricing Calculator page (https://cloud.google.com/products/calculator). Accept the cookie consent banner if it is shown.
    - expect: The calculator page loads successfully
    - expect: The 'Add to estimate' button is visible on the page
  2. Click the 'Add to estimate' button.
    - expect: A modal dialog with role='dialog' and aria-label='Add to this estimate' becomes visible
    - expect: The modal is rendered as an overlay on top of the calculator page
  3. Inspect the modal header area.
    - expect: A 'Close dialog' (X) button is present and visible in the top area of the modal
    - expect: A heading with text 'Add to this estimate' (heading level 3) is present and visible
  4. Inspect the toolbar area directly below the heading.
    - expect: A search icon is present next to the search field
    - expect: A textbox with accessible name 'Search by product name' is present, visible, and empty by default
    - expect: A 'Sort by' button/dropdown control is present and visible, displaying default label 'Sort by most popular' with a dropdown arrow icon
  5. Inspect the main content area of the modal below the toolbar.
    - expect: A scrollable grid/list of product cards is present
    - expect: Each product card is rendered as a clickable button element
    - expect: The first product card corresponds to a known product (e.g., 'Gemini Enterprise') as the default/most-popular sort order
    - expect: Multiple product cards are visible without needing to scroll (e.g., Gemini Enterprise, Compute Engine, Cloud Storage, Cloud SQL, BigQuery, etc.)

#### 1.2. Close dialog control presence and modal dismissal

**File:** `src/tests/addToEstimateModal.tests.ts`

**Steps:**
  1. Open the calculator page and click the 'Add to estimate' button to display the modal.
    - expect: The 'Add to this estimate' modal is visible
    - expect: The 'Close dialog' button is present and visible, and shows a tooltip with text 'Close dialog' on hover
  2. Click the 'Close dialog' button.
    - expect: The modal dialog with aria-label='Add to this estimate' is no longer visible (hidden/removed from the accessibility tree)
    - expect: The underlying calculator page (with the 'Add to estimate' button) remains visible and interactive
