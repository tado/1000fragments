uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.49, 0.0)) * 16.11 - t * 5.08 + ph);
    float mb = sin(length(p + vec2(0.49, 0.0)) * 16.68 - t * 2.39 + ph);
    v = ma * mb;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float md = 10.0;
    for(int li = 0; li < 24; li++){ float lt = float(li) * 0.2617994;
        vec2 lp = vec2(sin(lt * 3.0 + t * 0.40 + ph), sin(lt * 4.0 + t * 1.04)) * 0.83;
        md = min(md, length(p - lp)); }
    v = exp(-md * 6.62) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p = rot2(p.y * 1.50 + time * 0.97) * p;
	{ float fr = length(p); p *= 1.0 + 0.51 * fr * fr; }
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.14);
	float d = min(d1, d2);
	vec3 col = palette(d * 1.65 + time * 0.08, vec3(0.42, 0.50, 0.41), vec3(0.43, 0.42, 0.39), vec3(0.96, 1.20, 1.03), vec3(0.89, 0.83, 0.75));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
