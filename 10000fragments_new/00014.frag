uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }

float fieldA(vec2 p, float t, float ph){
    float v;
    vec2 z = p * 0.95; vec2 jc = vec2(-0.55 + 0.3 * sin(t * 1.15 + ph), -0.21 + 0.3 * cos(t * 0.84 + ph));
    float jit = 0.0;
    for(int ji = 0; ji < 34; ji++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + jc; if(dot(z, z) > 4.0) break; jit += 1.0; }
    v = jit / 34.0 * 2.0 - 1.0;
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    vec2 tp = p * 8.85; vec2 ti = floor(tp); vec2 tf = fract(tp);
    if(hash21(ti) < 0.5) tf.x = 1.0 - tf.x;
    float dd = min(abs(length(tf) - 0.5), abs(length(tf - vec2(1.0)) - 0.5));
    v = sin(dd * 29.35 - t * 2.05 + ph);
    return v;
}
float fieldC(vec2 p, float t, float ph){
    float v;
    float md = 10.0;
    for(int li = 0; li < 24; li++){ float lt = float(li) * 0.2617994;
        vec2 lp = vec2(sin(lt * 1.0 + t * 1.10 + ph), sin(lt * 4.0 + t * 0.52)) * 0.55;
        md = min(md, length(p - lp)); }
    v = exp(-md * 9.13) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.25;
	vec2 q1 = p; vec2 q2 = p; vec2 q3 = p;
	q1 = rot2(length(q1) * -1.96 + time * 1.37) * q1;
	q1 = rot2(time * -0.41) * q1;
	q2 *= 2.18;
	q2 += vec2(0.29, -0.51) * sin(length(q2) * 5.79 - time * 2.06) * 0.18;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.39);
	float d3 = fieldC(q3, time, 1.75);
	d2 = min(d2, d3);
	float d = min(d1, d2);
	vec3 col = vec3(0.18, 0.87, 0.62) * (0.19 / (abs(d) + 0.10));
	col = col / (1.0 + col);
	col *= 0.88 + 0.16 * sin(gl_FragCoord.y * 2.91 + time * 12.54);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
