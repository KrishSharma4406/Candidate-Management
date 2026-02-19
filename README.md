# Candidate Management System

A modern, full-featured CRUD application built with Next.js 15, TypeScript, and Tailwind CSS for managing candidate information.

![Candidate Management System](https://img.shields.io/badge/Next.js-15-black) ![TypeScript](https://img.shields.io/badge/TypeScript-5-blue) ![Tailwind CSS](https://img.shields.io/badge/Tailwind-3-38bdf8)

## Features

- **Create** - Add new candidates with comprehensive form validation
- **Read** - View all candidates in a clean, responsive table layout
- **Delete** - Remove candidates with confirmation dialogs
- **Form Validation** - Client-side validation for name, email, and role fields
- **Responsive Design** - Mobile-first design that works on all devices
- **Modern UI** - Clean interface with Tailwind CSS and lucide-react icons
- **Type Safety** - Full TypeScript support for better development experience
- **API Routes** - RESTful API endpoints using Next.js App Router

## Requirements Met

✅ Next.js with App Router
✅ TypeScript integration
✅ CRUD functionality (Create, Read, Delete)
✅ Form validation
✅ Clean folder structure
✅ Reusable components
✅ Tailwind CSS styling
✅ API routes for data management

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Icons**: lucide-react
- **Data Storage**: In-memory (API routes)
- **Form Handling**: React hooks with custom validation

## Project Structure

```
candidate-management/
├── app/
│   ├── api/
│   │   └── candidates/
│   │       └── route.ts          # API endpoints (GET, POST, DELETE)
│   ├── page.tsx                  # Main page component
│   └── layout.tsx                # Root layout
├── components/
│   ├── CandidateForm.tsx         # Form component with validation
│   └── CandidateList.tsx         # List/Table component
├── types/
│   └── candidate.ts              # TypeScript interfaces
├── lib/
│   └── storage.ts                # Data storage utilities
├── public/                       # Static assets
└── README.md
```

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd candidate-management
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Build for Production

```bash
npm run build
npm start
```

## Usage

### Adding a Candidate

1. Fill in the form fields:
   - **Name**: Must be at least 2 characters
   - **Email**: Must be a valid email format
   - **Role**: Must be at least 2 characters

2. Click "Add Candidate"
3. The new candidate will appear in the table below

### Deleting a Candidate

1. Click the "Delete" button next to any candidate
2. Confirm the deletion in the dialog
3. The candidate will be removed from the list

## 🔌 API Endpoints

### GET `/api/candidates`
Fetch all candidates
- **Response**: Array of candidate objects

### POST `/api/candidates`
Create a new candidate
- **Body**: `{ name: string, email: string, role: string }`
- **Response**: Created candidate object

### DELETE `/api/candidates?id={id}`
Delete a candidate by ID
- **Query Param**: `id` (string)
- **Response**: Success message

## Features in Detail

### Form Validation
- Real-time validation feedback
- Email format validation using regex
- Required field checks
- Minimum length validation
- Clear error messages

### User Experience
- Loading states for async operations
- Success/error notifications
- Confirmation dialogs for destructive actions
- Auto-dismissing success messages
- Disabled states during submissions
- Responsive design for all screen sizes

### Code Quality
- TypeScript for type safety
- Reusable, modular components
- Clean separation of concerns
- Proper error handling
- ESLint configuration

## Deployment

### Deploy to Vercel (Recommended)

1. Push your code to GitHub
2. Visit [vercel.com](https://vercel.com)
3. Import your repository
4. Vercel will auto-detect Next.js and deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

### Deploy to Netlify

1. Push your code to GitHub
2. Visit [netlify.com](https://netlify.com)
3. Import your repository
4. Build command: `npm run build`
5. Publish directory: `.next`

## Future Enhancements

- [ ] Edit candidate functionality
- [ ] Search and filter capabilities
- [ ] Pagination for large datasets
- [ ] Persistent storage (Database integration)
- [ ] Export candidates to CSV
- [ ] Bulk operations
- [ ] Authentication and authorization
- [ ] Unit and integration tests

## Notes

- Data is stored in-memory and will reset on server restart
- For production use, integrate a database (PostgreSQL, MongoDB, etc.)
- Consider adding server-side validation for production

## Author

Built as part of the Next.js internship assessment

## License

This project is open source and available under the MIT License.

---

**Built with ❤️ using Next.js, TypeScript, and Tailwind CSS**

