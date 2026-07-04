uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float zx = abs(fract(p.x * 2.13 + t * 0.70) - 0.5) * 2.0;
    v = sin((p.y * 7.59 + zx * 1.85 + t * 2.10) * 3.1415927 + ph);
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float ga = atan(p.y, p.x); float gr = length(p) + 0.001;
    float arm = sin(log(gr) * 7.33 + ga * 3.0 - t * 2.53 + ph);
    v = arm * exp(-gr * 0.61);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p = abs(p);
	p = rot2(p.y * 2.44 + time * 0.86) * p;
	for(int wi = 0; wi < 5; wi++){ float wf = float(wi) + 1.0; p.x += 0.49 / wf * sin(wf * 2.84 * p.y + time * 1.68); p.y += 0.42 / wf * cos(wf * 2.20 * p.x + time * 1.02); }
	p = rot2(1.65) * p;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.85);
	float d = d1 * d2;
	vec3 col = palette(d * 1.05 + time * 0.29, vec3(0.58, 0.41, 0.48), vec3(0.41, 0.33, 0.47), vec3(1.29, 0.93, 0.91), vec3(0.63, 0.54, 0.82));
	col = clamp((col - 0.5) * 1.48 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
