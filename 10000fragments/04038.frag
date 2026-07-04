uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 tp = p * 5.35; vec2 ti = floor(tp); vec2 tf = fract(tp);
    if(hash21(ti) < 0.5) tf.x = 1.0 - tf.x;
    float dd = min(abs(length(tf) - 0.5), abs(length(tf - vec2(1.0)) - 0.5));
    v = sin(dd * 17.82 - t * 3.04 + ph);
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    vec2 dp = fract(p * 8.62) - 0.5;
    float rad = 0.37 + 0.12 * sin(t * 3.57 + ph);
    v = (1.0 - smoothstep(0.0, rad, length(dp))) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.28;
	p = (floor(p * 17.7) + 0.5) / 17.7;
	{ p = vec2(atan(p.y, p.x) * 1.24, length(p) * 5.77 - time * 0.93); }
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.04);
	float d = max(d1, d2);
	vec3 col = palette(d * 0.58 + time * 0.20, vec3(0.46, 0.56, 0.53), vec3(0.40, 0.43, 0.39), vec3(0.75, 1.39, 1.04), vec3(0.63, 0.68, 0.75));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
