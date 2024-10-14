# Atlys Assignment

Assignment done using:
- React (TypeScript)
- TailwindCSS
- No external libraries

Please find the hosted build on Vercel [here](https://gineet-atlys.vercel.app/)
>https://gineet-atlys.vercel.app/

# Important Things (Please Read)
- `FunctionManager` can render different number of cards based on the config (based on instructions in the `FunctionManager.types.ts` file)
- For an equation to be valid, it needs at least two operands with an operator in between
- If an equation is left empty, the result from previous function is simply passed onto the next non-empty card
- I'm using *`eval`* since any library usage was **strong discouraged**, but we'd ideally use something like `mathjs` to parse and evaluate the equations.
- All lines between components are dynamically generated through code on a canvas element (couldn't get the curved lines to be drawn)
- Custom `Select` dropdown component is there but only displays a simple `div` right now (can implement later if required)


## Steps to run locally
1. Clone the repo
2. Install the dependencies using `npm install`
- Running dev build - `npm run dev`
- Running prod build - `npm run build && npm run preview`

## Key components and their roles

### Function Manager
- Handles the entire flow of the functions
- Handles the initial value entered by the user
- Renders `FunctionCard`s 
- Displays the result in the output value area
- Handles the calculation logic
- Draws the visual connecting lines between different cards

### FunctionCard
- The card for one function (also referred to as `block`) in the code
- Handles the rendering of the card elements, including the equation input field
- Passes the incoming (valid) equation to FunctionManager after minimally changing it in case of exponentiation operator in equation

### EquationInput
- Handles the user input of the equation
- Performs input validation
- If the equation is valid, passes it to `FunctionCard` via callback
