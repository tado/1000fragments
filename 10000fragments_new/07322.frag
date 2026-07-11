uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float fieldA(vec2 p, float t, float ph){
    float v;
    vec2 mc = p * (1.65 + 0.36 * sin(t * 0.99)) + vec2(-0.53, 0.19) + 0.02 * vec2(sin(ph), cos(ph));
    vec2 z = vec2(0.0);
    float mit = 0.0;
    for(int mi = 0; mi < 30; mi++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + mc; if(dot(z, z) > 4.0) break; mit += 1.0; }
    v = mit / 30.0 * 2.0 - 1.0;
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 16.13 + t * 2.83 + ph) + sin(p.y * 9.23 - t * 5.98 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	vec2 q1 = p; vec2 q2 = p;
	q2.x += sin(q2.y * 4.99 + time * 1.00) * 0.36;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.98);
	float d = 0.5 * (d1 + d2);
	float cc = clamp(0.5 + 0.5 * d, 0.0, 1.0);
	vec3 col = mix(vec3(0.12, 0.05, 0.17), vec3(0.89, 0.61, 0.98), cc);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
