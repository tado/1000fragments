uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.00;
	vec2 z = p;
	vec2 c = vec2(0.05 + 0.08 * sin(time * 1.04), -0.41 + 0.26 * cos(time * 1.17));
	float trap = 10.0;
	for(int oi = 0; oi < 19; oi++){
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, abs(z.x));
	}
	float v = exp(-trap * 5.42);
	vec3 col = palette(v * 3.28 * 0.69 + time * 0.26, vec3(0.50, 0.44, 0.57), vec3(0.37, 0.36, 0.43), vec3(0.72, 1.25, 1.35), vec3(0.18, 0.80, 0.93));
	col = mod(col * 2.48, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
