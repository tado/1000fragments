uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }


void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.65;
	vec2 gp = p * 4.45;
	vec2 id = floor(gp); vec2 gv = fract(gp) - 0.5;
	float rnd = hash21(id);
	float v = sin((length(gv) - 0.22 - 0.11 * sin(time * 3.10 + rnd * 6.2831853)) * 15.94);
	vec3 col = vec3(0.38, 0.97, 0.42) * (0.12 / (abs(v) + 0.05));
	col = col / (1.0 + col);
	col *= 0.64 + 0.35 * hash21(id + 11.0);
	col = pow(clamp(col, 0.0, 1.0), vec3(1.65));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
