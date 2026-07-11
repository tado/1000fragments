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
    vec2 tp = p * 8.80; vec2 ti = floor(tp); vec2 tf = fract(tp);
    if(hash21(ti) < 0.5) tf.x = 1.0 - tf.x;
    float dd = min(abs(length(tf) - 0.5), abs(length(tf - vec2(1.0)) - 0.5));
    v = sin(dd * 15.78 - t * 2.84 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.21;
	p = fract(p * 2.30) - 0.5;
	p *= 2.77;
	for(int fo = 0; fo < 2; fo++){ p = abs(p) - 0.36; p = rot2(2.47) * p; }
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.66 + time * 0.16, vec3(0.53, 0.58, 0.42), vec3(0.40, 0.36, 0.35), vec3(1.17, 1.03, 1.31), vec3(0.28, 0.80, 0.44));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
