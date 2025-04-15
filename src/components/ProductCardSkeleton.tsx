// components/ProductCardSkeleton.tsx
export default function ProductCardSkeleton() {
  return (
    <div className="itemCard animate-pulse flex flex-col items-center p-4">
      <div className="bg-gray-300 rounded w-[180px] h-[180px]" />
      <div className="h-5 bg-gray-300 rounded mt-2 w-[100px]" />
      <div className="h-4 bg-gray-300 rounded mt-1 w-[160px]" />
      <div className="mt-2 h-[40px] bg-gray-300 rounded w-[190px]" />
    </div>
  );
}
