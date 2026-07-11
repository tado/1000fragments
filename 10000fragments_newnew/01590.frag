uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 tp = p * 4.31; vec2 ti = floor(tp); vec2 tf = fract(tp);
    if(hash21(ti) < 0.5) tf.x = 1.0 - tf.x;
    float dd = min(abs(length(tf) - 0.5), abs(length(tf - vec2(1.0)) - 0.5));
    v = sin(dd * 23.96 - t * 2.66 + ph);
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float ms = 0.0;
    for(int mi = 0; mi < 9; mi++){ float mf = float(mi);
        vec2 mm = vec2(sin(t * 0.71 * sin(mf + 3.0) + ph), cos(t * 2.08 * cos(mf + 3.0) + ph));
        ms += 0.028 / length(p - mm); }
    v = ms / (1.0 + abs(ms)) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 0.93;
	{ p = vec2(atan(p.y, p.x) * 2.22, length(p) * 2.03 - time * 0.89); }
	p *= 2.46;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.20);
	float d = d1 + d2;
	vec3 col = palette(d * 0.84 + time * 0.24, vec3(0.51, 0.42, 0.52), vec3(0.46, 0.41, 0.39), vec3(1.28, 0.85, 0.80), vec3(0.30, 0.01, 0.88));
	col *= 0.88 + 0.12 * sin(gl_FragCoord.y * 1.06 + time * 11.71);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
