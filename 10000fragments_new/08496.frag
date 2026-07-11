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
	vec2 gp = p * 6.63;
	vec2 id = floor(gp); vec2 gv = fract(gp) - 0.5;
	float rnd = hash21(id);
	float v = sin((length(gv) - 0.17 - 0.11 * sin(time * 5.98 + rnd * 6.2831853)) * 23.15);
	vec3 col = palette(v * 1.14 + time * 0.22, vec3(0.45, 0.44, 0.59), vec3(0.38, 0.32, 0.45), vec3(0.94, 0.92, 0.90), vec3(0.82, 0.22, 0.87));
	col *= 0.55 + 0.47 * hash21(id + 11.0);
	col = mod(col * 1.76, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
