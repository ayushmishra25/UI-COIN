# Casino Coin → Currency Migration — UI Agent Prompt

Use this prompt with an AI agent to make UI changes for testing against the migrated AccountAPI and PaymentAPI.

---

## Context

We are migrating a casino platform from a dual-coin system (Gold Coins / Saga Coins) to a single real-currency balance system. The backend migration is complete:

- **AccountAPI** (port 5050): Fully migrated. The `account` table now has a single `balance` column. Old columns (`gc_balance`, `sc_main`, `sc_credit`, `gc_main`, `bonus_balance`, `skrill_balance`, `multplier`) are DROPPED.
- **PaymentAPI** (port 5001): Compiles. Config fixes needed (see below). Variable naming still uses coin terminology but is functional.
- **Database** (`BettorDoneDB` on MySQL localhost:3306):
  - `account` table: Only `balance` column remains (all coin columns dropped)
  - `casino_coin_package` table: `goldcoins` renamed to `bonus_amount`, `sagacoins` renamed to `package_amount`
  - `casino_skrill_trans` table: `goldcoins` renamed to `bonus_deposit`, `sagacoins` renamed to `deposit_amount`

---

## YOUR TASK

Make the minimum changes across ALL THREE repos so the UI can start, connect to both APIs, and display data correctly. Do NOT do cosmetic renaming (variable names, labels, images) unless it causes a functional break.

---

## REPO 1: AccountAPI (`casinoCoinAccountAPI`)

### Fix: Add missing fields to CasinoCoinPackageDto + RowMapper

**File: `src/main/java/com/web/models/CasinoCoinPackageDto.java`**
Add these two fields (anywhere among the other private fields):
```java
private Double bonus_amount;
private Double package_amount;
```
(Lombok `@Getter/@Setter` will auto-generate getters/setters)

**File: `src/main/java/com/web/dao/rowmapper/CasinoCoinPackageRowMapper.java`**
Add these two lines after the existing `coinPackageDto.setEmailPackage(...)` line:
```java
coinPackageDto.setBonus_amount(row.getDouble("bonus_amount"));
coinPackageDto.setPackage_amount(row.getDouble("package_amount"));
```

**Verify**: Run `mvn clean compile` — must say BUILD SUCCESS.

---

## REPO 2: PaymentAPI (`casinoCoinPaymentAPI`)

### Fix 1: Database URL
**File: `src/main/resources/application.properties` line 9**
Change `casino` to `BettorDoneDB`:
```
db.url= jdbc:mysql://127.0.0.1:3306/BettorDoneDB?zeroDateTimeBehavior=convertToNull&useSSL=false&allowPublicKeyRetrieval=true
```

### Fix 2: Disable SSL
**File: `src/main/resources/application.properties` lines 92-95**
Comment out ALL SSL lines:
```properties
#server.ssl.key-store: file:keystoreStage.p12
#server.ssl.key-store-password: IBvhwork1cylon
#server.ssl.keyStoreType: PKCS12
#server.ssl.enabled=true
```

**Verify**: Run `mvn clean compile` — must say BUILD SUCCESS.

---

## REPO 3: UI (`casinoCoinUI-main`)

### Prerequisites
```bash
npm install
```

### Fix: Replace all non-existent API field references

The backend AccountDTO now returns this structure for the account object:
```json
{
  "idAccount": 1,
  "number": "...",
  "type": 1,
  "status": 1,
  "userId": 123,
  "ubalance": 100.50,
  "balance": "100.50",
  "self_exclude": false,
  "ach_Id": 0,
  "access_token": "...",
  "kyc_access_token": "..."
}
```

The backend CasinoCoinPackageDto now returns (after fix above):
```json
{
  "id": 1,
  "package_name": "...",
  "bonus_amount": 50000.0,
  "package_amount": 10.0,
  "purchase_price": "9.99",
  ...
}
```

### Required field replacements:

#### A. Balance Display: `gc_balance` → `ubalance`
Replace ALL occurrences of `account.gc_balance` or `account?.gc_balance` with `account.ubalance` or `account?.ubalance`.

**Files (with line numbers)**:
- `src/ProtectedLayout.js` — lines 470, 471, 621, 622
- `src/ProtectedLayoutold.js` — lines 361, 362, 468, 469
- `src/component/NavBar/index.js` — lines 254, 255
- `src/screens/Redeem/index.js` — line 402
- `src/screens/GameModal/index.js` — line 59
- `src/screens/TestGameModal/index.js` — lines 57, 124

#### B. Balance Display: `sc_main` → `ubalance`
Replace ALL occurrences of `account.sc_main` or `account?.sc_main` with `account.ubalance` or `account?.ubalance`.
Also replace `loginData?.sc_main` with `loginData?.account?.ubalance`.

**Files (with line numbers)**:
- `src/ProtectedLayout.js` — lines 498, 514, 515, 555, 640
- `src/ProtectedLayoutold.js` — lines 378, 394, 395, 434, 487
- `src/screens/CoinTransferInfo/index.js` — line 48
- `src/screens/GameModal/index.js` — lines 66, 180
- `src/screens/TestGameModal/index.js` — lines 65, 132, 236
- `src/screens/GiftCard/index.js` — lines 323, 326, 402, 403, 418
- `src/screens/Redeem/index.js` — lines 409, 410, 468, 469, 518, 519, 573, 574, 623, 624
- `src/screens/Redeem/CashModal.js` — lines 51, 52, 224
- `src/screens/Redeem/CryptoModal.js` — lines 53, 54, 218
- `src/screens/Redeem/CardModal.js` — lines 61, 62, 251

#### C. Package Fields: `goldcoins` → `bonus_amount`
Replace ALL occurrences of `.goldcoins` with `.bonus_amount` in package item rendering and API request bodies.

**Files**:
- `src/screens/BuyCoins/BuyCoinsNew.js` — lines 409, 731, 895
- `src/screens/BuyCoins/index-new.js` — lines 179, 289, 425
- `src/screens/BuyCoins/index.js` — lines 197, 415, 595, 760, 857
- `src/screens/BuyCoins/PaymentButton.js` — lines 94, 322
- `src/screens/BuyCoins/EamilPacakage.js` — line 254
- `src/screens/Home/QuickbuyPackage.js` — lines 166, 381, 459, 611
- `src/screens/PurchaseHistory/index.js` — line 208

#### D. Package Fields: `sagacoins` → `package_amount`
Replace ALL occurrences of `.sagacoins` with `.package_amount` in package item rendering and API request bodies.

**Files**:
- `src/screens/BuyCoins/BuyCoinsNew.js` — lines 390, 717, 881
- `src/screens/BuyCoins/index-new.js` — lines 207, 336, 471
- `src/screens/BuyCoins/index.js` — lines 198, 416, 621, 770, 868
- `src/screens/BuyCoins/PaymentButton.js` — lines 95, 323
- `src/screens/BuyCoins/EamilPacakage.js` — line 255
- `src/screens/Home/QuickbuyPackage.js` — lines 167, 382, 485, 633
- `src/screens/PurchaseHistory/index.js` — line 213

### Important Notes for UI Changes:

1. **`account.gc_balance` and `account.sc_main` are BOTH just `account.ubalance` now** — there's only one balance. The old system had separate "Gold Coin" and "Saga Coin" balances; now there's just one real-money balance.

2. **For `.toFixed(2)` calls**: `ubalance` is a Double (number), so `.toFixed(2)` works. But `balance` is a String, so don't call `.toFixed(2)` on it.

3. **For `parseInt()` calls**: `ubalance` is already a number, so `parseInt()` works fine on it.

4. **PaymentButton.js sends purchase data to PaymentAPI**: The request body fields `goldcoins` and `sagacoins` must match what PaymentAPI expects. Check PaymentAPI's controller parameter names — they may still expect `goldcoins`/`sagacoins` in the request body. If so, KEEP the old names in the request but read from the new DTO fields:
   ```javascript
   // In PaymentButton.js request body:
   goldcoins: selectedPackage?.bonus_amount,    // send as 'goldcoins' but read from bonus_amount
   sagacoins: selectedPackage?.package_amount,  // send as 'sagacoins' but read from package_amount
   ```

5. **Helper function `sumSC_credit_SC_Main`** in `src/Utility/functions/Helper.js` line 487 — this function takes two params and adds them. Since there's only one balance now, this function may be unused. Check callers before removing.

6. **`ProtectedLayoutold.js`** — appears to be an old/backup layout file. Fix it for completeness but it may not be actively used.

---

## Verification Steps

After all changes:

1. **AccountAPI**: `cd casinoCoinAccountAPI && mvn clean compile` → BUILD SUCCESS
2. **PaymentAPI**: `cd casinoCoinPaymentAPI && mvn clean compile` → BUILD SUCCESS
3. **UI**: `cd casinoCoinUI-main && npm start` → Compiles without errors
4. **Start all three** + MySQL, open `http://localhost:3000`
5. **Test**:
   - Login → Balance should show in header (not `undefined`)
   - Navigate to Buy Coins → Packages should show amounts (not blank)
   - Navigate to Redeem → Balance should display correctly
   - Open a game → Should check balance before launching

---

## File Paths

- AccountAPI: `/Users/nischaykumar/Code/Project/Nevton/casinoCoin/casinoCoinAccountAPI/`
- PaymentAPI: `/Users/nischaykumar/Code/Project/Nevton/casinoCoin/casinoCoinPaymentAPI/`
- UI: `/Users/nischaykumar/Code/Project/Nevton/casinoCoin/casinoCoinUI-main/`
- Database: MySQL localhost:3306, database `BettorDoneDB`, user `root`, no password

---

## What NOT To Do

- Do NOT rename PaymentAPI Java variables/methods (170+ coin refs) — this is cosmetic and can break things
- Do NOT change i18n translation files yet — cosmetic
- Do NOT change coin image files — cosmetic
- Do NOT rename UI components/folders (e.g., `BuyCoins/`) — cosmetic
- Do NOT touch display labels like "Gold Coins", "SC", "GC" for now — cosmetic
- Do NOT modify any SQL queries — they are already migrated
- Do NOT change the `multplier` column/field name — it exists as-is in the DB
