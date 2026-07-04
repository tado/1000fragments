uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }

float fieldA(vec2 p, float t, float ph){
    float v;
    float qa = atan(p.y, p.x);
    float qr = length(p);
    v = sin(qa * 4.0 + qr * 2.96 * sin(t * 0.99) + t * 3.39 + ph);
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    vec2 tp = p * 4.83; vec2 ti = floor(tp); vec2 tf = fract(tp);
    if(hash21(ti) < 0.5) tf.x = 1.0 - tf.x;
    float dd = min(abs(length(tf) - 0.5), abs(length(tf - vec2(1.0)) - 0.5));
    v = sin(dd * 22.99 - t * 3.04 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	vec2 q1 = p; vec2 q2 = p;
	for(int wi = 0; wi < 5; wi++){ float wf = float(wi) + 1.0; q1.x += 0.28 / wf * sin(wf * 3.26 * q1.y + time * 2.16); q1.y += 0.35 / wf * cos(wf * 2.44 * q1.x + time * 2.14); }
	q2 = fract(q2 * 1.62) - 0.5;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.38);
	float d = 0.5 * (d1 + d2);
	vec3 col = vec3(0.5 + 0.5 * d) * vec3(1.32, 1.09, 0.54) + vec3(0.24, 0.22, 0.04);
	col = pow(clamp(col, 0.0, 1.0), vec3(1.24));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
