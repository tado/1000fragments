uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }


void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.53;
	p = rot2(time * -1.50) * p;
	vec2 gp = p * 3.78;
	vec2 id = floor(gp); vec2 gv = fract(gp) - 0.5;
	float rnd = hash21(id);
	if(rnd < 0.5) gv.x = -gv.x;
	float ad = min(abs(length(gv - vec2(0.5)) - 0.5), abs(length(gv + vec2(0.5)) - 0.5));
	float v = sin(ad * 17.51 - time * 3.92 + rnd * 6.2831853);
	vec3 col = vec3(0.81, 0.19, 0.76) * (0.21 / (abs(v) + 0.03));
	col = col / (1.0 + col);
	col *= 0.66 + 0.43 * hash21(id + 11.0);
	col *= 0.89 + 0.13 * sin(gl_FragCoord.y * 2.53 + time * 16.75);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
