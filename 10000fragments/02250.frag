uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    float petal = 0.45 + 0.20 * cos(sa * 7 + t * 2.49 + ph);
    v = sin((sr - petal) * 13.89);
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    float petal = 0.31 + 0.14 * cos(sa * 6 + t * 0.36 + ph);
    v = sin((sr - petal) * 7.97);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 0.95;
	for(int wi = 0; wi < 6; wi++){ float wf = float(wi) + 1.0; p.x += 0.34 / wf * sin(wf * 1.85 * p.y + time * 1.56); p.y += 0.46 / wf * cos(wf * 3.49 * p.x + time * 1.71); }
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.79);
	float d = abs(d1 - d2);
	vec3 col = palette(d * 1.49 + time * 0.27, vec3(0.56, 0.44, 0.45), vec3(0.33, 0.49, 0.48), vec3(0.95, 0.80, 0.93), vec3(0.51, 0.04, 0.08));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
