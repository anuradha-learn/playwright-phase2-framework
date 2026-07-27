# Product Review Spec

## Application Overview

The Product Review feature is available on individual product pages at https://qa-cart.com/product/assorted-coffee/. A logged-in user can navigate to the Reviews tab, select a star rating (1–5), enter review text, and submit the form. The rating field ("Your rating *") and review text field ("Your review *") are both marked required. After a successful submission the review appears in the list with an "Your review is awaiting approval" notice.

## Test Scenarios

### 1. Product Review

**Seed:** `tests/seeds/product-review.seed.spec.ts`

#### 1.1. Happy Path – Submit a valid product review

**File:** `tests/product-review/happy-path.spec.ts`

**Steps:**
  1. Objective: Verify that a logged-in user can successfully submit a product review with a valid star rating and review text.
  2. Preconditions: User is logged in (loggedInPage fixture). Navigate to https://qa-cart.com/product/assorted-coffee/ and confirm the 'Assorted Coffee' heading is visible.
    - expect: The 'Assorted Coffee' product page is loaded and the heading is visible.
  3. Click the 'Reviews (0)' tab to open the review panel.
    - expect: The Reviews tab panel becomes active and the 'Add a review' section with rating radios and review textarea is visible.
  4. Select the '5 of 5 stars' radio button in the 'Your rating *' group.
    - expect: The 5-star radio button is selected.
  5. Click inside the 'Your review *' textarea and type a non-empty review, e.g. 'Great coffee and excellent packaging.'
    - expect: The textarea contains the entered review text.
  6. Click the 'Submit' button.
    - expect: The form is submitted without any validation errors.
    - expect: The review appears in the reviews list with the message 'Your review is awaiting approval'.
    - expect: The submitted star rating and review text are visible in the newly added list item.

#### 1.2. Rating Required – Submit without selecting a star rating

**File:** `tests/product-review/rating-required.spec.ts`

**Steps:**
  1. Objective: Verify that the form prevents submission and shows a validation error when no star rating is selected.
  2. Preconditions: User is logged in (loggedInPage fixture). Navigate to https://qa-cart.com/product/assorted-coffee/ and confirm the 'Assorted Coffee' heading is visible.
    - expect: The 'Assorted Coffee' product page is loaded.
  3. Click the 'Reviews (0)' tab to open the review panel.
    - expect: The 'Add a review' section is visible.
  4. Leave the 'Your rating *' radio group with no option selected.
    - expect: No star radio button is selected.
  5. Click inside the 'Your review *' textarea and type a non-empty review, e.g. 'This product is good.'
    - expect: The textarea contains the entered review text.
  6. Click the 'Submit' button.
    - expect: The form is NOT submitted.
    - expect: A validation error is displayed indicating that the rating field is required (e.g. 'Please select a star rating.').
    - expect: No new review entry appears in the reviews list.
    - expect: The review textarea retains its entered text.

#### 1.3. Review Required – Submit without entering review text

**File:** `tests/product-review/review-required.spec.ts`

**Steps:**
  1. Objective: Verify that the form prevents submission and shows a validation error when the review text field is left empty.
  2. Preconditions: User is logged in (loggedInPage fixture). Navigate to https://qa-cart.com/product/assorted-coffee/ and confirm the 'Assorted Coffee' heading is visible.
    - expect: The 'Assorted Coffee' product page is loaded.
  3. Click the 'Reviews (0)' tab to open the review panel.
    - expect: The 'Add a review' section is visible.
  4. Select the '4 of 5 stars' radio button in the 'Your rating *' group.
    - expect: The 4-star radio button is selected.
  5. Leave the 'Your review *' textarea empty (do not type anything).
    - expect: The textarea remains empty.
  6. Click the 'Submit' button.
    - expect: The form is NOT submitted.
    - expect: A validation error is displayed indicating that the review text field is required (e.g. 'Please enter your review.').
    - expect: No new review entry appears in the reviews list.
    - expect: The selected star rating is retained.
