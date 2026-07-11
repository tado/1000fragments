uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.70;
	vec2 z = p;
	vec2 c = vec2(-0.53 + 0.22 * sin(time * 1.15), 0.14 + 0.18 * cos(time * 0.95));
	float trap = 10.0;
	for(int oi = 0; oi < 15; oi++){
		z = abs(z);
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, abs(z.x));
	}
	float v = exp(-trap * 3.20);
	vec3 col = vec3(0.87, 0.39, 0.87) * (0.09 / (abs(v * 3.79) + 0.04));
	col = col / (1.0 + col);
	vec2 vg = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 1.49 * dot(vg, vg);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
