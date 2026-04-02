import { useEffect } from 'react';
import * as Notifications from 'expo-notifications';
import { updateTithiReminders } from '../services/ReminderService';
import { useAppStore } from '../store';

export const useReminders = () => {
    const { remindersEnabled, reminderRules, selectedCity, currentLanguage, setRemindersEnabled } = useAppStore();

    // Re-schedule notifications whenever dependent state changes
    useEffect(() => {
        const syncReminders = async () => {
            if (remindersEnabled) {
                // Check permissions
                const { status } = await Notifications.getPermissionsAsync();
                
                if (status === 'granted') {
                    await updateTithiReminders(reminderRules, selectedCity.lat, selectedCity.lng, currentLanguage);
                } else {
                    // Turn it off if permission was revoked in OS settings
                    setRemindersEnabled(false);
                }
            } else {
                // If disabled or array is empty, this clears the pending queue automatically
                await updateTithiReminders([], selectedCity.lat, selectedCity.lng, currentLanguage);
            }
        };

        syncReminders();
    }, [remindersEnabled, reminderRules, selectedCity, currentLanguage]);

    // Expose a method to manually request permissions (bound to the UI switch)
    const requestPermissionAndEnable = async () => {
        const { status: existingStatus } = await Notifications.getPermissionsAsync();
        let finalStatus = existingStatus;
        
        if (existingStatus !== 'granted') {
            const { status } = await Notifications.requestPermissionsAsync();
            finalStatus = status;
        }
        if (finalStatus === 'granted') {
            setRemindersEnabled(true);
            return true;
        } else {
            setRemindersEnabled(false);
            return false;
        }
    };

    return {
        requestPermissionAndEnable
    };
};
