uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float fieldA(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 7.63 + t * 0.90 + ph) + sin(p.y * 5.70 - t * 0.90 + ph)
        + sin((p.x + p.y) * 4.17 + t * 0.90 + ph) + sin(length(p) * 5.75 - t * 0.90 + ph));
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 15.16 + vec2(t * 2.62, -t * 2.67) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec2 q1 = p; vec2 q2 = p;
	{ float ka = atan(q1.y, q1.x); float kr = length(q1); float kn = 4.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); q1 = kr * vec2(cos(ka), sin(ka)); }
	q2 = rot2(1.48) * q2;
	{ float lr = log(length(q2) + 0.001); float la = atan(q2.y, q2.x); q2 = vec2(la * 2.44, lr * 1.05 + time * -0.88); }
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.36);
	float d = d1 * d2;
	vec3 col = hue(d * 0.49 + time * 0.32);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
