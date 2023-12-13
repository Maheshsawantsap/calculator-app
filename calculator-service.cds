using my.calculator as cal from '../db/data-model';

service CalculatorService {
     entity Calculations as projection on cal.Calculations;
}