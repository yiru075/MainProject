import { Card, Typography, Divider } from 'antd';
 
const { Title, Paragraph, Text, Link } = Typography;
 
const Topic1_3 = () => {
  return (
<div style={{ padding: '2rem', maxWidth: 800, margin: '0 auto' }}>
<Card>
<Typography>
<Title level={2}>Module 1 – Topic 3: What is a Budget and Why Is It Helpful?</Title>
 
          <Divider orientation="left">What You’ll Learn</Divider>
<ul>
<li>What a budget is in simple words</li>
<li>Why it’s useful for planning weekly or monthly money</li>
<li>How it helps reduce stress and avoid running out of money</li>
</ul>
 
          <Divider orientation="left">Introduction</Divider>
<Paragraph>
            A budget is a simple plan for your money. It helps you see:
</Paragraph>
<ul>
<li>How much money is coming in</li>
<li>How much is going out</li>
<li>And what’s left at the end (if anything)</li>
</ul>
<Paragraph>
            It’s like a map for your money — so you don’t feel lost or surprised.
</Paragraph>
 
          <Divider orientation="left">Why It’s Helpful</Divider>
<ul>
<li>Helps you avoid running out before payday</li>
<li>Shows where your money is going</li>
<li>Helps you plan for rent, food, medicines, and emergencies</li>
<li>Helps you feel in control of your money, not afraid of it</li>
</ul>
<Paragraph>
            A budget isn’t about saying “no” to everything — it’s about choosing what matters most.
</Paragraph>
 
          <Divider orientation="left">Helpful Links</Divider>
<ul>
<li>
<Link href="https://www.nerdwallet.com/article/finance/budgeting-basics" target="_blank">
                Nerdwallet – Budgeting Basics
</Link>
<ul>
<li>What budgeting is</li>
<li>Why it’s helpful for everyday life</li>
<li>How to start small and keep it simple</li>
</ul>
</li>
<li>
<Link href="https://moneysmart.gov.au/budgeting/budget-planner" target="_blank">
                ASIC Budget Planning Tips
</Link>
<ul>
<li>Tips on income and expenses</li>
<li>Learn where money is going</li>
</ul>
</li>
<li>
<Link href="https://www.hrblock.com.au/blog/budgeting-tips/" target="_blank">
                HrBlock – Budgeting Help
</Link>
<ul>
<li>Simple guides</li>
<li>How to deal with irregular income</li>
<li>Support for people doing it tough</li>
</ul>
</li>
</ul>
 
          <Divider orientation="left">Real-Life Example</Divider>
<Paragraph>
            Joseph, 58, used to avoid looking at his money. After learning what a budget was, he started writing down rent, groceries, and transport every week.
            Now, he knows when it’s okay to send money to family — and when he needs to save.
</Paragraph>
 
          <Divider orientation="left">Key Takeaway</Divider>
<Paragraph>
            A budget is your money’s plan. It helps you spend wisely, reduce stress, and prepare for what’s next — even if your income is low or casual.
</Paragraph>
</Typography>
</Card>
</div>
  );
};
 
export default Topic1_3;