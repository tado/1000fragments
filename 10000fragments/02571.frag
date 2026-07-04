uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float fieldA(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 11.59 + t * 4.54 + ph) + sin(p.y * 5.07 - t * 4.54 + ph)
        + sin((p.x + p.y) * 3.40 + t * 4.54 + ph) + sin(length(p) * 3.96 - t * 4.54 + ph));
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 7.21 + t * 2.22 + ph) + sin(p.y * 9.67 - t * 2.22 + ph)
        + sin((p.x + p.y) * 6.08 + t * 2.22 + ph) + sin(length(p) * 13.08 - t * 2.22 + ph));
    return v;
}
float fieldC(vec2 p, float t, float ph){
    float v;
    vec2 mc = p * (1.76 + 0.33 * sin(t * 0.72)) + vec2(-0.73, -0.03) + 0.02 * vec2(sin(ph), cos(ph));
    vec2 z = vec2(0.0);
    float mit = 0.0;
    for(int mi = 0; mi < 25; mi++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + mc; if(dot(z, z) > 4.0) break; mit += 1.0; }
    v = mit / 25.0 * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.02;
	vec2 q1 = p; vec2 q2 = p; vec2 q3 = p;
	q3 *= 3.09;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.59);
	float d3 = fieldC(q3, time, 0.42);
	d2 = d2 * d3;
	float d = max(d1, d2);
	vec3 col = 0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + d * 3.60 + time * 0.07);
	col = pow(clamp(col, 0.0, 1.0), vec3(1.41));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
