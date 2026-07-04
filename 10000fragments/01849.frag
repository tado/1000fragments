uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float fieldA(vec2 p, float t, float ph){
    float v;
    float pa = atan(p.y, p.x) + t * 0.28;
    float pk = 6.2831853 / 5.0;
    float pd = cos(floor(0.5 + pa / pk) * pk - pa) * length(p);
    v = sin(pd * 8.10 - t * 3.02 + ph);
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    vec2 mc = p * (1.56 + 0.10 * sin(t * 1.37)) + vec2(-0.36, 0.09) + 0.02 * vec2(sin(ph), cos(ph));
    vec2 z = vec2(0.0);
    float mit = 0.0;
    for(int mi = 0; mi < 16; mi++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + mc; if(dot(z, z) > 4.0) break; mit += 1.0; }
    v = mit / 16.0 * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	vec2 q1 = p; vec2 q2 = p;
	{ q1 = vec2(atan(q1.y, q1.x) * 2.06, length(q1) * 2.75 - time * 0.52); }
	q1 = sin(q1 * 2.73 + time * 1.35) * 1.45;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.46);
	float d = abs(d1 - d2);
	float cc = clamp(0.5 + 0.5 * d, 0.0, 1.0);
	vec3 col = mix(vec3(0.33, 0.27, 0.49), vec3(0.76, 0.98, 0.80), cc);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
