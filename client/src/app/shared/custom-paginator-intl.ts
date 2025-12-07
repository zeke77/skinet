// custom-paginator-intl.ts
import { MatPaginatorIntl } from '@angular/material/paginator';
import { Injectable } from '@angular/core';

@Injectable()
export class CustomPaginatorIntl extends MatPaginatorIntl {
  // Override the method that controls the range display
  override getRangeLabel = (page: number, pageSize: number, length: number): string => {
    // If the total length is 0, just return '0 of 0'
    if (length === 0) {
      return `0 of 0`;
    }

    // Calculate the total number of pages
    const numPages = Math.ceil(length / pageSize);
    
    // Construct the custom label: "Page [current page number] of [total pages]"
    // Note: page is 0-indexed, so we add 1 for display
    return `Page ${page + 1} of ${numPages}`;
  };
}