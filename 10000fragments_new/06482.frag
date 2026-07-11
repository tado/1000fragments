uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.45;
	vec2 z = p;
	vec2 c = vec2(-0.88 + 0.19 * sin(time * 0.88), -0.34 + 0.06 * cos(time * 1.07));
	float trap = 10.0;
	for(int oi = 0; oi < 13; oi++){
		z = abs(z);
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, min(abs(z.x), abs(z.y)));
	}
	float v = exp(-trap * 1.97);
	float cc = clamp(0.5 + 0.5 * v * 2.47, 0.0, 1.0);
	vec3 col = mix(vec3(0.13, 0.37, 0.23), vec3(0.57, 0.67, 0.86), cc);
	col = pow(clamp(col, 0.0, 1.0), vec3(1.56));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
