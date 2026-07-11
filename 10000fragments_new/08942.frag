uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.28;
	p = rot2(time * -1.16) * p;
	vec2 gp = p * 3.82;
	vec2 id = floor(gp); vec2 gv = fract(gp) - 0.5;
	float rnd = hash21(id);
	float v = sin((length(gv) - 0.17 - 0.09 * sin(time * 4.07 + rnd * 6.2831853)) * 14.33);
	float cc = clamp(0.5 + 0.5 * v, 0.0, 1.0);
	vec3 col = mix(vec3(0.13, 0.12, 0.04), vec3(0.58, 0.79, 0.68), cc);
	col *= 0.63 + 0.32 * hash21(id + 11.0);
	col *= 0.81 + 0.14 * sin(gl_FragCoord.y * 2.21 + time * 15.47);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
