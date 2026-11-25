const ServiceCard = ({ name, description }) => (
  <div
    data-reveal=""
    className="panel h-full p-6 transition-colors duration-300 hover:border-sky/50 tablet:p-7"
  >
    <h3 className="font-semibold text-2xl text-content tablet:text-3xl">
      {name ? name : "Heading"}
    </h3>
    <p className="mt-3 text-base leading-relaxed text-content-muted">
      {description}
    </p>
  </div>
);

export default ServiceCard;
