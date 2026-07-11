uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.01;
	vec2 z = p;
	vec2 c = vec2(-0.29 + 0.16 * sin(time * 1.03), 0.44 + 0.24 * cos(time * 0.64));
	float trap = 10.0;
	for(int oi = 0; oi < 17; oi++){
		z = abs(z);
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, length(z));
	}
	float v = exp(-trap * 3.58);
	vec3 col = palette(v * 3.51 * 1.08 + time * 0.02, vec3(0.41, 0.59, 0.49), vec3(0.47, 0.36, 0.43), vec3(1.12, 1.32, 0.84), vec3(0.85, 0.47, 0.45));
	col = pow(clamp(col, 0.0, 1.0), vec3(1.91));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
