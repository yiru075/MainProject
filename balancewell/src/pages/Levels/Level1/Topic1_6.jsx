import { Card, Typography, Divider } from 'antd';

const { Title, Paragraph, Text, Link } = Typography;

const Topic1_6 = () => (
  <div style={{ padding: '2rem', maxWidth: 800, margin: '0 auto' }}>
    <Card>
      <Typography>
        <Title level={2}>Module 1 – Topic 6: What Does Aging Well Look Like?</Title>

        <Divider orientation="left">What You’ll Learn</Divider>
        <ul>
          <li>What healthy aging means in simple, everyday terms</li>
          <li>Why it's about more than just physical health</li>
          <li>Small things you can do to age with strength, peace, and dignity</li>
        </ul>

        <Divider orientation="left">Introduction</Divider>
        <Paragraph>
          Aging well isn’t about looking young or avoiding wrinkles. It’s about feeling good — in your body, mind,
          and spirit — as you get older.
        </Paragraph>
        <Paragraph>
          Aging well means being able to:
        </Paragraph>
        <ul>
          <li>Do the things you enjoy</li>
          <li>Stay connected with people</li>
          <li>Look after your health</li>
          <li>Feel in control of your life</li>
        </ul>

        <Divider orientation="left">Visual Explainer</Divider>
        <Paragraph><Text strong>“Aging Well Means…”</Text></Paragraph>

        <Divider orientation="left">Why It Matters</Divider>
        <ul>
          <li>Healthy aging gives you more independence</li>
          <li>You enjoy life more — even on a low income</li>
          <li>You reduce the risk of stress, loneliness, and health problems</li>
          <li>You make decisions that support your family and yourself</li>
          <li>Aging well isn’t just luck — it’s something you can build with small steps</li>
        </ul>

        <Divider orientation="left">Helpful Links</Divider>
        <ul>
          <li>
            <Link href="https://www.healthdirect.gov.au/healthy-ageing" target="_blank">HealthDirect – Healthy Aging</Link> – Learn about:
            <ul>
              <li>Staying active</li>
              <li>Mental wellness</li>
              <li>How to age with strength and grace</li>
            </ul>
          </li>
          <li>
            <Link href="https://www.betterhealth.vic.gov.au/" target="_blank">Better Health Channel – Healthy Lifestyle Tips</Link> – From the VIC government:
            <ul>
              <li>Tips for staying healthy in later life</li>
              <li>Culturally inclusive resources and ideas</li>
              <li>Health services and support programs</li>
            </ul>
          </li>
          <li>
            <Link href="https://www.headtohealth.gov.au/" target="_blank">Head to Health – Emotional Wellness</Link> – Offers:
            <ul>
              <li>Support for mental health and emotional wellbeing</li>
              <li>Culturally tailored advice</li>
              <li>Connection to free or low-cost services</li>
            </ul>
          </li>
        </ul>

        <Divider orientation="left">Real-Life Example</Divider>
        <Paragraph>
          Nguyen, 60, thought aging well meant having lots of money. But now he takes morning walks, cooks healthy soups, and calls his sister every Sunday.
          He says: “I feel stronger, happier, and more peaceful than I did ten years ago.”
        </Paragraph>

        <Divider orientation="left">Key Takeaway</Divider>
        <Paragraph>
          <Text strong>Aging well is about balance — not perfection. It's about staying strong, staying connected, and taking care of yourself in small but powerful ways.</Text>
        </Paragraph>
      </Typography>
    </Card>
  </div>
);

export default Topic1_6;
