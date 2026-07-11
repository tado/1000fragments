uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.07;
	vec2 z = p;
	vec2 c = vec2(-0.53 + 0.27 * sin(time * 1.56), -0.55 + 0.07 * cos(time * 1.13));
	float trap = 10.0;
	for(int oi = 0; oi < 12; oi++){
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, length(z));
	}
	float v = exp(-trap * 4.88);
	vec3 col = palette(v * 2.61 * 1.38 + time * 0.09, vec3(0.60, 0.45, 0.47), vec3(0.44, 0.50, 0.44), vec3(1.35, 0.92, 1.25), vec3(0.25, 0.98, 0.95));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
