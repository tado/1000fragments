uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float fieldA(vec2 p, float t, float ph){
    float v;
    float qa = atan(p.y, p.x);
    float qr = length(p);
    v = sin(qa * 3.0 + qr * 6.51 * sin(t * 1.19) + t * 2.56 + ph);
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float md = 10.0;
    for(int li = 0; li < 24; li++){ float lt = float(li) * 0.2617994;
        vec2 lp = vec2(sin(lt * 3.0 + t * 1.30 + ph), sin(lt * 5.0 + t * 1.33)) * 0.55;
        md = min(md, length(p - lp)); }
    v = exp(-md * 4.66) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	vec2 q1 = p; vec2 q2 = p;
	q1.x += sin(q1.y * 2.40 + time * 3.52) * 0.23;
	q1 = rot2(0.43) * q1;
	q2 *= 2.56;
	q2 = rot2(length(q2) * 3.45 + time * 0.61) * q2;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.51);
	float d = min(d1, d2);
	vec3 col = palette(d * 1.40 + time * 0.21, vec3(0.57, 0.53, 0.47), vec3(0.35, 0.33, 0.35), vec3(0.72, 1.30, 1.02), vec3(0.02, 0.08, 0.32));
	vec2 vg = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 1.69 * dot(vg, vg);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
