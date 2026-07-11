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
    v = sin(sa * 8.50 + sr * 10.25 - t * 1.25 + ph);
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 11.33 + sin(p.y * 1.89 + t * 1.94) * 3.44 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p = rot2(1.85) * p;
	for(int wi = 0; wi < 6; wi++){ float wf = float(wi) + 1.0; p.x += 0.30 / wf * sin(wf * 1.74 * p.y + time * 1.83); p.y += 0.41 / wf * cos(wf * 2.17 * p.x + time * 1.39); }
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.15);
	float d = min(d1, d2);
	vec3 col = palette(d * 1.72 + time * 0.00, vec3(0.49, 0.48, 0.58), vec3(0.45, 0.37, 0.40), vec3(1.31, 1.28, 1.00), vec3(0.85, 0.52, 0.29));
	col = pow(clamp(col, 0.0, 1.0), vec3(1.63));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
