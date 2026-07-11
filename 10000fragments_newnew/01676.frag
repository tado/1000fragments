uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }

float fieldA(vec2 p, float t, float ph){
    float v;
    float pa = atan(p.y, p.x) + t * 0.68;
    float pk = 6.2831853 / 7.0;
    float pd = cos(floor(0.5 + pa / pk) * pk - pa) * length(p);
    v = sin(pd * 13.51 - t * 2.70 + ph);
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float qa = atan(p.y, p.x);
    float qr = length(p);
    v = sin(qa * 6.0 + qr * 3.35 * sin(t * 1.41) + t * 5.64 + ph);
    return v;
}
float fieldC(vec2 p, float t, float ph){
    float v;
    vec2 zp = p * 8.31;
    vec2 zi = floor(zp); vec2 zf = fract(zp) - 0.5;
    if(hash21(zi + floor(t * 2.63)) < 0.5) zf.x = -zf.x;
    float zd = abs(zf.x + zf.y) * 0.7071068;
    v = sin(zd * 27.57 - t * 2.40 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec2 q1 = p; vec2 q2 = p; vec2 q3 = p;
	q1 *= 1.0 + 0.14 * sin(time * 4.43);
	q2.y += sin(q2.x * 6.48 + time * 3.04) * 0.33;
	{ float fr = length(q2); q2 *= 1.0 + 0.59 * fr * fr; }
	for(int wi = 0; wi < 4; wi++){ float wf = float(wi) + 1.0; q3.x += 0.26 / wf * sin(wf * 3.90 * q3.y + time * 1.98); q3.y += 0.30 / wf * cos(wf * 3.70 * q3.x + time * 0.88); }
	q3 = rot2(time * 0.60) * q3;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.37);
	float d3 = fieldC(q3, time, 1.51);
	d2 = 0.5 * (d2 + d3);
	float d = min(d1, d2);
	float cc = clamp(0.5 + 0.5 * d, 0.0, 1.0);
	vec3 col = mix(vec3(0.22, 0.00, 0.19), vec3(0.71, 0.95, 0.83), cc);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
