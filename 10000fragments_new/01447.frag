uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.63;
	vec2 z = p;
	vec2 c = vec2(-0.50 + 0.08 * sin(time * 1.00), 0.28 + 0.29 * cos(time * 0.53));
	float trap = 10.0;
	for(int oi = 0; oi < 14; oi++){
		z = abs(z);
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, abs(z.x));
	}
	float v = exp(-trap * 3.96);
	vec3 col = palette(v * 2.49 * 1.27 + time * 0.37, vec3(0.54, 0.42, 0.45), vec3(0.43, 0.43, 0.40), vec3(0.83, 1.06, 0.86), vec3(0.21, 0.34, 0.79));
	vec2 vg = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 1.54 * dot(vg, vg);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
