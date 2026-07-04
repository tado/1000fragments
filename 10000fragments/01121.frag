uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}


void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.87;
	vec2 gp = p * 7.53;
	vec2 id = floor(gp); vec2 gv = fract(gp) - 0.5;
	float rnd = hash21(id);
	float sq = max(abs(gv.x), abs(gv.y));
	float v = sin(sq * 20.76 - time * 6.31 + rnd * 6.2831853);
	vec3 col = palette(v * 0.40 + time * 0.39, vec3(0.59, 0.41, 0.46), vec3(0.45, 0.31, 0.39), vec3(1.21, 1.23, 1.18), vec3(0.74, 0.95, 0.65));
	col = mod(col * 1.63, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
