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
    vec2 tp = p * 3.05; vec2 ti = floor(tp); vec2 tf = fract(tp);
    if(hash21(ti) < 0.5) tf.x = 1.0 - tf.x;
    float dd = min(abs(length(tf) - 0.5), abs(length(tf - vec2(1.0)) - 0.5));
    v = sin(dd * 15.03 - t * 0.85 + ph);
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float wa = sin(p.x * 18.31 + t * 2.81 + ph) * 0.7;
    float wb = sin(p.y * 12.60 - t * 2.81 + ph) * 0.7;
    v = max(wa, wb) + min(wa, wb) * 0.79;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.73;
	p.y += sin(p.x * 5.35 + time * 3.58) * 0.40;
	p = rot2(0.91) * p;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.28);
	float d = d1 + d2;
	vec3 col = palette(d * 0.51 + time * 0.28, vec3(0.55, 0.58, 0.57), vec3(0.44, 0.34, 0.49), vec3(1.19, 1.21, 1.30), vec3(0.67, 0.73, 0.31));
	col = clamp((col - 0.5) * 2.15 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
