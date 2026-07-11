uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.89;
	p = rot2(time * -0.42) * p;
	vec2 z = p;
	vec2 c = vec2(-0.37 + 0.19 * sin(time * 0.89), -0.33 + 0.08 * cos(time * 0.89));
	float trap = 10.0;
	for(int oi = 0; oi < 16; oi++){
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, min(abs(z.x), abs(z.y)));
	}
	float v = exp(-trap * 2.63);
	vec3 col = hue(v * 2.84 * 1.23 + time * 0.05);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
