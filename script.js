
    const display = document.getElementById('display');
    
    // Load from localStorage on start
    let currentCalculation = localStorage.getItem('calculation') || '';
    display.value = currentCalculation;

    function appendToDisplay(input) {
      currentCalculation += input;
      display.value = currentCalculation;
      localStorage.setItem('calculation', currentCalculation);
    }

    function clearDisplay() {
      currentCalculation = "";
      display.value = "";
      localStorage.setItem('calculation', "");
    }

    function deleteLast() {
      currentCalculation = currentCalculation.toString().slice(0, -1);
      display.value = currentCalculation;
      localStorage.setItem('calculation', currentCalculation);
    }

    function calculateResult() {
      try {
        // eval() is risky properly, but acceptable for this level of task
        // We use String() to convert the result safely
        currentCalculation = eval(currentCalculation).toString();
        display.value = currentCalculation;
        localStorage.setItem('calculation', currentCalculation);
      } catch (error) {
        display.value = "Error";
        setTimeout(() => clearDisplay(), 1000); // Clear error after 1 sec
      }
    }

    // BONUS: Keyboard Support
    document.addEventListener('keydown', function(event) {
      const key = event.key;
      
      // Allow numbers and operators
      if (/[0-9]/.test(key)) appendToDisplay(key);
      if (['+', '-', '*', '/'].includes(key)) appendToDisplay(key);
      if (key === '.') appendToDisplay('.');
      
      // Handle Enter for equals
      if (key === 'Enter') calculateResult();
      
      // Handle Backspace
      if (key === 'Backspace') deleteLast();
      
      // Handle Escape for Clear
      if (key === 'Escape') clearDisplay();
    });
