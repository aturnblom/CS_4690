
describe("nameCompare(a, b) - compares two last names", function() {
    
    it("should return 0 if the two strings are the same", function() {
        expect(nameCompare({lname:'Smith', fname:'John'}, {lname:'Smith', fname:'John'})).toBe(0);
        expect(nameCompare({lname:'A', fname:'John'}, {lname:'A', fname:'John'})).toBe(0);
        expect(nameCompare({lname:'smith', fname:'John'}, {lname:'smith', fname:'John'})).toBe(0);
        expect(nameCompare({lname:'xylophone', fname:'John'}, {lname:'xylophone', fname:'John'})).toBe(0);
        expect(nameCompare({lname:'A', fname:'John'}, {lname:'A', fname:'John'})).toBe(0);
        expect(nameCompare({lname:'B', fname:'John'}, {lname:'B', fname:'John'})).toBe(0);
        
    });

    it("and should return positive number if first string should come after", function() {
        expect(nameCompare({lname:'b', fname:'John'}, {lname:'a', fname:'John'})).toBeGreaterThan(0);
        expect(nameCompare({lname:'c', fname:'John'}, {lname:'b', fname:'John'})).toBeGreaterThan(0);
        expect(nameCompare({lname:'williams', fname:'John'}, {lname:'adams', fname:'John'})).toBeGreaterThan(0);
        expect(nameCompare({lname:'Williams', fname:'John'}, {lname:'Adams', fname:'John'})).toBeGreaterThan(0);
        expect(nameCompare({lname:'Z', fname:'John'}, {lname:'A', fname:'John'})).toBeGreaterThan(0);
        expect(nameCompare({lname:'Ericson ', fname:'John'}, {lname:'Ericson', fname:'John'})).toBeGreaterThan(0);
    });

    it("and should return negative number if first string should come first", function() {
        expect(nameCompare({lname:'a', fname:'John'}, {lname:'b', fname:'John'})).toBeLessThan(0);
        expect(nameCompare({lname:'b', fname:'John'}, {lname:'c', fname:'John'})).toBeLessThan(0);
        expect(nameCompare({lname:'adams', fname:'John'}, {lname:'williams', fname:'John'})).toBeLessThan(0);
        expect(nameCompare({lname:'Adams', fname:'John'}, {lname:'Williams', fname:'John'})).toBeLessThan(0);
        expect(nameCompare({lname:'A', fname:'John'}, {lname:'Z', fname:'John'})).toBeLessThan(0);
        expect(nameCompare({lname:'Ericson', fname:'John'}, {lname:'Ericson ', fname:'John'})).toBeLessThan(0);
    });
});

describe("fnameCompare(a, b) - compares two first names", function() {
    
    it("should return 0 if the two strings are the same", function() {
        expect(fnameCompare({fname:'Smith'}, {fname:'Smith'})).toBe(0);
        expect(fnameCompare({fname:''}, {fname:''})).toBe(0);
        expect(fnameCompare({fname:'smith'}, {fname:'smith'})).toBe(0);
        expect(fnameCompare({fname:'xylophone'}, {fname:'xylophone'})).toBe(0);
        expect(fnameCompare({fname:'A'}, {fname:'A'})).toBe(0);
        expect(fnameCompare({fname:' '}, {fname:' '})).toBe(0);
        
    });

    it("and should return positive number if first string should come after", function() {
        expect(fnameCompare({fname:'b'}, {fname:'a'})).toBeGreaterThan(0);
        expect(fnameCompare({fname:'c'}, {fname:'b'})).toBeGreaterThan(0);
        expect(fnameCompare({fname:'williams'}, {fname:'adams'})).toBeGreaterThan(0);
        expect(fnameCompare({fname:'Williams'}, {fname:'Adams'})).toBeGreaterThan(0);
        expect(fnameCompare({fname:'Z'}, {fname:'A'})).toBeGreaterThan(0);
        expect(fnameCompare({fname:'Ericson '}, {fname:'Ericson'})).toBeGreaterThan(0);
    });

    it("and should return negative number if first string should come first", function() {
        expect(fnameCompare({fname:'a'}, {fname:'b'})).toBeLessThan(0);
        expect(fnameCompare({fname:'b'}, {fname:'c'})).toBeLessThan(0);
        expect(fnameCompare({fname:'adams'}, {fname:'williams'})).toBeLessThan(0);
        expect(fnameCompare({fname:'Adams'}, {fname:'Williams'})).toBeLessThan(0);
        expect(fnameCompare({fname:'A'}, {fname:'Z'})).toBeLessThan(0);
        expect(fnameCompare({fname:'Ericson'}, {fname:'Ericson '})).toBeLessThan(0);
    });
});

describe("cityCompare(a, b) - compares two city names", function() {
    
    it("should return 0 if the two strings are the same", function() {
        expect(cityCompare({city:'Provo'}, {city:'Provo'})).toBe(0);
        expect(cityCompare({city:''}, {city:''})).toBe(0);
        expect(cityCompare({city:'smith'}, {city:'smith'})).toBe(0);
        expect(cityCompare({city:'xylophone'}, {city:'xylophone'})).toBe(0);
        expect(cityCompare({city:'A'}, {city:'A'})).toBe(0);
        expect(cityCompare({city:' '}, {city:' '})).toBe(0);
        
    });

    it("and should return positive number if first string should come after", function() {
        expect(cityCompare({city:'b'}, {city:'a'})).toBeGreaterThan(0);
        expect(cityCompare({city:'b'}, {city:'A'})).toBeGreaterThan(0);
        expect(cityCompare({city:'williamsburg'}, {city:'adamsburg'})).toBeGreaterThan(0);
        expect(cityCompare({city:'Williamsburg'}, {city:'Adamsburg'})).toBeGreaterThan(0);
        expect(cityCompare({city:'Z'}, {city:'A'})).toBeGreaterThan(0);
        expect(cityCompare({city:'Ericsonville '}, {city:'Ericsonville'})).toBeGreaterThan(0);
    });

    it("and should return negative number if first string should come first", function() {
        expect(cityCompare({city:'a'}, {city:'b'})).toBeLessThan(0);
        expect(cityCompare({city:'A'}, {city:'b'})).toBeLessThan(0);
        expect(cityCompare({city:'adamsburg'}, {city:'williamsburg'})).toBeLessThan(0);
        expect(cityCompare({city:'Adamsburg'}, {city:'Williamsburg'})).toBeLessThan(0);
        expect(cityCompare({city:'A'}, {city:'Z'})).toBeLessThan(0);
        expect(cityCompare({city:'Ericsonville'}, {city:'Ericsonville '})).toBeLessThan(0);
    });
});

describe("stateCompare(a, b) - compares two state abbreviations", function() {
    
    it("should return 0 if the two strings are the same", function() {
        expect(stateCompare({state:'ID'}, {state:'ID'})).toBe(0);
        expect(stateCompare({state:''}, {state:''})).toBe(0);
        expect(stateCompare({state:'UT'}, {state:'UT'})).toBe(0);
        expect(stateCompare({state:'xylophone'}, {state:'xylophone'})).toBe(0);
        expect(stateCompare({state:'A'}, {state:'A'})).toBe(0);
        expect(stateCompare({state:' '}, {state:' '})).toBe(0);
        
    });

    it("and should return positive number if first string should come after", function() {
        expect(stateCompare({state:'UT'}, {state:'ID'})).toBeGreaterThan(0);
        expect(stateCompare({state:'b'}, {state:'A'})).toBeGreaterThan(0);
        expect(stateCompare({state:'williamsburg'}, {state:'adamsburg'})).toBeGreaterThan(0);
        expect(stateCompare({state:'Williamsburg'}, {state:'Adamsburg'})).toBeGreaterThan(0);
        expect(stateCompare({state:'Z'}, {state:'A'})).toBeGreaterThan(0);
        expect(stateCompare({state:'Ericsonville '}, {state:'Ericsonville'})).toBeGreaterThan(0);
    });

    it("and should return negative number if first string should come first", function() {
        expect(stateCompare({state:'AK'}, {state:'WY'})).toBeLessThan(0);
        expect(stateCompare({state:'A'}, {state:'b'})).toBeLessThan(0);
        expect(stateCompare({state:'adamsburg'}, {state:'williamsburg'})).toBeLessThan(0);
        expect(stateCompare({state:'Adamsburg'}, {state:'Williamsburg'})).toBeLessThan(0);
        expect(stateCompare({state:'A'}, {state:'Z'})).toBeLessThan(0);
        expect(stateCompare({state:'Ericsonville'}, {state:'Ericsonville '})).toBeLessThan(0);
    });
});

describe("zipCompare(a, b) - compares two zip codes", function() {
    
    it("should return 0 if the two numbers are the same", function() {
        expect(zipCompare({zip:0}, {zip:0})).toBe(0);
        expect(zipCompare({zip:93713}, {zip:93713})).toBe(0);
        expect(zipCompare({zip:42}, {zip:42})).toBe(0);
        expect(zipCompare({zip:76.7}, {zip:76.7})).toBe(0);
        expect(zipCompare({zip:0007}, {zip:7})).toBe(0);
        expect(zipCompare({zip:50.0}, {zip:50})).toBe(0);
        
    });

    it("and should return positive number if first number should come after", function() {
        expect(zipCompare({zip:1}, {zip:0})).toBeGreaterThan(0);
        expect(zipCompare({zip:93714}, {zip:93713})).toBeGreaterThan(0);
        expect(zipCompare({zip:43}, {zip:42})).toBeGreaterThan(0);
        expect(zipCompare({zip:76.8}, {zip:76.7})).toBeGreaterThan(0);
        expect(zipCompare({zip:7.2}, {zip:7})).toBeGreaterThan(0);
        expect(zipCompare({zip:50.5}, {zip:50})).toBeGreaterThan(0);
    });

    it("and should return negative number if first number should come first", function() {
        expect(zipCompare({zip:0}, {zip:1})).toBeLessThan(0);
        expect(zipCompare({zip:93713}, {zip:93714})).toBeLessThan(0);
        expect(zipCompare({zip:42}, {zip:43})).toBeLessThan(0);
        expect(zipCompare({zip:76.7}, {zip:76.8})).toBeLessThan(0);
        expect(zipCompare({zip:0007}, {zip:7.1})).toBeLessThan(0);
        expect(zipCompare({zip:50.0}, {zip:50.5})).toBeLessThan(0);
    });
});

describe("yearCompare(a, b) - compares two numbers pertaining to year in school", function() {
    
    it("should return 0 if the two numbers are the same", function() {
        expect(yearCompare({year:0}, {year:0})).toBe(0);
        expect(yearCompare({year:93713}, {year:93713})).toBe(0);
        expect(yearCompare({year:42}, {year:42})).toBe(0);
        expect(yearCompare({year:76.7}, {year:76.7})).toBe(0);
        expect(yearCompare({year:0007}, {year:7})).toBe(0);
        expect(yearCompare({year:50.0}, {year:50})).toBe(0);
        
    });

    it("and should return positive number if first number should come after", function() {
        expect(yearCompare({year:1}, {year:0})).toBeGreaterThan(0);
        expect(yearCompare({year:93714}, {year:93713})).toBeGreaterThan(0);
        expect(yearCompare({year:43}, {year:42})).toBeGreaterThan(0);
        expect(yearCompare({year:76.8}, {year:76.7})).toBeGreaterThan(0);
        expect(yearCompare({year:8}, {year:7})).toBeGreaterThan(0);
        expect(yearCompare({year:50.5}, {year:50})).toBeGreaterThan(0);
    });

    it("and should return negative number if first number should come first", function() {
        expect(yearCompare({year:0}, {year:1})).toBeLessThan(0);
        expect(yearCompare({year:93713}, {year:93714})).toBeLessThan(0);
        expect(yearCompare({year:42}, {year:43})).toBeLessThan(0);
        expect(yearCompare({year:76.7}, {year:76.8})).toBeLessThan(0);
        expect(yearCompare({year:0007}, {year:7.1})).toBeLessThan(0);
        expect(yearCompare({year:50.0}, {year:50.5})).toBeLessThan(0);
    });
});

describe("start(a, b) - compares two dates in mm/dd/yy format", function() {
    
    it("should return 0 if the two dates are the same", function() {
        expect(startDateCompare({startDate:'04/16/92'}, {startDate:'04/16/92'})).toBe(0);
        expect(startDateCompare({startDate:'04/16/92'}, {startDate:'04/16/92'})).toBe(0);
        expect(startDateCompare({startDate:'04/16/92'}, {startDate:'04/16/92'})).toBe(0);
        expect(startDateCompare({startDate:'04/16/92'}, {startDate:'04/16/92'})).toBe(0);
        expect(startDateCompare({startDate:'04/16/92'}, {startDate:'04/16/92'})).toBe(0);
        expect(startDateCompare({startDate:'04/16/92'}, {startDate:'04/16/92'})).toBe(0);
        
    });

    it("and should return positive number if first date should come after", function() {
        expect(startDateCompare({startDate:'04/16/93'}, {startDate:'04/16/92'})).toBeGreaterThan(0);
        expect(startDateCompare({startDate:'04/16/92'}, {startDate:'04/15/92'})).toBeGreaterThan(0);
        expect(startDateCompare({startDate:'12/16/92'}, {startDate:'04/16/92'})).toBeGreaterThan(0);
        expect(startDateCompare({startDate:'10/23/92'}, {startDate:'10/23/91'})).toBeGreaterThan(0);
        expect(startDateCompare({startDate:'04/09/91'}, {startDate:'01/09/91'})).toBeGreaterThan(0);
        expect(startDateCompare({startDate:'04/16/16'}, {startDate:'04/10/16'})).toBeGreaterThan(0);
    });

    it("and should return negative number if first date should come first", function() {
        expect(startDateCompare({startDate:'04/16/92'}, {startDate:'05/16/92'})).toBeLessThan(0);
        expect(startDateCompare({startDate:'04/16/92'}, {startDate:'04/16/98'})).toBeLessThan(0);
        expect(startDateCompare({startDate:'04/16/92'}, {startDate:'04/16/98'})).toBeLessThan(0);
        expect(startDateCompare({startDate:'04/16/92'}, {startDate:'04/17/92'})).toBeLessThan(0);
        expect(startDateCompare({startDate:'04/16/92'}, {startDate:'05/16/92'})).toBeLessThan(0);
        expect(startDateCompare({startDate:'04/16/92'}, {startDate:'04/16/96'})).toBeLessThan(0);
    });
});

