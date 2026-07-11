uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }

float fieldA(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 19.47 + sin(p.y * 5.03 + t * 5.92) * 2.09 + ph);
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    vec2 tp = p * 5.43; vec2 ti = floor(tp); vec2 tf = fract(tp);
    if(hash21(ti) < 0.5) tf.x = 1.0 - tf.x;
    float dd = min(abs(length(tf) - 0.5), abs(length(tf - vec2(1.0)) - 0.5));
    v = sin(dd * 15.06 - t * 0.62 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec2 q1 = p; vec2 q2 = p;
	{ q1 = vec2(atan(q1.y, q1.x) * 1.97, length(q1) * 4.26 - time * 1.00); }
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.57);
	float d = mix(d1, d2, 0.5 + 0.5 * sin(time * 1.00));
	float cc = clamp(0.5 + 0.5 * d, 0.0, 1.0);
	vec3 col = mix(vec3(0.03, 0.11, 0.11), vec3(0.93, 0.68, 0.64), cc);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
