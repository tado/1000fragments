uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }

float fieldA(vec2 p, float t, float ph){
    float v;
    vec2 tp = p * 4.07; vec2 ti = floor(tp); vec2 tf = fract(tp);
    if(hash21(ti) < 0.5) tf.x = 1.0 - tf.x;
    float dd = min(abs(length(tf) - 0.5), abs(length(tf - vec2(1.0)) - 0.5));
    v = sin(dd * 23.68 - t * 0.63 + ph);
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float xs = 0.0;
    for(int xi = 1; xi < 6; xi++){ float jf = float(xi);
        vec2 im = vec2(sin(t * 0.97 + jf * 4.0), cos(t * 0.45 * jf)) * 0.86;
        xs += sin(length(p - im) * 121.32 - t * 10.47 + ph) * 0.5; }
    v = xs / (1.0 + abs(xs));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.16;
	vec2 q1 = p; vec2 q2 = p;
	q1 = rot2(length(q1) * 3.18 + time * 0.66) * q1;
	q1 = (floor(q1 * 17.5) + 0.5) / 17.5;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.90);
	float d = max(d1, d2);
	vec3 col = vec3(0.30, 0.77, 0.46) * (0.11 / (abs(d) + 0.04));
	col = col / (1.0 + col);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
