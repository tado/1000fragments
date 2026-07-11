uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    vec3 col = a + b * cos(6.28318 * (c * t + d));
    return mix(vec3(dot(col, vec3(0.333, 0.334, 0.333))), col, 0.85);
}

float fieldA(vec2 p, float t, float ph){
    float v;
    vec2 zp = p * 8.24;
    vec2 zi = floor(zp); vec2 zf = fract(zp) - 0.5;
    if(hash21(zi + floor(t * 0.92)) < 0.5) zf.x = -zf.x;
    float zd = abs(zf.x + zf.y) * 0.7071068;
    v = sin(zd * 18.33 - t * 5.34 + ph);
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 10.25 + vec2(t * 1.93, -t * 2.92) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p.x += p.y * 0.33;
	p = p.yx;
	vec2 q1 = p; vec2 q2 = p;
	q1 = vec2(q1.x * q1.x - q1.y * q1.y, 2.0 * q1.x * q1.y) * 1.16;
	q1 += vec2(-0.95, -0.88) * sin(length(q1) * 5.95 - (time * 0.58) * 1.01) * 0.17;
	q2 = rot2(length(q2) * -3.30 + (time * 0.58) * 1.47) * q2;
	{ float iv = dot(q2, q2) + 0.05; q2 = q2 / iv * 0.38; }
	float d1 = fieldA(q1, (time * 0.58), 0.0);
	float d2 = fieldB(q2, (time * 0.58), 1.01);
	float d = abs(d1 - d2);
	vec3 col = palette((d) * 0.61 + (time * 0.58) * 0.03, vec3(0.25, 0.25, 0.27), vec3(0.27, 0.30, 0.23), vec3(0.62, 0.49, 0.52), vec3(0.67, 0.45, 0.43));
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.20);
	col = clamp(col, 0.0, 1.0) * vec3(1.021, 0.978, 1.009) * 1.00 + 0.030;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
