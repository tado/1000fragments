uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }

float fieldA(vec2 p, float t, float ph){
    float v;
    float qa = atan(p.y, p.x);
    float qr = length(p);
    v = sin(qa * 3.0 + qr * 5.08 * sin(t * 1.03) + t * 5.30 + ph);
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float grow = floor(p.y * 6.03);
    float gsh = hash21(vec2(grow, floor(t * 4.97))) - 0.5;
    float gx = p.x + gsh * 0.99;
    v = sin(gx * 14.45 + ph) * (0.6 + 0.4 * sin(grow * 1.7 + t * 3.05));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	vec2 q1 = p; vec2 q2 = p;
	{ q1 = vec2(atan(q1.y, q1.x) * 2.05, length(q1) * 5.33 - time * 0.93); }
	{ q2 = vec2(atan(q2.y, q2.x) * 1.79, length(q2) * 4.98 - time * 0.50); }
	for(int wi = 0; wi < 3; wi++){ float wf = float(wi) + 1.0; q2.x += 0.44 / wf * sin(wf * 2.34 * q2.y + time * 1.28); q2.y += 0.43 / wf * cos(wf * 2.30 * q2.x + time * 1.89); }
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.96);
	float d = mix(d1, d2, 0.5 + 0.5 * sin(time * 0.90));
	vec3 col = 0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + d * 2.06 + time * 0.27);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
