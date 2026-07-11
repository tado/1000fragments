uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.13;
	vec2 z = p;
	vec2 c = vec2(-0.34 + 0.16 * sin(time * 1.39), -0.36 + 0.28 * cos(time * 0.63));
	float trap = 10.0;
	for(int oi = 0; oi < 22; oi++){
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, abs(z.y));
	}
	float v = exp(-trap * 5.85);
	vec3 col = palette(v * 1.53 * 0.73 + time * 0.30, vec3(0.44, 0.56, 0.58), vec3(0.43, 0.46, 0.44), vec3(0.71, 1.01, 1.01), vec3(0.90, 0.34, 0.24));
	col = pow(clamp(col, 0.0, 1.0), vec3(1.48));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
