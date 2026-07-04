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
	p *= 0.80;
	vec2 gp = p * 5.00;
	vec2 id = floor(gp); vec2 gv = fract(gp) - 0.5;
	float rnd = hash21(id);
	if(rnd < 0.5) gv.x = -gv.x;
	float ad = min(abs(length(gv - vec2(0.5)) - 0.5), abs(length(gv + vec2(0.5)) - 0.5));
	float v = sin(ad * 29.40 - time * 7.34 + rnd * 6.2831853);
	vec3 col = palette(v * 1.16 + time * 0.09, vec3(0.55, 0.48, 0.49), vec3(0.30, 0.49, 0.37), vec3(1.24, 0.80, 1.21), vec3(0.82, 0.34, 0.29));
	col *= 0.64 + 0.46 * hash21(id + 11.0);
	col = mod(col * 1.98, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
