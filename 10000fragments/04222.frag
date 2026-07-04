uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.16;
	vec2 gp = p * 2.21;
	vec2 id = floor(gp); vec2 gv = fract(gp) - 0.5;
	float rnd = hash21(id);
	if(rnd < 0.5) gv.x = -gv.x;
	float v = sin((gv.x + gv.y) * 16.39 + rnd * 6.2831853 + time * 4.90);
	vec3 col = vec3(0.5 + 0.5 * v) * vec3(0.82, 0.63, 1.11) + vec3(0.04, 0.09, 0.05);
	vec2 vg = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 1.51 * dot(vg, vg);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
