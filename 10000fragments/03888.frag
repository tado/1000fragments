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
	p *= 1.47;
	p = rot2(time * 1.28) * p;
	vec2 gp = p * 5.93;
	vec2 id = floor(gp); vec2 gv = fract(gp) - 0.5;
	float rnd = hash21(id);
	float v = sin((length(gv) - 0.24 - 0.18 * sin(time * 1.78 + rnd * 6.2831853)) * 10.04);
	vec3 col = palette(v * 0.64 + time * 0.30, vec3(0.48, 0.46, 0.41), vec3(0.32, 0.42, 0.32), vec3(0.77, 0.87, 0.79), vec3(0.35, 0.78, 0.84));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
