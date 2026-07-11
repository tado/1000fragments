uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.95;
	vec2 z = p;
	vec2 c = vec2(-0.05 + 0.30 * sin(time * 0.65), -0.14 + 0.12 * cos(time * 0.97));
	float trap = 10.0;
	for(int oi = 0; oi < 22; oi++){
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, abs(z.x));
	}
	float v = exp(-trap * 1.99);
	vec3 col = palette(v * 2.57 * 1.24 + time * 0.16, vec3(0.56, 0.54, 0.42), vec3(0.48, 0.46, 0.37), vec3(1.17, 1.17, 0.96), vec3(0.97, 0.29, 0.49));
	col = clamp((col - 0.5) * 2.02 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
