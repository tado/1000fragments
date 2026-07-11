uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.45;
	vec2 z = p;
	vec2 c = vec2(0.07 + 0.16 * sin(time * 1.92), -0.09 + 0.07 * cos(time * 0.66));
	float trap = 10.0;
	for(int oi = 0; oi < 17; oi++){
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, abs(z.y));
	}
	float v = exp(-trap * 4.30);
	vec3 col = palette(v * 3.28 * 1.10 + time * 0.29, vec3(0.57, 0.41, 0.50), vec3(0.34, 0.39, 0.41), vec3(1.33, 0.83, 0.72), vec3(0.94, 0.54, 0.17));
	col = pow(clamp(col, 0.0, 1.0), vec3(0.92));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
