uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.68;
	vec2 z = p;
	vec2 c = vec2(-0.29 + 0.15 * sin(time * 1.41), 0.20 + 0.09 * cos(time * 1.55));
	float trap = 10.0;
	for(int oi = 0; oi < 23; oi++){
		z = abs(z);
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, abs(z.y));
	}
	float v = exp(-trap * 3.83);
	vec3 col = vec3(0.44, 0.96, 0.42) * (0.18 / (abs(v * 1.90) + 0.05));
	col = col / (1.0 + col);
	vec2 vg = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 1.17 * dot(vg, vg);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
