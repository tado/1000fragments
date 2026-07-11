uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.57;
	vec2 z = p;
	vec2 c = vec2(-0.56 + 0.08 * sin(time * 0.88), -0.30 + 0.24 * cos(time * 1.52));
	float trap = 10.0;
	for(int oi = 0; oi < 21; oi++){
		z = abs(z);
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, abs(z.y));
	}
	float v = exp(-trap * 5.71);
	vec3 col = palette(v * 2.21 * 1.26 + time * 0.25, vec3(0.45, 0.44, 0.54), vec3(0.44, 0.49, 0.50), vec3(1.33, 1.09, 1.32), vec3(0.78, 0.64, 0.95));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
