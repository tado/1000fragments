uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float fieldA(vec2 p, float t, float ph){
    float v;
    vec2 mc = p * (1.13 + 0.31 * sin(t * 1.38)) + vec2(-0.48, 0.06) + 0.02 * vec2(sin(ph), cos(ph));
    vec2 z = vec2(0.0);
    float mit = 0.0;
    for(int mi = 0; mi < 18; mi++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + mc; if(dot(z, z) > 4.0) break; mit += 1.0; }
    v = mit / 18.0 * 2.0 - 1.0;
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 6.94 + vec2(t * 1.16, -t * 2.11) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.34;
	vec2 q1 = p; vec2 q2 = p;
	{ q1 = vec2(atan(q1.y, q1.x) * 2.70, length(q1) * 2.86 - time * 0.91); }
	q2 += vec2(0.47, 0.78) * sin(length(q2) * 4.01 - time * 1.67) * 0.31;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.65);
	float d = min(d1, d2);
	vec3 col = vec3(0.92, 0.68, 0.46) * (0.11 / (abs(d) + 0.04));
	col = col / (1.0 + col);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
