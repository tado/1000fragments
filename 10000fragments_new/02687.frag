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
	vec2 c = vec2(-0.43 + 0.27 * sin(time * 0.94), -0.10 + 0.26 * cos(time * 1.21));
	float trap = 10.0;
	for(int oi = 0; oi < 22; oi++){
		z = abs(z);
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, length(z - vec2(0.14, 0.10)));
	}
	float v = exp(-trap * 2.60);
	vec3 col = palette(v * 3.77 * 1.08 + time * 0.02, vec3(0.51, 0.50, 0.59), vec3(0.47, 0.43, 0.47), vec3(0.83, 0.80, 0.71), vec3(0.45, 0.41, 0.41));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
