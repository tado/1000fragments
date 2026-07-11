uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.05;
	vec2 z = p;
	vec2 c = vec2(-0.22 + 0.14 * sin(time * 0.77), 0.39 + 0.15 * cos(time * 1.55));
	float trap = 10.0;
	for(int oi = 0; oi < 19; oi++){
		z = abs(z);
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, abs(z.x));
	}
	float v = exp(-trap * 5.84);
	vec3 col = palette(v * 2.66 * 0.72 + time * 0.38, vec3(0.41, 0.47, 0.42), vec3(0.30, 0.47, 0.34), vec3(0.80, 0.86, 1.28), vec3(0.87, 0.75, 0.01));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
