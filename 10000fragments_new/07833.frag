uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }


void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 0.81;
	vec2 gp = p * 5.23;
	vec2 id = floor(gp); vec2 gv = fract(gp) - 0.5;
	float rnd = hash21(id);
	float v = sin((length(gv) - 0.29 - 0.11 * sin(time * 6.00 + rnd * 6.2831853)) * 25.34);
	float cc = clamp(0.5 + 0.5 * v, 0.0, 1.0);
	vec3 col = mix(vec3(0.04, 0.34, 0.25), vec3(0.58, 0.86, 0.85), cc);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
