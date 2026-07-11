uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float fieldA(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    float petal = 0.57 + 0.14 * cos(sa * 6.0 + t * 1.35 + ph);
    v = sin((sr - petal) * 15.21);
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 15.98 + sin(p.y * 1.55 + t * 1.35) * 4.51 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.56;
	vec2 q1 = p; vec2 q2 = p;
	q1 = rot2(q1.y * 1.35 + time * 0.47) * q1;
	q1 *= 1.55;
	q2 = (floor(q2 * 17.9) + 0.5) / 17.9;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.81);
	float d = max(d1, d2);
	vec3 col = hue(d * 1.44 + time * 0.32);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
