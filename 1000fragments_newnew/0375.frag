uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }


void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.09;
	vec2 gp = p * 3.18;
	vec2 id = floor(gp); vec2 gv = fract(gp) - 0.5;
	float rnd = hash21(id);
	float v = sin((length(gv) - 0.23 - 0.12 * sin((time * 0.72) * 4.06 + rnd * 6.2831853)) * 16.45);
	float cc = clamp(0.5 + 0.5 * (v), 0.0, 1.0);
	vec3 col = mix(vec3(0.31, 0.32, 0.20), vec3(0.57, 0.67, 0.60), smoothstep(0.0, 1.0, cc));
	col *= 0.67 + 0.30 * hash21(id + 11.0);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.56);
	col = clamp(col, 0.0, 1.0) * vec3(1.043, 0.972, 0.933) * 1.00 + 0.021;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
