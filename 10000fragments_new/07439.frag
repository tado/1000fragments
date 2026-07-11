uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.06;
	vec2 z = p;
	vec2 c = vec2(-0.72 + 0.06 * sin(time * 0.77), -0.47 + 0.19 * cos(time * 0.94));
	float trap = 10.0;
	for(int oi = 0; oi < 15; oi++){
		z = abs(z);
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, abs(z.x));
	}
	float v = exp(-trap * 3.30);
	vec3 col = palette(v * 3.73 * 0.81 + time * 0.08, vec3(0.60, 0.46, 0.54), vec3(0.50, 0.48, 0.39), vec3(1.13, 1.03, 1.28), vec3(0.63, 0.38, 0.29));
	col = floor(clamp(col, 0.0, 1.0) * 6.0) / 6.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
