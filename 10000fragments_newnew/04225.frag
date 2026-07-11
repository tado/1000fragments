uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }


void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.67;
	p = rot2(time * -0.95) * p;
	vec2 gp = p * 7.60;
	vec2 id = floor(gp); vec2 gv = fract(gp) - 0.5;
	float rnd = hash21(id);
	if(rnd < 0.5) gv.x = -gv.x;
	float v = sin((gv.x + gv.y) * 8.03 + rnd * 6.2831853 + time * 6.58);
	vec3 col = vec3(0.5 + 0.5 * v) * vec3(0.94, 1.39, 0.53) + vec3(0.13, 0.14, 0.06);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
