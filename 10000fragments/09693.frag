uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}


void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	vec2 gp = p * 2.60;
	vec2 id = floor(gp); vec2 gv = fract(gp) - 0.5;
	float rnd = hash21(id);
	float sq = max(abs(gv.x), abs(gv.y));
	float v = sin(sq * 16.39 - time * 5.69 + rnd * 6.2831853);
	vec3 col = palette(v * 1.31 + time * 0.17, vec3(0.50, 0.56, 0.60), vec3(0.34, 0.36, 0.34), vec3(0.82, 0.95, 1.08), vec3(0.74, 0.98, 0.65));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
