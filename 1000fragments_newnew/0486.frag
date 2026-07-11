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
    vec2 wq = vec2(vnoise2(p * 3.99 + ph), vnoise2(p * 3.99 + vec2(5.2, 1.3) + ph));
    vec2 wr = vec2(vnoise2(p * 3.99 + 1.52 * wq + vec2(1.7, 9.2) + t * 0.88),
                   vnoise2(p * 3.99 + 3.52 * wq + vec2(8.3, 2.8) - t * 0.76));
    v = vnoise2(p * 3.99 + 2.22 * wr) * 2.0 - 1.0;
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    vec2 mc = p * (1.18 + 0.26 * sin(t * 1.58)) + vec2(-0.41, -0.17) + 0.02 * vec2(sin(ph), cos(ph));
    vec2 z = vec2(0.0);
    float mit = 0.0;
    for(int mi = 0; mi < 25; mi++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + mc; if(dot(z, z) > 4.0) break; mit += 1.0; }
    v = mit / 25.0 * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.11;
	vec2 q1 = p; vec2 q2 = p;
	q1 = abs(q1);
	q2 = rot2((time * 0.52) * 0.63) * q2;
	float d1 = fieldA(q1, (time * 0.52), 0.0);
	float d2 = fieldB(q2, (time * 0.52), 1.71);
	float d = 0.5 * (d1 + d2);
	vec3 col = vec3(0.75, 0.74, 0.66) * (0.06 / (abs((d)) + 0.07));
	col = col / (1.0 + col);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.49);
	col = clamp(col, 0.0, 1.0) * vec3(0.917, 0.972, 1.024) * 1.00 + 0.044;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
