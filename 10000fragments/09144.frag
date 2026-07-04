uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.32;
	vec2 z = p;
	vec2 c = vec2(-0.40 + 0.15 * sin(time * 1.28), 0.55 + 0.12 * cos(time * 0.76));
	float trap = 10.0;
	for(int oi = 0; oi < 16; oi++){
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, abs(z.y));
	}
	float v = exp(-trap * 3.89);
	vec3 col = palette(v * 2.85 * 1.43 + time * 0.19, vec3(0.48, 0.48, 0.56), vec3(0.35, 0.41, 0.43), vec3(0.74, 0.92, 1.08), vec3(0.96, 0.75, 0.42));
	col = pow(clamp(col, 0.0, 1.0), vec3(1.38));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
