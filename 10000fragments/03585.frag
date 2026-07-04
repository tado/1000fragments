uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }

float fieldA(vec2 p, float t, float ph){
    float v;
    vec2 dp = fract(p * 7.63) - 0.5;
    float rad = 0.22 + 0.12 * sin(t * 2.50 + ph);
    v = (1.0 - smoothstep(0.0, rad, length(dp))) * 2.0 - 1.0;
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float ga = atan(p.y, p.x); float gr = length(p) + 0.001;
    float arm = sin(log(gr) * 5.71 + ga * 2.0 - t * 2.91 + ph);
    v = arm * exp(-gr * 1.40);
    return v;
}
float fieldC(vec2 p, float t, float ph){
    float v;
    vec2 tp = p * 8.51; vec2 ti = floor(tp); vec2 tf = fract(tp);
    if(hash21(ti) < 0.5) tf.x = 1.0 - tf.x;
    float dd = min(abs(length(tf) - 0.5), abs(length(tf - vec2(1.0)) - 0.5));
    v = sin(dd * 11.08 - t * 3.04 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.33;
	vec2 q1 = p; vec2 q2 = p; vec2 q3 = p;
	q1 = fract(q1 * 1.04) - 0.5;
	q2 *= 1.0 + 0.16 * sin(time * 4.02);
	q2 = rot2(q2.y * -3.03 + time * 1.04) * q2;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.30);
	float d3 = fieldC(q3, time, 0.45);
	d2 = min(d2, d3);
	float d = max(d1, d2);
	vec3 col = vec3(0.5 + 0.5 * d) * vec3(0.84, 1.28, 0.63) + vec3(0.05, 0.17, 0.04);
	vec2 vg = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.87 * dot(vg, vg);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
