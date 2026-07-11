uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.69;
	vec2 z = p;
	vec2 c = vec2(-0.26 + 0.16 * sin(time * 0.68), -0.25 + 0.24 * cos(time * 1.21));
	float trap = 10.0;
	for(int oi = 0; oi < 19; oi++){
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, length(z - vec2(0.35, 0.03)));
	}
	float v = exp(-trap * 1.74);
	vec3 col = vec3(0.78, 0.97, 0.36) * (0.15 / (abs(v * 1.66) + 0.06));
	col = col / (1.0 + col);
	vec2 vg = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 1.77 * dot(vg, vg);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
