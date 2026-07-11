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
	p *= 2.26;
	vec2 gp = p * 3.62;
	vec2 id = floor(gp); vec2 gv = fract(gp) - 0.5;
	float rnd = hash21(id);
	float v = sin((length(gv) - 0.25 - 0.18 * sin(time * 5.01 + rnd * 6.2831853)) * 15.70);
	vec3 col = hue(v * 0.69 + time * 0.12);
	col *= 0.86 + 0.20 * sin(gl_FragCoord.y * 2.84 + time * 5.07);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
