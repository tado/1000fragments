uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float fieldA(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    v = sin(sa * 11.44 + sr * 23.60 - t * 3.73 + ph);
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float xs = 0.0;
    for(int xi = 1; xi < 4; xi++){ float jf = float(xi);
        vec2 im = vec2(sin(t * 0.31 + jf * 4.0), cos(t * 0.17 * jf)) * 0.67;
        xs += sin(length(p - im) * 168.45 - t * 4.52 + ph) * 0.5; }
    v = xs / (1.0 + abs(xs));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.51;
	vec2 q1 = p; vec2 q2 = p;
	q2 += vec2(-0.72, 0.26) * sin(length(q2) * 2.01 - time * 2.30) * 0.34;
	for(int wi = 0; wi < 5; wi++){ float wf = float(wi) + 1.0; q2.x += 0.45 / wf * sin(wf * 1.64 * q2.y + time * 1.41); q2.y += 0.29 / wf * cos(wf * 1.54 * q2.x + time * 1.69); }
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.44);
	float d = d1 * d2;
	vec3 col = vec3(0.77, 0.56, 0.61) * (0.25 / (abs(d) + 0.10));
	col = col / (1.0 + col);
	col = pow(clamp(col, 0.0, 1.0), vec3(1.92));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
