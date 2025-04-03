import { Card, Typography, Divider } from 'antd';

const { Title, Paragraph, Text, Link } = Typography;

const Topic3_4 = () => (
  <div style={{ padding: '2rem', maxWidth: 800, margin: '0 auto' }}>
    <Card>
      <Typography>
        <Title level={2}>Module 3 – Topic 4: Sample Weekly Meal Plan Under $50</Title>

        <Divider orientation="left">What You’ll Learn</Divider>
        <ul>
          <li>How everyday, low-cost foods can be combined into balanced meals</li>
          <li>That healthy eating doesn’t need to be expensive</li>
          <li>Where to find culturally inclusive and affordable meal planning ideas</li>
        </ul>

        <Divider orientation="left">Plain English Introduction</Divider>
        <Paragraph>
          Eating well doesn’t always mean spending more.
        </Paragraph>
        <Paragraph>With the right ingredients and a simple plan, it’s possible to:</Paragraph>
        <ul>
          <li>Stay full</li>
          <li>Get important nutrients (like protein, fiber, calcium)</li>
          <li>Stick to a realistic grocery budget — under $50 per week</li>
        </ul>
        <Paragraph>This kind of meal planning supports:</Paragraph>
        <ul>
          <li>Energy during the day</li>
          <li>Better health as you age</li>
          <li>Less food waste and lower weekly costs</li>
        </ul>

        <Divider orientation="left">Budget-Friendly Staples (Approx. Price in AUD)</Divider>
        <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '1.5rem' }}>
          <thead>
            <tr>
              <th style={{ borderBottom: '1px solid #ddd', padding: '8px' }}>Food Item</th>
              <th style={{ borderBottom: '1px solid #ddd', padding: '8px' }}>Cost Range</th>
              <th style={{ borderBottom: '1px solid #ddd', padding: '8px' }}>Why It's Useful</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>Rolled oats (1kg)</td><td>$2.50</td><td>Breakfast, high fiber</td></tr>
            <tr><td>Eggs (dozen)</td><td>$4.50</td><td>Protein-rich, versatile</td></tr>
            <tr><td>Tinned beans/lentils</td><td>$1 each</td><td>Fiber, iron, heart health</td></tr>
            <tr><td>Frozen veggies (1kg)</td><td>$2–3</td><td>Long shelf life, vitamins</td></tr>
            <tr><td>Brown rice (2kg)</td><td>$3.50</td><td>Long-lasting, slow energy release</td></tr>
            <tr><td>Tinned tuna</td><td>$1.20–$2</td><td>Protein, omega-3</td></tr>
            <tr><td>Fresh seasonal veg</td><td>$1–2 each</td><td>Supports immunity, gut health</td></tr>
            <tr><td>Milk (1L) or soy milk</td><td>$1.80–$2.50</td><td>Calcium and vitamin D</td></tr>
          </tbody>
        </table>

        <Divider orientation="left">Example 5-Day Meal Plan (Budget: ~$45)</Divider>
        <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '1.5rem' }}>
          <thead>
            <tr>
              <th style={{ borderBottom: '1px solid #ddd', padding: '8px' }}>Meal Time</th>
              <th style={{ borderBottom: '1px solid #ddd', padding: '8px' }}>Sample Meals – Culturally Flexible Options</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Breakfast</td>
              <td>Oats with milk and banana / Boiled eggs with toast</td>
            </tr>
            <tr>
              <td>Lunch</td>
              <td>Rice + lentil curry / Tuna salad with chickpeas</td>
            </tr>
            <tr>
              <td>Dinner</td>
              <td>Stir-fried frozen veg + egg on rice / Chickpea stew + flatbread</td>
            </tr>
            <tr>
              <td>Snacks</td>
              <td>Carrot sticks, seasonal fruit, hard-boiled egg</td>
            </tr>
          </tbody>
        </table>
        <Paragraph>
          These meals can be spiced or adapted to suit Vietnamese, Arabic, Indian, Chinese, Sudanese, or Sri Lankan cooking traditions.
        </Paragraph>

        <Divider orientation="left">Helpful Resources</Divider>
        <ul>
          <li>
            <Link href="https://nutritionaustralia.org/" target="_blank">Nutrition Australia – Healthy Eating on a Budget</Link>
            <ul>
              <li>How to build balanced meals from low-cost items</li>
              <li>Sample plans and seasonal tips</li>
              <li>Smart shopping advice</li>
            </ul>
          </li>
          <li>
            <Link href="https://www.eatforhealth.gov.au/" target="_blank">Eat for Health – Meal Plans</Link>
            <ul>
              <li>How to use food groups for energy and strength</li>
              <li>Ideas for adults over 50</li>
              <li>Free printable meal plan templates</li>
            </ul>
          </li>
          <li>
            <Link href="https://www.healthdirect.gov.au/healthy-eating" target="_blank">HealthDirect – Nutrition and Meal Planning</Link>
            <ul>
              <li>General healthy eating tips</li>
              <li>Portion size guidance</li>
              <li>Managing food choices on a budget</li>
            </ul>
          </li>
        </ul>

        <Divider orientation="left">Reflective Prompt</Divider>
        <Paragraph>
          <Text strong>What are some staple ingredients you already cook with?</Text><br />
          Could you swap one takeaway meal this week with a home-prepared meal?
        </Paragraph>

        <Divider orientation="left">Key Takeaway</Divider>
        <Paragraph>
          <Text strong>
            Nutritious eating doesn't need to be fancy or expensive. With a few smart ingredients, you can prepare meals that support your health — and your wallet.
          </Text>
        </Paragraph>
      </Typography>
    </Card>
  </div>
);

export default Topic3_4;
