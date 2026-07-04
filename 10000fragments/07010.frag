uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float fieldA(vec2 p, float t, float ph){
    float v;
    float ga = atan(p.y, p.x); float gr = length(p) + 0.001;
    float arm = sin(log(gr) * 3.18 + ga * 4.0 - t * 1.20 + ph);
    v = arm * exp(-gr * 1.29);
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    v = sin(sa * 10.90 + sr * 6.43 - t * 1.60 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	vec2 q1 = p; vec2 q2 = p;
	q1 = rot2(length(q1) * 3.81 + time * 1.08) * q1;
	q1 *= 2.62;
	q2 = mix(q2, q2.yx, 0.5 + 0.5 * sin(time * 1.37));
	q2 *= 1.29;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.16);
	float d = abs(d1 - d2);
	vec3 col = palette(d * 1.33 + time * 0.39, vec3(0.52, 0.56, 0.50), vec3(0.35, 0.44, 0.46), vec3(0.85, 0.89, 1.24), vec3(0.86, 0.01, 0.40));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
