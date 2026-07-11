uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }


void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.y = abs(p.y);
	p.x *= resolution.x / resolution.y;
	p *= 2.73;
	vec2 gp = p * 7.71;
	vec2 id = floor(gp); vec2 gv = fract(gp) - 0.5;
	float rnd = hash21(id);
	float sq = max(abs(gv.x), abs(gv.y));
	float v = sin(sq * 11.90 - (time * 0.54) * 7.17 + rnd * 6.2831853);
	float cc = clamp(0.5 + 0.5 * (v), 0.0, 1.0);
	vec3 col = mix(vec3(0.16, 0.09, 0.11), vec3(0.76, 0.73, 0.82), cc);
	col = floor(clamp(col, 0.0, 1.0) * 5.0) / 5.0;
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.36);
	col = clamp(col, 0.0, 1.0) * vec3(0.919, 0.965, 1.056) * 1.00 + 0.034;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
