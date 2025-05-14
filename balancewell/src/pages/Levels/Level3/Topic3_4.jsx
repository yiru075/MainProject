import { Card, Typography, Divider, Table } from 'antd';

const { Title, Paragraph, Link } = Typography;

const Topic3_4 = () => {
  const foodStaplesColumns = [
    {
      title: 'Food Item',
      dataIndex: 'item',
      key: 'item',
    },
    {
      title: 'Cost Range',
      dataIndex: 'cost',
      key: 'cost',
    },
    {
      title: "Why It's Useful",
      dataIndex: 'benefit',
      key: 'benefit',
    },
  ];

  const foodStaplesData = [
    {
      key: '1',
      item: 'Rolled oats (1kg)',
      cost: '$2.50',
      benefit: 'Breakfast, high fiber',
    },
    {
      key: '2',
      item: 'Eggs (dozen)',
      cost: '$4.50',
      benefit: 'Protein-rich, versatile',
    },
    {
      key: '3',
      item: 'Tinned beans/lentils',
      cost: '$1 each',
      benefit: 'Fiber, iron, heart health',
    },
    {
      key: '4',
      item: 'Frozen veggies (1kg)',
      cost: '$2–3',
      benefit: 'Long shelf life, vitamins',
    },
    {
      key: '5',
      item: 'Brown rice (2kg)',
      cost: '$3.50',
      benefit: 'Long-lasting, slow energy release',
    },
    {
      key: '6',
      item: 'Tinned tuna',
      cost: '$1.20–$2',
      benefit: 'Protein, omega-3',
    },
    {
      key: '7',
      item: 'Fresh seasonal veg',
      cost: '$1–2 each',
      benefit: 'Supports immunity, gut health',
    },
    {
      key: '8',
      item: 'Milk (1L) or soy milk',
      cost: '$1.80–$2.50',
      benefit: 'Calcium and vitamin D',
    },
  ];

  const mealPlanColumns = [
    {
      title: 'Meal Time',
      dataIndex: 'meal',
      key: 'meal',
    },
    {
      title: 'Sample Meals – Culturally Flexible Options',
      dataIndex: 'samples',
      key: 'samples',
    },
  ];

  const mealPlanData = [
    {
      key: '1',
      meal: 'Breakfast',
      samples: 'Oats with milk and banana / Boiled eggs with toast',
    },
    {
      key: '2',
      meal: 'Lunch',
      samples: 'Rice + lentil curry / Tuna salad with chickpeas',
    },
    {
      key: '3',
      meal: 'Dinner',
      samples: 'Stir-fried frozen veg + egg on rice / Chickpea stew + flatbread',
    },
    {
      key: '4',
      meal: 'Snacks',
      samples: 'Carrot sticks, seasonal fruit, hard-boiled egg',
    },
  ];

  return (
    <div className="topic-page" >
      <Card className="topic-cards">
        <Typography className="topic-text">
          <Title level={2}>Module 3 – Topic 4: Sample Weekly Meal Plan Under $50</Title>

          <Divider orientation="left">What You’ll Learn</Divider>
          <ul>
            <li>How everyday, low-cost foods can be combined into balanced meals</li>
            <li>That healthy eating doesn’t need to be expensive</li>
            <li>Where to find culturally inclusive and affordable meal planning ideas</li>
          </ul>

          <Divider orientation="left">Introduction</Divider>
          <Paragraph>
            Eating well doesn’t always mean spending more. With the right ingredients and a simple plan, it’s possible to:
          </Paragraph>
          <ul>
            <li>Stay full</li>
            <li>Get important nutrients (like protein, fiber, calcium)</li>
            <li>Stick to a realistic grocery budget — under $50 per week</li>
          </ul>
          <Paragraph>
            This kind of meal planning supports:
          </Paragraph>
          <ul>
            <li>Energy during the day</li>
            <li>Better health as you age</li>
            <li>Less food waste and lower weekly costs</li>
          </ul>

          <Divider orientation="left">Budget-Friendly Staples (Approx. Price in AUD)</Divider>
          <Table columns={foodStaplesColumns} dataSource={foodStaplesData} pagination={false} bordered />

          <Divider orientation="left">Example 5-Day Meal Plan (Budget: ~$45)</Divider>
          <Table columns={mealPlanColumns} dataSource={mealPlanData} pagination={false} bordered />
          <Paragraph>
            These meals can be spiced or adapted to suit Vietnamese, Arabic, Indian, Chinese, Sudanese, or Sri Lankan cooking traditions.
          </Paragraph>

          <Divider orientation="left">Helpful Resources</Divider>
          <ul>
            <li>
              <Link href="https://nutritionaustralia.org/fact-sheets/healthy-eating-on-a-budget/" target="_blank">
                Nutrition Australia – Healthy Eating on a Budget
              </Link>
              <ul>
                <li>Build balanced meals from low-cost items</li>
                <li>Sample plans and seasonal tips</li>
                <li>Smart shopping advice</li>
              </ul>
            </li>
            <li>
              <Link href="https://www.eatforhealth.gov.au/resources/sample-meal-plan" target="_blank">
                Eat for Health – Meal Plans
              </Link>
              <ul>
                <li>How to use food groups for energy and strength</li>
                <li>Ideas for adults over 50</li>
                <li>Printable meal plan templates</li>
              </ul>
            </li>
            <li>
              <Link href="https://www.healthdirect.gov.au/nutrition-and-healthy-eating" target="_blank">
                HealthDirect – Nutrition and Meal Planning
              </Link>
              <ul>
                <li>General healthy eating tips</li>
                <li>Portion size guidance</li>
                <li>Managing food choices on a budget</li>
              </ul>
            </li>
          </ul>

          <Divider orientation="left">Reflective Prompt</Divider>
          <Paragraph>
            What are some staple ingredients you already cook with?
            Could you swap one takeaway meal this week with a home-prepared meal?
          </Paragraph>

          <Divider orientation="left">Key Takeaway</Divider>
          <Paragraph>
            Nutritious eating doesn't need to be fancy or expensive. With a few smart ingredients, you can prepare meals that support your health — and your wallet.
          </Paragraph>
        </Typography>
      </Card>
    </div>
  );
};

export default Topic3_4;