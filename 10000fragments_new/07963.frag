uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float fieldA(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 5.65 + t * 4.13 + ph) + sin(p.y * 16.94 - t * 0.51 + ph));
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float xs = 0.0;
    for(int xi = 1; xi < 8; xi++){ float jf = float(xi);
        vec2 im = vec2(sin(t * 0.98 + jf * 4.0), cos(t * 0.17 * jf)) * 0.67;
        xs += sin(length(p - im) * 99.24 - t * 12.82 + ph) * 0.5; }
    v = xs / (1.0 + abs(xs));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.64;
	vec2 q1 = p; vec2 q2 = p;
	q1 = rot2(length(q1) * 3.05 + time * 1.15) * q1;
	q1 *= 1.94;
	q2 = rot2(length(q2) * 2.14 + time * 0.84) * q2;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.81);
	float d = d1 * d2;
	vec3 col = hue(d * 1.12 + time * 0.24);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
