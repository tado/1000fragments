uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }

float fieldA(vec2 p, float t, float ph){
    float v;
    vec3 g = vec3(p * 6.22, t * 1.82 + ph);
    v = (sin(g.x) * cos(g.y) + sin(g.y) * cos(g.z) + sin(g.z) * cos(g.x)) * 0.5;
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float grow = floor(p.y * 8.99);
    float gsh = hash21(vec2(grow, floor(t * 5.87))) - 0.5;
    float gx = p.x + gsh * 0.55;
    v = sin(gx * 16.76 + ph) * (0.6 + 0.4 * sin(grow * 1.7 + t * 3.06));
    return v;
}
float fieldC(vec2 p, float t, float ph){
    float v;
    vec2 tp = p * 8.85; vec2 ti = floor(tp); vec2 tf = fract(tp);
    if(hash21(ti) < 0.5) tf.x = 1.0 - tf.x;
    float dd = min(abs(length(tf) - 0.5), abs(length(tf - vec2(1.0)) - 0.5));
    v = sin(dd * 22.01 - t * 2.41 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(sin((time * 0.73) * 0.38), cos((time * 0.73) * 0.69)) * 0.17;
	vec2 q1 = p; vec2 q2 = p; vec2 q3 = p;
	q2 = mix(q2, q2.yx, 0.5 + 0.5 * sin((time * 0.73) * 0.98));
	q2 = (floor(q2 * 7.6) + 0.5) / 7.6;
	{ float ka = atan(q3.y, q3.x); float kr = length(q3); float kn = 9.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); q3 = kr * vec2(cos(ka), sin(ka)); }
	{ float iv = dot(q3, q3) + 0.05; q3 = q3 / iv * 0.60; }
	float d1 = fieldA(q1, (time * 0.73), 0.0);
	float d2 = fieldB(q2, (time * 0.73), 0.80);
	float d3 = fieldC(q3, (time * 0.73), 0.64);
	d2 = min(d2, d3);
	float d = min(d1, d2);
	vec3 col = vec3(0.63, 0.72, 0.69) * (0.09 / (abs((d)) + 0.08));
	col = col / (1.0 + col);
	col = pow(clamp(col, 0.0, 1.0), vec3(1.15));
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.64);
	col = clamp(col, 0.0, 1.0) * vec3(1.027, 1.005, 0.910) * 1.00 + 0.028;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
