uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }

float fieldA(vec2 p, float t, float ph){
    float v;
    float grow = floor(p.y * 9.59);
    float gsh = hash21(vec2(grow, floor(t * 2.14))) - 0.5;
    float gx = p.x + gsh * 0.81;
    v = sin(gx * 14.49 + ph) * (0.6 + 0.4 * sin(grow * 1.7 + t * 4.39));
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    vec2 zp = p * 6.67;
    vec2 zi = floor(zp); vec2 zf = fract(zp) - 0.5;
    if(hash21(zi + floor(t * 1.16)) < 0.5) zf.x = -zf.x;
    float zd = abs(zf.x + zf.y) * 0.7071068;
    v = sin(zd * 18.83 - t * 6.58 + ph);
    return v;
}
float fieldC(vec2 p, float t, float ph){
    float v;
    vec2 zp = p * 6.58;
    vec2 zi = floor(zp); vec2 zf = fract(zp) - 0.5;
    if(hash21(zi + floor(t * 2.82)) < 0.5) zf.x = -zf.x;
    float zd = abs(zf.x + zf.y) * 0.7071068;
    v = sin(zd * 28.99 - t * 5.30 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.15;
	vec2 q1 = p; vec2 q2 = p; vec2 q3 = p;
	for(int wi = 0; wi < 3; wi++){ float wf = float(wi) + 1.0; q1.x += 0.48 / wf * sin(wf * 3.33 * q1.y + time * 1.89); q1.y += 0.46 / wf * cos(wf * 2.17 * q1.x + time * 1.27); }
	q1 = rot2(time * -1.26) * q1;
	{ q2 = vec2(atan(q2.y, q2.x) * 1.56, length(q2) * 4.87 - time * 0.75); }
	q2 = rot2(length(q2) * 2.00 + time * 0.49) * q2;
	q3 = rot2(time * 0.62) * q3;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.82);
	float d3 = fieldC(q3, time, 0.36);
	d2 = abs(d2 - d3);
	float d = min(d1, d2);
	float cc = clamp(0.5 + 0.5 * d, 0.0, 1.0);
	vec3 col = mix(vec3(0.39, 0.14, 0.48), vec3(0.89, 0.93, 0.42), cc);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
