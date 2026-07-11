uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.54;
	vec2 z = p;
	vec2 c = vec2(-0.74 + 0.28 * sin(time * 1.41), -0.15 + 0.12 * cos(time * 1.18));
	float trap = 10.0;
	for(int oi = 0; oi < 19; oi++){
		z = abs(z);
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, min(abs(z.x), abs(z.y)));
	}
	float v = exp(-trap * 4.43);
	vec3 col = palette(v * 2.50 * 1.45 + time * 0.37, vec3(0.56, 0.59, 0.47), vec3(0.31, 0.47, 0.45), vec3(1.06, 0.86, 0.92), vec3(0.17, 0.21, 0.63));
	col *= 0.88 + 0.16 * sin(gl_FragCoord.y * 1.61 + time * 16.79);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
