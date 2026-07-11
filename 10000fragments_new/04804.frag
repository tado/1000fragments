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
    v = sin(sa * 11.59 + sr * 20.56 - t * 4.86 + ph);
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float xs = 0.0;
    for(int xi = 1; xi < 6; xi++){ float jf = float(xi);
        vec2 im = vec2(sin(t * 0.64 + jf * 4.0), cos(t * 0.36 * jf)) * 0.84;
        xs += sin(length(p - im) * 178.45 - t * 6.83 + ph) * 0.5; }
    v = xs / (1.0 + abs(xs));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.99;
	vec2 q1 = p; vec2 q2 = p;
	q2 = (floor(q2 * 20.9) + 0.5) / 20.9;
	q2 = rot2(length(q2) * -1.25 + time * 1.28) * q2;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.47);
	float d = 0.5 * (d1 + d2);
	vec3 col = hue(d * 0.93 + time * 0.24);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
