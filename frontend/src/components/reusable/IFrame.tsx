interface ProductVideoProps {
  videoUrl: string; // Can be an embed URL (e.g., YouTube) or direct video file URL
  isEmbed?: boolean; // true for iframe embeds like YouTube, false for video file
}

const IFrame: React.FC<ProductVideoProps> = ({ videoUrl, isEmbed = true }) => {
  return (
    <div className="w-full aspect-video rounded overflow-hidden">
      {isEmbed ? (
        <iframe
          src={videoUrl}
          title="Product Video"
          className="w-full h-full"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      ) : (
        <video src={videoUrl} controls className="w-full h-full object-cover" />
      )}
    </div>
  );
};

export default IFrame;
