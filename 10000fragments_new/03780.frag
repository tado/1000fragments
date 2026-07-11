uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.72;
	p = rot2(time * -0.54) * p;
	vec2 z = p;
	vec2 c = vec2(-0.74 + 0.16 * sin(time * 1.97), -0.60 + 0.10 * cos(time * 1.38));
	float trap = 10.0;
	for(int oi = 0; oi < 19; oi++){
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, length(z));
	}
	float v = exp(-trap * 5.73);
	float cc = clamp(0.5 + 0.5 * v * 2.42, 0.0, 1.0);
	vec3 col = mix(vec3(0.30, 0.21, 0.34), vec3(0.81, 0.95, 0.91), cc);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
