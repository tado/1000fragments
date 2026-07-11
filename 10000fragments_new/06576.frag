uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.12;
	vec2 z = p;
	vec2 c = vec2(-0.89 + 0.06 * sin(time * 1.67), 0.41 + 0.12 * cos(time * 0.73));
	float trap = 10.0;
	for(int oi = 0; oi < 10; oi++){
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, abs(z.x));
	}
	float v = exp(-trap * 5.91);
	vec3 col = palette(v * 1.79 * 0.69 + time * 0.29, vec3(0.42, 0.50, 0.45), vec3(0.40, 0.38, 0.40), vec3(1.37, 1.34, 0.75), vec3(0.73, 0.59, 0.77));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
