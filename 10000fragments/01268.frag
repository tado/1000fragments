uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.68;
	p = rot2(time * 1.39) * p;
	vec2 z = p;
	vec2 c = vec2(-0.72 + 0.14 * sin(time * 1.75), -0.17 + 0.11 * cos(time * 1.34));
	float trap = 10.0;
	for(int oi = 0; oi < 10; oi++){
		z = abs(z);
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, abs(z.y));
	}
	float v = exp(-trap * 3.34);
	vec3 col = palette(v * 2.31 * 0.69 + time * 0.28, vec3(0.46, 0.48, 0.54), vec3(0.45, 0.41, 0.43), vec3(1.25, 0.87, 0.74), vec3(0.10, 0.23, 0.01));
	vec2 vg = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 1.03 * dot(vg, vg);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
