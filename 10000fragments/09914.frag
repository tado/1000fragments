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
	vec2 c = vec2(-0.88 + 0.23 * sin(time * 1.31), -0.10 + 0.06 * cos(time * 1.20));
	float trap = 10.0;
	for(int oi = 0; oi < 21; oi++){
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, min(abs(z.x), abs(z.y)));
	}
	float v = exp(-trap * 4.96);
	vec3 col = hue(v * 2.37 * 0.65 + time * 0.12);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
