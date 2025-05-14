import { Card, Typography, Divider } from 'antd';

const { Title, Paragraph, Link } = Typography;

const Topic2_4 = () => {
  return (
    <div className="topic-page" >
      <Card className="topic-cards">
        <Typography className="topic-text">
          <Title level={2}>Module 2 – Topic 4: How Much Rent Is Too Much?</Title>

          <Divider orientation="left">What You’ll Understand After This Topic</Divider>
          <ul>
            <li>What “rent-to-income ratio” means in Australia</li>
            <li>The common threshold used to define rent stress</li>
            <li>Where to explore this further using official tools and guides</li>
          </ul>

          <Divider orientation="left">Understanding Rent Pressure</Divider>
          <Paragraph>
            In Australia, a common way to check if your rent is affordable is to compare it to your income. This is called your rent-to-income ratio.
            It tells you what percentage of your income is going toward rent.
          </Paragraph>
          <Paragraph>
            Many services use this calculation:
            <br />
            <strong>If you spend more than 30% of your income on rent, it may be considered “rent stress.”</strong>
            <br />
            This means you might struggle to afford food, medicine, bills, or savings after paying rent.
          </Paragraph>

          <Divider orientation="left">Example Calculation</Divider>
          <ul>
            <li>If you earn $500 per week</li>
            <li>And pay $180 per week in rent</li>
            <li>Then: $180 ÷ $500 = 36% of your income goes to rent</li>
            <li>That’s above 30%, and may cause pressure in other areas of life</li>
          </ul>

          <Divider orientation="left">Helpful Learning Resources</Divider>
          <ul>
            <li>
              <Link href="https://moneysmart.gov.au/managing-debt/rent-and-mortgage-stress" target="_blank">
                Moneysmart – Rent and Mortgage Stress
              </Link>
              <ul>
                <li>What rent stress means</li>
                <li>How to calculate your rent-to-income ratio</li>
                <li>What to do if you're at risk</li>
              </ul>
            </li>
            <li>
              <Link href="https://www.housing.vic.gov.au/problems-paying-rent" target="_blank">
                Housing Victoria – Rent Problems & Hardship
              </Link>
              <ul>
                <li>What to do if rent is too high</li>
                <li>Your rights as a renter in Victoria</li>
                <li>Where to get multilingual support</li>
              </ul>
            </li>
          </ul>

          <Divider orientation="left">Reflective Prompt</Divider>
          <Paragraph>
            Think about your weekly or monthly rent. How does it compare to what you earn?
            Do you ever skip things like food or bills to cover rent?
          </Paragraph>
        </Typography>
      </Card>
    </div>
  );
};

export default Topic2_4;