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
	p *= 1.08;
	p = rot2(time * -0.97) * p;
	vec2 gp = p * 2.17;
	vec2 id = floor(gp); vec2 gv = fract(gp) - 0.5;
	float rnd = hash21(id);
	float v = sin((length(gv) - 0.16 - 0.16 * sin(time * 5.94 + rnd * 6.2831853)) * 23.09);
	vec3 col = palette(v * 0.75 + time * 0.10, vec3(0.41, 0.58, 0.44), vec3(0.40, 0.41, 0.47), vec3(1.08, 1.30, 0.76), vec3(0.88, 0.49, 0.67));
	col = floor(clamp(col, 0.0, 1.0) * 7.0) / 7.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
