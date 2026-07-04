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
	p *= 1.72;
	vec2 gp = p * 4.94;
	vec2 id = floor(gp); vec2 gv = fract(gp) - 0.5;
	float rnd = hash21(id);
	float sq = max(abs(gv.x), abs(gv.y));
	float v = sin(sq * 22.70 - time * 7.29 + rnd * 6.2831853);
	vec3 col = palette(v * 1.08 + time * 0.24, vec3(0.40, 0.50, 0.42), vec3(0.32, 0.37, 0.44), vec3(1.22, 0.88, 1.00), vec3(0.68, 0.86, 0.06));
	col *= 0.80 + 0.16 * sin(gl_FragCoord.y * 2.25 + time * 17.96);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
