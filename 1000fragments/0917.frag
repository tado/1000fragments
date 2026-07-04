uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.92;
	vec2 z = p;
	vec2 c = vec2(-0.40 + 0.16 * sin(time * 1.64), 0.42 + 0.27 * cos(time * 0.72));
	float trap = 10.0;
	for(int oi = 0; oi < 10; oi++){
		z = abs(z);
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, length(z));
	}
	float v = exp(-trap * 2.11);
	vec3 col = hue(v * 3.51 * 0.65 + time * 0.36);
	col *= 0.87 + 0.11 * sin(gl_FragCoord.y * 2.39 + time * 17.34);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
