uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }


void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p = rot2(time * 0.96) * p;
	vec2 gp = p * 5.49;
	vec2 id = floor(gp); vec2 gv = fract(gp) - 0.5;
	float rnd = hash21(id);
	if(rnd < 0.5) gv.x = -gv.x;
	float ad = min(abs(length(gv - vec2(0.5)) - 0.5), abs(length(gv + vec2(0.5)) - 0.5));
	float v = sin(ad * 29.81 - time * 3.50 + rnd * 6.2831853);
	vec3 col = vec3(0.65, 0.78, 0.26) * (0.21 / (abs(v) + 0.04));
	col = col / (1.0 + col);
	col *= 0.55 + 0.38 * hash21(id + 11.0);
	col *= 0.88 + 0.18 * sin(gl_FragCoord.y * 1.39 + time * 7.82);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
