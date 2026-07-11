uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}


void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.26;
	vec2 gp = p * 4.36;
	vec2 id = floor(gp); vec2 gv = fract(gp) - 0.5;
	float rnd = hash21(id);
	float v = sin((length(gv) - 0.17 - 0.09 * sin(time * 2.72 + rnd * 6.2831853)) * 17.45);
	vec3 col = palette(v * 0.56 + time * 0.33, vec3(0.48, 0.51, 0.54), vec3(0.41, 0.41, 0.43), vec3(0.84, 1.38, 1.19), vec3(0.49, 0.60, 0.45));
	col *= 0.53 + 0.33 * hash21(id + 11.0);
	col *= 0.88 + 0.16 * sin(gl_FragCoord.y * 2.85 + time * 9.00);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
