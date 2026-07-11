uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float qa = atan(p.y, p.x);
    float qr = length(p);
    v = sin(qa * 12.0 + qr * 4.00 * sin(t * 0.94) + t * 4.56 + ph);
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    vec2 zp = p * 5.65;
    vec2 zi = floor(zp); vec2 zf = fract(zp) - 0.5;
    if(hash21(zi + floor(t * 2.51)) < 0.5) zf.x = -zf.x;
    float zd = abs(zf.x + zf.y) * 0.7071068;
    v = sin(zd * 23.83 - t * 4.10 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p += vec2(0.07, 0.73) * sin(length(p) * 4.41 - time * 1.33) * 0.25;
	for(int wi = 0; wi < 4; wi++){ float wf = float(wi) + 1.0; p.x += 0.20 / wf * sin(wf * 2.12 * p.y + time * 1.71); p.y += 0.49 / wf * cos(wf * 3.32 * p.x + time * 0.61); }
	for(int fo = 0; fo < 2; fo++){ p = abs(p) - 0.50; p = rot2(0.54) * p; }
	p = rot2(length(p) * -3.70 + time * 1.34) * p;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.71);
	float d = d1 + d2;
	vec3 col = palette(d * 1.66 + time * 0.07, vec3(0.41, 0.42, 0.46), vec3(0.36, 0.40, 0.47), vec3(1.10, 1.28, 1.20), vec3(0.99, 0.33, 0.45));
	vec2 vg = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 1.14 * dot(vg, vg);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
