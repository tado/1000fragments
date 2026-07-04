uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.05;
	p = rot2(time * -1.08) * p;
	vec2 z = p;
	vec2 c = vec2(-0.07 + 0.27 * sin(time * 1.85), -0.44 + 0.18 * cos(time * 0.85));
	float trap = 10.0;
	for(int oi = 0; oi < 20; oi++){
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, abs(z.x));
	}
	float v = exp(-trap * 1.71);
	vec3 col = hue(v * 2.90 * 0.66 + time * 0.11);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
