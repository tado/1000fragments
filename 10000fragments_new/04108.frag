uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.16;
	vec2 z = p;
	vec2 c = vec2(-0.37 + 0.13 * sin(time * 0.64), 0.13 + 0.28 * cos(time * 1.44));
	float trap = 10.0;
	for(int oi = 0; oi < 24; oi++){
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, abs(z.x));
	}
	float v = exp(-trap * 4.05);
	vec3 col = hue(v * 2.36 * 0.52 + time * 0.35);
	col *= 0.89 + 0.18 * sin(gl_FragCoord.y * 1.65 + time * 8.86);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
