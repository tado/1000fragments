uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.19;
	vec2 gp = p * 4.14;
	vec2 id = floor(gp); vec2 gv = fract(gp) - 0.5;
	float rnd = hash21(id);
	float v = sin((length(gv) - 0.18 - 0.14 * sin(time * 2.50 + rnd * 6.2831853)) * 22.86);
	float cc = clamp(0.5 + 0.5 * v, 0.0, 1.0);
	vec3 col = mix(vec3(0.38, 0.30, 0.42), vec3(0.67, 0.57, 0.93), cc);
	col = fract(col * 1.78);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
