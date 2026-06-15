uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    v = sin(sa * 9.36 + sr * 8.05 - t * 3.01 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p = rot2(time * -1.17) * p;
	p = rot2(1.47) * p;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.58 + time * 0.29, vec3(0.40, 0.57, 0.45), vec3(0.37, 0.47, 0.36), vec3(0.98, 1.28, 1.32), vec3(0.82, 0.21, 0.73));
	col = fract(col * 1.99);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
