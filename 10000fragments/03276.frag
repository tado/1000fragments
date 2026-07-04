uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.03;
	vec2 z = p;
	vec2 c = vec2(-0.14 + 0.20 * sin(time * 1.34), 0.39 + 0.24 * cos(time * 0.49));
	float trap = 10.0;
	for(int oi = 0; oi < 17; oi++){
		z = abs(z);
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, length(z - vec2(-0.49, -0.19)));
	}
	float v = exp(-trap * 4.97);
	vec3 col = palette(v * 3.68 * 0.71 + time * 0.11, vec3(0.44, 0.53, 0.54), vec3(0.41, 0.41, 0.40), vec3(0.77, 1.09, 0.85), vec3(0.83, 0.02, 0.66));
	vec2 vg = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 1.48 * dot(vg, vg);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
