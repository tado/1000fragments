uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float fieldA(vec2 p, float t, float ph){
    float v;
    float ra = atan(p.y, p.x); float rr = length(p);
    float pet = 0.32 + 0.17 * pow(abs(cos(ra * 7.0 + t * 2.79)), 1.97);
    v = sin((rr - pet) * 17.57 + ph);
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    vec2 tp = p * 4.77; vec2 ti = floor(tp); vec2 tf = fract(tp);
    if(hash21(ti) < 0.5) tf.x = 1.0 - tf.x;
    float dd = min(abs(length(tf) - 0.5), abs(length(tf - vec2(1.0)) - 0.5));
    v = sin(dd * 11.65 - t * 0.99 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.12;
	vec2 q1 = p; vec2 q2 = p;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.84);
	float d = max(d1, d2);
	vec3 col = palette(d * 0.93 + time * 0.27, vec3(0.44, 0.47, 0.46), vec3(0.32, 0.40, 0.33), vec3(0.96, 1.11, 1.16), vec3(0.35, 0.68, 0.53));
	col = mod(col * 1.85, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
