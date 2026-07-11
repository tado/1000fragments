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
    v = sin(sa * 9.32 + sr * 17.12 - t * 0.67 + ph);
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.54, 0.0)) * 12.25 - t * 1.89 + ph);
    float mb = sin(length(p + vec2(0.54, 0.0)) * 32.85 - t * 1.89 + ph);
    v = ma * mb;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.34;
	p = rot2(time * -0.90) * p;
	p = rot2(p.y * 2.55 + time * 0.24) * p;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.83);
	float d = d1 * d2;
	vec3 col = palette(d * 1.25 + time * 0.21, vec3(0.51, 0.60, 0.48), vec3(0.47, 0.38, 0.46), vec3(0.81, 1.07, 1.21), vec3(0.20, 0.54, 0.68));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
