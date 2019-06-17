import { 
    isAfter, 
    format, 
    startOfDay,
    addDays,
    addSeconds 
} from 'date-fns';

export const required = x => !x ? 'Required' : '';

export const onlyLetters = x => !/^[A-Za-z\s]+$/.test(x) ?
    'Oops, there should be no numbers here' : '';

export const dateAfter = after => x => {
    return isAfter(addDays(startOfDay(after),1), startOfDay(x)) ?
        'This date should be after ' + format(after, 'DD/MM/YYYY') : '';
}

export const timeAfter = after => x => {
    return isAfter(after, addSeconds(x, 1)) ?
        'Time should be after ' + format(after, 'hh:mm A') : '';
}

export const runValidators = (value, validators) =>
    Array.isArray(validators) && validators.map(x => x(value)).find(x => x);

export const getValueAndError = (fields, key) => {
    if (!fields[key]) return [];
    const { value, error } = fields[key];
    return [value, error];
}
