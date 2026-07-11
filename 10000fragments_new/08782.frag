uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float fieldA(vec2 p, float t, float ph){
    float v;
    vec2 tp = p * 7.86; vec2 ti = floor(tp); vec2 tf = fract(tp);
    if(hash21(ti) < 0.5) tf.x = 1.0 - tf.x;
    float dd = min(abs(length(tf) - 0.5), abs(length(tf - vec2(1.0)) - 0.5));
    v = sin(dd * 12.76 - t * 3.88 + ph);
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float wa = sin(p.x * 11.04 + t * 0.83 + ph) * 0.7;
    float wb = sin(p.y * 17.01 - t * 3.18 + ph) * 0.7;
    v = max(wa, wb) + min(wa, wb) * 0.25;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.44;
	vec2 q1 = p; vec2 q2 = p;
	{ q1 = vec2(atan(q1.y, q1.x) * 1.41, length(q1) * 3.29 - time * 0.55); }
	for(int wi = 0; wi < 5; wi++){ float wf = float(wi) + 1.0; q2.x += 0.29 / wf * sin(wf * 3.80 * q2.y + time * 2.06); q2.y += 0.45 / wf * cos(wf * 3.44 * q2.x + time * 1.53); }
	q2 = rot2(0.31) * q2;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.92);
	float d = abs(d1 - d2);
	vec3 col = hue(d * 1.27 + time * 0.30);
	col = mod(col * 2.34, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
