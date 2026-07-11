uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.05;
	p = rot2(time * 0.56) * p;
	vec2 z = p;
	vec2 c = vec2(-0.06 + 0.10 * sin(time * 0.69), -0.54 + 0.08 * cos(time * 0.68));
	float trap = 10.0;
	for(int oi = 0; oi < 20; oi++){
		z = abs(z);
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, abs(z.x));
	}
	float v = exp(-trap * 3.04);
	vec3 col = palette(v * 1.88 * 1.14 + time * 0.25, vec3(0.53, 0.45, 0.46), vec3(0.36, 0.34, 0.40), vec3(1.39, 0.92, 1.26), vec3(0.42, 0.11, 0.41));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
