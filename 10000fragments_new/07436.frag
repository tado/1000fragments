uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float fieldA(vec2 p, float t, float ph){
    float v;
    float xs = 0.0;
    for(int xi = 1; xi < 8; xi++){ float jf = float(xi);
        vec2 im = vec2(sin(t * 0.54 + jf * 4.0), cos(t * 0.24 * jf)) * 0.42;
        xs += sin(length(p - im) * 133.56 - t * 5.14 + ph) * 0.5; }
    v = xs / (1.0 + abs(xs));
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 10.42 + sin(p.y * 4.40 + t * 5.69) * 3.31 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	vec2 q1 = p; vec2 q2 = p;
	q1 = rot2(1.50) * q1;
	q2 = rot2(time * -1.52) * q2;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.56);
	float d = d1 * d2;
	vec3 col = palette(d * 0.59 + time * 0.35, vec3(0.52, 0.58, 0.44), vec3(0.32, 0.34, 0.31), vec3(0.85, 1.39, 0.72), vec3(0.35, 0.07, 0.83));
	col = mod(col * 2.41, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
