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
    vec2 mc = p * (1.28 + 0.22 * sin(t * 0.92)) + vec2(-0.42, -0.17) + 0.02 * vec2(sin(ph), cos(ph));
    vec2 z = vec2(0.0);
    float mit = 0.0;
    for(int mi = 0; mi < 27; mi++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + mc; if(dot(z, z) > 4.0) break; mit += 1.0; }
    v = mit / 27.0 * 2.0 - 1.0;
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float zx = abs(fract(p.x * 3.57 + t * 0.37) - 0.5) * 2.0;
    v = sin((p.y * 4.55 + zx * 1.29 + t * 0.80) * 3.1415927 + ph);
    return v;
}
float fieldC(vec2 p, float t, float ph){
    float v;
    vec2 wq = vec2(vnoise2(p * 3.47 + ph), vnoise2(p * 3.47 + vec2(5.2, 1.3) + ph));
    vec2 wr = vec2(vnoise2(p * 3.47 + 3.44 * wq + vec2(1.7, 9.2) + t * 0.39),
                   vnoise2(p * 3.47 + 3.37 * wq + vec2(8.3, 2.8) - t * 0.65));
    v = vnoise2(p * 3.47 + 1.84 * wr) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x = abs(p.x) - 0.59;
	p.x *= resolution.x / resolution.y;
	vec2 q1 = p; vec2 q2 = p; vec2 q3 = p;
	q1 = rot2(2.26) * q1;
	q2 = rot2(0.59) * q2;
	{ q2 = vec2(atan(q2.y, q2.x) * 1.45, length(q2) * 4.66 - (time * 0.55) * 0.81); }
	float d1 = fieldA(q1, (time * 0.55), 0.0);
	float d2 = fieldB(q2, (time * 0.55), 0.61);
	float d3 = fieldC(q3, (time * 0.55), 0.83);
	d2 = d2 * d3;
	float d = 0.5 * (d1 + d2);
	vec3 col = vec3(0.5 + 0.5 * (d)) * vec3(0.49, 0.52, 0.59) + vec3(0.01, 0.00, 0.02);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.64);
	col = clamp(col, 0.0, 1.0) * vec3(0.982, 1.029, 0.927) * 1.00 + 0.030;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
