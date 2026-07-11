uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.59;
	vec2 z = p;
	vec2 c = vec2(0.22 + 0.09 * sin(time * 1.26), -0.47 + 0.27 * cos(time * 1.30));
	float trap = 10.0;
	for(int oi = 0; oi < 22; oi++){
		z = abs(z);
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, abs(z.x));
	}
	float v = exp(-trap * 3.44);
	float cc = clamp(0.5 + 0.5 * v * 3.70, 0.0, 1.0);
	vec3 col = mix(vec3(0.39, 0.38, 0.31), vec3(0.56, 0.71, 0.77), cc);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
