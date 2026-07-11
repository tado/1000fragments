uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.12;
	vec2 z = p;
	vec2 c = vec2(0.28 + 0.18 * sin(time * 1.17), -0.50 + 0.18 * cos(time * 0.53));
	float trap = 10.0;
	for(int oi = 0; oi < 12; oi++){
		z = abs(z);
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, min(abs(z.x), abs(z.y)));
	}
	float v = exp(-trap * 1.73);
	vec3 col = palette(v * 3.17 * 0.40 + time * 0.03, vec3(0.52, 0.41, 0.45), vec3(0.34, 0.49, 0.47), vec3(1.07, 1.26, 1.28), vec3(0.72, 0.74, 0.17));
	col = mod(col * 1.31, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
