import { Card, Typography, Divider, Table } from 'antd';

const { Title, Paragraph, Link } = Typography;

const Topic2_5 = () => {
  const columns = [
    {
      title: 'Food Item',
      dataIndex: 'item',
      key: 'item',
    },
    {
      title: 'Why It Helps Your Body',
      dataIndex: 'benefit',
      key: 'benefit',
    },
    {
      title: 'Common Uses',
      dataIndex: 'uses',
      key: 'uses',
    },
  ];

  const data = [
    {
      key: '1',
      item: 'Lentils & Chickpeas',
      benefit: 'High in protein & fiber',
      uses: 'Soups, curries, stews',
    },
    {
      key: '2',
      item: 'Brown Rice / Oats',
      benefit: 'Long-lasting energy, helps digestion',
      uses: 'Porridge, rice bowls',
    },
    {
      key: '3',
      item: 'Frozen Vegetables',
      benefit: 'Same nutrients, lower cost',
      uses: 'Stir-fry, side dishes, soups',
    },
    {
      key: '4',
      item: 'Tinned Tuna / Sardines',
      benefit: 'Rich in protein, calcium, B12',
      uses: 'Sandwiches, rice mix, pasta',
    },
    {
      key: '5',
      item: 'Eggs',
      benefit: 'Complete protein, affordable',
      uses: 'Scrambled, boiled, omelette',
    },
    {
      key: '6',
      item: 'Tofu',
      benefit: 'Protein, calcium (especially for aging bones)',
      uses: 'Curries, stir-fry, grills',
    },
    {
      key: '7',
      item: 'Seasonal Vegetables',
      benefit: 'Higher nutrition, lower price',
      uses: 'Curries, salads, baked dishes',
    },
  ];

  return (
    <div className="topic-page" >
      <Card className="topic-cards">
        <Typography className="topic-text">
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
            You don’t need expensive “superfoods.” Many affordable items found in Aussie supermarkets (or even your own cultural pantry) are just as good.
          </Paragraph>
          <Paragraph>
            Knowing your staples helps you:
          </Paragraph>
          <ul>
            <li>Spend less at the shops</li>
            <li>Eat better without stress</li>
            <li>Stay stronger and feel less tired</li>
          </ul>

          <Divider orientation="left">Examples of Low-Cost Nutritious Staples</Divider>
          <Table columns={columns} dataSource={data} pagination={false} bordered />

          <Divider orientation="left">Helpful Learning Resources</Divider>
          <ul>
            <li>
              <Link href="https://www.eatforhealth.gov.au" target="_blank">
                Eat for Health – Food Essentials
              </Link>
              <ul>
                <li>Recommended foods by age</li>
                <li>How to eat well with simple ingredients</li>
                <li>Example meal plans</li>
              </ul>
            </li>
            <li>
              <Link href="https://www.healthdirect.gov.au/nutrition-and-diet" target="_blank">
                HealthDirect – Nutrition and Diet
              </Link>
              <ul>
                <li>Balanced meals and portion sizes</li>
                <li>Nutrition after 40</li>
                <li>Managing diet on a budget</li>
              </ul>
            </li>
            <li>
              <Link href="https://nutritionaustralia.org/" target="_blank">
                Nutrition Australia – Culturally Inclusive Nutrition
              </Link>
              <ul>
                <li>Traditional foods with modern health twists</li>
                <li>Free recipes</li>
                <li>Guides for low-cost meal planning</li>
              </ul>
            </li>
          </ul>

          <Divider orientation="left">Reflective Prompt</Divider>
          <Paragraph>
            Which of these foods do you already eat? Are there healthy ingredients from your culture that are also affordable?
          </Paragraph>
        </Typography>
      </Card>
    </div>
  );
};

export default Topic2_5;
