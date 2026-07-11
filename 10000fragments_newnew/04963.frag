uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.16;
	vec2 z = p;
	vec2 c = vec2(-0.87 + 0.21 * sin(time * 0.58), -0.21 + 0.08 * cos(time * 0.85));
	float trap = 10.0;
	for(int oi = 0; oi < 23; oi++){
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, abs(z.y));
	}
	float v = exp(-trap * 2.37);
	vec3 col = palette(v * 3.47 * 0.98 + time * 0.38, vec3(0.50, 0.42, 0.60), vec3(0.35, 0.38, 0.44), vec3(1.06, 0.92, 0.75), vec3(0.14, 0.87, 0.57));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
