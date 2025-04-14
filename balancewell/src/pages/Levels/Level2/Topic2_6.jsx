import { Card, Typography, Divider, Table } from 'antd';
 
const { Title, Paragraph, Link } = Typography;
 
const Topic2_6 = () => {
  const columns = [
    {
      title: 'Check-up Type',
      dataIndex: 'type',
      key: 'type',
    },
    {
      title: 'How It Helps You',
      dataIndex: 'benefit',
      key: 'benefit',
    },
    {
      title: 'Usually Covered By',
      dataIndex: 'coveredBy',
      key: 'coveredBy',
    },
  ];
 
  const data = [
    {
      key: '1',
      type: 'GP Health Check',
      benefit: 'Overall health review + referrals',
      coveredBy: 'Medicare (bulk-billed)',
    },
    {
      key: '2',
      type: 'Heart Health Check',
      benefit: 'Blood pressure, cholesterol, heart risk',
      coveredBy: 'Medicare (for 45–49+)',
    },
    {
      key: '3',
      type: 'Diabetes Check',
      benefit: 'Blood sugar, weight, diet review',
      coveredBy: 'GP clinics / screenings',
    },
    {
      key: '4',
      type: 'Cancer Screenings',
      benefit: 'Breast, bowel, cervical checks',
      coveredBy: 'National Screening Program',
    },
    {
      key: '5',
      type: 'Eye & Hearing Tests',
      benefit: 'Vision, balance, hearing clarity',
      coveredBy: 'Often bulk-billed or discounted',
    },
  ];
 
  return (
<div style={{ padding: '2rem', maxWidth: 1000, margin: '0 auto' }}>
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
<Table columns={columns} dataSource={data} pagination={false} bordered />
 
          <Divider orientation="left">Helpful Learning Resources</Divider>
<ul>
<li>
<Link href="https://www.healthdirect.gov.au/health-checks" target="_blank">
                HealthDirect – Health Checks
</Link>
<ul>
<li>What is for people aged 40+</li>
<li>Where to go for a check</li>
<li>How screenings work in GP clinics</li>
</ul>
</li>
<li>
<Link href="https://www.betterhealth.vic.gov.au/healthyliving/preventive-health" target="_blank">
                Better Health Channel – Preventive Health
</Link>
<ul>
<li>Local health programs in Victoria</li>
<li>Preventative health campaigns</li>
<li>Age-specific health info</li>
</ul>
</li>
<li>
<Link href="https://www.cancerscreening.gov.au/" target="_blank">
                National Screening Programs – Cancer Screening
</Link>
<ul>
<li>Who gets invited and when</li>
<li>How to take part</li>
<li>What results mean</li>
</ul>
</li>
</ul>
 
          <Divider orientation="left">Reflective Prompt</Divider>
<Paragraph>
            When was the last time you had a check-up? Do you know what you’re eligible for under Medicare?
</Paragraph>
</Typography>
</Card>
</div>
  );
};
 
export default Topic2_6;