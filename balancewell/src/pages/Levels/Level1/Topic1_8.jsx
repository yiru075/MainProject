import { Card, Typography, Divider } from 'antd';

const { Title, Paragraph, Link } = Typography;

const Topic1_8 = () => {
  return (
    <div className="topic-page" >
      <Card className="topic-cards">
        <Typography className="topic-text">
          <Title level={2}>Module 1 – Topic 8: Who Can Help Me with Money or Support?</Title>

          <Divider orientation="left">What You’ll Learn</Divider>
          <ul>
            <li>Where to go for trusted, free financial and wellbeing help in Australia</li>
            <li>What kind of support is available (money, rent, health, food)</li>
            <li>That asking for help is a strength, not a weakness</li>
          </ul>

          <Divider orientation="left">Introduction</Divider>
          <Paragraph>
            You don’t have to face money, stress or life worries alone. There are free, safe places in Australia that help people:
          </Paragraph>
          <ul>
            <li>Understand money</li>
            <li>Deal with debt or bills</li>
            <li>Get help with food, housing, or health</li>
            <li>Find support in your own language or community</li>
          </ul>
          <Paragraph>
            These services are confidential, respectful, and won’t judge you.
          </Paragraph>

          <Divider orientation="left">Helpful Links (With Explanation)</Divider>
          <ul>
            <li>
              <Link href="https://ndh.org.au/" target="_blank">
                National Debt Helpline – 1800 007 007
              </Link>
              <ul>
                <li>Talk to a free financial counsellor</li>
                <li>They help with bills, debts, and Centrelink</li>
                <li>Available in multiple languages</li>
              </ul>
            </li>
            <li>
              <Link href="https://askizzy.org.au/" target="_blank">
                Ask Izzy – Support Services Near You
              </Link>
              <ul>
                <li>Free meals, help with rent, mental health care</li>
                <li>Community centres and local support (postcode-based)</li>
              </ul>
            </li>
            <li>
              <Link href="https://www.servicesaustralia.gov.au/individuals" target="_blank">
                Services Australia – Payments & Help
              </Link>
              <ul>
                <li>Rent assistance, Carer payments, Age Pension</li>
                <li>How to claim and check your eligibility</li>
              </ul>
            </li>
          </ul>

          <Divider orientation="left">Real-Life Example</Divider>
          <Paragraph>
            Ravi, 56, was behind on rent and too embarrassed to ask for help. A friend showed him Ask Izzy —
            he found a local service that helped him talk to his landlord, apply for rent assistance, and get groceries.
            He says: “They listened, and I didn’t feel ashamed. I wish I’d asked earlier.”
          </Paragraph>

          <Divider orientation="left">Key Takeaway</Divider>
          <Paragraph>
            There is no shame in asking for help. Australia has free services ready to support your money, health, and housing —
            and many are designed for multicultural communities.
          </Paragraph>
        </Typography>
      </Card>
    </div>
  );
};

export default Topic1_8;