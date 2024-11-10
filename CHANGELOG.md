# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- Dark mode support with system preference detection
- Theme toggle component for switching between light, dark, and system themes
- Responsive design improvements for mobile devices

### Changed
- Updated README with comprehensive project information and usage instructions
- Improved error handling in file upload and deletion processes

## [1.0.0] - 2024-11-10

### Added
- Initial release of Vercel Blob File Manager
- File upload functionality using Vercel Blob storage
- File listing with detailed information (name, type, size, upload date)
- File deletion capability
- Basic responsive design for desktop and mobile use
- API routes for handling file operations (upload, list, delete)
- Error handling and loading states for better user experience

### Changed
- Upgraded to Next.js 14 for improved performance and features

### Security
- Implemented secure handling of Vercel Blob read/write token