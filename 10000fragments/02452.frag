uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }

float fieldA(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 2.84 + t * 0.99 + ph) + sin(p.y * 17.33 - t * 5.93 + ph));
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    vec2 zp = p * 8.38;
    vec2 zi = floor(zp); vec2 zf = fract(zp) - 0.5;
    if(hash21(zi + floor(t * 2.74)) < 0.5) zf.x = -zf.x;
    float zd = abs(zf.x + zf.y) * 0.7071068;
    v = sin(zd * 10.39 - t * 4.76 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	vec2 q1 = p; vec2 q2 = p;
	{ float iv = dot(q1, q1) + 0.05; q1 = q1 / iv * 0.38; }
	{ float ka = atan(q1.y, q1.x); float kr = length(q1); float kn = 5.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); q1 = kr * vec2(cos(ka), sin(ka)); }
	q2 = rot2(q2.y * -1.11 + time * 0.48) * q2;
	{ float fr = length(q2); q2 *= 1.0 + -0.76 * fr * fr; }
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.83);
	float d = max(d1, d2);
	vec3 col = 0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + d * 3.49 + time * 0.56);
	col += (hash21(gl_FragCoord.xy + fract(time) * 100.0) - 0.5) * 0.11;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
