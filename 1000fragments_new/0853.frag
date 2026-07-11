uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.96;
	p = rot2(time * 1.21) * p;
	vec2 z = p;
	vec2 c = vec2(-0.75 + 0.12 * sin(time * 0.97), 0.11 + 0.10 * cos(time * 1.50));
	float trap = 10.0;
	for(int oi = 0; oi < 11; oi++){
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, min(abs(z.x), abs(z.y)));
	}
	float v = exp(-trap * 3.08);
	vec3 col = hue(v * 2.69 * 0.69 + time * 0.13);
	col = fract(col * 2.12);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
