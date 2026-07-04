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
    vec2 tp = p * 3.90; vec2 ti = floor(tp); vec2 tf = fract(tp);
    if(hash21(ti) < 0.5) tf.x = 1.0 - tf.x;
    float dd = min(abs(length(tf) - 0.5), abs(length(tf - vec2(1.0)) - 0.5));
    v = sin(dd * 23.88 - t * 3.40 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.38;
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec2 hq = rot2(1.29) * p * 12.69;
	vec2 hf = fract(hq) - 0.5;
	float rad = clamp(d, 0.0, 1.0) * 0.59;
	float v = smoothstep(rad, rad - 0.15, length(hf));
	vec3 col = palette(d * 0.71 + time * 0.02, vec3(0.41, 0.45, 0.47), vec3(0.50, 0.41, 0.37), vec3(0.93, 0.74, 1.05), vec3(0.00, 0.72, 0.53)) * v;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
