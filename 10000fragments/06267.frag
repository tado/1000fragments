uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }


void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p = rot2(time * 0.38) * p;
	vec2 gp = p * 7.14;
	vec2 id = floor(gp); vec2 gv = fract(gp) - 0.5;
	float rnd = hash21(id);
	float v = sin((length(gv) - 0.19 - 0.13 * sin(time * 1.90 + rnd * 6.2831853)) * 21.45);
	float cc = clamp(0.5 + 0.5 * v, 0.0, 1.0);
	vec3 col = mix(vec3(0.01, 0.20, 0.51), vec3(0.64, 0.77, 0.51), cc);
	col = mod(col * 1.61, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
