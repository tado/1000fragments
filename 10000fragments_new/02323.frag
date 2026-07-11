uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.08;
	vec2 z = p;
	vec2 c = vec2(-0.85 + 0.10 * sin(time * 0.97), -0.48 + 0.20 * cos(time * 1.26));
	float trap = 10.0;
	for(int oi = 0; oi < 8; oi++){
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, abs(z.y));
	}
	float v = exp(-trap * 3.51);
	vec3 col = vec3(0.99, 0.57, 0.68) * (0.22 / (abs(v * 1.84) + 0.10));
	col = col / (1.0 + col);
	col = mod(col * 2.38, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
