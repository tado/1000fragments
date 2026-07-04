uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }


void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.67;
	vec2 gp = p * 2.61;
	vec2 id = floor(gp); vec2 gv = fract(gp) - 0.5;
	float rnd = hash21(id);
	if(rnd < 0.5) gv.x = -gv.x;
	float ad = min(abs(length(gv - vec2(0.5)) - 0.5), abs(length(gv + vec2(0.5)) - 0.5));
	float v = sin(ad * 26.04 - time * 7.37 + rnd * 6.2831853);
	vec3 col = vec3(0.5 + 0.5 * v) * vec3(1.10, 0.74, 0.95) + vec3(0.24, 0.24, 0.24);
	col *= 0.66 + 0.41 * hash21(id + 11.0);
	vec2 vg = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 1.39 * dot(vg, vg);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
