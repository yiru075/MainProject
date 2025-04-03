import { Card, Typography, Divider } from 'antd';

const { Title, Paragraph, Text, Link } = Typography;

const Topic2_5 = () => (
  <div style={{ padding: '2rem', maxWidth: 800, margin: '0 auto' }}>
    <Card>
      <Typography>
        <Title level={2}>Module 2 – Topic 5: Affordable Staples That Support Energy and Health</Title>

        <Divider orientation="left">What You’ll Understand After This Topic</Divider>
        <ul>
          <li>What kinds of affordable, everyday foods support health after 40</li>
          <li>How simple ingredients can support energy and aging</li>
          <li>Where to find more information on budget-friendly healthy eating in Australia</li>
        </ul>

        <Divider orientation="left">Why This Matters</Divider>
        <Paragraph>
          As you get older, your body needs foods that support your bones, muscles, heart, and energy levels — even if you’re on a low income.
        </Paragraph>
        <Paragraph>
          You don’t need expensive "superfoods" — many affordable items found in Aussie supermarkets (or even your own cultural pantry) are just as good.
        </Paragraph>
        <Paragraph>
          Knowing your staples helps you:
        </Paragraph>
        <ul>
          <li>Spend less at the shops</li>
          <li>Eat better without stress</li>
          <li>Stay stronger and feel less tired</li>
        </ul>

        <Divider orientation="left">Examples of Low-Cost Nutritious Staples (Common in CALD households)</Divider>
        <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '1.5rem' }}>
          <thead>
            <tr>
              <th style={{ borderBottom: '1px solid #ddd', padding: '8px' }}>Food Item</th>
              <th style={{ borderBottom: '1px solid #ddd', padding: '8px' }}>Why It Helps Your Body</th>
              <th style={{ borderBottom: '1px solid #ddd', padding: '8px' }}>Common Uses</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ padding: '8px' }}>Lentils & Chickpeas</td>
              <td style={{ padding: '8px' }}>High in protein & fiber</td>
              <td style={{ padding: '8px' }}>Soups, curries, stews</td>
            </tr>
            <tr>
              <td style={{ padding: '8px' }}>Brown Rice / Oats</td>
              <td style={{ padding: '8px' }}>Long-lasting energy, helps digestion</td>
              <td style={{ padding: '8px' }}>Porridge, rice bowls</td>
            </tr>
            <tr>
              <td style={{ padding: '8px' }}>Frozen Vegetables</td>
              <td style={{ padding: '8px' }}>Same nutrients, lower cost</td>
              <td style={{ padding: '8px' }}>Stir-fry, side dishes, soups</td>
            </tr>
            <tr>
              <td style={{ padding: '8px' }}>Tinned Tuna / Sardines</td>
              <td style={{ padding: '8px' }}>Rich in protein, calcium, B12</td>
              <td style={{ padding: '8px' }}>Sandwiches, rice mix, pasta</td>
            </tr>
            <tr>
              <td style={{ padding: '8px' }}>Eggs</td>
              <td style={{ padding: '8px' }}>Complete protein, affordable</td>
              <td style={{ padding: '8px' }}>Scrambled, boiled, omelette</td>
            </tr>
            <tr>
              <td style={{ padding: '8px' }}>Tofu</td>
              <td style={{ padding: '8px' }}>Protein, calcium (especially for aging bones)</td>
              <td style={{ padding: '8px' }}>Curries, stir-fry, grills</td>
            </tr>
            <tr>
              <td style={{ padding: '8px' }}>Seasonal Vegetables</td>
              <td style={{ padding: '8px' }}>Higher nutrition, lower price</td>
              <td style={{ padding: '8px' }}>Curries, salads, baked dishes</td>
            </tr>
          </tbody>
        </table>

        <Divider orientation="left">Helpful Learning Resources</Divider>
        <ul>
          <li>
            <Link href="https://www.eatforhealth.gov.au/" target="_blank">Eat for Health – Food Essentials</Link> – Practical info on food groups.
            <ul>
              <li>Recommended foods by age</li>
              <li>How to eat well with simple ingredients</li>
              <li>Example meal plans</li>
            </ul>
          </li>
          <li>
            <Link href="https://www.healthdirect.gov.au/nutrition" target="_blank">HealthDirect – Nutrition and Diet</Link> – Medically reviewed info tailored to Aussie living.
            <ul>
              <li>Balanced meals and portion sizes</li>
              <li>Nutrition after 40</li>
              <li>Managing diet on a budget</li>
            </ul>
          </li>
          <li>
            <Link href="https://nutritionaustralia.org/" target="_blank">Nutrition Australia – Culturally Inclusive Nutrition</Link> – Tips that respect cultural diets.
            <ul>
              <li>Traditional foods with modern health twists</li>
              <li>Free recipes</li>
              <li>Guides for low-cost meal planning</li>
            </ul>
          </li>
        </ul>

        <Divider orientation="left">Reflective Prompt</Divider>
        <Paragraph>
          <Text strong>Which of these foods do you already eat?</Text><br />
          Are there healthy ingredients from your culture that are also affordable?
        </Paragraph>
      </Typography>
    </Card>
  </div>
);

export default Topic2_5;
