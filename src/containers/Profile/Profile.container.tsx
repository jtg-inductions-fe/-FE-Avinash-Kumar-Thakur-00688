import { useSelector } from 'react-redux';

import { Card, CardContent, Stack, TextField, Typography } from '@mui/material';

import { CustomAvatar } from '@components';
import { RootState } from '@store';

export const ProfileContainer = () => {
    const { user } = useSelector((state: RootState) => state.auth);

    return (
        <Stack flex={1} justifyContent="center" alignItems="center">
            <Card sx={{ minWidth: { xs: '100%', md: 500 }, borderRadius: 2 }}>
                <CardContent>
                    <Stack gap={10}>
                        {user && (
                            <CustomAvatar
                                src={user?.avatar ?? ''}
                                alt={user?.name}
                                size={100}
                            />
                        )}

                        <Typography variant="h2">Account Details</Typography>
                        <TextField
                            label="Full Name"
                            disabled
                            variant="outlined"
                            value={user?.name}
                        />
                        <TextField
                            label="Email"
                            disabled
                            value={user?.email}
                            variant="outlined"
                        />
                        {/* <PhoneInput value={user?.phone_number} label="Test" /> */}
                    </Stack>
                </CardContent>
            </Card>
        </Stack>
    );
};
