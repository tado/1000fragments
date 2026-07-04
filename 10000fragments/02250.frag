uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.30;
	vec2 gp = p * 2.92;
	vec2 id = floor(gp); vec2 gv = fract(gp) - 0.5;
	float rnd = hash21(id);
	float sq = max(abs(gv.x), abs(gv.y));
	float v = sin(sq * 12.17 - time * 2.67 + rnd * 6.2831853);
	float cc = clamp(0.5 + 0.5 * v, 0.0, 1.0);
	vec3 col = mix(vec3(0.11, 0.24, 0.37), vec3(0.79, 0.70, 0.90), cc);
	col *= 0.54 + 0.45 * hash21(id + 11.0);
	col = pow(clamp(col, 0.0, 1.0), vec3(0.53));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
