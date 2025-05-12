import features from "../../../data/features";

export default function FeaturesSection() {
  return (
    <section className="py-16 bg-gray-50 px-4">
      <h2 className="text-3xl font-bold text-center mb-12 text-indigo-700">Platform Highlights</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {features.map((feature, idx) => (
          <div key={idx} className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition border-t-4 border-indigo-600">
            <h3 className="text-xl font-semibold text-indigo-700 mb-2">{feature.title}</h3>
            <p className="text-gray-700">{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
