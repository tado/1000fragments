uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float fieldA(vec2 p, float t, float ph){
    float v;
    vec2 mc = p * (1.08 + 0.17 * sin(t * 0.46)) + vec2(-0.74, 0.19) + 0.02 * vec2(sin(ph), cos(ph));
    vec2 z = vec2(0.0);
    float mit = 0.0;
    for(int mi = 0; mi < 23; mi++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + mc; if(dot(z, z) > 4.0) break; mit += 1.0; }
    v = mit / 23.0 * 2.0 - 1.0;
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    vec2 cp = p * 1.92;
    v = 0.5 * (sin(4.0 * cp.x + t * 2.37) * sin(3.0 * cp.y + ph)
             + sin(3.0 * cp.x - t * 1.90) * sin(4.0 * cp.y + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	vec2 q1 = p; vec2 q2 = p;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.85);
	float d = d1 * d2;
	vec3 col = vec3(0.41, 0.85, 0.47) * (0.17 / (abs(d) + 0.03));
	col = col / (1.0 + col);
	col *= 0.87 + 0.19 * sin(gl_FragCoord.y * 2.90 + time * 11.51);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
