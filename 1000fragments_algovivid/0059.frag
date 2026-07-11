uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p.x += p.y * 0.40;
	vec2 gp = p * 6.05;
	vec2 id = floor(gp); vec2 gv = fract(gp) - 0.5;
	float rnd = hash21(id);
	float v = sin((length(gv) - 0.30 - 0.13 * sin((time * 0.85) * 4.43 + rnd * 6.2831853)) * 24.89);
	vec3 col = vec3(0.5 + 0.5 * (v)) * vec3(0.61, 0.66, 0.62) + vec3(0.05, 0.06, 0.04);
	col += (hash21(gl_FragCoord.xy + fract((time * 0.85)) * 100.0) - 0.5) * 0.06;
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.30);
	col = clamp(col, 0.0, 1.0) * vec3(1.003, 0.983, 0.993) * 1.00 + 0.020;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
