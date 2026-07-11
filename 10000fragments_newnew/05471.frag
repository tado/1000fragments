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
	p *= 1.79;
	vec2 gp = p * 7.40;
	vec2 id = floor(gp); vec2 gv = fract(gp) - 0.5;
	float rnd = hash21(id);
	float v = sin((length(gv) - 0.23 - 0.15 * sin(time * 4.91 + rnd * 6.2831853)) * 21.41);
	vec3 col = palette(v * 0.74 + time * 0.30, vec3(0.60, 0.52, 0.43), vec3(0.42, 0.50, 0.41), vec3(0.82, 0.73, 1.39), vec3(0.10, 0.37, 0.87));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
