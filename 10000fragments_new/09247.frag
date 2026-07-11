uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 tp = p * 3.23; vec2 ti = floor(tp); vec2 tf = fract(tp);
    if(hash21(ti) < 0.5) tf.x = 1.0 - tf.x;
    float dd = min(abs(length(tf) - 0.5), abs(length(tf - vec2(1.0)) - 0.5));
    v = sin(dd * 16.95 - t * 1.12 + ph);
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 10.63 + vec2(t * 2.62, -t * 1.40) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.57;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.26);
	float d = max(d1, d2);
	vec3 col = palette(d * 1.77 + time * 0.28, vec3(0.43, 0.47, 0.52), vec3(0.49, 0.35, 0.34), vec3(1.20, 0.87, 1.12), vec3(0.38, 0.86, 0.78));
	col = mod(col * 2.26, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
