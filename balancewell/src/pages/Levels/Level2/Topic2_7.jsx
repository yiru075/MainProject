import { Card, Typography, Divider } from 'antd';

const { Title, Paragraph, Text, Link } = Typography;

const Topic2_7 = () => (
  <div style={{ padding: '2rem', maxWidth: 800, margin: '0 auto' }}>
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
        </Paragraph>
        <Paragraph>
          Reading food labels helps you make informed choices, especially if you’re watching your weight, managing blood pressure,
          or trying to eat better on a budget.
        </Paragraph>

        <Divider orientation="left">Where to Look on a Label</Divider>
        <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '1.5rem' }}>
          <thead>
            <tr>
              <th style={{ borderBottom: '1px solid #ddd', padding: '8px' }}>Section Name</th>
              <th style={{ borderBottom: '1px solid #ddd', padding: '8px' }}>What It Tells You</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ padding: '8px' }}>Nutrition Information Panel</td>
              <td style={{ padding: '8px' }}>Shows energy, sugar, fat, salt per serving</td>
            </tr>
            <tr>
              <td style={{ padding: '8px' }}>Ingredients List</td>
              <td style={{ padding: '8px' }}>Lists ingredients from most to least in amount</td>
            </tr>
            <tr>
              <td style={{ padding: '8px' }}>Serving Size</td>
              <td style={{ padding: '8px' }}>How much the company says is one “portion”</td>
            </tr>
            <tr>
              <td style={{ padding: '8px' }}>% Daily Intake</td>
              <td style={{ padding: '8px' }}>How much each serve gives you of a full day’s needs</td>
            </tr>
          </tbody>
        </table>

        <Divider orientation="left">What to Recognise in Common Packaged Foods</Divider>
        <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '1.5rem' }}>
          <thead>
            <tr>
              <th style={{ borderBottom: '1px solid #ddd', padding: '8px' }}>Nutrient</th>
              <th style={{ borderBottom: '1px solid #ddd', padding: '8px' }}>Keep an Eye On If You See…</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ padding: '8px' }}>Salt</td>
              <td style={{ padding: '8px' }}>Over 400mg sodium per 100g = quite high</td>
            </tr>
            <tr>
              <td style={{ padding: '8px' }}>Sugar</td>
              <td style={{ padding: '8px' }}>Added sugars (glucose, fructose, syrup, etc.) = not just natural sugar</td>
            </tr>
            <tr>
              <td style={{ padding: '8px' }}>Fat</td>
              <td style={{ padding: '8px' }}>Look for saturated fat — aim for lower numbers</td>
            </tr>
          </tbody>
        </table>
        <Paragraph><Text strong>Always compare using the “per 100g” column — this makes it easier to compare different products.</Text></Paragraph>

        <Divider orientation="left">Helpful Learning Resources</Divider>
        <ul>
          <li>
            <Link href="https://www.eatforhealth.gov.au/eating-well/food-labels" target="_blank">Eat for Health – Understanding Food Labels</Link> – A practical guide to navigating labels on all types of food in Australia.
            <ul>
              <li>What nutrition panels show</li>
              <li>Ingredient lists</li>
              <li>The difference between "good fats" and saturated fat</li>
            </ul>
          </li>
          <li>
            <Link href="https://www.healthdirect.gov.au/reading-food-labels" target="_blank">HealthDirect – Reading Food Labels</Link> – Easy-to-understand visuals and examples.
            <ul>
              <li>How to compare foods using “per 100g”</li>
              <li>Tips for managing sugar and sodium intake</li>
              <li>Definitions of health claims (e.g. “low fat”)</li>
            </ul>
          </li>
          <li>
            <Link href="https://www.heartfoundation.org.au/recipes-and-nutrition/nutrition-basics/salt-sugar-and-fat" target="_blank">The Heart Foundation – Salt, Sugar & Fat Info</Link> – Focused on heart health and ingredient awareness.
            <ul>
              <li>How high salt affects blood pressure</li>
              <li>What hidden sugars look like on a label</li>
              <li>Foods that support heart health</li>
            </ul>
          </li>
        </ul>

        <Divider orientation="left">Reflective Prompt</Divider>
        <Paragraph>
          <Text strong>Have you ever compared two similar products?</Text><br />
          Which one had more sugar or salt than you expected?
        </Paragraph>
      </Typography>
    </Card>
  </div>
);

export default Topic2_7;
