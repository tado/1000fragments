uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }

float fieldA(vec2 p, float t, float ph){
    float v;
    float zx = abs(fract(p.x * 3.74 + t * 1.22) - 0.5) * 2.0;
    v = sin((p.y * 6.31 + zx * 0.73 + t * 1.77) * 3.1415927 + ph);
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    vec2 tp = p * 9.27; vec2 ti = floor(tp); vec2 tf = fract(tp);
    if(hash21(ti) < 0.5) tf.x = 1.0 - tf.x;
    float dd = min(abs(length(tf) - 0.5), abs(length(tf - vec2(1.0)) - 0.5));
    v = sin(dd * 29.42 - t * 3.06 + ph);
    return v;
}
float fieldC(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 10.63 + t * 5.67 + ph) + sin(p.y * 6.22 - t * 0.91 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.38;
	vec2 q1 = p; vec2 q2 = p; vec2 q3 = p;
	q1.y += sin(q1.x * 5.54 + (time * 0.71) * 3.95) * 0.30;
	q1 = rot2((time * 0.71) * 1.40) * q1;
	q2 = rot2(0.82) * q2;
	q3 *= 1.63;
	float d1 = fieldA(q1, (time * 0.71), 0.0);
	float d2 = fieldB(q2, (time * 0.71), 0.46);
	float d3 = fieldC(q3, (time * 0.71), 1.54);
	d2 = 0.5 * (d2 + d3);
	float d = min(d1, d2);
	float cc = clamp(0.5 + 0.5 * (d), 0.0, 1.0);
	vec3 col = mix(vec3(0.035, 0.118, 0.140), vec3(1.000, 0.762, 0.583), smoothstep(0.0, 1.0, cc));
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.48);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.20);
	col *= vec3(1.017, 0.966, 1.011);
	col += 0.014;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.29 * dot(fq, fq);
	col += (hash21(gl_FragCoord.xy + fract(time) * 240.0) - 0.5) * 0.026;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
