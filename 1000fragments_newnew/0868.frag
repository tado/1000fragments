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
	p = rot2((time * 0.84) * -0.94) * p;
	vec2 gp = p * 6.71;
	vec2 id = floor(gp); vec2 gv = fract(gp) - 0.5;
	float rnd = hash21(id);
	if(rnd < 0.5) gv.x = -gv.x;
	float v = sin((gv.x + gv.y) * 15.19 + rnd * 6.2831853 + (time * 0.84) * 6.13);
	vec3 col = palette((v) * 0.77 + (time * 0.84) * 0.20, vec3(0.50, 0.50, 0.40), vec3(0.16, 0.12, 0.13), vec3(0.70, 0.76, 0.77), vec3(0.59, 0.98, 0.93));
	col += (hash21(gl_FragCoord.xy + fract((time * 0.84)) * 100.0) - 0.5) * 0.07;
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.37);
	col = clamp(col, 0.0, 1.0) * vec3(0.951, 1.002, 0.952) * 1.00 + 0.015;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
