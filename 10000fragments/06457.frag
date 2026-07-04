uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.72;
	p = rot2(time * 0.84) * p;
	vec2 z = p;
	vec2 c = vec2(-0.44 + 0.16 * sin(time * 1.85), -0.03 + 0.09 * cos(time * 1.43));
	float trap = 10.0;
	for(int oi = 0; oi < 11; oi++){
		z = abs(z);
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, length(z - vec2(0.15, -0.16)));
	}
	float v = exp(-trap * 3.99);
	vec3 col = palette(v * 2.15 * 1.15 + time * 0.29, vec3(0.56, 0.47, 0.42), vec3(0.42, 0.47, 0.42), vec3(1.21, 1.28, 0.98), vec3(0.64, 0.57, 0.42));
	col = mod(col * 1.54, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
