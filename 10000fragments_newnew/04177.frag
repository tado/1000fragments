uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }

float fieldA(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 5.04 + t * 4.83 + ph) + sin(p.y * 2.36 - t * 1.52 + ph));
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    vec2 tp = p * 6.14; vec2 ti = floor(tp); vec2 tf = fract(tp);
    if(hash21(ti) < 0.5) tf.x = 1.0 - tf.x;
    float dd = min(abs(length(tf) - 0.5), abs(length(tf - vec2(1.0)) - 0.5));
    v = sin(dd * 11.13 - t * 3.93 + ph);
    return v;
}
float fieldC(vec2 p, float t, float ph){
    float v;
    vec2 pk = p * 4.75;
    pk.x += step(0.5, fract(pk.y * 0.5)) * 0.5;
    vec2 pf = fract(pk) - 0.5;
    float rad = 0.34 + 0.09 * sin(t * 4.41 + floor(pk.y) * 1.7 + ph);
    v = (1.0 - smoothstep(rad - 0.1, rad, length(pf))) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	vec2 q1 = p; vec2 q2 = p; vec2 q3 = p;
	q1 *= 1.0 + 0.27 * sin(time * 3.29);
	{ float ka = atan(q1.y, q1.x); float kr = length(q1); float kn = 3.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); q1 = kr * vec2(cos(ka), sin(ka)); }
	q2 = vec2(q2.x * q2.x - q2.y * q2.y, 2.0 * q2.x * q2.y) * 0.77;
	{ float ka = atan(q3.y, q3.x); float kr = length(q3); float kn = 7.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); q3 = kr * vec2(cos(ka), sin(ka)); }
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.88);
	float d3 = fieldC(q3, time, 1.77);
	d2 = d2 * d3;
	float d = abs(d1 - d2);
	float cc = clamp(0.5 + 0.5 * d, 0.0, 1.0);
	vec3 col = mix(vec3(0.15, 0.08, 0.45), vec3(0.88, 0.95, 0.47), cc);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
