uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}


void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.22;
	p = rot2(time * 0.81) * p;
	vec2 gp = p * 4.73;
	vec2 id = floor(gp); vec2 gv = fract(gp) - 0.5;
	float rnd = hash21(id);
	float sq = max(abs(gv.x), abs(gv.y));
	float v = sin(sq * 20.43 - time * 6.70 + rnd * 6.2831853);
	vec3 col = palette(v * 0.79 + time * 0.14, vec3(0.58, 0.41, 0.58), vec3(0.40, 0.38, 0.46), vec3(1.08, 1.21, 1.32), vec3(0.18, 0.52, 0.26));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
