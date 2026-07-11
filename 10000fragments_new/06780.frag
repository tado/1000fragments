uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }


void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	vec2 gp = p * 6.46;
	vec2 id = floor(gp); vec2 gv = fract(gp) - 0.5;
	float rnd = hash21(id);
	float v = sin((length(gv) - 0.16 - 0.11 * sin(time * 5.79 + rnd * 6.2831853)) * 24.90);
	vec3 col = vec3(0.5 + 0.5 * v) * vec3(0.63, 0.51, 1.46) + vec3(0.09, 0.15, 0.06);
	col *= 0.63 + 0.47 * hash21(id + 11.0);
	col = fract(col * 1.22);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
