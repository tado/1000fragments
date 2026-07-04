uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float fieldA(vec2 p, float t, float ph){
    float v;
    float wa = sin(p.x * 12.38 + t * 2.59 + ph) * 0.7;
    float wb = sin(p.y * 9.44 - t * 1.28 + ph) * 0.7;
    v = max(wa, wb) + min(wa, wb) * 0.61;
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    vec2 tp = p * 3.22; vec2 ti = floor(tp); vec2 tf = fract(tp);
    if(hash21(ti) < 0.5) tf.x = 1.0 - tf.x;
    float dd = min(abs(length(tf) - 0.5), abs(length(tf - vec2(1.0)) - 0.5));
    v = sin(dd * 23.71 - t * 2.22 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.63;
	vec2 q1 = p; vec2 q2 = p;
	q1 *= 2.61;
	q2 = (floor(q2 * 16.9) + 0.5) / 16.9;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.34);
	float d = d1 * d2;
	vec3 col = hue(d * 1.31 + time * 0.30);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
