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
    vec2 tp = p * 6.50; vec2 ti = floor(tp); vec2 tf = fract(tp);
    if(hash21(ti) < 0.5) tf.x = 1.0 - tf.x;
    float dd = min(abs(length(tf) - 0.5), abs(length(tf - vec2(1.0)) - 0.5));
    v = sin(dd * 17.28 - t * 3.89 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.52;
	for(int fo = 0; fo < 2; fo++){ p = abs(p) - 0.53; p = rot2(2.21) * p; }
	p = rot2(p.y * -1.10 + time * 0.69) * p;
	p *= 2.72;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.50 + time * 0.28, vec3(0.52, 0.42, 0.52), vec3(0.43, 0.48, 0.33), vec3(1.07, 0.91, 1.20), vec3(0.95, 0.50, 0.11));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
