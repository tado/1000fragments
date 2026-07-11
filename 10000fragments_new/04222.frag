uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.81;
	vec2 gp = p * 2.43;
	vec2 id = floor(gp); vec2 gv = fract(gp) - 0.5;
	float rnd = hash21(id);
	float v = sin((length(gv) - 0.23 - 0.13 * sin(time * 1.63 + rnd * 6.2831853)) * 22.33);
	vec3 col = vec3(0.82, 0.32, 0.21) * (0.05 / (abs(v) + 0.09));
	col = col / (1.0 + col);
	col *= 0.80 + 0.17 * sin(gl_FragCoord.y * 1.54 + time * 15.24);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
