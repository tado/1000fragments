uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.18;
	vec2 z = p;
	vec2 c = vec2(-0.24 + 0.15 * sin(time * 1.46), 0.17 + 0.19 * cos(time * 1.08));
	float trap = 10.0;
	for(int oi = 0; oi < 22; oi++){
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, abs(z.x));
	}
	float v = exp(-trap * 4.29);
	vec3 col = palette(v * 2.20 * 0.98 + time * 0.25, vec3(0.57, 0.50, 0.58), vec3(0.30, 0.42, 0.48), vec3(1.33, 1.05, 0.78), vec3(0.95, 0.01, 0.72));
	vec2 vg = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 1.48 * dot(vg, vg);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
