import { Card, Typography, Divider } from 'antd';

const { Title, Paragraph, Text, Link } = Typography;

const Topic2_6 = () => (
  <div style={{ padding: '2rem', maxWidth: 800, margin: '0 auto' }}>
    <Card>
      <Typography>
        <Title level={2}>Module 2 – Topic 6: Free or Low-Cost Health Check-ups & Screenings in Victoria</Title>

        <Divider orientation="left">What You’ll Understand After This Topic</Divider>
        <ul>
          <li>What kinds of health check-ups and screenings are available at little or no cost in Victoria</li>
          <li>Why regular health checks matter as you age</li>
          <li>Where to go to learn more or find nearby services</li>
        </ul>

        <Divider orientation="left">Why This Matters</Divider>
        <Paragraph>
          Between ages 40 and 59, you may not feel “old” — but it’s the perfect time to watch for early signs of health issues.
          Many Australians qualify for free or low-cost health check-ups through Medicare or state programs.
        </Paragraph>
        <Paragraph>
          These checks can pick up early signs of:
        </Paragraph>
        <ul>
          <li>High blood pressure</li>
          <li>Diabetes</li>
          <li>Heart disease</li>
          <li>Cancer</li>
          <li>Vision or hearing problems</li>
        </ul>
        <Paragraph>
          Knowing what’s available helps you plan — especially if you’re on a low income or caring for others.
        </Paragraph>

        <Divider orientation="left">Common Free or Subsidised Services in Victoria</Divider>
        <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '1.5rem' }}>
          <thead>
            <tr>
              <th style={{ borderBottom: '1px solid #ddd', padding: '8px' }}>Check-up Type</th>
              <th style={{ borderBottom: '1px solid #ddd', padding: '8px' }}>How It Helps You</th>
              <th style={{ borderBottom: '1px solid #ddd', padding: '8px' }}>Usually Covered By</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ padding: '8px' }}>GP Health Check</td>
              <td style={{ padding: '8px' }}>Overall health review + referrals</td>
              <td style={{ padding: '8px' }}>Medicare (bulk-billed)</td>
            </tr>
            <tr>
              <td style={{ padding: '8px' }}>Heart Health Check</td>
              <td style={{ padding: '8px' }}>Blood pressure, cholesterol, heart risk</td>
              <td style={{ padding: '8px' }}>Medicare (for 45–49+)</td>
            </tr>
            <tr>
              <td style={{ padding: '8px' }}>Diabetes Check</td>
              <td style={{ padding: '8px' }}>Blood sugar, weight, diet review</td>
              <td style={{ padding: '8px' }}>GP clinics / screenings</td>
            </tr>
            <tr>
              <td style={{ padding: '8px' }}>Cancer Screenings</td>
              <td style={{ padding: '8px' }}>Breast, bowel, cervical checks</td>
              <td style={{ padding: '8px' }}>National Screening Program</td>
            </tr>
            <tr>
              <td style={{ padding: '8px' }}>Eye & Hearing Tests</td>
              <td style={{ padding: '8px' }}>Vision, balance, hearing clarity</td>
              <td style={{ padding: '8px' }}>Often bulk-billed or discounted</td>
            </tr>
          </tbody>
        </table>

        <Divider orientation="left">Helpful Learning Resources</Divider>
        <ul>
          <li>
            <Link href="https://www.healthdirect.gov.au/free-health-checks" target="_blank">HealthDirect – Free Health Checks</Link> – Overview of common check-ups under Medicare.
            <ul>
              <li>What is free for people aged 40+</li>
              <li>Where to go for a check</li>
              <li>How screenings work in GP clinics</li>
            </ul>
          </li>
          <li>
            <Link href="https://www.betterhealth.vic.gov.au/" target="_blank">Better Health Channel – Preventive Health</Link> – Victorian Government's site for health programs and lifestyle support.
            <ul>
              <li>Local health programs in Victoria</li>
              <li>Preventative health campaigns</li>
              <li>Age-specific health info</li>
            </ul>
          </li>
          <li>
            <Link href="https://www.cancerscreening.gov.au/" target="_blank">National Screening Programs – Cancer Screening</Link> – Free cancer screening info for Australians.
            <ul>
              <li>Who gets invited and when</li>
              <li>How to take part</li>
              <li>What results mean</li>
            </ul>
          </li>
        </ul>

        <Divider orientation="left">Reflective Prompt</Divider>
        <Paragraph>
          <Text strong>When was the last time you had a check-up?</Text><br />
          Do you know what you’re eligible for under Medicare?
        </Paragraph>
      </Typography>
    </Card>
  </div>
);

export default Topic2_6;
