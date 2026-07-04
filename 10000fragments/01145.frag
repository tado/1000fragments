uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.00;
	p = rot2(time * -1.43) * p;
	vec2 z = p;
	vec2 c = vec2(0.01 + 0.08 * sin(time * 1.92), -0.43 + 0.21 * cos(time * 1.21));
	float trap = 10.0;
	for(int oi = 0; oi < 8; oi++){
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, length(z - vec2(0.29, -0.28)));
	}
	float v = exp(-trap * 3.48);
	vec3 col = palette(v * 1.62 * 0.43 + time * 0.12, vec3(0.53, 0.41, 0.44), vec3(0.41, 0.42, 0.36), vec3(1.25, 1.04, 0.82), vec3(0.90, 0.04, 0.70));
	vec2 vg = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 1.50 * dot(vg, vg);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
