uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float fieldA(vec2 p, float t, float ph){
    float v;
    float xs = 0.0;
    for(int xi = 1; xi < 6; xi++){ float jf = float(xi);
        vec2 im = vec2(sin(t * 0.15 + jf * 4.0), cos(t * 0.56 * jf)) * 0.60;
        xs += sin(length(p - im) * 192.06 - t * 12.34 + ph) * 0.5; }
    v = xs / (1.0 + abs(xs));
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    vec2 tp = p * 3.17; vec2 ti = floor(tp); vec2 tf = fract(tp);
    if(hash21(ti) < 0.5) tf.x = 1.0 - tf.x;
    float dd = min(abs(length(tf) - 0.5), abs(length(tf - vec2(1.0)) - 0.5));
    v = sin(dd * 9.90 - t * 0.93 + ph);
    return v;
}
float fieldC(vec2 p, float t, float ph){
    float v;
    vec2 cp = p * 3.90;
    v = 0.5 * (sin(2.0 * cp.x + t * 1.93) * sin(3.0 * cp.y + ph)
             + sin(3.0 * cp.x - t * 1.05) * sin(2.0 * cp.y + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.90;
	vec2 q1 = p; vec2 q2 = p; vec2 q3 = p;
	{ float iv = dot(q1, q1) + 0.05; q1 = q1 / iv * 0.62; }
	q2 = rot2(time * -0.93) * q2;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.28);
	float d3 = fieldC(q3, time, 0.28);
	d2 = max(d2, d3);
	float d = 0.5 * (d1 + d2);
	vec3 col = palette(d * 0.75 + time * 0.07, vec3(0.44, 0.57, 0.41), vec3(0.39, 0.32, 0.34), vec3(0.83, 1.18, 0.86), vec3(0.30, 0.90, 0.85));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
