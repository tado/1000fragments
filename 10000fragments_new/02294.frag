uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.71;
	vec2 z = p;
	vec2 c = vec2(-0.30 + 0.20 * sin(time * 1.69), 0.60 + 0.28 * cos(time * 0.90));
	float trap = 10.0;
	for(int oi = 0; oi < 11; oi++){
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, min(abs(z.x), abs(z.y)));
	}
	float v = exp(-trap * 3.50);
	vec3 col = palette(v * 3.42 * 1.04 + time * 0.09, vec3(0.41, 0.49, 0.56), vec3(0.44, 0.42, 0.48), vec3(0.86, 1.24, 1.29), vec3(0.73, 0.55, 0.14));
	col = mod(col * 2.20, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
