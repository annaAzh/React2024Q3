import style from '@/app/ui/styles/pages/NotFound.module.scss';

export default function NotFound() {
  return (
    <main className="flex h-full flex-col items-center justify-center gap-2">
      <h1 className={style.title_404}>404</h1>
      <h2 className={style.title}>Not Found Page</h2>
    </main>
  );
}
