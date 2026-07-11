uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.23;
	p = rot2(time * -1.07) * p;
	vec2 z = p;
	vec2 c = vec2(-0.35 + 0.12 * sin(time * 1.12), 0.12 + 0.19 * cos(time * 1.15));
	float trap = 10.0;
	for(int oi = 0; oi < 14; oi++){
		z = abs(z);
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, length(z));
	}
	float v = exp(-trap * 3.96);
	vec3 col = palette(v * 2.91 * 0.83 + time * 0.21, vec3(0.42, 0.53, 0.48), vec3(0.33, 0.37, 0.37), vec3(1.01, 1.21, 0.87), vec3(0.38, 0.74, 0.26));
	col = fract(col * 1.26);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
