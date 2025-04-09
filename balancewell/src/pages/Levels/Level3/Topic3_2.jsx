import { Card, Typography, Divider } from 'antd';
 
const { Title, Paragraph, Link } = Typography;
 
const Topic3_2 = () => {
  return (
<div style={{ padding: '2rem', maxWidth: 1000, margin: '0 auto' }}>
<Card>
<Typography>
<Title level={2}>Module 3 – Topic 2: Tracking Your Spending with a Template</Title>
 
          <Divider orientation="left">What You’ll Learn</Divider>
<ul>
<li>What it means to “track your spending”</li>
<li>Why it helps people avoid running out of money</li>
<li>What types of simple templates or tools are available</li>
<li>Where to go to access printable or digital budget trackers</li>
</ul>
 
          <Divider orientation="left">Introduction</Divider>
<Paragraph>
            Tracking your spending means writing down or recording where your money goes — each week or each day.
            This helps you:
</Paragraph>
<ul>
<li>See what you’re spending most on</li>
<li>Find patterns (e.g. overspending on takeaway or top-ups)</li>
<li>Make changes based on facts, not feelings</li>
<li>Avoid surprises before rent or bills are due</li>
</ul>
<Paragraph>
            You can do this on paper, with a printed tracker, or using your phone.
</Paragraph>
 
          <Divider orientation="left">Helpful Links</Divider>
<ul>
<li>
<Link href="https://moneysmart.gov.au/budgeting/track-your-spending" target="_blank">
                Moneysmart – Track Your Spending
</Link>
<ul>
<li>Record everyday purchases</li>
<li>Sort by category</li>
<li>Compare spending to your plan</li>
</ul>
</li>
<li>
<Link href="https://moneysmart.gov.au/budgeting/spending-diary" target="_blank">
                Planner – Printable Spending Diary
</Link>
<ul>
<li>Track groceries, bills, medical, transport</li>
<li>Record cash or card purchases</li>
<li>Review habits over time</li>
</ul>
</li>
</ul>
 
          <Divider orientation="left">Reflective Prompt</Divider>
<Paragraph>
            What do you usually spend money on without thinking?  
            Have you ever looked at your week and been surprised where your money went?
</Paragraph>
 
          <Divider orientation="left">Key Takeaway</Divider>
<Paragraph>
            Tracking your spending helps you see the full picture — so you can make better choices, one week at a time.
</Paragraph>
</Typography>
</Card>
</div>
  );
};
 
export default Topic3_2;