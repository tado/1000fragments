uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.93;
	p = rot2(time * -0.68) * p;
	vec2 z = p;
	vec2 c = vec2(-0.50 + 0.11 * sin(time * 1.55), -0.20 + 0.17 * cos(time * 1.17));
	float trap = 10.0;
	for(int oi = 0; oi < 12; oi++){
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, length(z));
	}
	float v = exp(-trap * 4.33);
	vec3 col = palette(v * 2.24 * 1.35 + time * 0.08, vec3(0.49, 0.52, 0.48), vec3(0.44, 0.42, 0.41), vec3(1.06, 1.14, 0.74), vec3(0.10, 0.54, 0.32));
	col = fract(col * 1.00);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
