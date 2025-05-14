import { Card, Typography, Divider } from 'antd';

const { Title, Paragraph, Text, Link } = Typography;

const Topic1_1 = () => {
  return (
    <div className="topic-page" >
      <Card className="topic-cards">
        <Typography className="topic-text">
          <Title level={2}>Module 1 – Topic 1: What is Superannuation and Why Does It Matter?</Title>

          <Divider orientation="left">What You’ll Learn</Divider>
          <ul>
            <li>What superannuation (super) is</li>
            <li>Why it’s important — even if you didn’t work full-time or in a formal job</li>
            <li>Where to go next if you want to check your super balance</li>
          </ul>

          <Divider orientation="left">Introduction</Divider>
          <Paragraph>
            Superannuation (or super) is money that’s saved for you by your employer while you're working. This money is kept in a special account — and you can access it when you retire.
          </Paragraph>
          <Paragraph>
            You might not see it in your bank account, but it's still your money. It grows slowly over time.
          </Paragraph>
          <Paragraph>
            Even if you worked part-time, casually, or had a break to care for family, you might still have some super saved.
          </Paragraph>

          <Divider orientation="left">Why It Matters For You</Divider>
          <ul>
            <li>It helps pay for your rent, food, and health when you stop working</li>
            <li>You may already have super and not know it</li>
            <li>Even a small super balance is better than nothing</li>
            <li>You don’t need to put in money yourself — your employer does (in most cases)</li>
          </ul>

          <Divider orientation="left">Helpful Links</Divider>
          <ul>
            <li>
              <Link href="https://www.ato.gov.au/" target="_blank">
                ATO – What is Superannuation?
              </Link>
              <ul>
                <li>Who gets super</li>
                <li>When it’s paid</li>
                <li>What a super fund is</li>
              </ul>
            </li>
            <li>
              <Link href="https://moneysmart.gov.au/how-super-works" target="_blank">
                Moneysmart – How Super Works
              </Link>
              <ul>
                <li>See how long-term savings can build</li>
                <li>Learn the difference between super and a normal savings account</li>
              </ul>
            </li>
            <li>
              <Link href="https://www.servicesaustralia.gov.au/retirement-income-support" target="_blank">
                Services Australia – Retirement Income Support
              </Link>
              <ul>
                <li>How the Age Pension works</li>
                <li>How to check if you’re eligible</li>
                <li>What government support is available later in life</li>
              </ul>
            </li>
          </ul>

          <Divider orientation="left">Real-Life Story</Divider>
          <Paragraph>
            Amina, 54, thought she didn’t have super because she worked casually. But when she signed in to MyGov, she found a super fund from a job years ago — with $3,000 in it.
            That small amount gave her hope. Now she checks it every few months.
          </Paragraph>

          <Divider orientation="left">Key Takeaway</Divider>
          <Paragraph>
            Super is your money for later. Even if you worked casually or took a break to care for family, you may still have it. And it’s never too late to learn more.
          </Paragraph>
        </Typography>
      </Card>
    </div>
  );
};

export default Topic1_1;