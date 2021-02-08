const pattern = () => 'Le format est invalide.';
const format = () => 'Le format est invalide.';
const required = () => 'Ce champ est requis.';
const maxLength = () => 'Le contenu est trop long.';
const minLength = () => 'Le contenu est trop court.';
const minItems = () => 'Séléctionner au moins un élément';
const minProperties = () => 'Séléctionner au moins un élément';
const minimum = (args) => `Doit être supérieure à ${args.params.limit}`;
export const passwordPatternErrorMessage = {
	pattern: () => `Le mot de passe doit contenir : au minimum 8 caractères dont: une
	majuscule, une minuscule, et un chiffre`,
};

export default {
	format,
	maxLength,
	minItems,
	minLength,
	minimum,
	minProperties,
	pattern,
	required,
};
