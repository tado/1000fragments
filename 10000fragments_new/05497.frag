uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.07;
	p = rot2(time * 0.53) * p;
	vec2 z = p;
	vec2 c = vec2(-0.34 + 0.12 * sin(time * 1.79), 0.01 + 0.11 * cos(time * 1.02));
	float trap = 10.0;
	for(int oi = 0; oi < 22; oi++){
		z = abs(z);
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, abs(z.x));
	}
	float v = exp(-trap * 3.83);
	vec3 col = hue(v * 2.29 * 0.48 + time * 0.35);
	col = mod(col * 1.68, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
