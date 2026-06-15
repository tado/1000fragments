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
    v = sin(sa * 4.89 + sr * 21.00 - t * 4.78 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p = rot2(p.y * 3.52 + time * 0.32) * p;
	p *= 2.71;
	p = rot2(time * 1.06) * p;
	p = abs(p) - 0.40;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.00 + time * 0.07, vec3(0.50, 0.57, 0.54), vec3(0.37, 0.37, 0.43), vec3(1.11, 0.98, 0.94), vec3(0.88, 0.88, 0.10));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
