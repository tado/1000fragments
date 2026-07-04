uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.58;
	vec2 z = p;
	vec2 c = vec2(-0.56 + 0.21 * sin(time * 0.92), -0.29 + 0.30 * cos(time * 0.91));
	float trap = 10.0;
	for(int oi = 0; oi < 23; oi++){
		z = abs(z);
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, length(z - vec2(0.24, 0.17)));
	}
	float v = exp(-trap * 4.30);
	vec3 col = 0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + v * 3.95 * 2.56 + time * 0.83);
	col = floor(clamp(col, 0.0, 1.0) * 6.0) / 6.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
