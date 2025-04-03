import { Card, Typography, Divider } from 'antd';

const { Title, Paragraph, Text, Link } = Typography;

const Topic3_5 = () => (
  <div style={{ padding: '2rem', maxWidth: 800, margin: '0 auto' }}>
    <Card>
      <Typography>
        <Title level={2}>Module 3 – Topic 5: Understanding Safe and Affordable Suburbs</Title>

        <Divider orientation="left">What You’ll Learn</Divider>
        <ul>
          <li>What makes a suburb more supportive for older adults on a low income</li>
          <li>How to recognise signs of affordability and access</li>
          <li>What to look for if you're thinking of downsizing or moving in future</li>
          <li>Where to find this kind of suburb-related information</li>
        </ul>

        <Divider orientation="left">Plain English Introduction</Divider>
        <Paragraph>
          If you’re planning for retirement or worried about rising rent, where you live can make a big difference.
        </Paragraph>
        <Paragraph>
          You don’t need a fancy website — just knowing what to look for in a suburb can help you feel more confident when choosing where to live now or in the future.
        </Paragraph>

        <Divider orientation="left">What Makes a Suburb More Supportive (Checklist Style)</Divider>
        <ul>
          <li>Affordable rent and housing options</li>
          <li>Close to public transport (bus, train, tram)</li>
          <li>Easy access to shops and fresh food</li>
          <li>Local clinics, GPs, and hospitals nearby</li>
          <li>Safe to walk around, well-lit streets</li>
          <li>Community centres, libraries, or places of worship</li>
          <li>Multicultural or welcoming atmosphere</li>
        </ul>

        <Divider orientation="left">Helpful Resources (With Explanation)</Divider>
        <ul>
          <li>
            <Link href="https://discover.data.vic.gov.au/dataset/my-victoria" target="_blank">
              MyVictoria – Suburb Profiles
            </Link> – Government-backed site to explore services and access.
            <ul>
              <li>Look at rent averages</li>
              <li>See how many clinics, shops, or bus stops are nearby</li>
              <li>Learn about community features</li>
            </ul>
          </li>
          <li>
            <Link href="https://www.servicesaustralia.gov.au/rent-assistance" target="_blank">
              Services Australia – Rent Assistance Info
            </Link> – Understand how rent affects your Centrelink support.
            <ul>
              <li>When you may be able to move and still get help</li>
              <li>How rent levels impact payments</li>
              <li>Where support may be available</li>
            </ul>
          </li>
          <li>
            <Link href="https://www.betterhealth.vic.gov.au/healthy-ageing" target="_blank">
              Better Health Channel – Healthy Ageing at Home
            </Link> – Tips for staying well while aging.
            <ul>
              <li>Why where you live matters for independence</li>
              <li>Tips for staying connected, active, and safe</li>
            </ul>
          </li>
        </ul>

        <Divider orientation="left">Reflective Prompt</Divider>
        <Paragraph>
          <Text strong>If your rent was rising — would you know what to look for in a new area?</Text><br />
          What suburb features are most important to you and your family?
        </Paragraph>

        <Divider orientation="left">Key Takeaway</Divider>
        <Paragraph>
          <Text strong>
            You don’t need to move now — but knowing what to look for in a supportive suburb can help you feel more ready for the future.
          </Text>
        </Paragraph>
      </Typography>
    </Card>
  </div>
);

export default Topic3_5;
