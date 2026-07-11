uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }


void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 0.96;
	vec2 gp = p * 3.85;
	vec2 id = floor(gp); vec2 gv = fract(gp) - 0.5;
	float rnd = hash21(id);
	if(rnd < 0.5) gv.x = -gv.x;
	float ad = min(abs(length(gv - vec2(0.5)) - 0.5), abs(length(gv + vec2(0.5)) - 0.5));
	float v = sin(ad * 19.00 - time * 7.83 + rnd * 6.2831853);
	vec3 col = vec3(0.67, 0.85, 0.39) * (0.17 / (abs(v) + 0.08));
	col = col / (1.0 + col);
	col *= 0.69 + 0.31 * hash21(id + 11.0);
	col = clamp((col - 0.5) * 1.83 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
