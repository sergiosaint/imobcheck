import React, { useEffect } from 'react';
import { Form, OverlayTrigger, Tooltip } from 'react-bootstrap';
import '../MainScreen.css'
import { calculateIMT, HouseLocation, HouseType } from './IMTCalculator/IMTCalculator';

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
  const [condominiumCosts, setCondominiumCosts] = React.useState("0");
  const [monthlyBankPayment, setMonthlyBankPayment] = React.useState("0");
  const [monthlyBankRepayment, setMonthlyBankRepayment] = React.useState("0");
  const [imiCosts, setImiCosts] = React.useState("0");
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
  const [monthlyCashFlowAmort, setMonthlyCashFlowAmort] = React.useState("0");
  const [initialCost, setInitialCost] = React.useState("0");
  const [roi, setRoi] = React.useState("0");
  const [repRoi, setRepRoi] = React.useState("0");
  const [houseLocation, setHouseLocation] = React.useState(HouseLocation.PortugalContinental);
  const [houseType, setHouseType] = React.useState(HouseType.HabitacaoPropriaPermanente);
  

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
        setEntryPayment(housePrice)
      }else{
        setEntryPaymentPercentage(amount);

        var housePriceNumber = Number(housePrice);
        var entryPaymentPercentageNumber = Number(amount)
        if(!Number.isNaN(housePriceNumber) && !Number.isNaN(entryPaymentPercentageNumber)){
          setEntryPayment((housePriceNumber*entryPaymentPercentageNumber/100).toString())
        }
      }
    }
  };

  const onChangeHouseType = (e:any) => {
    setHouseType(Number(e.target.value))
  };

  const onChangeHouseLocation = (e:any) => {
    setHouseLocation(Number(e.target.value))
  };

  useEffect(() => {
    var monthlyCostsNumber = Number(monthlyCosts);
    var monthlyBankPaymentNumber = Number(monthlyBankPayment);
    var anualCostsNumber = Number(anualCosts);
    var netRentNumber = Number(netRent);
    var imi = Number(imiCosts);
    var condominium = Number(condominiumCosts);

    if (Number.isNaN(imi)) { imi = 0 }
    if (Number.isNaN(condominium)) { condominium = 0 }


    if(!Number.isNaN(monthlyCostsNumber) &&
       !Number.isNaN(monthlyBankPaymentNumber) && 
       !Number.isNaN(anualCostsNumber) &&
       !Number.isNaN(netRentNumber)){
      var anualCashFlowNumber = netRentNumber*12 - ((monthlyCostsNumber+condominium+monthlyBankPaymentNumber)*12 + anualCostsNumber + imi);
      var monthlyCashFlowNumber = anualCashFlowNumber/12;
      setAnualCashFlow(RoundToTwoDecimalPlaces(anualCashFlowNumber).toString())
      setMonthlyCashFlow(RoundToTwoDecimalPlaces(monthlyCashFlowNumber).toString())

      let monthlyBankRepaymentNumber = Number(monthlyBankRepayment);
      if(Number.isNaN(monthlyBankRepayment)){
        monthlyBankRepaymentNumber = 0;
      }

      setMonthlyCashFlowAmort(RoundToTwoDecimalPlaces(monthlyCashFlowNumber + monthlyBankRepaymentNumber).toString())
    }
  },[monthlyCosts, monthlyBankPayment, monthlyBankRepayment, anualCosts, netRent, imiCosts, condominiumCosts])

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
      var repRoiNumber = RoundToTwoDecimalPlaces((anualCashFlowNumber + RoundToTwoDecimalPlaces(Number(monthlyBankRepayment)*12)) *100/ initialCostNumber)
      setRepRoi(repRoiNumber.toString())
    }
  },[anualCashFlow, initialCost, monthlyBankRepayment])

  

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
      setMonthlyBankRepayment(RoundToTwoDecimalPlaces(bankPayment - RoundToTwoDecimalPlaces(debtNumber*(interestNumber/100/12))).toString());
    }
  },[debt, interest, numberOfPayments])

  useEffect(() => {
    var grossRentNumber = Number(grossRent);
    var rentTaxNumber = Number(rentTax);
    var imi = Number(imiCosts);
    var condominium = Number(condominiumCosts);
    if(!Number.isNaN(grossRentNumber) && !Number.isNaN(rentTaxNumber)){
      if (Number.isNaN(imi)) { imi = 0 }
      if (Number.isNaN(condominium)) { condominium = 0 }

      var taxes = 0
      var netRent = grossRentNumber
      if(rentTaxNumber > 0) {
        taxes = (((grossRentNumber-condominium)*12)-imi)*(rentTaxNumber/100)
      }

      if (taxes > 0){
        netRent = grossRentNumber-(taxes/12)
      }
      
      setNetRent(RoundToTwoDecimalPlaces(netRent).toString())
    }
  },[grossRent, rentTax, imiCosts, condominiumCosts])

  useEffect(() => {
    
  },[houseLocation, houseType])

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
      setEntryPaymentPercentage((val*100/housePriceNumber).toString())
    }
  };

  const handleChangeUseSavings = () => {
    setUseSavings(!useSavings);
  };

  return (

      <>
        <h2 className='title'>Calculador de Rentabilidade de Investimento Imobiliário</h2>

        <div className='roundedBox settings'>
          <form className='demoForm'>
            <div className='form-group'>

              <label htmlFor='housePrice'>Valor de compra</label>
              <div className="input-group">
                <input type='text'
                       className='form-control'
                       name='housePrice'
                       value={housePrice}
                       onChange={e => onAmountChange(e, setHousePrice)}
                />
                <span className="input-group-text"> € </span>
              </div>

              <div className="labelSpacing">
                <div className='side-by-side margin-right smallWidth'>
                  <label htmlFor='entryPayment labelSpacing'>Valor de entrada</label>
                  <div className="input-group">
                    <input type='text'
                           className='form-control'
                           name='entryPayment'
                           value={entryPayment}
                           onChange={e => onEntryPaymentChange(e)}
                    />
                    <span className="input-group-text"> € </span>
                  </div>
                </div>

                <div className='side-by-side smallWidth'>
                  <label htmlFor='entryPaymentPercentage labelSpacing'>Percentagem de entrada</label>
                  <div className="input-group">
                    <input type='text'
                           className='form-control'
                           name='entryPaymentPercentage'
                           value={entryPaymentPercentage}
                           onChange={e => onEntryPaymentPercentageChange(e)}
                    />
                    <span className="input-group-text"> % </span>
                  </div>
                </div>
              </div>

              <div className="labelSpacing">
              <label htmlFor='oneTimeCosts labelSpacing'>Custos Burocráticos (IMT/IS/Escritura/Crédito)</label>
              <div className="input-group">
                <input type='text'
                       className='form-control'
                       name='oneTimeCosts'
                       value={oneTimeCosts}
                       onChange={e => onAmountChange(e, setOneTimeCosts)}
                />
                <span className="input-group-text"> € </span>
              </div>
              </div>

              <div className="labelSpacing">
              <label htmlFor='monthlyCosts labelSpacing'>Custos Mensais (seguros)</label>
              <div className="input-group">
                <input type='text'
                       className='form-control'
                       name='monthlyCosts'
                       value={monthlyCosts}
                       onChange={e => onAmountChange(e, setMonthlyCosts)}
                />
                <span className="input-group-text"> € </span>
              </div>
              </div>
              
              <OverlayTrigger
                  overlay={<Tooltip id="button-tooltip">
                  O Custo anual do condominio {Number.isNaN(Number(condominiumCosts)) ? "" : "(" + RoundToTwoDecimalPlaces(Number(condominiumCosts)*12) + ")"} deve ser declarado no anexo F da declaração de IRS para abater nos lucros das rendas e pagar menos impostos.
                </Tooltip>}
                  placement="top"
                  delay={{ show: 250, hide: 300 }}
              >
                <div className="labelSpacing">
                  <label htmlFor='condominiumCosts'>Custo mensal do condominio</label>
                  <div className="input-group">
                    <input type='text'
                           className='form-control'
                           name='condominiumCosts'
                           value={condominiumCosts}
                           onChange={e => onAmountChange(e, setCondominiumCosts)}
                    />
                    <span className="input-group-text"> € </span>
                  </div>
                </div>
              </OverlayTrigger>

              <OverlayTrigger
                  overlay={<Tooltip id="button-tooltip">
                  O IMI deve ser declarado no anexo F da declaração de IRS para abater nos lucros das rendas e pagar menos impostos.
                </Tooltip>}
                  placement="top"
                  delay={{ show: 250, hide: 300 }}
              >
                <div className="labelSpacing">
                  <label htmlFor='imiCosts'>Custo do IMI</label>
                  <div className="input-group">
                    <input type='text'
                           className='form-control'
                           name='imiCosts'
                           value={imiCosts}
                           onChange={e => onAmountChange(e, setImiCosts)}
                    />
                    <span className="input-group-text"> € </span>
                  </div>
                </div>
              </OverlayTrigger>

              <div className="labelSpacing">
              <label htmlFor='anualCosts labelSpacing'>Custos Anuais (Manutenção/Desocupação)</label>
              <div className="input-group">
                <input type='text'
                       className='form-control'
                       name='anualCosts'
                       value={anualCosts}
                       onChange={e => onAmountChange(e, setAnualCosts)}
                />
                <span className="input-group-text"> € </span>
              </div>
              </div>

              <div className="labelSpacing">
              <label htmlFor='houseLocation'>Localização do imóvel</label>
              <Form.Select name='houseLocation' onChange={(e) => onChangeHouseLocation(e)} value={houseLocation}>
                <option value={HouseLocation.PortugalContinental}>Portugal Continental</option>
                <option value={HouseLocation.AcoresMadeira}>Açores ou Madeira</option>
              </Form.Select>
              </div>

              <div className="labelSpacing">
              <label htmlFor='houseType labelSpacing'>Destino da habitação</label>
              <Form.Select name='houseType' onChange={(e) => onChangeHouseType(e)} value={houseType}>
                <option value={HouseType.HabitacaoPropriaPermanente}>Habitação própria e permanente</option>
                <option value={HouseType.HabitacaoSecundariaOuArrendamento}>Habitação Secundária</option>
                <option value={HouseType.PredioRustico}>Prédio rústico</option>
              </Form.Select>
              </div>
            </div>
          </form>
        </div>
        <div className='roundedBox credit'>
          <form className='demoForm'>
            <div className='form-group'>
              <label htmlFor='debt'>Valor em dívida</label>
              <div className="input-group">
                <input type='text'
                       className='form-control'
                       name='debt'
                       value={debt}
                       disabled={true}
                       onChange={e => onAmountChange(e, setDebt)}
                />
                <span className="input-group-text"> € </span>
              </div>

             <div className="labelSpacing">
             <label htmlFor='interest'>Taxa de juro anual</label>
             <div className="input-group">
               <input type='text'
                      className='form-control'
                      name='interest'
                      value={interest}
                      onChange={e => onAmountChange4(e, setInterest)}
               />
               <span className="input-group-text"> % </span>
             </div>
             </div>

              <div className="labelSpacing">
              <label htmlFor='numberOfPayments'>Prestações mensais em falta</label>
              <div className="input-group">
                <input type='text'
                       className='form-control'
                       name='numberOfPayments'
                       value={numberOfPayments}
                       onChange={e => setNumberOfPayments(e.target.value)}
                />
                <span className="input-group-text"> # </span>
              </div>
              </div>

              <div className="labelSpacing">
              <label htmlFor='monthlyBankPayment'>Prestação ao banco</label>
              <div className="input-group">
                <input type='text'
                       className='form-control'
                       name='monthlyBankPayment'
                       value={monthlyBankPayment}
                       disabled={true}
                       onChange={e => setMonthlyBankPayment(e.target.value)}
                />
                <span className="input-group-text"> € </span>
              </div>
              </div>

              <div className="labelSpacing">
                <label htmlFor='monthlyBankRepayment'>Divida amortizada mensalmente</label>
                <div className="input-group">
                  <input type='text'
                         className='form-control'
                         name='monthlyBankRepayment'
                         value={monthlyBankRepayment}
                         disabled={true}
                         onChange={e => setMonthlyBankRepayment(e.target.value)}
                  />
                  <span className="input-group-text"> € </span>
                </div>
              </div>

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
        <div className='roundedBox rents'>
          <form className='demoForm'>
            <div className='form-group'>
              <label htmlFor='grossRent'>Renda Bruta Mensal</label>
              <div className="input-group">
                <input type='text'
                       className='form-control'
                       name='grossRent'
                       value={grossRent}
                       onChange={e => onAmountChange(e, setGrossRent)}
                />
                <span className="input-group-text"> € </span>
              </div>

             <label htmlFor='interest'>Taxa de imposto sobre renda</label>
             <div className="input-group">
               <input type='text'
                      className='form-control'
                      name='rentTax'
                      value={rentTax}
                      onChange={e => setRentTax(e.target.value)}
               />
               <span className="input-group-text"> % </span>
             </div>

              <label htmlFor='numberOfPayments'>Renda liquida Mensal</label>
              <div className="input-group">
                <input type='text'
                       className='form-control'
                       name='netRent'
                       disabled={true}
                       value={netRent}
                       onChange={e => setNetRent(e.target.value)}
                />
                <span className="input-group-text"> € </span>
              </div>
            </div>
          </form>
        </div>
        <div className='roundedBox cashFlow'>
          <label htmlFor='monthlyCashFlow'>Cash Flow Mensal</label>
          <div className="input-group">
            <input type='text'
                   className='form-control'
                   name='monthlyCashFlow'
                   disabled={true}
                   value={monthlyCashFlow}
            />
            <span className="input-group-text"> € </span>
          </div>

          <label htmlFor='monthlyCashFlowAmort'>Cash Flow Mensal + amortização</label>
          <div className="input-group">
            <input type='text'
                   className='form-control'
                   name='monthlyCashFlowAmort'
                   disabled={true}
                   value={monthlyCashFlowAmort}
            />
            <span className="input-group-text"> € </span>
          </div>

          

          <label htmlFor='anualCashFlow'>Cash Flow Anual</label>
          <div className="input-group">
            <input type='text'
                   className='form-control'
                   name='anualCashFlow'
                   disabled={true}
                   value={anualCashFlow}
            />
            <span className="input-group-text"> € </span>
          </div>

          <label htmlFor='initialCost'>Investimento Inicial Total</label>
          <div className="input-group">
          <input type='text'
                 className='form-control'
                 name='initialCost'
                 disabled={true}
                 value={initialCost}
          />
          <span className="input-group-text"> € </span>
          </div>

          <label htmlFor='roi'>Retorno de investimento anual</label>
          <div className="input-group">
            <input type='text'
                   className='form-control'
                   name='roi'
                   disabled={true}
                   value={roi}
            />
            <span className="input-group-text"> % </span>
          </div>

          <label htmlFor='repRoi'>ROI com amortização</label>
          <div className="input-group">
            <input type='text'
                   className='form-control'
                   name='repRoi'
                   disabled={true}
                   value={repRoi}
            />
            <span className="input-group-text"> % </span>
          </div>
        </div>

        <div className='roundedBox'>
          Custos burocráticos estimados:<br/>
          {Number(debt) > 0 && <>Custos de avaliacao de crédito 400€<br/>Custo de escritura com crédito 700€ (no portal casa pronta)<br/></>}
          {Number(debt) === 0 && <>Custo de escritura com capitais próprios 375€ (no portal casa pronta)<br/></>}
          Valor de IMT {calculateIMT(houseLocation, houseType, Number(housePrice))}€<br/>
          IS {RoundToTwoDecimalPlaces(Number(housePrice)*0.008)}€<br/>
          Total = {calculateIMT(houseLocation, houseType, Number(housePrice)) + RoundToTwoDecimalPlaces(Number(housePrice)*0.008) + (Number(debt) > 0 ? 1100 : 375)}€<br/>
        </div>
      </>
  )
}

export default MainScreen