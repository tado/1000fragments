uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.13;
	p = rot2(time * 1.51) * p;
	vec2 z = p;
	vec2 c = vec2(-0.69 + 0.09 * sin(time * 1.23), -0.30 + 0.18 * cos(time * 1.06));
	float trap = 10.0;
	for(int oi = 0; oi < 21; oi++){
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, min(abs(z.x), abs(z.y)));
	}
	float v = exp(-trap * 4.65);
	vec3 col = palette(v * 2.10 * 0.69 + time * 0.02, vec3(0.44, 0.48, 0.56), vec3(0.35, 0.46, 0.38), vec3(0.92, 0.81, 0.97), vec3(0.77, 0.28, 0.56));
	col = fract(col * 1.62);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
