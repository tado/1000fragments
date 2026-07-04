uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.22;
	vec2 z = p;
	vec2 c = vec2(-0.65 + 0.22 * sin(time * 1.62), -0.17 + 0.26 * cos(time * 0.69));
	float trap = 10.0;
	for(int oi = 0; oi < 12; oi++){
		z = abs(z);
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, abs(z.x));
	}
	float v = exp(-trap * 2.65);
	vec3 col = palette(v * 2.47 * 0.96 + time * 0.14, vec3(0.54, 0.59, 0.44), vec3(0.46, 0.32, 0.47), vec3(1.16, 0.85, 0.72), vec3(0.91, 0.02, 0.81));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
