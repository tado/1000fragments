uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }

float fieldA(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    float petal = 0.40 + 0.13 * cos(sa * 8.0 + t * 1.88 + ph);
    v = sin((sr - petal) * 8.56);
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    vec2 zp = p * 5.49;
    vec2 zi = floor(zp); vec2 zf = fract(zp) - 0.5;
    if(hash21(zi + floor(t * 1.17)) < 0.5) zf.x = -zf.x;
    float zd = abs(zf.x + zf.y) * 0.7071068;
    v = sin(zd * 19.00 - t * 6.17 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.34;
	vec2 q1 = p; vec2 q2 = p;
	q1 = rot2(q1.y * -1.79 + time * 1.07) * q1;
	{ float ka = atan(q2.y, q2.x); float kr = length(q2); float kn = 4.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); q2 = kr * vec2(cos(ka), sin(ka)); }
	q2 += vec2(-0.50, 0.93) * sin(length(q2) * 5.01 - time * 1.27) * 0.22;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.58);
	float d = min(d1, d2);
	vec3 col = vec3(0.36, 0.45, 0.55) * (0.12 / (abs(d) + 0.07));
	col = col / (1.0 + col);
	col = floor(clamp(col, 0.0, 1.0) * 7.0) / 7.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
