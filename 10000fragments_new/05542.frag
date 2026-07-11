uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.21;
	vec2 z = p;
	vec2 c = vec2(-0.13 + 0.30 * sin(time * 1.45), 0.11 + 0.18 * cos(time * 1.18));
	float trap = 10.0;
	for(int oi = 0; oi < 20; oi++){
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, abs(z.y));
	}
	float v = exp(-trap * 3.60);
	vec3 col = hue(v * 2.41 * 0.54 + time * 0.22);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
