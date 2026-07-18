uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= min(1.0, 1.8 * resolution.y / resolution.x);
	if(resolution.x > resolution.y * 1.9) p *= 0.6;
	vec2 q = p;
	float d1 = 1000.0; float d2 = 1000.0;
	for(int ci = 0; ci < 8; ci++){
		q = abs(q) - 0.30;
		q = rot2(1.13 + sin((time * 0.84) * 0.97) * 0.17) * q;
		q *= 1.12;
		d1 = min(d1, abs(length(q) - 0.45));
	}
	vec3 col = mix(vec3(0.035, 0.071, 0.057), vec3(0.018, 0.055, 0.048), clamp(0.5 + p.y * -0.04 + p.x * -0.11, 0.0, 1.0));
	col += (0.5 + 0.5 * cos(vec3(0.547, 1.714, 2.881) + 1.28 + (time * 0.84) * 0.48)) * (0.0141 / (d1 + 0.012));
	col = col / (1.0 + col);
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.17);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.25);
	col *= vec3(1.043, 0.996, 0.918);
	col += 0.022;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.48 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
