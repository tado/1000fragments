uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }


void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p = rot2((time * 0.79) * -0.59) * p;
	vec2 gp = p * 2.16;
	vec2 id = floor(gp); vec2 gv = fract(gp) - 0.5;
	float rnd = hash21(id);
	if(rnd < 0.5) gv.x = -gv.x;
	float v = sin((gv.x + gv.y) * 21.67 + rnd * 6.2831853 + (time * 0.79) * 5.85);
	vec3 col = vec3(0.5 + 0.5 * (v)) * vec3(0.44, 0.53, 0.45) + vec3(0.05, 0.01, 0.03);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.42);
	col = clamp(col, 0.0, 1.0) * vec3(1.004, 0.978, 1.009) * 1.00 + 0.018;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
