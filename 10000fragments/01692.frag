uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.98;
	vec2 z = p;
	vec2 c = vec2(-0.08 + 0.10 * sin(time * 0.56), -0.37 + 0.24 * cos(time * 1.43));
	float trap = 10.0;
	for(int oi = 0; oi < 22; oi++){
		z = abs(z);
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, min(abs(z.x), abs(z.y)));
	}
	float v = exp(-trap * 3.06);
	vec3 col = 0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + v * 2.62 * 3.43 + time * 0.66);
	col = pow(clamp(col, 0.0, 1.0), vec3(1.51));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
