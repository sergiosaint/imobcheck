import React, { useEffect } from 'react';
import '../MainScreen.css'

function RoundToTwoDecimalPlaces(num : number) : number{
  return Number(Math.round(Number(num + "e+2")) + "e-2");
}

function calculateRepaymentValue(debt:number, montlyInterest:number, numberOfPayments:number) : number {
  return (debt / ((1-Math.pow(1+(montlyInterest), -numberOfPayments))/montlyInterest));
}

function MainScreen() {
  const [housePrice, setHousePrice] = React.useState("0");
  const [entryPayment, setEntryPayment] = React.useState("0");
  const [entryPaymentPercentage, setEntryPaymentPercentage] = React.useState("0");
  const [oneTimeCosts, setOneTimeCosts] = React.useState("0");
  const [monthlyCosts, setMonthlyCosts] = React.useState("0");
  const [monthlyBankPayment, setMonthlyBankPayment] = React.useState("0");
  const [anualCosts, setAnualCosts] = React.useState("0");
  const [debt, setDebt] = React.useState("0");
  const [interest, setInterest] = React.useState("4.2");
  const [repaymentValue, setRepaymentValue] = React.useState("0");
  const [repaymentTax, setRepaymentTax] = React.useState("0.5");
  const [numberOfPayments, setNumberOfPayments] = React.useState("420");
  const [repaymentEveryXMonths, setRepaymentEveryXMonths] = React.useState("0");
  const [startMonth, setStartMonth] = React.useState("0");
  const [useSavings, setUseSavings] = React.useState(false);
  const [grossRent, setGrossRent] = React.useState("0");
  const [netRent, setNetRent] = React.useState("0");
  const [rentTax, setRentTax] = React.useState("28");
  const [anualCashFlow, setAnualCashFlow] = React.useState("0");
  const [monthlyCashFlow, setMonthlyCashFlow] = React.useState("0");
  const [initialCost, setInitialCost] = React.useState("0");
  const [roi, setRoi] = React.useState("0");
  

  const onAmountChange = (e:any, set: any) => {
    const amount = e.target.value;

    if (!amount || amount.match(/^\d{1,}(\.\d{0,2})?$/)) {
      set(amount);
    }
  };

  const onAmountChange4 = (e:any, set: any) => {
    const amount = e.target.value;

    if (!amount || amount.match(/^\d{1,}(\.\d{0,4})?$/)) {
      set(amount);
    }
  };

  const onEntryPaymentPercentageChange = (e:any) => {
    const amount = e.target.value;

    if (!amount || amount.match(/^\d{1,}(\.\d{0,4})?$/)) {
      if(Number(amount) > 100){
        setEntryPaymentPercentage("100")
      }else{
        setEntryPaymentPercentage(amount);
      }
    }
  };

  useEffect(() => {
    var monthlyCostsNumber = Number(monthlyCosts);
    var monthlyBankPaymentNumber = Number(monthlyBankPayment);
    var anualCostsNumber = Number(anualCosts);
    var netRentNumber = Number(netRent);

    if(!Number.isNaN(monthlyCostsNumber) &&
       !Number.isNaN(monthlyBankPaymentNumber) && 
       !Number.isNaN(anualCostsNumber) &&
       !Number.isNaN(netRentNumber)){
      var anualCashFlowNumber = netRentNumber*12 - (monthlyCostsNumber*12 + monthlyBankPaymentNumber*12 + anualCostsNumber);
      var monthlyCashFlowNumber = anualCashFlowNumber/12;
      setAnualCashFlow(RoundToTwoDecimalPlaces(anualCashFlowNumber).toString())
      setMonthlyCashFlow(RoundToTwoDecimalPlaces(monthlyCashFlowNumber).toString())
    }
  },[monthlyCosts, monthlyBankPayment, anualCosts, netRent])

  useEffect(() => {
    var entryPaymentNumber = Number(entryPayment);
    var oneTimeCostsNumber = Number(oneTimeCosts);

    if(!Number.isNaN(entryPaymentNumber) && !Number.isNaN(oneTimeCostsNumber)){
      var initialCostNumber = entryPaymentNumber + oneTimeCostsNumber;
      setInitialCost(RoundToTwoDecimalPlaces(initialCostNumber).toString())
    }
  },[entryPayment, oneTimeCosts])

  useEffect(() => {
    var anualCashFlowNumber = Number(anualCashFlow);
    var initialCostNumber = Number(initialCost);

    if(!Number.isNaN(anualCashFlowNumber) && !Number.isNaN(initialCostNumber)){
      var roiNumber = RoundToTwoDecimalPlaces(anualCashFlowNumber*100/initialCostNumber)
      setRoi(roiNumber.toString())
    }
  },[anualCashFlow, initialCost])

  

  useEffect(() => {
    var housePriceNumber = Number(housePrice);
    var entryPaymentNumber = Number(entryPayment);

    if(!Number.isNaN(housePriceNumber) && !Number.isNaN(entryPaymentNumber)){
      var debtNumber = RoundToTwoDecimalPlaces(housePriceNumber-entryPaymentNumber);
      if(debtNumber < 0){
        debtNumber = 0;
      }
      setDebt(debtNumber.toString())
      setEntryPaymentPercentage((entryPaymentNumber*100/housePriceNumber).toString())
    }
  },[housePrice, entryPayment])

  useEffect(() => {
    var debtNumber = Number(debt);
    var interestNumber = Number(interest);
    var numberOfPaymentsNumber = Number(numberOfPayments);

    if(!Number.isNaN(debtNumber) && !Number.isNaN(interestNumber) && !Number.isNaN(numberOfPaymentsNumber)){
      var bankPayment = calculateRepaymentValue(debtNumber, interestNumber/100/12, numberOfPaymentsNumber)
      setMonthlyBankPayment(RoundToTwoDecimalPlaces(bankPayment).toString());
    }
  },[debt, interest, numberOfPayments])

  useEffect(() => {
    var housePriceNumber = Number(housePrice);
    var entryPaymentPercentageNumber = Number(entryPaymentPercentage)
    if(!Number.isNaN(housePriceNumber) && !Number.isNaN(entryPaymentPercentageNumber)){
      setEntryPayment((housePriceNumber*entryPaymentPercentageNumber/100).toString())
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[entryPaymentPercentage])

  useEffect(() => {
    var grossRentNumber = Number(grossRent);
    var rentTaxNumber = Number(rentTax)
    if(!Number.isNaN(grossRentNumber) && !Number.isNaN(rentTaxNumber)){
      setNetRent((grossRentNumber*(100-rentTaxNumber)/100).toString())
    }
  },[grossRent, rentTax])

  const onEntryPaymentChange = (e:any) => {
    const amount = e.target.value;

    if (!amount || amount.match(/^\d{1,}(\.\d{0,2})?$/)) {
      var val = Number(amount)
      var housePriceNumber = Number(housePrice);

      if (!Number.isNaN(housePriceNumber)){
        if (val > housePriceNumber){
          val = housePriceNumber
        }
      }

      setEntryPayment(val.toString());
    }
  };

  const handleChangeUseSavings = () => {
    setUseSavings(!useSavings);
  };

  return (

      <>
        <h2 className='title'>Calculador de Rentabilidade de Investimento Imobiliário</h2>

        <div className='input'>
          <form className='demoForm'>
            <div className='form-group'>

              <label htmlFor='housePrice'>Valor de compra</label>
              <input type='text'
                     className='form-control'
                     name='housePrice'
                     value={housePrice}
                     onChange={e => onAmountChange(e, setHousePrice)}
              />

              <div>
                <div className='side-by-side margin-right'>
                <label htmlFor='entryPayment'>Valor de entrada</label>
                <input type='text'
                       className='form-control'
                       name='entryPayment'
                       value={entryPayment}
                       onChange={e => onEntryPaymentChange(e)}
                />
                </div>

                <div className='side-by-side'>
                <label htmlFor='entryPaymentPercentage'>Percentagem de entrada</label>
                <input type='text'
                       className='form-control'
                       name='entryPaymentPercentage'
                       value={entryPaymentPercentage}
                       onChange={e => onEntryPaymentPercentageChange(e)}
                />
                </div>
              </div>

              <label htmlFor='oneTimeCosts'>Custos Burocráticos (IMT/Escritura/Avaliação)</label>
              <input type='text'
                     className='form-control'
                     name='oneTimeCosts'
                     value={oneTimeCosts}
                     onChange={e => onAmountChange(e, setOneTimeCosts)}
              />

              <label htmlFor='monthlyCosts'>Custos Mensais (seguros/condominio)</label>
              <input type='text'
                     className='form-control'
                     name='monthlyCosts'
                     value={monthlyCosts}
                     onChange={e => onAmountChange(e, setMonthlyCosts)}
              />

              <label htmlFor='anualCosts'>Custos Anuais (IMI/Manutenção)</label>
              <input type='text'
                     className='form-control'
                     name='anualCosts'
                     value={anualCosts}
                     onChange={e => onAmountChange(e, setAnualCosts)}
              />
            </div>
          </form>
        </div>
        <div className='input'>
          <form className='demoForm'>
            <div className='form-group'>
              <label htmlFor='debt'>Valor em dívida</label>
              <input type='text'
                     className='form-control'
                     name='debt'
                     value={debt}
                     disabled={true}
                     onChange={e => onAmountChange(e, setDebt)}
              />

             <label htmlFor='interest'>Taxa de juro anual</label>
              <input type='text'
                     className='form-control'
                     name='interest'
                     value={interest}
                     onChange={e => onAmountChange4(e, setInterest)}
             />

              <label htmlFor='numberOfPayments'>Prestações mensais em falta</label>
              <input type='text'
                     className='form-control'
                     name='numberOfPayments'
                     value={numberOfPayments}
                     onChange={e => setNumberOfPayments(e.target.value)}
              />

              <label htmlFor='monthlyBankPayment'>Prestação ao banco</label>
              <input type='text'
                     className='form-control'
                     name='monthlyBankPayment'
                     value={monthlyBankPayment}
                     disabled={true}
                     onChange={e => setMonthlyBankPayment(e.target.value)}
              />

{false &&
  <>
              <label htmlFor='repaymentValue'>Valor a despender</label>
              <input type='text'
                     className='form-control'
                     name='repaymentValue'
                     value={repaymentValue}
                     onChange={e => setRepaymentValue(e.target.value)}
              />

              <label htmlFor='repaymentTax'>Taxa de amortização</label>
              <input type='text'
                    className='form-control'
                    name='repaymentTax'
                    value={repaymentTax}
                    onChange={e => setRepaymentTax(e.target.value)}
              />

              <label htmlFor='repaymentEveryXMonths'>Pagamentos de x em x meses</label>
              <input type='text'
                    className='form-control'
                    name='repaymentEveryXMonths'
                    value={repaymentEveryXMonths}
                    onChange={e => setRepaymentEveryXMonths(e.target.value)}
              />

              <label htmlFor='startMonth'>Começar em x meses</label>
              <input type='text'
                     className='form-control'
                     name='startMonth'
                     value={startMonth}
                     onChange={e => setStartMonth(e.target.value)}
              />

              <label htmlFor='useSavings'>Usar poupanças</label>
              <input type="checkbox"
                     name='useSavings'
                     checked={useSavings}
                     onChange={handleChangeUseSavings}
              />
              </>
}
            </div>
          </form>
        </div>
        <div className='input'>
          <form className='demoForm'>
            <div className='form-group'>
              <label htmlFor='grossRent'>Renda Bruta Mensal</label>
              <input type='text'
                     className='form-control'
                     name='grossRent'
                     value={grossRent}
                    onChange={e => onAmountChange(e, setGrossRent)}
              />

             <label htmlFor='interest'>Taxa de imposto sobre renda</label>
              <input type='text'
                     className='form-control'
                     name='rentTax'
                     value={rentTax}
                     onChange={e => setRentTax(e.target.value)}
             />

              <label htmlFor='numberOfPayments'>Renda liquida Mensal</label>
              <input type='text'
                     className='form-control'
                     name='netRent'
                     disabled={true}
                     value={netRent}
                     onChange={e => setNetRent(e.target.value)}
              />
            </div>
          </form>
        </div>
        <div className='input'>
          <label htmlFor='monthlyCashFlow'>Cash Flow Mensal</label>
          <input type='text'
                 className='form-control'
                 name='monthlyCashFlow'
                 disabled={true}
                 value={monthlyCashFlow}
          />

          <label htmlFor='anualCashFlow'>Cash Flow Anual</label>
          <input type='text'
                 className='form-control'
                 name='anualCashFlow'
                 disabled={true}
                 value={anualCashFlow}
          />
          <label htmlFor='initialCost'>Investimento Inicial Total</label>
          <input type='text'
                 className='form-control'
                 name='initialCost'
                 disabled={true}
                 value={initialCost}
          />
          <label htmlFor='roi'>Retorno de investimento anual</label>
          <input type='text'
                 className='form-control'
                 name='roi'
                 disabled={true}
                 value={roi}
          />
        </div>
      </>
  )
}

export default MainScreen