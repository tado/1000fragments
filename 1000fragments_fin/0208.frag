uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= min(1.0, 1.8 * resolution.y / resolution.x);
	if(resolution.x > resolution.y * 1.9) p *= 0.6;
	p += vec2(sin((time * 0.86) * 0.43), cos((time * 0.86) * 0.60)) * 0.11;
	p *= 1.22;
	vec2 q = p;
	float d1 = 1000.0; float d2 = 1000.0;
	for(int ci = 0; ci < 7; ci++){
		q = abs(q) - 0.38;
		q = rot2(2.69 + (time * 0.86) * 0.05) * q;
		q *= 1.12;
		d1 = min(d1, abs(length(q) - 0.62));
		d2 = min(d2, length(q - vec2(-0.01, -0.20)));
	}
	vec3 col = mix(vec3(0.039, 0.028, 0.082), vec3(0.039, 0.058, 0.081), clamp(0.5 + p.y * -0.03 + p.x * 0.23, 0.0, 1.0));
	col += (0.5 + 0.5 * cos(vec3(4.127, 5.465, 6.802) + 0.29 + (time * 0.86) * 0.41)) * (0.0133 / (d1 + 0.018));
	col += (0.5 + 0.5 * cos(vec3(4.127, 5.465, 6.802) + 2.92 + (time * 0.86) * 0.14)) * (0.0193 / (d2 + 0.033));
	col = col / (1.0 + col);
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.55);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.16);
	col *= vec3(0.944, 0.973, 1.036);
	col += 0.005;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.40 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
