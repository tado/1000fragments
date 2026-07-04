uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.29;
	vec2 gp = p * 5.04;
	vec2 id = floor(gp); vec2 gv = fract(gp) - 0.5;
	float rnd = hash21(id);
	if(rnd < 0.5) gv.x = -gv.x;
	float ad = min(abs(length(gv - vec2(0.5)) - 0.5), abs(length(gv + vec2(0.5)) - 0.5));
	float v = sin(ad * 24.79 - time * 4.12 + rnd * 6.2831853);
	vec3 col = vec3(0.98, 0.77, 0.56) * (0.09 / (abs(v) + 0.10));
	col = col / (1.0 + col);
	col *= 0.84 + 0.10 * sin(gl_FragCoord.y * 2.42 + time * 9.91);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
