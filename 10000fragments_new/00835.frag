uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.86;
	vec2 z = p;
	vec2 c = vec2(-0.41 + 0.15 * sin(time * 1.98), -0.37 + 0.17 * cos(time * 1.27));
	float trap = 10.0;
	for(int oi = 0; oi < 8; oi++){
		z = abs(z);
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, abs(z.x));
	}
	float v = exp(-trap * 4.04);
	vec3 col = palette(v * 2.25 * 0.76 + time * 0.36, vec3(0.53, 0.54, 0.42), vec3(0.47, 0.32, 0.42), vec3(0.82, 1.01, 1.28), vec3(0.38, 0.50, 0.24));
	vec2 vg = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 1.65 * dot(vg, vg);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
