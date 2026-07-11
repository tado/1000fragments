uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }


void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.19;
	vec2 gp = p * 4.98;
	vec2 id = floor(gp); vec2 gv = fract(gp) - 0.5;
	float rnd = hash21(id);
	float v = sin((length(gv) - 0.20 - 0.13 * sin(time * 2.92 + rnd * 6.2831853)) * 17.39);
	float cc = clamp(0.5 + 0.5 * v, 0.0, 1.0);
	vec3 col = mix(vec3(0.11, 0.30, 0.29), vec3(1.00, 0.78, 0.44), cc);
	col *= 0.52 + 0.41 * hash21(id + 11.0);
	col = mod(col * 1.23, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
