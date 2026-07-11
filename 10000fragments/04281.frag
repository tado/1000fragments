uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.50, 0.0)) * 12.15 - t * 7.39 + ph);
    float mb = sin(length(p + vec2(0.50, 0.0)) * 19.37 - t * 7.39 + ph);
    v = ma * mb;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    float petal = 0.46 + 0.16 * cos(sa * 9 + t * 1.99 + ph);
    v = sin((sr - petal) * 11.09);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p = rot2(time * -0.59) * p;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.77);
	float d = abs(d1 - d2);
	vec3 col = palette(d * 0.70 + time * 0.08, vec3(0.41, 0.45, 0.58), vec3(0.35, 0.40, 0.34), vec3(0.87, 1.33, 0.81), vec3(0.51, 0.98, 0.94));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
