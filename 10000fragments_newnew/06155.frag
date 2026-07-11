uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }


void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.29;
	vec2 gp = p * 7.34;
	vec2 id = floor(gp); vec2 gv = fract(gp) - 0.5;
	float rnd = hash21(id);
	float sq = max(abs(gv.x), abs(gv.y));
	float v = sin(sq * 19.12 - time * 5.36 + rnd * 6.2831853);
	float cc = clamp(0.5 + 0.5 * v, 0.0, 1.0);
	vec3 col = mix(vec3(0.32, 0.19, 0.11), vec3(0.71, 0.56, 0.67), cc);
	col = pow(clamp(col, 0.0, 1.0), vec3(1.59));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
