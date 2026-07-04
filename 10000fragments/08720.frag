uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }


void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.87;
	vec2 gp = p * 3.56;
	vec2 id = floor(gp); vec2 gv = fract(gp) - 0.5;
	float rnd = hash21(id);
	float v = sin((length(gv) - 0.21 - 0.16 * sin(time * 3.49 + rnd * 6.2831853)) * 23.89);
	vec3 col = vec3(0.5 + 0.5 * v) * vec3(1.33, 1.40, 0.84) + vec3(0.22, 0.24, 0.15);
	col = fract(col * 1.17);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
