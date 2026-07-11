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
	vec2 gp = p * 6.24;
	vec2 id = floor(gp); vec2 gv = fract(gp) - 0.5;
	float rnd = hash21(id);
	if(rnd < 0.5) gv.x = -gv.x;
	float ad = min(abs(length(gv - vec2(0.5)) - 0.5), abs(length(gv + vec2(0.5)) - 0.5));
	float v = sin(ad * 25.43 - time * 7.46 + rnd * 6.2831853);
	vec3 col = palette(v * 1.48 + time * 0.08, vec3(0.44, 0.46, 0.60), vec3(0.39, 0.42, 0.39), vec3(0.88, 0.74, 0.72), vec3(0.02, 0.11, 0.09));
	col *= 0.65 + 0.41 * hash21(id + 11.0);
	vec2 vg = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 1.44 * dot(vg, vg);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
