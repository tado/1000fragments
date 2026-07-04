uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float fieldA(vec2 p, float t, float ph){
    float v;
    float pa = atan(p.y, p.x) + t * 0.72;
    float pk = 6.2831853 / 4.0;
    float pd = cos(floor(0.5 + pa / pk) * pk - pa) * length(p);
    v = sin(pd * 10.82 - t * 1.10 + ph);
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 5.47 + vec2(t * 0.33, -t * 2.94) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	vec2 q1 = p; vec2 q2 = p;
	{ float ka = atan(q1.y, q1.x); float kr = length(q1); float kn = 3.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); q1 = kr * vec2(cos(ka), sin(ka)); }
	q2.y += sin(q2.x * 2.45 + time * 3.09) * 0.34;
	{ float iv = dot(q2, q2) + 0.05; q2 = q2 / iv * 0.85; }
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.45);
	float d = 0.5 * (d1 + d2);
	float cc = clamp(0.5 + 0.5 * d, 0.0, 1.0);
	vec3 col = mix(vec3(0.06, 0.25, 0.23), vec3(0.86, 0.75, 0.87), cc);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
