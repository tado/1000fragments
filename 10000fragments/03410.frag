uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }

float fieldA(vec2 p, float t, float ph){
    float v;
    float grow = floor(p.y * 7.31);
    float gsh = hash21(vec2(grow, floor(t * 4.64))) - 0.5;
    float gx = p.x + gsh * 0.52;
    v = sin(gx * 8.50 + ph) * (0.6 + 0.4 * sin(grow * 1.7 + t * 3.72));
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    vec2 cw = p * 2.96 + ph;
    float ca = 0.0;
    for(int ci = 0; ci < 4; ci++){ float cf = float(ci) + 1.0;
        cw += sin(cw.yx * 1.26 + t * 2.16 * cf * 0.35) / cf;
        ca += sin(cw.x + cw.y); }
    v = ca * 0.3;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.25;
	vec2 q1 = p; vec2 q2 = p;
	for(int fo = 0; fo < 4; fo++){ q2 = abs(q2) - 0.49; q2 = rot2(1.60) * q2; }
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.76);
	float d = mix(d1, d2, 0.5 + 0.5 * sin(time * 1.44));
	vec3 col = vec3(0.97, 0.59, 0.67) * (0.12 / (abs(d) + 0.04));
	col = col / (1.0 + col);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
