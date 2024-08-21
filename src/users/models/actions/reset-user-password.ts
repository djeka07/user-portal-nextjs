'use server';
import getAuth from '~/auth/models/actions/get-auth';
import { resetByIdRequest } from '../services/user.service';
import { ActionReturn } from '~/common/models/types/actions';

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