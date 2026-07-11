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
	p *= 2.31;
	p = rot2(time * 0.91) * p;
	vec2 gp = p * 7.60;
	vec2 id = floor(gp); vec2 gv = fract(gp) - 0.5;
	float rnd = hash21(id);
	float v = sin((length(gv) - 0.17 - 0.11 * sin(time * 5.48 + rnd * 6.2831853)) * 25.45);
	vec3 col = palette(v * 0.42 + time * 0.02, vec3(0.45, 0.45, 0.53), vec3(0.41, 0.48, 0.45), vec3(1.06, 0.77, 1.02), vec3(0.07, 0.18, 0.98));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
