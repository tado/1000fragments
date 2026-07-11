uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }

float fieldA(vec2 p, float t, float ph){
    float v;
    vec2 tp = p * 4.83; vec2 ti = floor(tp); vec2 tf = fract(tp);
    if(hash21(ti) < 0.5) tf.x = 1.0 - tf.x;
    float dd = min(abs(length(tf) - 0.5), abs(length(tf - vec2(1.0)) - 0.5));
    v = sin(dd * 29.53 - t * 2.66 + ph);
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 3.02 + t * 3.05 + ph) + sin(p.y * 7.94 - t * 3.05 + ph)
        + sin((p.x + p.y) * 5.81 + t * 3.05 + ph) + sin(length(p) * 10.53 - t * 3.05 + ph));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec2 q1 = p; vec2 q2 = p;
	q1 = rot2(time * -1.53) * q1;
	q1 = abs(q1);
	for(int fo = 0; fo < 3; fo++){ q2 = abs(q2) - 0.35; q2 = rot2(1.88) * q2; }
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.02);
	float d = abs(d1 - d2);
	float cc = clamp(0.5 + 0.5 * d, 0.0, 1.0);
	vec3 col = mix(vec3(0.21, 0.19, 0.11), vec3(0.94, 0.86, 0.49), cc);
	col *= 0.89 + 0.20 * sin(gl_FragCoord.y * 1.15 + time * 15.68);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
