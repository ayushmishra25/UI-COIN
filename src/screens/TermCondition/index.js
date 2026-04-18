import { React, useEffect } from "react";
import { Helmet } from "react-helmet";
import { useTranslation } from "react-i18next";

const TermCondition = () => {
  const { t } = useTranslation();
  return (
    <div>
      <Helmet>
        <title>{t('termsConditions.pageTitle')}</title>
        <meta name="description" content={t('termsConditions.metaDescription')} />
        <link rel="canonical" href="https://coin.spinsagacasino.com/terms-conditions/" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="SpinSaga Casino" />
        <meta property="og:url" content="https://coin.spinsagacasino.com/terms-conditions/" />
        <meta property="og:title" content={t('termsConditions.pageTitle')} />
        <meta property="og:description" content={t('termsConditions.metaDescription')} />
        <meta property="og:image" content="https://coin.spinsagacasino.com/512x512.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={t('termsConditions.pageTitle')} />
        <meta name="twitter:description" content={t('termsConditions.metaDescription')} />
        <meta name="twitter:image" content="https://coin.spinsagacasino.com/512x512.png" />
      </Helmet>
      <div
        className="container bg-color-tc space-bottom content-only"
        style={{ marginTop: 80 }}
      >
        <div className="inner-smallspace-rg">
          <div className="row">
            <div className="col-md-12">
              <div className="content-page-design" style={{ padding: "20px" }}>
                <h2>SpinSaga Terms and Conditions</h2>
                <p>
                  These Terms and Conditions form a binding legal agreement
                  between you and SpinSaga Inc. (us, we, Sponsor, Promotor) and
                  apply to your use of our platform, our Games, or any services
                  and features provided through any electronic device (web,
                  mobile, tablet, or any other device).
                </p>
                <p>
                  PLEASE NOTE: THAT THESE TERMS AND CONDITIONS INCLUDE A
                  PROVISION WAIVING THE RIGHT TO PURSUE ANY CLASS, GROUP, OR
                  REPRESENTATIVE CLAIM AND REQUIRING YOU TO PURSUE PAST,
                  PENDING, AND FUTURE DISPUTES BETWEEN YOU AND US THROUGH
                  INDIVIDUAL ARBITRATION UNLESS YOU OPT OUT WITHIN THE SPECIFIED
                  TIME FRAME.
                </p>
                <p>
                  You must read these Terms and Conditions carefully in their
                  entirety before confirming your acceptance by checking the box
                  at signup. By checking the box for acceptance during the
                  signup process, or by accessing the platform via logging into
                  your account, accessing any Games, or creating a Customer
                  Account, you confirm that you have read and agree to be bound
                  by these Terms and Conditions, which include and are directly
                  linked to our Privacy Policy, Responsible Gaming Policy,
                  Sweepstakes Rules, Customer Acceptance Policy, and other
                  game-specific or promotion-specific terms relevant to your
                  Participation. If you do not agree with any of these Terms and
                  Conditions in part or in full or any other linked policy,
                  rules, or terms you may not install any provided apps, use the
                  Platform, access any service or features, or play any Game
                  provided by SpinSaga.
                </p>
                <p>
                  THE GAMES AND PLATFORM DO NOT OFFER REAL MONEY GAMBLING, AND
                  NO ACTUAL MONEY IS REQUIRED TO PLAY. ONLY PLAYERS IN THE
                  UNITED STATES (EXCLUDING THE STATES OF CONNECTICUT, DELAWARE,
                  IDAHO, KENTUCKY, LOUISIANA, MICHIGAN, MARYLAND, MISSISSIPPI,
                  NEW YORK, PENNSYLVANIA, MONTANA, NEBRASKA, NEVADA, NORTH
                  DAKOTA AND WASHINGTON D.C.) ARE PERMITTED TO ACCESS SPINSAGA.
                </p>
                <p>
                  You may request redemption of any prizes by selecting the
                  “Redeem” button within the platform. You can redeem prizes for
                  gifts or gift cards, such prizes will be allocated to the
                  email address registered against your Customer Account or the
                  residential address listed on your account, and if this is not
                  technically or physically possible, then to an alternative
                  address you have designated.
                </p>

                <h3>1. All Purchases Are Final</h3>
                <p>
                All purchases of Bonus Cash, packages, promotional bundles, and any 
                optional digital items offered on the Platform are final, non-refundable, 
                and non-returnable. By completing a purchase, you acknowledge and agree 
                that you will not be entitled to a refund under any circumstances, except 
                where required by applicable law.
                </p>

                <h3>2. Requirement to Contact Support Before Any Dispute</h3>
                <p>
                If you believe a transaction was made in error, unauthorized, or incorrectly processed, you agree to contact SpinSaga Support at [support email] before initiating a chargeback or dispute with your bank or payment provider.
                We will make reasonable efforts to investigate and resolve the matter promptly.
                </p>

                <h3>3. Unwarranted Chargebacks Are a Breach of These Terms</h3>
                <p>
                Initiating a chargeback or payment dispute without valid cause—including but not limited to instances where you have:
                </p>
                <ul>
                
                  <li>Used the purchased Bonus Cash</li>

                   <li>Redeemed Sweeps Coins,</li>

<li>Played games using the credited balance, or</li>

<li>Otherwise benefited from the transaction, constitutes a violation of these Terms and may be considered fraudulent behavior.</li>
</ul>

 <h3>4. Consequences of Invalid or Fraudulent Chargebacks</h3>
<p>If an invalid or fraudulent chargeback is filed, SpinSaga may take one or more of the following actions:</p>

<ul>
<li>Suspend or permanently close your account;</li>
<li>Void any winnings, rewards, or Sweeps Coin redemptions associated with the disputed transaction;</li>
<li>Recover outstanding balances owed to SpinSaga;</li>
<li>Restrict your ability to make future purchases;</li>
<li>Report the incident to payment processors, relevant authorities, or risk-management databases.</li>
</ul>
     
     <h3>5. Evidence Provided in Chargeback Investigations</h3>
<p>In the event of a chargeback, SpinSaga reserves the right to provide supporting evidence to the payment processor or bank, which may include:</p>

<ul>
<li>Login history and device/IP records</li>
<li>Gameplay and redemption activity</li>
<li>Purchase receipts and timestamps</li>
<li>Communication logs</li>
<li>Internal fraud-detection flags</li>
</ul>

<p>This information may be used to demonstrate that the transaction was authorized and that the digital goods or services were delivered and consumed.</p>

<h3>6. No Purchase Necessary & Sweepstakes Compliance</h3>
<p>This Chargeback Policy does not alter or limit the availability of any legally required Free Method of Entry (FMoE) for Sweeps Coins.</p>
<p>Bonus Cash purchases are not required to participate in sweepstakes gameplay.</p>
<p>This Policy applies only to optional paid purchases.</p>

<h3>7. Right to Recover Losses</h3>
<p>SpinSaga reserves the right to recover any amounts lost due to invalid chargebacks, including through:</p>
<ul>
<li>Account offset,</li>
<li>Collection processes,</li>
<li>Legal action where permitted by law.</li>
</ul>

                <h3>Definitions</h3>
                <p>
                  Collective Arbitration means any claim as part of a class,
                  group, collective, coordinated, consolidated, mass, or
                  representative proceeding.
                  <br />
                </p>
                <p></p>
                Content means text, graphics, user interfaces, visual
                interfaces, photographs, trademarks, logos, sounds, music,
                artwork, computer code, and other material used, displayed or
                available as part of the Games and Platform. Content includes
                Bonus Cash and Real Cash.
                <p>
                  Customer Account means an account held by a Registered
                  Customer.
                  <br />
                </p>
                <p>
                  Excluded Territory means the states of CONNECTICUT, DELAWARE,
                  IDAHO, KENTUCKY, LOUISIANA, MICHIGAN, MARYLAND, MISSISSIPPI,
                  NEW YORK, PENNSYLVANIA, MONTANA, NEBRASKA, NEVADA, NORTH
                  DAKOTA AND WASHINGTON D.C, in the United States, as well as
                  any outlying U.S. territories or possessions and any other
                  jurisdiction outside of the United States.
                  <br />
                </p>
                <p>
                  Fraudulent Conduct means any of the conduct described in
                  document
                  <br />
                </p>
                <p>
                  Game means any single or multiple Games available on the
                  Platform in either Regular Play or Promotional Play. We
                  reserve the right to add and/or remove Games from the Platform
                  or limit availability in certain jurisdictions at our sole
                  discretion and for any reason.
                  <br />
                </p>
                <p>
                  Bonus Cash means the virtual social playable token which
                  enables you to play the Regular Play Games. Bonus Cash have no
                  monetary value and cannot be redeemed for prizes or anything
                  of any value.
                  <br />
                </p>
                <p>
                  Inactive Account means a Customer Account which has not been
                  accessed, logged into, or recorded any activity for a period
                  of 12 consecutive months or more.
                  <br />
                </p>
                <p>
                  Merchandise means any physical goods provided to you by
                  SpinSaga as a reward or as a competition or tournament prize.
                  <br />
                </p>
                <p>
                  Participate means playing any Games or using our Platform in
                  any manner whatsoever, including any of the conduct described
                  in clause 3.
                </p>
                <p>
                  Payment Administration Agent means the service provided
                  through any related body corporate, affiliate, or third party
                  we appoint to act as our agent, including but not limited to
                  SpinSaga Inc.
                </p>
                <p>
                  <strong>
                    Payment Medium means any card, online wallet, financial/bank
                    account, or other payment medium used to purchase Gold
                    Coins.
                  </strong>
                </p>
                <p>
                  Platform means the services provided through any URL or mobile
                  application belonging to, or licensed to, SpinSaga Inc, and
                  branded as part of “SpinSaga”, including the website located
                  at https://www.spinsagacasino.com, and all subdomains,
                  subpages and successor sites thereof, as well as all Games,
                  features, tools, and services available thereon. Player or you
                  means any person who Participates, whether or not a Registered
                  Customer. Player Support provides the player support function
                  referred to in section 39(1) of the Player Protection
                  Directive.
                </p>
                <p>
                  Prizes means prizes won when playing Promotional Play Games
                  which are redeemable for valuable prizes in accordance with
                  the Sweepstakes Rules. Promotional Play means participation in
                  our sweepstakes promotions by playing any games on the
                  Platform with Real Cash.
                </p>
                <p>
                  Registered Customer means a Player who has successfully
                  registered a Customer Account, whether that account is
                  considered active or not.
                </p>
                <p>
                  Regular Play means participating in any game on the Platform
                  played with Bonus Cash. We may give you Bonus Cash free of
                  charge when you sign up an account and thereafter at regular
                  intervals. You may win more Bonus Cash when you play in
                  Regular Play. You cannot win prizes when you Participate in
                  Regular Play. YOU CANNOT PURCHASE SAGA COINS AND SAGA COINS
                  HAVE NO MONETARY VALUE.
                </p>
                <p>
                  Real Cash means sweepstakes entries subject to the
                  Sweepstakes Rules. We may give you Real Cash free of charge
                  when you sign up or as a bonus, you may purchase Bonus Cash on
                  the Platform. You may win more Real Cash when you Participate
                  in Promotional Play.
                </p>
                <p>
                  Sweepstakes Rules means the Sweepstakes Rules available on the
                  Platform. Terms and Conditions means these terms and
                  conditions, as amended from time to time. Third Party means
                  any Website, Platform, or service offered by a third party and
                  not controlled by us.
                </p>
                <p>
                  SPINSAGA INC means SpinSaga Inc. 1677-34 N Franklin Ave, Ste
                  687, Pinedale, WY, 82941.
                </p>
                <h3>Licensing And The Protection Of Funds</h3>
                <p>
                  The online social game known as “SpinSaga” is owned and
                  operated by SpinSaga Inc. All payments are processed by
                  SpinSaga Inc or any Payment Administration Agent it appoints.
                  The sweepstakes promotions and Prizes offered by SpinSaga are
                  operated by SpinSaga Inc.
                </p>
                <p>
                  Funds equal to the aggregate value of Prizes which Registered
                  Customers have chosen to leave unredeemed are held by SpinSaga
                  Inc in accounts separate from its business account. This means
                  that steps have been taken to protect such funds, but that in
                  the event of insolvency there is no absolute guarantee that
                  any Prizes which you have not yet redeemed will be allocated
                  or paid to you.
                </p>
                <h3>Your Participation</h3>
                <p>
                  <strong>Restrictions</strong>
                </p>
                <p>You declare and warrant that:</p>
                <ul>
                  <p>
                    a. you are over 18 years of age or over the minimum legal
                    age required as stipulated in the jurisdiction of your
                    residence and are, under the local laws applicable to you,
                    legally allowed to participate in the Games offered on the
                    Platform;
                  </p>
                  <p>
                    b. WHEN PARTICIPATING IN:
                    <ul>
                      <li>
                        REGULAR PLAY, YOU DO NOT RESIDE IN OR ACCESS THE
                        PLATFORM FROM THE EXCLUDED TERRITORIES; AND
                      </li>
                      <li>
                        PROMOTIONAL PLAY, YOU DO NOT RESIDE IN OR ACCESS THE
                        PLATFORM FROM THE EXCLUDED TERRITORIES (mentioned
                        above);
                      </li>
                    </ul>
                  </p>
                  <p>
                    c. you participate in the Games strictly in your personal
                    capacity for recreational and entertainment purposes only;
                  </p>
                  <p>
                    d. you participate in the Games on your own behalf and not
                    on the behalf of any other person;
                  </p>
                  <p>
                    e. all information that you provide to us during the
                    registration and operation of your account in accordance
                    with these Terms and Conditions is true, complete, and
                    correct, and you will immediately notify us of any change to
                    such information;
                  </p>
                  <p>
                    f. money that you use to purchase Coins is not tainted with
                    any illegality and does not originate from any illegal
                    activity or source, or from ill-gotten means;
                  </p>
                  <p>
                    g. you will not purchase Bonus Cash from a business or
                    corporate account, but only a personal account held in your
                    name;
                  </p>
                  <p>
                    h. you will not be involved in any fraudulent, collusive,
                    fixing or other unlawful activity in relation to your or
                    third parties’ participation in any of the Games and you
                    will not use any software-assisted methods or techniques
                    (including but not limited to bots designed to play
                    automatically) or hardware devices for your participation in
                    any of the Games offered on the Platform. We reserve the
                    right to invalidate any participation in the event of such
                    behaviour;
                  </p>
                  <p>
                    i. in relation to the purchase of Bonus Cash, you must only
                    use a valid Payment Method which lawfully belongs to you;
                    and
                  </p>
                  <p>
                    j. you will not sell or trade for value, or seek to sell or
                    trade for value, or accept as a sale or trade for value, any
                    Merchandise provided to you by SpinSaga.
                  </p>
                </ul>
                <p>
                  It is a Player’s responsibility to ensure that their
                  Participation is lawful in their jurisdiction. Any person who
                  is knowingly in breach of any clause, including any attempt to
                  circumvent this restriction, for example, by using a VPN,
                  proxy or similar service that masks or manipulates the
                  identification of your real location, or by otherwise
                  providing false or misleading information regarding your
                  location or place of residence, or by Participating from an
                  Excluded Territory or through a third party or on behalf of a
                  third party located in an Excluded Territory, is in breach of
                  these Terms and Conditions. You may be committing fraud and
                  may be subject to criminal prosecution.
                </p>
                <o>
                  <li>
                    Each user is allowed to create only one account on the
                    platform.
                  </li>
                  <li>
                    Creating multiple accounts is strictly prohibited and may
                    result in account suspension or termination.
                  </li>
                  <li>
                    Users are responsible for providing accurate and truthful
                    information during the account creation process.
                  </li>
                </o>
                <p>
                  <strong>Eligible Players</strong>
                </p>
                <p>
                  Employees of SpinSaga Inc, any of their respective affiliates,
                  subsidiaries, holding companies, advertising agencies, or any
                  other company or individual involved with the design,
                  production, execution or distribution of the Games and their
                  immediate family (spouse, parents, siblings, and children,
                  whether the relationship is by birth, marriage, or adoption)
                  and household members (people who share the same residence at
                  least 3 months of the year) are not eligible to Participate.
                </p>
                <h3>License</h3>
                <p>
                  Subject to your agreement and continuing compliance with these
                  Terms and Conditions, SpinSaga Inc grants you a personal,
                  non-exclusive, non-transferable, non-sublicensable, revocable,
                  limited license to access and use the Platform and the Content
                  through a supported Web browser or mobile device, solely for
                  your personal use. These Terms and Conditions do not grant you
                  any right, title, or interest in the Platform or Content. You
                  acknowledge and agree that your license to use the Platform is
                  limited by these Terms and Conditions and if you do not agree
                  to, or act in contravention of, these Terms and Conditions,
                  your license to use the Platform (including the Games and
                  Content) may be immediately terminated.
                </p>
                <p>
                  Where the Platform or any Game is deemed to be illegal under
                  the laws of the jurisdiction in which you reside or are
                  situated, you will not be granted any license to, and must
                  refrain from accessing, the Platform or relevant Game.
                </p>
                <h3>Your Customer Account</h3>
                <p>
                  <strong>Single Account</strong>
                  <p>
                    You are only permitted to have one Customer Account,
                    including any Inactive Account, on the Platform. If you
                    attempt to open more than one Customer Account, all accounts
                    you have opened or try to open may be suspended or closed
                    and the consequences described below may be enforced. You
                    must notify us immediately if you notice that you have more
                    than one registered Customer Account, whether active or not,
                    on any one Platform. DO NOT CREATE A NEW CUSTOMER ACCOUNT IF
                    YOU WISH TO CHANGE YOUR EMAIL, ADDRESS OR SURNAME.
                  </p>
                </p>
                <p>
                  <strong>Accuracy</strong>
                  <p>
                    You are required to keep your registration details up to
                    date at all times. If you change your address, email, phone
                    number, or any other contact details or personal
                    information, contact Customer Support. The name that you
                    provide to us at registration must be identical to that
                    listed on your government issued identification.
                  </p>
                </p>
                <p>
                  <strong>
                    Security and Responsibility of Your Customer Account
                  </strong>
                  <p>
                    As part of the registration process, you will have to choose
                    a password to log in to the Platform unless you log in to
                    your Customer Account using your Google single sign-on where
                    you will not need a password to access. It is your sole and
                    exclusive responsibility to ensure that your Customer
                    Account login details and any Payment Mediums are kept
                    secure and are only accessible by you. You accept full
                    responsibility for any unauthorized use of your Customer
                    Account and any activity linked to your Customer Account,
                    including by a minor (which in all events is prohibited).
                    You must not share your Customer Account or password with
                    another person, let anyone else access or use your Customer
                    Account, or do any other thing that may jeopardize the
                    security of your Customer Account. If you become aware of,
                    or reasonably suspect that the security of your Customer
                    Account has been compromised, including the loss, theft, or
                    unauthorized disclosure of your password and Customer
                    Account details, you must notify us immediately.
                  </p>
                  <p>
                    You are solely responsible for maintaining the
                    confidentiality of your password and you will be held
                    responsible for all uses of your Customer Account, including
                    any purchases made under the Customer Account, whether those
                    purchases were authorized by you or not. You are solely
                    responsible for anything that happens through your Customer
                    Account, whether or not you undertook those actions. You
                    acknowledge that your Customer Account may be terminated if
                    someone else uses it and engages in any activity that
                    breaches these Terms and Conditions or is otherwise illegal.
                  </p>

                  <p>
                    We are not responsible for any abuse or misuse of your
                    Customer Account by third parties due to your disclosure of
                    your login details to any third party, whether such
                    disclosure is intentional or accidental, active or passive.
                  </p>
                </p>
                <p>
                  <strong>Account Transfers</strong>
                  <p>
                    You may not transfer Bonus Cash or Real Cash between
                    Customer Accounts, or from your Customer Account to other
                    players, or to receive Bonus Cash or Real Cash from other
                    Customer Accounts into your Customer Account, or to
                    transfer, sell or acquire Customer Accounts. Any attempt to
                    circumvent these prohibitions is ground for immediate
                    closure of your Customer Account, without prejudice to any
                    other rights or remedies available to us. Any Bonus Cash or
                    Real Cash involved or related to such activities will be
                    marked as void.
                  </p>
                </p>
                {/* start */}
                <p>
                  <strong>REFERRAL PROGRAM TERMS AND CONDITIONS </strong>
                  <p>
                    1. <strong>Eligibility:</strong> To be eligible for the
                    referral bonus, the referred user must:
                    <ul>
                      <li>Sign up for a SpinSaga account</li>
                      <li>
                        Successfully pass Know Your Customer (KYC) verification
                      </li>
                      <li>Make their first deposit</li>
                    </ul>
                  </p>
                  <p>
                    2. <strong>Referral Amount:</strong> The referral amount is
                    subject to the ongoing offer and may vary.
                  </p>
                  <p>
                    3. <strong>Fair Play Policy:</strong> SpinSaga reserves the
                    right to:
                    <ul>
                      <li>
                        Remove or update referral coins if we suspect that our
                        system has been manipulated or abused in any way
                      </li>
                      <li>
                        Take any necessary action to prevent exploitation or
                        abuse of our referral program
                      </li>
                    </ul>
                  </p>
                </p>
                <p></p>
                {/* end */}
                <p>
                  <strong>Inactive Customer Accounts</strong>
                  <p>
                    We reserve the right to close your Customer Account if it is
                    deemed to be an Inactive Account.
                  </p>
                </p>
                <p>
                  <strong>Closing of Customer Accounts</strong>

                  <p>
                    If you wish to close your Customer Account, you may do so at
                    any time by selecting the “Contact Us” link on the Platform
                    and submitting a request to close your Customer Account.
                    Closing your Customer Account will forfeit all continued
                    access to and right to use any Bonus Cash, Real Cash, and
                    unredeemed Prizes associated with your Customer Account.
                  </p>

                  <p>
                    If the reason behind the closure of your Customer Account is
                    related to concerns about possible responsible social
                    gameplay issues, you must indicate this in your request to
                    close your Customer Account. Further details are provided in
                    our Responsible Gaming Policy.
                  </p>

                  <p>
                    You may be able to open your Customer Account again by
                    sending a request to the Customer Support team. All requests
                    for the re-opening of an account will be evaluated by our
                    Customer Support and Compliance teams, who abide by strict
                    customer protection guidelines. If the reason for the
                    closure of the account was due to social gameplay issues,
                    your account will be ineligible for reopening under any
                    circumstances.
                  </p>
                </p>
                <p>
                  <strong>Discretion to Refuse or Close Accounts</strong>
                  <p>
                    We reserve the right to place limits on, suspend, close, or
                    refuse to open a Customer Account in our sole discretion. If
                    we close your Customer Account, the consequences set out in
                    the below clauses. If we close your Customer Account for
                    other reasons, we may, at our discretion, make reasonable
                    efforts to enable you to redeem any Prizes in your Customer
                    Account, but any license for continued use, enjoyment, or
                    benefit of or from the Bonus Cash and Real Cash will be
                    terminated.
                  </p>
                </p>
                <h3>Games</h3>
                <p>
                  <strong>Rules</strong>
                  <p>
                    Games offered on the Platform may have their own rules which
                    are available on the Platform. It is your responsibility to
                    read the rules of a Game before playing. You must
                    familiarize yourself with the applicable terms of play and
                    read the relevant rules before playing any Game.
                  </p>
                </p>
                <p>
                  <strong>Bonus Cash Purchases</strong>
                  <p>
                    The Payment Medium you use to purchase Bonus Cash must be
                    legally and beneficially owned by you and in your name. If
                    it comes to our attention that the name you registered on
                    your Customer Account and the name linked to your Payment
                    Medium differ, your Customer Account will be immediately
                    suspended. Should your Customer Account be suspended, we
                    recommend that you contact Customer Support for details
                    regarding our verification process. We reserve the right to
                    request documents and information to verify the legal and
                    beneficial ownership of the Payment Medium you use to make
                    Bonus Cash purchases.
                  </p>

                  <p>
                    You agree that we and our Payment Administration Agents and
                    payments facilitators may store your payment information
                    (e.g. card number) to process your future purchases. By
                    accepting these Terms and Conditions, you authorize SpinSaga
                    Inc and our Payment Administration Agents and payments
                    facilitators to store your payment credentials in compliance
                    with applicable payment processing regulations.
                  </p>

                  <p>
                    SpinSaga Inc begins processing a payment for the purchase of
                    Bonus Cash when you click on the “COMPLETE PURCHASE” button.
                  </p>
                </p>

                 <p>
                    <strong>Free Spins</strong>
                    <p>
                    Free spins may be provided through different offers, including gold 
                    coin purchases and monthly promotional campaigns. Free spins awarded 
                    with bonus cash purchases are valid for one week from the date of issuance. 
                    Free spins granted under monthly promotions or other promotional offers are valid 
                    for 24 hours only.
                    Unused free spins will expire automatically after the applicable 
                    validity period and cannot be refunded, exchanged, or extended. 
                    </p>
                   </p>


                <p>
                  <strong>No Refunds</strong>
                  <p>
                    Purchases of Bonus Cash are final and are non-refundable,
                    transferable, or exchangeable. You agree to notify us about
                    any billing problems or discrepancies within 30 days from
                    the date of your purchase. If you do not bring them to our
                    attention within 30 days, you agree that you waive your
                    right to dispute such problems or discrepancies. You are
                    responsible for and agree to reimburse us for all reversals,
                    charge-backs, claims, fees, fines, penalties, and any other
                    liability incurred by us (including costs and related
                    expenses) that were caused by or arising out of payments
                    that you authorized or accepted or that were authorized or
                    accepted using your Customer Account (even if not authorized
                    by you).
                  </p>
                </p>
                <p>
                  <strong>Bonus Cash and Real Cash Balance</strong>
                  <p>
                    You may participate in any Game only if you have sufficient
                    Bonus Cash or Real Cash (as applicable) in your Customer
                    Account for such Participation. We will not extend you any
                    credit whatsoever for the purchase of Bonus Cash. From time
                    to time, we may assign a minimum or maximum amount of Gold
                    Coin purchases as specified and offered on the Platform.
                  </p>

                  <p>
                    Once a Bonus Cash purchase has been made, the funds will be
                    drawn from your Payment Medium as soon as practicable. The
                    purchase of Bonus Cash is the purchase of a license that
                    allows you to Participate in Regular Play Games and is not
                    the deposit of funds which can be withdrawn. Funds used to
                    purchase Bonus Cash will not, and cannot, be refunded to
                    you, except as provided for in clause. Bonus Cash do not
                    have any real money value.
                  </p>

                  <p>
                    Bonus Cash or Real Cash that have been submitted for play
                    and accepted cannot be changed, reversed, withdrawn or
                    canceled and the Bonus Cash or Real Cash (whichever
                    applicable) will be drawn from your Bonus Cash or Real Cash
                    balance instantly. If you are found to have one or more of
                    your purchases returned or reversed or charged back, your
                    Customer Account will be suspended. If this occurs, the
                    amount of such purchases will constitute a debt owed by you
                    to us and you must immediately remit payment for such
                    purchases through an alternative payment method. Until
                    payment is received by us or our Payment Administration
                    Agent, any purchases and winnings will be deemed void and
                    requests to redeem Real Cash for Prizes will not be
                    allowed.
                  </p>
                </p>
                <p>
                  <strong>Void Games</strong>
                  <p>
                    We reserve the right to declare Participation in a Game
                    void, partially or in full, if, at our sole discretion, we
                    deem it obvious that there was an error, mistake, misprint,
                    or technical error on the pay-table, win-table, minimum or
                    maximum stakes, odds, or software.
                  </p>
                </p>
                <p>
                  <strong>Final Decision</strong>
                  <p>
                    In the event of a discrepancy between the result showing on
                    a user’s device and the SpinSaga Inc server software, the
                    result showing on the SpinSaga Inc server software will be
                    the official and governing result.
                  </p>
                </p>
                <h3>Promotions</h3>
                <p>
                  All promotions, including Games played in Promotional Play,
                  contests, special offers, and bonuses, are subject to these
                  Terms and Conditions, the Sweepstakes Rules, and to additional
                  terms that may be published at the time of the promotion. In
                  the event and to the extent of any conflict between these
                  Terms and Conditions and any promotion-specific terms and
                  conditions, the promotion-specific terms and conditions will
                  prevail.
                </p>
                <p>
                  SpinSaga Inc reserves the right, at its sole discretion, to
                  withdraw or modify such promotions (including their
                  availability) without prior notice to you.
                </p>
                <p>
                  If, in the reasonable opinion of SpinSaga Inc, we form the
                  view that a Registered Customer is abusing any promotion, to
                  derive any advantage or gain for themselves or other
                  Registered Customers, including by way of Fraudulent Conduct,
                  we may, at our sole discretion, withhold, deny or cancel any
                  advantage, bonus, or Prize as we see fit. Without limiting
                  clauses, you confirm that you grant SpinSaga Inc an
                  irrevocable, perpetual, worldwide, nonexclusive, royalty-free
                  license to use in whatever way we see fit, and without further
                  acknowledgment of you as the author, any Content you post or
                  publish as part of a promotion, contest, or competition.
                </p>
                <h3>Redemption Of Prizes</h3>
                <p>
                  <strong>Prize Redemption Methods</strong>
                  <p>Subject to these Terms and Conditions:</p>
                  <ul>
                    <li>
                      When you choose to redeem Prizes for gift cards, the gift
                      cards will be allocated to the email address or
                      residential that you have registered against your Customer
                      Account, or if this is not technically possible, then to
                      an alternative email address or physical address you
                      nominate, provided that email address is also your address
                      and not that of a third party or that the physical address
                      is within the same state as the residential address on
                      your account; and
                    </li>
                    <li>
                      We reserve the right to require the use of the same
                      payment method for redemption of Prizes as was used to
                      purchase Bonus Cash, or a specific payment method at our
                      own discretion.
                    </li>
                  </ul>
                </p>
                <p>
                  <strong>Limits and Fees</strong>
                  <p>
                    We reserve the right, at our sole discretion, to limit the
                    value of your Prize redemptions to:
                  </p>
                  <ul>
                    <li>USD$10,000 per day; or</li>
                    <li>
                      any other amount over any time that we consider necessary
                      to satisfy our regulatory obligations or the requirements
                      of our partners and suppliers.
                    </li>
                  </ul>
                  <p>
                    When you choose to redeem Prizes for gift cards, it is your
                    sole responsibility to ensure that the email address,
                    residential address and all relevant details you provide are
                    accurate. If the details you have provided are not accurate,
                    and we have processed the redemption using the details you
                    have provided, the redemption of that Prize is considered
                    complete, and we are not required to reissue the gift cards.
                  </p>
                  <p>
                    If no valid email address is provided to us within 60 days
                    of a request from us to do so, SpinSaga Inc is not obliged
                    to allocate the gift cards to you and may in its discretion
                    deem the Prizes to be void.
                  </p>
                  <p>
                    When you choose to redeem Prizes for cash, it is your sole
                    responsibility to ensure that your financial institution
                    will accept payment from us into your bank account. SpinSaga
                    Inc has no obligation to check whether your financial
                    institution will accept payments from us to your nominated
                    bank account.
                  </p>
                  <p>
                    Subject to below clause, we will not make payments into an
                    account or online wallet which does not match your verified
                    name or the name you provided when registering your Customer
                    Account, or that is not legally and beneficially owned by
                    you.
                  </p>
                  <p>
                    Where you are required to provide the details of your
                    financial institution, bank account or online wallet, you
                    agree that you are solely responsible for the accuracy of
                    those details. You further agree that, where you have chosen
                    to redeem a Prize for cash and the details you have provided
                    are not accurate, and we have processed the payment using
                    the details you have provided, the redemption of that Prize
                    is complete, and we cannot and are not required to reverse
                    or reissue the payment.
                  </p>
                  <p>
                    You acknowledge and agree that, if your financial
                    institution will not accept payments from SpinSaga Inc or
                    where your bank account or online wallet does not meet the
                    requirements in these Terms and Conditions:
                  </p>
                  <ul>
                    <li>
                      you will be required to nominate an alternative bank
                      account for the payment; and
                    </li>
                    <li>
                      there will be delays in the processing of the payment to
                      you; and
                    </li>
                    <li>
                      if you are unable to nominate an alternative bank account
                      which meets the requirements set out in these Terms and
                      Conditions within 60 days of a request from us to do so,
                      SpinSaga Inc is not obliged to make the relevant payments
                      to you and may in its discretion deem the Prizes to be
                      void.
                    </li>
                  </ul>
                  <p>
                    All Real Cash purchases and payments made for redeemed
                    prizes in the form of gift cards are executed in USD. It is
                    a Player’s responsibility to ensure that their nominated
                    bank account can accept transactions in USD.
                  </p>
                  <p>
                    All foreign exchange transaction fees, charges or related
                    costs that you may incur as a result of, or in relation to,
                    payments made by the SpinSaga Inc to you are to be borne
                    solely by you, including but not limited to any losses or
                    additional costs arising from foreign exchange fluctuations.
                  </p>
                  <p>
                    Payments will only be made to financial institutions within
                    the United States. We will not process any payments to
                    foreign or international banks or financial institutions
                    operating outside of the United States.
                  </p>
                  <p>
                    We process requests to redeem Prizes in the order in which
                    they are received. Our goal is to process your request as
                    soon as practicable.
                  </p>
                  <p>
                    We will only process one Prize redemption request per
                    Customer Account in any 24-hour period.
                  </p>
                  <p>
                    Where you choose to redeem Prizes for cash you acknowledge
                    and agree that it may take up to 10 business days to process
                    the relevant payment into your nominated bank account. Where
                    you choose to redeem physical Prizes or non-cash prizes such
                    as vacation packages or electronic goods, you agree that it
                    may take up to 30 days for your prize to be delivered.
                    Confirmation of shipping or tracking number is considered
                    proof of issuance of the Prize. There may be delays in
                    payments due to our identity verification process and
                    certain Payment Mediums will require additional verification
                    at the time of redemption.
                  </p>
                  <p>
                    Payments of over US$10,000 may require a longer processing
                    time than usual due to bank clearance and security and fraud
                    checks and may also be paid in more than one lump sum. This
                    may add up to 7 days to the normal processing time but is
                    dependent on the circumstances of each individual case.
                  </p>
                  <p>
                    You can request to redeem a Prize of any value; however, we
                    reserve the right to:
                  </p>
                  <ul>
                    <li>
                      reject a Prize redemption request on the basis that it
                      exceeds the limits;
                    </li>
                    <li>
                      allocate or pay Prizes in smaller increments over a number
                      of days until all of the Prize has been allocated or paid.
                    </li>
                  </ul>
                  <p>
                    You acknowledge and agree that we may at our sole
                    discretion, from time to time, appoint one or more Payment
                    Administration Agents to accept or make payments (including
                    merchant facilities) from or to Players on our behalf.
                  </p>
                  <p>
                    A Payment Administration Agent will have the same rights,
                    powers and privileges that we have under these Terms and
                    Conditions and will be entitled to exercise or enforce their
                    rights, powers and privileges as our agent or in their own
                    name. In no event will we be liable to any Player for any
                    loss, damage or liability resulting from the Payment
                    Administration Agent's negligence or acts beyond the
                    authority given by SpinSaga Inc.
                  </p>
                  <p>
                    Real Cash are only valid for 60 days from the date you last
                    logged on to your Customer Account and will thereafter
                    automatically expire. Real Cash may be forfeited if a
                    Customer Account is closed for any reason, or at our
                    discretion.
                  </p>
                  <p>
                    Updating or adding additional payment details for the sole
                    purpose of redeeming Prizes may only be done by you when
                    logged into your Customer Account and when you are
                    undergoing the process of redeeming a Prize. We cannot
                    update or add additional payment details on your behalf.
                  </p>
                  <p>
                    If you choose to redeem Prizes for cash but refuse to accept
                    payments made to your nominated bank account by SpinSaga
                    Inc, you must refuse the amount in its entirety. Where you
                    refuse to accept payment to your nominated bank account more
                    than twice in any 3-month period, SpinSaga Inc reserves the
                    right to suspend your Customer Account to undertake
                    investigations to ensure that the Platform is not being used
                    as a vehicle for fraudulent activity.
                  </p>
                </p>
                <p>
                  <strong>Mistaken Additions</strong>
                </p>
                <p>
                  If at any time we mistakenly add Bonus Cash or Real Cash to
                  your Customer Account that do not belong to you, whether due
                  to a technical error, human error or otherwise, the Bonus Cash
                  or Real Cash added by mistake will remain SpinSaga Inc
                  property and will be deducted from your Customer Account. If
                  you become aware that you have mistakenly received a prize
                  redemption that does not belong to you prior to us becoming
                  aware of the error, the mistakenly paid amount will (without
                  prejudice to other remedies and actions that may be available
                  at law) constitute a debt owed by you to us. In the event you
                  discover an incorrect addition of Bonus Cash or Real Cash,
                  you are obliged to notify Customer Support by using the
                  “Contact” link on the Platform without delay.
                </p>
                <h3>Verification</h3>
                <p>
                  <strong>Verification Checks</strong>
                  <p>
                    You agree that we are entitled to conduct any
                    identification, credit and other verification checks that we
                    may reasonably require or that are required of us under
                    applicable laws and regulations or by relevant regulatory
                    authorities or to otherwise prevent financial crime. Until
                    all required verification checks are completed to our
                    satisfaction:
                  </p>
                  <ul>
                    <li>
                      any request you have made for redemption of Prizes will
                      remain pending; and
                    </li>
                    <li>
                      we are entitled to restrict your Customer Account in any
                      manner that we may reasonably deem appropriate, including
                      by suspending or closing your Customer Account.
                    </li>
                  </ul>
                  <p>
                    We will carry out additional verification procedures in
                    accordance with our internal anti-financial crime policies,
                    including without limitation for any cumulative or single
                    redemption of Prizes exceeding a value of USD$2,000.
                    Verification procedures may, for example, include requests
                    for, and our examination of, copies of your:
                  </p>
                  <ul>
                    <li>
                      identification documentation (including photo
                      identification) such as a driver’s license, government
                      issued photo ID or passport;
                    </li>
                    <li>proof of your address such as a utility bill; and</li>
                    <li>
                      source of wealth or source of funds documentation such as
                      a pay slip, contract of employment or bank statements.
                    </li>
                    <li>
                      proof of physical ownership and possession of the payment
                      method used to purchase Bonus Cash such as photographs of
                      the credit or debit card used, obscuring the first 12
                      digits of the card number.
                    </li>
                  </ul>
                  <p>
                    Where any identification, credit or other verification check
                    we require cannot be completed to our satisfaction because
                    you have not provided any document we request from you in
                    the form that we require within 30 days’ of the date the
                    document was first requested, then we are under no
                    obligation to continue with the verification check and we
                    may, at our sole discretion, close or otherwise restrict
                    your Customer Account in any manner that we may reasonably
                    deem appropriate.
                  </p>
                  <p>
                    Players who request the redemption of Prizes held in a
                    suspended or closed Customer Account should contact Customer
                    Support. Nothing in this provision should be construed as
                    conveying a right to any such redemption. Your rights in
                    that regard are as set out elsewhere in these Terms and
                    Conditions.
                  </p>
                </p>
                <p>
                  <strong>External Verification Checks</strong>
                  <p>
                    You agree that SpinSaga Inc may use third party service
                    providers to run external identification and other
                    verification checks on all Customers on the basis of the
                    information provided by you from time to time.
                  </p>
                </p>
                <h3>Responsible Gaming</h3>
                <p>
                  SpinSaga Inc actively supports responsible social gameplay and
                  encourages its Players to make use of a variety of responsible
                  social gameplay features. You may, at any time, request to
                  take a break, self-exclude or permanently close your Customer
                  Account. You may also set a limit on your purchases of Gold
                  Coins or the amount of Coins you play within a period. We
                  refer you to our Responsible Gaming Policy for full details.
                </p>
                <p>
                  Although SpinSaga Inc will use all reasonable endeavors to
                  enforce its responsible social gameplay policies, SpinSaga Inc
                  does not accept any responsibility or liability if you
                  nevertheless continue gameplay and/or seek to use the Platform
                  with the intention of deliberately avoiding the relevant
                  measures in place and/or SpinSaga Inc is unable to enforce its
                  measures/policies for reasons outside of SpinSaga Inc’s
                  reasonable control.
                </p>
                <h3>Fraudulent Conduct</h3>
                <p>You will not, directly or indirectly:</p>
                <ul>
                  <li>
                    hack into any part of the Games or Platform through password
                    mining, phishing, or any other means;
                  </li>
                  <li>
                    attempt to modify, reverse engineer, or reverse-assemble any
                    part of the Games or Platform;
                  </li>
                  <li>
                    knowingly introduce viruses, Trojans, worms, logic bombs,
                    spyware, malware, or other similar material;
                  </li>
                  <li>
                    circumvent the structure, presentation or navigational
                    function of any Game so as to obtain information that
                    SpinSaga Inc has chosen not to make publicly available on
                    the Platform;
                  </li>
                  <li>engage in any form of cheating or collusion;</li>
                  <li>
                    use the Platform and the systems of SpinSaga Inc to
                    facilitate any type of illegal money transfer (including
                    money laundering proceeds of crime); or
                  </li>
                  <li>
                    participate in or take advantage of, or encourage others to
                    participate in or take advantage of schemes, organizations,
                    agreements, or groups designed to share:
                  </li>
                  <ul>
                    <li>
                      special offers or packages emailed to a specific set of
                      players and redeemable by URL; or
                    </li>
                    <li>
                      identification documents (including, but not limited to,
                      photographs, bills, and lease documents) for the purpose
                      of misleading SpinSaga Inc as to a Player’s identity.
                    </li>
                  </ul>
                </ul>
                <p>
                  You must not use the Platform for any unlawful or fraudulent
                  activity or prohibited transaction (including Fraudulent
                  Conduct) under the laws of any jurisdiction that applies to
                  you. We monitor all transactions in order to prevent money
                  laundering.
                </p>
                <p>
                  If SpinSaga Inc suspects that you may be engaging in, or have
                  engaged in fraudulent, unlawful or improper activity,
                  including money laundering activities or any conduct which
                  violates these Terms and Conditions, your access to the
                  Platform will be suspended immediately and your Customer
                  Account may be closed. If your Customer Account is suspended
                  or closed under such circumstances, SpinSaga Inc is under no
                  obligation to reverse any Bonus Cash purchases you have made or
                  to redeem any Real Cash or Prizes that may be in your
                  Customer Account. In addition, SpinSaga Inc may pass any
                  necessary information on to the relevant authorities, other
                  online service providers, banks, credit card companies,
                  electronic payment providers, or other financial institutions.
                  You will cooperate fully with any SpinSaga Inc investigation
                  into such activity.
                </p>
                <p>
                  If you suspect any unlawful or fraudulent activity or
                  prohibited transaction by another Player, please notify us
                  immediately via the means of communication listed in the
                  Customer Complaints procedure (described in below clauses).
                </p>
                <h3>Intellectual Property</h3>
                <p>
                  The computer software, the computer graphics, the Platform and
                  the user interface that we make available to you is owned by,
                  or licensed to, SpinSaga Inc or its associates and protected
                  by intellectual property laws. You may only use the software
                  for your own personal, recreational uses in accordance with
                  all rules, terms and conditions we have established (including
                  these Terms and Conditions and the Sweepstakes Rules) and in
                  accordance with all applicable laws, rules and regulations.
                </p>
                <p>
                  You acknowledge that SpinSaga Inc is the proprietor or
                  authorized licensee of all intellectual property in relation
                  to any Content.
                </p>
                <p>
                  Your use of the Games and Platform does not provide you with
                  any intellectual property rights in the Content, Games or
                  Platform.
                </p>
                <p>
                  You grant us, and represent and warrant that you have the
                  right to grant us, an irrevocable, perpetual, worldwide,
                  non-exclusive, royalty-free license to use in whatever way we
                  see fit, any information, images, videos, comments, messages,
                  music or profiles you publish or upload to any website or
                  social media page controlled and operated by SpinSaga Inc.
                </p>
                <p>
                  You must not reproduce or modify the Content in any way,
                  including by removing any copyright or trademark notice. All
                  trademarks and logos displayed in the Games and Platform are
                  the property of their respective owners and are protected by
                  applicable trademark and copyright laws.
                </p>
                <h3>Third Party Websites, Links Or Games</h3>
                <p>
                  <strong>Third Party Websites</strong>
                  <p>
                    You acknowledge and agree that SpinSaga Inc: is not
                    responsible for Third Party Websites; and makes no guarantee
                    as to the content, functionality, or accuracy of any Third
                    Party Website.
                  </p>
                  <p>
                    You further acknowledge that some Third Party Websites may
                    be fraudulent in nature, offering Bonus Cash or Real Cash
                    which the operators of those websites are not authorized to
                    provide, in an effort to induce you to reveal personal
                    information (including passwords, account information and
                    credit card details). You agree that SpinSaga Inc is not
                    responsible for any actions you take at the request or
                    direction of these, or any other Third Party Websites. WE DO
                    NOT AUTHORIZE ANY THIRD PARTY TO OFFER GOLD COINS OR SAGA
                    COINS. Any such offer should be deemed fraudulent and
                    disregarded.
                  </p>
                  <p>
                    Third Party Websites are subject to the terms and conditions
                    outlined by that third party.
                  </p>
                </p>
                <p>
                  <strong>Links</strong>
                  <p>Any links to Third Party Websites do not:</p>
                  <ul>
                    <li>
                      (a) indicate a relationship between SpinSaga Inc and the
                      third party; or
                    </li>
                    <li>
                      (b) indicate any endorsement or sponsorship by SpinSaga
                      Inc of the Third Party Website, or the goods or services
                      it provides, unless specifically indicated by SpinSaga
                      Inc.
                    </li>
                  </ul>
                  <p>
                    Where a website controlled and operated by SpinSaga Inc
                    contains links to various social networking sites, such as
                    Facebook, Instagram and X, you acknowledge and agree that:
                    any comments or content that you post on such social
                    networking sites are subject to the terms and conditions of
                    that particular social networking site;
                  </p>
                  <p>
                    you will not post any comments that are false, misleading,
                    or deceptive or defamatory to us, our employees, agents,
                    officers, or other players; and we are not responsible or
                    liable for any comments or content that you or others post
                    on social networking sites.
                  </p>
                </p>
                <p>
                  <strong>Games</strong>
                  <p>
                    All games are solely and exclusively owned by Third Party
                    Software providers, including all intellectual property
                    rights in or to the online software relating to such Games.
                    You will not have any recourse against any Third Party
                    Software provider in relation to any Game and any recourse
                    you may have in connection with the software connected to
                    any Third Party Game is limited to SpinSaga Inc.
                  </p>
                </p>
                <h3>Disruptions And Change</h3>
                <p>
                  <strong>No warranties</strong>
                  <p>
                    The Platform is provided on an “as is” basis and to the
                    fullest extent permitted by law, we make no warranty or
                    representation, whether express or implied, in relation to
                    the satisfactory quality, fitness for purpose, completeness
                    or accuracy of the Platform, including the Games and
                    Content.
                  </p>
                </p>
                <p>
                  <strong>Malfunctions</strong>
                  <p>
                    SpinSaga Inc is not liable for any downtime, server
                    disruptions, lagging, or any technical or political
                    disturbance to Game play, nor attempts by you to Participate
                    by methods, means or ways not intended by us.
                  </p>
                  <p>
                    SpinSaga Inc accepts no liability for any damages or losses
                    which are deemed or alleged to have arisen out of or in
                    connection with any Platform or its Content including,
                    without limitation, delays or interruptions in operation or
                    transmission, loss or corruption of data, communication or
                    lines failure, any person’s misuse of a Platform or its
                    Content or any errors or omissions in Content.
                  </p>
                  <p>
                    In the event of a Platform system malfunction all Game play
                    on that Platform is void. In the event a Game is started but
                    fails to conclude because of a failure of the system,
                    SpinSaga Inc will use commercially reasonable efforts to
                    reinstate the amount of Bonus Cash or Real Cash played
                    (whichever applicable) in the Game to you by adding them to
                    your Customer Account. SpinSaga Inc reserves the right to
                    alter Player balances and account details to correct such
                    mistakes.
                  </p>
                  <p>
                    SpinSaga Inc reserves the right to remove any part of the
                    Games from the Platform at any time. Any part of the Games
                    that indicate incorrect behavior affecting Prize redemption,
                    game data, Bonus Cash balances, Real Cash balances or other
                    balances, that may be due to misconfiguration or a bug, will
                    be cancelled and removed from the Platform. Player balances
                    and account details may be altered by SpinSaga Inc in such
                    cases, in order to correct any mistake.
                  </p>
                </p>
                <p>
                  <strong>Changes to the Platform</strong>
                  <p>
                    SpinSaga Inc reserves the right to suspend, modify, remove,
                    or add Content to the Platform at its sole discretion with
                    immediate effect and without notice to you. We will not be
                    liable to you for any loss suffered as a result of any
                    changes made or for any modification to, or suspension,
                    unavailability, or discontinuance of, the Platform
                    (including any Game, promotion, challenge or Content
                    thereon) and you will have no claims against SpinSaga Inc in
                    such regard.
                  </p>
                </p>
                <p>
                  <strong>Service Suspension</strong>
                  <p>
                    We may temporarily suspend the whole or any part of the
                    Platform for any reason at our sole discretion. We may, but
                    will not be obliged to, give you as much notice as is
                    reasonably practicable of such suspension. We will restore
                    the Platform, as soon as is reasonably practicable, after
                    such temporary suspension.
                  </p>
                </p>
                <h3>Territorial Availability</h3>
                <p>
                  The Platform, or any feature thereof (including any and all
                  Games, promotions, challenges and Content), may not be
                  available in all territories and jurisdictions and SpinSaga
                  Inc. makes no representation that the Platform is or shall
                  remain available for use in any particular territories and
                  jurisdictions. You acknowledge and agree that SpinSaga Inc.
                  may, at its sole discretion, change, restrict or prohibit the
                  availability of all or a portion of the Platform in certain
                  territories and jurisdictions at any time, and you will have
                  no claims against SpinSaga Inc. in such regard.
                </p>
                <h3>Viruses</h3>
                <p>
                  Although we take all reasonable measures to ensure that the
                  Platform is free from viruses we cannot and do not guarantee
                  that the Platform is free of such problems. It is your
                  responsibility to protect your systems and have in place the
                  ability to reinstall any data or programs lost due to a virus.
                </p>
                <h3>Privacy Policy</h3>
                <p>
                  SpinSaga Inc is committed to protecting and respecting your
                  privacy and complying with all applicable data protection and
                  privacy laws. Our Privacy Policy is inseparably linked to
                  these Terms and Conditions and its acceptance is a
                  prerequisite to account registration.
                </p>
                <h3>Marketing Communications</h3>
                <p>
                  You consent to receive marketing communications from SpinSaga
                  Inc in respect of its offerings by way of email, post, SMS and
                  telephone notifications, any of which you may unsubscribe from
                  at any time by contacting Customer Support.
                </p>
                <h3>Use Of Chat Services</h3>
                <p>
                  We may provide you with a Chat service to talk to our Customer
                  Support representatives, or to talk to other Players. This may
                  include communications via Facebook, Instagram or X. It is
                  your responsibility to use these services only for their
                  intended purposes. You are not permitted to use our Chat
                  services for illegal purposes.
                </p>
                <p>
                  We review and moderate chats and keep a log and record of
                  statements. Your use of the Chat service should be for
                  recreational and social purposes only. Spamming on Chat is
                  prohibited. You are prohibited from intimidating, harassing,
                  or abusing other Players or SpinSaga Inc employees and
                  representatives.
                </p>
                <p>
                  You will not use any Chat service to engage in any form of
                  harassment or offensive behavior, including but not limited
                  to, threatening, derogatory, abusive or defamatory statements,
                  or racist, sexually explicit, pornographic, obscene, or
                  offensive language.
                </p>
                <p>
                  You will not use any Chat service to infringe the privacy
                  rights, property rights, or any other rights of any person.
                </p>
                <p>
                  You will not submit any kind of material or information on any
                  Chat service that is fraudulent or otherwise unlawful or
                  violates any law.
                </p>
                <p>
                  You will not use any Chat service to distribute, promote or
                  otherwise publish any material containing any solicitation for
                  funds, advertising or solicitation for goods or services of
                  other forums.
                </p>
                <p>
                  You will not use any Chat service to distribute, promote or
                  otherwise publish any kind of malicious code or do anything
                  else that might cause harm to the Platform or to other
                  Player’s systems in any way.
                </p>
                <p>
                  You will not use Chat to make public any private or personal
                  information including but not limited to Physical Addresses,
                  Email, Phone Number, Date of Birth, Social Security Numbers or
                  any other personal information about you or any other person.
                </p>
                <p>
                  We reserve the right to monitor anything and everything
                  submitted by you to any Chat service to ensure that it
                  conforms to content guidelines that are monitored by us and
                  subject to change from time to time.
                </p>
                <p>
                  If you breach any of the provisions relating to a Chat
                  service, we may ban you from using that Chat service or all
                  Chat services and/or suspend or close your Customer Account.
                  If we close your Customer Account, we reserve the right to
                  cancel or refuse to redeem any Prizes.
                </p>
                <p>
                  We reserve the right to remove any Chat service from the
                  Platform if abused.
                </p>
                <p>
                  We will not be liable if damage arises out of the Chat
                  service.
                </p>
                <p>
                  You agree to indemnify us against any damage arising out of
                  your illegal, unlawful, or inappropriate conduct or arising
                  out of violation of the provisions in clause 19 or any other
                  rules on the Platform applying to the Chat service.
                </p>
                <p>
                  You will not collude in any way through the Chat service or
                  any other chat service. Players are encouraged to report any
                  suspicious behavior to Customer Support. We reserve the right
                  to report any suspicious behavior or chats on the Chat service
                  to the authorities.
                </p>
                <h3>Complaints And Customer Support</h3>
                <p>
                  If you would like to contact our Customer Support department
                  or have a complaint regarding our Platform (including any
                  Game) you may contact us at any time using the contact form or
                  details on site.
                </p>
                <p>
                  ALL EMAIL COMMUNICATIONS BETWEEN YOU AND SPINSAGA INC SHOULD
                  BE CARRIED OUT USING THE EMAIL ADDRESS THAT YOU HAVE
                  REGISTERED AGAINST YOUR CUSTOMER ACCOUNT HELD WITH SPINSAGA
                  INC. FAILURE TO DO SO MAY RESULT IN OUR RESPONSE BEING
                  DELAYED.
                </p>
                <p>
                  The following information must be included in any written
                  communication with SpinSaga Inc (including a complaint):
                </p>
                <ul>
                  <li>your username;</li>
                  <li>
                    your first and last name, as registered on your Customer
                    Account;
                  </li>
                  <li>
                    a detailed explanation of the complaint, claim or query; and
                  </li>
                  <li>
                    any specific dates and times associated with the
                    complaint/claim (if applicable).
                  </li>
                </ul>
                <p>
                  Failure to submit a written communication with the information
                  outlined above may result in a delay in our ability to
                  identify and respond to your complaint, claim, or query in a
                  timely manner. The SpinSaga Customer Support Team will inquire
                  into complaints immediately. The customer support team will
                  aim to respond to complaints within 10 calendar days of
                  initial contact.
                </p>
                <p>
                  In some circumstances, the customer support team will require
                  up to 20 calendar days to respond to a complaint. In this
                  case, the Player will be informed of the delay within 10
                  calendar days of lodging the complaint.
                </p>
                <h3>Closure/Suspension Of Account</h3>
                <p>
                  Without limiting clauses, we reserve the right, at our sole
                  discretion, to suspend or close your Customer Account
                  (notwithstanding any other provision contained in these Terms
                  and Conditions) where we have reason to believe that you have
                  engaged or are likely to engage in any of the following
                  activities:
                </p>
                <ul>
                  <li>
                    You breached, or assisted another party to breach, any
                    provision of these Terms and Conditions or the Sweepstakes
                    Rules, or we have a reasonable ground to suspect such
                    breach;
                  </li>
                  <li>
                    You have more than one Customer Account, including any
                    Inactive Account, on any Platform;
                  </li>
                  <li>
                    The name registered on your Customer Account does not match
                    the name on your Payment Medium used to make purchases of
                    Bonus Cash or the account into which you elect to redeem
                    Prizes or you do not legally and beneficially own such
                    Payment Medium or redemption account;
                  </li>
                  <li>
                    Your communication with us consists of harassment or
                    offensive behavior, including (but not limited to)
                    threatening, derogatory, abusive or defamatory statements,
                    or racist, sexually explicit, pornographic, obscene or
                    offensive language;
                  </li>
                  <li>
                    Your Customer Account is deemed to be an Inactive Account;
                  </li>
                  <li>You become bankrupt;</li>
                  <li>You provide incorrect or misleading information;</li>
                  <li>
                    Your identity or source of wealth or source of funds (if
                    requested) cannot be verified;
                  </li>
                  <li>
                    You attempt to use your Customer Account through a VPN,
                    proxy or similar service that masks or manipulates the
                    identification of your real location, or by otherwise
                    providing false or misleading information regarding your
                    citizenship, location or place of residence, or by playing
                    Games using the Platform through a third party or on behalf
                    of a third party;
                  </li>
                  <li>
                    You are not over 18 years of age or such higher minimum
                    legal age of majority as stipulated in the jurisdiction of
                    your residence;
                  </li>
                  <li>
                    You are located in a jurisdiction:
                    <ul>
                      <li>Where Participation is illegal; or</li>
                      <li>
                        Where you are ineligible to Participate in Promotional
                        Play in accordance with the Sweepstakes Rules.
                      </li>
                    </ul>
                  </li>
                  <li>
                    You have allowed or permitted (whether intentionally or
                    unintentionally) someone else to Participate using your
                    Customer Account;
                  </li>
                  <li>
                    You have played in tandem with other Player(s) as part of a
                    club, group, etc., or played the Games in a coordinated
                    manner with other Player(s) involving the same (or
                    materially the same) selections;
                  </li>
                  <li>
                    Without limiting clauses, where SpinSaga Inc has received a
                    “charge back”, claim or dispute and/or a "return"
                    notification via your Payment Medium;
                  </li>
                  <li>
                    You have failed our due diligence procedures, or are found
                    to be colluding, cheating, money laundering or undertaking
                    any kind of fraudulent activity;
                  </li>
                  <li>
                    It is determined by SpinSaga Inc that you have employed or
                    made use of a system (including machines, computers,
                    software, or other automated systems such as bots) which
                    give you an unfair advantage; or
                  </li>
                  <li>
                    You do not meet the criteria set out in our Customer
                    Acceptance Policy.
                  </li>
                </ul>
                <p>
                  If SpinSaga Inc suspends or closes your Customer Account for
                  any of the reasons referred to in clauses above, you will be
                  liable for any and all claims, losses, liabilities, damages,
                  costs and expenses incurred or suffered by SpinSaga Inc
                  (together “Claims”) arising therefrom and you will indemnify
                  and hold SpinSaga Inc harmless on demand for such Claims.
                </p>
                <p>
                  If we have reasonable grounds to believe that you have
                  participated in any of the activities set out in clauses above
                  then we reserve the right to withhold all or part of the
                  balance or recover from your Customer Account any Prizes, Gold
                  Coins or Real Cash that are attributable to any of the
                  activities contemplated in above clauses. In such
                  circumstances, your details may be passed on to any applicable
                  regulatory authority, regulatory body or any other relevant
                  external third parties.
                </p>
                <p>
                  If your Customer Account is suspended or closed and this leads
                  to the withholding of Prizes, Real Cash or Bonus Cash, it
                  will not be possible for you to unlock your Customer Account
                  during any suspension period.
                </p>
                <p>
                  The rights set out in above clause are without prejudice to
                  any other rights that we may have against you under these
                  Terms and Conditions or otherwise.
                </p>
                <h3>Indemnity And Limitation Of Liability</h3>
                <p>
                  <strong>Indemnity</strong>
                  <p>
                    YOU AGREE TO INDEMNIFY AND HOLD HARMLESS US AND OUR
                    AFFILIATES, AND OUR RESPECTIVE PARTNERS, DIRECTORS,
                    OFFICERS, EMPLOYEES, SHAREHOLDERS, SUBCONTRACTORS,
                    LICENSORS, SUPPLIERS AND AGENTS AGAINST ANY AND ALL COSTS,
                    EXPENSES, LIABILITIES AND DAMAGES (WHETHER DIRECT, INDIRECT,
                    SPECIAL, CONSEQUENTIAL, EXEMPLARY OR PUNITIVE OR OTHER)
                    ARISING FROM ANY PARTICIPATION BY YOU, INCLUDING WITHOUT
                    LIMITATION:
                    <ul>
                      <li>ACCESSING OR USING THE PLATFORM;</li>
                      <li>
                        RE-USE OF ANY CONTENT AT, OR OBTAINED FROM, THE PLATFORM
                        OR ANY OTHER SOURCE WHATSOEVER;
                      </li>
                      <li>
                        FACILITATING OR MAKING A PAYMENT INTO YOUR CUSTOMER
                        ACCOUNT;
                      </li>
                      <li>
                        PLAYING THE GAMES THROUGH ANY DELIVERY MECHANISM
                        OFFERED; AND
                      </li>
                      <li>ACCEPTANCE AND USE OF ANY PRIZE.</li>
                    </ul>
                  </p>
                </p>
                <p>
                  <strong>Limitation of Liability</strong>
                  <p>
                    TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, UNDER NO
                    CIRCUMSTANCES WHATEVER WILL WE OR OUR AFFILIATES, OR OUR
                    RESPECTIVE PARTNERS, OFFICERS, DIRECTORS, EMPLOYEES,
                    SHAREHOLDERS, AGENTS, LICENSORS, SUBCONTRACTORS AND
                    SUPPLIERS, BE RESPONSIBLE OR LIABLE TO YOU OR TO ANY OTHER
                    ENTITY, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGES,
                    UNDER ANY LEGAL THEORY, WHETHER CONTRACT, TORT OR OTHERWISE,
                    FOR ANY INDIRECT, INCIDENTAL, CONSEQUENTIAL, SPECIAL,
                    EXEMPLARY, OR PUNITIVE DAMAGES, INCLUDING ANY LOST PROFITS
                    AND LOST BUSINESS OPPORTUNITIES, BUSINESS INTERRUPTION, LOST
                    REVENUE, INCOME, GOODWILL, USE OF DATA OR OTHER INTANGIBLE
                    LOSSES, IN EACH CASE THAT RESULT FROM OR RELATE IN ANY
                    MANNER TO YOUR PARTICIPATION OR ANY OTHER ACT OR OMISSION BY
                    US.
                  </p>
                  <p>
                    TO THE FULLEST EXTENT PERMITTED BY APPLICABLE LAW, UNDER NO
                    CIRCUMSTANCES WILL WE, OUR AFFILIATES, AND OUR RESPECTIVE
                    PARTNERS, OFFICERS, DIRECTORS, EMPLOYEES, SHAREHOLDERS,
                    AGENTS, LICENSORS, SUBCONTRACTORS OR SUPPLIERS, BE LIABLE TO
                    YOU FOR MORE THAN THE AMOUNT YOU HAVE PAID US IN THE THIRTY
                    (30) DAYS IMMEDIATELY PRECEDING THE DATE ON WHICH YOU FIRST
                    ASSERT ANY SUCH CLAIM. YOU ACKNOWLEDGE AND AGREE THAT IF YOU
                    HAVE NOT PAID US ANY AMOUNTS IN THE THIRTY (30) DAYS
                    IMMEDIATELY PRECEDING THE DATE ON WHICH YOU FIRST ASSERT ANY
                    SUCH CLAIM, YOUR SOLE AND EXCLUSIVE REMEDY FOR ANY DISPUTE
                    WITH US IS TO STOP USING THE PLATFORM AND TO CLOSE YOUR
                    CUSTOMER ACCOUNT. YOU RECOGNIZE AND AGREE THAT THE WARRANTY
                    DISCLAIMERS IN ABOVE CLAUSES, AND THE INDEMNITIES AND
                    LIMITATIONS OF LIABILITY, ARE MATERIAL AND BARGAINED FOR
                    BASES OF THESE TERMS AND THAT THEY HAVE BEEN TAKEN INTO
                    ACCOUNT AND REFLECTED IN THE DECISION BY YOU TO ENTER INTO
                    THESE TERMS AND CONDITIONS.
                  </p>
                </p>
                <p>
                  <strong>Negligence and Willful Misconduct</strong>
                  <p>
                    NOTHING IN THESE TERMS AND CONDITIONS WILL OPERATE SO AS TO
                    EXCLUDE ANY LIABILITY OF SPINSAGA INC FOR DEATH OR PERSONAL
                    PHYSICAL INJURY THAT IS DIRECTLY AND PROXIMATELY CAUSED BY
                    SPINSAGA INC’S NEGLIGENCE OR WILFUL MISCONDUCT.
                  </p>
                </p>
                <p>
                  <strong>Survival of Obligations</strong>
                  <p>
                    ABOVE CLAUSES SURVIVE THE TERMINATION OF THESE TERMS AND
                    CONDITIONS FOR ANY REASON.
                  </p>
                </p>
                <p>
                  <strong>SPINSAGA INC NOT A FINANCIAL INSTITUTION</strong>
                  <p>
                    Interest : You will not receive any interest on outstanding
                    Prizes, and you will not treat SpinSaga Inc as a financial
                    institution. No legal or tax advice: SpinSaga Inc does not
                    provide advice regarding tax and/or legal matters. Players
                    who wish to obtain advice regarding tax and legal matters
                    are advised to contact appropriate advisors.
                  </p>
                </p>
                <p>
                  <strong>
                    DISPUTE RESOLUTION AND AGREEMENT TO ARBITRATE ON AN
                    INDIVIDUAL BASIS
                  </strong>
                  <p>
                    PLEASE READ THIS CLAUSE CAREFULLY BECAUSE IT MAY REQUIRE YOU
                    AND SPINSAGA INC TO ARBITRATE CERTAIN DISPUTES AND CLAIMS ON
                    AN INDIVIDUAL BASIS AND LIMITS THE MANNER IN WHICH YOU AND
                    SPINSAGA INC CAN SEEK RELIEF FROM EACH OTHER. If you reside
                    in or access the Games at any time while located in the
                    United States, this clause (Dispute Resolution and Agreement
                    to Arbitrate on an Individual Basis) shall be construed
                    under and be subject to the Federal Arbitration Act,
                    notwithstanding any other choice of law set out in these
                    Terms and Conditions. By agreeing to these Terms and
                    Conditions, and to the extent permitted by applicable law,
                    you and SpinSaga Inc agree that any and all past, present
                    and future disputes, claims or causes of action between you
                    and SpinSaga Inc arising out of or relating to these Terms
                    and Conditions, the Platform and Games, the formation of
                    these Terms and Conditions or any other dispute between you
                    and SpinSaga Inc or any of SpinSaga Inc's licensors,
                    distributors, suppliers or agents, and whether arising prior
                    to or after your agreement to this clause, (collectively,
                    "Dispute(s)") will be governed by the procedure outlined
                    below. You and SpinSaga Inc further agree that any
                    arbitration pursuant to this clause shall not proceed as a
                    class, group or representative action.
                  </p>
                  <p>
                    Informal Dispute Resolution: SpinSaga Inc wants to address
                    your concerns without the need for a formal legal dispute.
                    Before filing a claim against SpinSaga Inc, you agree to try
                    to resolve the Dispute informally by contacting Customer
                    Support. Similarly, if you have provided an email address to
                    us as part of your Customer Account registration, SpinSaga
                    Inc agrees to do the same. If a dispute is not resolved
                    within 30 days after the email noting the Dispute is sent,
                    you or SpinSaga Inc may initiate an arbitration proceeding
                    as described below.
                  </p>
                  <p>
                    We Both Agree to Arbitrate: By agreeing to these Terms and
                    Conditions, and to the extent permitted by applicable law,
                    you and SpinSaga Inc each and both agree to resolve any
                    Disputes – including any Dispute concerning the
                    enforceability, validity, scope or severability of this
                    agreement to arbitrate – through final and binding
                    arbitration as discussed herein. Opt-out of Agreement to
                    Arbitrate: You may decline this agreement to arbitrate by
                    contacting arbitration@spinsagacasino.com within 30 days of
                    first accepting these Terms and Conditions and stating that
                    you (include your first and last name, email address and
                    postal address) decline this arbitration agreement. By
                    opting out of the agreement to arbitrate, you will not be
                    precluded from playing the Games, but you and SpinSaga Inc
                    will not be permitted to invoke the mutual agreement to
                    arbitrate to resolve Disputes under the Terms and Conditions
                    otherwise provided herein.
                  </p>

                  <p>
                    Arbitration Procedures and Fees: You and SpinSaga Inc agree
                    that JAMS ("JAMS") will administer the arbitration under its
                    Streamlined Rules in effect at the time arbitration is
                    sought ("JAMS Rules"). Those rules are available at
                    www.jamsadr.com. Arbitration will proceed on an individual
                    basis and will be handled by a sole arbitrator in accordance
                    with those rules; provided that the parties shall be
                    presented with a list of five potential arbitrators and
                    shall rank those potential arbitrators in order of
                    preference. JAMS shall select the arbitrator with the
                    highest combined preference (e.g., if both parties select a
                    potential arbitrator as their top preference, that
                    arbitrator will be selected). You and SpinSaga Inc further
                    agree that, unless and only to the extent prohibited under
                    JAMS Rules, the arbitration will be held in New York, New
                    York, or, at either your or our election, will be conducted
                    telephonically or via other remote electronic means. The
                    JAMS Rules will govern payment of all arbitration fees. The
                    arbitrator shall be authorized to award any remedies,
                    including injunctive relief, that would be available to you
                    in an individual lawsuit and that are not waivable under
                    applicable law.
                  </p>

                  <p>
                    Proceedings Requiring Three Arbitrators: Notwithstanding any
                    language to the contrary in clause, if a party either seeks
                    a monetary award in excess of five hundred thousand dollars
                    ($500,000) or seeks an equitable form of relief that would
                    significantly impact other SpinSaga Inc users, in each case
                    as reasonably determined by either party, the parties agree
                    that such arbitration will proceed on an individual basis
                    but will be handled by a panel of three (3) arbitrators and
                    take place pursuant to the JAMS Comprehensive Arbitration
                    Rules and Procedures (“JAMS Comprehensive Rules”). Each
                    party shall select one neutral arbitrator, with the third
                    neutral arbitrator selected in accordance with the JAMS
                    Comprehensive Rules. That third arbitrator shall serve as
                    chair of the arbitral panel and must be a retired judge with
                    experience arbitrating or mediating disputes. In the event
                    of disagreement as to whether the threshold for a
                    three-arbitrator panel has been met, the sole arbitrator
                    appointed in accordance with this clause, shall make that
                    determination. If the arbitrator determines a three-person
                    panel is appropriate, the arbitrator may – if selected by
                    either party or through the JAMS selection process –
                    participate in the arbitral panel. You and SpinSaga Inc
                    agree that any award issued by a three-arbitrator panel may
                    be appealed in accordance with the JAMS Optional Arbitration
                    Appeal Procedures at either party’s election.
                  </p>

                  <p>
                    Batch Arbitration: To increase efficiency of resolution, in
                    the event 25 or more similar arbitration demands against
                    SpinSaga Inc, presented by or with the assistance of the
                    same law firm or organization or group of law firms or
                    organizations working in coordination, are submitted to JAMS
                    in accordance with the rules described above within a 30-day
                    period, JAMS shall consolidate those arbitrations as
                    contemplated in the JAMS Rules by (a) grouping the
                    arbitration demands into batches of no more than 25 demands
                    per batch (plus, to the extent there are fewer than 25
                    arbitration demands left over after the batching described
                    above, a final batch consisting of the remaining demands);
                    and (b) providing for resolution of each batch as a single
                    arbitration with one set of filing and administrative fees
                    and one arbitrator assigned per batch. For avoidance of
                    doubt, consolidation does not require that all arbitrations
                    in a single batch be decided the same, nor does it impair
                    your right to present any evidence or argument that you
                    think particular to your case, so long as consistent with
                    JAMS Rules. You agree to cooperate in good faith with
                    SpinSaga Inc and JAMS to implement such a batch approach to
                    resolution and fees.
                  </p>
                  <p>
                    Class Action and Collective Arbitration Waiver TO THE
                    MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, NEITHER YOU NOR
                    SPINSAGA INC SHALL BE ENTITLED: TO CONSOLIDATE, JOIN OR
                    COORDINATE DISPUTES BY OR AGAINST OTHER INDIVIDUALS OR
                    ENTITIES; TO PARTICIPATE IN ANY GROUP, CLASS, COLLECTIVE OR
                    MASS ARBITRATION OR LITIGATION; TO ARBITRATE OR LITIGATE ANY
                    DISPUTE IN A REPRESENTATIVE CAPACITY, INCLUDING AS A
                    REPRESENTATIVE MEMBER OF A CLASS; TO ARBITRATE OR LITIGATE
                    ANY DISPUTE IN A PRIVATE ATTORNEY GENERAL CAPACITY; OR
                    OTHERWISE TO SEEK TO RECOVER LOSSES OR DAMAGES (WHETHER FOR
                    YOURSELF OR OTHERS) INCURRED BY A THIRD PARTY. IN CONNECTION
                    WITH ANY DISPUTE (AS DEFINED ABOVE), ANY AND ALL SUCH RIGHTS
                    ARE HEREBY EXPRESSLY AND UNCONDITIONALLY WAIVED.
                    NOTWITHSTANDING ANYTHING TO THE CONTRARY SET FORTH IN THESE
                    TERMS AND CONDITIONS, IN THE EVENT ALL OR ANY PORTION OF
                    CLAUSES (DISPUTE RESOLUTION AND AGREEMENT TO ARBITRATE ON AN
                    INDIVIDUAL BASIS) ARE FOUND TO BE INVALID OR LESS THAN FULLY
                    ENFORCEABLE IN A PARTICULAR DISPUTE, THEN THE ENTIRETY OF
                    THIS CLAUSE (DISPUTE RESOLUTION AND AGREEMENT TO ARBITRATE
                    ON AN INDIVIDUAL BASIS) MAY BE DEEMED VOID AND AS HAVING NO
                    EFFECT FOR PURPOSES OF THAT DISPUTE, UPON EITHER PARTY'S
                    ELECTION.
                  </p>
                  <p>
                    Exceptions to Agreement to Arbitrate for Temporary Relief:
                    Notwithstanding the other provisions of this clause 24
                    (Dispute Resolution and Agreement to Arbitrate on an
                    Individual Basis), either you or we may bring an action in a
                    court as authorized by any clauses for temporary injunctive
                    relief until an arbitrator has been empaneled and can
                    determine whether to continue, terminate or modify such
                    relief.
                  </p>
                </p>
                <h3>Other</h3>
                <p>
                  <strong>Entire Agreement</strong>
                  <p>
                    These Terms and Conditions constitute the entire agreement
                    between you and us with respect to your Participation and,
                    save in the case of fraud, supersede all prior or
                    contemporaneous communications and proposals, whether
                    electronic, oral or written, between you and us with respect
                    to your Participation.
                  </p>
                </p>
                <p>
                  <strong>Amendments</strong>
                  <p>
                    SpinSaga Inc reserves the right to amend these Terms and
                    Conditions, or to implement or amend any procedures, at any
                    time. Any amendments will be published on the Platform and
                    such changes will be binding and effective immediately.
                  </p>
                  <p>
                    Whenever we amend these Terms and Conditions in a way that
                    would limit your current rights or which may be to your
                    detriment, we will notify you upon your next visit to the
                    Platform and you will be required to reconfirm your
                    acceptance prior to playing any Games. If you do not agree
                    to the amended Terms and Conditions, you must stop using the
                    Platform. Access to the platform and use of your account may
                    be restricted if you do not agree to the amended Terms and
                    Conditions.
                  </p>
                </p>
                <p>
                  <strong>Tax</strong>
                  <p>
                    You are solely responsible for any taxes which apply to any
                    Prizes that you collect from your Participation.
                  </p>
                </p>
                <p>
                  <strong>Force Majeure</strong>
                  <p>
                    SpinSaga Inc will not be liable or responsible for any
                    failure to perform, or delay in performance of, any of our
                    obligations under these Terms and Conditions that is caused
                    by events outside of our reasonable control.
                  </p>
                </p>
                <p>
                  <strong>No agency</strong>
                  <p>
                    Nothing in these Terms and Conditions will be construed as
                    creating any agency, partnership, trust arrangement,
                    fiduciary relationship or any other form of joint enterprise
                    between you and us.
                  </p>
                </p>
                <p>
                  <strong>Severability</strong>
                  <p>
                    If any of the Terms and Conditions are determined by any
                    competent authority to be invalid, unlawful, or
                    unenforceable to any extent, such term, condition or
                    provision will, to that extent, be severed from these Terms
                    and Conditions. All remaining terms, conditions and
                    provisions will continue to be valid to the fullest extent
                    permitted by law. In such cases, the part deemed invalid or
                    unenforceable will be amended in a manner consistent with
                    the applicable law to reflect, as closely as possible, the
                    original import of the invalid or unenforceable provision.
                  </p>
                </p>
                <p>
                  <strong>Explanation of Terms and Conditions</strong>
                  <p>
                    We consider these Terms and Conditions to be open and fair.
                    If you need any explanation regarding these Terms and
                    Conditions or any other part of our Platform, contact
                    Customer Support.
                  </p>
                  <p>
                    The Terms and Conditions prevail over any communication via
                    email or chat.
                  </p>
                  <p>All correspondence between you and us may be recorded.</p>
                </p>
                <p>
                  <strong>Assignment</strong>
                  <p>
                    These Terms and Conditions are personal to you, and are not
                    assignable, transferable or sub-licensable by you except
                    with our prior written consent. We reserve the right to
                    assign, transfer or delegate any of our rights and
                    obligations hereunder to any third party without notice to
                    you.
                  </p>
                </p>
                <p>
                  <strong>Business Transfers</strong>
                  <p>
                    In the event of a change of control, merger, acquisition, or
                    sale of assets of the SpinSaga Inc, your Customer Account
                    and associated data may be part of the assets transferred to
                    the purchaser or acquiring party. In such an event, we will
                    provide you with notice via email or via our Platform
                    explaining your options with regard to the transfer of your
                    Customer Account.
                  </p>
                </p>
                <p>
                  <strong>Language</strong>
                  <p>
                    These Terms and Conditions may be published in several
                    languages for information purposes and ease of access by
                    players, but will all reflect the same principles. It is
                    only the English version that is the legal basis of the
                    relationship between you and us and in case of any
                    discrepancy between a non-English version and the English
                    version of these Terms and Conditions, the English version
                    will prevail.
                  </p>
                </p>
                <p>
                  <strong>Applicable Law and Jurisdiction</strong>
                  <p>
                    These Terms and Conditions, your use of the Platform and our
                    entire relationship will be governed and interpreted in
                    accordance with the laws of the State of Wyoming in the
                    United States, without regard for its choice of conflict of
                    law principles. The application of the United Nations
                    Convention on Contracts for the International Sale of Goods
                    is specifically excluded.
                  </p>

                  <p>
                    Subject to above clauses and absent an express statement to
                    the contrary, in the event of any conflict or inconsistency
                    between any provision of these Terms and Conditions and a
                    provision of the Responsible Gaming Policy, Sweepstakes
                    Rules or Customer Acceptance Policy, these Terms and
                    Conditions shall control solely to the extent necessary to
                    resolve the conflict or inconsistency.
                  </p>

                  <p>
                    Subject to above clauses, the parties agree that any
                    dispute, controversy, or claim arising out of or in
                    connection with these Terms and Conditions, or the breach,
                    termination or invalidity of these Terms and Conditions,
                    will be submitted exclusively to the courts in the United
                    States, and you and we consent to the venue and personal
                    jurisdiction of those courts. Notwithstanding the foregoing,
                    the parties agree that either party may move to compel
                    arbitration or to enforce an arbitral award issued hereunder
                    before any court of competent jurisdiction.
                  </p>
                  <p>
                    <strong>SpinSaga reserves the right to:</strong>
                    <p>
                      <ul>
                        <li>
                          Update or modify these Terms and Conditions at any
                          time without prior notice
                        </li>
                        <li>
                          Remove or update coins if our system has been misused
                          or manipulated
                        </li>
                        <li>
                          Cancel or suspend any promotion, program, or reward at
                          any time
                        </li>
                      </ul>
                      <p>
                        By participating in our Refer a Friend program or using
                        our services, you acknowledge that you have read,
                        understood, and agree to be bound by these Terms and
                        Conditions.
                      </p>
                    </p>
                  </p>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermCondition;