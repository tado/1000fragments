uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.96;
	vec2 z = p;
	vec2 c = vec2(-0.20 + 0.30 * sin(time * 0.57), -0.26 + 0.17 * cos(time * 1.37));
	float trap = 10.0;
	for(int oi = 0; oi < 8; oi++){
		z = abs(z);
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, length(z));
	}
	float v = exp(-trap * 1.70);
	vec3 col = hue(v * 3.84 * 1.11 + time * 0.14);
	col = mod(col * 2.74, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
