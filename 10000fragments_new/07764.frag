uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float fieldA(vec2 p, float t, float ph){
    float v;
    float xs = 0.0;
    for(int xi = 1; xi < 7; xi++){ float jf = float(xi);
        vec2 im = vec2(sin(t * 0.82 + jf * 4.0), cos(t * 0.18 * jf)) * 0.73;
        xs += sin(length(p - im) * 173.49 - t * 8.69 + ph) * 0.5; }
    v = xs / (1.0 + abs(xs));
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float wa = sin(p.x * 17.63 + t * 3.20 + ph) * 0.7;
    float wb = sin(p.y * 13.10 - t * 1.48 + ph) * 0.7;
    v = max(wa, wb) + min(wa, wb) * 0.55;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.82;
	vec2 q1 = p; vec2 q2 = p;
	q1 = rot2(length(q1) * -3.03 + time * 0.98) * q1;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.35);
	float d = min(d1, d2);
	vec3 col = 0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + d * 4.81 + time * 0.88);
	col *= 0.89 + 0.17 * sin(gl_FragCoord.y * 2.08 + time * 8.55);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
