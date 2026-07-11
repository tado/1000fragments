uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }


void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 0.95;
	vec2 gp = p * 3.87;
	vec2 id = floor(gp); vec2 gv = fract(gp) - 0.5;
	float rnd = hash21(id);
	float v = sin((length(gv) - 0.16 - 0.09 * sin(time * 2.56 + rnd * 6.2831853)) * 10.53);
	vec3 col = vec3(0.74, 0.40, 0.93) * (0.23 / (abs(v) + 0.07));
	col = col / (1.0 + col);
	col *= 0.88 + 0.17 * sin(gl_FragCoord.y * 1.94 + time * 17.79);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
