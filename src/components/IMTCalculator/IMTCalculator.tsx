enum Location {
  PortugalContinental = 1,
  AcoresMadeira = 2
}

enum HouseType {
  HabitacaoPropriaPermanente = 1,
  HabitacaoSecundariaOuArrendamento = 2,
  PredioRustico = 3
}

interface ITaxBand {
  from: number
  taxPercentage: number
  singleTax: boolean
}

function RoundToTwoDecimalPlaces(num : number) : number{
  return Number(Math.round(Number(num + "e+2")) + "e-2");
}

function calculate(houseValue: number, bands: ITaxBand[]){
  let result = 0;

  for(let i=0; i<bands.length; i++){
    if(houseValue > bands[i].from){
      if(bands[i].singleTax){
        return houseValue * bands[i].taxPercentage / 100;
      }else{
        result += (houseValue-bands[i].from)*bands[i].taxPercentage/100;
        houseValue = bands[i].from;
      }
    }
  }

  return result;
}

function calculateIMT (
  houseLocation :Location,
  houseType :HouseType,
  houseValue :number) : number
  {
    if(houseType === HouseType.PredioRustico){
      return RoundToTwoDecimalPlaces(houseValue*0.05);
    }

    var bands: ITaxBand[] = []
    switch(houseLocation){
      case Location.PortugalContinental:
        switch(houseType){
          case HouseType.HabitacaoPropriaPermanente:
            bands = [
              {from: 1010000, taxPercentage: 7.5, singleTax: true},
              {from: 580066, taxPercentage: 6, singleTax: true},
              {from: 290085, taxPercentage: 8, singleTax: false},
              {from: 174071, taxPercentage: 7, singleTax: false},
              {from: 127667, taxPercentage: 5, singleTax: false},
              {from: 93331, taxPercentage: 2, singleTax: false},
              {from: 0, taxPercentage: 0, singleTax: false}
            ]
          break;

          case HouseType.HabitacaoSecundariaOuArrendamento:
            bands = [
              {from: 1010000, taxPercentage: 7.5, singleTax: true},
              {from: 556344, taxPercentage: 6, singleTax: true},
              {from: 290085, taxPercentage: 8, singleTax: false},
              {from: 174071, taxPercentage: 7, singleTax: false},
              {from: 127667, taxPercentage: 5, singleTax: false},
              {from: 93331, taxPercentage: 2, singleTax: false},
              {from: 0, taxPercentage: 1, singleTax: false}
            ]
          break;
        }
      break;

      case Location.AcoresMadeira:
        switch(houseType){
          case HouseType.HabitacaoPropriaPermanente:
            bands = [
              {from: 1262500, taxPercentage: 7.5, singleTax: true},
              {from: 725083, taxPercentage: 6, singleTax: true},
              {from: 362606, taxPercentage: 8, singleTax: false},
              {from: 217589, taxPercentage: 7, singleTax: false},
              {from: 159584, taxPercentage: 5, singleTax: false},
              {from: 116664, taxPercentage: 2, singleTax: false},
              {from: 0, taxPercentage: 0, singleTax: false}
            ]
          break;

          case HouseType.HabitacaoSecundariaOuArrendamento:
            bands = [
              {from: 1262500, taxPercentage: 7.5, singleTax: true},
              {from: 695430, taxPercentage: 6, singleTax: true},
              {from: 362606, taxPercentage: 8, singleTax: false},
              {from: 217589, taxPercentage: 7, singleTax: false},
              {from: 159584, taxPercentage: 5, singleTax: false},
              {from: 116664, taxPercentage: 2, singleTax: false},
              {from: 0, taxPercentage: 1, singleTax: false}
            ]
          break;
        }
      break;
    }
  return RoundToTwoDecimalPlaces(calculate(houseValue, bands));
}

export default calculateIMT