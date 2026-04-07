import { useState } from 'react';

import { useSelector } from 'react-redux';

import {
    Avatar,
    Box,
    Button,
    Card,
    CardContent,
    Stack,
    Typography,
} from '@mui/material';

import { CustomModal } from '@components';
import { EditProfile } from '@containers/EditProfile';
import { useProfileQuery } from '@services';
import { RootState } from '@store';

/**
 * This container used to display user details
 */
export const ProfileContainer = () => {
    /** States */
    const [modalOpen, setModalOpen] = useState<boolean>(false);

    /** Hooks */
    const { user } = useSelector((state: RootState) => state.auth);
    const { refetch } = useProfileQuery();

    /**
     * Functions
     */
    const handleOpen = () => setModalOpen(true);
    const handleClose = () => setModalOpen(false);

    /** Error state */
    if (!user) {
        return (
            <Stack flex={1} gap={2} justifyContent="center" alignItems="center">
                <Typography variant="h4" color="error" textAlign="center">
                    Failed to load user details. Please try again.
                </Typography>
                <Button variant="contained" onClick={() => refetch()}>
                    Retry
                </Button>
            </Stack>
        );
    }

    return (
        <Stack flex={1} justifyContent="center" alignItems="center">
            <Card sx={{ minWidth: { xs: '100%', md: 500 }, borderRadius: 2 }}>
                <CardContent>
                    <Stack gap={6} alignItems="center">
                        <Box
                            width="100%"
                            display="flex"
                            justifyContent="space-between"
                            alignItems="center"
                        >
                            <Typography variant="h2">Profile</Typography>
                            <Button
                                variant="text"
                                color="error"
                                onClick={handleOpen}
                            >
                                Edit
                            </Button>
                        </Box>
                        <Avatar
                            src={user.avatar ?? ''}
                            alt={user.name}
                            sx={{ height: 100, width: 100 }}
                        />

                        <Stack gap={4} width="100%">
                            <Typography variant="h3">
                                Account Details
                            </Typography>
                            <Box
                                sx={{
                                    p: 2,
                                    width: '100%',
                                }}
                            >
                                <Typography
                                    variant="body2"
                                    color="textDisabled"
                                >
                                    Full Name:
                                </Typography>
                                <Typography>{user.name}</Typography>
                            </Box>

                            <Box
                                sx={{
                                    p: 2,
                                    width: '100%',
                                }}
                            >
                                <Typography
                                    variant="body2"
                                    color="textDisabled"
                                >
                                    Email:
                                </Typography>
                                <Typography>{user.email}</Typography>
                            </Box>

                            <Box
                                sx={{
                                    p: 2,
                                    width: '100%',
                                }}
                            >
                                <Typography
                                    variant="body2"
                                    color="textDisabled"
                                >
                                    Phone:
                                </Typography>
                                <Typography>{user.phone_number}</Typography>
                            </Box>
                        </Stack>
                    </Stack>
                </CardContent>
            </Card>
            <CustomModal open={modalOpen} onClose={handleClose}>
                <EditProfile handleClose={handleClose} />
            </CustomModal>
        </Stack>
    );
};
