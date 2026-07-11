uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.30;
	vec2 z = p;
	vec2 c = vec2(-0.40 + 0.10 * sin(time * 0.69), -0.09 + 0.16 * cos(time * 1.58));
	float trap = 10.0;
	for(int oi = 0; oi < 18; oi++){
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, length(z));
	}
	float v = exp(-trap * 4.66);
	vec3 col = 0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + v * 2.13 * 2.20 + time * 0.79);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
