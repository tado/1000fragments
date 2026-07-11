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
	vec2 c = vec2(-0.22 + 0.14 * sin(time * 1.66), 0.49 + 0.14 * cos(time * 1.29));
	float trap = 10.0;
	for(int oi = 0; oi < 14; oi++){
		z = abs(z);
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, abs(z.x));
	}
	float v = exp(-trap * 4.88);
	vec3 col = palette(v * 2.51 * 1.43 + time * 0.24, vec3(0.56, 0.58, 0.41), vec3(0.39, 0.47, 0.36), vec3(0.94, 0.75, 1.23), vec3(0.24, 0.84, 0.16));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
