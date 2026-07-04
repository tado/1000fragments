uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }


void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.56;
	p = rot2(time * -1.05) * p;
	vec2 gp = p * 7.49;
	vec2 id = floor(gp); vec2 gv = fract(gp) - 0.5;
	float rnd = hash21(id);
	if(rnd < 0.5) gv.x = -gv.x;
	float ad = min(abs(length(gv - vec2(0.5)) - 0.5), abs(length(gv + vec2(0.5)) - 0.5));
	float v = sin(ad * 21.19 - time * 6.83 + rnd * 6.2831853);
	vec3 col = vec3(0.17, 0.70, 0.19) * (0.17 / (abs(v) + 0.08));
	col = col / (1.0 + col);
	col *= 0.86 + 0.12 * sin(gl_FragCoord.y * 1.34 + time * 13.28);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
