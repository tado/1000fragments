uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= min(1.0, 1.8 * resolution.y / resolution.x);
	if(resolution.x > resolution.y * 1.9) p *= 0.6;
	p.x = abs(p.x);
	p.x += p.y * 0.57;
	p *= 1.16;
	vec2 q = p;
	float d1 = 1000.0; float d2 = 1000.0;
	for(int ci = 0; ci < 5; ci++){
		q = abs(q) - 0.40;
		q = rot2(0.92 + (time * 0.63) * -0.04) * q;
		q *= 1.10;
		d1 = min(d1, abs(q.y));
		d2 = min(d2, length(q - vec2(-0.45, -0.33)));
	}
	vec3 col = mix(vec3(0.070, 0.055, 0.033), vec3(0.071, 0.039, 0.049), clamp(0.5 + p.y * 0.15 + p.x * 0.21, 0.0, 1.0));
	col += (0.5 + 0.5 * cos(vec3(5.357, 6.098, 6.839) + 5.60 + (time * 0.63) * 0.55)) * (0.0111 / (d1 + 0.007));
	col += (0.5 + 0.5 * cos(vec3(5.357, 6.098, 6.839) + 3.50 + (time * 0.63) * 0.59)) * (0.0091 / (d2 + 0.022));
	col = col / (1.0 + col);
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.31);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.15);
	col *= vec3(1.008, 1.007, 1.013);
	col += 0.004;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.37 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
