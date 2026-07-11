uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.95;
	p = rot2(time * -0.80) * p;
	vec2 z = p;
	vec2 c = vec2(-0.16 + 0.21 * sin(time * 1.77), -0.07 + 0.11 * cos(time * 0.74));
	float trap = 10.0;
	for(int oi = 0; oi < 24; oi++){
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, length(z));
	}
	float v = exp(-trap * 5.15);
	vec3 col = hue(v * 1.52 * 1.47 + time * 0.04);
	col *= 0.84 + 0.11 * sin(gl_FragCoord.y * 0.88 + time * 16.72);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
