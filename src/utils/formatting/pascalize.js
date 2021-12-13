import capitalise from './capitalise';

const pascalize = string => string ? string.split("-").map(capitalise).join(" ") : string;

export default pascalize;
