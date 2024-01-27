const tasks = [
    {
        id: 0,
        title: "Convert Html",
        description: "আমাদের দেয়া, HTML টেমপ্লেট এর কোড গুলো নিয়ে, নতুন একটি Vite প্রোজেক্ট initate করে সম্পুর্ন scratch থেকে এই এসাইনমেন্টটি করতে হবে ",
        tags: ["html", "css"],
        priority: "high",
        favorite: false,
    },

    {
        id: 1,
        title: "use Context Api and useReducer",
        description: "এই প্রজেক্টের State Management এর ক্ষেত্রে আপনাকে অবশ্যই Context API এবং useReducer ব্যবহার করতে হবে ",
        tags: ["contextapi", "usereducer", "assignment"],
        priority: "high",
        favorite: false,
    },

    {
        id: 2,
        title: "Make Add Task Function",
        description: 'আপনার প্রজেক্টের "Add Task" বাটনে ক্লিক করলে আপনাকে একটি popup দেখাতে হবে এবং সেই popup-এ প্রয়োজনীয় তথ্য প্রদান করে "Create New Task" বাটনে ক্লিক করলে Task List এ নতুন Task হিসেবে যুক্ত হবে । Popup তৈরির জন্যে আলাদা কোন প্যাকেজ ব্যবহার করতে পারবেন না ।',
        tags: ["react", "assignment"],
        priority: "high",
        favorite: false,
    },

    {
        id: 3,
        title: "Delete Task Function",
        description: "Task ডিলিট বাটনে ক্লিক করলে, Task টি Task List থেকে রিমুভ হয়ে যাবে",
        tags: ["delete", "task", "assignment"],
        priority: "high",
        favorite: false,
    },

    {
        id: 4,
        title: "Toggle Favourite Functionality",
        description: "Task গুলো Favourite এবং Unfavourite-এ toggle করা যাবে ।",
        tags: ["toggle", "function"],
        priority: "high",
        favorite: false,
    },
]
export { tasks }