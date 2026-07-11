uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.25, 0.0)) * 31.72 - t * 5.98 + ph);
    float mb = sin(length(p + vec2(0.25, 0.0)) * 15.40 - t * 5.98 + ph);
    v = ma * mb;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    float petal = 0.32 + 0.27 * cos(sa * 9 + t * 0.65 + ph);
    v = sin((sr - petal) * 14.16);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.52;
	p += vec2(-0.05, 0.27) * sin(length(p) * 3.38 - time * 0.63) * 0.36;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.85);
	float d = min(d1, d2);
	vec3 col = palette(d * 1.22 + time * 0.18, vec3(0.45, 0.59, 0.42), vec3(0.43, 0.38, 0.42), vec3(1.25, 1.18, 0.84), vec3(0.06, 0.95, 0.75));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
