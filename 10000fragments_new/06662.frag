uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float fieldA(vec2 p, float t, float ph){
    float v;
    float md = 10.0;
    for(int li = 0; li < 24; li++){ float lt = float(li) * 0.2617994;
        vec2 lp = vec2(sin(lt * 1.0 + t * 1.44 + ph), sin(lt * 2.0 + t * 0.65)) * 0.62;
        md = min(md, length(p - lp)); }
    v = exp(-md * 6.86) * 2.0 - 1.0;
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.43, 0.0)) * 10.01 - t * 5.34 + ph);
    float mb = sin(length(p + vec2(0.43, 0.0)) * 27.03 - t * 7.30 + ph);
    v = ma * mb;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.15;
	vec2 q1 = p; vec2 q2 = p;
	q1 = rot2(length(q1) * 1.98 + time * 1.13) * q1;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.63);
	float d = abs(d1 - d2);
	vec3 col = palette(d * 0.89 + time * 0.08, vec3(0.47, 0.53, 0.41), vec3(0.50, 0.44, 0.42), vec3(1.27, 1.24, 0.87), vec3(0.68, 0.89, 0.81));
	col = pow(clamp(col, 0.0, 1.0), vec3(1.22));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
