uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.69;
	vec2 gp = p * 5.95;
	vec2 id = floor(gp); vec2 gv = fract(gp) - 0.5;
	float rnd = hash21(id);
	if(rnd < 0.5) gv.x = -gv.x;
	float ad = min(abs(length(gv - vec2(0.5)) - 0.5), abs(length(gv + vec2(0.5)) - 0.5));
	float v = sin(ad * 20.04 - time * 5.15 + rnd * 6.2831853);
	vec3 col = vec3(0.61, 0.77, 0.89) * (0.23 / (abs(v) + 0.05));
	col = col / (1.0 + col);
	col *= 0.61 + 0.37 * hash21(id + 11.0);
	col *= 0.90 + 0.17 * sin(gl_FragCoord.y * 2.11 + time * 7.21);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
