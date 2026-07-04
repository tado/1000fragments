uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.33;
	vec2 z = p;
	vec2 c = vec2(0.10 + 0.12 * sin(time * 0.57), -0.60 + 0.26 * cos(time * 0.40));
	float trap = 10.0;
	for(int oi = 0; oi < 18; oi++){
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, min(abs(z.x), abs(z.y)));
	}
	float v = exp(-trap * 1.56);
	vec3 col = palette(v * 2.29 * 0.46 + time * 0.17, vec3(0.55, 0.40, 0.54), vec3(0.38, 0.47, 0.42), vec3(1.12, 0.72, 1.06), vec3(0.97, 0.19, 0.54));
	col = clamp((col - 0.5) * 1.65 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
