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
    vec2 wq = vec2(vnoise2(p * 3.02 + ph), vnoise2(p * 3.02 + vec2(5.2, 1.3) + ph));
    vec2 wr = vec2(vnoise2(p * 3.02 + 2.54 * wq + vec2(1.7, 9.2) + t * 0.45),
                   vnoise2(p * 3.02 + 1.97 * wq + vec2(8.3, 2.8) - t * 0.94));
    v = vnoise2(p * 3.02 + 1.39 * wr) * 2.0 - 1.0;
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    vec2 mc = p * (1.52 + 0.44 * sin(t * 0.70)) + vec2(-0.51, -0.27) + 0.02 * vec2(sin(ph), cos(ph));
    vec2 z = vec2(0.0);
    float mit = 0.0;
    for(int mi = 0; mi < 31; mi++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + mc; if(dot(z, z) > 4.0) break; mit += 1.0; }
    v = mit / 31.0 * 2.0 - 1.0;
    return v;
}
float fieldC(vec2 p, float t, float ph){
    float v;
    vec2 tp = p * 7.29; vec2 ti = floor(tp); vec2 tf = fract(tp);
    if(hash21(ti) < 0.5) tf.x = 1.0 - tf.x;
    float dd = min(abs(length(tf) - 0.5), abs(length(tf - vec2(1.0)) - 0.5));
    v = sin(dd * 23.03 - t * 3.46 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 0.98;
	vec2 q1 = p; vec2 q2 = p; vec2 q3 = p;
	q2.x += sin(q2.y * 5.15 + time * 2.43) * 0.17;
	{ float fr = length(q3); q3 *= 1.0 + 0.76 * fr * fr; }
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.07);
	float d3 = fieldC(q3, time, 0.05);
	d2 = 0.5 * (d2 + d3);
	float d = abs(d1 - d2);
	float cc = clamp(0.5 + 0.5 * d, 0.0, 1.0);
	vec3 col = mix(vec3(0.07, 0.39, 0.15), vec3(0.61, 0.79, 0.43), cc);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
