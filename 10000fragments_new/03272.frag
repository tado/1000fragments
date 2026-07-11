uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.18;
	vec2 z = p;
	vec2 c = vec2(-0.43 + 0.25 * sin(time * 1.83), 0.18 + 0.06 * cos(time * 1.24));
	float trap = 10.0;
	for(int oi = 0; oi < 8; oi++){
		z = abs(z);
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, abs(z.y));
	}
	float v = exp(-trap * 4.10);
	vec3 col = palette(v * 3.99 * 0.58 + time * 0.25, vec3(0.46, 0.50, 0.57), vec3(0.33, 0.46, 0.39), vec3(1.03, 0.72, 1.20), vec3(0.90, 0.44, 0.88));
	vec2 vg = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 1.34 * dot(vg, vg);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
