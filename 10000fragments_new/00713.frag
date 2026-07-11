uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.11;
	p = rot2(time * 0.49) * p;
	vec2 z = p;
	vec2 c = vec2(-0.20 + 0.06 * sin(time * 1.57), 0.44 + 0.18 * cos(time * 1.17));
	float trap = 10.0;
	for(int oi = 0; oi < 14; oi++){
		z = abs(z);
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, length(z - vec2(0.22, 0.45)));
	}
	float v = exp(-trap * 2.84);
	vec3 col = palette(v * 3.60 * 1.37 + time * 0.02, vec3(0.58, 0.40, 0.41), vec3(0.30, 0.39, 0.45), vec3(1.08, 1.17, 1.14), vec3(0.68, 0.89, 0.95));
	col = pow(clamp(col, 0.0, 1.0), vec3(0.85));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
