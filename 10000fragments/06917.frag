uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p = rot2(time * 1.13) * p;
	vec2 gp = p * 2.38;
	vec2 id = floor(gp); vec2 gv = fract(gp) - 0.5;
	float rnd = hash21(id);
	if(rnd < 0.5) gv.x = -gv.x;
	float v = sin((gv.x + gv.y) * 10.35 + rnd * 6.2831853 + time * 6.77);
	vec3 col = 0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + v * 2.47 + time * 0.52);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
