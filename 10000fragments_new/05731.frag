uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.91;
	vec2 z = p;
	vec2 c = vec2(-0.75 + 0.16 * sin(time * 1.28), -0.49 + 0.11 * cos(time * 0.72));
	float trap = 10.0;
	for(int oi = 0; oi < 18; oi++){
		z = abs(z);
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, abs(z.x));
	}
	float v = exp(-trap * 5.20);
	vec3 col = palette(v * 3.19 * 0.70 + time * 0.38, vec3(0.47, 0.59, 0.42), vec3(0.34, 0.31, 0.49), vec3(0.72, 1.26, 1.36), vec3(0.98, 0.33, 0.37));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
