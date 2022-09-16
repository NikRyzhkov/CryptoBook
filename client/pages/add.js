import { useState } from "react";
import { Button, Form, Input, Message } from "semantic-ui-react";
import Layout from "../components/layout";
import contactFactory from "../contactFactory";
import provider from "../provider";

const AddContact = () => {
    const [telegram, setTelegram] = useState("");
    const [discord, setDiscord] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
 
    
    const handleSubmit = async (event) => {
      event.preventDefault();
      setErrorMessage("");
      setSuccessMessage("");
      if(!telegram){
        setErrorMessage("А телеграмм где?")
      }


      const signer = provider.getSigner();
      const contactFactoryWithSigner = contactFactory.connect(signer)
          console.log("Func: ", contactFactoryWithSigner.functions)
          
        try{
          let response
          if(discord){
            response = await contactFactoryWithSigner["createContact(string,string)"](telegram, discord);
          }else{
            response = await contactFactoryWithSigner["createContact(string)"](telegram);
          }
          console.log("response", response);
          setSuccessMessage("Хэш транзакции: " + response.hash);
         
      }catch(error){
        console.error(error);
        setErrorMessage(error.message);
      }

      const accounts = await ethereum.request({
        method: 'eth_requestAccounts',
      });
    }
    return ( <Layout>
         <Form error={!!errorMessage} success={!!successMessage} onSubmit={handleSubmit}>
        <Form.Group widths='equal'>
          <Form.Field
            control={Input}
            label='Telegram'
            value={telegram}
            onChange={ (event) => setTelegram(event.target.value)}
            placeholder='Введите здесь'
          />
          <Form.Field
            control={Input}
            value={discord}
            onChange={ (event) => setDiscord(event.target.value)}
            label='Discord'
            placeholder='Введите здесь'
          />
          </Form.Group>
          <Button primary type='submit'>Сохранить</Button>
          <Message style={{wordBreak: 'break-word'}} error header='Ну что ж такое!' content={errorMessage} />
          <Message success header='Всё получилось!' content={successMessage} />
        </Form>
    </Layout> );
}
 
export default AddContact