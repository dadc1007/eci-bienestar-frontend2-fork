import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { InfoCardItem } from "../../../appointment-management/components/InfoCardItem";
import { CarroselItem } from "@/modules/appointment-management/types/carroselType";
import { useAllMultimedia, useDeleteMultimedia } from "../../hooks";
import { MultimediaResponse } from "../../types/dto/response/MultimediaResponse";

const MediaList = () => {
  const { data, isLoading, isError } = useAllMultimedia();
  const { mutate: deleteMultimedia, isPending } = useDeleteMultimedia();

  const multimediaList: MultimediaResponse[] = data?.data || [];
  const handleDelete = (id: number) => {
    deleteMultimedia(id);
  };

  return (
    <>
      {multimediaList.map((item) => (
        <InfoCardItem
          key={item.id}
          id={item.id}
          title={item.name}
          subtitle={`${item.type} • ${item.duration}s`}
          titleClassName="text-black"
          subtitleClassName="text-zinc-500"
        >
          <button onClick={() => handleDelete(item.id)}>
            <FontAwesomeIcon
              icon={faTrash}
              className="text-pink-600 hover:text-pink-800"
            />
          </button>
        </InfoCardItem>
      ))}
    </>
  );
};

export default MediaList;
