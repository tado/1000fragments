uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    vec3 col = a + b * cos(6.28318 * (c * t + d));
    return mix(vec3(dot(col, vec3(0.333, 0.334, 0.333))), col, 0.55);
}


void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p = rot2((time * 0.66) * -0.77) * p;
	vec2 gp = p * 7.11;
	vec2 id = floor(gp); vec2 gv = fract(gp) - 0.5;
	float rnd = hash21(id);
	if(rnd < 0.5) gv.x = -gv.x;
	float ad = min(abs(length(gv - vec2(0.5)) - 0.5), abs(length(gv + vec2(0.5)) - 0.5));
	float v = sin(ad * 21.06 - (time * 0.66) * 2.33 + rnd * 6.2831853);
	vec3 col = palette((v) * 0.58 + (time * 0.66) * 0.21, vec3(0.34, 0.27, 0.29), vec3(0.27, 0.22, 0.22), vec3(0.47, 0.88, 0.89), vec3(0.19, 0.10, 0.29));
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.57);
	col = clamp(col, 0.0, 1.0) * vec3(1.023, 0.969, 0.998) * 1.00 + 0.023;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
