uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
float vnoise2(vec2 p){
    vec2 i = floor(p), f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(mix(hash21(i + vec2(0.0, 0.0)), hash21(i + vec2(1.0, 0.0)), u.x),
               mix(hash21(i + vec2(0.0, 1.0)), hash21(i + vec2(1.0, 1.0)), u.x), u.y);
}
vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float fieldA(vec2 p, float t, float ph){
    float v;
    float bx = p.x + (vnoise2(vec2(p.y * 1.77, t * 2.64)) - 0.5) * 0.86;
    v = exp(-abs(bx) * 8.01) * 2.0 - 1.0 + 0.0 * ph;
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    vec2 zp = p * 5.20;
    vec2 zi = floor(zp); vec2 zf = fract(zp) - 0.5;
    if(hash21(zi + floor(t * 2.19)) < 0.5) zf.x = -zf.x;
    float zd = abs(zf.x + zf.y) * 0.7071068;
    v = sin(zd * 29.24 - t * 3.32 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	vec2 q1 = p; vec2 q2 = p;
	q1 = rot2(1.43) * q1;
	{ q2 = vec2(atan(q2.y, q2.x) * 1.31, length(q2) * 2.40 - time * 0.48); }
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.12);
	float d = max(d1, d2);
	vec3 col = hue(d * 1.43 + time * 0.23);
	col = clamp((col - 0.5) * 1.49 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
