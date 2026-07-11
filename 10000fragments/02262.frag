uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 22.93 - t * 3.78 + ph);
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    float petal = 0.39 + 0.19 * cos(sa * 8 + t * 2.02 + ph);
    v = sin((sr - petal) * 18.80);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.86;
	for(int wi = 0; wi < 3; wi++){ float wf = float(wi) + 1.0; p.x += 0.34 / wf * sin(wf * 2.89 * p.y + time * 1.33); p.y += 0.34 / wf * cos(wf * 2.71 * p.x + time * 1.30); }
	p = fract(p * 2.98) - 0.5;
	p = rot2(time * -0.78) * p;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.98);
	float d = d1 * d2;
	vec3 col = palette(d * 1.23 + time * 0.29, vec3(0.48, 0.58, 0.41), vec3(0.41, 0.46, 0.46), vec3(0.79, 0.99, 1.11), vec3(0.94, 0.28, 0.51));
	col = pow(clamp(col, 0.0, 1.0), vec3(1.56));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
