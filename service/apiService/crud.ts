/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { getValidToken } from "../authService/validToken";
import { revalidatePath } from "next/cache";
import { config } from "@/config";
import { cookies } from "next/headers";
import { buildParams } from "@/utills/paramsBuilder";
import { getTenantSlug } from "../authService/getSubdomain";
import { Query } from "@/types/shared.types";

//create
export async function createData<T>(
  endPoint: string,
  revalPath: string,
  data?: T,
) {
  const token = await getValidToken();
  const tanentSlug = (await getTenantSlug()) as string;
  try {
    const res = await fetch(`${config.next_public_base_api}${endPoint}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        "X-Tenant-Slug": tanentSlug,
      },
      body: JSON.stringify(data),
    });
    const result = await res.json();
    revalidatePath(revalPath);
    return result;
  } catch (error: any) {
    if (
      error?.message === "NEXT_REDIRECT" ||
      error?.digest?.startsWith("NEXT_REDIRECT")
    ) {
      throw error;
    }
    return Error(error);
  }
}

// upload file
export async function uploadFile<T>(
  endPoint: string,
  revalPath: string,
  data?: T,
) {
  const token = await getValidToken();
  const tanentSlug = (await getTenantSlug()) as string;
  try {
    const res = await fetch(`${config.next_public_base_api}${endPoint}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "X-Tenant-Slug": tanentSlug,
        // "Content-Type": "multipart/form-data"
      },
      body: data as any,
    });
    const result = await res.json();
    revalidatePath(revalPath);
    return result;
  } catch (error: any) {
    if (
      error?.message === "NEXT_REDIRECT" ||
      error?.digest?.startsWith("NEXT_REDIRECT")
    ) {
      throw error;
    }
    return Error(error);
  }
}

//get
export async function readData(
  endPoint: string,
  tags: string[],
  query?: Query,
) {
  const cookieStore = await cookies();
  const token = cookieStore.get("accessToken")?.value;
  const tanentSlug = await getTenantSlug();
  try {
    const res = await fetch(
      `${config.next_public_base_api}${endPoint}?${query ? buildParams(query) : ""}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "X-Tenant-Slug": tanentSlug,
        },
        next: {
          tags: [...tags],
          revalidate: 15,
        },
      } as RequestInit,
    );
    const result = await res.json();
    return result;
  } catch (error: any) {
    if (
      error?.message === "NEXT_REDIRECT" ||
      error?.digest?.startsWith("NEXT_REDIRECT")
    ) {
      throw error;
    }
    return error;
  }
}

// delete
export async function deleteData<T>(
  endPoint: string,
  revalPath: string,
  data?: T,
) {
  const token = await getValidToken();
  const tanentSlug = await getTenantSlug();
  try {
    const res = await fetch(`${config.next_public_base_api}${endPoint}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        "X-Tenant-Slug": tanentSlug,
        "Content-Type": "application/json",
      },
      // body: JSON.stringify({customerIds:[1,2]}),
      body: JSON.stringify(data),
    } as RequestInit);
    const result = await res.json();
    revalidatePath(revalPath);
    return result;
  } catch (error: any) {
    if (
      error?.message === "NEXT_REDIRECT" ||
      error?.digest?.startsWith("NEXT_REDIRECT")
    ) {
      throw error;
    }
    return error;
  }
}

// update
export async function patchData<T>(
  endPoint: string,
  revalPath: string,
  data?: T,
) {
  const token = await getValidToken();
  const tanentSlug = await getTenantSlug();
  try {
    const res = await fetch(`${config.next_public_base_api}${endPoint}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        "X-Tenant-Slug": tanentSlug,
      },
      body: JSON.stringify(data),
    } as RequestInit);
    const result = await res.json();
    revalidatePath(revalPath);
    return result;
  } catch (error: any) {
    if (
      error?.message === "NEXT_REDIRECT" ||
      error?.digest?.startsWith("NEXT_REDIRECT")
    ) {
      throw error;
    }
    return error;
  }
}

export async function putData<T>(
  endPoint: string,
  revalPath: string,
  data?: T,
) {
  const token = await getValidToken();
  const tanentSlug = await getTenantSlug();
  try {
    const res = await fetch(`${config.next_public_base_api}${endPoint}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        "X-Tenant-Slug": tanentSlug,
      },
      body: JSON.stringify(data),
    } as RequestInit);
    const result = await res.json();
    revalidatePath(revalPath);
    return result;
  } catch (error: any) {
    if (
      error?.message === "NEXT_REDIRECT" ||
      error?.digest?.startsWith("NEXT_REDIRECT")
    ) {
      throw error;
    }
    return error;
  }
}
