uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.08;
	vec2 z = p;
	vec2 c = vec2(0.07 + 0.26 * sin(time * 1.99), 0.35 + 0.19 * cos(time * 1.54));
	float trap = 10.0;
	for(int oi = 0; oi < 23; oi++){
		z = abs(z);
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, length(z - vec2(0.08, 0.49)));
	}
	float v = exp(-trap * 4.44);
	vec3 col = hue(v * 2.62 * 0.86 + time * 0.05);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
