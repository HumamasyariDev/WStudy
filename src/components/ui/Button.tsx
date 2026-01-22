
import { cn } from '../../lib/utils';
import { motion, HTMLMotionProps } from 'framer-motion';

interface ButtonProps extends HTMLMotionProps<"button"> {
    variant?: 'primary' | 'secondary' | 'outline' | 'danger' | 'ghost';
    size?: 'sm' | 'md' | 'lg';
}

export const Button = ({ className, variant = 'primary', size = 'md', ...props }: ButtonProps) => {
    const variants = {
        primary: "bg-[#16C79A] text-white hover:bg-[#13b188] shadow-md shadow-green-100 dark:shadow-none",
        secondary: "bg-[#11698E] text-white hover:bg-[#0e5675] shadow-md shadow-blue-100 dark:shadow-none",
        outline: "border-2 border-[#11698E] text-[#11698E] hover:bg-[#11698E] hover:text-white",
        danger: "bg-red-500 text-white hover:bg-red-600",
        ghost: "bg-transparent text-gray-500 hover:bg-gray-100 dark:hover:bg-slate-800 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white",
    };

    const sizes = {
        sm: "px-3 py-1.5 text-xs rounded-lg",
        md: "px-5 py-2.5 text-sm rounded-xl",
        lg: "px-8 py-3.5 text-base rounded-xl font-bold",
    };

    return (
        <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={cn("font-lexend font-medium transition-colors duration-200 flex items-center justify-center gap-2", variants[variant], sizes[size], className)}
            {...props}
        />
    );
};

export default Button;
