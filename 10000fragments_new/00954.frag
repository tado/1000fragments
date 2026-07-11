uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }

float fieldA(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 32.86 - t * 3.15 + ph);
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    vec2 zp = p * 3.85;
    vec2 zi = floor(zp); vec2 zf = fract(zp) - 0.5;
    if(hash21(zi + floor(t * 1.33)) < 0.5) zf.x = -zf.x;
    float zd = abs(zf.x + zf.y) * 0.7071068;
    v = sin(zd * 10.38 - t * 3.67 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.47;
	vec2 q1 = p; vec2 q2 = p;
	q1 = rot2(length(q1) * -3.19 + time * 0.69) * q1;
	q2 = rot2(q2.y * -1.43 + time * 0.99) * q2;
	{ float lr = log(length(q2) + 0.001); float la = atan(q2.y, q2.x); q2 = vec2(la * 1.46, lr * 1.75 + time * 0.27); }
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.75);
	float d = 0.5 * (d1 + d2);
	float cc = clamp(0.5 + 0.5 * d, 0.0, 1.0);
	vec3 col = mix(vec3(0.39, 0.05, 0.37), vec3(0.72, 0.84, 0.89), cc);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
