import styled from "styled-components"

const Content = styled.div`
    display: flex;
    align-items: center;
  `

  const Container = styled.div`
    position: relative;
    width: 190px;
    background-color: rgba(0, 0, 0, 0.5);
    border-radius: 25px;
    margin: 0 8px;
    height: 20px;

    @media (min-width: 400px) {
      width: 255px;
    }
  `

  const Progress = styled.span`
    position: absolute;
    left: 0;
    display: flex;
    justify-content: end;
    align-items: center;
    width: ${(props) => props.progress}%;
    background-color: #d75050;
    height: 20px;
    border-radius: 25px;
  `

  const Value = styled.p`
    margin: 0 8px 0 0;
    color: #fff;
    font-size: 16px;
  `

function ProgressBar({ value }) {
  return (
    <Content>
      <p>1</p>
      <Container>
        <Progress progress={Math.round((value * 100) / 255)}>
          <Value>{Math.round((value * 100) / 255)}</Value>
        </Progress>
      </Container>
      <p>255</p>
    </Content>
  )
}

export default ProgressBar
