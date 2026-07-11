uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.10;
	p = rot2(time * 1.47) * p;
	vec2 z = p;
	vec2 c = vec2(-0.21 + 0.10 * sin(time * 0.84), 0.54 + 0.22 * cos(time * 0.48));
	float trap = 10.0;
	for(int oi = 0; oi < 14; oi++){
		z = abs(z);
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, length(z - vec2(-0.15, 0.46)));
	}
	float v = exp(-trap * 2.65);
	vec3 col = palette(v * 3.67 * 1.28 + time * 0.29, vec3(0.42, 0.54, 0.58), vec3(0.44, 0.37, 0.42), vec3(0.95, 1.12, 0.94), vec3(0.80, 0.60, 0.21));
	vec2 vg = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.90 * dot(vg, vg);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
