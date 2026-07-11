uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float fieldA(vec2 p, float t, float ph){
    float v;
    float ms = 0.0;
    for(int mi = 0; mi < 9; mi++){ float mf = float(mi);
        vec2 mm = vec2(sin(t * 2.03 * sin(mf + 3.0) + ph), cos(t * 0.31 * cos(mf + 3.0) + ph));
        ms += 0.071 / length(p - mm); }
    v = ms / (1.0 + abs(ms)) * 2.0 - 1.0;
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float ms = 0.0;
    for(int mi = 0; mi < 13; mi++){ float mf = float(mi);
        vec2 mm = vec2(sin(t * 0.38 * sin(mf + 3.0) + ph), cos(t * 0.79 * cos(mf + 3.0) + ph));
        ms += 0.037 / length(p - mm); }
    v = ms / (1.0 + abs(ms)) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.09;
	vec2 q1 = p; vec2 q2 = p;
	q1 = abs(q1) - 0.24;
	{ float ka = atan(q1.y, q1.x); float kr = length(q1); float kn = 8.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); q1 = kr * vec2(cos(ka), sin(ka)); }
	q2 = rot2(length(q2) * -3.69 + time * 1.46) * q2;
	q2 *= 3.05;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.32);
	float d = abs(d1 - d2);
	vec3 col = vec3(0.58, 0.52, 0.33) * (0.19 / (abs(d) + 0.08));
	col = col / (1.0 + col);
	col = fract(col * 1.62);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
