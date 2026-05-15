import React from 'react'

import {
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const Pagination = ({current_page, lastPage, onPageChange}) => {

    const generatePageNumbers = () => {
        const pages = [];
        const maxVisible = 5;

        let startPage = Math.max(1, current_page - 2);
        let endPage = Math.min(lastPage, startPage + maxVisible - 1);
        if (endPage - startPage < maxVisible - 1) {
            startPage = Math.max(1, endPage - maxVisible + 1);
        }
        
        for (let i = startPage; i <= endPage; i++) {
            pages.push(i);
        }
        
        return pages;
    };

    if (lastPage <= 1) return null;

    return (
        <div className="flex flex-wrap justify-center items-center gap-2 py-6 bg-gray-50 border-t border-gray-100">
            <button
                onClick={() => onPageChange(current_page - 1)}
                disabled={current_page === 1}
                className={`rounded-full p-2 transition-all duration-100 ${
                    current_page === 1
                        ? "text-gray-300 cursor-not-allowed"
                        : "text-gray-500 hover:bg-primary/10 hover:text-primary"
                }`}
            >
                <ChevronLeft size={18} />
            </button>
            {generatePageNumbers().map((page) => (
                <button 
                    key={page}
                    onClick={() => onPageChange(page)}
                    className={`rounded-lg px-3 py-1 font-semibold transition-all duration-100 ${
                        page === current_page
                        ? "text-primary bg-primary/10 hover:bg-primary/20"
                        : "text-gray-700 hover:bg-primary/10"
                    }`}
                >
                    {page}
                </button>
            ))}
            <button
                onClick={() => onPageChange(current_page + 1)}
                disabled={current_page === lastPage}
                className={`rounded-full p-2 transition-all duration-100 ${
                    current_page === lastPage
                        ? "text-gray-300 cursor-not-allowed"
                        : "text-gray-500 hover:bg-primary/10 hover:text-primary"
                    }`}
            >
                <ChevronRight size={18} />
            </button>
        </div>
  )
}

export default Pagination