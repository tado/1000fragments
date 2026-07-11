uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.29;
	vec2 gp = p * 2.41;
	vec2 id = floor(gp); vec2 gv = fract(gp) - 0.5;
	float rnd = hash21(id);
	float v = sin((length(gv) - 0.23 - 0.09 * sin(time * 5.49 + rnd * 6.2831853)) * 22.40);
	vec3 col = vec3(0.26, 0.31, 0.74) * (0.19 / (abs(v) + 0.04));
	col = col / (1.0 + col);
	col *= 0.58 + 0.38 * hash21(id + 11.0);
	col = mod(col * 2.45, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
