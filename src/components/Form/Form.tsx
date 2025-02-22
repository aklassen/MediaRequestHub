import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

type FormData = {
  firstName: string;
  lastName: string;
  mediaName: string;
  mediaType: string;
  mediaLink: string;
  accreditationReason: string;
  pastCoverage: string;
  reachInfo: string;
  honeypot: string; // Honeypot-Feld für Spam-Schutz
  recaptchaToken: string; // reCAPTCHA-Token
};

function Form() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();
  // const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const { t } = useTranslation();

  const onSubmit = async (data: FormData) => {
    //   if (!captchaToken) {
    //     alert(t("captchaRequired"));
    //     return;
    //   }

    //data.recaptchaToken = captchaToken;

    if (data.honeypot) {
      console.warn('Spam erkannt!');
      return;
    }

    try {
      const response = await fetch('/api/submit-accreditation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        alert(t('formSubmitted'));
      } else {
        alert(t('submissionError'));
      }
    } catch (error) {
      console.error('Fehler:', error);
      alert(t('submissionError'));
    }
  };

  console.log(name);
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-xl"
    >
      <h2 className="text-xl font-bold">{t('accreditationForm')}</h2>
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="firstName"
        >
          {t('firstName')}
        </label>
        <input
          {...register('firstName', { required: true })}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="firstName"
        />
        {errors.firstName && (
          <p className="text-red-500 text-xs italic">{t('requiredField')}</p>
        )}
      </div>
      <div className="mb-6">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="lastName"
        >
          {t('lastName')}
        </label>
        <input
          {...register('lastName', { required: true })}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="lastName"
        />
        {errors.lastName && (
          <p className="text-red-500 text-xs italic">{t('requiredField')}</p>
        )}
      </div>

      <div className="mb-6">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="mediaName"
        >
          {t('mediaName')}
        </label>
        <input
          {...register('mediaName', { required: true })}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="mediaName"
        />
        {errors.mediaName && (
          <p className="text-red-500 text-xs italic">{t('requiredField')}</p>
        )}
      </div>

      <div className="mb-6">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="mediaType"
        >
          {t('mediaType')}
        </label>
        <select
          {...register('mediaType', { required: true })}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="mediaType"
        >
          <option value="newspaper">{t('newspaper')}</option>
          <option value="webzine">{t('webzine')}</option>
          <option value="content_creator">{t('contentCreator')}</option>
          <option value="streamer">{t('streamer')}</option>
        </select>
      </div>

      <div className="mb-6">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="mediaLink"
        >
          {t('mediaLink')}
        </label>
        <input
          {...register('mediaLink', {
            required: true,
            pattern: /^(https?:\/\/)?([\w.-]+)\.[a-z]{2,}\/?.*$/,
          })}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="mediaLink"
        />
        {errors.mediaLink && (
          <p className="text-red-500 text-xs italic">{t('invalidURL')}</p>
        )}
      </div>
      <div className="mb-6">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="accreditationReason"
        >
          {t('accreditationReason')}
        </label>
        <textarea
          {...register('accreditationReason', { required: true })}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="accreditationReason"
        ></textarea>
      </div>
      <div className="mb-6">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="pastCoverage"
        >
          {t('pastCoverage')}
        </label>
        <textarea
          {...register('pastCoverage')}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="pastCoverage"
        ></textarea>

        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="reachInfo"
        >
          {t('reachInfo')}
        </label>
        <input
          {...register('reachInfo')}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="reachInfo"
        />
      </div>
      {/* Honeypot-Feld - unsichtbar für echte Nutzer */}
      <input {...register('honeypot')} type="text" className="hidden" />

      {/* reCAPTCHA */}
      <div className="flex items-center justify-between">
        <button
          type="submit"
          className="bg-yellow-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          {t('submit')}
        </button>
      </div>
    </form>
  );
}

export default Form;
