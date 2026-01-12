# Manual Test Cases

Manual tests for Funda website smoke testing.

---

## Homepage Tests

### Test 1: Homepage loads and shows main elements
1. Open https://www.funda.nl/
2. Check that logo is visible
3. Check that search box is visible
4. Check that you can click in the search box
5. Check page title says "Funda"

### Test 2: Homepage has description
1. Open https://www.funda.nl/
2. Right-click page and "View Page Source"
3. Search for "meta name=\"description\""
4. Check that description exists and has text

---

## Search Tests

### Test 3: Search for Amsterdam
1. Open https://www.funda.nl/
2. Click in search box
3. Type "Amsterdam"
4. Select Amsterdam from dropdown or press Enter
5. Check that URL has `/zoeken/koop/`
6. Check that property cards are shown

### Test 4: Search multiple cities
1. Open https://www.funda.nl/
2. Search for "Rotterdam" and check results show
3. Go back to homepage
4. Search for "Utrecht" and check results show
5. Go back to homepage
6. Search for "Eindhoven" and check results show

### Test 5: Property cards show info
1. Open https://www.funda.nl/
2. Search for "Eindhoven"
3. Check that first property card is visible
4. Check that it shows an image
5. Check that it shows property info (address, price, etc.)

---

## Property Listing Tests

### Test 6: Multiple properties display
1. Open https://www.funda.nl/
2. Search for "Rotterdam"
3. Count property cards on page
4. Check that at least 5 properties are shown

### Test 7: URL contains city name
1. Open https://www.funda.nl/
2. Search for "Groningen"
3. Check URL in address bar
4. Verify URL contains "groningen"

### Test 8: Works on different screen sizes
1. Open https://www.funda.nl/ on desktop (full screen)
2. Search for "Haarlem"
3. Check properties display properly
4. Resize browser to mobile size (narrow)
5. Reload page
6. Check properties still display properly

---

## Property Detail Tests

### Test 9: Property detail page opens
1. Open https://www.funda.nl/
2. Search for "Amsterdam"
3. Click on first property card
4. Check that property detail page loads
5. Check that address is shown

### Test 10: Property shows all info
1. Open https://www.funda.nl/
2. Search for "Utrecht"
3. Click first property
4. Check address is shown
5. Check price is shown
6. Check main image is shown

### Test 11: Property images display
1. Open https://www.funda.nl/
2. Search for "Den Haag"
3. Click first property
4. Check that property photos are visible
5. Check that main image loads properly

### Test 12: Back button works
1. Open https://www.funda.nl/
2. Search for "Leiden"
3. Click first property
4. Click browser back button
5. Check that you're back on search results page
6. Check that properties are still shown

---

## End-to-End Tests

### Test 13: Complete user journey
1. Open https://www.funda.nl/
2. Check logo is visible
3. Search for "Amsterdam"
4. Check properties are shown
5. Click first property
6. Check address is shown
7. Check price is shown

### Test 14: Browse multiple properties
1. Open https://www.funda.nl/
2. Search for "Rotterdam"
3. Click first property
4. Remember the address
5. Click back button
6. Click second property
7. Check that address is different from first property

### Test 15: Multiple searches work
1. Open https://www.funda.nl/
2. Search for "Utrecht"
3. Check results show
4. Go back to homepage
5. Search for "Eindhoven"
6. Check results show
7. Make sure results are different

---

## Test Summary

**Total Tests**: 15
- Homepage: 2 tests
- Search: 3 tests
- Listings: 3 tests
- Details: 4 tests
- End-to-End: 3 tests

**Time to run all manually**: ~20-25 minutes

---

## Notes

- Test on Chrome browser
- Use https://www.funda.nl/ as starting point
- If a test fails, write down what went wrong
- Tests should work on both desktop and mobile
