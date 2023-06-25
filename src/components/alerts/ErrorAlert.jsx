import { textCapitalize } from '../../utils/helpers';

export default function ErrorAlert({ isError, error }) {
	if (!isError) return null;

	return (
		<div className="p-4 mb-6 font-medium text-red-600 bg-red-200 border rounded-md border-error">
			{textCapitalize(error.message)}
		</div>
	);
}
