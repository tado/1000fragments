uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.59;
	vec2 z = p;
	vec2 c = vec2(-0.27 + 0.09 * sin(time * 1.61), 0.47 + 0.09 * cos(time * 1.12));
	float trap = 10.0;
	for(int oi = 0; oi < 24; oi++){
		z = abs(z);
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, abs(z.x));
	}
	float v = exp(-trap * 5.10);
	vec3 col = vec3(0.83, 0.79, 0.77) * (0.20 / (abs(v * 3.64) + 0.03));
	col = col / (1.0 + col);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
