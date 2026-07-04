uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.62;
	vec2 z = p;
	vec2 c = vec2(0.19 + 0.06 * sin(time * 0.59), -0.40 + 0.30 * cos(time * 0.62));
	float trap = 10.0;
	for(int oi = 0; oi < 13; oi++){
		z = abs(z);
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, abs(z.y));
	}
	float v = exp(-trap * 2.40);
	vec3 col = palette(v * 1.73 * 0.50 + time * 0.13, vec3(0.59, 0.46, 0.45), vec3(0.45, 0.34, 0.49), vec3(0.75, 0.86, 1.30), vec3(0.12, 0.79, 0.78));
	col *= 0.88 + 0.14 * sin(gl_FragCoord.y * 1.61 + time * 4.44);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
