uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }

float fieldA(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 6.79 + t * 1.02 + ph) + sin(p.y * 7.12 - t * 1.02 + ph)
        + sin((p.x + p.y) * 7.47 + t * 1.02 + ph) + sin(length(p) * 14.69 - t * 1.02 + ph));
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float grow = floor(p.y * 18.98);
    float gsh = hash21(vec2(grow, floor(t * 9.71))) - 0.5;
    float gx = p.x + gsh * 1.03;
    v = sin(gx * 19.53 + ph) * (0.6 + 0.4 * sin(grow * 1.7 + t * 3.37));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	vec2 q1 = p; vec2 q2 = p;
	q1.y += sin(q1.x * 5.72 + time * 3.13) * 0.17;
	q1 = rot2(1.33) * q1;
	{ float ka = atan(q2.y, q2.x); float kr = length(q2); float kn = 3.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); q2 = kr * vec2(cos(ka), sin(ka)); }
	q2 = abs(q2);
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.90);
	float d = abs(d1 - d2);
	vec3 col = vec3(0.66, 0.19, 0.26) * (0.13 / (abs(d) + 0.05));
	col = col / (1.0 + col);
	col = fract(col * 2.27);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
