import { Card, Typography, Divider } from 'antd';
 
const { Title, Paragraph, Link } = Typography;
 
const Topic3_1 = () => {
  return (
<div style={{ padding: '2rem', maxWidth: 1000, margin: '0 auto' }}>
<Card>
<Typography>
<Title level={2}>Module 3 – Topic 1: Creating a Simple Weekly Budget</Title>
 
          <Divider orientation="left">What You’ll Learn</Divider>
<ul>
<li>What a weekly budget is</li>
<li>How it helps you manage everyday spending</li>
<li>A simple way to begin planning income and expenses</li>
<li>Where to find trusted tools to get started (if you choose)</li>
</ul>
 
          <Divider orientation="left">Introduction</Divider>
<Paragraph>
            A weekly budget is a short plan that shows:
</Paragraph>
<ul>
<li>How much money is coming in</li>
<li>How much is going out</li>
<li>What you have left at the end of the week</li>
</ul>
<Paragraph>
            It helps you know:
</Paragraph>
<ul>
<li>If you can afford to send money overseas</li>
<li>If bills are covered</li>
<li>What is “safe to spend” this week</li>
<li>How much to keep aside for rent, food, and emergencies</li>
</ul>
<Paragraph>
            You don’t have to be perfect. Just writing it down is a strong first step.
</Paragraph>
 
          <Divider orientation="left">Helpful Links</Divider>
<ul>
<li>
<Link href="https://moneysmart.gov.au/budgeting/budget-planner" target="_blank">
                Moneysmart – Budget Planner
</Link>
<ul>
<li>Add income and weekly expenses</li>
<li>See how much you have left</li>
<li>Print or save your plan</li>
</ul>
</li>
<li>
<Link href="https://www.neighbourhoodhub.org.au/budgeting-tips" target="_blank">
                The Neighbourhood Hub – Tips for Low-Income Budgeting
</Link>
<ul>
<li>What to include in your budget</li>
<li>Dealing with unexpected costs</li>
<li>Mindful ways to track spending</li>
</ul>
</li>
</ul>
 
          <Divider orientation="left">Reflective Prompt</Divider>
<Paragraph>
            Have you ever written down your weekly income and expenses?
            What surprised you most when you saw it clearly?
</Paragraph>
 
          <Divider orientation="left">Key Takeaway</Divider>
<Paragraph>
            A weekly budget helps you plan with confidence — even if you don’t earn much.
            It shows where your money goes and helps you decide what’s possible.
</Paragraph>
</Typography>
</Card>
</div>
  );
};
 
export default Topic3_1;