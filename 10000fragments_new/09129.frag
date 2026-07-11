uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.69;
	vec2 z = p;
	vec2 c = vec2(-0.86 + 0.30 * sin(time * 1.96), 0.48 + 0.29 * cos(time * 1.44));
	float trap = 10.0;
	for(int oi = 0; oi < 21; oi++){
		z = abs(z);
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, length(z));
	}
	float v = exp(-trap * 4.31);
	vec3 col = vec3(0.37, 0.89, 0.25) * (0.20 / (abs(v * 3.04) + 0.04));
	col = col / (1.0 + col);
	col = pow(clamp(col, 0.0, 1.0), vec3(1.25));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
