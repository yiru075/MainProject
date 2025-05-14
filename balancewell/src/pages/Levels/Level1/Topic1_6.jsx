import { Card, Typography, Divider } from 'antd';

const { Title, Paragraph, Link } = Typography;

const Topic1_6 = () => {
  return (
    <div className="topic-page" >
      <Card className="topic-cards">
        <Typography className="topic-text">
          <Title level={2}>Module 1 – Topic 6: What Does Aging Well Look Like?</Title>

          <Divider orientation="left">What You’ll Learn</Divider>
          <ul>
            <li>What healthy aging means in simple, everyday terms</li>
            <li>Why it's about more than just physical health</li>
            <li>Small things you can do to age with strength, peace, and dignity</li>
          </ul>

          <Divider orientation="left">Introduction</Divider>
          <Paragraph>
            Aging well isn’t about looking young or avoiding wrinkles. It’s about feeling good — in your body, mind, and spirit — as you get older.
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

          <Divider orientation="left">Why It Matters</Divider>
          <ul>
            <li>Healthy aging gives you more independence</li>
            <li>You enjoy life more — even on a low income</li>
            <li>You reduce the risk of stress, loneliness, and health problems</li>
            <li>You make decisions that support your family and yourself</li>
          </ul>
          <Paragraph>
            Aging well isn’t just luck — it’s something you can build with small steps.
          </Paragraph>

          <Divider orientation="left">Helpful Links</Divider>
          <ul>
            <li>
              <Link href="https://www.healthdirect.gov.au/healthy-ageing" target="_blank">
                HealthDirect – Healthy Aging
              </Link>
              <ul>
                <li>Staying active</li>
                <li>Mental wellness</li>
                <li>How to age with strength and grace</li>
              </ul>
            </li>
            <li>
              <Link href="https://www.headtohealth.gov.au/" target="_blank">
                Head to Health – Emotional Wellness
              </Link>
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
            Aging well is about balance — not perfection. It's about staying strong, staying connected, and taking care of yourself in small but powerful ways.
          </Paragraph>
        </Typography>
      </Card>
    </div>
  );
};

export default Topic1_6;