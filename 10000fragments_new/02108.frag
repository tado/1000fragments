uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.18;
	vec2 z = p;
	vec2 c = vec2(-0.50 + 0.14 * sin(time * 0.71), -0.13 + 0.06 * cos(time * 0.66));
	float trap = 10.0;
	for(int oi = 0; oi < 9; oi++){
		z = abs(z);
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, length(z - vec2(-0.21, 0.34)));
	}
	float v = exp(-trap * 5.72);
	vec3 col = vec3(0.15, 0.67, 0.63) * (0.09 / (abs(v * 2.98) + 0.09));
	col = col / (1.0 + col);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
