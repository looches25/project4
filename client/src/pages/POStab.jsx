export default function POStab ({cart}) {
    return (
        cart?.map((item, index) => (
            <tr key={index}>
              <td colSpan={2}>{item?.Name}</td>
              <td>${(item?.Price).toFixed(2)}</td>
              <td>{item?.Qty}</td>
              <td>${(item?.Qty * item?.Price).toFixed(2)}</td>
              <td></td>
            </tr>
          ))
    )
}