import { Card, Typography, Divider } from 'antd';
 
const { Title, Paragraph, Link } = Typography;
 
const Topic2_2 = () => {
  return (
<div style={{ padding: '2rem', maxWidth: 800, margin: '0 auto' }}>
<Card>
<Typography>
<Title level={2}>Module 2 – Topic 2: How Compound Interest Grows Your Super</Title>
 
          <Divider orientation="left">What You’ll Understand After This Topic</Divider>
<ul>
<li>What compound interest means in the context of superannuation</li>
<li>How small amounts in super can grow over time</li>
<li>Why super tends to grow faster the earlier it’s started</li>
<li>Where to go to explore this concept further</li>
</ul>
 
          <Divider orientation="left">What Is Compound Interest?</Divider>
<Paragraph>
            In Australia, your superannuation fund doesn’t just store money — it also invests it. Over time, the returns (or earnings) made from those investments are added back into your balance.
            Then those returns earn more returns.
</Paragraph>
<Paragraph>
            This is called compound interest — when your money earns money, and that new money also earns money. It’s a gradual process, but over many years it can make a big difference.
</Paragraph>
 
          <Divider orientation="left">Helpful Learning Resources</Divider>
<ul>
<li>
<Link href="https://moneysmart.gov.au/grow-your-money/compound-interest" target="_blank">
                Moneysmart – Compound Interest Explained
</Link>
<ul>
<li>What compound interest is</li>
<li>How it’s different from simple interest</li>
<li>Why time is an important factor in growing your money</li>
</ul>
</li>
<li>
<Link href="https://moneysmart.gov.au/how-super-works/super-and-investing" target="_blank">
                Moneysmart – Super and Investing
</Link>
<ul>
<li>What types of things your super is invested in</li>
<li>How investment earnings affect your balance</li>
<li>What happens if the market goes up or down</li>
</ul>
</li>
<li>
<Link href="https://www.ato.gov.au/Individuals/Super/Growing-your-super/" target="_blank">
                ATO – How Your Super Grows
</Link>
<ul>
<li>Where super growth comes from</li>
<li>What contributions are (employer, personal)</li>
<li>The role of investment earnings in balance changes</li>
</ul>
</li>
</ul>
 
          <Divider orientation="left">Reflective Prompt</Divider>
<Paragraph>
            Have you ever noticed your super balance grow — even when you didn’t add to it? Do you know what part of your super came from investments?
</Paragraph>
</Typography>
</Card>
</div>
  );
};
 
export default Topic2_2;