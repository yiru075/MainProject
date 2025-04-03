import { Card, Typography, Divider } from 'antd';

const { Title, Paragraph, Text, Link } = Typography;

const Topic3_1 = () => (
  <div style={{ padding: '2rem', maxWidth: 800, margin: '0 auto' }}>
    <Card>
      <Typography>
        <Title level={2}>Module 3 – Topic 1: Creating a Simple Weekly Budget</Title>

        <Divider orientation="left">What You’ll Learn</Divider>
        <ul>
          <li>What a weekly budget is</li>
          <li>How it helps you manage everyday spending</li>
          <li>A simple way to begin planning income and expenses</li>
          <li>Where to find trusted tools to get started (if you choose)</li>
        </ul>

        <Divider orientation="left">Introduction</Divider>
        <Paragraph>A weekly budget is a short plan that shows:</Paragraph>
        <ul>
          <li>How much money is coming in</li>
          <li>How much is going out</li>
          <li>What you have left at the end of the week</li>
        </ul>
        <Paragraph>It helps you know:</Paragraph>
        <ul>
          <li>If you can afford to send money overseas</li>
          <li>If bills are covered</li>
          <li>What is “safe to spend” this week</li>
          <li>How much to keep aside for rent, food, and emergencies</li>
        </ul>
        <Paragraph><Text strong>You don’t have to be perfect. Just writing it down is a strong first step.</Text></Paragraph>

        <Divider orientation="left">Visual Explainer</Divider>
        <Paragraph><Text strong>“A Simple Weekly Budget Has 3 Parts”</Text></Paragraph>

        <Divider orientation="left">Helpful Links</Divider>
        <ul>
          <li>
            <Link href="https://moneysmart.gov.au/budgeting/budget-planner" target="_blank">
              Moneysmart – Budget Planner
            </Link> – Australia’s official budgeting tool for people of all income levels.
            <ul>
              <li>Add income and weekly expenses</li>
              <li>See how much you have left</li>
              <li>Print or save your plan</li>
            </ul>
          </li>
          <li>
            <Link href="https://www.moneyhelp.org.au/tools-and-resources/budget-planner/" target="_blank">
              MoneyHelp VIC – Weekly Budget Sheet
            </Link> – Budgeting tools designed for Victorians living on low or irregular incomes.
            <ul>
              <li>A printable weekly budget worksheet</li>
              <li>Space for groceries, rent, transport, and remittances</li>
              <li>Simple templates for tracking casual earnings</li>
            </ul>
          </li>
          <li>
            <Link href="https://moneysmart.gov.au/living-on-a-low-income/budgeting-on-a-low-income" target="_blank">
              ASIC’s Tips for Low-Income Budgeting
            </Link> – Includes ideas on building a habit without pressure.
            <ul>
              <li>What to include in your budget</li>
              <li>Dealing with unexpected costs</li>
              <li>Mindful ways to track spending</li>
            </ul>
          </li>
        </ul>

        <Divider orientation="left">Reflective Prompt</Divider>
        <Paragraph>
          <Text strong>Have you ever written down your weekly income and expenses?</Text><br />
          What surprised you most when you saw it clearly?
        </Paragraph>

        <Divider orientation="left">Key Takeaway</Divider>
        <Paragraph>
          <Text strong>
            A weekly budget helps you plan with confidence — even if you don’t earn much.
            It shows where your money goes and helps you decide what’s possible.
          </Text>
        </Paragraph>
      </Typography>
    </Card>
  </div>
);

export default Topic3_1;
