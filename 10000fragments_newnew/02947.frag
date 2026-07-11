uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 tp = p * 6.90; vec2 ti = floor(tp); vec2 tf = fract(tp);
    if(hash21(ti) < 0.5) tf.x = 1.0 - tf.x;
    float dd = min(abs(length(tf) - 0.5), abs(length(tf - vec2(1.0)) - 0.5));
    v = sin(dd * 24.69 - t * 3.37 + ph);
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    v = sin(sa * 8.32 + sr * 4.34 - t * 2.71 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.97;
	p = sin(p * 2.63 + time * 1.89) * 0.61;
	p *= 1.0 + 0.21 * sin(time * 2.19);
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.51);
	float d = max(d1, d2);
	vec3 col = palette(d * 0.60 + time * 0.18, vec3(0.43, 0.51, 0.56), vec3(0.50, 0.31, 0.31), vec3(1.02, 1.28, 0.72), vec3(0.10, 0.84, 0.00));
	col = fract(col * 1.42);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
