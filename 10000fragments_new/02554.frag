uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }

float fieldA(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 25.80 + sin(p.y * 4.21 + t * 3.06) * 2.63 + ph);
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float xs = 0.0;
    for(int xi = 1; xi < 9; xi++){ float jf = float(xi);
        vec2 im = vec2(sin(t * 0.65 + jf * 4.0), cos(t * 0.45 * jf)) * 0.53;
        xs += sin(length(p - im) * 172.57 - t * 10.14 + ph) * 0.5; }
    v = xs / (1.0 + abs(xs));
    return v;
}
float fieldC(vec2 p, float t, float ph){
    float v;
    vec2 tp = p * 5.56; vec2 ti = floor(tp); vec2 tf = fract(tp);
    if(hash21(ti) < 0.5) tf.x = 1.0 - tf.x;
    float dd = min(abs(length(tf) - 0.5), abs(length(tf - vec2(1.0)) - 0.5));
    v = sin(dd * 25.57 - t * 2.04 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.24;
	vec2 q1 = p; vec2 q2 = p; vec2 q3 = p;
	q2 = (floor(q2 * 19.2) + 0.5) / 19.2;
	{ q2 = vec2(atan(q2.y, q2.x) * 1.75, length(q2) * 3.08 - time * 0.39); }
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.64);
	float d3 = fieldC(q3, time, 0.17);
	d2 = d2 * d3;
	float d = abs(d1 - d2);
	vec3 col = vec3(0.94, 0.64, 0.82) * (0.20 / (abs(d) + 0.04));
	col = col / (1.0 + col);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
