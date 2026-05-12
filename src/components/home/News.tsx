'use client';

import { motion } from 'framer-motion';
import { useMessages } from '@/lib/i18n/useMessages';

export interface NewsItem {
    date: string;
    content: string;
}

interface NewsProps {
    items: NewsItem[];
    title?: string;
}

export default function News({ items, title }: NewsProps) {
    const messages = useMessages();
    const resolvedTitle = title || messages.home.news;

    return (
        <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
        >
            <h2 className="text-2xl font-serif font-bold text-primary mb-4">{resolvedTitle}</h2>
            {items.length === 0 ? (
                <div className="rounded-xl border border-dashed border-neutral-300 bg-neutral-50/80 px-5 py-4 text-sm leading-relaxed text-neutral-600 dark:border-neutral-700 dark:bg-neutral-900/60 dark:text-neutral-400">
                    {messages.home.newsEmpty}
                </div>
            ) : (
                <div className="space-y-3">
                    {items.map((item, index) => (
                        <div key={index} className="flex items-start space-x-3">
                            <span className="text-xs text-neutral-500 mt-1 w-16 flex-shrink-0">{item.date}</span>
                            <p className="text-sm text-neutral-700">{item.content}</p>
                        </div>
                    ))}
                </div>
            )}
        </motion.section>
    );
}
