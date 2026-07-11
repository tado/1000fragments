uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.56;
	vec2 z = p;
	vec2 c = vec2(0.24 + 0.23 * sin(time * 1.85), -0.40 + 0.11 * cos(time * 0.91));
	float trap = 10.0;
	for(int oi = 0; oi < 14; oi++){
		z = abs(z);
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, length(z - vec2(-0.10, -0.28)));
	}
	float v = exp(-trap * 2.83);
	vec3 col = hue(v * 3.11 * 1.43 + time * 0.19);
	col *= 0.88 + 0.19 * sin(gl_FragCoord.y * 2.63 + time * 12.57);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
