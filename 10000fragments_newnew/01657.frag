uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.17;
	p = rot2(time * -0.64) * p;
	vec2 z = p;
	vec2 c = vec2(-0.31 + 0.30 * sin(time * 1.86), -0.09 + 0.28 * cos(time * 0.78));
	float trap = 10.0;
	for(int oi = 0; oi < 19; oi++){
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, length(z - vec2(0.31, -0.24)));
	}
	float v = exp(-trap * 3.87);
	vec3 col = palette(v * 3.24 * 0.98 + time * 0.25, vec3(0.58, 0.43, 0.52), vec3(0.33, 0.31, 0.48), vec3(0.96, 1.23, 0.70), vec3(0.07, 0.17, 0.76));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
