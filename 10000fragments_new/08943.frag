uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }


void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.66;
	vec2 gp = p * 7.75;
	vec2 id = floor(gp); vec2 gv = fract(gp) - 0.5;
	float rnd = hash21(id);
	float v = sin((length(gv) - 0.29 - 0.16 * sin(time * 2.33 + rnd * 6.2831853)) * 19.40);
	vec3 col = vec3(0.5 + 0.5 * v) * vec3(0.64, 0.83, 1.07) + vec3(0.18, 0.02, 0.11);
	col *= 0.52 + 0.49 * hash21(id + 11.0);
	col = fract(col * 1.48);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
