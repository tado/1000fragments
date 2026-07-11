uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }

float fieldA(vec2 p, float t, float ph){
    float v;
    float qa = atan(p.y, p.x);
    float qr = length(p);
    v = sin(qa * 11.0 + qr * 2.38 * sin(t * 0.54) + t * 2.99 + ph);
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    vec2 tp = p * 6.88; vec2 ti = floor(tp); vec2 tf = fract(tp);
    if(hash21(ti) < 0.5) tf.x = 1.0 - tf.x;
    float dd = min(abs(length(tf) - 0.5), abs(length(tf - vec2(1.0)) - 0.5));
    v = sin(dd * 9.26 - t * 3.65 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.y += sin(p.x * 2.65 + (time * 0.65) * 0.86) * 0.11;
	p.x *= resolution.x / resolution.y;
	p *= 1.37;
	vec2 q1 = p; vec2 q2 = p;
	{ float fr = length(q1); q1 *= 1.0 + -0.60 * fr * fr; }
	q1 *= 1.0 + 0.38 * sin((time * 0.65) * 1.69);
	q2 = rot2(1.97) * q2;
	float d1 = fieldA(q1, (time * 0.65), 0.0);
	float d2 = fieldB(q2, (time * 0.65), 1.42);
	float d = max(d1, d2);
	vec3 col = vec3(0.56, 0.66, 0.58) * (0.10 / (abs((d)) + 0.07));
	col = col / (1.0 + col);
	col = floor(clamp(col, 0.0, 1.0) * 3.0) / 3.0;
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.17);
	col = clamp(col, 0.0, 1.0) * vec3(1.029, 0.984, 0.928) * 1.00 + 0.038;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
