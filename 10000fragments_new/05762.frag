uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 tp = p * 3.47; vec2 ti = floor(tp); vec2 tf = fract(tp);
    if(hash21(ti) < 0.5) tf.x = 1.0 - tf.x;
    float dd = min(abs(length(tf) - 0.5), abs(length(tf - vec2(1.0)) - 0.5));
    v = sin(dd * 22.78 - t * 0.64 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 0.95;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.43 + time * 0.10, vec3(0.47, 0.45, 0.58), vec3(0.45, 0.30, 0.36), vec3(1.24, 0.82, 1.11), vec3(0.63, 0.34, 0.62));
	col = fract(col * 2.16);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
