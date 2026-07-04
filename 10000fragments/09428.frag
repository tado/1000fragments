uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float fieldA(vec2 p, float t, float ph){
    float v;
    vec3 g = vec3(p * 4.50, t * 1.16 + ph);
    v = (sin(g.x) * cos(g.y) + sin(g.y) * cos(g.z) + sin(g.z) * cos(g.x)) * 0.5;
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float md = 10.0;
    for(int li = 0; li < 24; li++){ float lt = float(li) * 0.2617994;
        vec2 lp = vec2(sin(lt * 4.0 + t * 0.99 + ph), sin(lt * 4.0 + t * 0.54)) * 0.54;
        md = min(md, length(p - lp)); }
    v = exp(-md * 3.99) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	vec2 q1 = p; vec2 q2 = p;
	{ float fr = length(q1); q1 *= 1.0 + -0.29 * fr * fr; }
	{ float iv = dot(q1, q1) + 0.05; q1 = q1 / iv * 0.57; }
	{ float ka = atan(q2.y, q2.x); float kr = length(q2); float kn = 3.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); q2 = kr * vec2(cos(ka), sin(ka)); }
	q2.x += sin(q2.y * 2.43 + time * 1.87) * 0.34;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.94);
	float d = d1 * d2;
	vec3 col = vec3(0.90, 0.52, 0.38) * (0.19 / (abs(d) + 0.08));
	col = col / (1.0 + col);
	col = pow(clamp(col, 0.0, 1.0), vec3(1.89));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
