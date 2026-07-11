uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.15;
	p = rot2(time * 0.38) * p;
	vec2 z = p;
	vec2 c = vec2(-0.39 + 0.09 * sin(time * 1.75), 0.43 + 0.10 * cos(time * 1.57));
	float trap = 10.0;
	for(int oi = 0; oi < 23; oi++){
		z = abs(z);
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, length(z - vec2(-0.00, -0.19)));
	}
	float v = exp(-trap * 5.28);
	vec3 col = palette(v * 3.06 * 1.35 + time * 0.35, vec3(0.58, 0.54, 0.51), vec3(0.47, 0.44, 0.45), vec3(1.06, 1.33, 0.95), vec3(0.76, 0.69, 0.99));
	col = mod(col * 2.06, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
