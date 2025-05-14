import { Card, Typography, Divider } from 'antd';

const { Title, Paragraph, Link } = Typography;

const Topic3_7 = () => {
  return (
    <div className="topic-page" >
      <Card className="topic-cards">
        <Typography className="topic-text">
          <Title level={2}>Module 3 – Topic 7: Staying Physically Active Without a Gym</Title>

          <Divider orientation="left">What You’ll Learn</Divider>
          <ul>
            <li>Why physical activity matters as you age — especially after 40</li>
            <li>Simple, low-cost ways to stay active at home or in your neighbourhood</li>
            <li>Where to learn more about community movement and safe exercise options</li>
          </ul>

          <Divider orientation="left">Introduction</Divider>
          <Paragraph>
            You don’t need a gym or fancy shoes to stay active and healthy. Movement helps with:
          </Paragraph>
          <ul>
            <li>Joint and muscle strength</li>
            <li>Balance and fall prevention</li>
            <li>Better sleep and digestion</li>
            <li>Feeling happier and more confident</li>
          </ul>
          <Paragraph>
            Even 20–30 minutes a day of gentle movement can make a difference — especially after 40.
          </Paragraph>

          <Divider orientation="left">Ways to Stay Active Without Spending Money</Divider>
          <Paragraph>
            It’s not about how fast or hard — it’s about moving often and feeling good.
          </Paragraph>
          <ul>
            <li>Walking around your neighbourhood or local park</li>
            <li>Stretching or light yoga at home (using YouTube or printed guides)</li>
            <li>Dancing to music in your living room</li>
            <li>Doing chores like sweeping or gardening</li>
            <li>Joining free walking groups or council-run sessions</li>
          </ul>

          <Divider orientation="left">Helpful Resources</Divider>
          <ul>
            <li>
              <Link href="https://www.healthdirect.gov.au/physical-activity-guidelines-for-older-adults" target="_blank">
                HealthDirect – Physical Activity for Older Adults
              </Link>
              <ul>
                <li>Recommended weekly activity levels</li>
                <li>Easy ways to build up slowly</li>
                <li>What to avoid if you have health concerns</li>
              </ul>
            </li>
            <li>
              <Link href="https://www.betterhealth.vic.gov.au/healthyliving/be-active" target="_blank">
                Better Health Channel – Be Active
              </Link>
              <ul>
                <li>Movement ideas that fit into your daily life</li>
                <li>How walking helps your bones and brain</li>
                <li>What counts as activity (even sweeping!)</li>
              </ul>
            </li>
            <li>
              <Link href="https://www.myagedcare.gov.au/staying-healthy" target="_blank">
                My Aged Care – Staying Healthy at Home
              </Link>
              <ul>
                <li>Home-based exercise ideas</li>
                <li>Government programs for over-50s</li>
                <li>Support for staying independent longer</li>
              </ul>
            </li>
          </ul>

          <Divider orientation="left">Reflective Prompt</Divider>
          <Paragraph>
            What kind of movement do you enjoy most — walking, dancing, cleaning, stretching?
            Can you set aside 15–20 minutes each day for yourself?
          </Paragraph>

          <Divider orientation="left">Key Takeaway</Divider>
          <Paragraph>
            You don’t need money or equipment to stay strong — your body, your home, and a little time are all you need.
          </Paragraph>
        </Typography>
      </Card>
    </div>
  );
};

export default Topic3_7;