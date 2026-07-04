uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float fieldA(vec2 p, float t, float ph){
    float v;
    vec2 tp = p * 7.17; vec2 ti = floor(tp); vec2 tf = fract(tp);
    if(hash21(ti) < 0.5) tf.x = 1.0 - tf.x;
    float dd = min(abs(length(tf) - 0.5), abs(length(tf - vec2(1.0)) - 0.5));
    v = sin(dd * 12.85 - t * 0.55 + ph);
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    vec2 zp = p * 3.53;
    vec2 zi = floor(zp); vec2 zf = fract(zp) - 0.5;
    if(hash21(zi + floor(t * 2.89)) < 0.5) zf.x = -zf.x;
    float zd = abs(zf.x + zf.y) * 0.7071068;
    v = sin(zd * 20.77 - t * 2.61 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.28;
	vec2 q1 = p; vec2 q2 = p;
	q1 = (floor(q1 * 25.6) + 0.5) / 25.6;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.20);
	float d = abs(d1 - d2);
	vec3 col = hue(d * 0.99 + time * 0.05);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
