uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 8.63 + t * 0.50 + ph) + sin(p.y * 8.59 - t * 0.50 + ph)
        + sin((p.x + p.y) * 3.62 + t * 0.50 + ph) + sin(length(p) * 7.90 - t * 0.50 + ph));
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 25.06 + sin(p.y * 3.56 + t * 5.98) * 3.55 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.10;
	p = rot2(time * -0.76) * p;
	{ float ka = atan(p.y, p.x); float kr = length(p); float kn = 4.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); p = kr * vec2(cos(ka), sin(ka)); }
	for(int wi = 0; wi < 2; wi++){ float wf = float(wi) + 1.0; p.x += 0.27 / wf * sin(wf * 3.30 * p.y + time * 1.57); p.y += 0.46 / wf * cos(wf * 3.67 * p.x + time * 0.73); }
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 1.39, lr * 1.07 + time * 0.10); }
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.60);
	float d = d1 * d2;
	vec3 col = palette(d * 1.74 + time * 0.26, vec3(0.49, 0.54, 0.46), vec3(0.41, 0.45, 0.32), vec3(0.93, 0.97, 0.91), vec3(0.33, 0.96, 0.64));
	col = floor(clamp(col, 0.0, 1.0) * 7.0) / 7.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
