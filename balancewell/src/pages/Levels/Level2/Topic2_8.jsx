import { Card, Typography, Divider } from 'antd';
 
const { Title, Paragraph, Link } = Typography;
 
const Topic2_8 = () => {
  return (
<div style={{ padding: '2rem', maxWidth: 1000, margin: '0 auto' }}>
<Card>
<Typography>
<Title level={2}>Module 2 – Topic 8: Understanding Centrelink Rent Assistance</Title>
 
          <Divider orientation="left">What You’ll Understand After This Topic</Divider>
<ul>
<li>What Rent Assistance is and who may be eligible</li>
<li>What it can help with</li>
<li>Where to go to learn more or check eligibility</li>
</ul>
 
          <Divider orientation="left">What Is Rent Assistance?</Divider>
<Paragraph>
            In Australia, Rent Assistance is an extra payment from Centrelink to help people who are renting privately or in community housing.
            It’s not a loan — it’s a regular payment to help cover some of the cost of rent if you already receive certain Centrelink payments
            (like Age Pension, JobSeeker, Parenting Payment, etc.).
</Paragraph>
<Paragraph>
            You don’t apply for it directly — Centrelink works it out based on your situation.
</Paragraph>
 
          <Divider orientation="left">Who Might Be Eligible (Examples)</Divider>
<Paragraph>People who:</Paragraph>
<ul>
<li>Pay rent or board</li>
<li>Receive a Centrelink payment</li>
<li>Live in a private rental, boarding house, or retirement village</li>
<li>Don’t already receive housing support through public housing</li>
</ul>
 
          <Paragraph><strong>The amount you get depends on:</strong></Paragraph>
<ul>
<li>How much rent you pay</li>
<li>If you live alone or with others</li>
<li>What type of Centrelink payment you receive</li>
</ul>
 
          <Divider orientation="left">Helpful Learning Resources</Divider>
<ul>
<li>
<Link href="https://www.servicesaustralia.gov.au/rent-assistance" target="_blank">
                Services Australia – Rent Assistance
</Link>
<ul>
<li>Who can get it</li>
<li>How much you might get</li>
<li>What types of housing are included</li>
<li>How it’s calculated</li>
</ul>
</li>
<li>
<Link href="https://www.servicesaustralia.gov.au/payment-and-service-finder" target="_blank">
                Services Australia – Payment and Service Finder
</Link>
<ul>
<li>Explore Centrelink payment options</li>
<li>Estimate your payment</li>
<li>See if Rent Assistance applies to you</li>
</ul>
</li>
<li>
<Link href="https://my.gov.au" target="_blank">
                MyGov – Centrelink Login
</Link>
<ul>
<li>Update your rent details</li>
<li>See if Rent Assistance is already included</li>
<li>Communicate with Centrelink securely</li>
</ul>
</li>
</ul>
 
          <Divider orientation="left">Reflective Prompt</Divider>
<Paragraph>
            Have you ever checked if you’re getting Rent Assistance? Do you know how much of your rent is covered?
</Paragraph>
</Typography>
</Card>
</div>
  );
};
 
export default Topic2_8;
