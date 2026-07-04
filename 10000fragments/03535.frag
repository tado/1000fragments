uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }


void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.61;
	vec2 gp = p * 4.58;
	vec2 id = floor(gp); vec2 gv = fract(gp) - 0.5;
	float rnd = hash21(id);
	float v = sin((length(gv) - 0.16 - 0.17 * sin(time * 4.29 + rnd * 6.2831853)) * 25.06);
	float cc = clamp(0.5 + 0.5 * v, 0.0, 1.0);
	vec3 col = mix(vec3(0.19, 0.10, 0.55), vec3(0.72, 0.68, 0.81), cc);
	col = mod(col * 2.57, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
