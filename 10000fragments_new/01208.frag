uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }


void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.33;
	vec2 gp = p * 5.51;
	vec2 id = floor(gp); vec2 gv = fract(gp) - 0.5;
	float rnd = hash21(id);
	float v = sin((length(gv) - 0.30 - 0.18 * sin(time * 2.24 + rnd * 6.2831853)) * 22.10);
	vec3 col = vec3(0.74, 0.88, 0.43) * (0.15 / (abs(v) + 0.02));
	col = col / (1.0 + col);
	col *= 0.62 + 0.45 * hash21(id + 11.0);
	col *= 0.90 + 0.10 * sin(gl_FragCoord.y * 2.17 + time * 6.41);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
