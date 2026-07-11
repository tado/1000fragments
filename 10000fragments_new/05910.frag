uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.77;
	vec2 z = p;
	vec2 c = vec2(-0.11 + 0.10 * sin(time * 1.40), -0.57 + 0.21 * cos(time * 1.41));
	float trap = 10.0;
	for(int oi = 0; oi < 18; oi++){
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, length(z - vec2(-0.20, -0.10)));
	}
	float v = exp(-trap * 4.51);
	vec3 col = vec3(0.88, 0.86, 0.19) * (0.12 / (abs(v * 1.85) + 0.10));
	col = col / (1.0 + col);
	col = floor(clamp(col, 0.0, 1.0) * 7.0) / 7.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
