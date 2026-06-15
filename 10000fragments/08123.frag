uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.50, 0.0)) * 20.48 - t * 7.59 + ph);
    float mb = sin(length(p + vec2(0.50, 0.0)) * 29.67 - t * 7.59 + ph);
    v = ma * mb;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 0.93;
	p = rot2(time * -0.83) * p;
	p = fract(p * 1.57) - 0.5;
	for(int fo = 0; fo < 2; fo++){ p = abs(p) - 0.39; p = rot2(1.64) * p; }
	for(int wi = 0; wi < 2; wi++){ float wf = float(wi) + 1.0; p.x += 0.49 / wf * sin(wf * 1.64 * p.y + time * 1.70); p.y += 0.29 / wf * cos(wf * 3.72 * p.x + time * 1.99); }
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.84 + time * 0.28, vec3(0.58, 0.42, 0.48), vec3(0.47, 0.47, 0.45), vec3(1.13, 0.82, 0.80), vec3(0.14, 0.24, 0.22));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
