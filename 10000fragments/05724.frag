uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float fieldA(vec2 p, float t, float ph){
    float v;
    vec2 mc = p * (1.33 + 0.30 * sin(t * 1.08)) + vec2(-0.74, 0.21) + 0.02 * vec2(sin(ph), cos(ph));
    vec2 z = vec2(0.0);
    float mit = 0.0;
    for(int mi = 0; mi < 25; mi++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + mc; if(dot(z, z) > 4.0) break; mit += 1.0; }
    v = mit / 25.0 * 2.0 - 1.0;
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    vec2 kp = p * 1.16;
    for(int ki = 0; ki < 5; ki++){ kp = abs(kp) - 0.65; kp = rot2(2.50) * kp; kp *= 1.32; }
    v = sin(kp.x * 2.82 - t * 4.26 + ph);
    return v;
}
float fieldC(vec2 p, float t, float ph){
    float v;
    vec2 kp = p * 2.39;
    for(int ki = 0; ki < 4; ki++){ kp = abs(kp) - 0.54; kp = rot2(1.79) * kp; kp *= 1.23; }
    v = sin(kp.x * 2.99 - t * 1.92 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 0.81;
	vec2 q1 = p; vec2 q2 = p; vec2 q3 = p;
	q2 = mix(q2, q2.yx, 0.5 + 0.5 * sin(time * 1.34));
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.90);
	float d3 = fieldC(q3, time, 0.28);
	d2 = abs(d2 - d3);
	float d = 0.5 * (d1 + d2);
	vec3 col = 0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + d * 3.54 + time * 0.75);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
