import { Card, Typography, Divider } from 'antd';

const { Title, Paragraph, Text, Link } = Typography;

const Topic1_4 = () => (
  <div style={{ padding: '2rem', maxWidth: 800, margin: '0 auto' }}>
    <Card>
      <Typography>
        <Title level={2}>Module 1 – Topic 4: What is Rent Stress?</Title>

        <Divider orientation="left">What You'll Learn</Divider>
        <ul>
          <li>What "rent stress" means in Australia</li>
          <li>How to know if you're spending too much on rent</li>
          <li>Why this matters for your health, savings, and long-term wellbeing</li>
        </ul>

        <Divider orientation="left">Introduction</Divider>
        <Paragraph>
          Rent stress happens when you spend too much of your income on rent, 
          leaving not enough for food, medicine, transport, or savings.
        </Paragraph>
        <Paragraph>
          In Australia, if you spend more than <Text strong>30% of your income</Text> on rent, 
          you're considered to be in rent stress.
        </Paragraph>
        <Paragraph>
          Example: If you earn $2,000 per month and your rent is over $600, 
          that's more than 30% — this might make it hard to cover other needs.
        </Paragraph>

        <Divider orientation="left">Visual Explainer</Divider>
        <Paragraph>
          <Text strong>"Are You in Rent Stress?"</Text>
        </Paragraph>

        <Divider orientation="left">Why It Matters</Divider>
        <ul>
          <li>Long-term rent stress can lead to financial anxiety, debt, and poor health</li>
          <li>Makes it hard to save or plan for the future</li>
          <li>May force you to skip meals, delay healthcare, or avoid outings</li>
          <li>Knowing your rent-to-income ratio helps make better housing decisions</li>
        </ul>

        <Divider orientation="left">Helpful Links</Divider>
        <ul>
          <li>
            <Link 
              href="https://moneysmart.gov.au/housing/renting#rent-stress" 
              target="_blank"
            >
              Moneysmart - Rent and Mortgage Stress
            </Link>
            <ul>
              <li>What rent stress is</li>
              <li>How to calculate if you're at risk</li>
              <li>What to do next</li>
            </ul>
          </li>
          <li>
            <Link 
              href="https://www.tenantsvic.org.au/advice-resources/renting-help/" 
              target="_blank"
            >
              eTenants Victoria - Renting Rights & Help
            </Link>
            <ul>
              <li>Understand rights (evictions, rent increases)</li>
              <li>Get support for hardship</li>
              <li>Access multilingual advice</li>
            </ul>
          </li>
          <li>
            <Link 
              href="https://www.planmyvictoria.vic.gov.au/suburb-comparison-tool" 
              target="_blank"
            >
              MyVictoria - Compare Suburbs
            </Link>
            <ul>
              <li>Rental prices by suburb</li>
              <li>Service access like transport, clinics, and shops</li>
              <li>Info for affordable living planning</li>
            </ul>
          </li>
        </ul>

        <Divider orientation="left">Real-Life Example</Divider>
        <Paragraph>
          Bao, 57, earns $400 per week and pays $250 in rent. That's over 60% of his income. 
          After using BalanceWell's rent tool, he found nearby suburbs with lower rent and 
          better services. Now he's saving $40 a week.
        </Paragraph>

        <Divider orientation="left">Key Takeaway</Divider>
        <Paragraph>
          If your rent is more than <Text strong>30% of your income</Text>, 
          you may be in rent stress. There is support available — and there are 
          ways to plan smarter for your housing needs.
        </Paragraph>
      </Typography>
    </Card>
  </div>
);

export default Topic1_4;