uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec2 gp = p * 3.83;
	vec2 id = floor(gp); vec2 gv = fract(gp) - 0.5;
	float rnd = hash21(id);
	float sq = max(abs(gv.x), abs(gv.y));
	float v = sin(sq * 22.21 - (time * 0.70) * 3.07 + rnd * 6.2831853);
	vec3 col = vec3(0.5 + 0.5 * (v)) * vec3(0.58, 0.51, 0.58) + vec3(0.06, 0.03, 0.05);
	col *= 0.64 + 0.33 * hash21(id + 11.0);
	col = floor(clamp(col, 0.0, 1.0) * 6.0) / 6.0;
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.56);
	col = clamp(col, 0.0, 1.0) * vec3(1.041, 0.987, 0.929) * 1.00 + 0.026;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
