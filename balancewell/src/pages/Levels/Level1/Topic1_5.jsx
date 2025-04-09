import { Card, Typography, Divider } from 'antd';
 
const { Title, Paragraph, Link } = Typography;
 
const Topic1_5 = () => {
  return (
<div style={{ padding: '2rem', maxWidth: 800, margin: '0 auto' }}>
<Card>
<Typography>
<Title level={2}>Module 1 – Topic 5: What is Healthy Food After 40?</Title>
 
          <Divider orientation="left">What You’ll Learn</Divider>
<ul>
<li>What your body needs as you age (key nutrients)</li>
<li>Why eating well supports energy, health, and aging</li>
<li>Simple food choices that support your budget and your wellbeing</li>
</ul>
 
          <Divider orientation="left">Introduction</Divider>
<Paragraph>
            As we get older, our bodies need different kinds of food to stay strong and feel good.
            Healthy eating isn’t about fancy food or dieting. It’s about choosing foods that give your body the energy, strength, and protection it needs — especially when you’re 40 and beyond.
</Paragraph>
 
          <Divider orientation="left">Why It’s Important After 40</Divider>
<ul>
<li>Your bones need more calcium</li>
<li>Your muscles need protein to stay strong</li>
<li>Your body may digest food more slowly — you need more fiber</li>
<li>You may feel tired more often — eating well helps fight fatigue</li>
<li>Health problems like high blood pressure or diabetes become more common — food plays a big role in managing or preventing them</li>
</ul>
 
          <Divider orientation="left">Helpful Links</Divider>
<ul>
<li>
<Link href="https://www.eatforhealth.gov.au/" target="_blank">
                Eat For Health – Australian Dietary Guidelines
</Link>
<ul>
<li>Understand food groups</li>
<li>Get age-appropriate eating advice</li>
<li>See sample healthy eating plans</li>
</ul>
</li>
<li>
<Link href="https://www.healthdirect.gov.au/nutrition-after-40" target="_blank">
                HealthDirect – Nutrition After 40
</Link>
<ul>
<li>What nutrients matter most as you age</li>
<li>What to eat less of (e.g., salt, sugar)</li>
<li>How food supports aging and energy</li>
</ul>
</li>
<li>
<Link href="https://nutritionaustralia.org/" target="_blank">
                Nutrition Australia – Culturally Diverse Nutrition Tips
</Link>
<ul>
<li>Nutrition guides that respect cultural food traditions</li>
<li>Multilingual resources</li>
<li>Tips for affordable and healthy traditional meals</li>
</ul>
</li>
</ul>
 
          <Divider orientation="left">Real-Life Example</Divider>
<Paragraph>
            Fatima, 59, often skipped meals when money was tight. She started including lentils, frozen vegetables, and oats in her weekly plan — all cheap, filling, and good for her health. She now feels more energetic and spends less.
</Paragraph>
 
          <Divider orientation="left">Key Takeaway</Divider>
<Paragraph>
            After 40, your body needs more support from food — and small changes can make a big difference. You don’t need to spend a lot to eat well.
</Paragraph>
</Typography>
</Card>
</div>
  );
};
 
export default Topic1_5;