export default function AppLogo() {
    return (
        <>
            <div className="bg-sidebar-primary text-sidebar-primary-foreground border-radius-md border-sidebar-primary flex aspect-square size-8 items-center justify-center rounded-md border-2 p-1">
                <img
                    src="/images/logoMype.png" // Ruta al archivo PNG
                    alt="Logo Mi Mype"
                    className="h-20 w-20 object-contain"
                />
            </div>
            <div className="ml-1 grid flex-1 text-left text-sm">
                <span className="mb-0.5 truncate leading-none font-semibold">Mi Mype</span>
            </div>
        </>
    );
}
