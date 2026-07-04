uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }

float fieldA(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 8.10 + t * 3.94 + ph) + sin(p.y * 8.99 - t * 0.79 + ph));
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    vec2 tp = p * 3.17; vec2 ti = floor(tp); vec2 tf = fract(tp);
    if(hash21(ti) < 0.5) tf.x = 1.0 - tf.x;
    float dd = min(abs(length(tf) - 0.5), abs(length(tf - vec2(1.0)) - 0.5));
    v = sin(dd * 28.76 - t * 2.02 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec2 q1 = p; vec2 q2 = p;
	for(int wi = 0; wi < 2; wi++){ float wf = float(wi) + 1.0; q1.x += 0.28 / wf * sin(wf * 2.63 * q1.y + time * 1.06); q1.y += 0.27 / wf * cos(wf * 2.41 * q1.x + time * 1.31); }
	q1 = rot2(time * -0.48) * q1;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.52);
	float d = d1 * d2;
	vec3 col = vec3(0.78, 0.45, 0.46) * (0.18 / (abs(d) + 0.09));
	col = col / (1.0 + col);
	col = mod(col * 2.51, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
