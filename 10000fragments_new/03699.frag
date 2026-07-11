uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }


void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	vec2 gp = p * 6.46;
	vec2 id = floor(gp); vec2 gv = fract(gp) - 0.5;
	float rnd = hash21(id);
	float v = sin((length(gv) - 0.22 - 0.15 * sin(time * 4.85 + rnd * 6.2831853)) * 22.51);
	vec3 col = vec3(0.30, 0.36, 0.99) * (0.17 / (abs(v) + 0.02));
	col = col / (1.0 + col);
	col *= 0.65 + 0.32 * hash21(id + 11.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
