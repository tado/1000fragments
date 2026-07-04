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
	vec2 c = vec2(-0.14 + 0.14 * sin(time * 1.90), -0.25 + 0.15 * cos(time * 0.91));
	float trap = 10.0;
	for(int oi = 0; oi < 8; oi++){
		z = abs(z);
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, abs(z.y));
	}
	float v = exp(-trap * 4.74);
	vec3 col = palette(v * 1.99 * 0.49 + time * 0.27, vec3(0.56, 0.56, 0.52), vec3(0.35, 0.42, 0.40), vec3(0.72, 1.16, 0.79), vec3(0.90, 0.21, 0.52));
	col *= 0.86 + 0.20 * sin(gl_FragCoord.y * 2.64 + time * 12.23);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
