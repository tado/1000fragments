uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.40;
	vec2 z = p;
	vec2 c = vec2(-0.60 + 0.22 * sin(time * 1.64), -0.30 + 0.16 * cos(time * 0.86));
	float trap = 10.0;
	for(int oi = 0; oi < 20; oi++){
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, length(z));
	}
	float v = exp(-trap * 5.91);
	vec3 col = vec3(0.5 + 0.5 * v * 2.61) * vec3(1.50, 1.15, 1.48) + vec3(0.22, 0.01, 0.15);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
