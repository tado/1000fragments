uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.45;
	p = rot2(time * -0.89) * p;
	vec2 z = p;
	vec2 c = vec2(-0.12 + 0.18 * sin(time * 1.75), -0.24 + 0.07 * cos(time * 1.18));
	float trap = 10.0;
	for(int oi = 0; oi < 13; oi++){
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, length(z - vec2(0.44, -0.29)));
	}
	float v = exp(-trap * 5.19);
	float cc = clamp(0.5 + 0.5 * v * 1.65, 0.0, 1.0);
	vec3 col = mix(vec3(0.33, 0.12, 0.54), vec3(0.91, 0.63, 0.79), cc);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
