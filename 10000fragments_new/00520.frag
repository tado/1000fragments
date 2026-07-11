uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float fieldA(vec2 p, float t, float ph){
    float v;
    vec2 tp = p * 7.32; vec2 ti = floor(tp); vec2 tf = fract(tp);
    if(hash21(ti) < 0.5) tf.x = 1.0 - tf.x;
    float dd = min(abs(length(tf) - 0.5), abs(length(tf - vec2(1.0)) - 0.5));
    v = sin(dd * 11.54 - t * 1.15 + ph);
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 5.87 + t * 1.14 + ph) + sin(p.y * 15.68 - t * 3.33 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.89;
	vec2 q1 = p; vec2 q2 = p;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.09);
	float d = min(d1, d2);
	vec3 col = palette(d * 1.15 + time * 0.30, vec3(0.53, 0.58, 0.44), vec3(0.45, 0.32, 0.38), vec3(0.94, 1.21, 1.24), vec3(0.05, 0.69, 0.94));
	col *= 0.87 + 0.14 * sin(gl_FragCoord.y * 2.14 + time * 14.04);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
