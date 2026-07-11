uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.97;
	vec2 z = p;
	vec2 c = vec2(-0.74 + 0.24 * sin(time * 1.73), 0.38 + 0.29 * cos(time * 1.26));
	float trap = 10.0;
	for(int oi = 0; oi < 19; oi++){
		z = abs(z);
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, length(z));
	}
	float v = exp(-trap * 4.24);
	vec3 col = 0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + v * 2.98 * 2.41 + time * 0.76);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
