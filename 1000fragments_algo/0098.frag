uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p.y += sin(p.x * 2.87 + (time * 0.74) * 1.12) * 0.13;
	p = rot2((time * 0.74) * 0.80) * p;
	vec2 gp = p * 5.66;
	vec2 id = floor(gp); vec2 gv = fract(gp) - 0.5;
	float rnd = hash21(id);
	float v = sin((length(gv) - 0.23 - 0.09 * sin((time * 0.74) * 3.10 + rnd * 6.2831853)) * 11.54);
	vec3 col = vec3(0.5 + 0.5 * (v)) * vec3(0.51, 0.61, 0.60) + vec3(0.07, 0.09, 0.05);
	col += (hash21(gl_FragCoord.xy + fract((time * 0.74)) * 100.0) - 0.5) * 0.05;
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.47);
	col = clamp(col, 0.0, 1.0) * vec3(1.016, 0.964, 1.012) * 1.00 + 0.041;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
