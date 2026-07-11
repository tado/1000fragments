uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p = rot2(time * 0.94) * p;
	vec2 gp = p * 4.16;
	vec2 id = floor(gp); vec2 gv = fract(gp) - 0.5;
	float rnd = hash21(id);
	if(rnd < 0.5) gv.x = -gv.x;
	float v = sin((gv.x + gv.y) * 8.77 + rnd * 6.2831853 + time * 4.37);
	vec3 col = vec3(0.5 + 0.5 * v) * vec3(1.09, 1.00, 0.80) + vec3(0.13, 0.14, 0.22);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
