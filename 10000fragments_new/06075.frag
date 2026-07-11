uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.15;
	vec2 z = p;
	vec2 c = vec2(-0.49 + 0.20 * sin(time * 1.03), 0.49 + 0.27 * cos(time * 1.55));
	float trap = 10.0;
	for(int oi = 0; oi < 18; oi++){
		z = abs(z);
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, length(z - vec2(0.07, 0.03)));
	}
	float v = exp(-trap * 4.94);
	vec3 col = palette(v * 3.51 * 1.44 + time * 0.40, vec3(0.60, 0.53, 0.47), vec3(0.36, 0.44, 0.36), vec3(0.79, 1.07, 0.79), vec3(0.98, 0.12, 0.43));
	col = clamp((col - 0.5) * 1.99 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
