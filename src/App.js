import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
import { ethers } from 'ethers'
import { Button, Form, Container, InputGroup, FormControl } from 'react-bootstrap';
import ContentsOnTheBlock from './artifacts/contracts/ContentsOnTheBlock.sol/ContentsOnTheBlock.json'

// Update with the contract address logged out to the CLI when it was deployed 
const contractAddress = "0xB8df848EA61B52eeD961AC8451ec25c5bf5188C1"

function App() {
  // store content in local state
  const [content, setContentValue] = useState("")

  const handleInput = (event) => {
    setContentValue(event.target.value)
  }

  // request access to the user's MetaMask account
  async function requestAccount() {
    await window.ethereum.request({ method: 'eth_requestAccounts' });
  }

  // call the smart contract, read the current content value
  async function fetchContent() {
    if (typeof window.ethereum !== 'undefined') {
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      const contract = new ethers.Contract(contractAddress, ContentsOnTheBlock.abi, provider)
      try {
        const data = await contract.getContent()
        setContentValue(data)
        console.log('data: ', data)
      } catch (err) {
        console.log("Error: ", err)
      }
    }    
  }

  // call the smart contract, send an update
  async function setContent() {
    if (!content) return
    if (typeof window.ethereum !== 'undefined') {
      await requestAccount()
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner()
      const contract = new ethers.Contract(contractAddress, ContentsOnTheBlock.abi, signer)
      const transaction = await contract.setContent(content)
      await transaction.wait()
      fetchContent()
    }
  }

  return (
    <Container>
      <br/><br/>
      <Form>
        <InputGroup size="lg">
          <InputGroup.Text>@Blockchain</InputGroup.Text>
          <FormControl 
            value={content}
            onChange={handleInput}
            placeholder="your content here"
            aria-label="Large" 
            aria-describedby="inputGroup-sizing-sm" 
          />
        </InputGroup>
      </Form>
      <br/>
      <Button onClick={fetchContent} variant="success">Get content</Button>
      &nbsp;&nbsp;&nbsp; or &nbsp;&nbsp;&nbsp;
      <Button onClick={setContent}>Set content</Button>
    </Container>
  );
}

export default App;