uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}


void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.35;
	vec2 gp = p * 7.84;
	vec2 id = floor(gp); vec2 gv = fract(gp) - 0.5;
	float rnd = hash21(id);
	if(rnd < 0.5) gv.x = -gv.x;
	float v = sin((gv.x + gv.y) * 9.90 + rnd * 6.2831853 + time * 2.36);
	vec3 col = hue(v * 1.19 + time * 0.17);
	col *= 0.62 + 0.36 * hash21(id + 11.0);
	col = mod(col * 1.45, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
