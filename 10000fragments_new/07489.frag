uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.13;
	vec2 z = p;
	vec2 c = vec2(-0.18 + 0.17 * sin(time * 0.52), 0.22 + 0.17 * cos(time * 0.51));
	float trap = 10.0;
	for(int oi = 0; oi < 20; oi++){
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, abs(z.y));
	}
	float v = exp(-trap * 5.68);
	vec3 col = vec3(0.30, 0.21, 0.98) * (0.24 / (abs(v * 3.01) + 0.06));
	col = col / (1.0 + col);
	col *= 0.84 + 0.20 * sin(gl_FragCoord.y * 1.14 + time * 15.06);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
