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

float fieldA(vec2 p, float t, float ph){
    float v;
    float bx = p.x + (vnoise2(vec2(p.y * 3.09, t * 1.17)) - 0.5) * 1.01;
    v = exp(-abs(bx) * 11.01) * 2.0 - 1.0 + 0.0 * ph;
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float xs = 0.0;
    for(int xi = 1; xi < 8; xi++){ float jf = float(xi);
        vec2 im = vec2(sin(t * 0.43 + jf * 4.0), cos(t * 0.39 * jf)) * 0.98;
        xs += sin(length(p - im) * 197.29 - t * 6.89 + ph) * 0.5; }
    v = xs / (1.0 + abs(xs));
    return v;
}
float fieldC(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 10.67 + t * 3.58 + ph) + sin(p.y * 13.38 - t * 3.58 + ph)
        + sin((p.x + p.y) * 6.14 + t * 3.58 + ph) + sin(length(p) * 7.13 - t * 3.58 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 0.83;
	vec2 q1 = p; vec2 q2 = p; vec2 q3 = p;
	q1 = rot2(length(q1) * -2.84 + time * 1.40) * q1;
	q1 = rot2(1.38) * q1;
	q2 = (floor(q2 * 29.6) + 0.5) / 29.6;
	q2 += vec2(0.60, -0.59) * sin(length(q2) * 3.16 - time * 2.33) * 0.26;
	q3 = (floor(q3 * 19.8) + 0.5) / 19.8;
	{ float iv = dot(q3, q3) + 0.05; q3 = q3 / iv * 0.44; }
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.23);
	float d3 = fieldC(q3, time, 0.05);
	d2 = min(d2, d3);
	float d = max(d1, d2);
	float cc = clamp(0.5 + 0.5 * d, 0.0, 1.0);
	vec3 col = mix(vec3(0.20, 0.24, 0.53), vec3(0.74, 0.87, 0.70), cc);
	col = pow(clamp(col, 0.0, 1.0), vec3(0.91));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
