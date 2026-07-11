uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float fieldA(vec2 p, float t, float ph){
    float v;
    float xs = 0.0;
    for(int xi = 1; xi < 4; xi++){ float jf = float(xi);
        vec2 im = vec2(sin(t * 0.53 + jf * 4.0), cos(t * 0.48 * jf)) * 0.31;
        xs += sin(length(p - im) * 158.30 - t * 4.07 + ph) * 0.5; }
    v = xs / (1.0 + abs(xs));
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    vec2 cw = p * 2.31 + ph;
    float ca = 0.0;
    for(int ci = 0; ci < 4; ci++){ float cf = float(ci) + 1.0;
        cw += sin(cw.yx * 1.68 + t * 2.52 * cf * 0.35) / cf;
        ca += sin(cw.x + cw.y); }
    v = ca * 0.3;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	vec2 q1 = p; vec2 q2 = p;
	q2 = (floor(q2 * 12.9) + 0.5) / 12.9;
	{ float ka = atan(q2.y, q2.x); float kr = length(q2); float kn = 8.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); q2 = kr * vec2(cos(ka), sin(ka)); }
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.59);
	float d = 0.5 * (d1 + d2);
	vec3 col = vec3(0.97, 0.87, 0.22) * (0.05 / (abs(d) + 0.08));
	col = col / (1.0 + col);
	col *= 0.86 + 0.19 * sin(gl_FragCoord.y * 2.79 + time * 16.11);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
