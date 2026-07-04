uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }


void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.25;
	vec2 gp = p * 5.33;
	vec2 id = floor(gp); vec2 gv = fract(gp) - 0.5;
	float rnd = hash21(id);
	float v = sin((length(gv) - 0.17 - 0.10 * sin(time * 3.46 + rnd * 6.2831853)) * 11.02);
	vec3 col = vec3(0.70, 0.33, 0.40) * (0.12 / (abs(v) + 0.09));
	col = col / (1.0 + col);
	col = mod(col * 1.92, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
