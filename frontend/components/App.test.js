import React from 'react';
import AppFunctional from './AppFunctional';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom/extend-expect';

test('sanity', async () => {
  render(<AppFunctional/>);

  const upButton = screen.getByTestId("yukarı");

  userEvent.click(upButton);
  userEvent.click(upButton);

  expect(screen.getByText("Yukarıya gidemezsiniz")).toBeInTheDocument();
});
