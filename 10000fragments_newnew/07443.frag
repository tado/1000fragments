uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.94;
	vec2 z = p;
	vec2 c = vec2(0.30 + 0.21 * sin(time * 1.41), -0.40 + 0.22 * cos(time * 1.25));
	float trap = 10.0;
	for(int oi = 0; oi < 10; oi++){
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, length(z - vec2(-0.24, -0.30)));
	}
	float v = exp(-trap * 3.01);
	vec3 col = vec3(0.81, 0.97, 0.51) * (0.11 / (abs(v * 3.41) + 0.07));
	col = col / (1.0 + col);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
