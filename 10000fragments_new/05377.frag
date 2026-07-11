uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.84;
	vec2 z = p;
	vec2 c = vec2(0.24 + 0.25 * sin(time * 1.08), -0.51 + 0.05 * cos(time * 0.73));
	float trap = 10.0;
	for(int oi = 0; oi < 21; oi++){
		z = abs(z);
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, abs(z.y));
	}
	float v = exp(-trap * 2.72);
	vec3 col = palette(v * 2.67 * 0.83 + time * 0.22, vec3(0.50, 0.46, 0.57), vec3(0.39, 0.34, 0.38), vec3(1.17, 1.00, 1.27), vec3(0.41, 0.01, 0.49));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
