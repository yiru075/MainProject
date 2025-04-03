import { Card, Typography, Divider } from 'antd';

const { Title, Paragraph, Text, Link } = Typography;

const Topic2_4 = () => (
  <div style={{ padding: '2rem', maxWidth: 800, margin: '0 auto' }}>
    <Card>
      <Typography>
        <Title level={2}>Module 2 – Topic 4: How Much Rent Is Too Much?</Title>

        <Divider orientation="left">What You’ll Understand After This Topic</Divider>
        <ul>
          <li>What “rent-to-income ratio” means in Australia</li>
          <li>The common threshold used to define rent stress</li>
          <li>Where to explore this further using official tools and guides</li>
        </ul>

        <Divider orientation="left">Understanding Rent Pressure</Divider>
        <Paragraph>
          In Australia, a common way to check if your rent is affordable is to compare it to your income.
        </Paragraph>
        <Paragraph>
          This is called your <Text strong>rent-to-income ratio</Text>. It tells you what percentage of your income is going toward rent.
        </Paragraph>
        <Paragraph>
          Many services use this calculation:
        </Paragraph>
        <Paragraph>
          💡 If you spend more than <Text strong>30%</Text> of your income on rent, it may be considered “rent stress.”<br />
          This means you might struggle to afford food, medicine, bills, or savings after paying rent.
        </Paragraph>

        <Divider orientation="left">Example Calculation</Divider>
        <Paragraph>
          If you earn $500 per week<br />
          And pay $180 per week in rent<br />
          Then: $180 ÷ $500 = <Text strong>36%</Text> of your income goes to rent<br />
          That’s above 30%, and may cause pressure in other areas of life.
        </Paragraph>

        <Divider orientation="left">Helpful Learning Resources</Divider>
        <ul>
          <li>
            <Link href="https://moneysmart.gov.au/managing-debt/rent-and-mortgage-stress" target="_blank">Moneysmart – Rent and Mortgage Stress</Link> – This page explains what rent stress is, how to check for it, and where to seek help if rent becomes unmanageable.
            <ul>
              <li>Learn about what rent stress means</li>
              <li>How to calculate your rent-to-income ratio</li>
              <li>What to do if you're at risk</li>
            </ul>
          </li>
          <li>
            <Link href="https://tenantsvic.org.au/advice/rent-problems-and-hardship/" target="_blank">Tenants Victoria – Rent Problems & Hardship</Link> – Offers information and support for renters in Victoria, especially those facing rent hardship or negotiating rent with landlords.
            <ul>
              <li>What to do if rent is too high</li>
              <li>Your rights as a renter in Victoria</li>
              <li>Where to get multilingual support</li>
            </ul>
          </li>
          <li>
            <Link href="https://discover.data.vic.gov.au/dataset/my-victoria" target="_blank">MyVictoria – Suburb Explorer</Link> – A visual tool to explore rental prices across suburbs in Victoria.
            <ul>
              <li>View average rent by area</li>
              <li>Compare locations based on cost and services</li>
              <li>Support your long-term planning if you’re thinking of moving</li>
            </ul>
          </li>
        </ul>

        <Divider orientation="left">Reflective Prompt</Divider>
        <Paragraph>
          <Text strong>Think about your weekly or monthly rent.</Text><br />
          How does it compare to what you earn?<br />
          Do you ever skip things like food or bills to cover rent?
        </Paragraph>
      </Typography>
    </Card>
  </div>
);

export default Topic2_4;
