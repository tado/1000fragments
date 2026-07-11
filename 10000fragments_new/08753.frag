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
    float ra = atan(p.y, p.x); float rr = length(p);
    float pet = 0.51 + 0.31 * pow(abs(cos(ra * 4.0 + t * 2.96)), 1.64);
    v = sin((rr - pet) * 9.25 + ph);
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    vec2 tp = p * 6.52; vec2 ti = floor(tp); vec2 tf = fract(tp);
    if(hash21(ti) < 0.5) tf.x = 1.0 - tf.x;
    float dd = min(abs(length(tf) - 0.5), abs(length(tf - vec2(1.0)) - 0.5));
    v = sin(dd * 8.65 - t * 3.89 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	{ float ka = atan(p.y, p.x); float kr = length(p); float kn = 8.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); p = kr * vec2(cos(ka), sin(ka)); }
	p.x += sin(p.y * 7.52 + time * 2.67) * 0.24;
	p = abs(p);
	p = rot2(p.y * -3.40 + time * 1.12) * p;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.27);
	float d = d1 * d2;
	vec3 col = palette(d * 0.71 + time * 0.12, vec3(0.45, 0.43, 0.51), vec3(0.36, 0.39, 0.35), vec3(0.95, 1.31, 0.97), vec3(1.00, 0.29, 0.67));
	col = fract(col * 1.63);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
