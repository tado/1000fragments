uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.68;
	p = rot2(time * -0.90) * p;
	vec2 z = p;
	vec2 c = vec2(-0.74 + 0.25 * sin(time * 0.53), -0.26 + 0.13 * cos(time * 0.71));
	float trap = 10.0;
	for(int oi = 0; oi < 19; oi++){
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, length(z - vec2(-0.42, 0.30)));
	}
	float v = exp(-trap * 4.27);
	vec3 col = 0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + v * 3.47 * 4.95 + time * 0.74);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
