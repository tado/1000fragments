uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.79;
	vec2 z = p;
	vec2 c = vec2(-0.53 + 0.24 * sin(time * 1.29), 0.08 + 0.18 * cos(time * 0.69));
	float trap = 10.0;
	for(int oi = 0; oi < 22; oi++){
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, abs(z.x));
	}
	float v = exp(-trap * 3.41);
	vec3 col = palette(v * 2.78 * 0.81 + time * 0.32, vec3(0.59, 0.47, 0.43), vec3(0.42, 0.48, 0.47), vec3(1.25, 0.84, 1.03), vec3(0.62, 0.03, 0.18));
	col = pow(clamp(col, 0.0, 1.0), vec3(1.20));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
