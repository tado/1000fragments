uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float fieldA(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 6.83 + t * 2.19 + ph) + sin(p.y * 7.40 - t * 2.19 + ph)
        + sin((p.x + p.y) * 6.86 + t * 2.19 + ph) + sin(length(p) * 10.74 - t * 2.19 + ph));
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    v = sin(sa * 5.46 + sr * 18.17 - t * 3.72 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	vec2 q1 = p; vec2 q2 = p;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.88);
	float d = d1 * d2;
	float cc = clamp(0.5 + 0.5 * d, 0.0, 1.0);
	vec3 col = mix(vec3(0.30, 0.01, 0.03), vec3(0.56, 0.92, 0.80), cc);
	col *= 0.89 + 0.12 * sin(gl_FragCoord.y * 1.35 + time * 15.81);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
