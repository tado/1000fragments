uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.85;
	vec2 z = p;
	vec2 c = vec2(-0.39 + 0.17 * sin(time * 0.67), -0.57 + 0.09 * cos(time * 1.44));
	float trap = 10.0;
	for(int oi = 0; oi < 9; oi++){
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, abs(z.y));
	}
	float v = exp(-trap * 2.89);
	vec3 col = palette(v * 1.84 * 1.10 + time * 0.32, vec3(0.60, 0.55, 0.59), vec3(0.48, 0.39, 0.36), vec3(1.02, 1.37, 0.99), vec3(0.32, 0.23, 0.36));
	col = pow(clamp(col, 0.0, 1.0), vec3(1.73));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
