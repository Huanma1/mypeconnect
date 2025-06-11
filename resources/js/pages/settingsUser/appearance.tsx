import { Head } from '@inertiajs/react';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import SettingsLayout from '@/layouts/settings/layoutUser';

const Appearance = () => {
    const [theme, setTheme] = useState('light');

    const handleSave = () => {
        // Aquí puedes guardar la preferencia del tema (por ejemplo, enviándola al backend)
        console.log('Theme saved:', theme);
    };

    return (
        <SettingsLayout>
            <Head title="Appearance Settings" />

            <div className="space-y-6">
                <h2 className="text-xl font-bold">Appearance</h2>
                <p className="text-muted-foreground">Choose your preferred theme.</p>

                <div className="grid gap-4">
                    <Label htmlFor="theme">Theme</Label>
                    <select id="theme" className="rounded border px-3 py-2" value={theme} onChange={(e) => setTheme(e.target.value)}>
                        <option value="light">Light</option>
                        <option value="dark">Dark</option>
                        <option value="system">System</option>
                    </select>
                </div>

                <Button onClick={handleSave}>Save</Button>
            </div>
        </SettingsLayout>
    );
};

export default Appearance;
