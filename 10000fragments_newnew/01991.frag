uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.07;
	vec2 z = p;
	vec2 c = vec2(-0.34 + 0.15 * sin(time * 1.81), 0.07 + 0.20 * cos(time * 0.92));
	float trap = 10.0;
	for(int oi = 0; oi < 16; oi++){
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, length(z - vec2(0.38, 0.38)));
	}
	float v = exp(-trap * 4.10);
	vec3 col = hue(v * 3.24 * 0.52 + time * 0.19);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
