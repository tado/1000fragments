uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.20;
	vec2 z = p;
	vec2 c = vec2(-0.34 + 0.10 * sin(time * 0.61), -0.10 + 0.12 * cos(time * 0.87));
	float trap = 10.0;
	for(int oi = 0; oi < 20; oi++){
		z = abs(z);
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, length(z));
	}
	float v = exp(-trap * 1.55);
	vec3 col = palette(v * 2.44 * 1.11 + time * 0.29, vec3(0.50, 0.45, 0.47), vec3(0.32, 0.43, 0.43), vec3(0.73, 1.33, 1.23), vec3(0.80, 0.62, 0.69));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
