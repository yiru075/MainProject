import { Card, Typography, Divider } from 'antd';

const { Title, Paragraph, Text, Link } = Typography;

const Topic1_7 = () => (
  <div style={{ padding: '2rem', maxWidth: 800, margin: '0 auto' }}>
    <Card>
      <Typography>
        <Title level={2}>Module 1 – Topic 7: What is “Safe to Spend” and How Do I Know Mine?</Title>

        <Divider orientation="left">What You’ll Learn</Divider>
        <ul>
          <li>What “Safe to Spend” means</li>
          <li>Why it helps with daily money confidence</li>
          <li>A simple way to estimate your safe spending amount</li>
        </ul>

        <Divider orientation="left">Introduction</Divider>
        <Paragraph>
          “Safe to Spend” means the money you have left after paying for the essentials — like rent, bills, food, and transport.
        </Paragraph>
        <Paragraph>
          It’s what you can use for other things — like takeaway, gifts, outings, or small savings — without going short later.
        </Paragraph>
        <Paragraph>
          Knowing your safe-to-spend amount helps you feel confident that your needs are covered first.
        </Paragraph>

        <Divider orientation="left">Visual Explainer</Divider>
        <Paragraph><Text strong>“How to Work Out Your Safe to Spend”</Text></Paragraph>

        <Divider orientation="left">Why It Matters</Divider>
        <ul>
          <li>Helps avoid “accidental overspending”</li>
          <li>Supports smarter day-to-day decisions</li>
          <li>Reduces stress and guilt around money</li>
          <li>Gives you more control over your week</li>
        </ul>
        <Paragraph>
          Think of it like this: “First pay what must be paid. Then see what’s safe to use for the rest.”
        </Paragraph>

        <Divider orientation="left">Helpful Links (With Explanation)</Divider>
        <ul>
          <li>
            <Link href="https://moneysmart.gov.au/budgeting/budget-planner" target="_blank">Moneysmart – Budget Planner</Link> – This tool helps you:
            <ul>
              <li>List your income and expenses</li>
              <li>See how much is left over</li>
              <li>Adjust your plan to reduce stress</li>
            </ul>
          </li>
          <li>
            <Link href="https://mymoneycare.org.au/" target="_blank">MyMoneyCare – Everyday Spending Tips</Link> – Offers tips on:
            <ul>
              <li>Weekly cash flow</li>
              <li>Dealing with tight budgets</li>
              <li>Making room for savings in small ways</li>
            </ul>
          </li>
          <li>
            <Link href="https://www.servicesaustralia.gov.au/payment-and-service-finder" target="_blank">Services Australia – Payment and Income Calculator</Link> – For people on Centrelink, this tool helps you:
            <ul>
              <li>Check your benefits</li>
              <li>Plan based on payment dates</li>
              <li>Estimate how much is left each week</li>
            </ul>
          </li>
        </ul>

        <Divider orientation="left">Real-Life Example</Divider>
        <Paragraph>
          Leila, 52, always ran out of money early in the month. After learning about “safe to spend,” she calculated her basics,
          set a weekly limit, and now avoids stress by using cash envelopes for takeaway or shopping.
        </Paragraph>

        <Divider orientation="left">Key Takeaway</Divider>
        <Paragraph>
          <Text strong>Knowing your “safe to spend” amount helps you feel secure, make better choices, and avoid money stress —
          even if your income is low or casual.</Text>
        </Paragraph>
      </Typography>
    </Card>
  </div>
);

export default Topic1_7;
