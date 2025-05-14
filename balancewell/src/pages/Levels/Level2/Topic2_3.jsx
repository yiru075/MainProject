import { Card, Typography, Divider } from 'antd';

const { Title, Paragraph, Link } = Typography;

const Topic2_3 = () => {
  return (
    <div className="topic-page" >
      <Card className="topic-cards">
        <Typography className="topic-text">
          <Title level={2}>Module 2 – Topic 3: Difference Between Needs and Wants</Title>

          <Divider orientation="left">What You’ll Understand After This Topic</Divider>
          <ul>
            <li>What “needs” and “wants” usually mean in personal budgeting</li>
            <li>Why this difference matters when managing money</li>
            <li>How recognising the two can support everyday spending decisions</li>
            <li>Where to explore this further using trusted sources</li>
          </ul>

          <Divider orientation="left">What Are Needs and Wants?</Divider>
          <Paragraph>
            When managing your money, it’s common to hear the words “needs” and “wants.”
          </Paragraph>
          <ul>
            <li><strong>Needs</strong> are things you must have to live — like rent, food, medicine, and basic clothing.</li>
            <li><strong>Wants</strong> are extras — things that are nice to have but not essential, like takeaway, subscriptions, or brand-name items.</li>
          </ul>
          <Paragraph>
            Understanding the difference between them doesn’t mean removing joy — it’s just about recognising which items you must cover first.
          </Paragraph>

          <Divider orientation="left">Helpful Learning Resources</Divider>
          <ul>
            <li>
              <Link href="https://moneysmart.gov.au/managing-on-a-low-income" target="_blank">
                Moneysmart – Managing on a Low Income
              </Link>
              <ul>
                <li>What needs and wants look like in daily life</li>
                <li>How to prioritise essential costs</li>
                <li>How to deal with rising living costs</li>
              </ul>
            </li>
            <li>
              <Link href="https://www.nerdwallet.com/article/finance/budgeting-basics" target="_blank">
                Nerdwallet – Budgeting Basics
              </Link>
              <ul>
                <li>How to list your expenses</li>
                <li>Why it’s important to plan for needs first</li>
                <li>Where small spending habits can be reviewed</li>
              </ul>
            </li>
            <li>
              <Link href="https://moneysmart.gov.au/your-money-and-you" target="_blank">
                ASIC – Your Money and You
              </Link>
              <ul>
                <li>How people make money decisions</li>
                <li>What happens when wants become habits</li>
                <li>How awareness can support long-term wellbeing</li>
              </ul>
            </li>
          </ul>

          <Divider orientation="left">Reflective Prompt</Divider>
          <Paragraph>
            Think about something you bought recently — was it a need or a want? What would you cut first if you had to cover an emergency cost?
          </Paragraph>
        </Typography>
      </Card>
    </div>
  );
};

export default Topic2_3;
