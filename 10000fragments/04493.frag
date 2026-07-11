uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    float petal = 0.54 + 0.10 * cos(sa * 8 + t * 2.01 + ph);
    v = sin((sr - petal) * 14.01);
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.28, 0.0)) * 21.60 - t * 6.86 + ph);
    float mb = sin(length(p + vec2(0.28, 0.0)) * 33.05 - t * 6.86 + ph);
    v = ma * mb;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	for(int wi = 0; wi < 5; wi++){ float wf = float(wi) + 1.0; p.x += 0.38 / wf * sin(wf * 2.31 * p.y + time * 1.15); p.y += 0.34 / wf * cos(wf * 3.34 * p.x + time * 1.82); }
	p = rot2(2.92) * p;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.02);
	float d = d1 + d2;
	vec3 col = palette(d * 0.75 + time * 0.13, vec3(0.54, 0.41, 0.60), vec3(0.48, 0.34, 0.42), vec3(0.95, 1.40, 0.85), vec3(0.05, 0.15, 0.65));
	col = floor(clamp(col, 0.0, 1.0) * 6.0) / 6.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
