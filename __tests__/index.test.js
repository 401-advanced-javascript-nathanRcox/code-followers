'use strict';

describe('Console Logs', () => {
  let consoleSpy;
  beforeEach(() => {
    // Attach to the console
    consoleSpy = jest.spyOn(console, 'log').mockImplementation();
  });

  afterEach(() =>{
    // put the console back
    consoleSpy.mockRestore();
  });

  it('renders a console.log', () => {
    setTimeout(() => { expect(consoleSpy).toHaveBeenCalled(); }, 1000);
  });

});