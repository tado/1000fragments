uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}


void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	vec2 gp = p * 5.13;
	vec2 id = floor(gp); vec2 gv = fract(gp) - 0.5;
	float rnd = hash21(id);
	float sq = max(abs(gv.x), abs(gv.y));
	float v = sin(sq * 22.20 - time * 4.46 + rnd * 6.2831853);
	vec3 col = palette(v * 0.98 + time * 0.37, vec3(0.41, 0.57, 0.47), vec3(0.44, 0.36, 0.40), vec3(1.10, 1.05, 0.84), vec3(0.14, 0.51, 0.69));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
