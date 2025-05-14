import { Card, Typography, Divider } from 'antd';

const { Title, Paragraph, Text, Link } = Typography;

const Topic1_2 = () => {
  return (
  <div className="topic-page" >
      <Card className="topic-cards">
        <Typography className="topic-text">
          <Title level={2}>Module 1 – Topic 2: What is Financial Literacy?</Title>

          <Divider orientation="left">What You’ll Learn</Divider>
          <ul>
            <li>What financial literacy means in simple terms</li>
            <li>Why it’s important for everyday life, especially as you get older</li>
            <li>Examples of how it helps with budgeting, health, and aging well</li>
          </ul>

          <Divider orientation="left">Introduction</Divider>
          <Paragraph>
            Financial literacy means knowing how to manage your money in daily life. It includes things like:
          </Paragraph>
          <ul>
            <li>Understanding where your money goes</li>
            <li>Knowing how to budget</li>
            <li>Being able to make choices about saving, spending, or asking for help</li>
          </ul>
          <Paragraph>
            It’s not about being perfect — it’s about feeling confident and in control.
          </Paragraph>

          <Divider orientation="left">Why It Matters For You</Divider>
          <ul>
            <li>Life in Australia can be expensive — rent, food, medicines</li>
            <li>If you know how to manage your money, you feel less stressed</li>
            <li>You don’t need to earn a lot to start being financially smart</li>
            <li>It's never too late to learn, no matter your background or education</li>
          </ul>
          <Paragraph>
            Financial literacy gives you more control, peace of mind, and dignity — especially as you age.
          </Paragraph>

          <Divider orientation="left">Helpful Links</Divider>
          <ul>
            <li>
              <Link href="https://moneysmart.gov.au/teaching/financial-literacy-basics" target="_blank">
                Moneysmart – Financial Literacy Basics
              </Link>
              <ul>
                <li>What financial literacy is</li>
                <li>Why it's important in daily life</li>
                <li>Simple tips for getting started</li>
              </ul>
            </li>
            <li>
              <Link href="https://goodshep.org.au/services/financial-support/" target="_blank">
                Good Shepherd – Financial Support Services
              </Link>
              <ul>
                <li>Financial education and coaching</li>
                <li>No-interest loans and emergency support</li>
                <li>Local workshops in plain English</li>
              </ul>
            </li>
            <li>
              <Link href="https://ndh.org.au/" target="_blank">
                National Debt Helpline
              </Link>
              <ul>
                <li>Talk to a financial counsellor</li>
                <li>Learn how to handle bills or debt safely</li>
                <li>Multilingual support available</li>
              </ul>
            </li>
          </ul>

          <Divider orientation="left">Key Takeaway</Divider>
          <Paragraph>
            Financial literacy doesn’t mean knowing everything. It means understanding enough to make decisions, feel secure, and avoid stress. And you can start learning today.
          </Paragraph>
        </Typography>
      </Card>
    </div>
  );
};

export default Topic1_2;