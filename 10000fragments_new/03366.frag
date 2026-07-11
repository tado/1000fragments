uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.38;
	vec2 z = p;
	vec2 c = vec2(-0.32 + 0.22 * sin(time * 1.62), -0.13 + 0.26 * cos(time * 1.14));
	float trap = 10.0;
	for(int oi = 0; oi < 8; oi++){
		z = abs(z);
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, abs(z.y));
	}
	float v = exp(-trap * 4.23);
	vec3 col = hue(v * 1.52 * 1.49 + time * 0.35);
	col *= 0.86 + 0.10 * sin(gl_FragCoord.y * 1.33 + time * 9.67);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
