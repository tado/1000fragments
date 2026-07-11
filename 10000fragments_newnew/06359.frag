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
	p *= 1.03;
	vec2 gp = p * 6.34;
	vec2 id = floor(gp); vec2 gv = fract(gp) - 0.5;
	float rnd = hash21(id);
	float v = sin((length(gv) - 0.29 - 0.18 * sin(time * 3.25 + rnd * 6.2831853)) * 24.43);
	vec3 col = palette(v * 0.43 + time * 0.14, vec3(0.43, 0.43, 0.50), vec3(0.35, 0.48, 0.50), vec3(0.95, 0.95, 0.99), vec3(0.89, 0.48, 0.80));
	col *= 0.60 + 0.48 * hash21(id + 11.0);
	col = pow(clamp(col, 0.0, 1.0), vec3(1.84));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
