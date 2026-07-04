uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float fieldA(vec2 p, float t, float ph){
    float v;
    vec2 mc = p * (1.18 + 0.47 * sin(t * 0.84)) + vec2(-0.26, -0.23) + 0.02 * vec2(sin(ph), cos(ph));
    vec2 z = vec2(0.0);
    float mit = 0.0;
    for(int mi = 0; mi < 30; mi++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + mc; if(dot(z, z) > 4.0) break; mit += 1.0; }
    v = mit / 30.0 * 2.0 - 1.0;
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    vec3 g = vec3(p * 9.96, t * 1.10 + ph);
    v = (sin(g.x) * cos(g.y) + sin(g.y) * cos(g.z) + sin(g.z) * cos(g.x)) * 0.5;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec2 q1 = p; vec2 q2 = p;
	q1 = (floor(q1 * 27.2) + 0.5) / 27.2;
	q1 = sin(q1 * 2.27 + time * 1.08) * 0.64;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.38);
	float d = d1 * d2;
	float cc = clamp(0.5 + 0.5 * d, 0.0, 1.0);
	vec3 col = mix(vec3(0.21, 0.30, 0.02), vec3(0.79, 0.64, 0.49), cc);
	col = floor(clamp(col, 0.0, 1.0) * 7.0) / 7.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
