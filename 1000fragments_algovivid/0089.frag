uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    vec3 col = a + b * cos(6.28318 * (c * t + d));
    return mix(vec3(dot(col, vec3(0.333, 0.334, 0.333))), col, 0.85);
}


void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p += vec2(sin((time * 0.54) * 0.35), cos((time * 0.54) * 0.30)) * 0.07;
	p.x *= resolution.x / resolution.y;
	vec2 gp = p * 5.02;
	vec2 id = floor(gp); vec2 gv = fract(gp) - 0.5;
	float rnd = hash21(id);
	if(rnd < 0.5) gv.x = -gv.x;
	float ad = min(abs(length(gv - vec2(0.5)) - 0.5), abs(length(gv + vec2(0.5)) - 0.5));
	float v = sin(ad * 25.45 - (time * 0.54) * 7.59 + rnd * 6.2831853);
	vec3 col = palette((v) * 0.69 + (time * 0.54) * 0.03, vec3(0.40, 0.37, 0.44), vec3(0.19, 0.23, 0.29), vec3(0.76, 0.84, 0.78), vec3(0.21, 0.20, 0.88));
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.32);
	col = clamp(col, 0.0, 1.0) * vec3(1.005, 0.992, 1.001) * 1.00 + 0.030;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
