uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }

float fieldA(vec2 p, float t, float ph){
    float v;
    vec2 tp = p * 4.04; vec2 ti = floor(tp); vec2 tf = fract(tp);
    if(hash21(ti) < 0.5) tf.x = 1.0 - tf.x;
    float dd = min(abs(length(tf) - 0.5), abs(length(tf - vec2(1.0)) - 0.5));
    v = sin(dd * 21.99 - t * 3.23 + ph);
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float ms = 0.0;
    for(int mi = 0; mi < 12; mi++){ float mf = float(mi);
        vec2 mm = vec2(sin(t * 1.04 * sin(mf + 3.0) + ph), cos(t * 2.35 * cos(mf + 3.0) + ph));
        ms += 0.041 / length(p - mm); }
    v = ms / (1.0 + abs(ms)) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.44;
	vec2 q1 = p; vec2 q2 = p;
	q1 += vec2(-0.09, 0.89) * sin(length(q1) * 3.16 - time * 1.15) * 0.36;
	q1 = rot2(1.25) * q1;
	q2 = rot2(q2.y * -1.96 + time * 0.52) * q2;
	q2 = rot2(time * -1.11) * q2;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.27);
	float d = d1 * d2;
	vec3 col = vec3(0.57, 0.41, 0.42) * (0.08 / (abs(d) + 0.04));
	col = col / (1.0 + col);
	col = clamp((col - 0.5) * 1.81 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
