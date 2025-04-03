import { Card, Typography, Divider } from 'antd';

const { Title, Paragraph, Text, Link } = Typography;

const Topic3_3 = () => (
  <div style={{ padding: '2rem', maxWidth: 800, margin: '0 auto' }}>
    <Card>
      <Typography>
        <Title level={2}>Module 3 – Topic 3: What to Do If You Didn’t Work in a Formal Job (Super Gaps)</Title>

        <Divider orientation="left">What You’ll Learn</Divider>
        <ul>
          <li>What a superannuation gap is and why it’s common</li>
          <li>What life situations often cause gaps in super</li>
          <li>What pathways and government resources exist to help people plan ahead</li>
          <li>Where to go to learn more about support, even with low or no super</li>
        </ul>

        <Divider orientation="left">Introduction</Divider>
        <Paragraph>
          Not everyone has worked full-time or in jobs where superannuation (super) was paid.
        </Paragraph>
        <Paragraph>Maybe you:</Paragraph>
        <ul>
          <li>Were paid in cash</li>
          <li>Cared for family or raised children</li>
          <li>Worked casually or part-time</li>
          <li>Migrated later in life</li>
          <li>Focused on community roles or religious responsibilities</li>
        </ul>
        <Paragraph>
          This can lead to a <Text strong>“super gap”</Text> — when your super is much lower than others your age.<br />
          This is very common, especially among first-generation migrants.
        </Paragraph>

        <Divider orientation="left">What You Can Learn from This Topic</Divider>
        <ul>
          <li>That you may still have super without realising</li>
          <li>That there are alternatives like the Age Pension</li>
          <li>That it's not too late to explore your options</li>
        </ul>

        <Divider orientation="left">Helpful Learning Resources</Divider>
        <ul>
          <li>
            <Link href="https://www.ato.gov.au/individuals/super/" target="_blank">
              ATO – What is Super and How to Find Yours
            </Link> – Helps you understand how super works, even if you had gaps.
            <ul>
              <li>How super is paid</li>
              <li>How to find “lost” super from past jobs</li>
              <li>What to check in your account</li>
            </ul>
          </li>
          <li>
            <Link href="https://moneysmart.gov.au/grow-your-super/super-when-youve-had-time-off-work" target="_blank">
              Moneysmart – Super When You’ve Had Time Off Work
            </Link> – For those with inconsistent work histories.
            <ul>
              <li>What happens to super if you had a break</li>
              <li>What voluntary contributions are</li>
              <li>Simple ways to keep track over time</li>
            </ul>
          </li>
          <li>
            <Link href="https://www.servicesaustralia.gov.au/age-pension" target="_blank">
              Services Australia – Age Pension and Retirement Income
            </Link> – Support for people nearing retirement with little or no super.
            <ul>
              <li>What the Age Pension is</li>
              <li>Who can apply</li>
              <li>What support exists for renters and carers</li>
            </ul>
          </li>
        </ul>

        <Divider orientation="left">Reflective Prompt</Divider>
        <Paragraph>
          <Text strong>Did you work in unpaid roles — like parenting, cleaning, or caring — that didn’t offer super?</Text><br />
          Have you ever checked your eligibility for Age Pension or other support?
        </Paragraph>
      </Typography>
    </Card>
  </div>
);

export default Topic3_3;
