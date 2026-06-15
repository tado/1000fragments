uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 11.83 - t * 4.65 + ph);
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    v = sin(sa * 6.29 + sr * 12.06 - t * 3.28 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.20;
	p = rot2(length(p) * 1.60 + time * 1.13) * p;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.02);
	float d = max(d1, d2);
	vec3 col = palette(d * 1.53 + time * 0.05, vec3(0.55, 0.53, 0.41), vec3(0.38, 0.38, 0.38), vec3(0.78, 1.25, 1.02), vec3(0.93, 0.17, 0.39));
	col = fract(col * 2.22);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
