uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float fieldA(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    v = sin(sa * 2.35 + sr * 20.44 - t * 2.26 + ph);
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float ms = 0.0;
    for(int mi = 0; mi < 9; mi++){ float mf = float(mi);
        vec2 mm = vec2(sin(t * 1.24 * sin(mf + 3.0) + ph), cos(t * 2.22 * cos(mf + 3.0) + ph));
        ms += 0.084 / length(p - mm); }
    v = ms / (1.0 + abs(ms)) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.07;
	vec2 q1 = p; vec2 q2 = p;
	q1 = rot2(q1.y * -3.49 + time * 1.09) * q1;
	q1 = rot2(2.82) * q1;
	q2.y += sin(q2.x * 6.75 + time * 2.59) * 0.37;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.75);
	float d = mix(d1, d2, 0.5 + 0.5 * sin(time * 1.40));
	vec3 col = 0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + d * 3.41 + time * 0.49);
	vec2 vg = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.85 * dot(vg, vg);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
