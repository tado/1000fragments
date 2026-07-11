uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}


void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.68;
	p = rot2(time * -1.40) * p;
	vec2 gp = p * 2.23;
	vec2 id = floor(gp); vec2 gv = fract(gp) - 0.5;
	float rnd = hash21(id);
	float v = sin((length(gv) - 0.22 - 0.20 * sin(time * 5.04 + rnd * 6.2831853)) * 11.12);
	vec3 col = palette(v * 0.71 + time * 0.38, vec3(0.57, 0.56, 0.58), vec3(0.38, 0.36, 0.43), vec3(1.19, 1.11, 1.01), vec3(0.07, 0.91, 0.45));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
