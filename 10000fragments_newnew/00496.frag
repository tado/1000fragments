uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.73;
	vec2 z = p;
	vec2 c = vec2(0.29 + 0.13 * sin(time * 1.50), 0.53 + 0.22 * cos(time * 0.90));
	float trap = 10.0;
	for(int oi = 0; oi < 17; oi++){
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, length(z));
	}
	float v = exp(-trap * 2.74);
	vec3 col = palette(v * 3.97 * 1.49 + time * 0.06, vec3(0.56, 0.47, 0.55), vec3(0.42, 0.39, 0.34), vec3(1.05, 1.29, 1.34), vec3(0.44, 0.19, 0.33));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
