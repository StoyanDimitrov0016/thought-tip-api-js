import { model, Schema } from "mongoose";

const SEGMENTATION_TYPES = { CATEGORY: "category", TOPIC: "topic", TAG: "tag" };
const SEGMENTATION_STATUSES = { ACTIVE: "active", INACTIVE: "inactive" };
const SEGMENTATION_DEFAULT_POPULARITY_SCORE = 0;

const segmentationSchema = new Schema(
  {
    name: { type: String, required: true },
    slug: { type: String, unique: true },
    description: { type: String, required: true },
    type: {
      type: String,
      enum: Object.values(SEGMENTATION_TYPES),
      required: true,
    },
    parentId: { type: Schema.Types.ObjectId, ref: "Segmentation", default: null },
    status: {
      type: String,
      enum: Object.values(SEGMENTATION_STATUSES),
      default: SEGMENTATION_STATUSES.ACTIVE,
    },
    popularity: { type: Number, default: SEGMENTATION_DEFAULT_POPULARITY_SCORE },
  },
  { timestamps: true }
);

segmentationSchema.index({ type: 1, parentId: 1 });

const SegmentationModel = model("Segmentation", segmentationSchema);
export default SegmentationModel;
