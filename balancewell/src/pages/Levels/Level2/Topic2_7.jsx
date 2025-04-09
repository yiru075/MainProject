import { Card, Typography, Divider, Table } from 'antd';
 
const { Title, Paragraph, Link } = Typography;
 
const Topic2_7 = () => {
  const labelColumns = [
    {
      title: 'Section Name',
      dataIndex: 'section',
      key: 'section',
    },
    {
      title: 'What It Tells You',
      dataIndex: 'info',
      key: 'info',
    },
  ];
 
  const labelData = [
    {
      key: '1',
      section: 'Nutrition Information Panel',
      info: 'Shows energy, sugar, fat, salt per serving',
    },
    {
      key: '2',
      section: 'Ingredients List',
      info: 'Lists ingredients from most to least in amount',
    },
    {
      key: '3',
      section: 'Serving Size',
      info: 'How much the company says is one “portion”',
    },
    {
      key: '4',
      section: '% Daily Intake',
      info: 'How much each serve gives you of a full day’s needs',
    },
  ];
 
  const nutrientsColumns = [
    {
      title: 'Nutrient',
      dataIndex: 'nutrient',
      key: 'nutrient',
    },
    {
      title: 'Keep an Eye On If You See…',
      dataIndex: 'details',
      key: 'details',
    },
  ];
 
  const nutrientsData = [
    {
      key: '1',
      nutrient: 'Salt',
      details: 'Over 400mg sodium per 100g = quite high',
    },
    {
      key: '2',
      nutrient: 'Sugar',
      details: 'Added sugars (glucose, fructose, syrup, etc.) = not just natural sugar',
    },
    {
      key: '3',
      nutrient: 'Fat',
      details: 'Look for saturated fat — aim for lower numbers',
    },
  ];
 
  return (
<div style={{ padding: '2rem', maxWidth: 1000, margin: '0 auto' }}>
<Card>
<Typography>
<Title level={2}>Module 2 – Topic 7: How to Read a Food Label (Salt, Sugar, Fats)</Title>
 
          <Divider orientation="left">What You’ll Understand After This Topic</Divider>
<ul>
<li>What nutrition labels on packaged food mean</li>
<li>Where to find key health information like salt, sugar, and fat</li>
<li>Why some numbers matter more than others</li>
<li>Where to learn more using official Australian health resources</li>
</ul>
 
          <Divider orientation="left">Why This Matters</Divider>
<Paragraph>
            Many processed foods in Australia — even ones that seem healthy — can be high in hidden salt, sugar, or unhealthy fats.
            Reading food labels helps you make informed choices, especially if you’re watching your weight, managing blood pressure, or trying to eat better on a budget.
</Paragraph>
 
          <Divider orientation="left">Where to Look on a Label</Divider>
<Table columns={labelColumns} dataSource={labelData} pagination={false} bordered />
 
          <Divider orientation="left">What to Recognise in Common Packaged Foods</Divider>
<Table columns={nutrientsColumns} dataSource={nutrientsData} pagination={false} bordered />
<Paragraph style={{ marginTop: '1rem' }}>
            Always compare using the <strong>“per 100g”</strong> column — this makes it easier to compare different products.
</Paragraph>
 
          <Divider orientation="left">Helpful Learning Resources</Divider>
<ul>
<li>
<Link href="https://responsiblefoodbusiness.com.au/food-labels" target="_blank">
                Center for Responsible Food Business – Understanding Food Labels
</Link>
<ul>
<li>What nutrition panels show</li>
<li>Ingredient lists</li>
<li>The difference between "good fats" and saturated fat</li>
</ul>
</li>
<li>
<Link href="https://www.healthdirect.gov.au/reading-food-labels" target="_blank">
                HealthDirect – Reading Food Labels
</Link>
<ul>
<li>How to compare foods using “per 100g”</li>
<li>Tips for managing sugar and sodium intake</li>
<li>Definitions of health claims (e.g. “low fat”)</li>
</ul>
</li>
<li>
<Link href="https://www.heartfoundation.org.au/recipes/understanding-food-labels" target="_blank">
                The Heart Foundation – Salt, Sugar & Fat Info
</Link>
<ul>
<li>How high salt affects blood pressure</li>
<li>What hidden sugars look like on a label</li>
<li>Foods that support heart health</li>
</ul>
</li>
</ul>
 
          <Divider orientation="left">Reflective Prompt</Divider>
<Paragraph>
            Have you ever compared two similar products? Which one had more sugar or salt than you expected?
</Paragraph>
</Typography>
</Card>
</div>
  );
};
 
export default Topic2_7;