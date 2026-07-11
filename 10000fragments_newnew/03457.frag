uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }


void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.33;
	vec2 gp = p * 2.97;
	vec2 id = floor(gp); vec2 gv = fract(gp) - 0.5;
	float rnd = hash21(id);
	float v = sin((length(gv) - 0.16 - 0.16 * sin(time * 4.72 + rnd * 6.2831853)) * 21.00);
	vec3 col = vec3(0.51, 0.62, 0.33) * (0.08 / (abs(v) + 0.03));
	col = col / (1.0 + col);
	col *= 0.50 + 0.43 * hash21(id + 11.0);
	col *= 0.86 + 0.14 * sin(gl_FragCoord.y * 1.14 + time * 7.79);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
