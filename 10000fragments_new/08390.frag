uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.23;
	vec2 z = p;
	vec2 c = vec2(0.21 + 0.15 * sin(time * 1.26), 0.52 + 0.25 * cos(time * 1.11));
	float trap = 10.0;
	for(int oi = 0; oi < 11; oi++){
		z = abs(z);
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, length(z - vec2(0.31, -0.45)));
	}
	float v = exp(-trap * 5.14);
	vec3 col = vec3(0.82, 0.23, 0.85) * (0.06 / (abs(v * 3.07) + 0.08));
	col = col / (1.0 + col);
	col = pow(clamp(col, 0.0, 1.0), vec3(1.37));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
