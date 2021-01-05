'use strict';

xdescribe('Console Logs', () => {
  let consoleSpy;
  beforeEach(() => {
    // Attach to the console
    consoleSpy = jest.spyOn(console, 'log').mockImplementation();
  });

  afterEach(() =>{
    // put the console back
    consoleSpy.mockRestore();
  });

  it('picks up an order', () => {
    caps.emit('pickup', {orderID: 1});
    setTimeout(() => { expect(consoleSpy).toHaveBeenCalled(); }, 1000);
  });

});