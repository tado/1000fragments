uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }

float fieldA(vec2 p, float t, float ph){
    float v;
    vec2 zp = p * 4.31;
    vec2 zi = floor(zp); vec2 zf = fract(zp) - 0.5;
    if(hash21(zi + floor(t * 1.46)) < 0.5) zf.x = -zf.x;
    float zd = abs(zf.x + zf.y) * 0.7071068;
    v = sin(zd * 18.93 - t * 7.23 + ph);
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float grow = floor(p.y * 21.49);
    float gsh = hash21(vec2(grow, floor(t * 4.68))) - 0.5;
    float gx = p.x + gsh * 0.61;
    v = sin(gx * 19.82 + ph) * (0.6 + 0.4 * sin(grow * 1.7 + t * 3.62));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.25;
	vec2 q1 = p; vec2 q2 = p;
	q1 *= 2.90;
	q1 = abs(q1) - 0.56;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.60);
	float d = min(d1, d2);
	vec3 col = vec3(0.33, 0.79, 0.51) * (0.08 / (abs(d) + 0.03));
	col = col / (1.0 + col);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
