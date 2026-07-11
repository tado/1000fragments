uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }


void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.47;
	p = rot2(time * 0.76) * p;
	vec2 gp = p * 3.28;
	vec2 id = floor(gp); vec2 gv = fract(gp) - 0.5;
	float rnd = hash21(id);
	float v = sin((length(gv) - 0.28 - 0.15 * sin(time * 2.00 + rnd * 6.2831853)) * 13.73);
	vec3 col = vec3(0.25, 0.36, 0.48) * (0.24 / (abs(v) + 0.09));
	col = col / (1.0 + col);
	col = pow(clamp(col, 0.0, 1.0), vec3(1.32));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
