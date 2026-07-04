uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }


void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.27;
	p = rot2(time * -0.58) * p;
	vec2 gp = p * 6.26;
	vec2 id = floor(gp); vec2 gv = fract(gp) - 0.5;
	float rnd = hash21(id);
	if(rnd < 0.5) gv.x = -gv.x;
	float v = sin((gv.x + gv.y) * 13.61 + rnd * 6.2831853 + time * 4.11);
	vec3 col = vec3(0.98, 0.59, 0.65) * (0.22 / (abs(v) + 0.09));
	col = col / (1.0 + col);
	col = mod(col * 1.33, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
