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
    float pet = 0.45 + 0.22 * pow(abs(cos(ra * 2.0 + t * 0.61)), 2.00);
    v = sin((rr - pet) * 14.82 + ph);
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    vec2 tp = p * 5.68; vec2 ti = floor(tp); vec2 tf = fract(tp);
    if(hash21(ti) < 0.5) tf.x = 1.0 - tf.x;
    float dd = min(abs(length(tf) - 0.5), abs(length(tf - vec2(1.0)) - 0.5));
    v = sin(dd * 28.92 - t * 1.47 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p = rot2(length(p) * -3.57 + time * 0.79) * p;
	p.y += sin(p.x * 4.49 + time * 2.02) * 0.15;
	p += vec2(0.43, -0.10) * sin(length(p) * 4.40 - time * 1.52) * 0.18;
	p = rot2(time * 0.78) * p;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.96);
	float d = d1 * d2;
	vec3 col = palette(d * 1.05 + time * 0.26, vec3(0.54, 0.50, 0.46), vec3(0.49, 0.46, 0.44), vec3(1.31, 0.88, 0.86), vec3(0.10, 0.52, 0.56));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
