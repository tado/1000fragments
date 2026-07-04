uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p = rot2(time * 0.91) * p;
	vec2 gp = p * 7.62;
	vec2 id = floor(gp); vec2 gv = fract(gp) - 0.5;
	float rnd = hash21(id);
	if(rnd < 0.5) gv.x = -gv.x;
	float v = sin((gv.x + gv.y) * 20.92 + rnd * 6.2831853 + time * 2.38);
	vec3 col = vec3(0.89, 0.96, 0.44) * (0.12 / (abs(v) + 0.07));
	col = col / (1.0 + col);
	col *= 0.58 + 0.30 * hash21(id + 11.0);
	col = pow(clamp(col, 0.0, 1.0), vec3(1.52));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
