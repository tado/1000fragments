uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec2 gp = p * 7.35;
	vec2 id = floor(gp); vec2 gv = fract(gp) - 0.5;
	float rnd = hash21(id);
	float v = sin((length(gv) - 0.27 - 0.10 * sin(time * 3.20 + rnd * 6.2831853)) * 19.30);
	vec3 col = vec3(0.5 + 0.5 * v) * vec3(0.73, 0.83, 1.18) + vec3(0.19, 0.04, 0.25);
	col = fract(col * 1.99);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
