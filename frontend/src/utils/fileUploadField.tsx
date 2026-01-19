import { useEffect, useState } from 'react';
import { Upload, X } from 'lucide-react';
import { API_URL } from '@/config';


export default function FileUploadField({ label, name, register, watch, errors, setValue, required = false }: any) {
    const fileValue = watch(name);
    const [preview, setPreview] = useState<string | null>(null);

    useEffect(() => {
        if (fileValue) {
            if (fileValue instanceof FileList && fileValue.length > 0) {
                const objectUrl = URL.createObjectURL(fileValue[0]);
                // eslint-disable-next-line react-hooks/set-state-in-effect
                setPreview(objectUrl);
                return () => URL.revokeObjectURL(objectUrl);
            }
            else if (typeof fileValue === 'string') {
                const fullUrl = fileValue.startsWith('http') ? fileValue : `${API_URL}${fileValue}`;
                setPreview(fullUrl);
            }
        } else {
            setPreview(null);
        }
    }, [fileValue]);

    const handleRemove = (e: any) => {
        e.preventDefault();
        setValue(name, null);
        setPreview(null);
    };

    const hasValue = !!fileValue;

    return (
        <div className="space-y-1.5 w-full">
            <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest ml-1">{label}</label>
            <div className={`relative border-2 border-dashed rounded-2xl p-4 transition-all min-h-35 flex items-center justify-center ${errors[name] ? 'border-red-200 bg-red-50/30' : 'border-slate-100 bg-slate-50 hover:bg-white hover:border-primary/20'}`}>

                {!hasValue && (
                    <input
                        type="file"
                        accept="image/*"
                        {...register(name, { required: required ? `${label} is required` : false })}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                    />
                )}

                <div className="flex flex-col items-center justify-center gap-2 text-center w-full">
                    {preview ? (
                        <div className="flex flex-col items-center gap-2 relative">
                            <button onClick={handleRemove} className="absolute -top-2 -right-2 z-20 bg-red-500 text-white p-1 rounded-full shadow-lg">
                                <X size={12} />
                            </button>
                            <div className="w-20 h-20 rounded-xl overflow-hidden border bg-white">
                                <img src={preview} alt="preview" className="w-full h-full object-contain p-1" />
                            </div>
                            {/* file Size */}
                            {fileValue instanceof FileList && fileValue[0] && (
                                <div className="text-[9px] font-medium text-primary bg-primary/5 px-2 py-0.5 rounded-full inline-block">
                                    Size:  {(fileValue[0].size / 1024).toFixed(2)} KB
                                </div>
                            )}
                        </div>
                    ) : (
                        <>
                            <Upload size={20} className="text-slate-400" />
                            <p className="text-[10px] text-slate-500">Upload {label}</p>
                        </>
                    )}
                </div>
            </div>
            {errors[name] && <p className="text-[10px] text-red-500 font-bold ml-1">{errors[name].message}</p>}
        </div>
    );
}