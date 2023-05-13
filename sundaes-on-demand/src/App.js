import Container from 'react-bootstrap/Container';
import OrderEntry from './pages/entry/OrderEntry';
import { OrderDetailsProvder } from './contexts/OrderDetails';

function App() {
  return (
    <Container>
      <OrderDetailsProvder>
        {/* Summary page and entry page need provider */}
        <OrderEntry />
      </OrderDetailsProvder>
      {/* Confirmation page does not need provider */}
    </Container>
  );
}

export default App;
