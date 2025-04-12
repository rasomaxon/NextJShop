import Image from "next/image";

type CartItem = {
  id: number;
  title: string;
  price: number;
  image: string;
  quantity: number;
};

type CartItemCardProps = {
  item: CartItem;
  onIncrease: (id: number) => void;
  onDecrease: (id: number) => void;
  onRemove: (id: number) => void;
};

export default function CartItemCard({
  item,
  onIncrease,
  onDecrease,
  onRemove,
}: CartItemCardProps) {
  return (
    <div className="cartItemCard">
			<div className='flex'>
				<Image
					src={item.image}
					alt={item.title}
					width={100}
					height={100}
					style={{marginRight:"20px", objectFit:"contain", width:100, height:100}}
				/>

				<div className="flex flex-col justify-between" style={{height:100}}>
					<h2 className="text-lg font-semibold mb-1">{item.title}</h2>
					<p className="text-gray-600 mb-2">{item.price} $</p>

					<div className="flex items-center gap-2">
						<button
							className="btn greenBtn" style={{height:30, width:30}}
							onClick={() => onDecrease(item.id)}
						>
							-
						</button>
						<span className="btn greenBtn" style={{height:30, width:30}}>{item.quantity}</span>
						<button
							className="btn greenBtn" style={{height:30, width:30}}
							onClick={() => onIncrease(item.id)}
						>
							+
						</button>
					</div>
      	</div>
			</div>
      <button className="deleteCartBtn" onClick={() => onRemove(item.id)}>
        x
      </button>
    </div>
  );
}
