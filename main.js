class Expense {
    constructor(title , amount , type) {
        this.amount = Number(amount) ;
        this.title = title;
        this.type = type;
        this.createTime = Date.now();
    }
}

class App {
    constructor(domContainers) {
        this.allTransaction = [];
        this.expense = 0;
        this.incomes = 0;
        this.ballance = 0;
        
        // DOM containers
        const { incomeContainer , expenseContainer , ballanceContainer , historyContainer } = domContainers;
        this.historyContainer = document.querySelector(historyContainer);
        this.incomeContainer = document.querySelector(incomeContainer);
        this.expenseContainer = document.querySelector(expenseContainer);
        this.ballanceContainer = document.querySelector(ballanceContainer);
    }
    createNewExpense() {
        const newExpenseObj = new Expense(expenseTextInput.value , expenseAmountInput.value , expenseType.value)
        this.allTransaction.push(newExpenseObj);
        this.renderHistory();
        this.calculator()
    }
    calculator() {
        this.incomes = this.allTransaction.filter(el => el.type === "+").reduce((acc , res) =>  acc + res.amount , 0)
        this.expense = this.allTransaction.filter(el => el.type === "-").reduce((acc , res) =>  acc + res.amount , 0)
        this.ballance = this.incomes - this.expense;
        // rendering new result base these new data
        this.renderResultsBox()
    }   
    renderHistory() {
        this.historyContainer.innerHTML = "";
        this.allTransaction.map(({ type , title , amount , createTime }) => {
        // create time would be handled
        const template = `<div class="history__item--${type === "+" ? "plus" : "mines"}">
                                <p>${title}</p>
                                <p>$${amount}</p>
                                </div>`;
        this.historyContainer.innerHTML += template;
        })
    }
    renderResultsBox() {
        this.incomeContainer.textContent = `Income : $${this.incomes}`;
        this.expenseContainer.textContent = `Expense : $${this.expense}`;
        this.ballanceContainer.textContent = `Your Ballance :$${this.ballance}`;
    }
}

(() => {
    const form = document.querySelector("form");

    const appInstance = new App({
        historyContainer : "#historyContainer",
        incomeContainer : ".income" ,
        expenseContainer : ".expense" ,
        ballanceContainer : ".balance"
    });

    form.addEventListener("submit" , () => {
        e.preventDefault();
        appInstance.createNewExpense();
        e.currentTarget.reset()
    });
})()