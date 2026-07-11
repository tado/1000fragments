uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }


void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p.y = abs(p.y);
	p *= 0.95;
	vec2 gp = p * 7.12;
	vec2 id = floor(gp); vec2 gv = fract(gp) - 0.5;
	float rnd = hash21(id);
	float sq = max(abs(gv.x), abs(gv.y));
	float v = sin(sq * 27.53 - (time * 0.63) * 2.64 + rnd * 6.2831853);
	vec3 col = vec3(0.70, 0.74, 0.73) * (0.09 / (abs((v)) + 0.07));
	col = col / (1.0 + col);
	col *= 0.60 + 0.50 * hash21(id + 11.0);
	col *= 0.87 + 0.12 * sin(gl_FragCoord.y * 0.89 + (time * 0.63) * 16.24);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.16);
	col = clamp(col, 0.0, 1.0) * vec3(1.054, 0.986, 0.939) * 1.00 + 0.043;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
