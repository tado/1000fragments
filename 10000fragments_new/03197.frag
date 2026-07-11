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
    v = 0.25 * (sin(p.x * 9.63 + t * 3.37 + ph) + sin(p.y * 2.13 - t * 3.37 + ph)
        + sin((p.x + p.y) * 6.40 + t * 3.37 + ph) + sin(length(p) * 5.49 - t * 3.37 + ph));
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    vec2 wq = vec2(vnoise2(p * 3.27 + ph), vnoise2(p * 3.27 + vec2(5.2, 1.3) + ph));
    vec2 wr = vec2(vnoise2(p * 3.27 + 3.50 * wq + vec2(1.7, 9.2) + t * 0.49),
                   vnoise2(p * 3.27 + 1.75 * wq + vec2(8.3, 2.8) - t * 0.43));
    v = vnoise2(p * 3.27 + 1.95 * wr) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 0.86;
	vec2 q1 = p; vec2 q2 = p;
	q1 = rot2(length(q1) * -2.68 + time * 1.13) * q1;
	q2 = rot2(2.50) * q2;
	q2 += vec2(0.14, -0.73) * sin(length(q2) * 5.14 - time * 1.27) * 0.27;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.22);
	float d = abs(d1 - d2);
	vec3 col = vec3(0.60, 0.61, 0.81) * (0.15 / (abs(d) + 0.03));
	col = col / (1.0 + col);
	col = floor(clamp(col, 0.0, 1.0) * 5.0) / 5.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
