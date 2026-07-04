uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }

float fieldA(vec2 p, float t, float ph){
    float v;
    vec2 cw = p * 3.75 + ph;
    float ca = 0.0;
    for(int ci = 0; ci < 4; ci++){ float cf = float(ci) + 1.0;
        cw += sin(cw.yx * 2.14 + t * 3.58 * cf * 0.35) / cf;
        ca += sin(cw.x + cw.y); }
    v = ca * 0.3;
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float grow = floor(p.y * 22.74);
    float gsh = hash21(vec2(grow, floor(t * 2.71))) - 0.5;
    float gx = p.x + gsh * 0.71;
    v = sin(gx * 7.35 + ph) * (0.6 + 0.4 * sin(grow * 1.7 + t * 3.20));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.78;
	vec2 q1 = p; vec2 q2 = p;
	q1 = (floor(q1 * 23.3) + 0.5) / 23.3;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.04);
	float d = max(d1, d2);
	vec3 col = vec3(0.83, 0.19, 0.91) * (0.14 / (abs(d) + 0.09));
	col = col / (1.0 + col);
	col = pow(clamp(col, 0.0, 1.0), vec3(1.78));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
