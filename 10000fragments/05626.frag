uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.07;
	p = rot2(time * -1.47) * p;
	vec2 z = p;
	vec2 c = vec2(-0.29 + 0.29 * sin(time * 1.19), 0.09 + 0.09 * cos(time * 0.76));
	float trap = 10.0;
	for(int oi = 0; oi < 11; oi++){
		z = abs(z);
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, min(abs(z.x), abs(z.y)));
	}
	float v = exp(-trap * 4.21);
	vec3 col = palette(v * 3.26 * 0.94 + time * 0.34, vec3(0.48, 0.50, 0.41), vec3(0.48, 0.45, 0.48), vec3(0.95, 0.79, 0.73), vec3(0.53, 0.70, 0.34));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
