uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float fieldA(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 13.19 + t * 1.91 + ph) + sin(p.y * 13.70 - t * 1.91 + ph)
        + sin((p.x + p.y) * 2.16 + t * 1.91 + ph) + sin(length(p) * 4.67 - t * 1.91 + ph));
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float ms = 0.0;
    for(int mi = 0; mi < 11; mi++){ float mf = float(mi);
        vec2 mm = vec2(sin(t * 1.20 * sin(mf + 3.0) + ph), cos(t * 0.60 * cos(mf + 3.0) + ph));
        ms += 0.060 / length(p - mm); }
    v = ms / (1.0 + abs(ms)) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.48;
	vec2 q1 = p; vec2 q2 = p;
	q2 = rot2(time * 0.53) * q2;
	q2 *= 2.01;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.54);
	float d = d1 * d2;
	vec3 col = vec3(0.15, 0.93, 0.16) * (0.25 / (abs(d) + 0.04));
	col = col / (1.0 + col);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
