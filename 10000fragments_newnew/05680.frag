uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
float vnoise2(vec2 p){
    vec2 i = floor(p), f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(mix(hash21(i + vec2(0.0, 0.0)), hash21(i + vec2(1.0, 0.0)), u.x),
               mix(hash21(i + vec2(0.0, 1.0)), hash21(i + vec2(1.0, 1.0)), u.x), u.y);
}

float fieldA(vec2 p, float t, float ph){
    float v;
    vec2 tp = p * 8.39; vec2 ti = floor(tp); vec2 tf = fract(tp);
    if(hash21(ti) < 0.5) tf.x = 1.0 - tf.x;
    float dd = min(abs(length(tf) - 0.5), abs(length(tf - vec2(1.0)) - 0.5));
    v = sin(dd * 12.61 - t * 3.53 + ph);
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    vec2 cp = p * 2.62;
    v = 0.5 * (sin(5.0 * cp.x + t * 2.00) * sin(5.0 * cp.y + ph)
             + sin(5.0 * cp.x - t * 0.78) * sin(5.0 * cp.y + ph));
    return v;
}
float fieldC(vec2 p, float t, float ph){
    float v;
    float rv = 0.0; float ra = 0.5; vec2 rq = p * 2.77;
    for(int ri = 0; ri < 4; ri++){ rv += ra * vnoise2(rq + t * 0.78); rq = rq * 2.1 + 3.7; ra *= 0.55; }
    v = smoothstep(0.39, 0.55, rv + 0.09 * sin(t * 0.80 + ph)) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 0.95;
	vec2 q1 = p; vec2 q2 = p; vec2 q3 = p;
	{ q3 = vec2(atan(q3.y, q3.x) * 2.26, length(q3) * 5.37 - time * 0.50); }
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.95);
	float d3 = fieldC(q3, time, 1.73);
	d2 = 0.5 * (d2 + d3);
	float d = 0.5 * (d1 + d2);
	vec3 col = vec3(0.62, 0.40, 0.66) * (0.15 / (abs(d) + 0.04));
	col = col / (1.0 + col);
	col = floor(clamp(col, 0.0, 1.0) * 7.0) / 7.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
