import { render } from '@testing-library/react';
import { OrderDetailsProvder } from '../contexts/OrderDetails';

const renderWithContext = (ui, options) => render(ui, { wrapper: OrderDetailsProvder, ...options });

// re-export everything

export * from '@testing-library/react'

// overwrite render method
export { renderWithContext as render };