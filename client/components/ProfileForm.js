import { Formik } from "formik";
import * as yup from 'yup';
import { Input, CheckBox, Text, Button } from 'react-native-elements';
import styles from '../styles/authStyles';
import MapViewContainer from './MapView';

export default function ProfileForm(props) {
    const validationSchema = yup.object().shape({
        name: yup
            .string()
            .required('الاسم الكامل مطلوب'),
        email: yup
            .string()
            .email('البريد الالكتروني غير صالح')
            .required('البريد الالكتروني مطلوب'),
        password: yup
            .string()
            .required('كلمة المرور مطلوبة')
            .min(5, 'كلمة المرور يجب ان تكون 5 احرف على الاقل'),
        isDoctor: yup
            .boolean(),
        specialization: yup
            .string()
            .when('isDoctor', {
                is: true,
                then: (schema) => schema.required('يجب ادخال التخصص')
            }),
        workHours: yup
            .string()
            .when('isDoctor', {
                is: true,
                then: (schema) => schema.required('يجب ادخال ساعات العمل')
            }),
        phone: yup
            .string()
            .when('isDoctor', {
                is: true,
                then: (schema) => schema.required('يجب ادخال رقم الهاتف')
            }),
        address: yup
            .string()
            .when('isDoctor', {
                is: true,
                then: (schema) => schema.required('يجب ادخال العنوان')
            }),
    });
    return (
        <Formik
            initialValues={{
                name: props.user?.name || '',
                email: props.user?.email || '',
                password: '',
                isDoctor: props.user?.isDoctor || false,
                specialization: props.user?.doctor?.specialization || '',
                workHours: props.user?.doctor?.workHours || '',
                phone: props.user?.doctor?.phone || '',
                address: props.user?.doctor?.address || '',
                latitude: props.user?.latitude || null,
                longitude: props.user?.longitude || null
            }}

            validationSchema={validationSchema}
            onSubmit={(values) => {
                props.submit(values);
            }}
        >
            {
                ({ handleChange, setFieldValue, handleBlur, handleSubmit, errors, values, isValid }) => (
                    <>
                        <Input
                            name="name"
                            placeholder="الاسم الكامل"
                            value={values.name}
                            onChangeText={handleChange('name')}
                            onBlur={handleBlur('name')}
                            style={[styles.textInput, errors.name && styles.errorInput]}
                        />
                        {errors.name && <Text p style={styles.textError}>{errors.name}</Text>}

                        <Input
                            name="email"
                            placeholder="البريد الالكتروني"
                            value={values.email}
                            keyboardType="email-address"
                            onChangeText={handleChange('email')}
                            disabled={props.isEdit} // Disable email field in edit mode
                            onBlur={handleBlur('email')}
                            style={[styles.textInput, errors.email && styles.errorInput]}
                        />
                        {errors.email && <Text p style={styles.textError}>{errors.email}</Text>}

                        <Input
                            name="password"
                            placeholder="كلمة المرور"
                            secureTextEntry={true}
                            value={values.password}
                            onChangeText={handleChange('password')}
                            onBlur={handleBlur('password')}
                            style={[styles.textInput, errors.password && styles.errorInput]}
                        />
                        {errors.password && <Text p style={styles.textError}>{errors.password}</Text>}

                        {props.isEdit ? null : (
                            <CheckBox
                                title="انا طبيب"
                                name="isDoctor"
                                checked={values.isDoctor}
                                onPress={() => setFieldValue('isDoctor', !values.isDoctor)}
                            />
                        )}

                        {values.isDoctor && (
                            <>
                                <Input
                                    name="specialization"
                                    placeholder="التخصص"
                                    value={values.specialization}
                                    onChangeText={handleChange('specialization')}
                                    onBlur={handleBlur('specialization')}
                                    style={[styles.textInput, errors.specialization && styles.errorInput]}
                                />
                                {errors.specialization && <Text p style={styles.textError}>{errors.specialization}</Text>}

                                <Input
                                    name="workHours"
                                    placeholder="ساعات العمل"
                                    value={values.workHours}
                                    onChangeText={handleChange('workHours')}
                                    onBlur={handleBlur('workHours')}
                                    style={[styles.textInput, errors.workHours && styles.errorInput]}
                                />
                                {errors.workHours && <Text p style={styles.textError}>{errors.workHours}</Text>}

                                <Input
                                    name="phone"
                                    placeholder="رقم الهاتف"
                                    value={values.phone}
                                    onChangeText={handleChange('phone')}
                                    onBlur={handleBlur('phone')}
                                    style={[styles.textInput, errors.phone && styles.errorInput]}
                                />
                                {errors.phone && <Text p style={styles.textError}>{errors.phone}</Text>}

                                <Input
                                    name="address"
                                    placeholder="العنوان"
                                    value={values.address}
                                    onChangeText={handleChange('address')}
                                    onBlur={handleBlur('address')}
                                    style={[styles.textInput, errors.address && styles.errorInput]}
                                />
                                {errors.address && <Text p style={styles.textError}>{errors.address}</Text>}

                                {values.latitude &&
                                    <MapViewContainer
                                        location={{ latitude: values.latitude, longitude: values.longitude }}
                                        lat={value => setFieldValue('latitude', value)}
                                        lng={value => setFieldValue('longitude', value)}
                                    />
                                }
                            </>
                        )}

                        <Button
                            title={props.isEdit ? "تعديل" : "تسجيل"}
                            onPress={handleSubmit}
                            disabled={!isValid}
                            style={{ marginTop: '20px' }}
                        />
                    </>
                )
            }
        </Formik>
    )
};