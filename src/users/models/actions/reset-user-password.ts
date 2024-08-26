'use server';
import { ActionReturn } from '~/common/models/types/actions';
import { resetByIdRequest } from '../services/user.service';
import getAuth from '~/auth/models/helpers/get-auth';

const resetUserPasswordAction = async (_: unknown, formData: FormData): Promise<ActionReturn> => {
  const id = String(formData.get('id'));

  if (!!id) {
    return {
      statusCode: 400,
      errors: { id: ['id must be set'] }
    }
  }

  const { accessToken } = await getAuth();
  await resetByIdRequest({ id, accessToken });
  return { statusCode: 200 }
}

export default resetUserPasswordAction;