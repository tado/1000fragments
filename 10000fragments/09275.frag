uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float fieldA(vec2 p, float t, float ph){
    float v;
    vec2 tp = p * 3.91; vec2 ti = floor(tp); vec2 tf = fract(tp);
    if(hash21(ti) < 0.5) tf.x = 1.0 - tf.x;
    float dd = min(abs(length(tf) - 0.5), abs(length(tf - vec2(1.0)) - 0.5));
    v = sin(dd * 20.42 - t * 2.50 + ph);
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.36, 0.0)) * 12.34 - t * 4.44 + ph);
    float mb = sin(length(p + vec2(0.36, 0.0)) * 39.62 - t * 1.59 + ph);
    v = ma * mb;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.60;
	vec2 q1 = p; vec2 q2 = p;
	q1 = rot2(1.29) * q1;
	q2 = rot2(length(q2) * 1.41 + time * 0.37) * q2;
	q2 = vec2(q2.x * q2.x - q2.y * q2.y, 2.0 * q2.x * q2.y) * 0.75;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.62);
	float d = mix(d1, d2, 0.5 + 0.5 * sin(time * 0.95));
	vec3 col = hue(d * 0.84 + time * 0.17);
	col += (hash21(gl_FragCoord.xy + fract(time) * 100.0) - 0.5) * 0.04;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
