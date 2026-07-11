uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 tp = p * 4.14; vec2 ti = floor(tp); vec2 tf = fract(tp);
    if(hash21(ti) < 0.5) tf.x = 1.0 - tf.x;
    float dd = min(abs(length(tf) - 0.5), abs(length(tf - vec2(1.0)) - 0.5));
    v = sin(dd * 29.96 - t * 1.44 + ph);
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float ra = atan(p.y, p.x); float rr = length(p);
    float pet = 0.47 + 0.16 * pow(abs(cos(ra * 5.0 + t * 1.85)), 1.65);
    v = sin((rr - pet) * 22.61 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p = (floor(p * 11.7) + 0.5) / 11.7;
	p = rot2(time * -0.75) * p;
	for(int wi = 0; wi < 3; wi++){ float wf = float(wi) + 1.0; p.x += 0.45 / wf * sin(wf * 3.96 * p.y + time * 1.77); p.y += 0.43 / wf * cos(wf * 3.88 * p.x + time * 0.78); }
	{ float fr = length(p); p *= 1.0 + -0.60 * fr * fr; }
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.92);
	float d = max(d1, d2);
	vec3 col = palette(d * 0.94 + time * 0.15, vec3(0.42, 0.49, 0.53), vec3(0.38, 0.41, 0.33), vec3(1.09, 1.00, 1.39), vec3(0.08, 0.91, 0.68));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
