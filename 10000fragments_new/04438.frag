uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.55;
	vec2 z = p;
	vec2 c = vec2(0.24 + 0.18 * sin(time * 1.70), 0.35 + 0.24 * cos(time * 1.35));
	float trap = 10.0;
	for(int oi = 0; oi < 11; oi++){
		z = abs(z);
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, length(z));
	}
	float v = exp(-trap * 5.15);
	vec3 col = palette(v * 3.99 * 1.15 + time * 0.14, vec3(0.55, 0.49, 0.43), vec3(0.30, 0.45, 0.41), vec3(1.07, 1.05, 1.25), vec3(0.56, 0.98, 0.36));
	col = pow(clamp(col, 0.0, 1.0), vec3(1.16));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
