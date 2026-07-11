uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float fieldA(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.59, 0.0)) * 14.40 - t * 6.41 + ph);
    float mb = sin(length(p + vec2(0.59, 0.0)) * 12.95 - t * 4.46 + ph);
    v = ma * mb;
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float xs = 0.0;
    for(int xi = 1; xi < 4; xi++){ float jf = float(xi);
        vec2 im = vec2(sin(t * 0.20 + jf * 4.0), cos(t * 0.42 * jf)) * 0.84;
        xs += sin(length(p - im) * 207.66 - t * 7.58 + ph) * 0.5; }
    v = xs / (1.0 + abs(xs));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.18;
	vec2 q1 = p; vec2 q2 = p;
	q2 = rot2(q2.y * -2.22 + time * 0.53) * q2;
	q2 = abs(q2) - 0.63;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.85);
	float d = d1 * d2;
	vec3 col = palette(d * 1.38 + time * 0.19, vec3(0.48, 0.57, 0.44), vec3(0.49, 0.42, 0.39), vec3(1.28, 0.91, 0.93), vec3(0.50, 0.18, 0.12));
	col = clamp((col - 0.5) * 1.93 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
