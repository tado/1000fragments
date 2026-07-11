uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }

float fieldA(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 7.53 + t * 4.37 + ph) + sin(p.y * 2.41 - t * 4.37 + ph)
        + sin((p.x + p.y) * 11.15 + t * 4.37 + ph) + sin(length(p) * 11.44 - t * 4.37 + ph));
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    vec2 tp = p * 7.15; vec2 ti = floor(tp); vec2 tf = fract(tp);
    if(hash21(ti) < 0.5) tf.x = 1.0 - tf.x;
    float dd = min(abs(length(tf) - 0.5), abs(length(tf - vec2(1.0)) - 0.5));
    v = sin(dd * 13.62 - t * 3.69 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.78;
	vec2 q1 = p; vec2 q2 = p;
	{ float fr = length(q1); q1 *= 1.0 + 0.75 * fr * fr; }
	for(int fo = 0; fo < 2; fo++){ q1 = abs(q1) - 0.58; q1 = rot2(2.59) * q1; }
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.54);
	float d = 0.5 * (d1 + d2);
	vec3 col = vec3(0.55, 0.44, 0.97) * (0.16 / (abs(d) + 0.04));
	col = col / (1.0 + col);
	col = mod(col * 2.30, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
