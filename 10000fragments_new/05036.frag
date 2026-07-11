uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float fieldA(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.31, 0.0)) * 21.99 - t * 5.32 + ph);
    float mb = sin(length(p + vec2(0.31, 0.0)) * 25.59 - t * 6.82 + ph);
    v = ma * mb;
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 2.53 + t * 4.21 + ph) + sin(p.y * 17.86 - t * 1.72 + ph));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.75;
	vec2 q1 = p; vec2 q2 = p;
	q1 = rot2(time * -0.61) * q1;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.77);
	float d = 0.5 * (d1 + d2);
	vec3 col = vec3(0.30, 0.96, 0.90) * (0.15 / (abs(d) + 0.03));
	col = col / (1.0 + col);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
