uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.15;
	vec2 z = p;
	vec2 c = vec2(-0.83 + 0.26 * sin(time * 0.93), 0.23 + 0.20 * cos(time * 1.21));
	float trap = 10.0;
	for(int oi = 0; oi < 21; oi++){
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, length(z));
	}
	float v = exp(-trap * 4.87);
	vec3 col = palette(v * 3.77 * 1.04 + time * 0.04, vec3(0.58, 0.45, 0.46), vec3(0.50, 0.31, 0.43), vec3(0.86, 1.06, 0.78), vec3(0.45, 0.83, 0.25));
	vec2 vg = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 1.09 * dot(vg, vg);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
