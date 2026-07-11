uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.23;
	p = rot2(time * -0.40) * p;
	vec2 z = p;
	vec2 c = vec2(-0.08 + 0.10 * sin(time * 0.71), 0.09 + 0.08 * cos(time * 1.01));
	float trap = 10.0;
	for(int oi = 0; oi < 20; oi++){
		z = abs(z);
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, length(z - vec2(-0.26, 0.16)));
	}
	float v = exp(-trap * 5.89);
	vec3 col = 0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + v * 1.61 * 3.01 + time * 0.37);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
