uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 31.96 - t * 2.15 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.65;
	p = rot2(time * 1.51) * p;
	{ p = vec2(atan(p.y, p.x) * 1.87, length(p) * 3.91 - time * 0.70); }
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.85 + time * 0.11, vec3(0.54, 0.54, 0.41), vec3(0.38, 0.43, 0.31), vec3(0.93, 0.78, 1.10), vec3(0.53, 0.68, 0.66));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
