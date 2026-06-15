uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
float noise2(vec2 p){
    vec2 i = floor(p), f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(mix(hash21(i + vec2(0.0, 0.0)), hash21(i + vec2(1.0, 0.0)), u.x),
               mix(hash21(i + vec2(0.0, 1.0)), hash21(i + vec2(1.0, 1.0)), u.x), u.y);
}
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    float petal = 0.49 + 0.27 * cos(sa * 6 + t * 2.14 + ph);
    v = sin((sr - petal) * 13.93);
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    vec2 tp = p * 6.90; vec2 ti = floor(tp); vec2 tf = fract(tp);
    if(hash21(ti) < 0.5) tf.x = 1.0 - tf.x;
    float dd = min(abs(length(tf) - 0.5), abs(length(tf - vec2(1.0)) - 0.5));
    v = sin(dd * 14.46 - t * 3.07 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.38;
	for(int wi = 0; wi < 6; wi++){ float wf = float(wi) + 1.0; p.x += 0.36 / wf * sin(wf * 3.39 * p.y + time * 0.96); p.y += 0.20 / wf * cos(wf * 2.59 * p.x + time * 0.74); }
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.31);
	float d = mix(d1, d2, 0.5 + 0.5 * sin(time * 0.5));
	vec3 col = palette(d * 0.60 + time * 0.09, vec3(0.55, 0.44, 0.43), vec3(0.30, 0.39, 0.32), vec3(1.15, 1.16, 0.79), vec3(0.82, 0.74, 0.01));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
