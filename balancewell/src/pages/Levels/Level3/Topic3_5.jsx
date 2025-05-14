import { Card, Typography, Divider } from 'antd';

const { Title, Paragraph, Link } = Typography;

const Topic3_5 = () => {
  return (
    <div className="topic-page" >
      <Card className="topic-cards">
        <Typography className="topic-text">
          <Title level={2}>
            Module 3 – Topic 5: Understanding Safe and Affordable Suburbs (What to Think About Before You Move)
          </Title>

          <Divider orientation="left">What You’ll Learn</Divider>
          <ul>
            <li>What makes a suburb more supportive for older adults on a low income</li>
            <li>How to recognise signs of affordability and access</li>
            <li>What to look for if you're thinking of downsizing or moving in future</li>
            <li>Where to find this kind of suburb-related information</li>
          </ul>

          <Divider orientation="left">Introduction</Divider>
          <Paragraph>
            If you’re planning for retirement or worried about rising rent, where you live can make a big difference.
            You don’t need a fancy website — just knowing what to look for in a suburb can help you feel more confident when
            choosing where to live now or in the future.
          </Paragraph>

          <Divider orientation="left">What Makes a Suburb More Supportive</Divider>
          <ul>
            <li>Lower rent or affordable housing options</li>
            <li>Close to public transport and medical centres</li>
            <li>Walking distance to grocery shops and community hubs</li>
            <li>Safe and quiet environment (well-lit streets, low crime)</li>
            <li>Multicultural services or places of worship</li>
            <li>Parks or public areas for walking and exercise</li>
            <li>Easy access to social housing or support services</li>
          </ul>

          <Divider orientation="left">Helpful Resources</Divider>
          <ul>
            <li>
              <Link href="https://www.servicesaustralia.gov.au/rent-assistance" target="_blank">
                Services Australia – Rent Assistance Info
              </Link>
              <ul>
                <li>When you may be able to move and still get help</li>
                <li>How rent levels impact payments</li>
                <li>Where support may be available</li>
              </ul>
            </li>
            <li>
              <Link href="https://www.betterhealth.vic.gov.au/healthyliving/healthy-ageing-at-home" target="_blank">
                Better Health Channel – Healthy Ageing at Home
              </Link>
              <ul>
                <li>Why where you live matters for independence</li>
                <li>Tips for staying connected, active, and safe</li>
              </ul>
            </li>
          </ul>

          <Divider orientation="left">Reflective Prompt</Divider>
          <Paragraph>
            If your rent was rising — would you know what to look for in a new area?
            What suburb features are most important to you and your family?
          </Paragraph>

          <Divider orientation="left">Key Takeaway</Divider>
          <Paragraph>
            You don’t need to move now — but knowing what to look for in a supportive suburb can help you feel more ready for the future.
          </Paragraph>
        </Typography>
      </Card>
    </div>
  );
};

export default Topic3_5;