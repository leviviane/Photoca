import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { getSinglePhotocardThunk } from "../../store/photocard";
import { createReviewThunk } from "../../store/review";
import "./CreateReview.css";
