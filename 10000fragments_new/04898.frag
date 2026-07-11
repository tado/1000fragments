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
	p *= 1.58;
	vec2 gp = p * 2.85;
	vec2 id = floor(gp); vec2 gv = fract(gp) - 0.5;
	float rnd = hash21(id);
	if(rnd < 0.5) gv.x = -gv.x;
	float ad = min(abs(length(gv - vec2(0.5)) - 0.5), abs(length(gv + vec2(0.5)) - 0.5));
	float v = sin(ad * 28.90 - time * 3.60 + rnd * 6.2831853);
	vec3 col = palette(v * 1.09 + time * 0.18, vec3(0.59, 0.51, 0.40), vec3(0.33, 0.30, 0.40), vec3(1.01, 1.07, 1.09), vec3(0.01, 0.80, 0.79));
	col *= 0.56 + 0.37 * hash21(id + 11.0);
	col *= 0.89 + 0.18 * sin(gl_FragCoord.y * 2.93 + time * 8.78);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
