uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.12;
	vec2 z = p;
	vec2 c = vec2(-0.65 + 0.29 * sin(time * 0.62), -0.37 + 0.28 * cos(time * 0.55));
	float trap = 10.0;
	for(int oi = 0; oi < 15; oi++){
		z = abs(z);
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, abs(z.x));
	}
	float v = exp(-trap * 3.36);
	vec3 col = palette(v * 2.36 * 1.46 + time * 0.01, vec3(0.51, 0.52, 0.59), vec3(0.44, 0.46, 0.49), vec3(1.07, 0.85, 0.87), vec3(0.87, 0.07, 0.17));
	col = clamp((col - 0.5) * 1.31 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
