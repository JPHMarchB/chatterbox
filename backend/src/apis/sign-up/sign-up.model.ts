import {z} from 'zod'
import {PrivateProfileSchema} from "../profile/profile.model";

export const SignUpProfileSchema = PrivateProfileSchema
    .omit({ profileId: true, profileHash: true, profileActivationToken: true, profileImageUrl: true, profileAbout: true })
    .extend({
        profilePasswordConfirm: z.string({
                required_error: 'confirmed password required',
                invalid_type_error: 'Please provide a valid confirmed password'})
            .min(8, { message: 'please provide a valid password confirmation (min 8 characters)' })
            .max(32, { message: 'please provide a valid password confirmation (max 32 characters)' }),


        profilePassword: z.string({
            required_error: 'password required',
            invalid_type_error: 'Please provide a valid password'})
            .min(8, { message: 'please provide a valid password (min 8 characters)' })
            .max(32, { message: 'please provide a valid password (max 32 characters)' })
    })
    .refine(data => data.profilePassword === data.profilePasswordConfirm, {
        message: 'passwords do not match'
    }
    )
