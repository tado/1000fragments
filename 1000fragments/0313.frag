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
    v = sin(sa * 8.75 + sr * 19.52 - t * 4.04 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p = rot2(time * -1.19) * p;
	p = abs(p) - 0.32;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.81 + time * 0.17, vec3(0.51, 0.48, 0.47), vec3(0.50, 0.37, 0.49), vec3(1.39, 0.95, 1.19), vec3(0.41, 0.48, 0.61));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
