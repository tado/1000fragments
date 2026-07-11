uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec2 gp = p * 6.50;
	vec2 id = floor(gp); vec2 gv = fract(gp) - 0.5;
	float rnd = hash21(id);
	if(rnd < 0.5) gv.x = -gv.x;
	float v = sin((gv.x + gv.y) * 18.42 + rnd * 6.2831853 + time * 5.39);
	vec3 col = vec3(0.37, 0.24, 0.74) * (0.19 / (abs(v) + 0.02));
	col = col / (1.0 + col);
	col = mod(col * 2.58, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
