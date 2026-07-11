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
	vec2 gp = p * 2.69;
	vec2 id = floor(gp); vec2 gv = fract(gp) - 0.5;
	float rnd = hash21(id);
	if(rnd < 0.5) gv.x = -gv.x;
	float ad = min(abs(length(gv - vec2(0.5)) - 0.5), abs(length(gv + vec2(0.5)) - 0.5));
	float v = sin(ad * 23.00 - time * 3.63 + rnd * 6.2831853);
	vec3 col = palette(v * 1.05 + time * 0.16, vec3(0.43, 0.40, 0.59), vec3(0.35, 0.32, 0.48), vec3(1.38, 1.09, 0.71), vec3(0.18, 0.53, 0.08));
	col *= 0.51 + 0.43 * hash21(id + 11.0);
	col = mod(col * 2.52, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
