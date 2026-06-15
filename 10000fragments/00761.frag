uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.48, 0.0)) * 38.99 - t * 4.65 + ph);
    float mb = sin(length(p + vec2(0.48, 0.0)) * 20.61 - t * 4.65 + ph);
    v = ma * mb;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 6.36 + t * 3.21 + ph) + sin(p.y * 7.94 - t * 3.21 + ph)
        + sin((p.x + p.y) * 9.65 + t * 3.21 + ph) + sin(length(p) * 14.28 - t * 3.21 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.60;
	{ float ka = atan(p.y, p.x); float kr = length(p); float kn = 7.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); p = kr * vec2(cos(ka), sin(ka)); }
	p = rot2(p.y * 4.00 + time * 0.47) * p;
	p = rot2(length(p) * 3.53 + time * 1.11) * p;
	for(int wi = 0; wi < 6; wi++){ float wf = float(wi) + 1.0; p.x += 0.24 / wf * sin(wf * 2.64 * p.y + time * 0.90); p.y += 0.33 / wf * cos(wf * 3.47 * p.x + time * 1.49); }
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.48);
	float d = abs(d1 - d2);
	vec3 col = palette(d * 1.00 + time * 0.29, vec3(0.49, 0.48, 0.49), vec3(0.36, 0.44, 0.42), vec3(1.12, 1.20, 0.76), vec3(0.64, 0.14, 0.41));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
