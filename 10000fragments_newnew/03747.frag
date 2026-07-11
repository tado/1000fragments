uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.36;
	p = rot2(time * 1.18) * p;
	vec2 z = p;
	vec2 c = vec2(-0.12 + 0.09 * sin(time * 0.52), 0.27 + 0.13 * cos(time * 0.46));
	float trap = 10.0;
	for(int oi = 0; oi < 16; oi++){
		z = abs(z);
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, abs(z.x));
	}
	float v = exp(-trap * 3.63);
	vec3 col = hue(v * 2.92 * 0.48 + time * 0.10);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
