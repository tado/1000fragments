uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }


void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.08;
	p = rot2(time * 1.15) * p;
	vec2 gp = p * 7.50;
	vec2 id = floor(gp); vec2 gv = fract(gp) - 0.5;
	float rnd = hash21(id);
	if(rnd < 0.5) gv.x = -gv.x;
	float ad = min(abs(length(gv - vec2(0.5)) - 0.5), abs(length(gv + vec2(0.5)) - 0.5));
	float v = sin(ad * 24.17 - time * 3.56 + rnd * 6.2831853);
	vec3 col = vec3(0.77, 0.32, 0.61) * (0.23 / (abs(v) + 0.04));
	col = col / (1.0 + col);
	col *= 0.65 + 0.44 * hash21(id + 11.0);
	col = mod(col * 2.02, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
