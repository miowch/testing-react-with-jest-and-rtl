import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';

test('order phases for happy path', async () => {
    // render the app
    const user = userEvent.setup();
    const { unmount } = render(<App />);

    // add ice cream scoops and toppings
    const vanillaInput = await screen.findByRole('spinbutton', { name: 'Vanilla' });
    await user.clear(vanillaInput);
    await user.type(vanillaInput, '2');

    const mochiCheckbox = await screen.findByRole('checkbox', { name: 'M&Ms' });
    await user.click(mochiCheckbox);

    const cherriesCheckbox = await screen.findByRole('checkbox', { name: 'Cherries' });
    await user.click(cherriesCheckbox);

    // find and click order button

    const orderButton = await screen.findByRole('button', { name: /order sundae!/i });
    await user.click(orderButton);

    // check summary information based on order
    const summaryHeading = screen.getByRole('heading', { name: 'Order Summary' });
    expect(summaryHeading).toBeInTheDocument();
    const optionsList = await screen.findAllByRole('listitem');
    const scoopsSubtotal = await screen.findByText('Scoops: $', { exact: false });

    expect(scoopsSubtotal).toHaveTextContent('4.00');
    expect(optionsList[0]).toHaveTextContent('2 Vanilla');


    const toppingsSubtotal = await screen.findByText('Toppings: $', { exact: false });
    expect(toppingsSubtotal).toHaveTextContent('3.00');
    expect(optionsList[1]).toHaveTextContent('M&Ms');
    expect(optionsList[2]).toHaveTextContent('Cherries');

    // accept TaC and click button to confirm order
    const tac = await screen.findByRole('checkbox', { name: /i agree to terms and conditions/i })
    await user.click(tac);

    const confirmOrderButton = await screen.findByRole('button', { name: /confirm order/i });
    await user.click(confirmOrderButton);

    // confirm order number
    const loading = screen.getByText(/loading/i);
    expect(loading).toBeInTheDocument();

    const thankYouHeader = await screen.findByRole('heading', { name: /thank you/i });
    expect(thankYouHeader).toBeInTheDocument();

    const notLoading = screen.queryByText('loading');
    expect(notLoading).not.toBeInTheDocument();

    const orderNumber = await screen.findByText(/order number/i);
    expect(orderNumber).toBeInTheDocument();

    // click "new order" button on confirmation page
    const newOrderButton = await screen.findByRole('button', { name: /create new order/i });
    await user.click(newOrderButton);

    const title = await screen.findByRole('heading', { name: 'Design Your Sundae!' })
    expect(title).toBeVisible();
    const scoopsTotal = await screen.findByText('Scoops total: $0.00');
    const toppingsTotal = screen.getByText('Toppings total: $0.00');
    expect(scoopsTotal).toBeInTheDocument();
    expect(toppingsTotal).toBeInTheDocument();

    unmount();
});