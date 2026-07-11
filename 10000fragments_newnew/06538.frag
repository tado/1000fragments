uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float wa = sin(p.x * 18.06 + t * 2.01 + ph) * 0.7;
    float wb = sin(p.y * 11.36 - t * 0.65 + ph) * 0.7;
    v = max(wa, wb) + min(wa, wb) * 0.22;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float ga = atan(p.y, p.x); float gr = length(p) + 0.001;
    float arm = sin(log(gr) * 4.27 + ga * 4.0 - t * 1.57 + ph);
    v = arm * exp(-gr * 0.93);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.39;
	p = rot2(p.y * -2.38 + time * 0.77) * p;
	p = rot2(1.33) * p;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.49);
	float d = max(d1, d2);
	vec3 col = palette(d * 0.65 + time * 0.05, vec3(0.41, 0.49, 0.55), vec3(0.39, 0.43, 0.42), vec3(1.10, 1.18, 0.81), vec3(0.91, 1.00, 0.76));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
