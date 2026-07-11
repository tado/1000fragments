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
    v = sin(sa * 4.85 + sr * 12.34 - t * 2.93 + ph);
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    vec2 tp = p * 5.24; vec2 ti = floor(tp); vec2 tf = fract(tp);
    if(hash21(ti) < 0.5) tf.x = 1.0 - tf.x;
    float dd = min(abs(length(tf) - 0.5), abs(length(tf - vec2(1.0)) - 0.5));
    v = sin(dd * 11.86 - t * 1.91 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.44;
	{ p = vec2(atan(p.y, p.x) * 2.37, length(p) * 2.83 - time * 0.48); }
	{ float ka = atan(p.y, p.x); float kr = length(p); float kn = 8.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); p = kr * vec2(cos(ka), sin(ka)); }
	for(int wi = 0; wi < 6; wi++){ float wf = float(wi) + 1.0; p.x += 0.20 / wf * sin(wf * 3.57 * p.y + time * 1.29); p.y += 0.27 / wf * cos(wf * 2.86 * p.x + time * 0.87); }
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.00);
	float d = d1 * d2;
	vec3 col = palette(d * 1.33 + time * 0.23, vec3(0.46, 0.47, 0.56), vec3(0.34, 0.33, 0.45), vec3(1.14, 1.18, 1.17), vec3(0.51, 0.64, 0.50));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
