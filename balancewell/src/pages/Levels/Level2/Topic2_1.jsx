import { Card, Typography, Divider } from 'antd';

const { Title, Paragraph, Link } = Typography;

const Topic2_1 = () => {
  return (
    <div className="topic-page" >
      <Card className="topic-cards">
        <Typography className="topic-text">
          <Title level={2}>Module 2 – Topic 1: How to Check Your Super Balance via MyGov</Title>

          <Divider orientation="left">What You’ll Understand After This Topic</Divider>
          <ul>
            <li>That superannuation details can be accessed online in Australia</li>
            <li>What types of information can typically be found in your super account</li>
            <li>Where to go to explore and learn more — at your own pace</li>
          </ul>

          <Divider orientation="left">What is Super Tracking?</Divider>
          <Paragraph>
            In Australia, most workers have money set aside in a superannuation account by their employer. This money is stored in a super fund and can usually be viewed online through a government platform.
          </Paragraph>
          <Paragraph>You might be able to view:</Paragraph>
          <ul>
            <li>Super balances</li>
            <li>Contributions from employers</li>
            <li>Any unclaimed or lost super from past jobs</li>
          </ul>

          <Divider orientation="left">Helpful Learning Resources</Divider>
          <ul>
            <li>
              <Link href="https://my.gov.au/" target="_blank">
                MyGov – Sign in or Create an Account
              </Link>
              <ul>
                <li>Where super info can be found</li>
                <li>What MyGov is used for</li>
                <li>How to create an account (if you don’t have one)</li>
              </ul>
            </li>
            <li>
              <Link href="https://www.ato.gov.au/Individuals/Super/Keeping-track-of-your-super/" target="_blank">
                ATO – Keeping Track of Your Super
              </Link>
              <ul>
                <li>How to find details of your super</li>
                <li>What to do if you’ve had more than one job</li>
                <li>What it means to have “lost super”</li>
              </ul>
            </li>
            <li>
              <Link href="https://moneysmart.gov.au/grow-your-super/find-lost-super" target="_blank">
                Moneysmart – Find Lost Super
              </Link>
              <ul>
                <li>How lost super occurs</li>
                <li>Where to find it</li>
                <li>What steps Australians often take to stay on top of their super</li>
              </ul>
            </li>
          </ul>

          <Divider orientation="left">Reflective Prompt</Divider>
          <Paragraph>
            Have you ever looked up your super? Do you know if you have more than one super account?
          </Paragraph>
        </Typography>
      </Card>
    </div>
  );
};

export default Topic2_1;