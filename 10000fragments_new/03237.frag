uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.86;
	vec2 z = p;
	vec2 c = vec2(-0.88 + 0.07 * sin(time * 1.42), -0.53 + 0.25 * cos(time * 0.48));
	float trap = 10.0;
	for(int oi = 0; oi < 14; oi++){
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, length(z - vec2(0.25, 0.46)));
	}
	float v = exp(-trap * 3.78);
	vec3 col = vec3(0.58, 0.76, 0.28) * (0.22 / (abs(v * 2.50) + 0.03));
	col = col / (1.0 + col);
	vec2 vg = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 1.69 * dot(vg, vg);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
