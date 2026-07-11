uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.27;
	vec2 z = p;
	vec2 c = vec2(-0.73 + 0.30 * sin(time * 1.07), 0.50 + 0.16 * cos(time * 0.88));
	float trap = 10.0;
	for(int oi = 0; oi < 9; oi++){
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, abs(z.y));
	}
	float v = exp(-trap * 2.37);
	vec3 col = palette(v * 1.97 * 1.12 + time * 0.12, vec3(0.45, 0.56, 0.54), vec3(0.40, 0.32, 0.39), vec3(1.36, 1.03, 1.12), vec3(0.69, 0.04, 0.69));
	col = pow(clamp(col, 0.0, 1.0), vec3(1.01));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
