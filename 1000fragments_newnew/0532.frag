uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec2 gp = p * 4.30;
	vec2 id = floor(gp); vec2 gv = fract(gp) - 0.5;
	float rnd = hash21(id);
	vec2 sv = rot2(floor(rnd * 4.0) * 0.7853982 + (time * 0.70) * 1.68 * (step(0.5, hash21(id + 3.3)) * 2.0 - 1.0)) * gv;
	float v = sin(sv.x * 9.25 + rnd * 6.2831853 + (time * 0.70) * 3.73);
	vec3 col = vec3(0.5 + 0.5 * (v)) * vec3(0.58, 0.68, 0.70) + vec3(0.06, 0.01, 0.04);
	col = clamp((col - 0.5) * 1.88 + 0.5, 0.0, 1.0);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.37);
	col = clamp(col, 0.0, 1.0) * vec3(0.965, 0.996, 0.958) * 1.00 + 0.014;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
