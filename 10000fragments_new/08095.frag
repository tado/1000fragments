uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float fieldA(vec2 p, float t, float ph){
    float v;
    vec2 zp = p * 8.80;
    vec2 zi = floor(zp); vec2 zf = fract(zp) - 0.5;
    if(hash21(zi + floor(t * 1.12)) < 0.5) zf.x = -zf.x;
    float zd = abs(zf.x + zf.y) * 0.7071068;
    v = sin(zd * 29.65 - t * 7.13 + ph);
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 12.42 + vec2(t * 2.91, -t * 2.91) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.07;
	vec2 q1 = p; vec2 q2 = p;
	q1 = rot2(length(q1) * 1.71 + time * 1.22) * q1;
	q1 += vec2(0.70, 0.43) * sin(length(q1) * 5.02 - time * 2.15) * 0.18;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.53);
	float d = mix(d1, d2, 0.5 + 0.5 * sin(time * 0.80));
	vec3 col = palette(d * 1.44 + time * 0.09, vec3(0.44, 0.46, 0.42), vec3(0.41, 0.47, 0.49), vec3(0.70, 1.27, 0.94), vec3(0.91, 0.48, 0.38));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
