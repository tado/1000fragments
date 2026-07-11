uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.32, 0.0)) * 36.18 - t * 1.45 + ph);
    float mb = sin(length(p + vec2(0.32, 0.0)) * 28.34 - t * 5.78 + ph);
    v = ma * mb;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.55, 0.0)) * 16.11 - t * 4.46 + ph);
    float mb = sin(length(p + vec2(0.55, 0.0)) * 18.58 - t * 1.71 + ph);
    v = ma * mb;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	for(int fo = 0; fo < 3; fo++){ p = abs(p) - 0.22; p = rot2(1.79) * p; }
	for(int wi = 0; wi < 4; wi++){ float wf = float(wi) + 1.0; p.x += 0.26 / wf * sin(wf * 1.61 * p.y + time * 1.06); p.y += 0.32 / wf * cos(wf * 2.81 * p.x + time * 0.84); }
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 2.02, lr * 2.37 + time * 0.40); }
	p = fract(p * 1.76) - 0.5;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.52);
	float d = mix(d1, d2, 0.5 + 0.5 * sin(time * 0.7));
	vec3 col = palette(d * 0.79 + time * 0.04, vec3(0.60, 0.59, 0.48), vec3(0.42, 0.42, 0.46), vec3(0.82, 0.89, 0.96), vec3(0.53, 0.82, 0.41));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
