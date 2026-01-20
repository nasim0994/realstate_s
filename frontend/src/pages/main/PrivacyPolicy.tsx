import { ShieldCheck, Lock, Eye, FileText, Bell } from 'lucide-react';

export default function PrivacyPolicy() {
    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto bg-white shadow-sm rounded-2xl overflow-hidden border border-gray-100">

                {/* Header Section */}
                <div className="bg-indigo-600 p-8 text-center text-white">
                    <ShieldCheck className="w-16 h-16 mx-auto mb-4 opacity-90" />
                    <h1 className="text-3xl md:text-4xl font-extrabold uppercase tracking-tight">Privacy Policy</h1>
                    <p className="mt-2 text-indigo-100 font-medium">Last Updated: October 2023</p>
                </div>

                <div className="p-8 md:p-12 space-y-10">

                    {/* Introduction */}
                    <section>
                        <div className="flex items-center gap-3 mb-4">
                            <Eye className="text-indigo-600 w-6 h-6" />
                            <h2 className="text-2xl font-bold text-gray-800">Introduction</h2>
                        </div>
                        <p className="text-gray-600 leading-relaxed">
                            Welcome to <strong>[Your Company Name]</strong>. We are committed to protecting your personal information and your right to privacy.
                            This Privacy Policy explains how we collect, use, and safeguard your information when you visit our website and use our services.
                        </p>
                    </section>

                    <hr className="border-gray-100" />

                    {/* Information We Collect */}
                    <section>
                        <div className="flex items-center gap-3 mb-4">
                            <FileText className="text-indigo-600 w-6 h-6" />
                            <h2 className="text-2xl font-bold text-gray-800">Information We Collect</h2>
                        </div>
                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="bg-gray-50 p-5 rounded-xl border border-gray-200">
                                <h3 className="font-bold text-gray-700 mb-2">Personal Data</h3>
                                <p className="text-sm text-gray-600">Name, email address, phone number, and mailing address provided during registration or inquiry.</p>
                            </div>
                            <div className="bg-gray-50 p-5 rounded-xl border border-gray-200">
                                <h3 className="font-bold text-gray-700 mb-2">Usage Data</h3>
                                <p className="text-sm text-gray-600">IP address, browser type, device information, and pages visited on our site.</p>
                            </div>
                        </div>
                    </section>

                    {/* How We Use Your Information */}
                    <section>
                        <div className="flex items-center gap-3 mb-4">
                            <Lock className="text-indigo-600 w-6 h-6" />
                            <h2 className="text-2xl font-bold text-gray-800">How We Use Your Information</h2>
                        </div>
                        <ul className="space-y-3 list-none">
                            {[
                                "To provide and maintain our Service",
                                "To notify you about changes to our projects",
                                "To provide customer support and handle inquiries",
                                "To monitor the usage of our Website for optimization",
                                "To send marketing communications (if consented)"
                            ].map((item, index) => (
                                <li key={index} className="flex items-start gap-3 text-gray-600">
                                    <span className="h-2 w-2 rounded-full bg-indigo-500 mt-2 shrink-0" />
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </section>

                    {/* Security of Data */}
                    <section className="bg-blue-50 p-6 rounded-2xl border border-blue-100">
                        <div className="flex items-center gap-3 mb-4">
                            <ShieldCheck className="text-blue-600 w-6 h-6" />
                            <h2 className="text-xl font-bold text-blue-800">Data Security</h2>
                        </div>
                        <p className="text-blue-700 text-sm leading-relaxed">
                            The security of your data is important to us, but remember that no method of transmission over the Internet is 100% secure.
                            We strive to use commercially acceptable means to protect your Personal Data.
                        </p>
                    </section>

                    {/* Policy Changes */}
                    <section>
                        <div className="flex items-center gap-3 mb-4">
                            <Bell className="text-indigo-600 w-6 h-6" />
                            <h2 className="text-2xl font-bold text-gray-800">Changes to This Policy</h2>
                        </div>
                        <p className="text-gray-600 leading-relaxed">
                            We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page.
                            You are advised to review this Privacy Policy periodically for any changes.
                        </p>
                    </section>

                </div>

                {/* Footer Section */}
                <div className="bg-gray-50 p-8 border-t border-gray-100 text-center">
                    <p className="text-gray-500 text-sm mb-4">If you have any questions about this Privacy Policy, please contact us:</p>
                    <div className="flex flex-wrap justify-center gap-4">
                        <a href="mailto:support@yourcompany.com" className="bg-white px-6 py-2 rounded-full shadow-sm border text-indigo-600 font-semibold hover:bg-indigo-50 transition">
                            support@yourcompany.com
                        </a>
                        <span className="bg-white px-6 py-2 rounded-full shadow-sm border text-gray-600 font-semibold">
                            +880 1234 567 890
                        </span>
                    </div>
                </div>

            </div>
        </div>
    );
};
