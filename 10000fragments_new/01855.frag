uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.59;
	p = rot2(time * 0.95) * p;
	vec2 z = p;
	vec2 c = vec2(-0.37 + 0.12 * sin(time * 0.67), -0.45 + 0.28 * cos(time * 1.39));
	float trap = 10.0;
	for(int oi = 0; oi < 22; oi++){
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, length(z - vec2(-0.37, -0.26)));
	}
	float v = exp(-trap * 3.84);
	vec3 col = palette(v * 2.54 * 1.03 + time * 0.39, vec3(0.45, 0.44, 0.47), vec3(0.36, 0.41, 0.32), vec3(1.12, 0.97, 1.07), vec3(0.94, 0.72, 0.86));
	vec2 vg = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 1.72 * dot(vg, vg);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
